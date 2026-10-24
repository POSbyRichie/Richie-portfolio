import type { Project } from "./types";

export interface PortfolioProject extends Project {
  problem?: string;
  solution?: string;
  highlights: string[];
  impact_stat?: string;
  role?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  category: "development" | "systems" | "education";
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  focus: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  projectType: string;
  quote: string;
  initials: string;
  rating: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: {
    name: string;
    description: string;
    deliverables: string[];
  }[];
}

export const PROFILE_DATA = {
  name: "Malish Richard",
  brand: "RICHIE DIGITAL SOLUTIONS",
  handle: "CodeWithRichie",
  domain: "https://www.codewithrichie.online",
  location: "Kampala, Uganda",
  availability: "Available for Full-Stack, Web & Software Projects",
  headline: "Full-Stack Developer & Digital Solutions Specialist",
  rotatingRoles: [
    "Full-Stack Developer",
    "Web & App Developer",
    "POS & Business Systems Builder",
    "AI Engineering Student",
    "Digital Solutions Specialist",
  ],
  heroSummary:
    "Founder of Richie Digital Solutions (CodeWithRichie). I design and engineer reliable full-stack web applications, point-of-sale and business management software, institutional portals, and e-commerce platforms for organizations across Uganda and beyond.",
  shortBio:
    "I am a multi-skilled technology professional based in Kampala, Uganda, pursuing a degree in AI Engineering while building production web platforms, business software, and IT infrastructure through Richie Digital Solutions.",
  aboutParagraphs: [
    "I'm Malish Richard — the developer and technical architect behind Richie Digital Solutions (CodeWithRichie). Based in Kampala, Uganda, I specialize in turning complex organizational and commercial requirements into fast, accessible, and maintainable digital products.",
    "Over the past 3+ years, I have designed, built, and deployed more than 35 websites, web applications, and digital systems for NGOs, educational institutions, real estate firms, retail businesses, and corporate consultancies. My work spans custom React and Next.js applications, Point-of-Sale (POS) software, multi-vendor e-commerce stores, and content management portals.",
    "Alongside software engineering, I provide hands-on systems administration, database management (PostgreSQL, MySQL, MongoDB, Supabase), enterprise LAN/WAN network configuration, and brand identity design — giving clients a single, dependable technical partner from concept to deployment.",
    "Currently pursuing my degree in AI Engineering, I continuously integrate modern full-stack patterns, cloud infrastructure, and intelligent automation into the solutions I build.",
  ],
  contact: {
    phone: "+256 775 838 145",
    phoneRaw: "+256775838145",
    whatsappUrl:
      "https://wa.me/256775838145?text=Hi%20Malish%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project",
    primaryEmail: "malisrichard@icloud.com",
    businessEmail: "contact@codewithrichie.online",
    location: "Kampala, Uganda (Remote & On-Site)",
    responseWindow: "Responds within 1 hour · 24/7 Client Support",
  },
  socials: {
    github: "https://github.com/POSbyRichie",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/256775838145",
  },
  resumeUrl: "/Malish_Richard_Resume.pdf",
  stats: [
    { value: "35+", label: "Projects Delivered", detail: "Websites, web apps, POS & portals" },
    { value: "30+", label: "Clients Served", detail: "NGOs, schools, startups & enterprises" },
    { value: "3+", label: "Years Experience", detail: "Full-stack development & IT systems" },
    { value: "7", label: "Certifications", detail: "Cloud, full-stack & frontend engineering" },
  ],
};

