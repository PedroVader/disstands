import { NextRequest, NextResponse } from "next/server";

const TROVALD_API_KEY = process.env.TROVALD_API_KEY;
const TROVALD_URL = "https://api.trovald.com/v1/chat/completions";

const BLOG_SYSTEM_PROMPT = `Eres el redactor de contenidos de Disstands, empresa especializada en pavimentos y revestimientos para ferias, eventos y espacios comerciales en Barcelona. Productos principales: moquetas feriales, césped artificial, suelos PVC, losetas técnicas, caucho deportivo, jardines verticales y adhesivos.

Genera artículos de blog profesionales, informativos y orientados a SEO en español.

El artículo debe:
- Estar en formato HTML semántico (usa <h2>, <h3>, <p>, <ul>, <li>, <strong>, <table> cuando sea apropiado)
- Tener entre 800 y 1500 palabras
- Incluir al menos 3-4 secciones con <h2>
- Ser informativo, con datos prácticos y consejos útiles
- Mencionar productos o servicios de Disstands de forma natural (sin ser excesivamente promocional)
- Tener un tono profesional pero cercano

Devuelve SOLO un objeto JSON con esta estructura exacta:
{
  "title": "Título optimizado para SEO",
  "excerpt": "Resumen de 1-2 frases para la preview (max 200 caracteres)",
  "content": "<h2>...</h2><p>...</p>...",
  "seoTitle": "Título SEO (max 60 chars)",
  "seoDescription": "Meta description (max 155 chars)",
  "tags": ["tag1", "tag2", "tag3"]
}`;

export async function POST(req: NextRequest) {
  if (!TROVALD_API_KEY) {
    return NextResponse.json(
      { error: "TROVALD_API_KEY no configurada" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { topic, tone } = body as {
    topic: string;
    tone?: string;
  };

  if (!topic) {
    return NextResponse.json(
      { error: "El tema es obligatorio" },
      { status: 400 }
    );
  }

  const userMessage = `Genera un artículo de blog completo sobre el siguiente tema:

Tema: ${topic}
Tono: ${tone || "Profesional e informativo"}

Recuerda devolver SOLO el JSON, sin texto adicional.`;

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
          { role: "system", content: BLOG_SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 6000,
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
    });
  } catch (err) {
    console.error("AI blog generation error:", err);
    return NextResponse.json(
      { error: "Error al generar el artículo" },
      { status: 500 }
    );
  }
}
