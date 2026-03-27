import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Politica de Accesibilidad — Disstands",
};

export default function AccesibilidadPage() {
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
              Politica de Accesibilidad
            </h1>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Ultima actualizacion: Marzo 2026
            </p>
          </div>
        </div>

        <article className="prose prose-gray mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2>Compromiso con la accesibilidad</h2>
          <p>
            Disstands moquetas sl se compromete a hacer accesible su sitio web de conformidad con el{" "}
            <strong>Real Decreto 1112/2018, de 7 de septiembre</strong>, sobre accesibilidad de los
            sitios web y aplicaciones para dispositivos moviles del sector publico, que traspone la
            Directiva (UE) 2016/2102 del Parlamento Europeo y del Consejo.
          </p>
          <p>
            Aunque nuestra empresa pertenece al sector privado, asumimos voluntariamente el
            compromiso de cumplir con los requisitos de accesibilidad establecidos en la norma{" "}
            <strong>UNE-EN 301 549:2022</strong>, basada en las Pautas de Accesibilidad para el
            Contenido Web (WCAG) 2.1, nivel AA.
          </p>

          <h2>Situacion de conformidad</h2>
          <p>
            Este sitio web es <strong>parcialmente conforme</strong> con el Real Decreto 1112/2018
            debido a las excepciones y a la falta de conformidad de los aspectos que se indican a
            continuacion.
          </p>

          <h2>Contenido no accesible</h2>
          <p>
            El contenido que se recoge a continuacion no es accesible por los siguientes motivos:
          </p>

          <h3>Falta de conformidad con el Real Decreto 1112/2018</h3>
          <ul>
            <li>
              <strong>Alternativas textuales en imagenes:</strong> Podrian existir imagenes sin un
              texto alternativo adecuado que describa su contenido. Se esta trabajando en la revision
              y correccion de todas las imagenes del sitio para cumplir con el criterio de
              conformidad 1.1.1 (Contenido no textual) de las WCAG 2.1.
            </li>
            <li>
              <strong>Campos de formulario:</strong> Algunos campos de formulario podrian carecer de
              etiquetas descriptivas asociadas correctamente, lo que podria dificultar su uso con
              tecnologias de asistencia. Se esta trabajando en corregir estos problemas para cumplir
              con el criterio 1.3.1 (Informacion y relaciones) y el criterio 4.1.2 (Nombre, funcion,
              valor).
            </li>
            <li>
              <strong>Contraste de color:</strong> Algunas combinaciones de colores de texto y fondo
              podrian no alcanzar el ratio de contraste minimo requerido de 4.5:1 para texto normal y
              3:1 para texto grande. Se esta revisando el diseno para garantizar el cumplimiento del
              criterio 1.4.3 (Contraste minimo).
            </li>
            <li>
              <strong>Etiquetas y elementos interactivos:</strong> Algunos elementos interactivos
              podrian no tener nombres accesibles suficientemente descriptivos, lo que puede
              dificultar la navegacion con lectores de pantalla. Se trabaja en la mejora del
              etiquetado conforme al criterio 2.4.6 (Encabezados y etiquetas).
            </li>
            <li>
              <strong>Analisis sintactico (parsing):</strong> El codigo fuente de algunas paginas
              podria contener errores de marcado HTML que afecten a la interpretacion correcta del
              contenido por parte de tecnologias de asistencia. Se estan corrigiendo estos errores
              para cumplir con el criterio 4.1.1 (Analisis sintactico).
            </li>
          </ul>

          <h3>Carga desproporcionada</h3>
          <p>No aplica.</p>

          <h3>Contenido no incluido en el ambito de la legislacion aplicable</h3>
          <p>
            Podria haber contenido de terceros que no este bajo nuestro control, como documentos PDF
            proporcionados por proveedores, contenido incrustado de plataformas externas (videos de
            YouTube, mapas de Google Maps, etc.) o contenido generado por usuarios.
          </p>

          <h2>Preparacion de la presente declaracion de accesibilidad</h2>
          <p>
            Esta declaracion fue preparada en marzo de 2026. El metodo empleado para preparar la
            declaracion ha sido una autoevaluacion llevada a cabo por la propia empresa, utilizando
            herramientas automatizadas de evaluacion de accesibilidad y revision manual de los
            principales flujos de navegacion.
          </p>

          <h2>Observaciones y datos de contacto</h2>
          <p>
            Puede realizar comunicaciones sobre requisitos de accesibilidad (articulo 10.2.a del
            Real Decreto 1112/2018) a traves de los siguientes canales:
          </p>
          <ul>
            <li>
              <strong>Formulario de contacto:</strong>{" "}
              <a
                href="https://www.disstands.com/#contacto"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.disstands.com/#contacto
              </a>
            </li>
            <li>
              <strong>Telefono:</strong>{" "}
              <a href="tel:+34934850085">93 485 00 85</a>
            </li>
            <li>
              <strong>Correo electronico:</strong>{" "}
              <a href="mailto:alex@disstands.com">alex@disstands.com</a>
            </li>
          </ul>
          <p>
            Puede presentar:
          </p>
          <ul>
            <li>
              Quejas relativas al cumplimiento de los requisitos de accesibilidad establecidos en el
              Real Decreto 1112/2018.
            </li>
            <li>
              Solicitudes de informacion relativa a contenidos que esten excluidos del ambito de
              aplicacion del Real Decreto 1112/2018.
            </li>
          </ul>
          <p>
            A traves de la queja, se podra poner en conocimiento del responsable del sitio web
            cualquier posible incumplimiento, asi como solicitar la informacion relativa a los
            contenidos excluidos del ambito de aplicacion.
          </p>

          <h2>Procedimiento de aplicacion</h2>
          <p>
            Si una vez realizada una solicitud de informacion accesible o queja, esta hubiera sido
            desestimada, no estuviera de acuerdo con la decision adoptada, o la respuesta no
            cumpliera los requisitos contemplados en el articulo 12.5 del Real Decreto 1112/2018,
            la persona interesada podra iniciar una reclamacion. Igualmente se podra iniciar una
            reclamacion en el caso de que haya transcurrido el plazo de veinte dias habiles sin haber
            obtenido respuesta.
          </p>

          <h2>Contenido opcional</h2>
          <p>
            Disstands moquetas sl se compromete a seguir trabajando de forma continua en la mejora
            de la accesibilidad de su sitio web, estableciendo los recursos necesarios para ello. Se
            realizaran auditorias periodicas y se implementaran las mejoras necesarias a medida que
            se identifiquen nuevos problemas de accesibilidad.
          </p>
          <p>
            Nuestro objetivo es alcanzar el nivel de conformidad AA de las WCAG 2.1 en la totalidad
            del sitio web en el menor plazo posible. Agradecemos cualquier sugerencia o comentario
            que nos ayude a mejorar la accesibilidad de nuestro sitio.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