export const VERIFIED_PROJECTS: PortfolioProject[] = [
  {
    id: "pos-by-richie",
    title: "POS by Richie (RichiePOS Suite)",
    slug: "pos-by-richie",
    short_description:
      "A full-featured Point of Sale (POS) and business management system engineered to track inventory, sales, expenses, and print thermal receipts in real time.",
    full_description:
      "POS by Richie is a commercial Point of Sale and business operations platform built for retail shops, supermarkets, pharmacies, and service businesses.\n\nIt streamlines daily checkout operations with barcode and quick-item search, automated stock deduction, low-stock alerts, daily/monthly expense tracking, multi-user cashier roles, and instant receipt generation.",
    problem:
      "Local retail and service businesses struggled with manual ledger books, stock discrepancies, slow checkout calculations, and lack of real-time visibility into daily profit and expenses.",
    solution:
      "Engineered a responsive web-based POS suite with Next.js, React, Node.js, and MongoDB featuring instant cart calculation, printable receipts, inventory lifecycle tracking, and role-based financial reporting.",
    highlights: [
      "Real-time sales checkout workflow with instant thermal receipt formatting and printing",
      "Automated inventory tracking, stock-level alerts, and daily expense reconciliation",
      "Multi-device dashboard built with Next.js, React, Node.js, and MongoDB deployed on Vercel",
    ],
    impact_stat: "Live commercial POS SaaS",
    role: "Lead Full-Stack Developer",
    category: "Tools / SaaS",
    client: "Richie Digital Solutions",
    completion_date: "2026-08-07",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791376466188-kwf64ifmm3b.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791376477622-45ebgq0x2aj.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791376478331-1h4ncmqox2l.jpeg",
    ],
    live_url: "https://posbyrichie.online",
    github_url: "https://github.com/POSbyRichie/POS",
    status: "published",
    featured: true,
    sort_order: 0,
    created_at: "2026-10-07T12:35:52.172615+00:00",
    updated_at: "2026-10-07T12:35:51.709+00:00",
  },
  {
    id: "igrao-africa",
    title: "IGRAO Africa",
    slug: "igrao-africa",
    short_description:
      "A comprehensive institutional website for IGRAO Africa, a refugee-led NGO — showcasing humanitarian programs, impact stories, partnerships, and donor pathways.",
    full_description:
      "Developed a feature-rich, accessible web presence for IGRAO Africa, a Refugee-Led Organization (RLO) and NGO operating in the Kyangwali Refugee Settlement.\n\nKey Features:\n• Program Showcases: Dedicated sections highlighting educational sponsorships, aquaculture fish farming, and tree-planting initiatives.\n• Impact Transparency: Real-time updates, field dispatches, and community stories.\n• Donation & Engagement: Seamless pathways for global partners and donors to connect with grassroots leaders.",
    problem:
      "IGRAO Africa needed a credible, internationally accessible digital platform to document field programs in Kyangwali Refugee Settlement and connect transparently with global donors and humanitarian partners.",
    solution:
      "Designed and deployed a structured, mobile-optimized NGO platform featuring program breakdowns, field photo galleries, impact metrics, and direct donor engagement workflows.",
    highlights: [
      "Dedicated program hubs for education sponsorships, aquaculture, and environmental restoration",
      "Impact storytelling and field dispatch publishing system for international donor transparency",
      "Optimized for fast loading across low-bandwidth mobile connections in East Africa",
    ],
    impact_stat: "Pan-African & global donor reach",
    role: "Full-Stack Web Developer",
    category: "NGO Website",
    client: "IGRAO Africa",
    completion_date: "2026-10-07",
    technologies: ["React", "Next.js", "Tailwind CSS", "WordPress", "JavaScript", "CSS"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791366141604-znp3nl86zl.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791366201180-xmt30ccrs.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791366205264-mtlccfevr48.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791366206144-dwxk5zs2z87.jpeg",
    ],
    live_url: "https://www.igrao-africa.org",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 1,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T09:44:24.433724+00:00",
  },
  {
    id: "bsf-mixed-ventures",
    title: "BSF Mixed Ventures Ltd",
    slug: "bsf-mixed-ventures",
    short_description:
      "A modern corporate & social-enterprise web platform for BSF Mixed Ventures Ltd showcasing circular agribusiness innovation, products, and partner impact.",
    full_description:
      "Developed a responsive, modern corporate website for BSF Mixed Ventures Limited (BMV), a refugee youth-led social enterprise in Kyangwali Refugee Settlement, Uganda. The platform showcases their circular agribusiness model, which transforms organic waste into high-value animal feed and organic fertilizer using Black Soldier Fly (BSF) innovation.\n\nKey Challenges & Solutions:\n• Clear Value Communication: Built a clean, structured information architecture with dedicated sections for products, services, community training, and impact metrics.\n• Engagement & Outreach: Integrated responsive contact workflows, partner inquiry channels, and interactive navigation.\n\nImpact & Results:\nElevated the digital presence of the enterprise, boosting visibility to international partners including CARE International.",
    problem:
      "BSF Mixed Ventures needed to clearly communicate their Black Soldier Fly bioconversion agribusiness model and community impact to international grantmakers, NGOs, and agricultural buyers.",
    solution:
      "Built a custom corporate platform with structured product catalogs, circular-economy process visualizations, impact metrics, and partner inquiry funnels.",
    highlights: [
      "Structured presentation of Black Soldier Fly circular agribusiness products & farmer training",
      "Interactive impact metrics and partner outreach workflows supporting international visibility",
      "Responsive layout engineered with React, Next.js, TypeScript, and Tailwind CSS",
    ],
    impact_stat: "↑ 40% partner & client inquiries",
    role: "Full-Stack Developer & UI Designer",
    category: "Business Website",
    client: "BSF Mixed Ventures Limited",
    completion_date: "2026-03-20",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791365371720-2i26y3qekjm.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791365398067-rh1e84g6cgj.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791365399106-ncq2a7se45c.png",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791365400576-z4s4o750cvg.jpeg",
    ],
    live_url: "https://bsfmixedventuresltd.org/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 2,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T09:37:15.460313+00:00",
  },
  {
    id: "qr-by-richie",
    title: "QR By Richie",
    slug: "qr-by-richie",
    short_description:
      "A fast, browser-based QR code generation SaaS utility — create, customize, and download high-resolution QR codes for URLs, contacts, Wi-Fi, and business profiles.",
    full_description:
      "QR By Richie is a lightweight web application designed for businesses, event organizers, and individuals who need instant, customizable QR codes without watermarks or subscription paywalls.\n\nUsers can generate QR codes for website URLs, vCard contact details, WhatsApp links, and text, preview them in real time, and export crisp PNG/SVG assets for print or digital branding.",
    problem:
      "Small businesses and print designers frequently encountered QR generators that locked downloads behind paid trials or broke links after expiration.",
    solution:
      "Built a clean, instant QR generation web app using React, TypeScript, Vite, and Supabase that produces permanent, direct-encoded QR graphics ready for print and digital use.",
    highlights: [
      "Instant client-side QR rendering for URLs, business cards, and contact links",
      "High-contrast, print-ready export workflow with zero link expiration",
      "Engineered with React, TypeScript, Next.js/Vite, and Supabase",
    ],
    impact_stat: "Live SaaS utility in active use",
    role: "Creator & Full-Stack Developer",
    category: "Tools / SaaS",
    client: "Richie Digital Solutions",
    completion_date: "2026-07-07",
    technologies: ["React", "TypeScript", "Vite", "Next.js", "Supabase", "Tailwind CSS"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791372111585-mwfhyijgwbr.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791372116655-1mr206ebjqk.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791372117150-488dnz0mv2j.jpeg",
    ],
    live_url: "https://qrbyrichie.online/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 3,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T11:22:59.362289+00:00",
  },
  {
    id: "chanong-homes",
    title: "Chanong Homes",
    slug: "chanong-homes",
    short_description:
      "A modern real estate listings platform for Chanong Homes featuring searchable property catalogs, visual galleries, and client inquiry management.",
    full_description:
      "Chanong Homes is a real estate showcase and lead-capture platform built to connect property buyers and tenants with verified residential and commercial listings.\n\nThe platform features categorized property cards, multi-photo galleries, location details, pricing breakdowns, and direct agent inquiry forms.",
    problem:
      "Prospective home buyers had difficulty browsing available properties and scheduling viewings through scattered social media posts.",
    solution:
      "Developed a centralized real estate portal with structured property filtering, high-resolution photo galleries, and direct WhatsApp/email inquiry routing.",
    highlights: [
      "Searchable property catalog with multi-image galleries and specification breakdowns",
      "Direct buyer-to-agent inquiry capture increasing qualified property leads by 60%",
      "Team training and CMS configuration for effortless property listing updates",
    ],
    impact_stat: "↑ 60% client property inquiries",
    role: "Lead Web Developer",
    category: "Real Estate",
    client: "Chanong Homes",
    completion_date: "2026-03-07",
    technologies: ["React", "Next.js", "WordPress", "Node.js", "HTML", "CSS"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791372333870-ou302b0v12o.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791372342497-9nmlf5hqeow.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791372343294-v80inkx39aa.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791372343979-vw5xzo753g.jpeg",
    ],
    live_url: "https://chanonghomes.com/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 4,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T11:26:57.959935+00:00",
  },
  {
    id: "sellconnect-uganda",
    title: "SellConnect Uganda",
    slug: "sellconnect-uganda",
    short_description:
      "A dynamic multi-vendor online marketplace connecting Ugandan merchants and buyers with product listings, vendor storefronts, and checkout workflows.",
    full_description:
      "SellConnect Uganda is a multi-category digital marketplace designed to empower local Ugandan merchants to list products online and reach customers nationwide.\n\nPowered by React, Supabase, PostgreSQL, and Node.js, the platform supports categorized product discovery, seller profiles, customer inquiries, and mobile-friendly ordering.",
    problem:
      "Local merchants in Uganda lacked an affordable, unified digital marketplace to showcase inventory and connect with mobile-first buyers.",
    solution:
      "Engineered a scalable marketplace platform backed by Supabase and PostgreSQL with fast category browsing, vendor listings, and mobile checkout integration.",
    highlights: [
      "Multi-vendor product catalog supporting 1,200+ active listings across categories",
      "Backed by Supabase and PostgreSQL for real-time listing management and search",
      "Mobile-first responsive interface tailored for Ugandan shoppers",
    ],
    impact_stat: "1,200+ active marketplace listings",
    role: "Full-Stack Engineer",
    category: "E-Commerce",
    client: "SellConnect Uganda",
    completion_date: "2024-08-15",
    technologies: ["React", "Supabase", "PostgreSQL", "Node.js", "JavaScript", "CSS"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791396119311-zdnelyq8fmg.jpeg",
    gallery_images: [],
    live_url: "https://sellconnectug.com/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 5,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T18:02:45.284865+00:00",
  },
  {
    id: "monae-store",
    title: "Monae Store",
    slug: "monae-store",
    short_description:
      "A modern e-commerce fashion storefront featuring a complete product catalog, shopping cart, checkout flow, and mobile money payment integration.",
    full_description:
      "Monae Store is an online fashion and lifestyle retail platform built to convert social media browsers into direct online customers.\n\nIt features collections filtering, product variant selection, cart management, and streamlined checkout integrated with local mobile money and card payment options.",
    problem:
      "The fashion brand was managing all orders manually via chat messages, leading to missed sales and inventory confusion.",
    solution:
      "Built a complete WooCommerce and React-enhanced storefront with automated order capture, inventory tracking, and mobile payment checkout.",
    highlights: [
      "Full product catalog with size/color variants, shopping cart, and streamlined checkout",
      "Integrated local mobile money and online payment pathways",
      "Helped grow online store sales by 85% within the first quarter after launch",
    ],
    impact_stat: "↑ 85% online retail sales",
    role: "E-Commerce Developer",
    category: "E-Commerce",
    client: "Monae Store",
    completion_date: "2025-07-10",
    technologies: ["WooCommerce", "WordPress", "React", "JavaScript", "Node.js", "CSS"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791395643031-fhk5yjbqs3b.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395651454-4btibelwwq5.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395652714-vusuxj7kjn.jpeg",
    ],
    live_url: "https://monaestore.com/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 6,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T17:55:03.536572+00:00",
  },
  {
    id: "african-ocean-consulting",
    title: "African Ocean Consulting",
    slug: "african-ocean-consulting",
    short_description:
      "A corporate consulting and importation firm website featuring service portfolios, executive profiles, SEO architecture, and client lead generation.",
    full_description:
      "Designed and developed a modern corporate web presence for African Ocean Consulting Company to showcase their advisory, logistics, and importation services.\n\nFocused on authority, clarity, search engine visibility, and high-converting consultation booking flows.",
    problem:
      "The firm's legacy web presence lacked clear service articulation and ranked poorly on search engines for regional consulting queries.",
    solution:
      "Redesigned the platform with semantic SEO structure, fast-loading service pages, team credentials, and direct consultation inquiry forms.",
    highlights: [
      " Corporate service architecture presenting importation, logistics, and advisory offerings",
      "Technical SEO optimization that tripled organic search traffic post-launch",
      "Built with React, Node.js, Tailwind CSS, and MySQL",
    ],
    impact_stat: "↑ 2× client lead conversions",
    role: "Full-Stack Web Developer",
    category: "Business Website",
    client: "African Ocean Consulting Company",
    completion_date: "2026-05-07",
    technologies: ["React", "Node.js", "Tailwind CSS", "MySQL", "HTML"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791395080435-p4ikzcjl1f.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395090590-wkc5pcjnnih.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395091434-bezmwsmbeq.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395092476-jvky5s76de.jpeg",
    ],
    live_url: "https://africanoceanconsulting.com/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 7,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T17:47:02.864257+00:00",
  },
  {
    id: "st-peters-high-school",
    title: "St. Peter's High School Hoima",
    slug: "st-peters-high-school",
    short_description:
      "A comprehensive academic portal for St. Peter's High School Hoima featuring admissions, academic programs, school news, and staff resources.",
    full_description:
      "Built an institutional school website for St. Peter's High School Hoima (my alma mater) serving over 2,000 students, parents, and faculty members.\n\nProvides clear access to O-Level and A-Level curriculum details, admission requirements, termly announcements, photo galleries, and administration contacts.",
    problem:
      "Parents and prospective students needed a reliable online portal to check admissions criteria, school news, and academic performance without traveling to the campus.",
    solution:
      "Delivered a structured, easy-to-update school portal with dedicated sections for academics, admissions, student life, and parent communication.",
    highlights: [
      "Serves 2,000+ students and parents with admissions, curriculum, and termly news updates",
      "Custom content management workflows allowing school administrators to publish notices easily",
      "Paired with on-site school computer lab and network configuration support",
    ],
    impact_stat: "2,000+ students & families served",
    role: "Web Developer & IT Consultant",
    category: "Education",
    client: "St. Peter's High School Hoima",
    completion_date: "2025-06-12",
    technologies: ["WordPress", "React", "Node.js", "JavaScript", "HTML"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791395778233-k5dduuijlqj.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395878453-8sq6ihf2gn7.jpeg",
    ],
    live_url: "https://stpetershighhoima.ac.ug/",
    github_url: null,
    status: "published",
    featured: false,
    sort_order: 8,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T17:59:02.178677+00:00",
  },
  {
    id: "mandelas-hoima",
    title: "Mandela Secondary School, Hoima",
    slug: "mandelas-hoima",
    short_description:
      "An institutional website for Mandela Secondary School Hoima showcasing academic departments, fee structures, campus galleries, and student updates.",
    full_description:
      "Developed the official institutional website for Mandela Secondary School in Hoima, providing prospective families and current students with transparent access to academic programs, fee structures, staff directories, and campus events.",
    problem:
      "The school needed a unified digital platform to publish fee structures, academic calendar updates, and campus life highlights for parents across the region.",
    solution:
      "Engineered a responsive institutional portal with structured academic pages, campus photo galleries, and parent communication channels.",
    highlights: [
      "Centralized hub for academic departments, fee structures, and termly circulars",
      "Dynamic campus photo gallery and staff directory for parent transparency",
      "Serves 1,500+ students, staff, and parents across Hoima and neighboring districts",
    ],
    impact_stat: "1,500+ students & parents reached",
    role: "Full-Stack Web Developer",
    category: "Education",
    client: "Mandela Secondary School, Hoima",
    completion_date: "2024-05-07",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "JavaScript", "HTML"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791395448660-3mwqnrir561.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395455426-7uxplerk7dm.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791395455929-n8jbgaxad6.jpeg",
    ],
    live_url: "https://www.mandelasshoima.ac.ug/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 9,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T17:51:58.885028+00:00",
  },
  {
    id: "light-junior-school",
    title: "Light Junior School",
    slug: "light-junior-school",
    short_description:
      "A vibrant, welcoming primary school website for Light Junior School featuring admissions, news updates, photo galleries, and parent resources.",
    full_description:
      "Created an engaging, parent-friendly website for Light Junior School to showcase early-childhood and primary education programs, co-curricular activities, admissions procedures, and school events.",
    problem:
      "Light Junior School wanted a warm, trustworthy digital presence to help young families explore the school's learning environment and apply for admission.",
    solution:
      "Designed a fast, mobile-responsive school website with clear admissions steps, event galleries, and instant parent inquiry buttons.",
    highlights: [
      "Parent-focused navigation covering admissions, nursery & primary programs, and school events",
      "Responsive photo galleries and news publishing for 500+ enrolled families",
      "Built with WordPress, React components, and TypeScript",
    ],
    impact_stat: "500+ enrolled families supported",
    role: "Web Designer & Developer",
    category: "Education",
    client: "Light Junior School",
    completion_date: "2025-06-20",
    technologies: ["WordPress", "React", "TypeScript", "JavaScript", "Node.js"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791396305599-xrsx84n6tkd.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791396312072-0ktuaud2rse.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791396312799-tvvfch4omll.jpeg",
    ],
    live_url: "https://lightjuniorschool.com/",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 10,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-10-07T18:05:55.614278+00:00",
  },
  {
    id: "abayo-rukemura-david-portfolio",
    title: "Abayo Rukemura David — Executive Portfolio",
    slug: "abayo-rukemura-david-portfolio",
    short_description:
      "A bespoke personal and executive portfolio website portraying professional leadership experience, academic background, and community initiatives.",
    full_description:
      "Designed and developed a clean, authoritative personal portfolio website for Abayo Rukemura David, presenting his professional career, educational milestones, publications, and leadership initiatives in an accessible digital format.",
    problem:
      "Needed a dedicated, verifiable personal domain to present executive credentials, career milestones, and contact channels to international colleagues and organizations.",
    solution:
      "Crafted a custom responsive portfolio with structured biography, timeline sections, media gallery, and direct contact integration.",
    highlights: [
      "Structured presentation of executive biography, work history, and educational background",
      "Custom domain deployment, responsive typography, and fast page load performance",
      "Built with React, JavaScript, Node.js, WordPress, and custom CSS",
    ],
    impact_stat: "Custom executive brand portal",
    role: "Web Designer & Developer",
    category: "Web Development",
    client: "Abayo Rukemura David",
    completion_date: "2026-10-01",
    technologies: ["React", "JavaScript", "Node.js", "WordPress", "HTML", "CSS"],
    featured_image:
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/featured/1791371844070-z6xe6d71ctl.jpeg",
    gallery_images: [
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791371857921-w6dohdj2rcj.jpeg",
      "https://ibjfqukameghludinpan.supabase.co/storage/v1/object/public/project-images/gallery/1791371859003-a19w94mcq3.jpeg",
    ],
    live_url: "https://abayorukemuradavid.online",
    github_url: null,
    status: "published",
    featured: true,
    sort_order: 11,
    created_at: "2026-10-07T11:20:23.582669+00:00",
    updated_at: "2026-10-07T11:20:10.845+00:00",
  },
  {
    id: "agakhan-schools-portal",
    title: "Aga Khan Schools — Institutional Web Experience",
    slug: "agakhan-schools",
    short_description:
      "Institutional education portal showcase featuring multi-campus academic information, admissions pathways, news updates, and student resources.",
    full_description:
      "An educational web showcase modeled for multi-campus academic institutions, highlighting structured navigation for admissions, curriculum levels, campus news, and alumni engagement.",
    highlights: [
      "Multi-campus academic navigation for admissions, news, and student resources",
      "Accessible typography and responsive layout across desktop, tablet, and mobile",
      "Structured CMS content architecture for educational institutions",
    ],
    impact_stat: "Multi-campus portal architecture",
    role: "Web Developer",
    category: "Education",
    client: "Institutional Education Showcase",
    completion_date: "2025-04-15",
    technologies: ["CMS", "React", "HTML", "CSS", "JavaScript"],
    featured_image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    gallery_images: [],
    live_url: "https://www.agakhanschools.org/",
    github_url: null,
    status: "published",
    featured: false,
    sort_order: 12,
    created_at: "2026-09-26T12:48:24.045551+00:00",
    updated_at: "2026-09-26T12:48:24.045551+00:00",
  },
  {
    id: "codewithrichie-portfolio",
    title: "CodeWithRichie — Developer Portfolio & CMS",
    slug: "codewithrichie-portfolio",
    short_description:
      "My personal developer portfolio and full-stack CMS platform featuring Supabase authentication, real-time project management, command palette search, and dual light/dark themes.",
    full_description:
      "CodeWithRichie (codewithrichie.online) is a full-stack portfolio and content management system built with React 18, TypeScript, Tailwind CSS v4, Motion, and Supabase.\n\nIt includes a protected administrative dashboard (/admin) with role-verified Supabase authentication, image bucket uploads, live project CRUD, interactive command palette (⌘K), and an integrated resume viewer.",
    problem:
      "Needed a fast, easily maintainable portfolio platform capable of publishing new client case studies and uploading project screenshots dynamically without code redeployments.",
    solution:
      "Engineered a React + TypeScript SPA integrated with Supabase PostgreSQL and Storage, complete with an authenticated admin CMS and refined editorial UI.",
    highlights: [
      "Full-stack Supabase CMS with role-verified admin authentication and cloud image uploads",
      "Command palette (⌘K), keyboard shortcuts (T for theme), and dual Light/Dark design system",
      "Deployed on Vercel with custom domain routing and automated builds",
    ],
    impact_stat: "Full-Stack React + Supabase CMS",
    role: "Founder & Full-Stack Engineer",
    category: "Full Stack Development",
    client: "Richie Digital Solutions",
    completion_date: "2026-10-24",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vite", "Vercel"],
    featured_image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    gallery_images: [],
    live_url: "https://www.codewithrichie.online/",
    github_url: "https://github.com/POSbyRichie",
    status: "published",
    featured: false,
    sort_order: 13,
    created_at: "2026-10-24T12:00:00.000000+00:00",
    updated_at: "2026-10-24T12:00:00.000000+00:00",
  },
];

