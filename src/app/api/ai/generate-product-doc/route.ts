import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_DOC_SYSTEM_PROMPT } from "@/lib/ai/prompts";

const TROVALD_API_KEY = process.env.TROVALD_API_KEY;
const TROVALD_URL = "https://api.trovald.com/v1/chat/completions";

export async function POST(req: NextRequest) {
  if (!TROVALD_API_KEY) {
    return NextResponse.json(
      { error: "TROVALD_API_KEY no configurada" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { productName, description, category, variants } = body as {
    productName: string;
    description: string;
    category: string;
    variants: string[];
  };

  if (!productName) {
    return NextResponse.json(
      { error: "productName es obligatorio" },
      { status: 400 }
    );
  }

  const userMessage = `Genera la ficha técnica completa para el siguiente producto:

Nombre: ${productName}
Categoría: ${category || "Sin especificar"}
Variantes/colores disponibles: ${variants?.length ? variants.join(", ") : "No especificadas"}

Descripción actual del producto:
${description || "Sin descripción disponible. Genera una basándote en el nombre y categoría del producto."}`;

  try {
    const response = await fetch(TROVALD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TROVALD_API_KEY}`,
      },
      body: JSON.stringify({
        model: "auto",
        messages: [
          { role: "system", content: PRODUCT_DOC_SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Trovald API error:", response.status, errText);
      return NextResponse.json(
        { error: `Trovald API error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response (might be wrapped in markdown code block)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "La IA no devolvió JSON válido", raw: content },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      data: parsed,
      model: data.model || data.choices?.[0]?.model || "unknown",
    });
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json(
      { error: "Error al generar documentación" },
      { status: 500 }
    );
  }
}
