export interface SeoLanding {
  slug: string;
  title: string;
  h1: string;
  description: string;
  content: string;
  category: "moquetas" | "cesped-artificial" | "suelo-pvc" | "general";
  city?: string;
  region?: string;
}

export const seoLandings: SeoLanding[] = [
  // ========================================
  // MOQUETAS — Ciudades y barrios
  // ========================================
  {
    slug: "moquetas-barcelona-2",
    title: "Moquetas en Barcelona — Venta e Instalación Profesional | Disstands",
    h1: "Moquetas en Barcelona",
    description: "Venta e instalación profesional de moquetas en Barcelona. Moquetas feriales, ecológicas, velour y más. +23 años de experiencia. Presupuesto sin compromiso.",
    content: `<p>En <strong>Disstands</strong> somos especialistas en la <strong>venta e instalación de moquetas en Barcelona</strong>. Con más de 23 años de experiencia y más de 500 proyectos realizados, ofrecemos la mayor variedad de moquetas para ferias, eventos, oficinas y espacios comerciales.</p>
<h2>Tipos de moquetas disponibles en Barcelona</h2>
<ul>
<li><strong>Moqueta Ecológica</strong> — Única en el mundo, 100% reciclable. Desde 2,65 €/m².</li>
<li><strong>Moqueta Velour Lux</strong> — Acabado premium aterciopelado para eventos de alto nivel.</li>
<li><strong>Moqueta Colores Especiales</strong> — Más de 60 colores disponibles para personalizar tu espacio.</li>
<li><strong>Moqueta Las Vegas</strong> — La moqueta ferial más vendida del mercado.</li>
<li><strong>Moqueta Ignífuga</strong> — Certificación Bfl-s1, obligatoria para recintos feriales.</li>
</ul>
<h2>Instalación profesional en Barcelona</h2>
<p>Nuestro equipo de instaladores profesionales cubre toda el área metropolitana de Barcelona. Realizamos instalaciones para ferias en Fira Barcelona (Montjuïc y Gran Via), hoteles, oficinas y espacios comerciales.</p>
<h2>¿Por qué elegir Disstands?</h2>
<ul>
<li>Más de 23 años de experiencia en el sector</li>
<li>Más de 500 proyectos realizados en toda Europa</li>
<li>Servicio de entrega urgente para ferias y eventos</li>
<li>Asesoramiento técnico personalizado</li>
<li>Los mejores precios del mercado</li>
</ul>`,
    category: "moquetas",
    city: "Barcelona",
    region: "Cataluña",
  },
  {
    slug: "moquetas-hospitalet",
    title: "Moquetas en L'Hospitalet de Llobregat — Venta e Instalación | Disstands",
    h1: "Moquetas en L'Hospitalet de Llobregat",
    description: "Compra e instalación de moquetas en L'Hospitalet de Llobregat. Moquetas feriales, ecológicas y de oficina. Entrega rápida y presupuesto sin compromiso.",
    content: `<p><strong>Disstands</strong> ofrece venta e instalación profesional de moquetas en <strong>L'Hospitalet de Llobregat</strong> y alrededores. Estamos ubicados en Barcelona, lo que nos permite ofrecer un servicio rápido y eficiente en toda la zona del Baix Llobregat.</p>
<h2>Nuestras moquetas más populares</h2>
<ul>
<li><strong>Moqueta ferial Las Vegas</strong> — Ideal para stands y ferias en Fira Barcelona Gran Via.</li>
<li><strong>Moqueta ecológica</strong> — 100% reciclable, la opción sostenible.</li>
<li><strong>Moqueta para oficinas</strong> — Losetas modulares con aislamiento acústico.</li>
</ul>
<h2>Servicio de instalación en L'Hospitalet</h2>
<p>Cubrimos toda L'Hospitalet incluyendo los barrios de Gran Via Sud, Collblanc, La Torrassa, Santa Eulàlia y Centre. Instalación profesional con garantía.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
    region: "Cataluña",
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
<p>Ofrecemos losetas de moqueta y moqueta en rollo para oficinas, hoteles y espacios comerciales en Lleida. Instalación profesional incluida.</p>`,
    category: "moquetas",
    city: "Lleida",
    region: "Cataluña",
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
  },
  {
    slug: "moquetas-santa-coloma-de-gramenet",
    title: "Moquetas en Santa Coloma de Gramenet — Instalación | Disstands",
    h1: "Moquetas en Santa Coloma de Gramenet",
    description: "Venta e instalación de moquetas en Santa Coloma de Gramenet. Precios desde 2,65 €/m².",
    content: `<p><strong>Disstands</strong> suministra e instala moquetas en <strong>Santa Coloma de Gramenet</strong>. Todo tipo de moquetas con instalación profesional incluida.</p>`,
    category: "moquetas",
    city: "Santa Coloma de Gramenet",
    region: "Cataluña",
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
  },
  {
    slug: "moquetas-valles-occidental-disstands",
    title: "Moquetas en el Vallès Occidental — Instalación | Disstands",
    h1: "Moquetas en el Vallès Occidental",
    description: "Venta e instalación de moquetas en el Vallès Occidental: Sabadell, Terrassa, Cerdanyola y más. Desde 2,65 €/m².",
    content: `<p><strong>Disstands</strong> cubre toda la comarca del <strong>Vallès Occidental</strong> con servicio de venta e instalación de moquetas. Sabadell, Terrassa, Cerdanyola del Vallès, Rubí, Sant Cugat y más.</p>`,
    category: "moquetas",
    region: "Cataluña",
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
  },
  {
    slug: "moquetas-eixample-barcelona",
    title: "Moquetas en Eixample Barcelona — Venta Profesional | Disstands",
    h1: "Moquetas profesionales en el Eixample de Barcelona",
    description: "Venta profesional de moquetas en el Eixample de Barcelona. Losetas de oficina, moquetas feriales y decorativas.",
    content: `<p>Servicio profesional de <strong>moquetas en el Eixample de Barcelona</strong>. Losetas modulares para oficinas, moquetas feriales y soluciones decorativas con instalación incluida.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-sants-barcelona",
    title: "Moquetas en Sants, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Sants, Barcelona",
    description: "Venta e instalación de moquetas en Sants-Montjuïc, Barcelona. Cerca de Fira Barcelona Montjuïc.",
    content: `<p><strong>Disstands</strong> instala moquetas en <strong>Sants-Montjuïc</strong>, zona estratégica junto a Fira Barcelona Montjuïc. Servicio urgente para ferias y eventos.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-les-corts-barcelona-instalacion",
    title: "Moquetas en Les Corts, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Les Corts, Barcelona",
    description: "Instalación de moquetas en Les Corts, Barcelona. Servicio profesional para oficinas y comercios.",
    content: `<p>Instalación profesional de moquetas en <strong>Les Corts, Barcelona</strong>. Zona de oficinas y centros de negocios donde ofrecemos losetas modulares y moquetas acústicas.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-horta-guinardo",
    title: "Moquetas en Horta-Guinardó, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Horta-Guinardó, Barcelona",
    description: "Venta e instalación de moquetas en Horta-Guinardó, Barcelona. Precios desde 2,65 €/m².",
    content: `<p><strong>Disstands</strong> ofrece moquetas en <strong>Horta-Guinardó</strong>. Moquetas para oficinas, comercios y espacios residenciales con instalación profesional.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-nou-barris-barcelona",
    title: "Moquetas en Nou Barris, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Nou Barris, Barcelona",
    description: "Instalación y venta de moquetas en Nou Barris, Barcelona. Servicio profesional con precios competitivos.",
    content: `<p>Venta e instalación de moquetas en <strong>Nou Barris, Barcelona</strong>. Servicio rápido y profesional con los mejores precios del mercado.</p>`,
    category: "moquetas",
    city: "Barcelona",
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
  },
  {
    slug: "moquetas-en-ciutat-vella",
    title: "Moquetas en Ciutat Vella, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Ciutat Vella, Barcelona",
    description: "Venta e instalación de moquetas en Ciutat Vella, Barcelona. Raval, Gòtic, Born y Barceloneta.",
    content: `<p>Instalamos moquetas en <strong>Ciutat Vella</strong>: El Raval, Barri Gòtic, El Born, Sant Pere y La Barceloneta. Servicio adaptado a los edificios históricos del centro de Barcelona.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-raval",
    title: "Moquetas en El Raval, Barcelona — Instalación | Disstands",
    h1: "Moquetas en El Raval, Barcelona",
    description: "Instalación de moquetas en El Raval, Barcelona. Servicio profesional para comercios, hoteles y oficinas.",
    content: `<p>Servicio de instalación de moquetas en <strong>El Raval, Barcelona</strong>. Soluciones para hoteles, hostales, comercios y oficinas del centro de la ciudad.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-barrio-gotic",
    title: "Moquetas en el Barri Gòtic, Barcelona — Instalación | Disstands",
    h1: "Moquetas en el Barri Gòtic, Barcelona",
    description: "Venta e instalación de moquetas en el Barrio Gótico de Barcelona. Servicio profesional.",
    content: `<p>Instalamos moquetas en el <strong>Barri Gòtic de Barcelona</strong>. Experiencia en edificios históricos y espacios comerciales del centro.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-sant-pere-disstands",
    title: "Moquetas en Sant Pere, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Sant Pere, Barcelona",
    description: "Instalación de moquetas en Sant Pere, Santa Caterina i la Ribera, Barcelona.",
    content: `<p>Servicio de moquetas en <strong>Sant Pere, Santa Caterina i la Ribera</strong>. Instalación profesional adaptada a cada espacio.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-el-font-pienc-disstands",
    title: "Moquetas en Fort Pienc, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Fort Pienc, Barcelona",
    description: "Venta e instalación de moquetas en Fort Pienc, Barcelona. Cerca de la Estació del Nord.",
    content: `<p>Instalamos moquetas en <strong>Fort Pienc, Barcelona</strong>. Zona cercana a la Estació del Nord, ideal para oficinas y espacios de coworking.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-sant-antoni-disstands",
    title: "Moquetas en Sant Antoni, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Sant Antoni, Barcelona",
    description: "Instalación y venta de moquetas en Sant Antoni, Barcelona. Servicio profesional.",
    content: `<p>Ofrecemos moquetas en <strong>Sant Antoni, Barcelona</strong>. Instalación profesional para comercios, oficinas y viviendas del barrio.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-barrio-el-born-barcelona",
    title: "Moquetas en El Born, Barcelona — Instalación | Disstands",
    h1: "Moquetas en El Born, Barcelona",
    description: "Venta e instalación de moquetas en El Born, Barcelona. Para hoteles boutique, galerías y comercios.",
    content: `<p>Moquetas para <strong>El Born, Barcelona</strong>. Soluciones elegantes para hoteles boutique, galerías de arte, restaurantes y comercios del barrio.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-barrio-gran-via-sud-hospitalet",
    title: "Moquetas en Gran Via Sud, L'Hospitalet — Instalación | Disstands",
    h1: "Moquetas en Gran Via Sud, L'Hospitalet",
    description: "Moquetas en Gran Via Sud, L'Hospitalet. Cerca de Fira Barcelona Gran Via. Servicio urgente para ferias.",
    content: `<p>Instalamos moquetas en <strong>Gran Via Sud, L'Hospitalet</strong>. Ubicación estratégica junto a Fira Barcelona Gran Via para montajes urgentes de ferias y congresos internacionales.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
  },
  {
    slug: "instalacion-de-moquetas-en-poblenou-disstands",
    title: "Moquetas en Poblenou, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Poblenou, Barcelona",
    description: "Instalación de moquetas en Poblenou, Barcelona. Zona 22@ con oficinas y startups.",
    content: `<p>Moquetas en <strong>Poblenou y distrito 22@</strong>. Losetas modulares para oficinas tecnológicas, coworkings y startups de Barcelona.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-el-collblanc-disstands",
    title: "Moquetas en Collblanc, L'Hospitalet — Instalación | Disstands",
    h1: "Moquetas en Collblanc",
    description: "Instalación de moquetas en Collblanc, L'Hospitalet de Llobregat. Servicio profesional.",
    content: `<p>Servicio de moquetas en <strong>Collblanc, L'Hospitalet</strong>. Instalación profesional para comercios y oficinas del barrio.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
  },
  {
    slug: "moquetas-barrio-collblanc",
    title: "Moquetas en el barrio de Collblanc — Instalación | Disstands",
    h1: "Moquetas en el barrio de Collblanc",
    description: "Venta e instalación de moquetas en el barrio de Collblanc. Precios competitivos.",
    content: `<p>Ofrecemos moquetas en el <strong>barrio de Collblanc</strong> con precios competitivos e instalación profesional incluida.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
  },
  {
    slug: "instalacion-y-venta-de-moqueta-la-torrassa-disstands",
    title: "Moquetas en La Torrassa — Instalación | Disstands",
    h1: "Moquetas en La Torrassa",
    description: "Instalación de moquetas en La Torrassa, L'Hospitalet. Servicio rápido y profesional.",
    content: `<p>Instalamos moquetas en <strong>La Torrassa, L'Hospitalet</strong>. Servicio rápido desde Barcelona con precios competitivos.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
  },
  {
    slug: "instalacion-de-moquetas-en-santa-ulalia-disstands",
    title: "Moquetas en Santa Eulàlia — Instalación | Disstands",
    h1: "Moquetas en Santa Eulàlia",
    description: "Instalación de moquetas en Santa Eulàlia, L'Hospitalet de Llobregat.",
    content: `<p>Servicio de moquetas en <strong>Santa Eulàlia, L'Hospitalet</strong>. Instalación profesional para todo tipo de espacios.</p>`,
    category: "moquetas",
    city: "L'Hospitalet de Llobregat",
  },
  {
    slug: "instalacion-de-moquetas-en-hostafrancs",
    title: "Moquetas en Hostafrancs, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Hostafrancs, Barcelona",
    description: "Instalación de moquetas en Hostafrancs, Barcelona. Cerca de Fira Montjuïc.",
    content: `<p>Moquetas en <strong>Hostafrancs, Barcelona</strong>. Zona junto a Fira Montjuïc, ideal para servicio urgente en ferias y eventos.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-de-moquetas-en-la-bordeta-disstands",
    title: "Moquetas en La Bordeta, Barcelona — Instalación | Disstands",
    h1: "Moquetas en La Bordeta, Barcelona",
    description: "Venta e instalación de moquetas en La Bordeta, Barcelona.",
    content: `<p>Instalamos moquetas en <strong>La Bordeta, Barcelona</strong>. Servicio profesional para comercios y oficinas del barrio.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-la-verneda-i-la-pau-barcelona",
    title: "Moquetas en La Verneda i La Pau — Instalación | Disstands",
    h1: "Moquetas en La Verneda i La Pau, Barcelona",
    description: "Instalación de moquetas en La Verneda i La Pau, Barcelona.",
    content: `<p>Servicio de moquetas en <strong>La Verneda i La Pau, Barcelona</strong>. Instalación profesional a precios competitivos.</p>`,
    category: "moquetas",
    city: "Barcelona",
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
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-la-barceloneta-disstands",
    title: "Moquetas en La Barceloneta — Instalación | Disstands",
    h1: "Moquetas en La Barceloneta, Barcelona",
    description: "Instalación de moquetas en La Barceloneta, Barcelona.",
    content: `<p>Moquetas en <strong>La Barceloneta, Barcelona</strong>. Soluciones para hoteles, restaurantes y comercios del barrio marinero.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-poblesec-disstands",
    title: "Moquetas en Poble-sec, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Poble-sec, Barcelona",
    description: "Instalación de moquetas en Poble-sec, Barcelona. Cerca de Montjuïc y Fira Barcelona.",
    content: `<p>Moquetas en <strong>Poble-sec, Barcelona</strong>. Barrio junto a Montjuïc y Fira Barcelona, servicio rápido para ferias y eventos.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-moquetas-en-plaza-cataluna-disstands",
    title: "Moquetas en Plaza Cataluña, Barcelona — Instalación | Disstands",
    h1: "Moquetas en Plaza Cataluña, Barcelona",
    description: "Instalación de moquetas en la zona de Plaza Cataluña, Barcelona.",
    content: `<p>Servicio de instalación de moquetas en la zona de <strong>Plaza Cataluña, Barcelona</strong>. Oficinas, hoteles y comercios del centro.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moquetas-barrio-antiga-esquerra-eixample-barcelona",
    title: "Moquetas en Antiga Esquerra de l'Eixample — Instalación | Disstands",
    h1: "Moquetas en la Antiga Esquerra de l'Eixample",
    description: "Instalación de moquetas en la Antiga Esquerra del Eixample, Barcelona.",
    content: `<p>Moquetas en la <strong>Antiga Esquerra de l'Eixample</strong>. Zona de oficinas y comercios donde instalamos losetas modulares y moquetas acústicas.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "instalacion-de-moquetas-en-andorra-disstands",
    title: "Moquetas en Andorra — Venta e Instalación | Disstands",
    h1: "Moquetas en Andorra",
    description: "Venta e instalación de moquetas en Andorra. Servicio profesional desde Barcelona. Hoteles, comercios y oficinas.",
    content: `<p><strong>Disstands</strong> ofrece servicio de moquetas en <strong>Andorra</strong>. Suministramos e instalamos moquetas para hoteles, estaciones de esquí, comercios y oficinas del Principado.</p>`,
    category: "moquetas",
    city: "Andorra",
  },
  {
    slug: "instalacion-de-moquetas-en-andorra-disstands-2",
    title: "Moquetas en Andorra la Vella — Instalación | Disstands",
    h1: "Moquetas en Andorra la Vella",
    description: "Instalación profesional de moquetas en Andorra la Vella. Hoteles, comercios y oficinas.",
    content: `<p>Instalamos moquetas en <strong>Andorra la Vella</strong> y todo el Principado. Servicio de transporte desde Barcelona incluido.</p>`,
    category: "moquetas",
    city: "Andorra la Vella",
  },
  {
    slug: "moquetas-oficinas-barcelona",
    title: "Moquetas para Oficinas en Barcelona — Instalación | Disstands",
    h1: "Moquetas para oficinas en Barcelona",
    description: "Instalación de moquetas para oficinas en Barcelona. Losetas modulares con aislamiento acústico. Desde 8 €/m².",
    content: `<p>Especialistas en <strong>moquetas para oficinas en Barcelona</strong>. Losetas modulares, moquetas acústicas y soluciones contract para espacios de trabajo, coworkings y sedes corporativas.</p>
<h2>Ventajas de la moqueta en oficinas</h2>
<ul>
<li>Aislamiento acústico superior</li>
<li>Confort al caminar</li>
<li>Fácil mantenimiento y sustitución parcial</li>
<li>Amplia variedad de diseños y colores</li>
</ul>`,
    category: "moquetas",
    city: "Barcelona",
  },

  // ========================================
  // MOQUETAS — Madrid
  // ========================================
  {
    slug: "venta-moquetas-madrid",
    title: "Moquetas en Madrid — Venta e Instalación | Disstands",
    h1: "Moquetas en Madrid",
    description: "Venta e instalación de moquetas en Madrid. Moquetas feriales, ecológicas y para oficinas. Envío desde Barcelona.",
    content: `<p><strong>Disstands</strong> ofrece servicio de venta e instalación de moquetas en <strong>Madrid</strong>. Cubrimos ferias en IFEMA, oficinas y espacios comerciales de toda la Comunidad de Madrid.</p>
<h2>Servicios en Madrid</h2>
<ul>
<li>Moquetas feriales para IFEMA y palacios de congresos</li>
<li>Losetas de moqueta para oficinas</li>
<li>Moquetas ecológicas y sostenibles</li>
<li>Envío rápido desde Barcelona</li>
</ul>`,
    category: "moquetas",
    city: "Madrid",
    region: "Madrid",
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
  },

  // ========================================
  // MOQUETAS — Páginas temáticas
  // ========================================
  {
    slug: "venta-instalacion-moquetas",
    title: "Venta e Instalación de Moquetas — Profesional | Disstands",
    h1: "Venta e instalación profesional de moquetas",
    description: "Servicio profesional de venta e instalación de moquetas en toda España. Ferias, oficinas y eventos. Más de 23 años de experiencia.",
    content: `<p><strong>Disstands</strong> es tu partner en <strong>venta e instalación de moquetas</strong> en toda España y Europa. Con más de 23 años de experiencia, ofrecemos la mayor variedad de moquetas del mercado con instalación profesional incluida.</p>`,
    category: "moquetas",
  },
  {
    slug: "venta-moquetas-y-pvc",
    title: "Venta de Moquetas y PVC — Profesional | Disstands",
    h1: "Venta de moquetas y suelos PVC",
    description: "Venta profesional de moquetas y suelos PVC. Catálogo completo con más de 200 referencias. Precios competitivos.",
    content: `<p>En <strong>Disstands</strong> somos especialistas en la <strong>venta de moquetas y suelos PVC</strong>. Más de 200 referencias disponibles con envío a toda España.</p>`,
    category: "general",
  },
  {
    slug: "comprar-moqueta-online",
    title: "Comprar Moqueta Online — Disstands Tienda",
    h1: "Comprar moqueta online",
    description: "Compra moqueta online en Disstands. Envío a toda España. Moquetas feriales, ecológicas, velour y más. Desde 2,65 €/m².",
    content: `<p><strong>Compra moqueta online</strong> en Disstands. Más de 200 referencias disponibles con envío rápido a toda España. Desde 2,65 €/m² con descuentos por volumen.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-por-metros",
    title: "Moqueta por Metros — Venta Online | Disstands",
    h1: "Moqueta por metros",
    description: "Compra moqueta por metros cuadrados. Corte a medida y envío a toda España. Desde 2,65 €/m².",
    content: `<p>Venta de <strong>moqueta por metros</strong> con corte a medida. Compra la cantidad exacta que necesitas, sin desperdicio. Envío a toda España.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-precio-metro-cuadrado",
    title: "Moqueta Precio por Metro Cuadrado — Guía de Precios | Disstands",
    h1: "Precio de moqueta por metro cuadrado",
    description: "Guía de precios de moqueta por metro cuadrado. Desde 2,65 €/m² hasta 45 €/m² según tipo y calidad.",
    content: `<p>Guía completa de <strong>precios de moqueta por metro cuadrado</strong>. Desde la moqueta ferial básica a 2,65 €/m² hasta moquetas de lana premium a 45 €/m².</p>
<h2>Precios orientativos por tipo</h2>
<ul>
<li>Moqueta ferial Las Vegas: desde 2,65 €/m²</li>
<li>Moqueta ecológica: desde 3,50 €/m²</li>
<li>Moqueta Velour Lux: desde 5,95 €/m²</li>
<li>Losetas de oficina: desde 12 €/m²</li>
<li>Moqueta de lana premium: desde 25 €/m²</li>
</ul>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-barata-economica",
    title: "Moqueta Barata y Económica — Desde 2,65 €/m² | Disstands",
    h1: "Moqueta barata y económica",
    description: "Moqueta barata desde 2,65 €/m². Moquetas económicas para ferias, eventos y obras. Calidad profesional a precios competitivos.",
    content: `<p><strong>Moqueta barata</strong> desde 2,65 €/m² en Disstands. Moquetas económicas sin renunciar a la calidad profesional, ideales para ferias, eventos y protección de suelos en obras.</p>`,
    category: "moquetas",
  },
  {
    slug: "que-son-las-moquetas",
    title: "¿Qué son las Moquetas? Guía Completa | Disstands",
    h1: "¿Qué son las moquetas?",
    description: "Guía completa sobre qué son las moquetas, tipos, materiales, usos y cómo elegir la moqueta perfecta para tu espacio.",
    content: `<p>Una <strong>moqueta</strong> es un revestimiento textil para suelos fabricado con fibras sintéticas o naturales. Se utiliza en oficinas, hoteles, ferias, eventos y viviendas por su confort, aislamiento acústico y variedad de diseños.</p>
<h2>Tipos de moquetas</h2>
<ul>
<li><strong>Punzonada</strong> — Fibras entrelazadas mecánicamente. Económica y resistente.</li>
<li><strong>Velour</strong> — Pelo cortado suave y aterciopelado. Elegante.</li>
<li><strong>Bucle</strong> — Fibras en forma de bucle. Muy resistente al tráfico.</li>
<li><strong>Saxony</strong> — Pelo largo y suave. Máximo confort.</li>
<li><strong>Losetas</strong> — Piezas modulares fáciles de instalar y reemplazar.</li>
</ul>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-velour-alta-densidad",
    title: "Moqueta Velour Alta Densidad — Premium | Disstands",
    h1: "Moqueta Velour de alta densidad",
    description: "Moqueta Velour de alta densidad para eventos premium. Acabado aterciopelado y elegante. Ignífuga Bfl-s1.",
    content: `<p>La <strong>moqueta Velour de alta densidad</strong> es la elección premium para eventos de alto nivel. Acabado aterciopelado, ignífuga con certificación Bfl-s1, disponible en múltiples colores.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-ferial-unica-barcelona",
    title: "Moqueta Ferial en Barcelona — La Mejor Selección | Disstands",
    h1: "Moqueta ferial en Barcelona",
    description: "La mejor selección de moqueta ferial en Barcelona. Para Fira Barcelona, CCIB y recintos de congresos. Desde 2,65 €/m².",
    content: `<p>La mayor selección de <strong>moqueta ferial en Barcelona</strong>. Suministramos moqueta para Fira Barcelona (Montjuïc y Gran Via), CCIB, hoteles de congresos y recintos de toda Cataluña.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moqueta-ecologica-eventos-reciclable",
    title: "Moqueta Ecológica para Eventos — 100% Reciclable | Disstands",
    h1: "Moqueta ecológica para eventos, 100% reciclable",
    description: "Moqueta ecológica 100% reciclable para eventos y ferias. Única en el mundo. Reduce tu huella de carbono.",
    content: `<p>Nuestra <strong>moqueta ecológica 100% reciclable</strong> es única en el mundo. Fabricada con materiales sostenibles, se recicla completamente al final de su vida útil, reduciendo la huella de carbono de tus eventos.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-ecologica-para-eventos-internacionales-y-de-alta-exigencia",
    title: "Moqueta Ecológica para Eventos Internacionales | Disstands",
    h1: "Moqueta ecológica para eventos internacionales",
    description: "Moqueta ecológica certificada para eventos internacionales de alta exigencia. Sostenibilidad sin comprometer la calidad.",
    content: `<p><strong>Moqueta ecológica certificada</strong> para eventos internacionales de alta exigencia. Cumple con las normativas ambientales más estrictas y ofrece un acabado premium comparable a las moquetas convencionales.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-dilour-eco",
    title: "Moqueta Dilour Eco — Sostenible | Disstands",
    h1: "Moqueta Dilour Eco",
    description: "Moqueta Dilour Eco, la opción sostenible para ferias y eventos. Fabricada con materiales reciclados.",
    content: `<p>La <strong>moqueta Dilour Eco</strong> es nuestra apuesta por la sostenibilidad. Fabricada con fibras recicladas, ofrece un excelente rendimiento para ferias y eventos con mínimo impacto ambiental.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-sostenible",
    title: "Moqueta Sostenible — Eco-Friendly | Disstands",
    h1: "Moqueta sostenible",
    description: "Moquetas sostenibles y eco-friendly. Fabricadas con materiales reciclados y reciclables. Catálogo completo.",
    content: `<p>Descubre nuestra gama de <strong>moquetas sostenibles</strong>. Fabricadas con fibras recicladas como ECONYL® y materiales 100% reciclables para un futuro más verde.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-modular",
    title: "Moqueta Modular — Losetas para Oficinas | Disstands",
    h1: "Moqueta modular en losetas",
    description: "Moqueta modular en losetas para oficinas y comercios. Fácil instalación y sustitución. Múltiples diseños.",
    content: `<p>La <strong>moqueta modular en losetas</strong> es la solución perfecta para oficinas y espacios comerciales. Fácil de instalar, mantener y sustituir parcialmente sin afectar al resto del suelo.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-nautica",
    title: "Moqueta Náutica — Para Barcos y Yates | Disstands",
    h1: "Moqueta náutica",
    description: "Moqueta náutica para barcos, yates y embarcaciones. Resistente al agua, sal y UV. Instalación profesional.",
    content: `<p><strong>Moqueta náutica</strong> especialmente diseñada para barcos, yates y embarcaciones. Resistente al agua salada, rayos UV y condiciones marinas extremas.</p>`,
    category: "moquetas",
  },
  {
    slug: "losetas-de-moqueta",
    title: "Losetas de Moqueta — Modulares para Oficinas | Disstands",
    h1: "Losetas de moqueta",
    description: "Losetas de moqueta modulares para oficinas y comercios. Fácil instalación, múltiples diseños. Desde 12 €/m².",
    content: `<p><strong>Losetas de moqueta</strong> modulares para oficinas, espacios de coworking y comercios. Disponibles en múltiples diseños, colores y texturas. Instalación sencilla y sustitución parcial sin obras.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-navidad",
    title: "Moqueta para Navidad — Eventos Navideños | Disstands",
    h1: "Moqueta para eventos navideños",
    description: "Moqueta roja y verde para eventos navideños. Mercadillos, espectáculos y decoración navideña. Entrega urgente.",
    content: `<p><strong>Moqueta para eventos navideños</strong>: mercadillos, espectáculos, centros comerciales y decoración navideña. Moqueta roja y verde con entrega urgente en toda España.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-roja-eventos-barcelona",
    title: "Moqueta Roja para Eventos en Barcelona | Disstands",
    h1: "Moqueta roja para eventos en Barcelona",
    description: "Moqueta roja para eventos, alfombra roja y ceremonias en Barcelona. Stock permanente. Entrega inmediata.",
    content: `<p><strong>Moqueta roja para eventos en Barcelona</strong>. La alfombra roja clásica para galas, ceremonias, estrenos y eventos corporativos. Stock permanente con entrega inmediata.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moqueta-gris-para-eventos-en-barcelona-disstands",
    title: "Moqueta Gris para Eventos en Barcelona | Disstands",
    h1: "Moqueta gris para eventos en Barcelona",
    description: "Moqueta gris para eventos y ferias en Barcelona. La más demandada para stands corporativos.",
    content: `<p><strong>Moqueta gris para eventos en Barcelona</strong>. El color más demandado para stands corporativos, congresos y espacios profesionales. Disponible en múltiples tonos de gris.</p>`,
    category: "moquetas",
    city: "Barcelona",
  },
  {
    slug: "moqueta-suelo-eventos-barcelona",
    title: "Moqueta y Suelo para Eventos en Barcelona | Disstands",
    h1: "Moqueta y suelo para eventos en Barcelona",
    description: "Todo tipo de suelos para eventos en Barcelona: moquetas, PVC, césped artificial. Instalación profesional.",
    content: `<p>Todos los <strong>suelos para eventos en Barcelona</strong>: moquetas feriales, PVC impreso, césped artificial y suelos técnicos. Instalación profesional para ferias, congresos y eventos corporativos.</p>`,
    category: "general",
    city: "Barcelona",
  },
  {
    slug: "moquetas-leroy-merlin",
    title: "Moquetas vs Leroy Merlin — Comparativa Profesional | Disstands",
    h1: "Moquetas Disstands vs Leroy Merlin",
    description: "Comparativa entre moquetas profesionales Disstands y moquetas de Leroy Merlin. Calidad, precios y servicio.",
    content: `<p>¿Buscas moquetas de calidad profesional? Compara las <strong>moquetas de Disstands con las de Leroy Merlin</strong>. Te explicamos las diferencias en calidad, variedad, precios y servicio de instalación.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-ferial-barata-leroy-merlin",
    title: "Moqueta Ferial Barata — Alternativa a Leroy Merlin | Disstands",
    h1: "Moqueta ferial barata — alternativa profesional a Leroy Merlin",
    description: "Moqueta ferial barata desde 2,65 €/m². Alternativa profesional a Leroy Merlin con mejor calidad y servicio.",
    content: `<p><strong>Moqueta ferial barata</strong> desde 2,65 €/m², más económica y de mejor calidad que las opciones de Leroy Merlin. Servicio profesional con instalación y asesoramiento incluido.</p>`,
    category: "moquetas",
  },
  {
    slug: "moqueta-leroy-merlin-precio",
    title: "Precio Moqueta Leroy Merlin — Comparativa | Disstands",
    h1: "Precio de moqueta: Leroy Merlin vs Disstands",
    description: "Comparativa de precios de moqueta entre Leroy Merlin y Disstands. Descubre por qué somos más competitivos.",
    content: `<p>Comparamos los <strong>precios de moqueta de Leroy Merlin</strong> con los de Disstands. En muchos casos, nuestros precios son más competitivos y con mejor calidad profesional.</p>`,
    category: "moquetas",
  },
  {
    slug: "guia-completa-moquetas-2026",
    title: "Guía Completa de Moquetas 2026 | Disstands",
    h1: "Guía completa de moquetas 2026",
    description: "Guía completa de moquetas 2026. Tipos, materiales, precios, instalación y tendencias. Todo lo que necesitas saber.",
    content: `<p>La <strong>guía completa de moquetas 2026</strong>. Todo lo que necesitas saber sobre tipos, materiales, precios, instalación, mantenimiento y las últimas tendencias en moquetas para ferias, oficinas y eventos.</p>`,
    category: "moquetas",
  },
  {
    slug: "mantenimiento-limpieza-moqueta-suelo-textil",
    title: "Mantenimiento y Limpieza de Moquetas — Guía | Disstands",
    h1: "Mantenimiento y limpieza de moquetas",
    description: "Guía completa de mantenimiento y limpieza de moquetas y suelos textiles. Consejos profesionales.",
    content: `<p>Guía profesional de <strong>mantenimiento y limpieza de moquetas</strong>. Aprende a cuidar tu suelo textil con los mejores productos y técnicas para prolongar su vida útil.</p>`,
    category: "moquetas",
  },

  // ========================================
  // CÉSPED ARTIFICIAL
  // ========================================
  {
    slug: "cesped-artificial-barcelona",
    title: "Césped Artificial en Barcelona — Venta e Instalación | Disstands",
    h1: "Césped artificial en Barcelona",
    description: "Venta e instalación de césped artificial en Barcelona. Para jardines, terrazas, eventos y paisajismo. Desde 5,95 €/m².",
    content: `<p><strong>Disstands</strong> es tu especialista en <strong>césped artificial en Barcelona</strong>. Ofrecemos césped para jardines, terrazas, piscinas, eventos y paisajismo con instalación profesional incluida.</p>
<h2>Tipos de césped artificial</h2>
<ul>
<li><strong>Césped decorativo</strong> — Para jardines y terrazas. Desde 5,95 €/m².</li>
<li><strong>Césped para eventos</strong> — Rollos para ferias y montajes temporales.</li>
<li><strong>Césped deportivo</strong> — Para pistas de pádel, fútbol y multideporte.</li>
<li><strong>Césped para piscinas</strong> — Resistente al cloro y agua.</li>
</ul>`,
    category: "cesped-artificial",
    city: "Barcelona",
  },
  {
    slug: "cesped-artificial",
    title: "Césped Artificial — Catálogo Completo | Disstands",
    h1: "Césped artificial",
    description: "Catálogo completo de césped artificial. Paisajismo, eventos, deportivo y decorativo. Desde 5,95 €/m². Envío a toda España.",
    content: `<p>Descubre nuestro <strong>catálogo de césped artificial</strong>. Más de 30 referencias para paisajismo, eventos, deporte y decoración. Envío a toda España con instalación profesional opcional.</p>`,
    category: "cesped-artificial",
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
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-barcelona-disstands",
    title: "Instalación de Césped Artificial en Barcelona | Disstands",
    h1: "Instalación de césped artificial en Barcelona",
    description: "Servicio profesional de instalación de césped artificial en Barcelona. Jardines, terrazas y eventos.",
    content: `<p>Servicio profesional de <strong>instalación de césped artificial en Barcelona</strong>. Cubrimos toda el área metropolitana con montaje garantizado.</p>`,
    category: "cesped-artificial",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-sabadell-disstands",
    title: "Césped Artificial en Sabadell — Instalación | Disstands",
    h1: "Césped artificial en Sabadell",
    description: "Instalación y venta de césped artificial en Sabadell. Jardines, terrazas y zonas comunitarias.",
    content: `<p><strong>Césped artificial en Sabadell</strong>. Instalación profesional para jardines, terrazas, áticos y zonas comunitarias del Vallès Occidental.</p>`,
    category: "cesped-artificial",
    city: "Sabadell",
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-lleida-disstands",
    title: "Césped Artificial en Lleida — Instalación | Disstands",
    h1: "Césped artificial en Lleida",
    description: "Venta e instalación de césped artificial en Lleida. Jardines, terrazas y zonas deportivas.",
    content: `<p><strong>Césped artificial en Lleida</strong>. Instalación profesional para jardines, terrazas, zonas deportivas y paisajismo en toda la provincia.</p>`,
    category: "cesped-artificial",
    city: "Lleida",
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-lleida-badalona",
    title: "Césped Artificial en Badalona — Instalación | Disstands",
    h1: "Césped artificial en Badalona",
    description: "Instalación y venta de césped artificial en Badalona. Jardines, terrazas y eventos.",
    content: `<p><strong>Césped artificial en Badalona</strong>. Instalación profesional con entrega rápida desde Barcelona.</p>`,
    category: "cesped-artificial",
    city: "Badalona",
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-gracia",
    title: "Césped Artificial en Gràcia, Barcelona — Instalación | Disstands",
    h1: "Césped artificial en Gràcia, Barcelona",
    description: "Instalación de césped artificial en Gràcia, Barcelona. Terrazas, áticos y jardines.",
    content: `<p><strong>Césped artificial en Gràcia, Barcelona</strong>. Soluciones para terrazas, áticos y pequeños jardines del barrio.</p>`,
    category: "cesped-artificial",
    city: "Barcelona",
  },
  {
    slug: "instalacion-y-venta-de-cesped-artificial-en-hospitalet-de-llobregat-disstands",
    title: "Césped Artificial en L'Hospitalet — Instalación | Disstands",
    h1: "Césped artificial en L'Hospitalet de Llobregat",
    description: "Instalación de césped artificial en L'Hospitalet de Llobregat. Jardines, terrazas y zonas comunitarias.",
    content: `<p><strong>Césped artificial en L'Hospitalet</strong>. Instalación profesional para jardines, terrazas y zonas comunitarias.</p>`,
    category: "cesped-artificial",
    city: "L'Hospitalet de Llobregat",
  },

  // ========================================
  // SUELOS PVC / VINÍLICOS
  // ========================================
  {
    slug: "suelo-vinilico",
    title: "Suelo Vinílico — Catálogo y Precios | Disstands",
    h1: "Suelo vinílico",
    description: "Catálogo de suelos vinílicos PVC. Heterogéneo, homogéneo, click y losetas. Para comercios, oficinas y hospitality. Desde 8,50 €/m².",
    content: `<p>Descubre nuestro catálogo de <strong>suelos vinílicos</strong>. Soluciones PVC para comercios, oficinas, hospitales y espacios de alto tráfico. Múltiples diseños y acabados.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "suelo-pvc-locales-comerciales",
    title: "Suelo PVC para Locales Comerciales | Disstands",
    h1: "Suelo PVC para locales comerciales",
    description: "Suelo PVC para locales comerciales. Resistente al tráfico intenso, fácil mantenimiento. Desde 8,50 €/m².",
    content: `<p><strong>Suelo PVC para locales comerciales</strong>. Pavimentos vinílicos de alto rendimiento, resistentes al tráfico intenso, fáciles de limpiar y con múltiples diseños decorativos.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "suelo-pvc-vinilico-barcelona",
    title: "Suelo PVC Vinílico en Barcelona — Instalación | Disstands",
    h1: "Suelo PVC vinílico en Barcelona",
    description: "Instalación de suelo PVC vinílico en Barcelona. Comercios, oficinas, hospitales y viviendas.",
    content: `<p><strong>Suelo PVC vinílico en Barcelona</strong>. Instalación profesional de pavimentos vinílicos para comercios, oficinas, hospitales y viviendas.</p>`,
    category: "suelo-pvc",
    city: "Barcelona",
  },
  {
    slug: "suelo-vinilico-clinicas-consultas-medicas",
    title: "Suelo Vinílico para Clínicas y Consultas Médicas | Disstands",
    h1: "Suelo vinílico para clínicas y consultas médicas",
    description: "Suelo vinílico antibacteriano para clínicas y consultas médicas. Certificado para uso sanitario.",
    content: `<p><strong>Suelo vinílico para clínicas</strong> y consultas médicas. Pavimentos antibacterianos con certificación para uso sanitario, fáciles de limpiar y desinfectar.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "suelo-vinilico-hospitales",
    title: "Suelo Vinílico para Hospitales — Antibacteriano | Disstands",
    h1: "Suelo vinílico para hospitales",
    description: "Suelo vinílico antibacteriano homogéneo para hospitales y centros sanitarios. Certificado EN ISO.",
    content: `<p><strong>Suelo vinílico para hospitales</strong>. Pavimentos homogéneos antibacterianos certificados para uso sanitario. Resistentes a productos químicos y fáciles de mantener.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "suelo-imitacion-madera",
    title: "Suelo Vinílico Imitación Madera — PVC Efecto Madera | Disstands",
    h1: "Suelo vinílico imitación madera",
    description: "Suelo vinílico con efecto madera. La calidez de la madera con la resistencia del PVC. Múltiples acabados.",
    content: `<p><strong>Suelo vinílico imitación madera</strong>. Disfruta de la calidez y estética de la madera con la resistencia, impermeabilidad y facilidad de mantenimiento del PVC.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "suelo-laminado-o-vinilico-cual-es-mas-barato",
    title: "Suelo Laminado o Vinílico: ¿Cuál es más Barato? | Disstands",
    h1: "Suelo laminado o vinílico: ¿cuál es más barato?",
    description: "Comparativa entre suelo laminado y vinílico. Precios, ventajas e inconvenientes de cada opción.",
    content: `<p>Comparativa completa entre <strong>suelo laminado y suelo vinílico</strong>. Analizamos precios, durabilidad, resistencia al agua, instalación y mantenimiento para ayudarte a elegir.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "linoleo-vs-pvc-diferencias-cual-es-mejor",
    title: "Linóleo vs PVC: Diferencias y Cuál es Mejor | Disstands",
    h1: "Linóleo vs PVC: diferencias y cuál es mejor",
    description: "Comparativa entre linóleo y PVC. Diferencias en composición, precio, durabilidad y aplicaciones.",
    content: `<p>Descubre las <strong>diferencias entre linóleo y PVC</strong>. Composición, precio, durabilidad, aplicaciones y cuál es mejor para cada tipo de espacio.</p>`,
    category: "suelo-pvc",
  },
  {
    slug: "preparacion-suelos",
    title: "Preparación de Suelos para Instalación | Disstands",
    h1: "Preparación de suelos para instalación",
    description: "Guía de preparación de suelos antes de instalar moqueta, PVC o césped artificial. Autonivelantes y productos.",
    content: `<p>Guía completa de <strong>preparación de suelos</strong> antes de la instalación de moquetas, PVC, césped artificial y otros pavimentos. Incluye información sobre autonivelantes, imprimaciones y técnicas.</p>`,
    category: "general",
  },
  {
    slug: "proteccion-suelos-obras",
    title: "Protección de Suelos en Obras | Disstands",
    h1: "Protección de suelos en obras",
    description: "Materiales para protección de suelos en obras y reformas. Fieltro, film, moqueta protectora.",
    content: `<p>Materiales para la <strong>protección de suelos en obras</strong> y reformas: fieltro sintético, film de polietileno, moqueta protectora y cartón. Protege tus suelos durante el proceso constructivo.</p>`,
    category: "general",
  },
  {
    slug: "pasta-autonivelante",
    title: "Pasta Autonivelante — Preparación de Suelos | Disstands",
    h1: "Pasta autonivelante",
    description: "Pasta autonivelante para preparación de suelos. Secado rápido y alta resistencia. Para interiores.",
    content: `<p><strong>Pasta autonivelante</strong> para preparación de suelos antes de la instalación de moqueta, PVC o parquet. Productos de secado rápido y alta resistencia.</p>`,
    category: "general",
  },
  {
    slug: "alfombra-a-medida-barcelona",
    title: "Alfombra a Medida en Barcelona | Disstands",
    h1: "Alfombra a medida en Barcelona",
    description: "Alfombras a medida en Barcelona. Fabricación personalizada en cualquier tamaño, color y material.",
    content: `<p><strong>Alfombras a medida en Barcelona</strong>. Fabricamos alfombras personalizadas en cualquier tamaño, color y material. Servicio de corte profesional y confección a medida.</p>`,
    category: "moquetas",
    city: "Barcelona",
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
  },
  {
    slug: "instalacion-suelos-gimnasios-barcelona",
    title: "Instalación de Suelos para Gimnasios en Barcelona | Disstands",
    h1: "Instalación de suelos para gimnasios en Barcelona",
    description: "Instalación profesional de suelos para gimnasios en Barcelona. Caucho, EPDM, puzzle y tatami.",
    content: `<p><strong>Instalación de suelos para gimnasios en Barcelona</strong>. Caucho deportivo, losetas EPDM, puzzle de goma y tatami para centros de fitness, crossfit y artes marciales.</p>`,
    category: "general",
    city: "Barcelona",
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
  },
];

export function getSeoLandingBySlug(slug: string): SeoLanding | undefined {
  return seoLandings.find((l) => l.slug === slug);
}

export function getAllSeoLandingSlugs(): string[] {
  return seoLandings.map((l) => l.slug);
}