// Enrich any live Supabase project with our verified highlights/problem/solution if missing in DB
export function enrichProject(p: Project): PortfolioProject {
  const match = VERIFIED_PROJECTS.find(
    (vp) =>
      vp.slug === p.slug ||
      vp.title.toLowerCase().trim() === p.title.toLowerCase().trim() ||
      (vp.live_url && p.live_url && vp.live_url.replace(/\/$/, "") === p.live_url.replace(/\/$/, ""))
  );

  const defaultHighlights = [
    `Designed and developed responsive ${p.category.toLowerCase()} architecture tailored for ${p.client || p.title}`,
    `Built with ${p.technologies.slice(0, 4).join(", ") || "modern web technologies"} for cross-device performance`,
    "Optimized user flows, accessibility, and search visibility for measurable client impact",
  ];

  // Add GitHub repo link for POS by Richie if empty in DB
  const githubUrl =
    p.github_url && p.github_url.trim() !== ""
      ? p.github_url
      : match?.github_url || null;

  return {
    ...p,
    github_url: githubUrl,
    full_description:
      p.full_description && p.full_description.trim() !== ""
        ? p.full_description
        : match?.full_description || p.short_description,
    problem: match?.problem,
    solution: match?.solution,
    highlights: match?.highlights || defaultHighlights,
    impact_stat: match?.impact_stat || "Production Deployment",
    role: match?.role || "Full-Stack Developer",
  };
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    shortLabel: "Frontend",
    description: "Building responsive, accessible, and interactive user interfaces with modern component architectures.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5 & Semantic Markup",
      "CSS3 / Responsive Design",
      "React Router",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    id: "backend",
    label: "Backend & Full-Stack",
    shortLabel: "Backend & APIs",
    description: "Engineering server-side logic, RESTful APIs, authentication, and business workflow systems.",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "Python",
      "Django",
      "RESTful APIs",
      "Authentication & RBAC",
      "POS & Billing Logic",
    ],
  },
  {
    id: "database",
    label: "Databases & Cloud",
    shortLabel: "Databases & Cloud",
    description: "Designing relational and document schemas, cloud storage buckets, and serverless deployments.",
    skills: [
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Vercel",
      "Netlify",
      "AWS",
      "Docker",
    ],
  },
  {
    id: "cms",
    label: "CMS & E-Commerce",
    shortLabel: "CMS & E-Commerce",
    description: "Delivering manageable institutional portals, online stores, and payment integrations.",
    skills: [
      "WordPress",
      "WooCommerce",
      "Custom Admin Dashboards",
      "Webflow",
      "Framer",
      "Mobile Money / Payment Gateways",
      "SEO Optimization",
    ],
  },
  {
    id: "systems",
    label: "Systems & IT Infrastructure",
    shortLabel: "Systems & IT",
    description: "Hands-on hardware, operating system, database administration, and enterprise networking.",
    skills: [
      "Windows & Linux OS Setup",
      "LAN / WAN Network Configuration",
      "WiFi Hotspot Billing Systems",
      "System Tuning & Optimization",
      "Database Administration",
      "Account & System Recovery",
      "Enterprise Software Setup",
    ],
  },
  {
    id: "design",
    label: "UI/UX, Graphics & AI Workflow",
    shortLabel: "Design & Tools",
    description: "Crafting brand identities, UI prototypes, and leveraging modern AI-assisted engineering tools.",
    skills: [
      "Figma",
      "Logo & Brand Identity Design",
      "Print & Marketing Collateral",
      "Canva",
      "Git & GitHub",
      "VS Code & Cursor",
      "Postman",
      "Claude Code & AI Tooling",
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "founder-richie-digital",
    title: "Founder & Lead Full-Stack Developer",
    organization: "Richie Digital Solutions (CodeWithRichie)",
    category: "development",
    period: "2023 — Present",
    location: "Kampala, Uganda · Remote",
    type: "Full-Stack Engineering & Digital Consultancy",
    description:
      "Lead end-to-end architecture, UI/UX design, full-stack development, and cloud deployment for 35+ client websites, web applications, and business software systems across East Africa.",
    highlights: [
      "Engineered and launched POS by Richie (posbyrichie.online) and QR By Richie (qrbyrichie.online), delivering commercial SaaS tools for retail checkout, inventory management, and instant QR generation.",
      "Designed and deployed full-featured web platforms for NGOs and corporate enterprises including IGRAO Africa, BSF Mixed Ventures Ltd, African Ocean Consulting, and Chanong Homes.",
      "Built multi-vendor and retail e-commerce platforms (SellConnect Uganda, Monae Store) with mobile money and online checkout workflows.",
      "Architected a custom Supabase-backed portfolio CMS with role-based authentication and cloud media management.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL", "MongoDB", "WordPress"],
    link: "https://www.codewithrichie.online",
  },
  {
    id: "edtech-institutional-portals",
    title: "Web Portal Developer & IT Systems Consultant",
    organization: "Educational Institutions & School Networks",
    category: "development",
    period: "2023 — Present",
    location: "Hoima & Kampala, Uganda",
    type: "Institutional Web Portals & Campus IT",
    description:
      "Partnered with secondary and primary schools to modernize their digital presence, admissions workflows, parent communication portals, and campus computer lab infrastructure.",
    highlights: [
      "Developed and launched official academic portals for St. Peter's High School Hoima (2,000+ students), Mandela Secondary School Hoima (1,500+ students), and Light Junior School (500+ families).",
      "Trained school administrative staff on content management systems so notices, fee structures, and academic circulars can be updated in-house.",
      "Configured school computer laboratories, LAN/WAN networking, OS installations, and local software environments.",
    ],
    technologies: ["React", "WordPress", "Node.js", "PostgreSQL", "LAN/WAN Networking", "Linux & Windows Admin"],
  },
  {
    id: "systems-brand-specialist",
    title: "Systems Administrator & Brand Design Specialist",
    organization: "Freelance & SME Technical Services",
    category: "systems",
    period: "2022 — Present",
    location: "Kampala, Uganda",
    type: "IT Infrastructure, Databases & Visual Identity",
    description:
      "Provide comprehensive technical support, database administration, WiFi billing deployments, and brand design for growing businesses and organizations.",
    highlights: [
      "Installed and optimized Windows/Linux operating systems, business software suites, and relational databases (MySQL, PostgreSQL, MongoDB).",
      "Configured automated WiFi hotspot billing systems and office network infrastructure for local businesses.",
      "Created cohesive brand identities including logos, corporate brochures, business cards, flyers, and digital marketing assets.",
    ],
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Network Configuration", "WiFi Billing", "Figma", "Brand Identity"],
  },
  {
    id: "ai-engineering-student",
    title: "Undergraduate Student — AI Engineering",
    organization: "AI Engineering Degree Program",
    category: "education",
    period: "2024 — Present",
    location: "Uganda",
    type: "Academic & Applied Research",
    description:
      "Pursuing undergraduate studies in Artificial Intelligence Engineering, focusing on software engineering foundations, data structures, machine learning systems, and intelligent application development.",
    highlights: [
      "Applying modern AI-assisted software workflows, prompt engineering, and full-stack architecture to real-world Ugandan business challenges.",
      "Completed 7 industry professional certifications across Google Cloud, AWS, Microsoft Azure, Meta Front-End/React, IBM Full-Stack, and Tailwind CSS.",
    ],
    technologies: ["Python", "TypeScript", "AI Engineering", "Cloud Architecture", "Full-Stack Development"],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "ai-engineering",
    degree: "Bachelor's Degree in AI Engineering",
    institution: "University Studies — AI Engineering Program",
    location: "Uganda",
    period: "Currently Pursuing",
    status: "In Progress",
    description:
      "Focused on Artificial Intelligence Engineering, software systems architecture, algorithms, database engineering, and modern full-stack application development.",
    highlights: [
      "Combining academic AI & computer science foundations with commercial software delivery through Richie Digital Solutions",
      "Active focus on intelligent web applications, cloud infrastructure, and practical automation",
    ],
  },
  {
    id: "a-level",
    degree: "Uganda Advanced Certificate of Education (A-Level)",
    institution: "St. Peter's High School, Hoima",
    location: "Hoima, Uganda",
    period: "Completed 2024",
    status: "Completed",
    description:
      "Advanced secondary education with strong analytical and technical grounding; later selected to build and maintain the school's official institutional website.",
    highlights: [
      "Developed the official St. Peter's High School Hoima web portal (stpetershighhoima.ac.ug) serving 2,000+ students",
    ],
  },
  {
    id: "o-level",
    degree: "Uganda Certificate of Education (O-Level)",
    institution: "St. Peter's High School, Hoima",
    location: "Hoima, Uganda",
    period: "Completed 2022",
    status: "Completed",
    description:
      "Completed Ordinary Level secondary education with distinction in sciences, mathematics, and computer studies.",
    highlights: [
      "Built foundational skills in computing, problem-solving, and digital systems",
    ],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "gcp-dev",
    title: "Google Cloud Professional Developer",
    issuer: "Google",
    year: "2025",
    category: "Cloud & Infrastructure",
    focus: "Cloud-native application development, scalable deployment, and managed services",
  },
  {
    id: "react-advanced",
    title: "React Advanced Developer Certification",
    issuer: "Meta",
    year: "2025",
    category: "Frontend Engineering",
    focus: "Advanced React patterns, hooks, state management, and performance optimization",
  },
  {
    id: "aws-sa",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
    category: "Cloud & Infrastructure",
    focus: "Distributed system design, cloud security, storage, and resilient architecture",
  },
  {
    id: "azure-dev",
    title: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    year: "2024",
    category: "Cloud & Infrastructure",
    focus: "Cloud solutions, API integration, authentication, and service deployment",
  },
  {
    id: "ibm-fullstack",
    title: "IBM Full Stack Software Developer",
    issuer: "IBM",
    year: "2024",
    category: "Full-Stack Engineering",
    focus: "Frontend, backend APIs, relational/NoSQL databases, and containerized deployment",
  },
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer Professional",
    issuer: "Meta",
    year: "2024",
    category: "Frontend Engineering",
    focus: "Responsive UI engineering, accessibility, modern JavaScript, and UX principles",
  },
  {
    id: "tailwind-expert",
    title: "Tailwind CSS Expert Certification",
    issuer: "Tailwind Labs",
    year: "2024",
    category: "UI & Design Systems",
    focus: "Utility-first design systems, dark mode architecture, and responsive component tokens",
  },
];

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: "web",
    title: "Web Design & Full-Stack Development",
    subtitle: "Custom websites, web apps, and institutional portals",
    description:
      "Modern, responsive, and SEO-ready web platforms engineered with React, Next.js, TypeScript, Tailwind CSS, and WordPress.",
    items: [
      {
        name: "School & Institutional Portals",
        description: "Comprehensive portals for schools, colleges, and universities with admissions, news, fee structures, and parent resources.",
        deliverables: ["Admissions workflows", "Staff & academic directories", "Admin CMS training"],
      },
      {
        name: "E-Commerce & Online Marketplaces",
        description: "Full-featured online stores and multi-vendor platforms with product catalogs, carts, and mobile money/card payment integration.",
        deliverables: ["Product & inventory catalog", "Mobile Money & card checkout", "Order management dashboard"],
      },
      {
        name: "Corporate, NGO & Consulting Websites",
        description: "High-credibility websites for NGOs, consultancies, and businesses to showcase programs, impact, and generate leads.",
        deliverables: ["Custom responsive UI", "Donation & lead capture forms", "Technical SEO setup"],
      },
      {
        name: "Real Estate & Booking Platforms",
        description: "Searchable property listing portals and travel/hospitality sites with photo galleries and direct client inquiry routing.",
        deliverables: ["Property filtering & search", "Interactive image galleries", "WhatsApp & email lead routing"],
      },
      {
        name: "Executive & Developer Portfolios",
        description: "Polished personal brand websites and resumes designed to attract global employers, partners, and clients.",
        deliverables: ["Custom domain setup", "Case study showcase", "Downloadable resume integration"],
      },
      {
        name: "POS & Custom SaaS Web Applications",
        description: "Tailored business web software including Point-of-Sale (POS) suites, financial dashboards, and WiFi hotspot billing systems.",
        deliverables: ["Real-time sales & expense tracking", "Receipt printing & reporting", "Role-based access control"],
      },
    ],
  },
  {
    id: "systems",
    title: "Systems, Databases & IT Infrastructure",
    subtitle: "Reliable software setup, database admin, and networking",
    description:
      "End-to-end systems configuration, database management, and network engineering for schools, offices, and enterprises.",
    items: [
      {
        name: "Database Design & Administration",
        description: "Setup, schema modeling, backups, and performance tuning for PostgreSQL, MySQL, MongoDB, and Supabase.",
        deliverables: ["Schema & RLS security", "Backup & recovery setup", "Query optimization"],
      },
      {
        name: "Network & WiFi Billing Configuration",
        description: "LAN/WAN office networking, school computer lab setup, and automated WiFi hotspot billing systems.",
        deliverables: ["LAN/WAN router setup", "Hotspot voucher billing", "Network troubleshooting"],
      },
      {
        name: "OS & Enterprise Software Installation",
        description: "Clean Windows and Linux installations, system tuning, driver configuration, and business software deployment.",
        deliverables: ["Windows & Linux setup", "Business software configuration", "System performance tuning"],
      },
      {
        name: "System Security & Account Recovery",
        description: "Authorized system password recovery, data backup protection, and workstation maintenance.",
        deliverables: ["Account & OS recovery", "Data backup verification", "Security hardening"],
      },
    ],
  },
  {
    id: "graphics",
    title: "Brand Identity & Graphic Design",
    subtitle: "Cohesive visual branding for print and digital media",
    description:
      "Memorable visual identities and marketing materials that communicate professionalism across every touchpoint.",
    items: [
      {
        name: "Logo & Visual Identity Systems",
        description: "Distinctive logos, color palettes, and typography guidelines tailored to your organization.",
        deliverables: ["High-res vector & PNG files", "Brand color tokens", "Social media profile kit"],
      },
      {
        name: "Corporate Brochures & Company Profiles",
        description: "Structured print and PDF brochures, catalogs, and organizational profiles for investors and clients.",
        deliverables: ["Print-ready PDF layouts", "Digital presentation decks", "Custom infographics"],
      },
      {
        name: "Marketing Flyers, Business Cards & Covers",
        description: "Sleek business cards, promotional flyers, event invitations, stickers, and e-book covers.",
        deliverables: ["Business cards & stationery", "Event & campaign flyers", "E-book & publication covers"],
      },
    ],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "namugisha-grace",
    name: "Namugisha Grace",
    role: "Head Teacher",
    organization: "St. Peter's High School Hoima",
    projectType: "Institutional School Website",
    quote:
      "Malish delivered our school website on time and beyond our expectations. The site is clean, easy to update, and has significantly improved how parents engage with us. Always available even late at night.",
    initials: "NG",
    rating: 5,
  },
  {
    id: "byamugisha-ronald",
    name: "Byamugisha Ronald",
    role: "Managing Director",
    organization: "BSF Mixed Ventures Ltd",
    projectType: "Corporate & Social Enterprise Platform",
    quote:
      "I needed a professional corporate website urgently for a meeting with investors. Malish had it ready in just 5 days. It looks world-class — our investors were genuinely impressed.",
    initials: "BR",
    rating: 5,
  },
  {
    id: "nakitende-josephine",
    name: "Nakitende Josephine",
    role: "Operations Manager",
    organization: "Chanong Homes",
    projectType: "Real Estate Listings Platform",
    quote:
      "We've worked with several developers but Malish stands out. He understood our real estate needs, built a beautiful listings platform, and even trained our team to manage it.",
    initials: "NJ",
    rating: 5,
  },
  {
    id: "tumusiime-david",
    name: "Tumusiime David",
    role: "Chief Executive Officer",
    organization: "African Ocean Consulting",
    projectType: "Corporate Website & SEO",
    quote:
      "Our consulting firm's website needed a complete overhaul. Malish redesigned it with a fresh, professional look. Our Google traffic has tripled since launch. Exceptional value.",
    initials: "TD",
    rating: 5,
  },
  {
    id: "akello-miriam",
    name: "Akello Miriam",
    role: "Founder",
    organization: "Monae Store",
    projectType: "E-Commerce Store & Payments",
    quote:
      "Malish built my e-commerce store and it genuinely changed my business. Orders started coming in within the first week. He integrated mobile money payments seamlessly — fast and very patient!",
    initials: "AM",
    rating: 5,
  },
  {
    id: "waiswa-peter",
    name: "Waiswa Peter",
    role: "School Administrator",
    organization: "Campus IT & Network Project",
    projectType: "Network & Computer Lab Setup",
    quote:
      "Beyond web development, Malish configured our entire school network and set up our computer lab. Everything runs perfectly. His technical knowledge of both hardware and software is impressive.",
    initials: "WP",
    rating: 5,
  },
];
