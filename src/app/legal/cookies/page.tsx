import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Politica de Cookies — Disstands",
};

export default function CookiesPage() {
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
              Politica de Cookies
            </h1>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Ultima actualizacion: Marzo 2026
            </p>
          </div>
        </div>

        <article className="prose prose-gray mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p>
            En{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>{" "}
            utilizamos cookies y tecnologias similares para mejorar tu experiencia de navegacion,
            analizar el trafico del sitio web y personalizar el contenido. Esta Politica de Cookies
            explica que son las cookies, como las utilizamos y como puedes gestionarlas.
          </p>

          <h2>Que son las cookies</h2>
          <p>
            Las cookies son pequenos archivos de texto que los sitios web almacenan en tu dispositivo
            (ordenador, tablet o movil) cuando los visitas. Sirven para que el sitio web recuerde
            informacion sobre tu visita, como tu idioma preferido y otras opciones de configuracion,
            lo que puede facilitar tu proxima visita y hacer que el sitio te resulte mas util.
          </p>

          <h2>Para que utilizamos las cookies</h2>
          <p>Las cookies que utilizamos en este sitio web cumplen las siguientes funciones:</p>
          <ul>
            <li>
              <strong>Cookies tecnicas o necesarias:</strong> son imprescindibles para el
              funcionamiento del sitio web. Permiten la navegacion, el uso del carrito de compra y el
              acceso a areas seguras.
            </li>
            <li>
              <strong>Cookies de preferencias:</strong> permiten recordar informacion que cambia el
              aspecto o el comportamiento del sitio web, como tu idioma preferido o la region en la
              que te encuentras.
            </li>
            <li>
              <strong>Cookies analiticas:</strong> nos permiten analizar el comportamiento de los
              usuarios en el sitio web de forma agregada y anonima para mejorar nuestros servicios,
              medir la audiencia y conocer las secciones mas visitadas.
            </li>
            <li>
              <strong>Cookies de marketing:</strong> se utilizan para rastrear a los visitantes en
              las paginas web con la intencion de mostrar anuncios relevantes y atractivos para el
              usuario.
            </li>
          </ul>

          <h2>Tecnologias similares</h2>
          <p>
            Ademas de las cookies, podemos utilizar otras tecnologias similares como web beacons
            (tambien conocidos como &quot;pixel tags&quot; o &quot;GIFs transparentes&quot;), que
            son pequenos archivos graficos que nos permiten, por ejemplo, contabilizar el numero de
            usuarios que han visitado una pagina determinada o accedido a un correo electronico, asi
            como generar estadisticas sobre el uso del sitio web.
          </p>

          <h2>Cookies de terceros</h2>
          <p>
            Algunos servicios de terceros que utilizamos pueden establecer sus propias cookies en tu
            dispositivo. Estos servicios incluyen:
          </p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> servicio de analitica web de Google, Inc. que nos
              permite analizar el uso que hacen los usuarios del sitio web. La informacion generada
              por la cookie acerca de tu uso del sitio web sera transmitida y archivada por Google.
              Para mas informacion, consulta la{" "}
              <a
                href="https://www.google.com/intl/es/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                politica de privacidad de Google
              </a>
              .
            </li>
            <li>
              <strong>Google Adsense:</strong> servicio de publicidad de Google que utiliza la cookie
              de DoubleClick para publicar anuncios relevantes en funcion de tus visitas a este y
              otros sitios web.
            </li>
          </ul>

          <h2>Tabla de cookies utilizadas</h2>
          <p>A continuacion, se detallan las cookies que utiliza este sitio web:</p>

          <h3>Cookies necesarias</h3>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Proveedor</th>
                <th>Finalidad</th>
                <th>Duracion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>__cf_bm</td>
                <td>Cloudflare</td>
                <td>
                  Cookie necesaria de Cloudflare Bot Management para identificar y distinguir entre
                  humanos y bots. No almacena datos personales.
                </td>
                <td>30 minutos</td>
              </tr>
              <tr>
                <td>cookielawinfo-checkbox-necessary</td>
                <td>CookieYes</td>
                <td>
                  Registra el estado del consentimiento del usuario para las cookies de la categoria
                  &quot;necesarias&quot;.
                </td>
                <td>1 ano</td>
              </tr>
              <tr>
                <td>cookielawinfo-checkbox-functional</td>
                <td>CookieYes</td>
                <td>
                  Registra el estado del consentimiento del usuario para las cookies de la categoria
                  &quot;funcionales&quot;.
                </td>
                <td>1 ano</td>
              </tr>
              <tr>
                <td>cookielawinfo-checkbox-analytics</td>
                <td>CookieYes</td>
                <td>
                  Registra el estado del consentimiento del usuario para las cookies de la categoria
                  &quot;analiticas&quot;.
                </td>
                <td>1 ano</td>
              </tr>
              <tr>
                <td>cookielawinfo-checkbox-performance</td>
                <td>CookieYes</td>
                <td>
                  Registra el estado del consentimiento del usuario para las cookies de la categoria
                  &quot;rendimiento&quot;.
                </td>
                <td>1 ano</td>
              </tr>
              <tr>
                <td>cookielawinfo-checkbox-advertisement</td>
                <td>CookieYes</td>
                <td>
                  Registra el estado del consentimiento del usuario para las cookies de la categoria
                  &quot;publicidad&quot;.
                </td>
                <td>1 ano</td>
              </tr>
              <tr>
                <td>viewed_cookie_policy</td>
                <td>CookieYes</td>
                <td>
                  Almacena si el usuario ha dado su consentimiento para el uso de cookies. No
                  almacena datos personales.
                </td>
                <td>1 ano</td>
              </tr>
            </tbody>
          </table>

          <h2>Como desactivar o eliminar cookies</h2>
          <p>
            Puedes configurar tu navegador para bloquear o alertar sobre la presencia de cookies.
            Ten en cuenta que si desactivas algunas cookies, es posible que ciertas funcionalidades
            del sitio web no esten disponibles o no funcionen correctamente.
          </p>
          <p>
            A continuacion, te facilitamos enlaces con instrucciones para gestionar las cookies en
            los principales navegadores:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                Internet Explorer
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://help.opera.com/en/latest/web-preferences/#cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                Opera
              </a>
            </li>
          </ul>
          <p>
            Si utilizas otro navegador, busca en su seccion de ayuda o soporte la opcion para
            gestionar y eliminar cookies.
          </p>

          <h2>Actualizaciones de esta politica</h2>
          <p>
            Esta Politica de Cookies puede actualizarse periodicamente para adaptarse a cambios
            normativos o a nuevas funcionalidades del sitio web. Te recomendamos revisarla
            periodicamente para estar informado sobre como protegemos tu informacion.
          </p>

          <h2>Contacto</h2>
          <p>
            Para cualquier consulta relacionada con nuestra politica de cookies, puedes contactar con
            nosotros en{" "}
            <a href="mailto:alex@disstands.com">alex@disstands.com</a>.
          </p>
          <p>
            Tambien puedes consultar nuestras paginas de{" "}
            <Link href="/legal/aviso-legal">Aviso Legal</Link> y{" "}
            <Link href="/legal/privacidad">Politica de Privacidad</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
