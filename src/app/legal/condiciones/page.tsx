import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Politica de Devolucion — Disstands",
};

export default function DevolucionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        <div className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <Link href="/" className="text-sm text-brand-gray-dark hover:text-brand-red">
              &larr; Volver al inicio
            </Link>
            <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold text-brand-black">
              Politica de Devolucion
            </h1>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Ultima actualizacion: Marzo 2026
            </p>
          </div>
        </div>

        <article className="prose prose-gray mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p>
            En Disstands moquetas sl nos comprometemos a ofrecer productos de la maxima calidad.
            No obstante, entendemos que pueden surgir incidencias durante el transporte o que el
            producto recibido no cumpla con las expectativas. A continuacion, detallamos nuestra
            politica de devolucion y los procedimientos a seguir.
          </p>

          <h2>1. Inspeccion en la entrega</h2>
          <p>
            Es <strong>imprescindible</strong> que el cliente revise el estado del material en el
            momento de la entrega, en presencia del transportista. Debe verificar:
          </p>
          <ul>
            <li>Que el numero de bultos coincide con el indicado en el albaran de entrega.</li>
            <li>
              Que el embalaje esta en buen estado, sin signos de golpes, roturas, aplastamientos o
              humedades.
            </li>
            <li>
              Que el material recibido corresponde con el pedido realizado (referencia, cantidad,
              color).
            </li>
          </ul>
          <p>
            En caso de detectar cualquier anomalia, el cliente debera <strong>anotarlo
            expresamente en el albaran de entrega</strong> del transportista antes de firmar. Si el
            material presenta danos visibles severos, el cliente tiene derecho a rechazar la entrega,
            indicando el motivo en el albaran.
          </p>
          <p>
            <strong>Importante:</strong> Si el cliente firma el albaran sin anotar incidencias, se
            entendera que el material se ha recibido en perfecto estado y sera mas dificil tramitar
            una reclamacion posterior por danos de transporte.
          </p>

          <h2>2. Notificacion de incidencias</h2>
          <p>
            Cualquier incidencia relacionada con el pedido recibido debera comunicarse a Disstands
            en un plazo maximo de <strong>24 horas</strong> desde la recepcion del material,
            enviando un correo electronico a{" "}
            <a href="mailto:ventas@disstands.com">ventas@disstands.com</a> con la siguiente
            informacion:
          </p>
          <ul>
            <li>Numero de pedido o albaran.</li>
            <li>Descripcion detallada de la incidencia.</li>
            <li>
              Fotografias del material danado, del embalaje y de la etiqueta del transportista
              (consultar requisitos fotograficos a continuacion).
            </li>
            <li>
              Copia del albaran de entrega firmado con las anotaciones de la incidencia, si las
              hubiera.
            </li>
          </ul>
          <p>
            Las reclamaciones recibidas fuera de este plazo seran evaluadas caso por caso, pero
            Disstands no garantiza su aceptacion.
          </p>

          <h2>3. Requisitos fotograficos</h2>
          <p>
            Para poder gestionar cualquier reclamacion de forma eficaz, es necesario aportar un
            minimo de <strong>3 fotografias</strong> que cumplan los siguientes requisitos:
          </p>
          <ul>
            <li>
              <strong>Foto 1 - Vista general:</strong> imagen del bulto/paquete completo donde se
              aprecie el estado del embalaje.
            </li>
            <li>
              <strong>Foto 2 - Detalle del dano:</strong> imagen de cerca del defecto, dano o
              diferencia detectada en el material.
            </li>
            <li>
              <strong>Foto 3 - Etiqueta/referencia:</strong> imagen legible de la etiqueta del
              producto o del embalaje donde se identifique la referencia, lote o numero de serie.
            </li>
          </ul>
          <p>
            Las fotografias deben ser nitidas, con buena iluminacion y tomadas antes de manipular o
            instalar el material. Las imagenes borrosas, oscuras o que no permitan identificar
            claramente el problema podrian retrasar la tramitacion de la incidencia.
          </p>

          <h2>4. Productos no retornables</h2>
          <p>
            <strong>No se aceptaran devoluciones</strong> en los siguientes casos:
          </p>
          <ul>
            <li>
              <strong>Productos cortados a medida:</strong> cualquier material que haya sido cortado
              segun las especificaciones del cliente.
            </li>
            <li>
              <strong>Productos instalados:</strong> material que ya haya sido colocado, pegado o
              fijado en el suelo o pared.
            </li>
            <li>
              <strong>Productos desembalados sin embalaje original:</strong> material que se haya
              sacado de su embalaje original y no pueda reempaquetarse en las mismas condiciones.
            </li>
            <li>
              <strong>Productos personalizados:</strong> articulos fabricados bajo pedido especial
              con especificaciones unicas del cliente (color especial, dimensiones no estandar,
              estampados personalizados, etc.).
            </li>
            <li>
              <strong>Productos de outlet o liquidacion:</strong> articulos adquiridos en
              condiciones especiales de venta con descuento por fin de serie, excedente de stock o
              producto descatalogado.
            </li>
          </ul>

          <h2>5. Productos retornables</h2>
          <p>
            Se podra solicitar la devolucion en los siguientes supuestos:
          </p>
          <ul>
            <li>
              <strong>Rollos completos sin cortar:</strong> siempre que se encuentren en su embalaje
              original, sin desembalar, y en perfecto estado para su reventa.
            </li>
            <li>
              <strong>Cajas completas sin abrir:</strong> losetas, lamas u otros productos
              envasados en cajas que no hayan sido abiertas.
            </li>
            <li>
              <strong>Defecto de fabricacion:</strong> cuando el material presente un defecto de
              fabricacion debidamente documentado y verificado por nuestro equipo tecnico.
            </li>
            <li>
              <strong>Error en el envio:</strong> cuando el material recibido no corresponda con el
              pedido realizado (referencia incorrecta, color erroneo, cantidad distinta).
            </li>
          </ul>

          <h2>6. Condiciones de devolucion</h2>
          <p>
            Para que una devolucion sea aceptada, deben cumplirse las siguientes condiciones:
          </p>
          <ul>
            <li>
              <strong>Embalaje original:</strong> el producto debe devolverse en su embalaje
              original o, en su defecto, en un embalaje que garantice las mismas condiciones de
              proteccion durante el transporte.
            </li>
            <li>
              <strong>Estado apto para reventa:</strong> el material debe encontrarse en perfecto
              estado, sin manchas, danos, ni signos de uso o manipulacion.
            </li>
            <li>
              <strong>Autorizacion previa:</strong> toda devolucion requiere una autorizacion previa
              por parte de Disstands. No se aceptaran devoluciones no autorizadas o sin previo
              aviso.
            </li>
            <li>
              <strong>Gastos de envio de devolucion:</strong> salvo que la devolucion se deba a un
              error imputable a Disstands (envio incorrecto o producto defectuoso), los gastos de
              envio de la devolucion correran por cuenta del cliente.
            </li>
            <li>
              <strong>Plazo de devolucion:</strong> el cliente dispone de un plazo de{" "}
              <strong>14 dias naturales</strong> desde la recepcion del pedido para solicitar la
              devolucion, conforme al derecho de desistimiento establecido por la normativa vigente.
            </li>
          </ul>

          <h2>7. Reembolsos</h2>
          <p>
            Una vez recibido y verificado el material devuelto, Disstands procedera al reembolso en
            las siguientes condiciones:
          </p>
          <ul>
            <li>
              <strong>Producto defectuoso o error de envio:</strong> reembolso del{" "}
              <strong>100%</strong> del importe del producto, incluidos los gastos de envio
              originales.
            </li>
            <li>
              <strong>Desistimiento del cliente:</strong> reembolso del importe del producto,
              descontando los gastos de envio originales y los gastos de devolucion.
            </li>
            <li>
              <strong>Plazo de reembolso:</strong> el reembolso se efectuara en un plazo maximo de{" "}
              <strong>14 dias</strong> desde la verificacion del material devuelto, utilizando el
              mismo medio de pago empleado por el cliente en la compra original.
            </li>
          </ul>
          <p>
            Si, tras la inspeccion, el material devuelto no cumple las condiciones exigidas (presenta
            signos de uso, falta embalaje original, etc.), Disstands se reserva el derecho de
            rechazar la devolucion o aplicar una deduccion proporcional al deterioro del producto.
          </p>

          <h2>8. Excepciones y casos especiales</h2>
          <ul>
            <li>
              <strong>Contratos B2B:</strong> las devoluciones en pedidos realizados por empresas o
              profesionales en el marco de un contrato mercantil se regiran por las condiciones
              especificas pactadas en dicho contrato. En ausencia de clausulas especificas, se
              aplicara la presente politica de forma subsidiaria.
            </li>
            <li>
              <strong>Productos de importacion:</strong> los materiales importados bajo pedido
              especial pueden tener condiciones de devolucion diferentes debido a los plazos y
              costes logisticos adicionales. Estas condiciones se comunicaran al cliente antes de
              confirmar el pedido.
            </li>
          </ul>

          <h2>Contacto</h2>
          <p>
            Para cualquier consulta relacionada con devoluciones, puede contactar con nosotros:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:ventas@disstands.com">ventas@disstands.com</a>
            </li>
            <li>
              <strong>Telefono:</strong>{" "}
              <a href="tel:+34934850085">93 485 00 85</a>
            </li>
            <li>
              <strong>Direccion:</strong> Joan d&apos;Austria 90 bajos local 4, 08018 Barcelona
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
