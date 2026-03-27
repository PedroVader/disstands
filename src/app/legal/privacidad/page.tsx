import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Politica de Privacidad — Disstands",
};

export default function PrivacidadPage() {
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
              Politica de Privacidad
            </h1>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Ultima actualizacion: Marzo 2026
            </p>
          </div>
        </div>

        <article className="prose prose-gray mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p>
            Si estas aqui es porque quieres saber mas sobre las obligaciones y derechos que te
            corresponden como usuario de esta web{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>{" "}
            y eso esta muy bien. Nuestro deber es informarte y el tuyo estar debidamente informado.
          </p>
          <p>
            En esta Politica de Privacidad te informaremos con total transparencia sobre la finalidad
            de este sitio web y todo lo que afecta a los datos que nos facilites, asi como de las
            obligaciones y derechos que te corresponden.
          </p>
          <p>
            Para empezar, debes saber que este sitio web se adapta a la normativa vigente en relacion
            con la proteccion de datos, lo que afecta a los datos personales que nos facilites con tu
            consentimiento expreso y a las cookies que utilizamos para que este sitio web funcione
            correctamente y pueda desarrollar su actividad.
          </p>
          <p>
            Concretamente, esta web se ajusta al cumplimiento de las siguientes normativas:
          </p>
          <ul>
            <li>
              El <strong>RGPD</strong> (Reglamento (UE) 2016/679 del Parlamento Europeo y del
              Consejo de 27 de abril de 2016 relativo a la proteccion de las personas fisicas) que es
              la nueva normativa de la Union Europea que unifica la regulacion del tratamiento de los
              datos personales en los distintos paises de la UE.
            </li>
            <li>
              La <strong>LOPD</strong> (Ley Organica 15/1999, de 13 de diciembre, de Proteccion de
              Datos de Caracter Personal y Real Decreto 1720/2007, de 21 de diciembre, el Reglamento
              de desarrollo de la LOPD) que regula el tratamiento de los datos personales y las
              obligaciones que debemos asumir los responsables de una web o un blog a la hora de
              gestionar esta informacion.
            </li>
            <li>
              La <strong>LSSI</strong> (Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de
              la Informacion y Comercio Electronico) que regula las transacciones economicas mediante
              medios electronicos, como es el caso de este blog.
            </li>
          </ul>

          <h2>Datos de identificacion</h2>
          <p>
            <strong>Nombre:</strong> Disstands moquetas sl
            <br />
            <strong>NIF:</strong> B-65939134
            <br />
            <strong>Domicilio Social:</strong> Joan d&apos;Austria 90 bajos local 4 08018 Barcelona
            <br />
            <strong>Actividad del sitio web:</strong> distribucion de contenido relacionado con
            Disstands moquetas sl, muestra de publicidad, y recomendacion de productos de afiliado.
            <br />
            <strong>Correo electronico:</strong>{" "}
            <a href="mailto:alex@disstands.com">alex@disstands.com</a>
          </p>

          <h2>Condiciones de uso</h2>
          <p>
            Debes saber, para tu tranquilidad, que siempre te pediremos tu consentimiento expreso
            para recabar tus datos con la correspondiente finalidad especificada en cada caso, lo que
            implica que, en caso de otorgar ese consentimiento, has leido y aceptado esta Politica de
            Privacidad.
          </p>
          <p>
            En el momento que accedas y utilices esta web, asumes tu condicion de usuario con tus
            correspondientes derechos y obligaciones.
          </p>
          <p>
            Si eres mayor de 13 anos podras registrarte como usuario en esta web sin el previo
            consentimiento de tus padres o tutores.
          </p>
          <p>
            Si eres menor de 13 anos necesitaras el consentimiento de tus padres o tutores para el
            tratamiento de tus datos personales.
          </p>

          <h2>Registro y finalidad de tus datos</h2>
          <p>
            En funcion del formulario o seccion a la que accedas te solicitaremos la informacion
            estrictamente necesaria. En ningun caso se te obligara a dar mas datos de los
            imprescindibles para cumplir con la finalidad de dichos datos.
          </p>
          <p>
            En cualquier caso, te ofrecemos informacion sobre la finalidad del fichero que presta la
            seccion de datos correspondiente.
          </p>
          <p>
            Si nos facilitas tus datos, te informamos de las diferentes finalidades para las cuales
            vamos a tratar tus datos personales:
          </p>
          <ul>
            <li>
              Para garantizar el cumplimiento de las condiciones de uso y la ley aplicable. Esto
              puede incluir el desarrollo de herramientas y algoritmos que ayudan a esta web a
              garantizar la confidencialidad de los datos personales que recoge.
            </li>
            <li>Para apoyar y mejorar los servicios que ofrece esta web.</li>
            <li>
              Para gestionar las incidencias de los usuarios, resolver consultas, sugerencias o
              reclamaciones.
            </li>
            <li>Para informar sobre cambios o novedades dentro del sitio web.</li>
            <li>Para fines de marketing y publicidad.</li>
            <li>
              Para analizar el comportamiento y los habitos de navegacion del usuario con el fin de
              mejorar la experiencia de uso y la calidad del servicio.
            </li>
          </ul>
          <p>
            Tambien te recuerdo que puedes revocar en cualquier momento el consentimiento prestado
            para el tratamiento de tus datos, asi como ejercer los demas derechos que te corresponden
            conforme a lo indicado en esta politica, enviando un email a{" "}
            <a href="mailto:alex@disstands.com">alex@disstands.com</a>.
          </p>

          <h2>Exactitud y veracidad de los datos</h2>
          <p>
            Como usuario, eres el unico responsable de la veracidad y modificacion de los datos que
            remitas a{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>{" "}
            exonerando a Disstands moquetas sl de cualquier responsabilidad al respecto.
          </p>
          <p>
            Es decir, a nosotros no nos corresponde comprobar ni nos hacemos responsables de la
            veracidad de los datos. Como usuario debes garantizar la exactitud y autenticidad de los
            datos personales facilitados, comprometiendote a mantener debidamente actualizada la
            informacion de forma que responda a su situacion real.
          </p>

          <h2>Bajas de suscripcion y derecho de revocacion</h2>
          <p>
            Como titular de los datos que nos has facilitado, podras ejercer en cualquier momento tus
            derechos de acceso, rectificacion, cancelacion y oposicion, enviando un email a{" "}
            <a href="mailto:alex@disstands.com">alex@disstands.com</a> con asunto &quot;Baja&quot;,
            o bien revocando el consentimiento concedido.
          </p>
          <p>
            Asimismo, cada vez que te enviemos una comunicacion comercial, te ofreceremos la
            posibilidad de darte de baja o anular la suscripcion, mediante un enlace habilitado para
            tal efecto.
          </p>

          <h2>Acceso a datos por cuenta de terceros</h2>
          <p>
            Para poder prestar servicios estrictamente necesarios para el desarrollo de la actividad,{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>{" "}
            comparte datos con los siguientes prestadores bajo sus correspondientes condiciones de
            privacidad:
          </p>

          <h3>Dinahosting</h3>
          <p>
            <strong>Dinahosting S.L.</strong>, con NIF B-15805419, presta servicios de alojamiento
            web. Puedes consultar su politica de privacidad y proteccion de datos en{" "}
            <a
              href="https://dinahosting.com/legal/proteccion-datos"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://dinahosting.com/legal/proteccion-datos
            </a>
            .
          </p>

          <h3>Google Analytics</h3>
          <p>
            <strong>Google Analytics</strong> es un servicio de analitica web prestado por Google,
            Inc., una compania de Delaware cuya oficina principal esta en 1600 Amphitheatre Parkway,
            Mountain View (California), CA 94043, Estados Unidos (&quot;Google&quot;).
          </p>
          <p>
            Google Analytics utiliza &quot;cookies&quot;, que son archivos de texto ubicados en tu
            ordenador, para ayudar a{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>{" "}
            a analizar el uso que hacen los usuarios del sitio web. La informacion que genera la
            cookie acerca de tu uso (incluyendo tu direccion IP) sera directamente transmitida y
            archivada por Google en los servidores de Estados Unidos.
          </p>
          <p>
            Para mas informacion consulta la pagina de{" "}
            <a
              href="https://www.google.com/intl/es/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacidad de Google
            </a>
            .
          </p>
          <p>
            Google Analytics no almacena tus datos de pago ni tu contrasena. Para mas informacion
            sobre las condiciones de uso de Google Analytics, puedes consultar su{" "}
            <a
              href="https://www.google.com/analytics/terms/es.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              pagina de condiciones de servicio
            </a>
            .
          </p>

          <h3>Google Adsense</h3>
          <p>
            Google, como proveedor asociado, utiliza cookies para publicar anuncios en{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>
            . Google utiliza la cookie de DoubleClick para publicar anuncios a los usuarios en
            funcion de sus visitas a este y a otros sitios de Internet.
          </p>
          <p>
            Los usuarios pueden inhabilitar el uso de la cookie de DoubleClick entrando en la{" "}
            <a
              href="https://adssettings.google.com/authenticated"
              target="_blank"
              rel="noopener noreferrer"
            >
              pagina de configuracion de anuncios de Google
            </a>
            .
          </p>

          <h2>Medidas de seguridad</h2>
          <p>
            Como titular de la web{" "}
            <a href="https://www.disstands.com/" target="_blank" rel="noopener noreferrer">
              https://www.disstands.com/
            </a>
            , Disstands moquetas sl ha adoptado todas las medidas tecnicas y de organizacion
            necesarias para garantizar la seguridad e integridad de los datos de caracter personal que
            trate, asi como para evitar su perdida, alteracion y/o acceso por parte de terceros no
            autorizados.
          </p>
          <p>
            Te recordamos que, para mas informacion, puedes consultar nuestras paginas de{" "}
            <Link href="/legal/aviso-legal">Aviso Legal</Link> y{" "}
            <Link href="/legal/cookies">Politica de Cookies</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
