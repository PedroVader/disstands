export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoLanding {
  slug: string;
  title: string;
  h1: string;
  description: string;
  content: string;
  category: "moquetas" | "cesped-artificial" | "suelo-pvc" | "general";
  city?: string;
  region?: string;
  faqs?: FaqItem[];
  relatedProducts?: { name: string; slug: string; price: string }[];
  advantages?: string[];
  stats?: { value: string; label: string }[];
}

export const seoLandings: SeoLanding[] = [
  // ========================================
  // MOQUETAS — Ciudades y barrios
  // ========================================
  {
    slug: "moquetas-hospitalet",
    title: "Moquetas en L'Hospitalet de Llobregat — Venta e Instalación | Disstands",
    h1: "Moquetas en L'Hospitalet de Llobregat",
    description: "Compra e instalación de moquetas en L'Hospitalet de Llobregat. Moquetas feriales, ecológicas y de oficina. Entrega rápida y presupuesto sin compromiso.",
    content: `<p><strong>Disstands</strong> ofrece <strong>venta e instalación profesional de moquetas en L'Hospitalet de Llobregat</strong> y toda la comarca del Baix Llobregat. Nuestra ubicación en Barcelona nos sitúa a escasos minutos de L'Hospitalet, lo que nos permite ofrecer un servicio extraordinariamente ágil con entregas en el mismo día y montajes urgentes para las ferias y congresos que se celebran en <strong>Fira Barcelona Gran Via</strong>, el gran recinto ferial ubicado en esta ciudad.</p>
<h2>Moquetas para Fira Barcelona Gran Via en L'Hospitalet</h2>
<p>L'Hospitalet de Llobregat alberga <strong>Fira Barcelona Gran Via</strong>, uno de los recintos feriales más grandes y modernos de Europa con más de 240.000 m² de superficie expositiva. Es sede de eventos de talla mundial como el <strong>Mobile World Congress</strong>, <strong>Smart City Expo</strong>, <strong>Alimentaria</strong>, <strong>Hostelco</strong> y <strong>Barcelona Building Construmat</strong>. Disstands es proveedor habitual de moqueta para cientos de stands en estas ferias, ofreciendo un servicio integral que incluye suministro, corte a medida, transporte al recinto e instalación profesional.</p>
<p>Nuestra cercanía a Fira Gran Via nos permite responder a necesidades de última hora con <strong>entregas en menos de 2 horas</strong> durante los periodos de montaje ferial. Mantenemos stock permanente de los colores más demandados para garantizar disponibilidad inmediata.</p>
<h2>Tipos de moquetas disponibles en L'Hospitalet</h2>
<ul>
<li><strong>Moqueta ferial Las Vegas</strong> — La más vendida para stands en Fira Gran Via. Punzonada, ignífuga Bfl-s1 y disponible en más de 60 colores. Desde 2,65 €/m².</li>
<li><strong>Moqueta Ecológica 100% reciclable</strong> — Opción sostenible, cada vez más exigida por las organizaciones feriales con políticas medioambientales. Desde 2,20 €/m².</li>
<li><strong>Moqueta Velour Lux</strong> — Acabado aterciopelado de gama alta para stands premium y eventos corporativos exclusivos. Desde 5,95 €/m².</li>
<li><strong>Losetas modulares para oficinas</strong> — Solución ideal para las oficinas y parques empresariales de L'Hospitalet, como la zona de Gran Via L'Hospitalet, Granvia Business Park y el distrito económico de la ciudad.</li>
<li><strong>Moqueta de colores especiales</strong> — Personaliza tu stand ferial con el color exacto de tu marca entre nuestra paleta de más de 60 tonalidades.</li>
</ul>
<h2>Precios de moquetas en L'Hospitalet de Llobregat</h2>
<table><thead><tr><th>Tipo de moqueta</th><th>Precio desde (€/m²)</th><th>Uso ideal</th></tr></thead><tbody><tr><td>Moqueta Las Vegas (ferial)</td><td>2,65 €/m²</td><td>Stands en Fira Gran Via, eventos</td></tr><tr><td>Moqueta Ecológica Reciclable</td><td>2,20 €/m²</td><td>Ferias con requisitos de sostenibilidad</td></tr><tr><td>Moqueta Colores Especiales</td><td>3,20 €/m²</td><td>Stands corporativos personalizados</td></tr><tr><td>Moqueta Velour Lux</td><td>5,95 €/m²</td><td>Eventos premium, presentaciones VIP</td></tr><tr><td>Losetas modulares oficina</td><td>12,00 €/m²</td><td>Oficinas, parques empresariales</td></tr></tbody></table>
<h2>Cobertura por barrios de L'Hospitalet</h2>
<p>Nuestro servicio de <strong>instalación de moquetas</strong> cubre todos los barrios y distritos de L'Hospitalet de Llobregat: <strong>Gran Via Sud</strong> (junto al recinto ferial), <strong>Collblanc</strong>, <strong>La Torrassa</strong>, <strong>Santa Eulàlia</strong>, <strong>Centre</strong>, <strong>Sant Josep</strong>, <strong>La Florida</strong>, <strong>Les Planes</strong>, <strong>Pubilla Cases</strong>, <strong>Can Serra</strong>, <strong>Bellvitge</strong>, <strong>Gornal</strong> y <strong>Sanfeliu</strong>. Con una población de más de 260.000 habitantes, L'Hospitalet es la segunda ciudad más grande de Cataluña y un importante centro económico y empresarial.</p>
<p>Además de las ferias, atendemos a empresas del tejido comercial e industrial de la ciudad: oficinas corporativas, locales comerciales del centro, hoteles de negocios y centros de convenciones privados. Ofrecemos presupuestos personalizados y asesoramiento técnico gratuito para cada tipo de proyecto.</p>
<h2>¿Por qué Disstands es tu mejor opción en L'Hospitalet?</h2>
<p>La combinación de <strong>cercanía geográfica</strong>, <strong>experiencia de más de 23 años</strong> y <strong>más de 500 proyectos realizados</strong> nos convierte en el socio ideal para cualquier necesidad de moqueta en L'Hospitalet. Nuestro conocimiento del recinto de Fira Gran Via y de la logística de montaje ferial es un valor diferencial que nuestros clientes valoran especialmente.</p>
<p><a href="/contacto">Solicita tu presupuesto</a> sin compromiso o consulta nuestro <a href="/catalogo">catálogo completo</a> de moquetas. Si necesitas planificar el suelo de tu stand, utiliza nuestro <a href="/monta-tu-feria">configurador de ferias online</a> para obtener un presupuesto instantáneo.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis servicio de moquetas en L'Hospitalet de Llobregat?", answer: "Sí, cubrimos toda L'Hospitalet incluyendo Gran Via Sud, Collblanc, La Torrassa, Santa Eulàlia y Centre con entrega rápida." },
      { question: "¿Cuánto cuesta la moqueta ferial en L'Hospitalet?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m². Ofrecemos descuentos por volumen para ferias en Fira Gran Via." },
      { question: "¿Instaláis moqueta para ferias en Fira Barcelona Gran Via?", answer: "Sí, estamos especializados en montajes para Fira Barcelona Gran Via, ubicada en L'Hospitalet, con servicio urgente disponible." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Cercanía a Fira Barcelona Gran Via",
      "Entrega en 24h en L'Hospitalet",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Servicio urgente para ferias",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-lleida",
    title: "Moquetas en Lleida — Venta e Instalación Profesional | Disstands",
    h1: "Moquetas en Lleida",
    description: "Venta e instalación de moquetas en Lleida. Moquetas feriales, ecológicas, velour y accesorios. Envío rápido desde Barcelona.",
    content: `<p><strong>Disstands</strong> suministra e instala moquetas en <strong>Lleida</strong> y toda la provincia. Desde nuestra base en Barcelona enviamos material a toda Cataluña con plazos de entrega reducidos.</p>
<h2>Moquetas para ferias y eventos en Lleida</h2>
<p>Suministramos moqueta ferial para eventos en la Fira de Lleida y espacios de congresos. Disponemos de stock permanente para entregas urgentes.</p>
<h2>Moquetas para oficinas y comercios</h2>
<p>Ofrecemos losetas de moqueta y moqueta en rollo para oficinas, hoteles y espacios comerciales en Lleida. Instalación profesional disponible.</p>`,
    category: "moquetas",
    city: "Lleida",
    region: "Cataluña",
    faqs: [
      { question: "¿Enviáis moquetas a Lleida desde Barcelona?", answer: "Sí, realizamos envíos regulares a Lleida y toda la provincia con plazos de entrega de 24-48 horas." },
      { question: "¿Ofrecéis instalación de moqueta en Lleida?", answer: "Sí, nuestro equipo de instaladores se desplaza a Lleida para proyectos de ferias, oficinas y comercios." },
      { question: "¿Qué moquetas tenéis para la Fira de Lleida?", answer: "Disponemos de moqueta ferial Las Vegas, moqueta ecológica y Velour Lux, todas con certificación ignífuga Bfl-s1." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío rápido desde Barcelona",
      "Instalación profesional en Lleida",
      "Stock permanente disponible",
      "Certificación ignífuga Bfl-s1",
      "Asesoramiento técnico personalizado",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Lleida" },
    ],
  },
  {
    slug: "moquetas-girona",
    title: "Moquetas en Girona — Venta e Instalación Profesional | Disstands",
    h1: "Moquetas en Girona",
    description: "Compra e instalación de moquetas en Girona. Moquetas para ferias, eventos, oficinas y comercios. Envío desde Barcelona.",
    content: `<p>En <strong>Disstands</strong> ofrecemos servicio de venta e instalación de moquetas en <strong>Girona</strong> y toda la Costa Brava. Suministramos moquetas feriales, de oficina y decorativas con entrega rápida.</p>
<h2>Soluciones de moquetas en Girona</h2>
<ul>
<li>Moquetas feriales para eventos en el Palau de Fires de Girona</li>
<li>Moquetas para hoteles y establecimientos turísticos de la Costa Brava</li>
<li>Moquetas de oficina con aislamiento acústico</li>
<li>Moquetas ecológicas y sostenibles</li>
</ul>`,
    category: "moquetas",
    city: "Girona",
    region: "Cataluña",
    faqs: [
      { question: "¿Instaláis moquetas en Girona y la Costa Brava?", answer: "Sí, cubrimos Girona capital y toda la Costa Brava, incluyendo hoteles y establecimientos turísticos." },
      { question: "¿Qué moquetas recomendáis para hoteles en la Costa Brava?", answer: "Recomendamos moqueta Velour Lux por su acabado premium o losetas modulares por su fácil mantenimiento y sustitución." },
      { question: "¿Cuánto tardáis en entregar moqueta en Girona?", answer: "La entrega estándar en Girona es de 24-48 horas desde la confirmación del pedido." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Cobertura en Girona y Costa Brava",
      "Entrega en 24-48h",
      "Instalación profesional disponible",
      "Soluciones para hoteles y turismo",
      "Asesoramiento técnico gratuito",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Girona" },
    ],
  },
  {
    slug: "moquetas-tarragona",
    title: "Moquetas en Tarragona — Venta e Instalación | Disstands",
    h1: "Moquetas en Tarragona",
    description: "Venta e instalación profesional de moquetas en Tarragona. Moquetas feriales, oficinas y eventos. Entrega rápida desde Barcelona.",
    content: `<p><strong>Disstands</strong> ofrece venta e instalación de moquetas en <strong>Tarragona</strong> y toda la provincia. Cubrimos tanto la capital como la Costa Daurada con servicio profesional.</p>
<h2>Nuestros servicios en Tarragona</h2>
<ul>
<li>Moqueta ferial para eventos y congresos en Tarragona</li>
<li>Moqueta para oficinas y espacios comerciales</li>
<li>Moqueta ecológica 100% reciclable</li>
<li>Instalación profesional con garantía</li>
</ul>`,
    category: "moquetas",
    city: "Tarragona",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis moquetas en Tarragona y la Costa Daurada?", answer: "Sí, cubrimos Tarragona capital y toda la Costa Daurada con entrega rápida desde Barcelona." },
      { question: "¿Qué precio tiene la moqueta ferial en Tarragona?", answer: "La moqueta ferial comienza desde 2,65 €/m² con transporte incluido a Tarragona." },
      { question: "¿Instaláis moqueta para congresos en Tarragona?", answer: "Sí, nuestro equipo se desplaza para montajes de ferias, congresos y eventos en recintos de Tarragona." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío rápido desde Barcelona",
      "Instalación profesional en Tarragona",
      "Certificación ignífuga Bfl-s1",
      "Más de 60 colores disponibles",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Tarragona" },
    ],
  },
  {
    slug: "moquetas-sabadell-disstands",
    title: "Moquetas en Sabadell — Venta e Instalación | Disstands",
    h1: "Moquetas en Sabadell",
    description: "Instalación y venta de moquetas en Sabadell. Moquetas feriales, ecológicas y de oficina. Presupuesto sin compromiso.",
    content: `<p>En <strong>Disstands</strong> instalamos y vendemos moquetas en <strong>Sabadell</strong> y todo el Vallès Occidental. Servicio rápido y profesional desde Barcelona.</p>
<h2>Moquetas disponibles en Sabadell</h2>
<p>Disponemos de todo tipo de moquetas: feriales, ecológicas, velour, ignífugas, losetas de oficina y moquetas decorativas. Entrega en 24-48 horas.</p>`,
    category: "moquetas",
    city: "Sabadell",
    region: "Cataluña",
    faqs: [
      { question: "¿Instaláis moquetas en Sabadell?", answer: "Sí, cubrimos todo Sabadell y el Vallès Occidental con entrega en 24-48 horas." },
      { question: "¿Qué tipos de moqueta vendéis en Sabadell?", answer: "Disponemos de moquetas feriales, ecológicas, velour, ignífugas, losetas de oficina y moquetas decorativas." },
      { question: "¿Cuánto cuesta la entrega en Sabadell?", answer: "La entrega en Sabadell está incluida en pedidos superiores a 100 m². Para pedidos menores, consulte nuestro presupuesto." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Entrega en 24-48h en Sabadell",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Precios competitivos",
      "Asesoramiento técnico gratuito",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-terrassa",
    title: "Moquetas en Terrassa — Venta e Instalación Profesional | Disstands",
    h1: "Moquetas en Terrassa",
    description: "Compra e instalación de moquetas en Terrassa. Moquetas feriales, para oficinas y espacios comerciales. Presupuesto gratuito.",
    content: `<p><strong>Disstands</strong> ofrece servicio de venta e instalación de moquetas en <strong>Terrassa</strong>. Cubrimos todo el Vallès Occidental con entrega rápida y montaje profesional.</p>
<h2>Tipos de moquetas para Terrassa</h2>
<ul>
<li>Moquetas feriales para eventos locales</li>
<li>Losetas de moqueta para oficinas y coworkings</li>
<li>Moquetas ecológicas y sostenibles</li>
<li>Moquetas decorativas para comercios</li>
</ul>`,
    category: "moquetas",
    city: "Terrassa",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis moquetas en Terrassa?", answer: "Sí, cubrimos todo Terrassa y el Vallès Occidental con servicio de entrega rápida y montaje profesional." },
      { question: "¿Qué moqueta recomendáis para oficinas en Terrassa?", answer: "Para oficinas recomendamos losetas modulares por su fácil instalación, mantenimiento y sustitución parcial." },
      { question: "¿Tienen moquetas ecológicas disponibles en Terrassa?", answer: "Sí, nuestra moqueta ecológica 100% reciclable está disponible con entrega en 24-48h en Terrassa." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Entrega en 24-48h en Terrassa",
      "Instalación profesional disponible",
      "Losetas modulares para oficinas",
      "Moquetas ecológicas disponibles",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-mataro",
    title: "Moquetas en Mataró — Venta e Instalación | Disstands",
    h1: "Moquetas en Mataró",
    description: "Venta e instalación de moquetas en Mataró y el Maresme. Moquetas feriales, ecológicas y para oficinas. Entrega rápida.",
    content: `<p><strong>Disstands</strong> suministra e instala moquetas en <strong>Mataró</strong> y toda la comarca del Maresme. Servicio profesional con más de 23 años de experiencia.</p>
<h2>Servicio en Mataró y el Maresme</h2>
<p>Cubrimos Mataró, Premià de Mar, El Masnou y toda la costa del Maresme. Entrega rápida y montaje profesional para ferias, oficinas y comercios.</p>`,
    category: "moquetas",
    city: "Mataró",
    region: "Cataluña",
    faqs: [
      { question: "¿Cubrís Mataró y el Maresme con vuestro servicio de moquetas?", answer: "Sí, cubrimos Mataró, Premià de Mar, El Masnou y toda la comarca del Maresme." },
      { question: "¿Cuánto tardáis en instalar moqueta en Mataró?", answer: "La instalación estándar se realiza en 1-2 días, con entrega rápida desde Barcelona." },
      { question: "¿Qué precios tienen las moquetas para comercios en Mataró?", answer: "Las moquetas feriales comienzan desde 2,65 €/m² y las losetas de oficina desde 12 €/m²." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Cobertura en Mataró y el Maresme",
      "Entrega rápida desde Barcelona",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Precios competitivos",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-reus-disstands",
    title: "Moquetas en Reus — Venta e Instalación | Disstands",
    h1: "Moquetas en Reus",
    description: "Instalación y venta de moquetas en Reus. Moquetas para ferias, eventos, oficinas y comercios. Desde 2,65 €/m².",
    content: `<p>En <strong>Disstands</strong> ofrecemos moquetas en <strong>Reus</strong> y toda la zona del Camp de Tarragona. Instalación profesional y entrega rápida desde Barcelona.</p>
<h2>Moquetas para Reus</h2>
<p>Disponemos de moquetas feriales, ecológicas, velour y de oficina. Precios desde 2,65 €/m² con envío rápido a Reus y alrededores.</p>`,
    category: "moquetas",
    city: "Reus",
    region: "Cataluña",
    faqs: [
      { question: "¿Enviáis moquetas a Reus?", answer: "Sí, realizamos envíos regulares a Reus y toda la zona del Camp de Tarragona con entrega rápida." },
      { question: "¿Cuál es el precio mínimo de moqueta en Reus?", answer: "Nuestras moquetas feriales comienzan desde 2,65 €/m² con envío incluido a Reus." },
      { question: "¿Ofrecéis montaje profesional en Reus?", answer: "Sí, nuestro equipo de instaladores se desplaza a Reus para todo tipo de proyectos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Envío rápido a Reus desde Barcelona",
      "Precios desde 2,65 €/m²",
      "Instalación profesional disponible",
      "Stock permanente",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moquetas-el-masnou",
    title: "Moquetas en El Masnou — Venta e Instalación | Disstands",
    h1: "Moquetas en El Masnou",
    description: "Compra e instalación de moquetas en El Masnou. Servicio profesional desde Barcelona. Presupuesto sin compromiso.",
    content: `<p><strong>Disstands</strong> ofrece moquetas en <strong>El Masnou</strong> y toda la comarca del Maresme. Moquetas feriales, ecológicas y de oficina con instalación profesional.</p>`,
    category: "moquetas",
    city: "El Masnou",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis servicio de moquetas en El Masnou?", answer: "Sí, cubrimos El Masnou y toda la comarca del Maresme con entrega rápida desde Barcelona." },
      { question: "¿Qué tipos de moqueta puedo comprar en El Masnou?", answer: "Disponemos de moquetas feriales, ecológicas, velour, de oficina y decorativas para todo tipo de espacios." },
      { question: "¿La instalación está incluida en el precio?", answer: "Ofrecemos instalación profesional con presupuesto aparte. Consulte sin compromiso." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Entrega rápida en El Masnou",
      "Instalación profesional disponible",
      "Amplia variedad de moquetas",
      "Precios competitivos",
      "Asesoramiento personalizado",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-el-prat-de-llobregat",
    title: "Moquetas en El Prat de Llobregat — Instalación | Disstands",
    h1: "Moquetas en El Prat de Llobregat",
    description: "Venta e instalación de moquetas en El Prat de Llobregat. Moquetas feriales, ecológicas y para oficinas. Servicio rápido.",
    content: `<p><strong>Disstands</strong> suministra e instala moquetas en <strong>El Prat de Llobregat</strong>. Cercanía a Fira Barcelona Gran Via para servicio urgente en ferias y congresos.</p>`,
    category: "moquetas",
    city: "El Prat de Llobregat",
    region: "Cataluña",
    faqs: [
      { question: "¿Instaláis moquetas en El Prat de Llobregat?", answer: "Sí, cubrimos El Prat con servicio rápido gracias a nuestra cercanía a Fira Barcelona Gran Via." },
      { question: "¿Ofrecéis servicio urgente para ferias cerca de El Prat?", answer: "Sí, nuestra proximidad a Fira Barcelona Gran Via nos permite ofrecer montajes urgentes en el mismo día." },
      { question: "¿Qué precios tienen las moquetas en El Prat?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² para moqueta ferial básica." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Cercanía a Fira Barcelona Gran Via",
      "Servicio urgente disponible",
      "Entrega en el mismo día",
      "Instalación profesional disponible",
      "Precios desde 2,65 €/m²",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-esplugues-de-llobregat",
    title: "Moquetas en Esplugues de Llobregat — Instalación | Disstands",
    h1: "Moquetas en Esplugues de Llobregat",
    description: "Instalación y venta de moquetas en Esplugues de Llobregat. Servicio profesional desde Barcelona.",
    content: `<p><strong>Disstands</strong> ofrece moquetas en <strong>Esplugues de Llobregat</strong>. Servicio rápido y profesional para oficinas, comercios y eventos.</p>`,
    category: "moquetas",
    city: "Esplugues de Llobregat",
    region: "Cataluña",
    faqs: [
      { question: "¿Vendéis moquetas en Esplugues de Llobregat?", answer: "Sí, ofrecemos venta e instalación profesional de moquetas en Esplugues de Llobregat." },
      { question: "¿Cuánto tardáis en entregar moqueta en Esplugues?", answer: "Entrega en 24 horas desde la confirmación del pedido en Esplugues de Llobregat." },
      { question: "¿Qué moqueta recomendáis para oficinas?", answer: "Para oficinas recomendamos losetas modulares con aislamiento acústico, desde 12 €/m²." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Entrega en 24h en Esplugues",
      "Instalación profesional disponible",
      "Servicio rápido y profesional",
      "Precios competitivos",
      "Asesoramiento personalizado",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-santa-coloma-de-gramenet",
    title: "Moquetas en Santa Coloma de Gramenet — Instalación | Disstands",
    h1: "Moquetas en Santa Coloma de Gramenet",
    description: "Venta e instalación de moquetas en Santa Coloma de Gramenet. Precios desde 2,65 €/m².",
    content: `<p><strong>Disstands</strong> suministra e instala moquetas en <strong>Santa Coloma de Gramenet</strong>. Todo tipo de moquetas con instalación profesional disponible.</p>`,
    category: "moquetas",
    city: "Santa Coloma de Gramenet",
    region: "Cataluña",
    faqs: [
      { question: "¿Instaláis moquetas en Santa Coloma de Gramenet?", answer: "Sí, ofrecemos instalación profesional de moquetas en Santa Coloma de Gramenet con entrega rápida." },
      { question: "¿Cuál es el precio más económico de moqueta?", answer: "Nuestras moquetas feriales comienzan desde 2,65 €/m², ideales para eventos y protección de suelos." },
      { question: "¿Ofrecéis presupuesto sin compromiso?", answer: "Sí, realizamos presupuestos gratuitos y sin compromiso para cualquier proyecto en Santa Coloma." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Precios desde 2,65 €/m²",
      "Instalación profesional disponible",
      "Entrega rápida en Santa Coloma",
      "Presupuesto sin compromiso",
      "Amplia gama de colores",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moquetas-cornella-barcelona-instalacion",
    title: "Moquetas en Cornellà de Llobregat — Instalación | Disstands",
    h1: "Moquetas en Cornellà de Llobregat",
    description: "Instalación y venta de moquetas en Cornellà de Llobregat. Moquetas feriales, oficinas y comercios.",
    content: `<p><strong>Disstands</strong> instala moquetas en <strong>Cornellà de Llobregat</strong> y todo el Baix Llobregat. Servicio profesional con entrega rápida desde Barcelona.</p>`,
    category: "moquetas",
    city: "Cornellà de Llobregat",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis moquetas en Cornellà de Llobregat?", answer: "Sí, cubrimos Cornellà y todo el Baix Llobregat con entrega rápida desde Barcelona." },
      { question: "¿Cuánto cuesta la instalación de moqueta en Cornellà?", answer: "El coste de instalación depende del tipo de moqueta y la superficie. Presupuesto gratuito disponible." },
      { question: "¿Tenéis moquetas ignífugas para locales comerciales?", answer: "Sí, todas nuestras moquetas feriales tienen certificación ignífuga Bfl-s1, obligatoria para espacios públicos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Entrega rápida en Cornellà",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
      "Cobertura en todo el Baix Llobregat",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-valles-occidental-disstands",
    title: "Moquetas en el Vallès Occidental — Instalación | Disstands",
    h1: "Moquetas en el Vallès Occidental",
    description: "Venta e instalación de moquetas en el Vallès Occidental: Sabadell, Terrassa, Cerdanyola y más. Desde 2,65 €/m².",
    content: `<p><strong>Disstands</strong> cubre toda la comarca del <strong>Vallès Occidental</strong> con servicio de venta e instalación de moquetas. Sabadell, Terrassa, Cerdanyola del Vallès, Rubí, Sant Cugat y más.</p>`,
    category: "moquetas",
    region: "Cataluña",
    faqs: [
      { question: "¿Cubrís toda la comarca del Vallès Occidental?", answer: "Sí, cubrimos Sabadell, Terrassa, Cerdanyola del Vallès, Rubí, Sant Cugat y todas las poblaciones de la comarca." },
      { question: "¿Cuánto cuesta la moqueta en el Vallès Occidental?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² con transporte incluido a toda la comarca." },
      { question: "¿Ofrecéis instalación profesional en el Vallès?", answer: "Sí, nuestro equipo de instaladores cubre todo el Vallès Occidental con servicio profesional." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Cobertura en todo el Vallès Occidental",
      "Precios desde 2,65 €/m²",
      "Instalación profesional disponible",
      "Entrega en 24-48h",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en la comarca" },
    ],
  },

  // ========================================
  // MOQUETAS — Barrios de Barcelona
  // ========================================
  {
    slug: "moquetas-eixample",
    title: "Moquetas en el Eixample, Barcelona — Instalación | Disstands",
    h1: "Moquetas en el Eixample, Barcelona",
    description: "Instalación y venta de moquetas en el Eixample de Barcelona. Moquetas para oficinas, comercios y eventos.",
    content: `<p><strong>Disstands</strong> ofrece servicio de instalación de moquetas en el <strong>Eixample de Barcelona</strong>, incluyendo la Dreta de l'Eixample, l'Antiga Esquerra, la Nova Esquerra, Sant Antoni y Fort Pienc.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en el Eixample de Barcelona?", answer: "Sí, cubrimos todo el Eixample incluyendo Dreta, Antigua y Nova Esquerra, Sant Antoni y Fort Pienc." },
      { question: "¿Qué moqueta recomendáis para oficinas en el Eixample?", answer: "Para oficinas del Eixample recomendamos losetas modulares con aislamiento acústico, ideales para edificios históricos." },
      { question: "¿Cuánto tardáis en instalar moqueta en el Eixample?", answer: "La instalación estándar se realiza en 1-2 días laborables." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Servicio en todo el Eixample",
      "Instalación profesional disponible",
      "Experiencia en edificios históricos",
      "Losetas modulares para oficinas",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-eixample-barcelona",
    title: "Moquetas en Eixample Barcelona — Venta Profesional | Disstands",
    h1: "Moquetas profesionales en el Eixample de Barcelona",
    description: "Venta profesional de moquetas en el Eixample de Barcelona. Losetas de oficina, moquetas feriales y decorativas.",
    content: `<p>Servicio profesional de <strong>moquetas en el Eixample de Barcelona</strong>. Losetas modulares para oficinas, moquetas feriales y soluciones decorativas con instalación disponible.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Qué moquetas profesionales ofrecéis en el Eixample?", answer: "Ofrecemos losetas modulares para oficinas, moquetas feriales y soluciones decorativas con instalación disponible." },
      { question: "¿Cuánto cuestan las losetas de moqueta para oficinas?", answer: "Las losetas modulares para oficinas tienen un precio desde 12 €/m² con instalación profesional." },
      { question: "¿Ofrecéis moquetas decorativas para comercios del Eixample?", answer: "Sí, disponemos de una amplia gama de moquetas decorativas adaptadas a comercios y espacios con personalidad." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Losetas modulares para oficinas",
      "Moquetas feriales disponibles",
      "Soluciones decorativas variadas",
      "Instalación profesional disponible",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-sants-barcelona",
    title: "Moquetas en Sants, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Sants, Barcelona",
    description: "Venta e instalación de moquetas en Sants-Montjuïc, Barcelona. Cerca de Fira Barcelona Montjuïc.",
    content: `<p><strong>Disstands</strong> instala moquetas en <strong>Sants-Montjuïc</strong>, zona estratégica junto a Fira Barcelona Montjuïc. Servicio urgente para ferias y eventos.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas cerca de Fira Barcelona Montjuïc?", answer: "Sí, Sants-Montjuïc es zona estratégica junto a Fira Montjuïc y ofrecemos servicio urgente para ferias." },
      { question: "¿Ofrecéis servicio urgente para ferias en Sants?", answer: "Sí, realizamos montajes urgentes para ferias y eventos en Fira Barcelona Montjuïc, incluso en el mismo día." },
      { question: "¿Qué tipos de moqueta ofrecéis en Sants?", answer: "Disponemos de moquetas feriales, ecológicas, velour, ignífugas y losetas de oficina." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Junto a Fira Barcelona Montjuïc",
      "Servicio urgente para ferias",
      "Instalación profesional disponible",
      "Montaje en el mismo día",
      "Certificación ignífuga Bfl-s1",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Servicio urgente" },
    ],
  },
  {
    slug: "moquetas-les-corts-barcelona-instalacion",
    title: "Moquetas en Les Corts, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Les Corts, Barcelona",
    description: "Instalación de moquetas en Les Corts, Barcelona. Servicio profesional para oficinas y comercios.",
    content: `<p>Instalación profesional de moquetas en <strong>Les Corts, Barcelona</strong>. Zona de oficinas y centros de negocios donde ofrecemos losetas modulares y moquetas acústicas.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas para oficinas en Les Corts?", answer: "Sí, ofrecemos losetas modulares y moquetas acústicas ideales para la zona de oficinas de Les Corts." },
      { question: "¿Qué moqueta es mejor para centros de negocios?", answer: "Recomendamos losetas modulares con aislamiento acústico, fáciles de mantener y sustituir parcialmente." },
      { question: "¿Cuánto cuesta instalar moqueta en Les Corts?", answer: "El precio depende del tipo y superficie. Losetas de oficina desde 12 €/m² con instalación disponible." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Especialistas en oficinas",
      "Losetas modulares acústicas",
      "Instalación profesional disponible",
      "Sustitución parcial fácil",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-horta-guinardo",
    title: "Moquetas en Horta-Guinardó, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Horta-Guinardó, Barcelona",
    description: "Venta e instalación de moquetas en Horta-Guinardó, Barcelona. Precios desde 2,65 €/m².",
    content: `<p><strong>Disstands</strong> ofrece moquetas en <strong>Horta-Guinardó</strong>. Moquetas para oficinas, comercios y espacios residenciales con instalación profesional.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en Horta-Guinardó?", answer: "Sí, ofrecemos instalación profesional de moquetas en todo el distrito de Horta-Guinardó." },
      { question: "¿Qué precios tienen las moquetas en Horta-Guinardó?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² para moqueta ferial y desde 12 €/m² para losetas de oficina." },
      { question: "¿Ofrecéis moquetas para viviendas?", answer: "Sí, disponemos de moquetas residenciales con aislamiento acústico y máximo confort." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Precios desde 2,65 €/m²",
      "Instalación profesional disponible",
      "Moquetas residenciales y comerciales",
      "Aislamiento acústico",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moquetas-nou-barris-barcelona",
    title: "Moquetas en Nou Barris, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Nou Barris, Barcelona",
    description: "Instalación y venta de moquetas en Nou Barris, Barcelona. Servicio profesional con precios competitivos.",
    content: `<p>Venta e instalación de moquetas en <strong>Nou Barris, Barcelona</strong>. Servicio rápido y profesional con los mejores precios del mercado.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas en Nou Barris?", answer: "Sí, ofrecemos venta e instalación profesional de moquetas en todo el distrito de Nou Barris." },
      { question: "¿Cuáles son los precios de moqueta en Nou Barris?", answer: "Ofrecemos los mejores precios del mercado, desde 2,65 €/m² para moqueta ferial." },
      { question: "¿Cuánto tardáis en instalar moqueta en Nou Barris?", answer: "La instalación se realiza en 1-2 días laborables con entrega rápida." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Los mejores precios del mercado",
      "Servicio rápido y profesional",
      "Instalación profesional disponible",
      "Entrega en 24h",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },

  // ========================================
  // MOQUETAS — Barrios específicos
  // ========================================
  {
    slug: "moquetas-en-badalona-instalacion-y-venta-profesional",
    title: "Moquetas en Badalona — Instalación y Venta | Disstands",
    h1: "Moquetas en Badalona",
    description: "Instalación y venta profesional de moquetas en Badalona. Moquetas feriales, ecológicas y de oficina.",
    content: `<p><strong>Disstands</strong> ofrece servicio de moquetas en <strong>Badalona</strong>. Instalación profesional y entrega rápida para todo tipo de proyectos.</p>`,
    category: "moquetas",
    city: "Badalona",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis servicio de moquetas en Badalona?", answer: "Sí, ofrecemos venta e instalación profesional de moquetas en Badalona con entrega rápida desde Barcelona." },
      { question: "¿Cuánto cuesta la moqueta en Badalona?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² para moqueta ferial. Presupuesto gratuito disponible." },
      { question: "¿Instaláis moquetas para eventos en Badalona?", answer: "Sí, instalamos moquetas para ferias, eventos corporativos y celebraciones en Badalona." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Entrega rápida en Badalona",
      "Instalación profesional disponible",
      "Precios desde 2,65 €/m²",
      "Servicio para eventos",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-en-ciutat-vella",
    title: "Moquetas en Ciutat Vella, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Ciutat Vella, Barcelona",
    description: "Venta e instalación de moquetas en Ciutat Vella, Barcelona. Raval, Gòtic, Born y Barceloneta.",
    content: `<p>Instalamos moquetas en <strong>Ciutat Vella</strong>: El Raval, Barri Gòtic, El Born, Sant Pere y La Barceloneta. Servicio adaptado a los edificios históricos del centro de Barcelona.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en Ciutat Vella?", answer: "Sí, cubrimos todo Ciutat Vella: El Raval, Barri Gòtic, El Born, Sant Pere y La Barceloneta." },
      { question: "¿Tenéis experiencia en edificios históricos?", answer: "Sí, contamos con amplia experiencia en instalaciones adaptadas a edificios históricos del centro de Barcelona." },
      { question: "¿Qué moqueta recomendáis para hoteles en el centro?", answer: "Para hoteles recomendamos moqueta Velour Lux por su acabado premium y elegancia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Experiencia en edificios históricos",
      "Cobertura en todo Ciutat Vella",
      "Instalación profesional disponible",
      "Moquetas premium para hoteles",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-raval",
    title: "Moquetas en El Raval, Barcelona — Instalación | Disstands",
    h1: "Moquetas en El Raval, Barcelona",
    description: "Instalación de moquetas en El Raval, Barcelona. Servicio profesional para comercios, hoteles y oficinas.",
    content: `<p>Servicio de instalación de moquetas en <strong>El Raval, Barcelona</strong>. Soluciones para hoteles, hostales, comercios y oficinas del centro de la ciudad.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en El Raval?", answer: "Sí, ofrecemos instalación profesional de moquetas en El Raval para hoteles, hostales, comercios y oficinas." },
      { question: "¿Qué moqueta es adecuada para hoteles en El Raval?", answer: "Recomendamos moqueta Velour Lux o losetas modulares, dependiendo del nivel del establecimiento." },
      { question: "¿Cuánto tardáis en instalar moqueta en El Raval?", answer: "La instalación estándar se realiza en 1-2 días laborables." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Soluciones para hostelería",
      "Instalación profesional disponible",
      "Experiencia en edificios del centro",
      "Moquetas premium disponibles",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-barrio-gotic",
    title: "Moquetas en el Barri Gòtic, Barcelona — Instalación | Disstands",
    h1: "Moquetas en el Barri Gòtic, Barcelona",
    description: "Venta e instalación de moquetas en el Barrio Gótico de Barcelona. Servicio profesional.",
    content: `<p>Instalamos moquetas en el <strong>Barri Gòtic de Barcelona</strong>. Experiencia en edificios históricos y espacios comerciales del centro.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en el Barri Gòtic?", answer: "Sí, tenemos amplia experiencia instalando moquetas en edificios históricos del Barrio Gótico." },
      { question: "¿Qué cuidados especiales requiere la instalación en edificios antiguos?", answer: "Adaptamos nuestras técnicas de instalación a cada edificio, respetando los suelos originales." },
      { question: "¿Qué moqueta recomendáis para galerías de arte?", answer: "Para galerías recomendamos moqueta Velour Lux en tonos neutros, elegante y con excelente acústica." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Experiencia en edificios históricos",
      "Instalación profesional adaptada",
      "Moquetas premium disponibles",
      "Asesoramiento personalizado",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-sant-pere-disstands",
    title: "Moquetas en Sant Pere, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Sant Pere, Barcelona",
    description: "Instalación de moquetas en Sant Pere, Santa Caterina i la Ribera, Barcelona.",
    content: `<p>Servicio de moquetas en <strong>Sant Pere, Santa Caterina i la Ribera</strong>. Instalación profesional adaptada a cada espacio.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en Sant Pere?", answer: "Sí, ofrecemos instalación profesional de moquetas en Sant Pere, Santa Caterina i la Ribera." },
      { question: "¿Qué precios tienen las moquetas en esta zona?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² (solo material). Instalación profesional disponible con presupuesto aparte." },
      { question: "¿Adaptáis la instalación a edificios antiguos?", answer: "Sí, adaptamos nuestras técnicas a cada espacio respetando las características del edificio." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Instalación adaptada a cada espacio",
      "Experiencia en barrios históricos",
      "Precios desde 2,65 €/m²",
      "Instalación profesional disponible",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-el-font-pienc-disstands",
    title: "Moquetas en Fort Pienc, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Fort Pienc, Barcelona",
    description: "Venta e instalación de moquetas en Fort Pienc, Barcelona. Cerca de la Estació del Nord.",
    content: `<p>Instalamos moquetas en <strong>Fort Pienc, Barcelona</strong>. Zona cercana a la Estació del Nord, ideal para oficinas y espacios de coworking.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en Fort Pienc?", answer: "Sí, ofrecemos instalación profesional de moquetas en Fort Pienc, cerca de la Estació del Nord." },
      { question: "¿Qué moqueta recomendáis para coworkings?", answer: "Para coworkings recomendamos losetas modulares con aislamiento acústico, fáciles de mantener." },
      { question: "¿Cuánto tardáis en la instalación?", answer: "La instalación estándar se realiza en 1-2 días laborables." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Ideal para oficinas y coworkings",
      "Losetas modulares acústicas",
      "Instalación profesional disponible",
      "Cerca de Estació del Nord",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-sant-antoni-disstands",
    title: "Moquetas en Sant Antoni, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Sant Antoni, Barcelona",
    description: "Instalación y venta de moquetas en Sant Antoni, Barcelona. Servicio profesional.",
    content: `<p>Ofrecemos moquetas en <strong>Sant Antoni, Barcelona</strong>. Instalación profesional para comercios, oficinas y viviendas del barrio.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas en Sant Antoni?", answer: "Sí, ofrecemos venta e instalación profesional de moquetas en Sant Antoni, Barcelona." },
      { question: "¿Qué moqueta recomendáis para comercios en Sant Antoni?", answer: "Para comercios recomendamos moquetas feriales o decorativas según el tipo de establecimiento." },
      { question: "¿Cuánto cuesta la moqueta para viviendas?", answer: "Las moquetas residenciales comienzan desde 5,95 €/m² con acabado Velour." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Servicio en Sant Antoni",
      "Instalación profesional disponible",
      "Moquetas para comercios y viviendas",
      "Amplia variedad de diseños",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-barrio-el-born-barcelona",
    title: "Moquetas en El Born, Barcelona — Instalación | Disstands",
    h1: "Moquetas en El Born, Barcelona",
    description: "Venta e instalación de moquetas en El Born, Barcelona. Para hoteles boutique, galerías y comercios.",
    content: `<p>Moquetas para <strong>El Born, Barcelona</strong>. Soluciones elegantes para hoteles boutique, galerías de arte, restaurantes y comercios del barrio.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas para hoteles boutique en El Born?", answer: "Sí, ofrecemos moquetas premium Velour Lux ideales para hoteles boutique y espacios exclusivos." },
      { question: "¿Qué moqueta es mejor para galerías de arte?", answer: "Recomendamos moqueta Velour en tonos neutros por su elegancia y excelente acústica." },
      { question: "¿Instaláis moqueta en restaurantes?", answer: "Sí, ofrecemos soluciones de moqueta resistente al tráfico para restaurantes y bares." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Soluciones para hoteles boutique",
      "Moquetas elegantes y premium",
      "Instalación profesional disponible",
      "Experiencia en el barrio del Born",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moquetas-barrio-gran-via-sud-hospitalet",
    title: "Moquetas en Gran Via Sud, L'Hospitalet — Instalación | Disstands",
    h1: "Moquetas en Gran Via Sud, L'Hospitalet",
    description: "Moquetas en Gran Via Sud, L'Hospitalet. Cerca de Fira Barcelona Gran Via. Servicio urgente para ferias.",
    content: `<p>Instalamos moquetas en <strong>Gran Via Sud, L'Hospitalet</strong>. Ubicación estratégica junto a Fira Barcelona Gran Via para montajes urgentes de ferias y congresos internacionales.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    faqs: [
      { question: "¿Ofrecéis servicio urgente para Fira Barcelona Gran Via?", answer: "Sí, nuestra ubicación en Gran Via Sud nos permite montajes urgentes para ferias y congresos internacionales." },
      { question: "¿Cuánto tiempo tardáis en montar moqueta para una feria?", answer: "Realizamos montajes urgentes en el mismo día para ferias en Fira Barcelona Gran Via." },
      { question: "¿Qué moqueta es obligatoria en recintos feriales?", answer: "Es obligatoria moqueta con certificación ignífuga Bfl-s1 en todos los recintos feriales." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Junto a Fira Barcelona Gran Via",
      "Montajes urgentes en el mismo día",
      "Certificación ignífuga Bfl-s1",
      "Stock permanente disponible",
      "Experiencia en congresos internacionales",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Servicio urgente" },
    ],
  },
  {
    slug: "instalacion-de-moquetas-en-poblenou-disstands",
    title: "Moquetas en Poblenou, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Poblenou, Barcelona",
    description: "Instalación de moquetas en Poblenou, Barcelona. Zona 22@ con oficinas y startups.",
    content: `<p>Moquetas en <strong>Poblenou y distrito 22@</strong>. Losetas modulares para oficinas tecnológicas, coworkings y startups de Barcelona.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas para oficinas en el 22@?", answer: "Sí, somos especialistas en losetas modulares para oficinas tecnológicas y coworkings del distrito 22@." },
      { question: "¿Qué moqueta recomendáis para startups?", answer: "Recomendamos losetas modulares por su versatilidad, facilidad de instalación y mantenimiento." },
      { question: "¿Cuánto cuestan las losetas modulares para oficinas?", answer: "Las losetas modulares comienzan desde 12 €/m² con instalación profesional." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Especialistas en distrito 22@",
      "Losetas modulares para tech",
      "Instalación profesional disponible",
      "Fácil mantenimiento",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-el-collblanc-disstands",
    title: "Moquetas en Collblanc, L'Hospitalet — Instalación | Disstands",
    h1: "Moquetas en Collblanc",
    description: "Instalación de moquetas en Collblanc, L'Hospitalet de Llobregat. Servicio profesional.",
    content: `<p>Servicio de moquetas en <strong>Collblanc, L'Hospitalet</strong>. Instalación profesional para comercios y oficinas del barrio.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    faqs: [
      { question: "¿Ofrecéis moquetas en Collblanc?", answer: "Sí, ofrecemos instalación profesional de moquetas en Collblanc, L'Hospitalet de Llobregat." },
      { question: "¿Cuánto cuesta la moqueta en Collblanc?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² (solo material). Servicio de instalación disponible con presupuesto aparte." },
      { question: "¿Realizáis presupuestos sin compromiso?", answer: "Sí, realizamos presupuestos gratuitos y sin compromiso para cualquier proyecto." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Servicio en Collblanc",
      "Instalación profesional disponible",
      "Precios desde 2,65 €/m²",
      "Presupuesto sin compromiso",
      "Entrega rápida",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-barrio-collblanc",
    title: "Moquetas en el barrio de Collblanc — Instalación | Disstands",
    h1: "Moquetas en el barrio de Collblanc",
    description: "Venta e instalación de moquetas en el barrio de Collblanc. Precios competitivos.",
    content: `<p>Ofrecemos moquetas en el <strong>barrio de Collblanc</strong> con precios competitivos e instalación profesional disponible.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    faqs: [
      { question: "¿Qué precios tienen las moquetas en Collblanc?", answer: "Ofrecemos precios competitivos desde 2,65 €/m² (solo material). Instalación profesional disponible con presupuesto aparte." },
      { question: "¿Qué tipos de moqueta vendéis en Collblanc?", answer: "Disponemos de moquetas feriales, ecológicas, velour, de oficina y decorativas." },
      { question: "¿La instalación está incluida en el precio?", answer: "La instalación profesional se presupuesta aparte según la superficie y tipo de moqueta." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Precios competitivos",
      "Instalación profesional disponible",
      "Amplia variedad de moquetas",
      "Entrega rápida",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moqueta-la-torrassa-disstands",
    title: "Moquetas en La Torrassa — Instalación | Disstands",
    h1: "Moquetas en La Torrassa",
    description: "Instalación de moquetas en La Torrassa, L'Hospitalet. Servicio rápido y profesional.",
    content: `<p>Instalamos moquetas en <strong>La Torrassa, L'Hospitalet</strong>. Servicio rápido desde Barcelona con precios competitivos.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    faqs: [
      { question: "¿Instaláis moquetas en La Torrassa?", answer: "Sí, ofrecemos instalación profesional de moquetas en La Torrassa con servicio rápido desde Barcelona." },
      { question: "¿Cuánto cuesta la moqueta más económica?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m², la opción más económica del mercado." },
      { question: "¿Realizáis entregas urgentes en La Torrassa?", answer: "Sí, disponemos de servicio de entrega urgente en La Torrassa en 24 horas." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Servicio rápido desde Barcelona",
      "Precios competitivos",
      "Instalación profesional disponible",
      "Entrega en 24h",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "instalacion-de-moquetas-en-santa-ulalia-disstands",
    title: "Moquetas en Santa Eulàlia — Instalación | Disstands",
    h1: "Moquetas en Santa Eulàlia",
    description: "Instalación de moquetas en Santa Eulàlia, L'Hospitalet de Llobregat.",
    content: `<p>Servicio de moquetas en <strong>Santa Eulàlia, L'Hospitalet</strong>. Instalación profesional para todo tipo de espacios.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    faqs: [
      { question: "¿Ofrecéis moquetas en Santa Eulàlia?", answer: "Sí, ofrecemos instalación profesional de moquetas en Santa Eulàlia, L'Hospitalet de Llobregat." },
      { question: "¿Qué tipos de espacio cubrís?", answer: "Cubrimos todo tipo de espacios: oficinas, comercios, viviendas y eventos." },
      { question: "¿Cuánto tardáis en entregar?", answer: "Entrega en 24 horas en Santa Eulàlia desde la confirmación del pedido." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Instalación para todo tipo de espacios",
      "Entrega en 24h",
      "Instalación profesional disponible",
      "Precios competitivos",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "instalacion-de-moquetas-en-hostafrancs",
    title: "Moquetas en Hostafrancs, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Hostafrancs, Barcelona",
    description: "Instalación de moquetas en Hostafrancs, Barcelona. Cerca de Fira Montjuïc.",
    content: `<p>Moquetas en <strong>Hostafrancs, Barcelona</strong>. Zona junto a Fira Montjuïc, ideal para servicio urgente en ferias y eventos.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en Hostafrancs?", answer: "Sí, Hostafrancs es zona junto a Fira Montjuïc donde ofrecemos servicio urgente para ferias y eventos." },
      { question: "¿Ofrecéis montaje urgente para ferias en Montjuïc?", answer: "Sí, realizamos montajes urgentes en el mismo día para Fira Barcelona Montjuïc." },
      { question: "¿Qué tipos de moqueta tenéis disponibles?", answer: "Disponemos de moquetas feriales, ecológicas, velour, ignífugas y losetas de oficina." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Junto a Fira Montjuïc",
      "Servicio urgente para ferias",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Servicio urgente" },
    ],
  },
  {
    slug: "instalacion-de-moquetas-en-la-bordeta-disstands",
    title: "Moquetas en La Bordeta, Barcelona — Instalación | Disstands",
    h1: "Moquetas en La Bordeta, Barcelona",
    description: "Venta e instalación de moquetas en La Bordeta, Barcelona.",
    content: `<p>Instalamos moquetas en <strong>La Bordeta, Barcelona</strong>. Servicio profesional para comercios y oficinas del barrio.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas en La Bordeta?", answer: "Sí, ofrecemos venta e instalación profesional de moquetas en La Bordeta, Barcelona." },
      { question: "¿Qué moqueta recomendáis para comercios?", answer: "Para comercios recomendamos moquetas resistentes al tráfico con certificación ignífuga." },
      { question: "¿Cuánto cuesta instalar moqueta en La Bordeta?", answer: "El precio depende del tipo y superficie. Presupuesto gratuito sin compromiso disponible." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Servicio en La Bordeta",
      "Instalación profesional disponible",
      "Moquetas para comercios y oficinas",
      "Precios competitivos",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "moquetas-la-verneda-i-la-pau-barcelona",
    title: "Moquetas en La Verneda i La Pau — Instalación | Disstands",
    h1: "Moquetas en La Verneda i La Pau, Barcelona",
    description: "Instalación de moquetas en La Verneda i La Pau, Barcelona.",
    content: `<p>Servicio de moquetas en <strong>La Verneda i La Pau, Barcelona</strong>. Instalación profesional a precios competitivos.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en La Verneda i La Pau?", answer: "Sí, ofrecemos instalación profesional de moquetas en La Verneda i La Pau a precios competitivos." },
      { question: "¿Cuáles son los precios de moqueta?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² para moqueta ferial básica." },
      { question: "¿Ofrecéis presupuesto gratuito?", answer: "Sí, realizamos presupuestos gratuitos y sin compromiso para cualquier proyecto." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Precios competitivos",
      "Instalación profesional disponible",
      "Desde 2,65 €/m²",
      "Entrega rápida",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moqueta-sant-adria-besos",
    title: "Moquetas en Sant Adrià de Besòs — Instalación | Disstands",
    h1: "Moquetas en Sant Adrià de Besòs",
    description: "Venta e instalación de moquetas en Sant Adrià de Besòs.",
    content: `<p><strong>Disstands</strong> ofrece moquetas en <strong>Sant Adrià de Besòs</strong>. Instalación profesional con entrega rápida.</p>`,
    category: "moquetas",
    city: "Sant Adrià de Besòs",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis moquetas en Sant Adrià de Besòs?", answer: "Sí, ofrecemos venta e instalación profesional de moquetas en Sant Adrià de Besòs." },
      { question: "¿Cuánto tardáis en entregar?", answer: "Entrega rápida en 24 horas desde nuestra base en Barcelona." },
      { question: "¿Qué precios tienen las moquetas?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² con descuentos por volumen." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Entrega rápida desde Barcelona",
      "Instalación profesional disponible",
      "Precios desde 2,65 €/m²",
      "Descuentos por volumen",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "instalacion-de-moquetas-en-sant-cugat",
    title: "Moquetas en Sant Cugat del Vallès — Instalación | Disstands",
    h1: "Moquetas en Sant Cugat del Vallès",
    description: "Instalación de moquetas en Sant Cugat del Vallès. Para oficinas, comercios y viviendas.",
    content: `<p>Moquetas en <strong>Sant Cugat del Vallès</strong>. Losetas modulares para oficinas, parques empresariales y viviendas de la zona.</p>`,
    category: "moquetas",
    city: "Sant Cugat del Vallès",
    region: "Cataluña",
    faqs: [
      { question: "¿Instaláis moquetas en Sant Cugat del Vallès?", answer: "Sí, ofrecemos moquetas para oficinas, parques empresariales y viviendas en Sant Cugat del Vallès." },
      { question: "¿Qué moqueta recomendáis para parques empresariales?", answer: "Para parques empresariales recomendamos losetas modulares con aislamiento acústico y fácil mantenimiento." },
      { question: "¿Cuánto cuesta la moqueta para viviendas?", answer: "Las moquetas residenciales comienzan desde 5,95 €/m² con acabado Velour premium." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Losetas modulares para oficinas",
      "Soluciones para parques empresariales",
      "Instalación profesional disponible",
      "Moquetas residenciales premium",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "tu-especialista-de-moquetas-en-valldoreix-disstands",
    title: "Moquetas en Valldoreix — Instalación | Disstands",
    h1: "Moquetas en Valldoreix",
    description: "Instalación y venta de moquetas en Valldoreix, Sant Cugat del Vallès.",
    content: `<p>Servicio de moquetas en <strong>Valldoreix</strong>. Instalación profesional en viviendas y espacios comerciales.</p>`,
    category: "moquetas",
    city: "Valldoreix",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis moquetas en Valldoreix?", answer: "Sí, ofrecemos servicio de moquetas en Valldoreix con instalación profesional." },
      { question: "¿Qué moqueta recomendáis para viviendas en Valldoreix?", answer: "Para viviendas recomendamos moqueta Velour Lux por su confort y acabado premium." },
      { question: "¿Cuánto tardáis en entregar en Valldoreix?", answer: "Entrega en 24-48 horas desde la confirmación del pedido." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Servicio en Valldoreix",
      "Instalación profesional disponible",
      "Moquetas residenciales premium",
      "Entrega en 24-48h",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en la zona" },
    ],
  },
  {
    slug: "tu-especialista-de-moquetas-en-premia-de-mar",
    title: "Moquetas en Premià de Mar — Instalación | Disstands",
    h1: "Moquetas en Premià de Mar",
    description: "Venta e instalación de moquetas en Premià de Mar, Maresme.",
    content: `<p>Moquetas en <strong>Premià de Mar</strong> y todo el Maresme. Servicio profesional con entrega rápida desde Barcelona.</p>`,
    category: "moquetas",
    city: "Premià de Mar",
    region: "Cataluña",
    faqs: [
      { question: "¿Ofrecéis moquetas en Premià de Mar?", answer: "Sí, cubrimos Premià de Mar y todo el Maresme con entrega rápida desde Barcelona." },
      { question: "¿Qué precios tienen las moquetas?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² para moqueta ferial básica." },
      { question: "¿Instaláis moqueta a domicilio?", answer: "Sí, ofrecemos instalación profesional a domicilio en Premià de Mar." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Cobertura en Premià y el Maresme",
      "Entrega rápida desde Barcelona",
      "Instalación profesional disponible",
      "Precios desde 2,65 €/m²",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega express" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-la-barceloneta-disstands",
    title: "Moquetas en La Barceloneta — Instalación | Disstands",
    h1: "Moquetas en La Barceloneta, Barcelona",
    description: "Instalación de moquetas en La Barceloneta, Barcelona.",
    content: `<p>Moquetas en <strong>La Barceloneta, Barcelona</strong>. Soluciones para hoteles, restaurantes y comercios del barrio marinero.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Ofrecéis moquetas para hoteles en La Barceloneta?", answer: "Sí, ofrecemos soluciones de moqueta para hoteles, restaurantes y comercios del barrio marinero." },
      { question: "¿Qué moqueta es resistente a la humedad?", answer: "Para zonas costeras recomendamos moquetas sintéticas con tratamiento antihumedad." },
      { question: "¿Instaláis moqueta en restaurantes?", answer: "Sí, ofrecemos moquetas resistentes al tráfico y fáciles de limpiar para hostelería." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: ["Soluciones para hostelería", "Moquetas resistentes al tráfico", "Instalación profesional disponible", "Experiencia en el barrio marinero", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "24h", label: "Entrega urgente" }],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-poblesec-disstands",
    title: "Moquetas en Poble-sec, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Poble-sec, Barcelona",
    description: "Instalación de moquetas en Poble-sec, Barcelona. Cerca de Montjuïc y Fira Barcelona.",
    content: `<p>Moquetas en <strong>Poble-sec, Barcelona</strong>. Barrio junto a Montjuïc y Fira Barcelona, servicio rápido para ferias y eventos.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en Poble-sec?", answer: "Sí, Poble-sec es zona junto a Montjuïc y Fira Barcelona donde ofrecemos servicio rápido." },
      { question: "¿Ofrecéis servicio urgente para ferias?", answer: "Sí, realizamos montajes urgentes para ferias y eventos en Fira Montjuïc." },
      { question: "¿Qué precios tienen las moquetas?", answer: "Nuestras moquetas comienzan desde 2,65 €/m² para moqueta ferial." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: ["Junto a Montjuïc y Fira Barcelona", "Servicio rápido para ferias", "Instalación profesional disponible", "Precios desde 2,65 €/m²", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "24h", label: "Servicio urgente" }],
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-plaza-cataluna-disstands",
    title: "Moquetas en Plaza Cataluña, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Plaza Cataluña, Barcelona",
    description: "Instalación de moquetas en la zona de Plaza Cataluña, Barcelona.",
    content: `<p>Servicio de instalación de moquetas en la zona de <strong>Plaza Cataluña, Barcelona</strong>. Oficinas, hoteles y comercios del centro.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis moquetas en la zona de Plaza Cataluña?", answer: "Sí, ofrecemos instalación profesional en oficinas, hoteles y comercios del centro de Barcelona." },
      { question: "¿Qué moqueta recomendáis para hoteles céntricos?", answer: "Recomendamos moqueta Velour Lux por su acabado premium, ideal para hoteles de alto nivel." },
      { question: "¿Cuánto tardáis en instalar?", answer: "La instalación estándar se realiza en 1-2 días laborables." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: ["Centro de Barcelona", "Soluciones para hoteles y oficinas", "Instalación profesional disponible", "Moquetas premium disponibles", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "24h", label: "Entrega urgente" }],
  },
  {
    slug: "moquetas-barrio-antiga-esquerra-eixample-barcelona",
    title: "Moquetas en Antiga Esquerra de l'Eixample — Instalación | Disstands",
    h1: "Moquetas en la Antiga Esquerra de l'Eixample",
    description: "Instalación de moquetas en la Antiga Esquerra del Eixample, Barcelona.",
    content: `<p>Moquetas en la <strong>Antiga Esquerra de l'Eixample</strong>. Zona de oficinas y comercios donde instalamos losetas modulares y moquetas acústicas.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Instaláis en la Antiga Esquerra de l'Eixample?", answer: "Sí, instalamos losetas modulares y moquetas acústicas en esta zona de oficinas y comercios." },
      { question: "¿Qué moqueta es mejor para oficinas?", answer: "Recomendamos losetas modulares con aislamiento acústico, fáciles de mantener y sustituir." },
      { question: "¿Cuánto cuestan las losetas modulares?", answer: "Las losetas modulares comienzan desde 12 €/m² con instalación profesional." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: ["Losetas modulares acústicas", "Zona de oficinas del Eixample", "Instalación profesional disponible", "Fácil mantenimiento", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "24h", label: "Entrega urgente" }],
  },
  {
    slug: "instalacion-de-moquetas-en-andorra-disstands",
    title: "Moquetas en Andorra — Venta e Instalación | Disstands",
    h1: "Moquetas en Andorra",
    description: "Venta e instalación de moquetas en Andorra. Servicio profesional desde Barcelona. Hoteles, comercios y oficinas.",
    content: `<p><strong>Disstands</strong> ofrece servicio de moquetas en <strong>Andorra</strong>. Suministramos e instalamos moquetas para hoteles, estaciones de esquí, comercios y oficinas del Principado.</p>`,
    category: "moquetas",
    city: "Andorra",
    faqs: [
      { question: "¿Ofrecéis servicio de moquetas en Andorra?", answer: "Sí, suministramos e instalamos moquetas para hoteles, estaciones de esquí, comercios y oficinas." },
      { question: "¿Cuánto tardáis en entregar en Andorra?", answer: "La entrega en Andorra se realiza en 48-72 horas desde Barcelona." },
      { question: "¿El transporte a Andorra tiene coste adicional?", answer: "El coste de transporte se incluye en el presupuesto global del proyecto." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: ["Servicio en todo el Principado", "Transporte desde Barcelona incluido", "Experiencia en hoteles de montaña", "Instalación profesional disponible", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "72h", label: "Entrega en Andorra" }],
  },
  {
    slug: "instalacion-de-moquetas-en-andorra-disstands-2",
    title: "Moquetas en Andorra la Vella — Instalación | Disstands",
    h1: "Moquetas en Andorra la Vella",
    description: "Instalación profesional de moquetas en Andorra la Vella. Hoteles, comercios y oficinas.",
    content: `<p>Instalamos moquetas en <strong>Andorra la Vella</strong> y todo el Principado. Servicio de transporte desde Barcelona incluido.</p>`,
    category: "moquetas",
    city: "Andorra la Vella",
    faqs: [
      { question: "¿Instaláis moquetas en Andorra la Vella?", answer: "Sí, instalamos moquetas en Andorra la Vella con transporte desde Barcelona incluido." },
      { question: "¿Qué moqueta recomendáis para hoteles en Andorra?", answer: "Para hoteles de montaña recomendamos moqueta Velour Lux por su confort y acabado premium." },
      { question: "¿Cuánto cuesta el servicio en Andorra la Vella?", answer: "El presupuesto incluye material, transporte e instalación. Consulta sin compromiso." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: ["Transporte desde Barcelona incluido", "Instalación profesional en Andorra", "Moquetas premium para hoteles", "Experiencia en el Principado", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "72h", label: "Entrega en Andorra" }],
  },
  {
    slug: "moquetas-oficinas-barcelona",
    title: "Moquetas para Oficinas en Barcelona — Instalación | Disstands",
    h1: "Moquetas para oficinas en Barcelona",
    description: "Instalación de moquetas para oficinas en Barcelona. Losetas modulares con aislamiento acústico. Desde 8 €/m².",
    content: `<p>En <strong>Disstands</strong> somos especialistas en <strong>moquetas para oficinas en Barcelona</strong>. Con más de 23 años de experiencia en pavimentos profesionales, hemos equipado cientos de oficinas, coworkings, sedes corporativas y despachos profesionales en toda el área metropolitana de Barcelona con las mejores soluciones de moqueta del mercado. Nuestro servicio incluye asesoramiento técnico, suministro, instalación profesional y mantenimiento postventa.</p>
<h2>¿Por qué instalar moqueta en tu oficina de Barcelona?</h2>
<p>La <strong>moqueta para oficinas</strong> no es simplemente un elemento decorativo: es una herramienta de productividad. Numerosos estudios demuestran que el pavimento textil mejora significativamente las condiciones de trabajo:</p>
<ul>
<li><strong>Aislamiento acústico superior</strong> — La moqueta reduce el ruido de impacto (pisadas, caída de objetos) hasta 30 dB y absorbe el ruido aéreo (conversaciones, teléfonos), creando un ambiente de trabajo más silencioso y productivo. Especialmente importante en oficinas diáfanas y open spaces.</li>
<li><strong>Confort al caminar y ergonomía</strong> — La amortiguación de la moqueta reduce la fatiga muscular en personas que pasan muchas horas de pie o caminando por la oficina, como recepcionistas y personal de atención al cliente.</li>
<li><strong>Eficiencia energética</strong> — La moqueta actúa como aislante térmico, manteniendo el suelo cálido en invierno y reduciendo las pérdidas de calor. Esto se traduce en un ahorro energético en calefacción de hasta el 10%.</li>
<li><strong>Seguridad antideslizante</strong> — Superficie que previene resbalones y caídas, reduciendo el riesgo de accidentes laborales.</li>
<li><strong>Imagen corporativa</strong> — La variedad de diseños, colores y texturas permite crear espacios de trabajo que reflejan la identidad de marca de cada empresa.</li>
</ul>
<h2>Tipos de moqueta para oficinas</h2>
<table><thead><tr><th>Tipo de moqueta</th><th>Formato</th><th>Precio desde (€/m²)</th><th>Ideal para</th></tr></thead><tbody><tr><td>Losetas modulares estándar</td><td>50x50 cm</td><td>12,00 €/m²</td><td>Oficinas generales, open spaces</td></tr><tr><td>Losetas modulares premium</td><td>50x50 cm</td><td>25,00 €/m²</td><td>Sedes corporativas, despachos de dirección</td></tr><tr><td>Losetas formato plank</td><td>25x100 cm</td><td>18,00 €/m²</td><td>Coworkings, startups, diseño contemporáneo</td></tr><tr><td>Moqueta en rollo acústica</td><td>Rollo 4 m ancho</td><td>15,00 €/m²</td><td>Grandes superficies diáfanas</td></tr><tr><td>Losetas con backing reciclado</td><td>50x50 cm</td><td>22,00 €/m²</td><td>Oficinas con certificación LEED/BREEAM</td></tr></tbody></table>
<h2>Soluciones para zonas de la oficina</h2>
<p>Cada zona de una oficina tiene necesidades específicas que podemos cubrir con la moqueta adecuada:</p>
<ul>
<li><strong>Zona de trabajo (open space)</strong> — Losetas modulares de bucle con alta resistencia al tráfico y rodaduras de sillas con ruedas. Colores neutros como gris, antracita o azul corporativo.</li>
<li><strong>Salas de reuniones</strong> — Losetas con mayor amortiguación acústica para garantizar la confidencialidad de las conversaciones. Diseños más atrevidos para espacios creativos.</li>
<li><strong>Despachos de dirección</strong> — Moqueta premium con pelo cortado velour o saxony para transmitir una imagen exclusiva y profesional.</li>
<li><strong>Zonas de paso y recepción</strong> — Losetas de alta durabilidad con diseños que pueden incluir el logotipo de la empresa o patrones corporativos.</li>
<li><strong>Zonas de descanso y cafetería</strong> — Losetas con diseños informales y coloridos que fomentan la creatividad y la relajación.</li>
</ul>
<h2>Instalación en oficinas de Barcelona</h2>
<p>Nuestro equipo de instaladores profesionales trabaja habitualmente en las principales zonas de oficinas de Barcelona: <strong>distrito 22@</strong> (Poblenou), <strong>Passeig de Gràcia</strong>, <strong>Avinguda Diagonal</strong>, <strong>Zona Franca</strong>, <strong>Sarrià-Sant Gervasi</strong>, <strong>Les Corts</strong> y los parques empresariales de la periferia. Nos adaptamos a los horarios del cliente, realizando instalaciones en fines de semana y horarios nocturnos para no interrumpir la actividad de la empresa.</p>
<p>El proceso incluye: visita técnica gratuita, medición con láser, propuesta de diseño con renders 3D (opcional), preparación del soporte, instalación de las losetas y limpieza final. Para una oficina estándar de 200-500 m², la instalación se completa en 2-3 días.</p>
<h2>Solicita presupuesto para tu oficina</h2>
<p>¿Estás reformando tu oficina en Barcelona o equipando un nuevo espacio de trabajo? <a href="/contacto">Solicita presupuesto</a> sin compromiso indicando la superficie, el tipo de oficina y tus preferencias. Nuestro equipo te visitará para tomar medidas y preparar una propuesta detallada con varias opciones de moqueta y precios. Consulta también nuestro <a href="/catalogo">catálogo</a> de moquetas para oficinas con todas las referencias disponibles.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Qué tipo de moqueta es mejor para oficinas?", answer: "Recomendamos losetas modulares con aislamiento acústico, fáciles de instalar y sustituir parcialmente." },
      { question: "¿Cuánto cuestan las moquetas para oficinas?", answer: "Las losetas modulares para oficinas comienzan desde 8 €/m² con instalación profesional." },
      { question: "¿Ofrecéis soluciones contract para empresas?", answer: "Sí, ofrecemos soluciones contract para sedes corporativas, coworkings y espacios de trabajo." },
      { question: "¿La moqueta de oficina reduce el ruido?", answer: "Sí, las moquetas para oficinas ofrecen aislamiento acústico superior, reduciendo el ruido ambiente." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: ["Especialistas en oficinas", "Losetas modulares acústicas", "Soluciones contract disponibles", "Instalación profesional disponible", "Desde 8 €/m²", "Presupuesto sin compromiso"],
    stats: [{ value: "23+", label: "Años de experiencia" }, { value: "500+", label: "Proyectos realizados" }, { value: "60+", label: "Colores disponibles" }, { value: "200+", label: "Referencias en catálogo" }],
  },

  // ========================================
  // MOQUETAS — Madrid
  // ========================================
  {
    slug: "venta-moquetas-madrid",
    title: "Moquetas en Madrid — Venta e Instalación | Disstands",
    h1: "Moquetas en Madrid",
    description: "Venta e instalación de moquetas en Madrid. Moquetas feriales, ecológicas y para oficinas. Envío desde Barcelona.",
    content: `<p><strong>Disstands</strong> ofrece servicio profesional de <strong>venta e instalación de moquetas en Madrid</strong> y toda la Comunidad de Madrid. Aunque nuestra sede central se encuentra en Barcelona, llevamos más de 23 años suministrando moquetas feriales, de oficina y decorativas a clientes madrileños, con un servicio logístico optimizado que garantiza entregas en 48-72 horas y un equipo de instaladores desplazados para proyectos en la capital.</p>
<h2>Moquetas para ferias en IFEMA Madrid</h2>
<p><strong>IFEMA Madrid</strong> es el mayor recinto ferial de España y uno de los más importantes de Europa. Disstands es proveedor habitual de <strong>moqueta ferial</strong> para stands en las principales ferias celebradas en IFEMA, incluyendo FITUR, Fruit Attraction, Intergift, SIMO Educación, Expofranquicia y decenas de eventos sectoriales a lo largo del año.</p>
<p>Todas nuestras moquetas feriales cuentan con la <strong>certificación ignífuga Bfl-s1</strong>, requisito obligatorio en IFEMA y cualquier recinto de pública concurrencia. Ofrecemos servicio de entrega directa al recinto ferial con posibilidad de descarga en el propio stand, facilitando los montajes con plazos ajustados. Para eventos de última hora, disponemos de <strong>stock permanente</strong> en los colores más demandados: gris antracita, azul marino, rojo, negro y blanco.</p>
<h2>Tipos de moquetas disponibles en Madrid</h2>
<ul>
<li><strong>Moqueta Las Vegas</strong> — La moqueta ferial más vendida de España. Punzonada, ignífuga y disponible en más de 60 colores. Ideal para stands, pasillos y áreas comunes de ferias. Desde 2,65 €/m².</li>
<li><strong>Moqueta Ecológica Reciclable</strong> — 100% reciclable al final de su vida útil. Cada vez más demandada por expositores con compromisos de sostenibilidad. Desde 2,20 €/m².</li>
<li><strong>Moqueta Velour Lux</strong> — Acabado aterciopelado premium para eventos de alto nivel, presentaciones de producto y galas corporativas. Desde 5,95 €/m².</li>
<li><strong>Losetas modulares para oficinas</strong> — Solución perfecta para las sedes corporativas del Paseo de la Castellana, Azca, Campo de las Naciones y los parques empresariales de la M-30 y M-40. Aislamiento acústico y fácil sustitución parcial.</li>
<li><strong>Moqueta ignífuga colores especiales</strong> — Personaliza tu stand con colores corporativos exactos. Más de 60 tonalidades disponibles.</li>
</ul>
<h2>Precios de moquetas en Madrid</h2>
<table><thead><tr><th>Tipo de moqueta</th><th>Precio desde (€/m²)</th><th>Uso ideal</th></tr></thead><tbody><tr><td>Moqueta Las Vegas (ferial)</td><td>2,65 €/m²</td><td>Ferias en IFEMA, eventos, protección suelos</td></tr><tr><td>Moqueta Ecológica Reciclable</td><td>2,20 €/m²</td><td>Eventos sostenibles, ferias ecológicas</td></tr><tr><td>Moqueta Colores Especiales</td><td>3,20 €/m²</td><td>Stands con identidad corporativa</td></tr><tr><td>Moqueta Velour Lux</td><td>5,95 €/m²</td><td>Galas, presentaciones, eventos premium</td></tr><tr><td>Losetas modulares oficina</td><td>12,00 €/m²</td><td>Oficinas, sedes corporativas</td></tr><tr><td>Moqueta de lana premium</td><td>25,00 €/m²</td><td>Hoteles 5 estrellas, viviendas de lujo</td></tr></tbody></table>
<h2>Cobertura en Madrid y zonas empresariales</h2>
<p>Nuestro servicio de <strong>instalación de moquetas en Madrid</strong> cubre toda la ciudad y su área metropolitana. Realizamos proyectos en las principales zonas empresariales y de negocios de la capital: <strong>Paseo de la Castellana</strong>, <strong>Azca</strong>, <strong>CTBA (Cuatro Torres Business Area)</strong>, <strong>Campo de las Naciones</strong>, <strong>Méndez Álvaro</strong>, <strong>Chamartín</strong> y el barrio de <strong>Salamanca</strong>. También atendemos municipios como Alcobendas, Las Rozas, Pozuelo de Alarcón, Getafe y Alcorcón.</p>
<p>Para ferias y eventos, nuestro equipo de instaladores se desplaza desde Barcelona con todo el material necesario, encargándose del montaje completo del suelo del stand. Ofrecemos también servicio de recogida y gestión de residuos una vez finalizado el evento.</p>
<h2>Envío y logística Barcelona-Madrid</h2>
<p>Disponemos de un servicio logístico optimizado entre Barcelona y Madrid con salidas diarias. Los pedidos realizados antes de las 14:00h se expiden el mismo día y llegan a Madrid en <strong>24-48 horas</strong>. Para pedidos urgentes durante periodos feriales, ofrecemos transporte express con entrega garantizada en el mismo día.</p>
<p>¿Necesitas moqueta para tu próxima feria en IFEMA o para las oficinas de tu empresa en Madrid? <a href="/contacto">Solicita presupuesto</a> sin compromiso o utiliza nuestro <a href="/monta-tu-feria">configurador de stands</a> para calcular el coste exacto de la moqueta que necesitas. Consulta también nuestro <a href="/catalogo">catálogo completo</a> con todos los productos disponibles.</p>`,
    category: "moquetas",
    city: "Madrid",
    region: "Madrid",
    faqs: [
      { question: "¿Enviáis moquetas a Madrid desde Barcelona?", answer: "Sí, disponemos de servicio logístico diario Barcelona-Madrid con entrega en 24-48 horas." },
      { question: "¿Instaláis moqueta para ferias en IFEMA?", answer: "Sí, somos proveedores habituales de moqueta ferial para stands en IFEMA con certificación ignífuga Bfl-s1." },
      { question: "¿Cuánto cuesta la moqueta ferial en Madrid?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m² con transporte a Madrid incluido." },
      { question: "¿Ofrecéis montaje profesional en Madrid?", answer: "Sí, nuestro equipo de instaladores se desplaza a Madrid para ferias, oficinas y eventos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío diario Barcelona-Madrid",
      "Entrega en 24-48h",
      "Servicio en IFEMA",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Madrid" },
    ],
  },
  {
    slug: "instalacion-moquetas-madrid",
    title: "Instalación de Moquetas en Madrid — Profesional | Disstands",
    h1: "Instalación de moquetas en Madrid",
    description: "Servicio de instalación profesional de moquetas en Madrid. IFEMA, oficinas y eventos.",
    content: `<p>Servicio de <strong>instalación de moquetas en Madrid</strong>. Equipo profesional desplazado desde Barcelona para ferias en IFEMA, eventos corporativos y proyectos de oficinas.</p>`,
    category: "moquetas",
    city: "Madrid",
    region: "Madrid",
    faqs: [
      { question: "¿Enviáis moquetas a Madrid desde Barcelona?", answer: "Sí, disponemos de servicio logístico diario Barcelona-Madrid con entrega en 24-48 horas." },
      { question: "¿Instaláis moqueta para ferias en IFEMA?", answer: "Sí, somos proveedores habituales de moqueta ferial para stands en IFEMA con certificación ignífuga Bfl-s1." },
      { question: "¿Cuánto cuesta la moqueta ferial en Madrid?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m² con transporte a Madrid incluido." },
      { question: "¿Ofrecéis montaje profesional en Madrid?", answer: "Sí, nuestro equipo de instaladores se desplaza a Madrid para ferias, oficinas y eventos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío diario Barcelona-Madrid",
      "Entrega en 24-48h",
      "Servicio en IFEMA",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Madrid" },
    ],
  },
  {
    slug: "moqueta-sol-madrid",
    title: "Moquetas en Sol, Madrid — Instalación | Disstands",
    h1: "Moquetas en Sol, Madrid",
    description: "Instalación de moquetas en la zona de Sol, Madrid. Comercios, hoteles y oficinas.",
    content: `<p>Moquetas en la zona de <strong>Sol, Madrid</strong>. Servicio profesional para comercios, hoteles y oficinas del centro de la capital.</p>`,
    category: "moquetas",
    city: "Madrid",
    region: "Madrid",
    faqs: [
      { question: "¿Enviáis moquetas a Madrid desde Barcelona?", answer: "Sí, disponemos de servicio logístico diario Barcelona-Madrid con entrega en 24-48 horas." },
      { question: "¿Instaláis moqueta para ferias en IFEMA?", answer: "Sí, somos proveedores habituales de moqueta ferial para stands en IFEMA con certificación ignífuga Bfl-s1." },
      { question: "¿Cuánto cuesta la moqueta ferial en Madrid?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m² con transporte a Madrid incluido." },
      { question: "¿Ofrecéis montaje profesional en Madrid?", answer: "Sí, nuestro equipo de instaladores se desplaza a Madrid para ferias, oficinas y eventos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío diario Barcelona-Madrid",
      "Entrega en 24-48h",
      "Servicio en IFEMA",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Madrid" },
    ],
  },
  {
    slug: "moqueta-chamartin-madrid",
    title: "Moquetas en Chamartín, Madrid — Instalación | Disstands",
    h1: "Moquetas en Chamartín, Madrid",
    description: "Instalación de moquetas en Chamartín, Madrid. Zona de oficinas y sedes corporativas.",
    content: `<p>Moquetas en <strong>Chamartín, Madrid</strong>. Zona de oficinas y sedes corporativas donde instalamos losetas modulares y moquetas acústicas de alto rendimiento.</p>`,
    category: "moquetas",
    city: "Madrid",
    region: "Madrid",
    faqs: [
      { question: "¿Enviáis moquetas a Madrid desde Barcelona?", answer: "Sí, disponemos de servicio logístico diario Barcelona-Madrid con entrega en 24-48 horas." },
      { question: "¿Instaláis moqueta para ferias en IFEMA?", answer: "Sí, somos proveedores habituales de moqueta ferial para stands en IFEMA con certificación ignífuga Bfl-s1." },
      { question: "¿Cuánto cuesta la moqueta ferial en Madrid?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m² con transporte a Madrid incluido." },
      { question: "¿Ofrecéis montaje profesional en Madrid?", answer: "Sí, nuestro equipo de instaladores se desplaza a Madrid para ferias, oficinas y eventos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío diario Barcelona-Madrid",
      "Entrega en 24-48h",
      "Servicio en IFEMA",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Madrid" },
    ],
  },
  {
    slug: "moqueta-salamanca-madrid",
    title: "Moquetas en el barrio de Salamanca, Madrid — Instalación | Disstands",
    h1: "Moquetas en el barrio de Salamanca, Madrid",
    description: "Instalación de moquetas en el barrio de Salamanca, Madrid. Moquetas premium y de lujo.",
    content: `<p>Moquetas premium en el <strong>barrio de Salamanca, Madrid</strong>. Moquetas de lana, velour y saxony para viviendas, boutiques y espacios exclusivos.</p>`,
    category: "moquetas",
    city: "Madrid",
    region: "Madrid",
    faqs: [
      { question: "¿Enviáis moquetas a Madrid desde Barcelona?", answer: "Sí, disponemos de servicio logístico diario Barcelona-Madrid con entrega en 24-48 horas." },
      { question: "¿Instaláis moqueta para ferias en IFEMA?", answer: "Sí, somos proveedores habituales de moqueta ferial para stands en IFEMA con certificación ignífuga Bfl-s1." },
      { question: "¿Cuánto cuesta la moqueta ferial en Madrid?", answer: "La moqueta ferial Las Vegas comienza desde 2,65 €/m² con transporte a Madrid incluido." },
      { question: "¿Ofrecéis montaje profesional en Madrid?", answer: "Sí, nuestro equipo de instaladores se desplaza a Madrid para ferias, oficinas y eventos." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío diario Barcelona-Madrid",
      "Entrega en 24-48h",
      "Servicio en IFEMA",
      "Instalación profesional disponible",
      "Certificación ignífuga Bfl-s1",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "48h", label: "Entrega en Madrid" },
    ],
  },

  // ========================================
  // MOQUETAS — Páginas temáticas
  // ========================================
  {
    slug: "venta-instalacion-moquetas",
    title: "Venta e Instalación de Moquetas — Profesional | Disstands",
    h1: "Venta e instalación profesional de moquetas",
    description: "Servicio profesional de venta e instalación de moquetas en toda España. Ferias, oficinas y eventos. Más de 23 años de experiencia.",
    content: `<p><strong>Disstands</strong> es tu partner de confianza en <strong>venta e instalación de moquetas</strong> en toda España y Europa. Con más de <strong>23 años de experiencia</strong> en el sector de los pavimentos textiles y más de <strong>500 proyectos</strong> realizados, ofrecemos un servicio integral que abarca desde el asesoramiento técnico inicial hasta la instalación profesional y el soporte postventa. Nuestra sede en Barcelona nos permite atender con agilidad todo el territorio nacional, con especial rapidez en Cataluña, Madrid, Valencia, Zaragoza y el sur de Francia.</p>
<h2>Servicio integral de venta de moquetas</h2>
<p>Nuestro <a href="/catalogo">catálogo</a> reúne más de 200 referencias de moquetas profesionales procedentes de los mejores fabricantes europeos. Cada producto está seleccionado por nuestro equipo técnico para garantizar la máxima calidad en su segmento de precio:</p>
<ul>
<li><strong>Moquetas feriales y para eventos</strong> — Las Vegas, Ecológica, Velour Lux, Colores Especiales e Ignífugas. Todas con certificación Bfl-s1. Desde 2,65 €/m².</li>
<li><strong>Moquetas para oficinas</strong> — Losetas modulares 50x50 cm y formato plank, moqueta en rollo con backing acústico. Para oficinas, coworkings y sedes corporativas.</li>
<li><strong>Moquetas decorativas y residenciales</strong> — Velour, saxony, bucle y tejidas en lana. Para hoteles, viviendas y espacios de diseño.</li>
<li><strong>Moquetas especiales</strong> — Náutica, exterior, escenarios, protección de suelos en obras y alfombra roja para ceremonias.</li>
</ul>
<h2>Precios de moquetas con instalación disponible</h2>
<table><thead><tr><th>Tipo de moqueta</th><th>Material (€/m²)</th><th>Instalación (€/m²)</th><th>Total desde (€/m²)</th></tr></thead><tbody><tr><td>Moqueta Las Vegas ferial</td><td>2,65</td><td>2,50</td><td>5,15</td></tr><tr><td>Moqueta Ecológica Reciclable</td><td>2,20</td><td>2,50</td><td>4,70</td></tr><tr><td>Moqueta Velour Lux</td><td>5,95</td><td>3,00</td><td>8,95</td></tr><tr><td>Losetas modulares oficina</td><td>12,00</td><td>4,00</td><td>16,00</td></tr><tr><td>Moqueta tejida hospitality</td><td>25,00</td><td>6,00</td><td>31,00</td></tr><tr><td>Moqueta de lana premium</td><td>35,00</td><td>8,00</td><td>43,00</td></tr></tbody></table>
<h2>Proceso de instalación profesional</h2>
<p>Nuestro equipo de <strong>instaladores profesionales</strong> sigue un protocolo riguroso para garantizar resultados impecables en cada proyecto:</p>
<ul>
<li><strong>Visita técnica y medición</strong> — Evaluamos el estado del soporte, condiciones de humedad, temperatura y dimensiones exactas del espacio. Gratuito y sin compromiso.</li>
<li><strong>Preparación del soporte</strong> — Aplicación de pasta autonivelante, imprimación o barrera de vapor según las condiciones del subsuelo. Este paso es crucial para la durabilidad de la instalación.</li>
<li><strong>Colocación de la moqueta</strong> — Con adhesivo de contacto (instalaciones permanentes), cinta de doble cara (eventos temporales) o sistema flotante (losetas de oficina). Corte preciso con plantillas y soldadura de juntas cuando es necesario.</li>
<li><strong>Remates y acabados</strong> — Perfiles perimetrales, remates en umbrales de puertas, adaptación a columnas y mobiliario fijo. Limpieza final del espacio.</li>
<li><strong>Control de calidad</strong> — Inspección final con el cliente para verificar que el resultado cumple con las expectativas y los estándares de calidad de Disstands.</li>
</ul>
<h2>Cobertura geográfica</h2>
<p>Realizamos <strong>instalaciones de moqueta en toda España</strong>. Nuestro servicio es especialmente ágil en las siguientes zonas:</p>
<ul>
<li><strong>Barcelona y Cataluña</strong> — Entrega e instalación en 24 horas. Servicio urgente el mismo día para ferias en Fira Barcelona y CCIB.</li>
<li><strong>Madrid</strong> — Equipo de instaladores desplazado para ferias en IFEMA, oficinas y proyectos corporativos. Entrega en 48h.</li>
<li><strong>Valencia, Zaragoza, Bilbao</strong> — Cobertura regular con entregas en 48-72h.</li>
<li><strong>Resto de España</strong> — Envío por agencia de transporte en 72h. Instalación bajo consulta.</li>
<li><strong>Europa</strong> — Francia, Portugal, Italia, Alemania y resto de la UE. Plazos de 3-5 días laborables.</li>
</ul>
<h2>¿Por qué Disstands para tu proyecto de moquetas?</h2>
<p>Elegir Disstands como proveedor de moquetas significa contar con un socio que entiende tu negocio y se adapta a tus necesidades. Nuestros clientes destacan la rapidez de respuesta, la calidad del asesoramiento técnico y la fiabilidad de las entregas, especialmente en los exigentes plazos del sector ferial donde un retraso puede tener graves consecuencias.</p>
<p><a href="/contacto">Solicita presupuesto</a> sin compromiso indicando el tipo de moqueta, la superficie y la ubicación del proyecto. Te enviaremos una propuesta detallada en menos de 24 horas. Si necesitas planificar el suelo de un stand ferial, utiliza nuestro <a href="/monta-tu-feria">configurador online</a> para obtener un presupuesto instantáneo.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "venta-moquetas-y-pvc",
    title: "Venta de Moquetas y PVC — Profesional | Disstands",
    h1: "Venta de moquetas y suelos PVC",
    description: "Venta profesional de moquetas y suelos PVC. Catálogo completo con más de 200 referencias. Precios competitivos.",
    content: `<p>En <strong>Disstands</strong> somos especialistas en la <strong>venta de moquetas y suelos PVC</strong>. Más de 200 referencias disponibles con envío a toda España.</p>`,
    category: "general",
    faqs: [
      { question: "¿Qué tipo de suelo recomendáis para mi espacio?", answer: "Depende del uso: moquetas para oficinas y ferias, PVC para comercios y hospitales, césped artificial para exteriores." },
      { question: "¿Enviáis material a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis asesoramiento técnico?", answer: "Sí, nuestro equipo técnico te asesora gratuitamente para elegir la mejor solución." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Asesoramiento técnico gratuito",
      "Instalación profesional disponible",
      "Más de 200 referencias",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "24h", label: "Respuesta en menos de" },
    ],
  },
  {
    slug: "comprar-moqueta-online",
    title: "Comprar Moqueta Online — Disstands Tienda",
    h1: "Comprar moqueta online",
    description: "Compra moqueta online en Disstands. Envío a toda España. Moquetas feriales, ecológicas, velour y más. Desde 2,65 €/m².",
    content: `<p><strong>Compra moqueta online</strong> en la tienda de Disstands, tu proveedor profesional con más de 23 años de experiencia en pavimentos textiles. Ponemos a tu disposición más de 200 referencias de moquetas profesionales con <strong>envío rápido a toda España y Europa</strong>. Desde la moqueta ferial más económica a 2,65 €/m² hasta moquetas de lana premium para interiorismo de lujo, todo disponible para comprar online con total comodidad.</p>
<h2>¿Cómo comprar moqueta online en Disstands?</h2>
<p>Comprar moqueta en nuestra tienda online es sencillo y seguro. Navega por nuestro <a href="/catalogo">catálogo</a> para explorar todas las opciones, selecciona el tipo de moqueta y la cantidad en metros cuadrados. Puedes solicitar muestras gratuitas antes de comprar para verificar el color, la textura y la calidad del material. Una vez confirmado el pedido, lo preparamos en nuestro almacén de Barcelona y lo despachamos en un plazo máximo de 24 horas.</p>
<p>Para proyectos que requieren asesoramiento, nuestro equipo de especialistas está disponible por teléfono, email o a través de nuestro formulario de <a href="/contacto">contacto</a>. Te ayudaremos a elegir la moqueta adecuada según el uso previsto, las dimensiones del espacio y tu presupuesto.</p>
<h2>Catálogo de moquetas disponibles online</h2>
<ul>
<li><strong>Moquetas feriales</strong> — Las Vegas, Ecológica, Velour Lux, Colores Especiales e Ignífugas. Con certificación Bfl-s1 para recintos feriales.</li>
<li><strong>Moquetas para oficinas</strong> — Losetas modulares y moqueta en rollo con aislamiento acústico para espacios de trabajo y coworkings.</li>
<li><strong>Moquetas decorativas</strong> — Velour, saxony y bucle en amplia gama de colores y texturas para hoteles, restaurantes y viviendas.</li>
<li><strong>Moquetas especiales</strong> — Moqueta náutica, moqueta exterior, moqueta para escenarios y alfombra roja para eventos.</li>
<li><strong>Accesorios de instalación</strong> — Adhesivos, cintas de doble cara, perfiles de remate y todo lo necesario para un montaje perfecto.</li>
</ul>
<h2>Precios de moqueta online con envío</h2>
<table><thead><tr><th>Producto</th><th>Precio desde (€/m²)</th><th>Envío</th></tr></thead><tbody><tr><td>Moqueta Las Vegas (ferial)</td><td>2,65 €/m²</td><td>Gratis en pedidos +100 m²</td></tr><tr><td>Moqueta Ecológica Reciclable</td><td>2,20 €/m²</td><td>Gratis en pedidos +100 m²</td></tr><tr><td>Moqueta Colores Especiales</td><td>3,20 €/m²</td><td>Gratis en pedidos +100 m²</td></tr><tr><td>Moqueta Velour Lux</td><td>5,95 €/m²</td><td>Gratis en pedidos +50 m²</td></tr><tr><td>Losetas de oficina</td><td>12,00 €/m²</td><td>Gratis en pedidos +50 m²</td></tr><tr><td>Moqueta de lana premium</td><td>25,00 €/m²</td><td>Consultar</td></tr></tbody></table>
<h2>Ventajas de comprar moqueta online en Disstands</h2>
<p>Frente a las grandes superficies de bricolaje, comprar moqueta online en Disstands ofrece ventajas decisivas:</p>
<ul>
<li><strong>Variedad profesional</strong> — Más de 200 referencias frente a las 10-15 opciones de tiendas generalistas. Colores, texturas y certificaciones exclusivas.</li>
<li><strong>Precios de fábrica</strong> — Trabajamos directamente con fabricantes europeos, eliminando intermediarios.</li>
<li><strong>Corte a medida</strong> — Enviamos la moqueta cortada a las medidas exactas de tu proyecto, minimizando el desperdicio.</li>
<li><strong>Descuentos por volumen</strong> — Mejor precio por metro cuadrado en pedidos grandes. Descuentos progresivos desde 50 m².</li>
<li><strong>Asesoramiento experto</strong> — Equipo técnico con más de 23 años de experiencia a tu servicio.</li>
<li><strong>Envío rápido</strong> — Expedición en 24h, entrega en 48-72h en toda la península. Envío gratuito desde 100 m².</li>
</ul>
<h2>Envíos a toda España y Europa</h2>
<p>Desde nuestro almacén en Barcelona preparamos y enviamos pedidos diariamente a todo el territorio nacional. Los envíos peninsulares llegan en <strong>48-72 horas</strong>, mientras que Baleares, Canarias, Portugal y resto de Europa tienen plazos de 3-5 días laborables. Para ferias y eventos con fecha fija, garantizamos la entrega antes del inicio del montaje.</p>
<p>¿Listo para comprar? Explora nuestro <a href="/catalogo">catálogo completo</a>, solicita muestras gratuitas o <a href="/contacto">contacta con nosotros</a> para un presupuesto personalizado. Si planificas un stand ferial, prueba nuestro <a href="/monta-tu-feria">configurador online</a> para diseñar tu espacio y calcular la cantidad de moqueta necesaria.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-por-metros",
    title: "Moqueta por Metros — Venta Online | Disstands",
    h1: "Moqueta por metros",
    description: "Compra moqueta por metros cuadrados. Corte a medida y envío a toda España. Desde 2,65 €/m².",
    content: `<p>Venta de <strong>moqueta por metros</strong> con corte a medida. Compra la cantidad exacta que necesitas, sin desperdicio. Envío a toda España.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-precio-metro-cuadrado",
    title: "Moqueta Precio por Metro Cuadrado — Guía de Precios | Disstands",
    h1: "Precio de moqueta por metro cuadrado",
    description: "Guía de precios de moqueta por metro cuadrado. Desde 2,65 €/m² hasta 45 €/m² según tipo y calidad.",
    content: `<p>¿Cuánto cuesta la moqueta por metro cuadrado? Es una de las preguntas más frecuentes que recibimos en <strong>Disstands</strong>. El <strong>precio de la moqueta por metro cuadrado</strong> varía enormemente según el tipo de fibra, la densidad, el acabado y el uso previsto. En esta guía completa te explicamos los rangos de precios actualizados a 2026, los factores que influyen en el coste y cómo elegir la opción que mejor se adapte a tu presupuesto sin renunciar a la calidad.</p>
<h2>Tabla de precios de moqueta por metro cuadrado (2026)</h2>
<table><thead><tr><th>Tipo de moqueta</th><th>Precio desde (€/m²)</th><th>Precio hasta (€/m²)</th><th>Uso recomendado</th></tr></thead><tbody><tr><td>Moqueta punzonada ferial (Las Vegas)</td><td>2,65 €</td><td>4,00 €</td><td>Ferias, eventos, protección de suelos en obras</td></tr><tr><td>Moqueta ferial colores especiales</td><td>3,20 €</td><td>4,50 €</td><td>Stands personalizados, eventos corporativos</td></tr><tr><td>Moqueta ecológica reciclable</td><td>2,20 €</td><td>5,00 €</td><td>Eventos sostenibles, ferias con certificación verde</td></tr><tr><td>Moqueta Velour Lux (pelo cortado)</td><td>5,95 €</td><td>9,00 €</td><td>Eventos premium, galas, hoteles</td></tr><tr><td>Moqueta de bucle para tráfico intenso</td><td>8,00 €</td><td>15,00 €</td><td>Oficinas, espacios comerciales, pasillos</td></tr><tr><td>Losetas modulares de moqueta</td><td>12,00 €</td><td>35,00 €</td><td>Oficinas, coworkings, sedes corporativas</td></tr><tr><td>Moqueta saxony (pelo largo)</td><td>18,00 €</td><td>30,00 €</td><td>Dormitorios, salas de estar, zonas de confort</td></tr><tr><td>Moqueta de lana natural</td><td>25,00 €</td><td>45,00 €</td><td>Hoteles 5 estrellas, viviendas de lujo</td></tr><tr><td>Moqueta náutica</td><td>15,00 €</td><td>25,00 €</td><td>Barcos, yates, embarcaciones</td></tr></tbody></table>
<h2>Factores que determinan el precio de la moqueta</h2>
<p>El coste final de una <strong>moqueta por metro cuadrado</strong> depende de múltiples factores que conviene conocer antes de tomar una decisión de compra:</p>
<ul>
<li><strong>Tipo de fibra</strong> — Las fibras sintéticas (polipropileno, poliéster, poliamida) son más económicas que las fibras naturales (lana, sisal, coco). La poliamida o nylon ofrece la mejor resistencia al desgaste entre las sintéticas.</li>
<li><strong>Densidad y peso</strong> — A mayor densidad de fibras por metro cuadrado, mayor resistencia al aplastamiento y al tráfico, pero también mayor precio. Una moqueta ferial básica tiene unos 200 g/m² mientras que una de oficina premium puede superar los 1.000 g/m².</li>
<li><strong>Tipo de construcción</strong> — La moqueta punzonada (needlepunch) es la más económica. La moqueta tufted (mechada) ofrece más variedad de acabados. La moqueta tejida (woven) es la de mayor calidad y precio.</li>
<li><strong>Acabado superficial</strong> — Pelo cortado (velour, saxony), bucle, pelo cortado y bucle combinado (cut & loop). Cada acabado tiene un coste de fabricación diferente.</li>
<li><strong>Certificaciones</strong> — Las moquetas con certificación ignífuga Bfl-s1, certificación medioambiental o propiedades antibacterianas tienen un coste adicional respecto a las estándar.</li>
<li><strong>Cantidad comprada</strong> — El precio por metro cuadrado se reduce significativamente en pedidos grandes. En Disstands ofrecemos descuentos progresivos desde 50 m².</li>
</ul>
<h2>Coste total: moqueta + instalación</h2>
<p>Al calcular el presupuesto total, es importante considerar no solo el <strong>precio del material</strong> sino también el coste de instalación. El montaje profesional suele oscilar entre 3 y 8 €/m² dependiendo de la complejidad del proyecto, la preparación del soporte necesaria y la ubicación geográfica. En Disstands ofrecemos precios de instalación muy competitivos e incluimos el montaje en muchos de nuestros paquetes de servicio para ferias y eventos.</p>
<p>Para <strong>ferias y eventos temporales</strong>, la instalación con cinta de doble cara es más rápida y económica (2-4 €/m²). Para <strong>oficinas y espacios permanentes</strong>, la instalación con adhesivo garantiza mayor durabilidad pero tiene un coste algo superior (4-8 €/m²).</p>
<h2>¿Cómo conseguir el mejor precio de moqueta?</h2>
<p>En <strong>Disstands</strong>, con más de 23 años de experiencia y más de 500 proyectos realizados, te ofrecemos los mejores precios del mercado gracias a nuestra relación directa con los fabricantes europeos. Algunos consejos para optimizar tu presupuesto:</p>
<ul>
<li>Compra la cantidad justa: utiliza nuestro servicio de <strong>corte a medida</strong> para evitar desperdicios</li>
<li>Aprovecha los <strong>descuentos por volumen</strong>: a partir de 50 m² el precio baja significativamente</li>
<li>Consulta nuestras <strong>ofertas de stock</strong>: periódicamente disponemos de partidas con descuentos especiales</li>
<li>Elige el tipo de moqueta adecuado para tu uso: no pagues por prestaciones que no necesitas</li>
</ul>
<p>Consulta nuestro <a href="/catalogo">catálogo</a> con todos los precios actualizados o <a href="/contacto">solicita un presupuesto personalizado</a> indicando el tipo de moqueta, la superficie y la ubicación del proyecto. Te responderemos en menos de 24 horas con la mejor oferta posible.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-barata-economica",
    title: "Moqueta Barata y Económica — Desde 2,65 €/m² | Disstands",
    h1: "Moqueta barata y económica",
    description: "Moqueta barata desde 2,65 €/m². Moquetas económicas para ferias, eventos y obras. Calidad profesional a precios competitivos.",
    content: `<p>¿Buscas <strong>moqueta barata</strong> sin renunciar a la calidad profesional? En <strong>Disstands</strong> ofrecemos las moquetas más económicas del mercado español, con precios desde <strong>2,65 €/m²</strong> y la garantía de más de 23 años de experiencia en el sector. Nuestras moquetas económicas son ideales para ferias, eventos, protección de suelos en obras y reformas, y cualquier proyecto donde necesites cubrir grandes superficies con un presupuesto ajustado.</p>
<h2>Moquetas baratas: precios y opciones</h2>
<p>No todas las moquetas económicas son iguales. En Disstands seleccionamos cuidadosamente cada producto para garantizar que, incluso en los rangos de precio más bajos, la calidad sea profesional y cumpla con las normativas vigentes. Estas son nuestras opciones de <strong>moqueta económica</strong>:</p>
<table><thead><tr><th>Moqueta económica</th><th>Precio (€/m²)</th><th>Características</th><th>Uso recomendado</th></tr></thead><tbody><tr><td>Moqueta Las Vegas (estándar)</td><td>2,65 €/m²</td><td>Punzonada, 200 g/m², ignífuga Bfl-s1</td><td>Ferias, eventos, protección de suelos</td></tr><tr><td>Moqueta Las Vegas (colores básicos)</td><td>2,65 €/m²</td><td>Gris, negro, azul, rojo, verde</td><td>Stands estándar, pasillos feriales</td></tr><tr><td>Moqueta colores especiales</td><td>3,20 €/m²</td><td>Más de 60 colores, ignífuga</td><td>Stands corporativos, eventos temáticos</td></tr><tr><td>Moqueta ecológica</td><td>2,20 €/m²</td><td>100% reciclable, certificada</td><td>Eventos sostenibles</td></tr><tr><td>Moqueta protección obras</td><td>1,95 €/m²</td><td>Fieltro sintético, desechable</td><td>Protección durante reformas y obras</td></tr></tbody></table>
<h2>¿Es buena la moqueta barata? Calidad vs precio</h2>
<p>Una preocupación habitual al buscar <strong>moqueta económica</strong> es si el precio bajo implica una calidad deficiente. La respuesta es que depende del proveedor. En Disstands, todas nuestras moquetas, incluidas las más económicas, cumplen con estos estándares mínimos de calidad:</p>
<ul>
<li><strong>Certificación ignífuga Bfl-s1</strong> — Obligatoria para ferias y espacios públicos. Todas nuestras moquetas feriales la incluyen, algo que no ocurre con productos de procedencia dudosa.</li>
<li><strong>Fabricación europea</strong> — Trabajamos exclusivamente con fabricantes europeos que cumplen la normativa REACH de sustancias químicas, garantizando que la moqueta no contiene materiales nocivos.</li>
<li><strong>Gramaje adecuado</strong> — Nuestras moquetas feriales tienen un gramaje mínimo de 200 g/m², suficiente para un uso temporal de varios días con tráfico intenso.</li>
<li><strong>Resistencia a la decoloración</strong> — Incluso las moquetas más baratas mantienen su color durante todo el evento gracias a los tintes de calidad utilizados en su fabricación.</li>
</ul>
<h2>Usos habituales de la moqueta barata</h2>
<p>Las <strong>moquetas económicas</strong> tienen una amplia variedad de aplicaciones donde el objetivo principal es cubrir el suelo de forma temporal y funcional:</p>
<ul>
<li><strong>Ferias y exposiciones</strong> — La moqueta ferial Las Vegas es la más utilizada en stands de ferias de toda España. A 2,65 €/m² es la opción más rentable para cubrir stands en IFEMA, Fira Barcelona, BEC, FIBES y cualquier recinto ferial.</li>
<li><strong>Eventos corporativos</strong> — Presentaciones de producto, convenciones, congresos y jornadas de empresa donde se necesita un suelo limpio y profesional por un día o unos pocos días.</li>
<li><strong>Protección de suelos en obras</strong> — Fieltro sintético o moqueta básica para proteger parquet, mármol o cualquier pavimento durante reformas y mudanzas.</li>
<li><strong>Mercadillos y eventos populares</strong> — Fiestas locales, mercados navideños, eventos deportivos y festivales al aire libre.</li>
<li><strong>Showrooms temporales</strong> — Tiendas pop-up, exposiciones itinerantes y espacios de venta efímeros.</li>
</ul>
<h2>Cómo ahorrar al comprar moqueta</h2>
<p>Además de elegir una referencia de precio bajo, existen varias estrategias para reducir aún más el coste de tu proyecto:</p>
<ul>
<li><strong>Compra por volumen</strong> — En Disstands ofrecemos descuentos progresivos. A partir de 100 m², el precio por metro cuadrado se reduce significativamente.</li>
<li><strong>Corte a medida</strong> — Solicita que te enviemos la moqueta cortada a las dimensiones exactas de tu espacio para evitar desperdicios y pagar solo por lo que necesitas.</li>
<li><strong>Reutilización</strong> — Si compras moqueta de buena calidad para un evento, puedes reutilizarla en ocasiones posteriores. La moqueta ecológica y la Velour Lux se conservan perfectamente si se almacenan enrolladas en lugar seco.</li>
<li><strong>Autoinstalación</strong> — Para eventos pequeños, la moqueta ferial se puede instalar fácilmente con cinta de doble cara, ahorrando el coste de mano de obra profesional.</li>
</ul>
<p>Consulta nuestro <a href="/catalogo">catálogo de moquetas</a> con todos los precios actualizados o <a href="/contacto">solicita presupuesto</a> indicando la superficie y el uso previsto. En Disstands te garantizamos el <strong>mejor precio del mercado</strong> con la calidad profesional que tu proyecto merece.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "que-son-las-moquetas",
    title: "¿Qué son las Moquetas? Guía Completa | Disstands",
    h1: "¿Qué son las moquetas?",
    description: "Guía completa sobre qué son las moquetas, tipos, materiales, usos y cómo elegir la moqueta perfecta para tu espacio.",
    content: `<p>Una <strong>moqueta</strong> es un revestimiento textil continuo para suelos, fabricado con fibras sintéticas o naturales que se fijan sobre un soporte o backing mediante distintos procesos industriales. Es uno de los pavimentos más utilizados a nivel mundial en oficinas, hoteles, ferias y eventos, espacios comerciales y viviendas residenciales. Su éxito se debe a una combinación única de propiedades: <strong>confort al caminar</strong>, <strong>aislamiento acústico</strong>, <strong>aislamiento térmico</strong>, <strong>seguridad antideslizante</strong> y una extraordinaria <strong>variedad de diseños, colores y texturas</strong>.</p>
<p>En <strong>Disstands</strong>, con más de 23 años de experiencia en el sector de los pavimentos textiles y más de 500 proyectos realizados en toda Europa, somos especialistas en todo lo relacionado con las moquetas. En esta guía te explicamos en profundidad qué son, cómo se fabrican, qué tipos existen y cómo elegir la moqueta perfecta para cada espacio.</p>
<h2>Tipos de moquetas según su construcción</h2>
<p>La forma en que las fibras se unen al soporte determina las propiedades y el precio de la moqueta. Estos son los principales tipos de construcción:</p>
<ul>
<li><strong>Moqueta punzonada (needlepunch)</strong> — Las fibras se entrelazan mecánicamente mediante miles de agujas que perforan el material repetidamente. Es el tipo más económico y resistente, utilizado principalmente en ferias, eventos y protección de suelos. Precio desde 2,65 €/m².</li>
<li><strong>Moqueta tufted (mechada)</strong> — Las fibras se insertan en un soporte base mediante agujas que forman bucles o pelos cortados. Es el método de fabricación más extendido y ofrece la mayor variedad de acabados: velour, bucle, saxony y combinaciones de pelo cortado y bucle.</li>
<li><strong>Moqueta tejida (woven)</strong> — Las fibras del pelo y el soporte se tejen simultáneamente en un telar, como una alfombra artesanal pero a escala industrial. Es la construcción de mayor calidad, durabilidad y precio. Típica en hoteles de lujo y viviendas exclusivas.</li>
<li><strong>Losetas de moqueta</strong> — Piezas modulares (generalmente de 50x50 cm) con soporte rígido de bitumen o PVC, diseñadas para oficinas y espacios comerciales. Permiten instalación sin adhesivo, sustitución parcial y acceso al suelo técnico.</li>
</ul>
<h2>Materiales y fibras utilizados en las moquetas</h2>
<p>La elección de la fibra es uno de los factores más importantes al seleccionar una moqueta, ya que determina su resistencia, tacto, aspecto y precio:</p>
<table><thead><tr><th>Fibra</th><th>Origen</th><th>Características principales</th><th>Precio orientativo</th></tr></thead><tbody><tr><td>Polipropileno</td><td>Sintética</td><td>Económica, resistente a manchas y humedad</td><td>Desde 2,65 €/m²</td></tr><tr><td>Poliéster</td><td>Sintética</td><td>Suave, buena resistencia al color, económica</td><td>Desde 5,00 €/m²</td></tr><tr><td>Poliamida (nylon)</td><td>Sintética</td><td>Máxima resistencia al desgaste y al tráfico</td><td>Desde 12,00 €/m²</td></tr><tr><td>Lana</td><td>Natural</td><td>Máximo confort, regulación de humedad, ignífuga natural</td><td>Desde 25,00 €/m²</td></tr><tr><td>Mezcla lana/nylon</td><td>Mixta</td><td>Combina confort de la lana con resistencia del nylon</td><td>Desde 20,00 €/m²</td></tr><tr><td>Fibras recicladas</td><td>Reciclada</td><td>Sostenible, 100% reciclable, certificada</td><td>Desde 2,20 €/m²</td></tr></tbody></table>
<h2>Usos principales de las moquetas</h2>
<p>Cada tipo de moqueta está diseñado para un entorno de uso específico. Estos son los sectores donde la moqueta es el pavimento preferido:</p>
<ul>
<li><strong>Ferias y eventos</strong> — La moqueta punzonada ferial es imprescindible en stands, pasillos y áreas comunes de recintos feriales. La certificación ignífuga Bfl-s1 es obligatoria en estos espacios. Es el sector donde Disstands tiene mayor experiencia, con presencia habitual en Fira Barcelona, IFEMA y recintos de toda Europa.</li>
<li><strong>Oficinas y espacios de trabajo</strong> — Las losetas modulares de moqueta son la solución estándar en oficinas modernas por su aislamiento acústico, confort y facilidad de mantenimiento. Permiten crear diseños geométricos combinando diferentes colores y texturas.</li>
<li><strong>Hoteles y hospitality</strong> — Moquetas de alta calidad (velour, saxony, tejidas) para habitaciones, pasillos y zonas comunes de hoteles. La moqueta aporta calidez, silencio y una imagen de lujo que otros pavimentos no consiguen.</li>
<li><strong>Viviendas residenciales</strong> — Dormitorios y salas de estar donde se busca máximo confort. Las moquetas de lana y saxony ofrecen una sensación inigualable al caminar descalzo.</li>
<li><strong>Espacios comerciales</strong> — Tiendas, showrooms y boutiques donde la moqueta contribuye a crear una experiencia de compra acogedora y diferenciadora.</li>
</ul>
<h2>Ventajas de la moqueta como pavimento</h2>
<p>La moqueta ofrece beneficios únicos frente a otros tipos de suelo:</p>
<ul>
<li><strong>Aislamiento acústico</strong> — Reduce el ruido de impacto hasta en 30 dB y absorbe el ruido aéreo, creando espacios más silenciosos y productivos.</li>
<li><strong>Confort térmico</strong> — La moqueta actúa como aislante térmico, manteniendo el suelo cálido y reduciendo el consumo energético de calefacción.</li>
<li><strong>Seguridad</strong> — Superficie antideslizante que previene caídas. En caso de tropiezo, amortigua el impacto mejor que cualquier otro pavimento.</li>
<li><strong>Calidad del aire</strong> — Contrariamente a la creencia popular, la moqueta atrapa las partículas de polvo y alérgenos, impidiendo que circulen por el aire. Con una limpieza regular, mejora la calidad del aire interior.</li>
<li><strong>Versatilidad estética</strong> — Miles de combinaciones de color, textura y diseño permiten personalizar cualquier espacio según el proyecto de interiorismo deseado.</li>
</ul>
<h2>¿Cómo elegir la moqueta perfecta?</h2>
<p>Para seleccionar la moqueta ideal, considera estos factores: el <strong>nivel de tráfico</strong> del espacio (bajo, medio, alto o muy alto), la <strong>duración del uso</strong> (temporal para eventos o permanente), las <strong>normativas aplicables</strong> (ignifugación para espacios públicos), el <strong>presupuesto disponible</strong> y las <strong>preferencias estéticas</strong>. En Disstands te ofrecemos asesoramiento técnico gratuito para guiarte en la elección. Consulta nuestro <a href="/catalogo">catálogo</a> o <a href="/contacto">contacta con nuestro equipo</a> de especialistas.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-velour-alta-densidad",
    title: "Moqueta Velour Alta Densidad — Premium | Disstands",
    h1: "Moqueta Velour de alta densidad",
    description: "Moqueta Velour de alta densidad para eventos premium. Acabado aterciopelado y elegante. Ignífuga Bfl-s1.",
    content: `<p>La <strong>moqueta Velour de alta densidad</strong> es la elección premium para eventos de alto nivel. Acabado aterciopelado, ignífuga con certificación Bfl-s1, disponible en múltiples colores.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué diferencia la moqueta Velour de otras?", answer: "La moqueta Velour tiene un acabado aterciopelado de alta densidad, ideal para eventos premium y espacios exclusivos." },
      { question: "¿La moqueta Velour es ignífuga?", answer: "Sí, cuenta con certificación ignífuga Bfl-s1, obligatoria para recintos de pública concurrencia." },
      { question: "¿Cuánto cuesta la moqueta Velour?", answer: "La moqueta Velour Lux comienza desde 5,95 €/m²." },
    ],
    relatedProducts: [
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Acabado aterciopelado premium",
      "Certificación ignífuga Bfl-s1",
      "Múltiples colores disponibles",
      "Ideal para eventos de alto nivel",
      "Envío a toda España",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "Bfl-s1", label: "Certificación ignífuga" },
    ],
  },
  {
    slug: "moqueta-ferial-unica-barcelona",
    title: "Moqueta Ferial en Barcelona — La Mejor Selección | Disstands",
    h1: "Moqueta ferial en Barcelona",
    description: "La mejor selección de moqueta ferial en Barcelona. Para Fira Barcelona, CCIB y recintos de congresos. Desde 2,65 €/m².",
    content: `<p>La mayor selección de <strong>moqueta ferial en Barcelona</strong>. Suministramos moqueta para Fira Barcelona (Montjuïc y Gran Via), CCIB, hoteles de congresos y recintos de toda Cataluña.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-ecologica-eventos-reciclable",
    title: "Moqueta Ecológica para Eventos — 100% Reciclable | Disstands",
    h1: "Moqueta ecológica para eventos, 100% reciclable",
    description: "Moqueta ecológica 100% reciclable para eventos y ferias. Única en el mundo. Reduce tu huella de carbono.",
    content: `<p>La <strong>moqueta ecológica 100% reciclable</strong> de Disstands es un producto revolucionario y único en el mercado mundial de pavimentos feriales. Mientras que las moquetas convencionales terminan en vertederos tras cada uso, nuestra moqueta ecológica se recicla completamente al final de su vida útil, transformándose en nuevas fibras textiles que se reincorporan al proceso productivo. Con más de <strong>23 años de experiencia</strong> y <strong>500+ proyectos realizados</strong>, en Disstands apostamos firmemente por la sostenibilidad del sector ferial y de eventos.</p>
<h2>¿Qué hace única a nuestra moqueta ecológica?</h2>
<p>La <strong>moqueta ecológica para eventos</strong> de Disstands se distingue del resto del mercado por varias características innovadoras:</p>
<ul>
<li><strong>100% reciclable</strong> — Al estar fabricada con un único tipo de polímero (polipropileno o poliéster puro, sin mezclas), puede reciclarse al 100% mediante procesos mecánicos. Las moquetas convencionales mezclan diferentes materiales (fibra, adhesivo, backing) que hacen imposible su reciclaje.</li>
<li><strong>Certificación ignífuga Bfl-s1</strong> — Cumple con la normativa de seguridad contra incendios exigida en todos los recintos feriales de Europa, igual que cualquier moqueta ferial convencional.</li>
<li><strong>Sin sustancias nocivas</strong> — Libre de ftalatos, metales pesados y compuestos orgánicos volátiles (COV). Certificada según la normativa REACH europea de sustancias químicas.</li>
<li><strong>Acabado profesional</strong> — Aspecto, tacto y rendimiento comparables a las mejores moquetas feriales del mercado. Disponible en múltiples colores y gramajes.</li>
<li><strong>Sistema de recogida y reciclaje</strong> — Ofrecemos un servicio integral de recogida tras el evento y gestión del reciclaje, garantizando la trazabilidad completa del ciclo de vida del producto.</li>
</ul>
<h2>Comparativa: moqueta ecológica vs moqueta convencional</h2>
<table><thead><tr><th>Característica</th><th>Moqueta Ecológica Disstands</th><th>Moqueta Ferial Convencional</th></tr></thead><tbody><tr><td>Reciclabilidad</td><td>100% reciclable</td><td>No reciclable (vertedero)</td></tr><tr><td>Certificación ignífuga</td><td>Bfl-s1</td><td>Bfl-s1</td></tr><tr><td>Huella de carbono</td><td>Reducida hasta un 60%</td><td>Estándar</td></tr><tr><td>Sustancias nocivas</td><td>Libre (REACH)</td><td>Variable según fabricante</td></tr><tr><td>Precio</td><td>Desde 2,20 €/m²</td><td>Desde 2,65 €/m²</td></tr><tr><td>Aspecto y rendimiento</td><td>Profesional</td><td>Profesional</td></tr><tr><td>Servicio de recogida</td><td>Incluido opcional</td><td>No disponible</td></tr></tbody></table>
<h2>¿Por qué elegir moqueta ecológica para tu evento?</h2>
<p>La demanda de <strong>eventos sostenibles</strong> crece exponencialmente. Cada vez más organizaciones, instituciones y empresas se comprometen con la reducción de su huella ambiental y buscan proveedores que compartan estos valores. Elegir moqueta ecológica para tu feria o evento aporta beneficios tangibles:</p>
<ul>
<li><strong>Cumplimiento de políticas ESG</strong> — Las empresas con compromisos de sostenibilidad (Environmental, Social, Governance) pueden demostrar acciones concretas de reducción de residuos en sus eventos corporativos.</li>
<li><strong>Certificaciones de evento sostenible</strong> — Algunos recintos feriales como Fira Barcelona otorgan certificaciones de sostenibilidad a los expositores que utilizan materiales reciclables en sus stands.</li>
<li><strong>Imagen de marca responsable</strong> — Comunicar que tu stand utiliza moqueta 100% reciclable refuerza la percepción de marca comprometida con el medio ambiente ante clientes, socios y visitantes.</li>
<li><strong>Reducción real de residuos</strong> — En una feria de tamaño medio se utilizan entre 5.000 y 20.000 m² de moqueta. Elegir la opción reciclable evita que toneladas de material acaben en vertederos.</li>
</ul>
<h2>Proceso de reciclaje de la moqueta</h2>
<p>Una vez finalizado el evento, nuestro equipo recoge la moqueta usada y la transporta a la planta de reciclaje. Allí, el material se tritura, se limpia y se transforma en granza de polipropileno o poliéster que se utiliza para fabricar nuevos productos textiles, incluyendo nuevas moquetas ecológicas. Este proceso de <strong>economía circular</strong> reduce el consumo de materias primas vírgenes y la generación de residuos, contribuyendo a un sector ferial más sostenible.</p>
<h2>Disponibilidad y pedidos</h2>
<p>Nuestra <strong>moqueta ecológica reciclable</strong> está disponible con stock permanente en los colores más demandados. Para colores especiales, el plazo de fabricación es de 5-7 días laborables. Ofrecemos servicio de entrega en toda España y Europa, con entregas urgentes en 24 horas en Barcelona y área metropolitana.</p>
<p>¿Quieres hacer tu próximo evento más sostenible? Consulta nuestro <a href="/catalogo">catálogo</a> de moquetas ecológicas, <a href="/contacto">solicita presupuesto</a> o utiliza nuestro <a href="/monta-tu-feria">configurador de stands</a> para calcular la cantidad de moqueta ecológica que necesitas para tu feria.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué hace ecológica a esta moqueta?", answer: "Está fabricada con materiales 100% reciclables que se reciclan completamente al final de su vida útil." },
      { question: "¿La moqueta ecológica tiene la misma calidad?", answer: "Sí, ofrece un acabado premium comparable a las moquetas convencionales sin comprometer la calidad." },
      { question: "¿Cuánto cuesta la moqueta ecológica?", answer: "La moqueta ecológica comienza desde 2,20 €/m² con envío a toda España." },
    ],
    relatedProducts: [
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "100% reciclable",
      "Reduce huella de carbono",
      "Acabado premium",
      "Certificación ignífuga Bfl-s1",
      "Envío a toda España",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "100%", label: "Reciclable" },
      { value: "60+", label: "Colores disponibles" },
    ],
  },
  {
    slug: "moqueta-ecologica-para-eventos-internacionales-y-de-alta-exigencia",
    title: "Moqueta Ecológica para Eventos Internacionales | Disstands",
    h1: "Moqueta ecológica para eventos internacionales",
    description: "Moqueta ecológica certificada para eventos internacionales de alta exigencia. Sostenibilidad sin comprometer la calidad.",
    content: `<p><strong>Moqueta ecológica certificada</strong> para eventos internacionales de alta exigencia. Cumple con las normativas ambientales más estrictas y ofrece un acabado premium comparable a las moquetas convencionales.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué hace ecológica a esta moqueta?", answer: "Está fabricada con materiales 100% reciclables que se reciclan completamente al final de su vida útil." },
      { question: "¿La moqueta ecológica tiene la misma calidad?", answer: "Sí, ofrece un acabado premium comparable a las moquetas convencionales sin comprometer la calidad." },
      { question: "¿Cuánto cuesta la moqueta ecológica?", answer: "La moqueta ecológica comienza desde 2,20 €/m² con envío a toda España." },
    ],
    relatedProducts: [
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "100% reciclable",
      "Reduce huella de carbono",
      "Acabado premium",
      "Certificación ignífuga Bfl-s1",
      "Envío a toda España",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "100%", label: "Reciclable" },
      { value: "60+", label: "Colores disponibles" },
    ],
  },
  {
    slug: "moqueta-dilour-eco",
    title: "Moqueta Dilour Eco — Sostenible | Disstands",
    h1: "Moqueta Dilour Eco",
    description: "Moqueta Dilour Eco, la opción sostenible para ferias y eventos. Fabricada con materiales reciclados.",
    content: `<p>La <strong>moqueta Dilour Eco</strong> es nuestra apuesta por la sostenibilidad. Fabricada con fibras recicladas, ofrece un excelente rendimiento para ferias y eventos con mínimo impacto ambiental.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué hace ecológica a esta moqueta?", answer: "Está fabricada con materiales 100% reciclables que se reciclan completamente al final de su vida útil." },
      { question: "¿La moqueta ecológica tiene la misma calidad?", answer: "Sí, ofrece un acabado premium comparable a las moquetas convencionales sin comprometer la calidad." },
      { question: "¿Cuánto cuesta la moqueta ecológica?", answer: "La moqueta ecológica comienza desde 2,20 €/m² con envío a toda España." },
    ],
    relatedProducts: [
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "100% reciclable",
      "Reduce huella de carbono",
      "Acabado premium",
      "Certificación ignífuga Bfl-s1",
      "Envío a toda España",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "100%", label: "Reciclable" },
      { value: "60+", label: "Colores disponibles" },
    ],
  },
  {
    slug: "moqueta-sostenible",
    title: "Moqueta Sostenible — Eco-Friendly | Disstands",
    h1: "Moqueta sostenible",
    description: "Moquetas sostenibles y eco-friendly. Fabricadas con materiales reciclados y reciclables. Catálogo completo.",
    content: `<p>Descubre nuestra gama de <strong>moquetas sostenibles</strong>. Fabricadas con fibras recicladas como ECONYL® y materiales 100% reciclables para un futuro más verde.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué hace ecológica a esta moqueta?", answer: "Está fabricada con materiales 100% reciclables que se reciclan completamente al final de su vida útil." },
      { question: "¿La moqueta ecológica tiene la misma calidad?", answer: "Sí, ofrece un acabado premium comparable a las moquetas convencionales sin comprometer la calidad." },
      { question: "¿Cuánto cuesta la moqueta ecológica?", answer: "La moqueta ecológica comienza desde 2,20 €/m² con envío a toda España." },
    ],
    relatedProducts: [
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "100% reciclable",
      "Reduce huella de carbono",
      "Acabado premium",
      "Certificación ignífuga Bfl-s1",
      "Envío a toda España",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "100%", label: "Reciclable" },
      { value: "60+", label: "Colores disponibles" },
    ],
  },
  {
    slug: "moqueta-modular",
    title: "Moqueta Modular — Losetas para Oficinas | Disstands",
    h1: "Moqueta modular en losetas",
    description: "Moqueta modular en losetas para oficinas y comercios. Fácil instalación y sustitución. Múltiples diseños.",
    content: `<p>La <strong>moqueta modular en losetas</strong> es la solución perfecta para oficinas y espacios comerciales. Fácil de instalar, mantener y sustituir parcialmente sin afectar al resto del suelo.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué ventajas tienen las losetas de moqueta?", answer: "Fácil instalación, sustitución parcial sin afectar al resto del suelo y múltiples diseños disponibles." },
      { question: "¿Cuánto cuestan las losetas de moqueta?", answer: "Las losetas modulares comienzan desde 12 €/m² con instalación profesional." },
      { question: "¿Son adecuadas para oficinas?", answer: "Sí, las losetas modulares son la solución más popular para oficinas por su versatilidad y acústica." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Fácil instalación",
      "Sustitución parcial posible",
      "Aislamiento acústico",
      "Múltiples diseños",
      "Ideal para oficinas",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "12€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moqueta-nautica",
    title: "Moqueta Náutica — Para Barcos y Yates | Disstands",
    h1: "Moqueta náutica",
    description: "Moqueta náutica para barcos, yates y embarcaciones. Resistente al agua, sal y UV. Instalación profesional.",
    content: `<p><strong>Moqueta náutica</strong> especialmente diseñada para barcos, yates y embarcaciones. Resistente al agua salada, rayos UV y condiciones marinas extremas.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué hace especial la moqueta náutica?", answer: "Está diseñada para resistir agua salada, rayos UV y condiciones marinas extremas." },
      { question: "¿Instaláis moqueta en barcos y yates?", answer: "Sí, ofrecemos instalación profesional de moqueta náutica en todo tipo de embarcaciones." },
      { question: "¿Cuánto dura la moqueta náutica?", answer: "Con el mantenimiento adecuado, la moqueta náutica tiene una vida útil de 8 a 12 años." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Resistente al agua salada",
      "Protección UV",
      "Instalación profesional",
      "Adaptada a embarcaciones",
      "Máxima durabilidad",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "8-12", label: "Años de vida útil" },
      { value: "UV", label: "Protección incluida" },
    ],
  },
  {
    slug: "losetas-de-moqueta",
    title: "Losetas de Moqueta — Modulares para Oficinas | Disstands",
    h1: "Losetas de moqueta",
    description: "Losetas de moqueta modulares para oficinas y comercios. Fácil instalación, múltiples diseños. Desde 12 €/m².",
    content: `<p><strong>Losetas de moqueta</strong> modulares para oficinas, espacios de coworking y comercios. Disponibles en múltiples diseños, colores y texturas. Instalación sencilla y sustitución parcial sin obras.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Qué ventajas tienen las losetas de moqueta?", answer: "Fácil instalación, sustitución parcial sin afectar al resto del suelo y múltiples diseños disponibles." },
      { question: "¿Cuánto cuestan las losetas de moqueta?", answer: "Las losetas modulares comienzan desde 12 €/m² con instalación profesional." },
      { question: "¿Son adecuadas para oficinas?", answer: "Sí, las losetas modulares son la solución más popular para oficinas por su versatilidad y acústica." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
    ],
    advantages: [
      "Fácil instalación",
      "Sustitución parcial posible",
      "Aislamiento acústico",
      "Múltiples diseños",
      "Ideal para oficinas",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "12€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moqueta-navidad",
    title: "Moqueta para Navidad — Eventos Navideños | Disstands",
    h1: "Moqueta para eventos navideños",
    description: "Moqueta roja y verde para eventos navideños. Mercadillos, espectáculos y decoración navideña. Entrega urgente.",
    content: `<p><strong>Moqueta para eventos navideños</strong>: mercadillos, espectáculos, centros comerciales y decoración navideña. Moqueta roja y verde con entrega urgente en toda España.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Tenéis moqueta roja y verde para Navidad?", answer: "Sí, disponemos de stock permanente de moqueta roja y verde para eventos navideños." },
      { question: "¿Hacéis entrega urgente para eventos navideños?", answer: "Sí, ofrecemos entrega urgente en toda España para mercadillos y eventos navideños." },
      { question: "¿Cuánto cuesta la moqueta para Navidad?", answer: "La moqueta navideña comienza desde 2,65 €/m² con entrega urgente disponible." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Stock permanente rojo y verde",
      "Entrega urgente en toda España",
      "Precios desde 2,65 €/m²",
      "Ideal para mercadillos navideños",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "24h", label: "Entrega urgente" },
    ],
  },
  {
    slug: "moqueta-roja-eventos-barcelona",
    title: "Moqueta Roja para Eventos en Barcelona | Disstands",
    h1: "Moqueta roja para eventos en Barcelona",
    description: "Moqueta roja para eventos, alfombra roja y ceremonias en Barcelona. Stock permanente. Entrega inmediata.",
    content: `<p><strong>Moqueta roja para eventos en Barcelona</strong>. La alfombra roja clásica para galas, ceremonias, estrenos y eventos corporativos. Stock permanente con entrega inmediata.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-gris-para-eventos-en-barcelona-disstands",
    title: "Moqueta Gris para Eventos en Barcelona | Disstands",
    h1: "Moqueta gris para eventos en Barcelona",
    description: "Moqueta gris para eventos y ferias en Barcelona. La más demandada para stands corporativos.",
    content: `<p><strong>Moqueta gris para eventos en Barcelona</strong>. El color más demandado para stands corporativos, congresos y espacios profesionales. Disponible en múltiples tonos de gris.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "moqueta-suelo-eventos-barcelona",
    title: "Moqueta y Suelo para Eventos en Barcelona | Disstands",
    h1: "Moqueta y suelo para eventos en Barcelona",
    description: "Todo tipo de suelos para eventos en Barcelona: moquetas, PVC, césped artificial. Instalación profesional.",
    content: `<p>Todos los <strong>suelos para eventos en Barcelona</strong>: moquetas feriales, PVC impreso, césped artificial y suelos técnicos. Instalación profesional para ferias, congresos y eventos corporativos.</p>`,
    category: "general",
    city: "Barcelona",
    faqs: [
      { question: "¿Qué tipo de suelo recomendáis para mi espacio?", answer: "Depende del uso: moquetas para oficinas y ferias, PVC para comercios y hospitales, césped artificial para exteriores." },
      { question: "¿Enviáis material a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis asesoramiento técnico?", answer: "Sí, nuestro equipo técnico te asesora gratuitamente para elegir la mejor solución." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Asesoramiento técnico gratuito",
      "Instalación profesional disponible",
      "Más de 200 referencias",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "24h", label: "Respuesta en menos de" },
    ],
  },
  {
    slug: "moquetas-leroy-merlin",
    title: "Moquetas vs Leroy Merlin — Comparativa Profesional | Disstands",
    h1: "Moquetas Disstands vs Leroy Merlin",
    description: "Comparativa entre moquetas profesionales Disstands y moquetas de Leroy Merlin. Calidad, precios y servicio.",
    content: `<p>¿Buscas moquetas de calidad profesional? Compara las <strong>moquetas de Disstands con las de Leroy Merlin</strong>. Te explicamos las diferencias en calidad, variedad, precios y servicio de instalación.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Por qué elegir Disstands en vez de Leroy Merlin?", answer: "Ofrecemos mayor variedad, calidad profesional, asesoramiento técnico especializado e instalación disponible." },
      { question: "¿Son más baratas las moquetas de Disstands?", answer: "En muchos casos sí, nuestras moquetas feriales comienzan desde 2,65 €/m² con calidad profesional." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, a diferencia de las grandes superficies, ofrecemos servicio de instalación profesional con garantía." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Precios más competitivos",
      "Calidad profesional superior",
      "Instalación profesional disponible",
      "Asesoramiento técnico especializado",
      "Mayor variedad de productos",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias en catálogo" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moqueta-ferial-barata-leroy-merlin",
    title: "Moqueta Ferial Barata — Alternativa a Leroy Merlin | Disstands",
    h1: "Moqueta ferial barata — alternativa profesional a Leroy Merlin",
    description: "Moqueta ferial barata desde 2,65 €/m². Alternativa profesional a Leroy Merlin con mejor calidad y servicio.",
    content: `<p><strong>Moqueta ferial barata</strong> desde 2,65 €/m² (solo material), más económica y de mejor calidad que las opciones de Leroy Merlin. Servicio profesional de asesoramiento incluido. Instalación disponible con presupuesto aparte.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Por qué elegir Disstands en vez de Leroy Merlin?", answer: "Ofrecemos mayor variedad, calidad profesional, asesoramiento técnico especializado e instalación disponible." },
      { question: "¿Son más baratas las moquetas de Disstands?", answer: "En muchos casos sí, nuestras moquetas feriales comienzan desde 2,65 €/m² con calidad profesional." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, a diferencia de las grandes superficies, ofrecemos servicio de instalación profesional con garantía." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Precios más competitivos",
      "Calidad profesional superior",
      "Instalación profesional disponible",
      "Asesoramiento técnico especializado",
      "Mayor variedad de productos",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias en catálogo" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "moqueta-leroy-merlin-precio",
    title: "Precio Moqueta Leroy Merlin — Comparativa | Disstands",
    h1: "Precio de moqueta: Leroy Merlin vs Disstands",
    description: "Comparativa de precios de moqueta entre Leroy Merlin y Disstands. Descubre por qué somos más competitivos.",
    content: `<p>Comparamos los <strong>precios de moqueta de Leroy Merlin</strong> con los de Disstands. En muchos casos, nuestros precios son más competitivos y con mejor calidad profesional.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Por qué elegir Disstands en vez de Leroy Merlin?", answer: "Ofrecemos mayor variedad, calidad profesional, asesoramiento técnico especializado e instalación disponible." },
      { question: "¿Son más baratas las moquetas de Disstands?", answer: "En muchos casos sí, nuestras moquetas feriales comienzan desde 2,65 €/m² con calidad profesional." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, a diferencia de las grandes superficies, ofrecemos servicio de instalación profesional con garantía." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Precios más competitivos",
      "Calidad profesional superior",
      "Instalación profesional disponible",
      "Asesoramiento técnico especializado",
      "Mayor variedad de productos",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias en catálogo" },
      { value: "2,65€", label: "Precio desde /m²" },
    ],
  },
  {
    slug: "guia-completa-moquetas-2026",
    title: "Guía Completa de Moquetas 2026 | Disstands",
    h1: "Guía completa de moquetas 2026",
    description: "Guía completa de moquetas 2026. Tipos, materiales, precios, instalación y tendencias. Todo lo que necesitas saber.",
    content: `<p>Bienvenido a la <strong>guía completa de moquetas 2026</strong>, el recurso más exhaustivo en español sobre pavimentos textiles. Elaborada por el equipo técnico de <strong>Disstands</strong>, con más de 23 años de experiencia y más de 500 proyectos en toda Europa, esta guía cubre tipos de moquetas, materiales, precios actualizados, instalación, mantenimiento y tendencias del sector.</p>
<h2>Tipos de moquetas: clasificación completa</h2>
<p>Las <strong>moquetas</strong> se clasifican según su método de construcción, que determina propiedades, aspecto y precio:</p>
<ul>
<li><strong>Moqueta punzonada (needlepunch)</strong> — Fibras entrelazadas mecánicamente. La más económica y resistente, ideal para ferias y eventos. Desde 2,65 €/m².</li>
<li><strong>Moqueta tufted (mechada)</strong> — Fibras insertadas en un soporte mediante agujas, formando bucles o pelos cortados. Representa el 90% de la producción mundial y ofrece la mayor variedad de acabados.</li>
<li><strong>Moqueta tejida (woven)</strong> — Fibras y soporte tejidos simultáneamente en telares Wilton o Axminster. La mayor calidad y precio, para hoteles de lujo e interiorismo exclusivo.</li>
<li><strong>Losetas modulares</strong> — Piezas de 50x50 cm con soporte rígido. El estándar en oficinas modernas por su versatilidad y fácil sustitución parcial.</li>
</ul>
<h2>Materiales y fibras: guía de selección 2026</h2>
<table><thead><tr><th>Fibra</th><th>Resistencia</th><th>Tacto</th><th>Precio medio (€/m²)</th><th>Tendencia 2026</th></tr></thead><tbody><tr><td>Polipropileno (PP)</td><td>Media</td><td>Firme</td><td>2,65-5,00</td><td>Estable</td></tr><tr><td>Poliéster (PET)</td><td>Media-alta</td><td>Suave</td><td>5,00-12,00</td><td>Creciendo en versiones recicladas</td></tr><tr><td>Poliamida 6 (PA6)</td><td>Muy alta</td><td>Suave-firme</td><td>12,00-25,00</td><td>Estable</td></tr><tr><td>Lana</td><td>Alta</td><td>Cálido, natural</td><td>25,00-45,00</td><td>Renacimiento en hospitality</td></tr><tr><td>ECONYL (nylon reciclado)</td><td>Muy alta</td><td>Suave</td><td>18,00-30,00</td><td>Fuerte crecimiento</td></tr><tr><td>PET reciclado (rPET)</td><td>Media-alta</td><td>Suave</td><td>3,50-8,00</td><td>Fuerte crecimiento</td></tr></tbody></table>
<h2>Tendencias en moquetas para 2026</h2>
<p>El sector experimenta una transformación impulsada por la sostenibilidad y la digitalización:</p>
<ul>
<li><strong>Sostenibilidad como estándar</strong> — Las moquetas con fibras recicladas y las 100% reciclables se convierten en el estándar exigido por grandes clientes corporativos y organizaciones feriales.</li>
<li><strong>Diseño biofílico</strong> — Patrones inspirados en la naturaleza para conectar espacios interiores con el entorno natural. Muy demandados en oficinas y espacios de bienestar.</li>
<li><strong>Formatos XL y planks</strong> — Las losetas formato plank (25x100 cm) ganan terreno frente al clásico 50x50 cm, con diseños lineales más contemporáneos.</li>
<li><strong>Personalización digital</strong> — Impresión digital sobre moqueta para diseños únicos, logotipos corporativos y patrones exclusivos en tiradas cortas.</li>
<li><strong>Circularidad total</strong> — Programas take-back donde el fabricante recoge la moqueta usada y la recicla en nuevos productos. Economía circular aplicada a los pavimentos.</li>
</ul>
<h2>Guía de precios de moquetas 2026</h2>
<p>Los precios se mantienen estables respecto a 2025. Las gamas económicas ofrecen una relación calidad-precio excelente:</p>
<ul>
<li><strong>Moqueta ferial</strong>: 2,65-5,95 €/m² — Para ferias, eventos y usos temporales.</li>
<li><strong>Moqueta de oficina</strong>: 12-35 €/m² — Losetas modulares y moqueta en rollo para espacios de trabajo.</li>
<li><strong>Moqueta hospitality</strong>: 15-45 €/m² — Hoteles, restaurantes y espacios de ocio.</li>
<li><strong>Moqueta residencial</strong>: 8-30 €/m² — Viviendas, dormitorios y zonas de estar.</li>
</ul>
<h2>Instalación y mantenimiento: mejores prácticas</h2>
<p>La instalación correcta y el mantenimiento regular determinan la vida útil de una moqueta. El soporte debe estar limpio, seco y nivelado. Para losetas de oficina, el pegamento tackifier permite reposicionar piezas. Para moqueta en rollo en hoteles, se recomienda adhesivo permanente y soldadura en caliente de juntas.</p>
<p>El mantenimiento se basa en: <strong>aspirado regular</strong> (diario en alto tráfico), <strong>limpieza de manchas inmediata</strong> con productos específicos y <strong>limpieza profunda periódica</strong> (cada 6-12 meses) mediante inyección-extracción.</p>
<p>Explora nuestro <a href="/catalogo">catálogo completo de moquetas</a> o <a href="/contacto">contacta con nuestro equipo</a> para asesoramiento personalizado y gratuito.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
  {
    slug: "mantenimiento-limpieza-moqueta-suelo-textil",
    title: "Mantenimiento y Limpieza de Moquetas — Guía | Disstands",
    h1: "Mantenimiento y limpieza de moquetas",
    description: "Guía completa de mantenimiento y limpieza de moquetas y suelos textiles. Consejos profesionales.",
    content: `<p>Guía profesional de <strong>mantenimiento y limpieza de moquetas</strong>. Aprende a cuidar tu suelo textil con los mejores productos y técnicas para prolongar su vida útil.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },

  // ========================================
  // CÉSPED ARTIFICIAL
  // ========================================
  {
    slug: "cesped-artificial-barcelona",
    title: "Césped Artificial en Barcelona — Venta e Instalación | Disstands",
    h1: "Césped artificial en Barcelona",
    description: "Venta e instalación de césped artificial en Barcelona. Para jardines, terrazas, eventos y paisajismo. Desde 5,95 €/m².",
    content: `<p><strong>Disstands</strong> es tu especialista en <strong>césped artificial en Barcelona</strong>. Con más de 23 años de experiencia en pavimentos y revestimientos, ofrecemos las mejores soluciones de césped sintético para jardines, terrazas, áticos, piscinas, eventos y paisajismo urbano en toda el área metropolitana de Barcelona. Nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero, adaptado a las particularidades del clima mediterráneo de la ciudad.</p>
<h2>Tipos de césped artificial disponibles en Barcelona</h2>
<p>En nuestro <a href="/catalogo">catálogo</a> encontrarás más de 30 referencias de césped artificial, cada una diseñada para un uso específico. Trabajamos con los principales fabricantes europeos para ofrecer productos de máxima calidad con garantías de hasta 10 años:</p>
<ul>
<li><strong>Césped decorativo paisajístico</strong> — Para jardines, terrazas y áticos. Fibras de polietileno de alta densidad que replican el aspecto natural de la hierba. Alturas de fibra entre 20 y 40 mm. Desde 5,95 €/m².</li>
<li><strong>Césped para eventos y ferias</strong> — Rollos de césped artificial para montajes temporales en ferias, exposiciones y eventos corporativos. Fácil de instalar y retirar, reutilizable en múltiples ocasiones.</li>
<li><strong>Césped deportivo</strong> — Diseñado para pistas de pádel, campos de fútbol, zonas multideporte y áreas de juego infantil. Certificado según normativas FIFA y FPP.</li>
<li><strong>Césped para piscinas y zonas húmedas</strong> — Con sistema de drenaje integrado, resistente al cloro, rayos UV y humedad constante. Superficie antideslizante para máxima seguridad.</li>
<li><strong>Césped de bajo mantenimiento para comunidades</strong> — Solución perfecta para zonas comunitarias, parques y urbanizaciones que buscan reducir los costes de mantenimiento de áreas verdes.</li>
</ul>
<h2>Precios de césped artificial en Barcelona</h2>
<table><thead><tr><th>Tipo de césped</th><th>Precio desde (€/m²)</th><th>Uso ideal</th></tr></thead><tbody><tr><td>Césped eventos / ferial</td><td>2,20 €/m²</td><td>Ferias, eventos temporales, exposiciones</td></tr><tr><td>Césped decorativo estándar (20 mm)</td><td>5,95 €/m²</td><td>Terrazas pequeñas, balcones, decoración</td></tr><tr><td>Césped paisajístico premium (35-40 mm)</td><td>12,00 €/m²</td><td>Jardines, áticos, zonas residenciales</td></tr><tr><td>Césped deportivo pádel</td><td>15,00 €/m²</td><td>Pistas de pádel, zonas deportivas</td></tr><tr><td>Césped deportivo fútbol</td><td>18,00 €/m²</td><td>Campos de fútbol, multideporte</td></tr><tr><td>Césped piscina antideslizante</td><td>14,00 €/m²</td><td>Perímetros de piscina, zonas húmedas</td></tr></tbody></table>
<h2>Proceso de instalación profesional en Barcelona</h2>
<p>La <strong>instalación de césped artificial</strong> requiere una preparación adecuada del terreno para garantizar un resultado duradero y estéticamente perfecto. Nuestro equipo sigue un proceso riguroso en cada proyecto:</p>
<p>En primer lugar, realizamos una <strong>visita técnica gratuita</strong> para evaluar el terreno, tomar medidas exactas y asesorar al cliente sobre la mejor opción de césped. A continuación, preparamos la base: en jardines, esto implica retirar la vegetación existente, compactar el terreno y colocar una malla antihierbas geotextil. En terrazas y áticos, verificamos el drenaje existente y preparamos la superficie para la adhesión.</p>
<p>Después, cortamos y colocamos el césped con precisión milimétrica, uniendo las piezas con bandas de unión y adhesivo específico para césped artificial. Por último, rellenamos con arena de sílice si el tipo de césped lo requiere y cepillamos las fibras para conseguir un aspecto natural y uniforme. Todo el proceso se completa habitualmente en <strong>1 a 3 días</strong> según la superficie.</p>
<h2>Ventajas del césped artificial en el clima de Barcelona</h2>
<p>El clima mediterráneo de Barcelona, con veranos calurosos y periodos de sequía, hace que el <strong>césped artificial</strong> sea una alternativa cada vez más demandada frente al césped natural. Entre sus principales ventajas destacan:</p>
<ul>
<li><strong>Ahorro de agua</strong> — No necesita riego, lo que supone un ahorro significativo en la factura del agua y contribuye a la sostenibilidad hídrica de la ciudad.</li>
<li><strong>Mantenimiento mínimo</strong> — No requiere siega, abonado ni tratamientos fitosanitarios. Un cepillado ocasional y una limpieza con agua son suficientes.</li>
<li><strong>Aspecto perfecto todo el año</strong> — Mantiene su color verde intenso en cualquier estación, sin zonas secas ni calvas.</li>
<li><strong>Durabilidad</strong> — Los céspedes de calidad profesional que instalamos tienen una vida útil de 15 a 20 años con garantías de fabricante.</li>
<li><strong>Resistencia UV</strong> — Todas nuestras referencias incorporan protección contra rayos ultravioleta para evitar la decoloración.</li>
</ul>
<h2>Zonas de instalación en Barcelona</h2>
<p>Cubrimos toda Barcelona y su área metropolitana. Hemos realizado instalaciones en jardines de Sarrià-Sant Gervasi, terrazas del Eixample, áticos en Gràcia, comunidades de vecinos en Sant Andreu, zonas deportivas en Sant Martí y espacios comerciales en el distrito 22@. También atendemos localidades cercanas como L'Hospitalet, Badalona, Sant Cugat, Castelldefels y toda la costa del Maresme.</p>
<p>¿Necesitas un presupuesto personalizado? <a href="/contacto">Contacta con nosotros</a> y te enviaremos una propuesta detallada en menos de 24 horas. También puedes visitar nuestro <a href="/catalogo">catálogo online</a> para ver todas las referencias disponibles con fotos, especificaciones técnicas y precios actualizados.</p>`,
    category: "cesped-artificial",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "cesped-artificial",
    title: "Césped Artificial — Catálogo Completo | Disstands",
    h1: "Césped artificial",
    description: "Catálogo completo de césped artificial. Paisajismo, eventos, deportivo y decorativo. Desde 5,95 €/m². Envío a toda España.",
    content: `<p>Descubre el <strong>catálogo completo de césped artificial</strong> de <strong>Disstands</strong>. Con más de 30 referencias profesionales para paisajismo, eventos, deporte y decoración, somos uno de los principales distribuidores de césped sintético de España. Ofrecemos <strong>envío a toda la península</strong> desde nuestro almacén en Barcelona, con instalación profesional opcional en Cataluña, Madrid y las principales ciudades españolas. Más de 23 años de experiencia en pavimentos nos avalan.</p>
<h2>Tipos de césped artificial en nuestro catálogo</h2>
<p>El <strong>césped artificial</strong> ha evolucionado enormemente en los últimos años, alcanzando niveles de realismo y rendimiento que lo hacen prácticamente indistinguible del césped natural. En nuestro <a href="/catalogo">catálogo</a> clasificamos los productos según su uso principal:</p>
<ul>
<li><strong>Césped paisajístico residencial</strong> — Fibras de polietileno de alta calidad con alturas entre 30 y 40 mm. Tacto suave y aspecto natural con varios tonos de verde y fibras marrones que simulan la hierba seca. Ideal para jardines, terrazas y áticos de viviendas particulares.</li>
<li><strong>Césped para eventos y ferias</strong> — Rollos de césped artificial de fácil instalación y retirada para montajes temporales. Utilizado en ferias, exposiciones, showrooms, photocalls y decoración de eventos. Reutilizable en múltiples ocasiones.</li>
<li><strong>Césped deportivo</strong> — Diseñado específicamente para pistas de pádel, campos de fútbol, zonas multideporte y áreas de juego infantil. Cumple con las normativas FIFA Quality, FPP y EN 15330 según la disciplina deportiva.</li>
<li><strong>Césped para piscinas y zonas húmedas</strong> — Con drenaje reforzado y superficie antideslizante. Resistente al cloro, productos químicos y exposición constante a la humedad.</li>
<li><strong>Césped decorativo de baja altura</strong> — Fibras de 7-20 mm para decoración interior, escaparates, stands feriales y aplicaciones creativas donde se busca un efecto visual verde sin la funcionalidad de un jardín.</li>
</ul>
<h2>Precios de césped artificial por categoría</h2>
<table><thead><tr><th>Categoría</th><th>Altura fibra</th><th>Precio desde (€/m²)</th><th>Aplicación principal</th></tr></thead><tbody><tr><td>Césped decorativo / ferial</td><td>7-15 mm</td><td>2,20 €/m²</td><td>Eventos, stands, decoración</td></tr><tr><td>Césped estándar jardín</td><td>20-25 mm</td><td>5,95 €/m²</td><td>Terrazas, balcones, pequeños jardines</td></tr><tr><td>Césped premium jardín</td><td>30-40 mm</td><td>12,00 €/m²</td><td>Jardines residenciales, zonas comunitarias</td></tr><tr><td>Césped piscina antideslizante</td><td>20-30 mm</td><td>14,00 €/m²</td><td>Perímetros de piscina, zonas húmedas</td></tr><tr><td>Césped deportivo pádel</td><td>12-15 mm</td><td>15,00 €/m²</td><td>Pistas de pádel profesionales</td></tr><tr><td>Césped deportivo fútbol</td><td>40-60 mm</td><td>18,00 €/m²</td><td>Campos de fútbol, multideporte</td></tr></tbody></table>
<h2>Beneficios del césped artificial</h2>
<p>El <strong>césped artificial</strong> se ha convertido en una alternativa cada vez más popular al césped natural, especialmente en zonas con clima seco o donde el mantenimiento de un jardín natural resulta costoso e insostenible. Sus principales ventajas son:</p>
<ul>
<li><strong>Cero consumo de agua</strong> — En un contexto de sequías recurrentes y restricciones hídricas, el césped artificial elimina por completo la necesidad de riego. El ahorro anual puede superar los 500 litros por metro cuadrado.</li>
<li><strong>Mantenimiento mínimo</strong> — No necesita siega, abonado, tratamientos fitosanitarios ni resiembra. Un cepillado ocasional y una limpieza con agua son suficientes para mantener su aspecto perfecto.</li>
<li><strong>Durabilidad garantizada</strong> — Los céspedes de calidad profesional tienen una vida útil de 15-20 años. Todos nuestros productos incluyen garantía del fabricante de entre 5 y 10 años.</li>
<li><strong>Aspecto uniforme todo el año</strong> — Color verde intenso en cualquier estación, sin zonas secas, calvas ni barro en invierno.</li>
<li><strong>Seguridad</strong> — Los modelos para zonas de juego infantil cumplen la normativa EN 1177 de absorción de impactos, reduciendo el riesgo de lesiones.</li>
</ul>
<h2>Proceso de instalación del césped artificial</h2>
<p>Una instalación correcta es fundamental para garantizar la durabilidad y el aspecto del <strong>césped artificial</strong>. El proceso estándar incluye: preparación del terreno (retirada de vegetación, compactación, nivelación), colocación de malla geotextil antihierbas, extendido y corte del césped, unión de juntas con banda y adhesivo específico, y relleno con arena de sílice si el producto lo requiere.</p>
<p>En terrazas y superficies duras, la instalación es más sencilla: se limpia la superficie, se aplica adhesivo o cinta de doble cara y se coloca el césped directamente. Nuestro equipo de instaladores profesionales cubre Barcelona, Madrid y las principales ciudades españolas.</p>
<h2>Envío a toda España</h2>
<p>Desde nuestro almacén en Barcelona enviamos <strong>césped artificial a toda España</strong> en rollos de ancho estándar (2 metros o 4 metros) cortados a la longitud que necesites. Los envíos peninsulares llegan en 48-72 horas. Para proyectos que requieran instalación profesional, consúltanos disponibilidad en tu zona.</p>
<p>Explora nuestro <a href="/catalogo">catálogo completo</a> de césped artificial con fotos, especificaciones técnicas y precios. Si necesitas asesoramiento para elegir el césped más adecuado para tu proyecto, <a href="/contacto">contacta con nosotros</a> y te enviaremos una propuesta personalizada en menos de 24 horas.</p>`,
    category: "cesped-artificial",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "cesped-artificial-girona",
    title: "Césped Artificial en Girona — Venta e Instalación | Disstands",
    h1: "Césped artificial en Girona",
    description: "Venta e instalación de césped artificial en Girona y la Costa Brava. Jardines, terrazas y piscinas.",
    content: `<p><strong>Césped artificial en Girona</strong> y toda la Costa Brava. Instalamos césped para jardines, terrazas, hoteles y zonas de piscina. Servicio profesional desde Barcelona.</p>`,
    category: "cesped-artificial",
    city: "Girona",
    region: "Cataluña",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-barcelona-disstands",
    title: "Instalación de Césped Artificial en Barcelona | Disstands",
    h1: "Instalación de césped artificial en Barcelona",
    description: "Servicio profesional de instalación de césped artificial en Barcelona. Jardines, terrazas y eventos.",
    content: `<p>Servicio profesional de <strong>instalación de césped artificial en Barcelona</strong>. Cubrimos toda el área metropolitana con montaje garantizado.</p>`,
    category: "cesped-artificial",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-sabadell-disstands",
    title: "Césped Artificial en Sabadell — Instalación | Disstands",
    h1: "Césped artificial en Sabadell",
    description: "Instalación y venta de césped artificial en Sabadell. Jardines, terrazas y zonas comunitarias.",
    content: `<p><strong>Césped artificial en Sabadell</strong>. Instalación profesional para jardines, terrazas, áticos y zonas comunitarias del Vallès Occidental.</p>`,
    category: "cesped-artificial",
    city: "Sabadell",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-lleida-disstands",
    title: "Césped Artificial en Lleida — Instalación | Disstands",
    h1: "Césped artificial en Lleida",
    description: "Venta e instalación de césped artificial en Lleida. Jardines, terrazas y zonas deportivas.",
    content: `<p><strong>Césped artificial en Lleida</strong>. Instalación profesional para jardines, terrazas, zonas deportivas y paisajismo en toda la provincia.</p>`,
    category: "cesped-artificial",
    city: "Lleida",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-lleida-badalona",
    title: "Césped Artificial en Badalona — Instalación | Disstands",
    h1: "Césped artificial en Badalona",
    description: "Instalación y venta de césped artificial en Badalona. Jardines, terrazas y eventos.",
    content: `<p><strong>Césped artificial en Badalona</strong>. Instalación profesional con entrega rápida desde Barcelona.</p>`,
    category: "cesped-artificial",
    city: "Badalona",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-gracia",
    title: "Césped Artificial en Gràcia, Barcelona — Instalación | Disstands",
    h1: "Césped artificial en Gràcia, Barcelona",
    description: "Instalación de césped artificial en Gràcia, Barcelona. Terrazas, áticos y jardines.",
    content: `<p><strong>Césped artificial en Gràcia, Barcelona</strong>. Soluciones para terrazas, áticos y pequeños jardines del barrio.</p>`,
    category: "cesped-artificial",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-hospitalet-de-llobregat-disstands",
    title: "Césped Artificial en L'Hospitalet — Instalación | Disstands",
    h1: "Césped artificial en L'Hospitalet de Llobregat",
    description: "Instalación de césped artificial en L'Hospitalet de Llobregat. Jardines, terrazas y zonas comunitarias.",
    content: `<p><strong>Césped artificial en L'Hospitalet</strong>. Instalación profesional para jardines, terrazas y zonas comunitarias.</p>`,
    category: "cesped-artificial",
    city: "L'Hospitalet de Llobregat",
    faqs: [
      { question: "¿Cuánto cuesta el césped artificial?", answer: "El precio del césped artificial comienza desde 5,95 €/m² para césped decorativo estándar, variando según altura de fibra y uso." },
      { question: "¿Cuánto dura el césped artificial?", answer: "El césped artificial de calidad tiene una vida útil de 15 a 20 años con garantía del fabricante." },
      { question: "¿Necesita mantenimiento el césped artificial?", answer: "El mantenimiento es mínimo: un cepillado ocasional y limpieza con agua son suficientes." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales garantiza un acabado impecable y duradero." },
    ],
    relatedProducts: [
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
      { name: "Césped Londis 20mm", slug: "cesped-londis-20mm", price: "Desde 9,50 €/m²" },
      { name: "Césped Paldis 40mm", slug: "cesped-paldis-40mm", price: "Desde 14,95 €/m²" },
    ],
    advantages: [
      "Ahorro de agua significativo",
      "Mantenimiento mínimo",
      "Aspecto verde todo el año",
      "Instalación profesional disponible",
      "Garantía de hasta 10 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "30+", label: "Referencias de césped" },
      { value: "15-20", label: "Años de vida útil" },
    ],
  },

  // ========================================
  // SUELOS PVC / VINÍLICOS
  // ========================================
  {
    slug: "suelo-vinilico",
    title: "Suelo Vinílico — Catálogo y Precios | Disstands",
    h1: "Suelo vinílico",
    description: "Catálogo de suelos vinílicos PVC. Heterogéneo, homogéneo, click y losetas. Para comercios, oficinas y hospitality. Desde 8,50 €/m².",
    content: `<p>Descubre el catálogo de <strong>suelos vinílicos</strong> de <strong>Disstands</strong>, tu proveedor profesional de pavimentos con más de 23 años de experiencia. Los suelos vinílicos PVC se han consolidado como la solución más versátil y eficiente para revestir todo tipo de espacios: desde <strong>locales comerciales</strong> y oficinas hasta hospitales, clínicas, hoteles y viviendas. Combinan una estética cuidada con prestaciones técnicas excepcionales, ofreciendo resistencia, durabilidad y facilidad de mantenimiento a un precio muy competitivo.</p>
<h2>Tipos de suelos vinílicos disponibles</h2>
<p>En nuestro <a href="/catalogo">catálogo</a> encontrarás una amplia selección de pavimentos vinílicos clasificados por su composición, sistema de instalación y uso recomendado:</p>
<ul>
<li><strong>Suelo vinílico heterogéneo</strong> — Compuesto por varias capas (capa de uso, capa decorativa, soporte de fibra de vidrio y base de PVC), es el más utilizado en espacios comerciales y sanitarios. Ofrece excelente resistencia al tráfico intenso y gran variedad de diseños.</li>
<li><strong>Suelo vinílico homogéneo</strong> — El diseño y color atraviesan todo el espesor de la pieza, lo que permite renovar la superficie mediante pulido. Es la opción preferida para hospitales, laboratorios y quirófanos por sus propiedades antibacterianas.</li>
<li><strong>Suelo vinílico click (LVT)</strong> — Sistema de lamas o losetas con unión por clic, sin necesidad de adhesivo. Instalación rápida y limpia, ideal para reformas sin obras. Disponible en acabados imitación madera, piedra y cemento.</li>
<li><strong>Losetas vinílicas autoadhesivas</strong> — La opción más sencilla de instalar. Basta con retirar el protector trasero y pegar sobre el soporte limpio y nivelado.</li>
</ul>
<h2>Precios de suelos vinílicos por tipo y uso</h2>
<table><thead><tr><th>Tipo de suelo vinílico</th><th>Precio desde (€/m²)</th><th>Uso ideal</th></tr></thead><tbody><tr><td>Vinílico heterogéneo comercial</td><td>8,50 €/m²</td><td>Tiendas, comercios, oficinas</td></tr><tr><td>Vinílico homogéneo sanitario</td><td>14,00 €/m²</td><td>Hospitales, clínicas, laboratorios</td></tr><tr><td>Vinílico click LVT imitación madera</td><td>18,00 €/m²</td><td>Viviendas, hoteles, restaurantes</td></tr><tr><td>Vinílico click LVT imitación piedra</td><td>20,00 €/m²</td><td>Recepción, zonas nobles, retail</td></tr><tr><td>Losetas autoadhesivas</td><td>10,00 €/m²</td><td>Reformas rápidas, oficinas pequeñas</td></tr><tr><td>Vinílico acústico (con base foam)</td><td>22,00 €/m²</td><td>Hoteles, residencias, oficinas premium</td></tr></tbody></table>
<h2>Ventajas del suelo vinílico frente a otros pavimentos</h2>
<p>El <strong>suelo vinílico PVC</strong> ofrece una serie de ventajas que lo convierten en una de las opciones más demandadas del mercado actual:</p>
<ul>
<li><strong>Resistencia al agua</strong> — A diferencia del laminado o la madera natural, el vinílico es 100% impermeable, apto para baños, cocinas y zonas húmedas.</li>
<li><strong>Fácil mantenimiento</strong> — Se limpia con agua y jabón neutro. No necesita tratamientos especiales ni pulidos periódicos.</li>
<li><strong>Confort acústico</strong> — Las versiones con base de espuma ofrecen una reducción de ruido de impacto de hasta 19 dB, mejorando el confort en oficinas y viviendas.</li>
<li><strong>Amplia gama de diseños</strong> — Imitación madera, piedra, cemento, mármol y colores lisos. Las técnicas de impresión digital permiten reproducciones fotorrealistas de cualquier material.</li>
<li><strong>Durabilidad</strong> — Con capas de uso de 0,55 mm o más, los suelos vinílicos comerciales soportan un tráfico intenso durante más de 15 años.</li>
<li><strong>Instalación rápida</strong> — Los sistemas click permiten instalar hasta 80 m² al día sin adhesivos ni tiempos de secado.</li>
</ul>
<h2>Proceso de instalación de suelo vinílico</h2>
<p>La instalación de <strong>suelo vinílico</strong> varía según el tipo de producto elegido. Para los modelos en rollo (heterogéneo y homogéneo), nuestros instaladores profesionales preparan el soporte con pasta autonivelante, aplican adhesivo de contacto y sueldan las juntas en caliente para conseguir una superficie continua e higiénica. Este método es imprescindible en entornos sanitarios donde la estanqueidad es fundamental.</p>
<p>Para los modelos click (LVT), la instalación es flotante y no requiere adhesivo. Se realiza sobre una lámina de polietileno que actúa como barrera de vapor, encajando lama a lama con un sistema de machihembrado patentado. Es la opción preferida para reformas, ya que puede instalarse directamente sobre el pavimento existente siempre que esté en buen estado y nivelado.</p>
<h2>Suelo vinílico para cada sector profesional</h2>
<p>Cada sector tiene necesidades específicas que el suelo vinílico puede cubrir con precisión. En el ámbito <strong>sanitario</strong>, ofrecemos pavimentos homogéneos con tratamiento antibacteriano y certificaciones para uso en quirófanos. Para el sector <strong>hospitality</strong> (hoteles y restaurantes), disponemos de colecciones con acabados premium en imitación madera y piedra natural. En <strong>oficinas</strong> y <strong>espacios de trabajo</strong>, nuestras losetas y lamas ofrecen diseños modernos con excelente rendimiento acústico.</p>
<p>Desde Disstands ofrecemos asesoramiento técnico gratuito para ayudarte a elegir la solución perfecta según las condiciones de tu espacio, el tráfico previsto y tu presupuesto. <a href="/contacto">Solicita tu presupuesto</a> sin compromiso y te responderemos en menos de 24 horas. Enviamos a toda España desde nuestro almacén en Barcelona.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "suelo-pvc-locales-comerciales",
    title: "Suelo PVC para Locales Comerciales | Disstands",
    h1: "Suelo PVC para locales comerciales",
    description: "Suelo PVC para locales comerciales. Resistente al tráfico intenso, fácil mantenimiento. Desde 8,50 €/m².",
    content: `<p>El <strong>suelo PVC para locales comerciales</strong> se ha convertido en la opción preferida por diseñadores de interiores, arquitectos y propietarios de negocios que buscan un pavimento resistente, estético y fácil de mantener. En <strong>Disstands</strong>, con más de 23 años de experiencia en pavimentos profesionales, ofrecemos una selección completa de suelos vinílicos de alto rendimiento diseñados específicamente para soportar el tráfico intenso de tiendas, boutiques, cadenas de retail, restaurantes, cafeterías y todo tipo de establecimientos comerciales.</p>
<h2>¿Por qué elegir suelo PVC para tu local comercial?</h2>
<p>Los <strong>pavimentos vinílicos comerciales</strong> ofrecen ventajas decisivas frente a otros materiales como la cerámica, el parquet o el laminado en entornos de alto tráfico:</p>
<ul>
<li><strong>Resistencia extrema al tráfico</strong> — Las capas de uso de 0,55 mm o superiores garantizan una durabilidad excepcional, soportando millones de pasos sin mostrar desgaste visible. Clasificación de uso 33 (comercial intenso) o 34 (comercial muy intenso).</li>
<li><strong>Facilidad de limpieza</strong> — Superficie no porosa que se limpia con agua y jabón neutro. No absorbe manchas de café, vino, aceite ni productos químicos habituales. Los tratamientos PUR eliminan la necesidad de encerar.</li>
<li><strong>Confort acústico</strong> — Reduce el ruido de impacto significativamente, creando un ambiente más agradable para clientes y empleados. Las versiones con base de espuma alcanzan hasta 19 dB de reducción acústica.</li>
<li><strong>Diseño sin límites</strong> — Las técnicas de impresión digital de última generación permiten reproducciones fotorrealistas de madera, piedra, mármol, cemento y cualquier material. Tu local puede tener el aspecto de un suelo de roble centenario con la resistencia y practicidad del PVC.</li>
<li><strong>Instalación rápida, sin obras</strong> — Los sistemas click permiten instalar el suelo sin adhesivos ni tiempos de secado, lo que significa que tu local puede estar operativo en 1-2 días con mínima interrupción del negocio.</li>
<li><strong>Impermeabilidad total</strong> — A diferencia del laminado o la madera, el suelo vinílico es 100% resistente al agua, apto para zonas de barra, cocinas y aseos de locales de hostelería.</li>
</ul>
<h2>Tipos de suelo PVC para comercios y precios</h2>
<table><thead><tr><th>Tipo de suelo PVC</th><th>Precio desde (€/m²)</th><th>Capa de uso</th><th>Tipo de local ideal</th></tr></thead><tbody><tr><td>Vinílico heterogéneo en rollo</td><td>8,50 €/m²</td><td>0,40-0,55 mm</td><td>Tiendas de ropa, zapaterías, ópticas</td></tr><tr><td>Lamas LVT click imitación madera</td><td>18,00 €/m²</td><td>0,55 mm</td><td>Restaurantes, cafeterías, hoteles</td></tr><tr><td>Losetas LVT click imitación piedra</td><td>20,00 €/m²</td><td>0,55 mm</td><td>Joyerías, boutiques, retail premium</td></tr><tr><td>Vinílico SPC rígido</td><td>22,00 €/m²</td><td>0,55 mm</td><td>Supermercados, tráfico muy intenso</td></tr><tr><td>Vinílico acústico con foam</td><td>24,00 €/m²</td><td>0,55 mm</td><td>Restaurantes, espacios de descanso</td></tr><tr><td>Vinílico homogéneo antideslizante</td><td>14,00 €/m²</td><td>2,0 mm completo</td><td>Cocinas comerciales, zonas húmedas</td></tr></tbody></table>
<h2>Diseños más demandados para locales comerciales</h2>
<p>Las tendencias actuales en <strong>suelo para comercios</strong> se orientan hacia acabados que transmiten naturalidad y calidez. Los diseños más solicitados por nuestros clientes son:</p>
<ul>
<li><strong>Imitación madera de roble</strong> — En tonos claros (natural, blanqueado) para espacios luminosos o tonos oscuros (ahumado, nogal) para ambientes más sofisticados. Formatos en lama larga y ancha para un efecto visual amplio.</li>
<li><strong>Imitación piedra natural</strong> — Pizarra, travertino y caliza en formatos de loseta grande. Ideales para locales de estética contemporánea o industrial.</li>
<li><strong>Efecto cemento / microcemento</strong> — Muy demandado en restaurantes, cafeterías de especialidad y espacios de diseño minimalista.</li>
<li><strong>Colores lisos</strong> — Para locales que necesitan un suelo neutro que no compita con la exposición del producto: blanco, gris, negro y tonos tierra.</li>
</ul>
<h2>Proceso de instalación en locales comerciales</h2>
<p>La instalación de <strong>suelo PVC en un local comercial</strong> se planifica para minimizar el impacto en la actividad del negocio. Nuestro equipo profesional puede trabajar en horarios nocturnos o en fines de semana para no interrumpir la operación. El proceso típico incluye: evaluación del soporte existente, nivelación con pasta autonivelante si es necesario, y colocación del pavimento vinílico con el sistema adecuado (click flotante, adhesivo completo o autoadhesivo) según las condiciones del local.</p>
<p>Para un local estándar de 50-100 m², la instalación se completa en <strong>1-2 días laborables</strong>. Incluimos el remate perimetral con perfiles y la recogida de residuos generados.</p>
<h2>Solicita presupuesto para tu local</h2>
<p>En Disstands ofrecemos asesoramiento gratuito para ayudarte a elegir el suelo PVC perfecto para tu local comercial. <a href="/contacto">Solicita presupuesto</a> indicando el tipo de negocio, la superficie y tus preferencias estéticas, y te enviaremos una propuesta detallada en menos de 24 horas. Consulta también nuestro <a href="/catalogo">catálogo</a> con todas las referencias disponibles y sus precios actualizados. Enviamos a toda España desde nuestro almacén en Barcelona.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "suelo-pvc-vinilico-barcelona",
    title: "Suelo PVC Vinílico en Barcelona — Instalación | Disstands",
    h1: "Suelo PVC vinílico en Barcelona",
    description: "Instalación de suelo PVC vinílico en Barcelona. Comercios, oficinas, hospitales y viviendas.",
    content: `<p><strong>Suelo PVC vinílico en Barcelona</strong>. Instalación profesional de pavimentos vinílicos para comercios, oficinas, hospitales y viviendas.</p>`,
    category: "suelo-pvc",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "suelo-vinilico-clinicas-consultas-medicas",
    title: "Suelo Vinílico para Clínicas y Consultas Médicas | Disstands",
    h1: "Suelo vinílico para clínicas y consultas médicas",
    description: "Suelo vinílico antibacteriano para clínicas y consultas médicas. Certificado para uso sanitario.",
    content: `<p><strong>Suelo vinílico para clínicas</strong> y consultas médicas. Pavimentos antibacterianos con certificación para uso sanitario, fáciles de limpiar y desinfectar.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "suelo-vinilico-hospitales",
    title: "Suelo Vinílico para Hospitales — Antibacteriano | Disstands",
    h1: "Suelo vinílico para hospitales",
    description: "Suelo vinílico antibacteriano homogéneo para hospitales y centros sanitarios. Certificado EN ISO.",
    content: `<p><strong>Suelo vinílico para hospitales</strong>. Pavimentos homogéneos antibacterianos certificados para uso sanitario. Resistentes a productos químicos y fáciles de mantener.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "suelo-imitacion-madera",
    title: "Suelo Vinílico Imitación Madera — PVC Efecto Madera | Disstands",
    h1: "Suelo vinílico imitación madera",
    description: "Suelo vinílico con efecto madera. La calidez de la madera con la resistencia del PVC. Múltiples acabados.",
    content: `<p><strong>Suelo vinílico imitación madera</strong>. Disfruta de la calidez y estética de la madera con la resistencia, impermeabilidad y facilidad de mantenimiento del PVC.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "suelo-laminado-o-vinilico-cual-es-mas-barato",
    title: "Suelo Laminado o Vinílico: ¿Cuál es más Barato? | Disstands",
    h1: "Suelo laminado o vinílico: ¿cuál es más barato?",
    description: "Comparativa entre suelo laminado y vinílico. Precios, ventajas e inconvenientes de cada opción.",
    content: `<p>Comparativa completa entre <strong>suelo laminado y suelo vinílico</strong>. Analizamos precios, durabilidad, resistencia al agua, instalación y mantenimiento para ayudarte a elegir.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "linoleo-vs-pvc-diferencias-cual-es-mejor",
    title: "Linóleo vs PVC: Diferencias y Cuál es Mejor | Disstands",
    h1: "Linóleo vs PVC: diferencias y cuál es mejor",
    description: "Comparativa entre linóleo y PVC. Diferencias en composición, precio, durabilidad y aplicaciones.",
    content: `<p>Descubre las <strong>diferencias entre linóleo y PVC</strong>. Composición, precio, durabilidad, aplicaciones y cuál es mejor para cada tipo de espacio.</p>`,
    category: "suelo-pvc",
    faqs: [
      { question: "¿Cuánto cuesta el suelo vinílico PVC?", answer: "Los precios comienzan desde 8,50 €/m² para suelo vinílico comercial, variando según tipo y uso." },
      { question: "¿El suelo vinílico es resistente al agua?", answer: "Sí, el suelo vinílico PVC es 100% impermeable, apto para baños, cocinas y zonas húmedas." },
      { question: "¿Cuánto dura un suelo vinílico?", answer: "Con capas de uso de 0,55mm o más, los suelos vinílicos comerciales duran más de 15 años." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, nuestro equipo de instaladores profesionales se encarga del montaje completo." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "PVC Fardis Digital Doméstico", slug: "pvc-fardis-digital-domestico", price: "Desde 15,00 €/m²" },
      { name: "Suelo Vinílico Antibacteriano Silver K", slug: "suelo-vinilico-antibacteriano-silver-k", price: "Desde 14,00 €/m²" },
    ],
    advantages: [
      "100% impermeable",
      "Fácil mantenimiento",
      "Amplia gama de diseños",
      "Instalación profesional disponible",
      "Durabilidad superior a 15 años",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "preparacion-suelos",
    title: "Preparación de Suelos para Instalación | Disstands",
    h1: "Preparación de suelos para instalación",
    description: "Guía de preparación de suelos antes de instalar moqueta, PVC o césped artificial. Autonivelantes y productos.",
    content: `<p>Guía completa de <strong>preparación de suelos</strong> antes de la instalación de moquetas, PVC, césped artificial y otros pavimentos. Incluye información sobre autonivelantes, imprimaciones y técnicas.</p>`,
    category: "general",
    faqs: [
      { question: "¿Qué tipo de suelo recomendáis para mi espacio?", answer: "Depende del uso: moquetas para oficinas y ferias, PVC para comercios y hospitales, césped artificial para exteriores." },
      { question: "¿Enviáis material a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis asesoramiento técnico?", answer: "Sí, nuestro equipo técnico te asesora gratuitamente para elegir la mejor solución." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Asesoramiento técnico gratuito",
      "Instalación profesional disponible",
      "Más de 200 referencias",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "24h", label: "Respuesta en menos de" },
    ],
  },
  {
    slug: "proteccion-suelos-obras",
    title: "Protección de Suelos en Obras | Disstands",
    h1: "Protección de suelos en obras",
    description: "Materiales para protección de suelos en obras y reformas. Fieltro, film, moqueta protectora.",
    content: `<p>Materiales para la <strong>protección de suelos en obras</strong> y reformas: fieltro sintético, film de polietileno, moqueta protectora y cartón. Protege tus suelos durante el proceso constructivo.</p>`,
    category: "general",
    faqs: [
      { question: "¿Qué tipo de suelo recomendáis para mi espacio?", answer: "Depende del uso: moquetas para oficinas y ferias, PVC para comercios y hospitales, césped artificial para exteriores." },
      { question: "¿Enviáis material a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis asesoramiento técnico?", answer: "Sí, nuestro equipo técnico te asesora gratuitamente para elegir la mejor solución." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Asesoramiento técnico gratuito",
      "Instalación profesional disponible",
      "Más de 200 referencias",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "24h", label: "Respuesta en menos de" },
    ],
  },
  {
    slug: "pasta-autonivelante",
    title: "Pasta Autonivelante — Preparación de Suelos | Disstands",
    h1: "Pasta autonivelante",
    description: "Pasta autonivelante para preparación de suelos. Secado rápido y alta resistencia. Para interiores.",
    content: `<p><strong>Pasta autonivelante</strong> para preparación de suelos antes de la instalación de moqueta, PVC o parquet. Productos de secado rápido y alta resistencia.</p>`,
    category: "general",
    faqs: [
      { question: "¿Qué tipo de suelo recomendáis para mi espacio?", answer: "Depende del uso: moquetas para oficinas y ferias, PVC para comercios y hospitales, césped artificial para exteriores." },
      { question: "¿Enviáis material a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis asesoramiento técnico?", answer: "Sí, nuestro equipo técnico te asesora gratuitamente para elegir la mejor solución." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "Césped Greendis 7mm", slug: "cesped-greendis-7mm", price: "Desde 2,20 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Asesoramiento técnico gratuito",
      "Instalación profesional disponible",
      "Más de 200 referencias",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "24h", label: "Respuesta en menos de" },
    ],
  },
  {
    slug: "alfombra-a-medida-barcelona",
    title: "Alfombra a Medida en Barcelona | Disstands",
    h1: "Alfombra a medida en Barcelona",
    description: "Alfombras a medida en Barcelona. Fabricación personalizada en cualquier tamaño, color y material.",
    content: `<p><strong>Alfombras a medida en Barcelona</strong>. Fabricamos alfombras personalizadas en cualquier tamaño, color y material. Servicio de corte profesional y confección a medida.</p>`,
    category: "moquetas",
    city: "Barcelona",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },

  // ========================================
  // GIMNASIOS / DEPORTIVO
  // ========================================
  {
    slug: "tipos-suelos-gimnasios-guia-completa",
    title: "Tipos de Suelos para Gimnasios — Guía Completa | Disstands",
    h1: "Tipos de suelos para gimnasios",
    description: "Guía completa de tipos de suelos para gimnasios. Caucho, PVC, tatami y puzzle. Precios y comparativa.",
    content: `<p>Guía completa de <strong>suelos para gimnasios</strong>. Comparamos caucho, PVC, tatami y puzzle para ayudarte a elegir el pavimento ideal para tu centro deportivo.</p>`,
    category: "general",
    faqs: [
      { question: "¿Qué suelo es mejor para un gimnasio?", answer: "Depende del uso: caucho para peso libre, PVC para zonas cardio y tatami para artes marciales." },
      { question: "¿Cuánto cuesta el suelo para gimnasio?", answer: "Los precios varían desde 15 €/m² para losetas de caucho hasta 30 €/m² para suelos deportivos certificados." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, realizamos instalaciones profesionales de suelos deportivos en toda el área de Barcelona." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Suelos certificados para deporte",
      "Instalación profesional disponible",
      "Amplia variedad de opciones",
      "Asesoramiento técnico gratuito",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },
  {
    slug: "instalacion-suelos-gimnasios-barcelona",
    title: "Instalación de Suelos para Gimnasios en Barcelona | Disstands",
    h1: "Instalación de suelos para gimnasios en Barcelona",
    description: "Instalación profesional de suelos para gimnasios en Barcelona. Caucho, EPDM, puzzle y tatami.",
    content: `<p><strong>Instalación de suelos para gimnasios en Barcelona</strong>. Caucho deportivo, losetas EPDM, puzzle de goma y tatami para centros de fitness, crossfit y artes marciales.</p>`,
    category: "general",
    city: "Barcelona",
    faqs: [
      { question: "¿Qué suelo es mejor para un gimnasio?", answer: "Depende del uso: caucho para peso libre, PVC para zonas cardio y tatami para artes marciales." },
      { question: "¿Cuánto cuesta el suelo para gimnasio?", answer: "Los precios varían desde 15 €/m² para losetas de caucho hasta 30 €/m² para suelos deportivos certificados." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, realizamos instalaciones profesionales de suelos deportivos en toda el área de Barcelona." },
    ],
    relatedProducts: [
      { name: "Suelo Vinílico en Rollo Pradis", slug: "suelo-vinilico-en-rollo-pradis", price: "Desde 8,50 €/m²" },
      { name: "PVC Muradis Club", slug: "pvc-muradis-club", price: "Desde 12,00 €/m²" },
      { name: "Césped Artificial 10mm Resistente", slug: "cesped-artificial-10mm-resistente", price: "Desde 5,95 €/m²" },
    ],
    advantages: [
      "Suelos certificados para deporte",
      "Instalación profesional disponible",
      "Amplia variedad de opciones",
      "Asesoramiento técnico gratuito",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "200+", label: "Referencias disponibles" },
      { value: "15+", label: "Años de vida útil" },
    ],
  },

  // ========================================
  // MEJORES MOQUETAS / TOP
  // ========================================
  {
    slug: "mejores-moquetas-2025-top-3",
    title: "Mejores Moquetas 2025 — Top 3 | Disstands",
    h1: "Las 3 mejores moquetas de 2025",
    description: "Ranking de las 3 mejores moquetas de 2025 según calidad, precio y rendimiento. Selección profesional Disstands.",
    content: `<p>Selección profesional de las <strong>3 mejores moquetas de 2025</strong> según calidad, precio y rendimiento. Moqueta Las Vegas, Moqueta Ecológica y Moqueta Velour Lux.</p>`,
    category: "moquetas",
    faqs: [
      { question: "¿Cuánto cuesta la moqueta por metro cuadrado?", answer: "Los precios varían desde 2,65 €/m² para moqueta ferial hasta 45 €/m² para moquetas premium de lana." },
      { question: "¿Enviáis a toda España?", answer: "Sí, realizamos envíos a toda España con entrega en 24-72 horas según destino." },
      { question: "¿Ofrecéis instalación profesional?", answer: "Sí, disponemos de equipo de instaladores profesionales con más de 23 años de experiencia." },
    ],
    relatedProducts: [
      { name: "Moqueta Las Vegas", slug: "moqueta-las-vegas", price: "Desde 2,65 €/m²" },
      { name: "Moqueta Ecológica Eventos", slug: "moqueta-ecologica-eventos", price: "Desde 2,20 €/m²" },
      { name: "Moqueta Velour Lux", slug: "moqueta-velour-lux", price: "Desde 5,95 €/m²" },
      { name: "Moqueta Ferial Colores Especiales", slug: "moqueta-ferial-colores-especiales", price: "Desde 3,20 €/m²" },
    ],
    advantages: [
      "Envío a toda España",
      "Instalación profesional disponible",
      "Más de 60 colores disponibles",
      "Certificación ignífuga Bfl-s1",
      "Presupuesto sin compromiso",
    ],
    stats: [
      { value: "23+", label: "Años de experiencia" },
      { value: "500+", label: "Proyectos realizados" },
      { value: "60+", label: "Colores disponibles" },
      { value: "200+", label: "Referencias en catálogo" },
    ],
  },
];

export function getSeoLandingBySlug(slug: string): SeoLanding | undefined {
  return seoLandings.find((l) => l.slug === slug);
}

export function getAllSeoLandingSlugs(): string[] {
  return seoLandings.map((l) => l.slug);
}
