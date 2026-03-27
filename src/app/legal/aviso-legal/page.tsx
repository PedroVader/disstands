import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Aviso Legal — Disstands",
};

export default function AvisoLegalPage() {
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
              Aviso Legal
            </h1>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Ultima actualizacion: Marzo 2026
            </p>
          </div>
        </div>

        <article className="prose prose-gray mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2>Datos de identificacion</h2>
          <p>
            En cumplimiento del articulo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Informacion y de Comercio Electronico (LSSI-CE), se informa al usuario de
            los datos del titular:
          </p>
          <ul>
            <li>
              <strong>Nombre o denominacion social:</strong> Disstands moquetas sl
            </li>
            <li>
              <strong>NIF:</strong> B-65939134
            </li>
            <li>
              <strong>Domicilio social:</strong> Joan d&apos;Austria 90 bajos local 4 08018 Barcelona
            </li>
            <li>
              <strong>Correo electronico:</strong>{" "}
              <a href="mailto:alex@disstands.com">alex@disstands.com</a>
            </li>
            <li>
              <strong>Sitio web:</strong>{" "}
              <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
                https://www.disstands.com/
              </a>
            </li>
          </ul>

          <h2>Condiciones de acceso y utilizacion</h2>
          <p>
            El sitio web y sus servicios son de acceso libre y gratuito. No obstante, Disstands
            moquetas sl puede condicionar la utilizacion de algunos de los servicios ofrecidos en su
            web a la previa cumplimentacion del correspondiente formulario.
          </p>
          <p>
            El usuario garantiza la autenticidad y actualidad de todos aquellos datos que comunique a
            Disstands moquetas sl y sera el unico responsable de las manifestaciones falsas o
            inexactas que realice.
          </p>
          <p>
            El usuario se compromete expresamente a hacer un uso adecuado de los contenidos y
            servicios de Disstands moquetas sl y a no emplearlos para, entre otros:
          </p>
          <ul>
            <li>
              Difundir contenidos delictivos, violentos, pornograficos, racistas, xenofobos,
              ofensivos, de apologia del terrorismo o, en general, contrarios a la ley o al orden
              publico.
            </li>
            <li>
              Introducir en la red virus informaticos o realizar actuaciones susceptibles de alterar,
              estropear, interrumpir o generar errores o danos en los documentos electronicos, datos
              o sistemas fisicos y logicos de Disstands moquetas sl o de terceras personas.
            </li>
            <li>
              Intentar acceder a las cuentas de correo electronico de otros usuarios o a areas
              restringidas de los sistemas informaticos de Disstands moquetas sl o de terceros y, en
              su caso, extraer informacion.
            </li>
            <li>
              Vulnerar los derechos de propiedad intelectual o industrial, asi como violar la
              confidencialidad de la informacion de Disstands moquetas sl o de terceros.
            </li>
            <li>
              Suplantar la identidad de cualquier otro usuario o de la propia administracion.
            </li>
            <li>
              Reproducir, copiar, distribuir, poner a disposicion de terceros o cualquier otra forma
              de comunicacion publica, transformar o modificar los contenidos, a menos que se cuente
              con la autorizacion del titular de los correspondientes derechos o ello resulte
              legalmente permitido.
            </li>
          </ul>

          <h2>Propiedad intelectual e industrial</h2>
          <p>
            El sitio web, incluyendo a titulo enunciativo pero no limitativo su programacion,
            edicion, compilacion y demas elementos necesarios para su funcionamiento, los disenos,
            logotipos, textos, fotografias y/o graficos, son propiedad del prestador o, en su caso,
            dispone de licencia o autorizacion expresa por parte de los autores.
          </p>
          <p>
            Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa
            de propiedad intelectual e industrial, asi como inscritos en los registros publicos
            correspondientes.
          </p>
          <p>
            Independientemente de la finalidad para la que fueran destinados, la reproduccion total o
            parcial, uso, explotacion, distribucion y comercializacion, requiere en todo caso la
            autorizacion escrita previa por parte del prestador. Cualquier uso no autorizado
            previamente se considera un incumplimiento grave de los derechos de propiedad intelectual
            o industrial del autor.
          </p>
          <p>
            Los disenos, logotipos, texto y/o graficos ajenos al prestador y que pudieran aparecer en
            el sitio web, pertenecen a sus respectivos propietarios, siendo ellos mismos responsables
            de cualquier posible controversia que pudiera suscitarse respecto a los mismos. El
            prestador autoriza expresamente a que terceros puedan redirigir directamente a los
            contenidos concretos del sitio web, y en todo caso redirigir al sitio web principal de{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>
            .
          </p>
          <p>
            El prestador reconoce a favor de sus titulares los correspondientes derechos de propiedad
            intelectual e industrial, no implicando su sola mencion o aparicion en el sitio web la
            existencia de derechos o responsabilidad alguna del prestador sobre los mismos, como
            tampoco respaldo, patrocinio o recomendacion por parte del mismo.
          </p>

          <h2>Enlaces (links)</h2>
          <p>
            El sitio web puede contener enlaces a sitios de terceros. Las paginas de dichos terceros
            no han sido revisadas ni son objeto de controles por parte del prestador, por lo que
            Disstands moquetas sl no podra ser considerada responsable de los contenidos de estos
            sitios web, ni de las medidas que se adopten relativas a su privacidad o al tratamiento
            de sus datos de caracter personal u otros que pudieran derivarse.
          </p>
          <p>
            Por todo ello, recomendamos la lectura detenida de las condiciones de uso, politica de
            privacidad, aviso legal y/o similares de estos sitios.
          </p>

          <h2>Programa de afiliados de Amazon</h2>
          <p>
            Disstands moquetas sl participa en el Programa de Asociados de Amazon Services LLC, un
            programa de publicidad de afiliados disenado para proporcionar un medio para que los
            sitios web obtengan ingresos por publicidad mediante publicidad y enlaces a{" "}
            <a href="https://www.amazon.es/" target="_blank" rel="noopener noreferrer">
              amazon.es
            </a>
            .
          </p>
          <p>
            En calidad de Asociado de Amazon, Disstands moquetas sl obtiene ingresos por las compras
            adscritas que cumplen los requisitos aplicables. Amazon y el logotipo de Amazon son marcas
            registradas de Amazon.com, Inc. o de sus afiliados.
          </p>

          <h2>Limitacion de responsabilidad</h2>
          <p>
            La informacion y servicios incluidos o disponibles a traves de este sitio web pueden
            incluir incorrecciones o errores tipograficos. De forma periodica se incorporan cambios a
            la informacion contenida. Disstands moquetas sl puede introducir en cualquier momento
            mejoras y/o cambios en los servicios o contenidos.
          </p>
          <p>
            Disstands moquetas sl no declara ni garantiza que los servicios o contenidos sean
            interrumpidos o que esten libres de errores, que los defectos sean corregidos, o que el
            servicio o el servidor que lo pone a disposicion esten libres de virus u otros componentes
            nocivos, sin perjuicio de que Disstands moquetas sl realiza todos los esfuerzos en evitar
            este tipo de incidentes.
          </p>
          <p>
            Disstands moquetas sl declina cualquier responsabilidad en caso de que existan
            interrupciones o un mal funcionamiento de los servicios o contenidos ofrecidos en
            Internet, cualquiera que sea su causa. Asimismo, Disstands moquetas sl no se hace
            responsable por caidas de la red, perdidas de negocio a consecuencia de dichas caidas,
            suspensiones temporales del fluido electrico o cualquier otro tipo de dano indirecto que
            te pueda ser causado por causas ajenas a Disstands moquetas sl.
          </p>
          <p>
            Antes de tomar decisiones y/o acciones con base a la informacion incluida en el sitio
            web, Disstands moquetas sl le recomienda comprobar y contrastar la informacion recibida
            con otras fuentes.
          </p>

          <h2>Privacidad y proteccion de datos</h2>
          <p>
            Toda la informacion relativa al tratamiento de datos personales recogidos por este sitio
            web se encuentra detallada en la{" "}
            <Link href="/legal/privacidad">Politica de Privacidad</Link>.
          </p>

          <h2>Politica de cookies</h2>
          <p>
            Para conocer las cookies que utilizamos en este sitio web, el usuario puede consultar la{" "}
            <Link href="/legal/cookies">Politica de Cookies</Link>.
          </p>

          <h2>Legislacion aplicable y jurisdiccion</h2>
          <p>
            Las presentes condiciones de uso se rigen por la legislacion espanola vigente. Para la
            resolucion de cualquier controversia que pudiera derivarse del acceso o uso de este sitio
            web, las partes se someten expresamente a la jurisdiccion de los Juzgados y Tribunales de
            Barcelona, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, salvo
            que la legislacion aplicable establezca imperativamente otro fuero.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
