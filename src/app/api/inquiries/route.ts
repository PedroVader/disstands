import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, company, topic, message, metadata } = body;

    if (!type || !name || !email) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from("inquiries").insert({
      type,
      name,
      email,
      phone: phone || null,
      company: company || null,
      topic: topic || null,
      message: message || null,
      metadata: metadata || {},
    });

    if (error) {
      return NextResponse.json(
        { error: "Error al guardar: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
