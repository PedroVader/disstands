import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form, items, subtotal, shipping, total } = body;

    if (!form || !items || items.length === 0) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // 1. Upsert client by email
    const { data: existingClient } = await supabase
      .from("clients")
      .select("id")
      .eq("email", form.email)
      .single();

    let clientId: string;

    if (existingClient) {
      clientId = existingClient.id;
      // Update client info
      await supabase
        .from("clients")
        .update({
          contact_name: form.contactName,
          company: form.company || null,
          phone: form.phone || null,
          address: form.address,
          city: form.city,
          postal_code: form.postalCode,
          province: form.province,
          nif: form.nif || null,
        })
        .eq("id", clientId);
    } else {
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          contact_name: form.contactName,
          company: form.company || null,
          email: form.email,
          phone: form.phone || null,
          address: form.address,
          city: form.city,
          postal_code: form.postalCode,
          province: form.province,
          nif: form.nif || null,
        })
        .select("id")
        .single();

      if (clientError || !newClient) {
        return NextResponse.json(
          { error: "Error al crear cliente: " + (clientError?.message || "desconocido") },
          { status: 500 }
        );
      }
      clientId = newClient.id;
    }

    // 2. Generate sequential order number
    const year = new Date().getFullYear();
    const { data: lastOrder } = await supabase
      .from("orders")
      .select("order_number")
      .ilike("order_number", `DIS-${year}-%`)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    let seq = 1;
    if (lastOrder?.order_number) {
      const parts = lastOrder.order_number.split("-");
      const lastSeq = parseInt(parts[2], 10);
      if (!isNaN(lastSeq)) seq = lastSeq + 1;
    }
    const orderNumber = `DIS-${year}-${String(seq).padStart(4, "0")}`;

    // 3. Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        client_id: clientId,
        status: "pendiente",
        subtotal,
        shipping,
        total,
        needs_install: form.needsInstall || false,
        install_address: form.needsInstall ? form.installAddress : null,
        install_date: form.needsInstall && form.installDate ? form.installDate : null,
        notes: form.notes || null,
      })
      .select("id, order_number")
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Error al crear pedido: " + (orderError?.message || "desconocido") },
        { status: 500 }
      );
    }

    // 4. Insert order lines
    const orderLines = items.map((item: {
      productId: string;
      variantId: string;
      m2: number;
      pricePerM2: number;
    }) => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId || null,
      m2: item.m2,
      price_per_m2: item.pricePerM2,
      line_total: item.m2 * item.pricePerM2,
    }));

    const { error: linesError } = await supabase
      .from("order_lines")
      .insert(orderLines);

    if (linesError) {
      return NextResponse.json(
        { error: "Error al crear líneas de pedido: " + linesError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderNumber: order.order_number });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
