// src/data.js
import { PenTool, Plane, Cpu, BarChart, Layers, Gift, Wrench } from 'lucide-react';

const PUBLIC = process.env.PUBLIC_URL || "";

// =================================================================================
// 1. GENERAL TEAM INFO
// =================================================================================
export const TEAM_INFO = {
  name: "Assailing Falcons",
  smalllogo: `${PUBLIC}/images/falconslogobird.png`,
  logo: `${PUBLIC}/images/falconslogo.png`,
  gif: `${PUBLIC}/images/loading.gif`,
  shortName: "Falcons",
  email: "assailingfalcons@vit.ac.in",
  phone: "+91 98250 55701",
  address: `Vellore Institute of Technology
Vellore, Tamil Nadu, India
632014`,
  socialLinks: {
    Youtube: "https://www.youtube.com/@assailingfalcons_vit",
    linkedin: "https://www.linkedin.com/company/assailing-falcons/",
    instagram: "https://www.instagram.com/assailingfalcons/",
  }
};

// =================================================================================
// 2. HOME PAGE DATA
// =================================================================================
export const HERO_DATA = {
  backgroundImage: "https://vimeo.com/embed/1138938605",
  posterImage: `${PUBLIC}/images/Hero-Image.jpg`,
  titleStart: "PUSHING THE LIMITS OF",
  titleHighlight: "FLIGHT",
  subtitle: "Designing, building, and flying the next generation of UAVs.",
  brochureLink: `${PUBLIC}/AssailingFalcons25-Brochure.pdf`,
  buttonText: "Support Us",
  teamPhoto: `${PUBLIC}/images/all/Vidhyut-Team-Comp.jpg`
};

export const ABOUT_DATA = {
  teamTitle: "Our Team",
  teamText: "Team Assailing Falcons is VIT’s premier aeromodelling team, specializing in the design, fabrication, and testing of autonomous unmanned aerial vehicles (UAVs). Founded in 2010, we have grown into a 50+ member multidisciplinary team that consistently pushes the boundaries of innovation. Ranked #3 in the world, we excel in national and international competitions and provide a hands-on environment that transforms students into industry-ready engineers.",
  missionTitle: "Our Mission",
  missionText: "Our mission is to pioneer cutting-edge UAV technology, achieve excellence on the global stage, and cultivate future engineers through real-world learning: from conceptual design to autonomous flight testing. We empower students to take ownership of complex challenges, developing skills that extend far beyond the classroom. Driven by curiosity and commitment, we continue to evolve with the rapidly advancing aerospace landscape while promoting STEM research and education."
};

export const DEPARTMENTS_DATA = [
  { icon: PenTool, title: "Design", desc: "The Design Department engineers the aerodynamic soul of every Falcons aircraft. Through conceptual sizing, MDO, CFD, airfoil studies, and XFLR-driven performance mapping, the team shapes platforms built for mission superiority. With decisive trade studies across VTOL and fixed-wing configurations, Design drives innovation through precision, data, and aerodynamic excellence." },
  { icon: Plane, title: "Structures", desc: "The Structures Department turns vision into reality through complete CAD development, advanced structural analysis, and FEA-backed optimization. Working across diverse materials and performing in-house composite layups, the team delivers airframes that are light, resilient, and competition-proven. Structures ensures every Falcons UAV meets uncompromising standards of strength and reliability." },
  { icon: Cpu, title: "Avionics", desc: "The Avionics Department drives the autonomy and intelligence of every Falcons aircraft. The team develops flight-control systems, mission logic, and sensor integration that enable precise, reliable, self-governed flight. Alongside propulsion tuning, TMD testing, and power-system optimization, Avionics ensures each aircraft executes missions with stability, efficiency, and confident autonomous performance." },
  { icon: BarChart, title: "Management", desc: "The Management Department is the strategic engine that sustains the Falcons’ momentum. Through masterful coordination of logistics, sponsorships, documentation, and outreach, the team builds the ecosystem that enables engineering excellence. Their leadership strengthens partnerships, elevates visibility, and ensures the Falcons operate with purpose, discipline, and global ambition." }
];

export const STATS_DATA = [
  { label: "Founding Year", value: "2010" },
  { label: "Aircraft Built", value: "20+" },
  {
    label: `World
Rank`, value: "#3"
  },
  { label: "India Rank", value: "#1" }
];

// src/data.js (SPONSORS_LOGOS)
export const SPONSORS_LOGOS = [
  { logoUrl: `${PUBLIC}/images/sponsors/apc.png`, websiteUrl: "https://www.apcprop.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/chaservo.png`, websiteUrl: "https://www.chaservo.com/en" },
  { logoUrl: `${PUBLIC}/images/sponsors/electo.png`, websiteUrl: "https://www.electo.co.in/" },
  { logoUrl: `${PUBLIC}/images/sponsors/emax.png`, websiteUrl: "https://emax-usa.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/gemfan.png`, websiteUrl: "https://www.gfprops.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/hitec.png`, websiteUrl: "https://hitecrcd.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/holybro.png`, websiteUrl: "https://holybro.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/iflight.png`, websiteUrl: "https://www.iflight.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/savox.png`, websiteUrl: "https://www.savoxusa.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/simnet.png`, websiteUrl: "https://www.simnet.aero/" },
  { logoUrl: `${PUBLIC}/images/sponsors/simscale.png`, websiteUrl: "https://www.simscale.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/solidworks.png`, websiteUrl: "https://www.solidworks.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/uavgarage.png`, websiteUrl: "https://uavgarage.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/whoopmasters.png`, websiteUrl: "https://whoopmastersindia.com/" },
  { logoUrl: `${PUBLIC}/images/sponsors/zerodrag.png`, websiteUrl: "https://zerodrag.in/" },
];

// =================================================================================
// 3. FLAGSHIPS (AIRCRAFT) PAGE
// =================================================================================
// NOTE: IDs are assigned sequentially. Change IDs if you rely on them elsewhere.
export const AIRCRAFT_DATA = [
  {
    id: 1,
    name: "Vidhyut",
    year: "2025",
    mission: "Autonomous Tiltrotor VTOL",
    rank: ["1st Design Report", "3rd Flight Demonstration Readiness Review", "4th Flight Performance", "3rd Overall"],
    coverImage: `${PUBLIC}/images/all/Vidhyut-Hero.jpg`,
    description: "Vidhyut, our 2025 flagship, is an advanced autonomous tiltrotor VTOL aircraft engineered for high-performance payload missions in constrained environments. Its refined tiltrotor architecture enables seamless transitions between vertical takeoff/landing and efficient forward flight, delivering exceptional agility and extended operational range. Equipped with cutting-edge avionics and a robust, precision-engineered structure, Vidhyut offers unmatched reliability and mission capability. Its design excellence and performance have secured a #3 global ranking, reflecting the team’s unwavering drive to push the frontiers of UAV innovation.",
    gallery: [
      `${PUBLIC}/images/all/Vidhyut-Hero.jpg`,
      `${PUBLIC}/images/all/Vidhyut-2.jpg`,
      `${PUBLIC}/images/all/Vidhyut-3.jpg`,
      `${PUBLIC}/images/all/Vidhyut-4.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Comp.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Comp2.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Comp-Flight.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Awards.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight2.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight3.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight-Comp.jpg`,
      `${PUBLIC}/images/all/Vidhyut-General.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Team-Comp.jpg`
    ]
  },
  {
    id: 2,
    name: "Marut",
    year: "2024",
    mission: "High payload, mid-air delivery",
    rank: ["6th Design Report", "13th Flight Demonstration Readiness Review", "2nd (tied) Flight Performance", "9th Overall"],
    coverImage: `${PUBLIC}/images/all/Marut-Hero.jpg`,
    description: "Marut, our 2024 flagship, is a high-performance blended-wing aircraft that earned the title of #1 in Asia. With a commanding 10-ft wingspan and the ability to carry 13 lbs of water, Marut is purpose-built for wildfire-oriented firefighting missions. Engineered for precision and reliability, it features a specialized deployment system capable of releasing an autonomous powered delta-wing vehicle mid-air to extend mission reach and responsiveness. Marut stands as a testament to our commitment to pioneering bold, mission-driven UAV solutions.",
    gallery: [
      `${PUBLIC}/images/all/Marut-Hero.jpg`,
      `${PUBLIC}/images/all/Marut-1.jpg`,
      `${PUBLIC}/images/all/Marut-2.jpg`,
      `${PUBLIC}/images/all/Marut-3.jpg`,
      `${PUBLIC}/images/all/Marut-Comp.jpg`,
      `${PUBLIC}/images/all/Marut-Comp-Flight.jpg`,
      `${PUBLIC}/images/all/Marut-Comp-Team3.jpg`,
      `${PUBLIC}/images/all/Marut-General.jpg`
    ]
  },
  {
    id: 3,
    name: "Aquarius",
    year: "2023",
    mission: "Water payload delivery & PADA deployment",
    rank: ["3rd Design Report", "3rd Technical Presentation", "5th (tied) Flight Performance", "7th Overall"],
    coverImage: `${PUBLIC}/images/all/Aquarius-Hero.jpeg`,
    description: "Aquarius, our 2023 flagship, was named after the water-bearing constellation — a testament to its design delivering an 11 lb water payload to achieve mission performance. This semi-tapered mid-wing aircraft cruises at 42 ft/s. The Powered Autonomous Delivery Aircraft (PADA) deployed from the primary aircraft provides parts for a fully autonomous Ground Transport Vehicle.",
    gallery: [
      `${PUBLIC}/images/all/Aquarius-Hero.jpeg`,
      `${PUBLIC}/images/all/Aquarius-1.jpg`,
      `${PUBLIC}/images/all/Aquarius-2.jpg`,
      `${PUBLIC}/images/all/Aquarius-3.jpg`,
      `${PUBLIC}/images/all/Aquarius-4.jpg`,
      `${PUBLIC}/images/all/Aquarius-Award.png`,
      `${PUBLIC}/images/all/Aquarius-Flight-Team.jpg`
    ]
  },
  {
    id: 4,
    name: "Trident",
    year: "2022",
    mission: "Autonomous mid-air deployment & GTV support",
    rank: ["1st Design Report", "1st Technical Presentation", "3rd (tied) Flight Performance", "3rd Overall"],
    coverImage: `${PUBLIC}/images/all/Trident-Hero.jpg`,
    description: "Trident, the 2022 flagship, is an electric mid-wing aircraft with a single motor. It can carry 40 lbs at a cruise speed of 43 ft/s. Its advanced avionics allow for autonomous mid-air deployment of a secondary aircraft equipped with lidar-operated Ground Terrain Vehicle (GTV). The GTV provides ground-level assistance to firefighters. Trident achieved a global ranking of 3rd place.",
    gallery: [
      `${PUBLIC}/images/all/Trident-Hero.jpg`,
      `${PUBLIC}/images/all/Trident-Team2.jpg`,
      `${PUBLIC}/images/all/Trident-2.jpg`,
      `${PUBLIC}/images/all/Trident-3.jpg`,
      `${PUBLIC}/images/all/Trident-4.jpg`,
      `${PUBLIC}/images/all/Trident-5.jpg`,
      `${PUBLIC}/images/all/Trident-Team.jpg`,
      `${PUBLIC}/images/all/Trident-Awards.jpg`,
      `${PUBLIC}/images/all/Trident-Awards-2.jpeg`
    ]
  },
  {
    id: 5,
    name: "Vulcan",
    year: "2021",
    mission: "Creative design — competition-focused",
    rank: ["1st Design Report", "16th Technical Presentation"],
    coverImage: `${PUBLIC}/images/all/Vulcan-Hero.jpg`,
    description: "Vulcan is our 2021 flagship designed with a combination of hard work and creativity. Vulcan enabled the team to achieve 1st position in all of Asia as well as a top technical design report ranking. Globally it is ranked 5th, despite the challenges that year due to the COVID-19 pandemic.",
    gallery: [
      `${PUBLIC}/images/all/Vulcan-Hero.jpg`,
      `${PUBLIC}/images/all/Vulcan-2.jpg`
    ]
  },
  {
    id: 6,
    name: "Airavat",
    year: "2020",
    mission: "High-lift electric, multi-deployment",
    rank: ["7th Design Report", "1st Technical Presentation", "3rd Flight Performance", "3rd Overall"],
    coverImage: `${PUBLIC}/images/all/Airavat-Hero.jpeg`,
    description: "Airavat is the 2020 flagship — an electric motor-propelled, high-wing aircraft with tricycle landing gear, capable of lifting 38 pounds at a cruise velocity of 43 ft/s. The aircraft can autonomously release two colonist delivery aircraft along with multiple supply payloads. It is ranked 3rd globally.",
    gallery: [
      `${PUBLIC}/images/all/Airavat-Hero.jpeg`,
      `${PUBLIC}/images/all/Airavat-Flight.jpg`,
      `${PUBLIC}/images/all/Airavat-Comp.jpg`,
      `${PUBLIC}/images/all/Airavat-Comp-2.jpg`,
      `${PUBLIC}/images/all/Airavat-Render.png`,
      `${PUBLIC}/images/all/Airavat-Team.jpg`
    ]
  },
  {
    id: 7,
    name: "Redbird",
    year: "2019",
    mission: "Mars colonization simulation & increased aerodynamics",
    rank: ["1st Design Report", "1st Technical Presentation", "10th (tied) Flight Performance", "4th Overall"],
    coverImage: `${PUBLIC}/images/all/Redbird-1.jpg`,
    description: "Redbird is the 2019 flagship designed to simulate the colonization of Mars. Hoerner wingtips and a lifting-body fuselage increased the aircraft's aerodynamics and payload lifting capacity, leading the team to a worldwide 4th position and defending 1st position in the Asia-Pacific in the Advanced Class category of SAE Aero Design.",
    gallery: [
      `${PUBLIC}/images/all/Redbird-1.jpg`,
      `${PUBLIC}/images/all/Redbird-Flight-Comp.jpeg`,
      `${PUBLIC}/images/all/Redbird-Award.jpg`,
      `${PUBLIC}/images/all/Redbird-Team.jpg`
    ]
  },
  {
    id: 8,
    name: "Zephyrus",
    year: "2018",
    mission: "Advanced lift & payload drop",
    rank: ["8th Design Report", "6th Technical Presentation", "6th Flight Performance", "6th Overall"],
    coverImage: `${PUBLIC}/images/all/Zephyrus-Hero.png`,
    description: "Zephyrus is indeed the majestic advanced class aircraft that definitely lives up to its name - The Greek god of winds. Its improved lift and payload dropping capacity of aircraft helped the team secure worldwide 6th position at the SAE Aero Design East Competition 2018 — the best position in the Asia/Pacific region at the time.",
    gallery: [
      `${PUBLIC}/images/all/Zephyrus-Hero.png`,
      `${PUBLIC}/images/all/Zephyrus-2.jpg`,
      `${PUBLIC}/images/all/Zephyrus-Team.jpg`
    ]
  },
  {
    id: 9,
    name: "Jetaayu",
    year: "2017",
    mission: "Weather analysis & thermal imaging (modifiable)",
    rank: ["4th Design Report", "6th Technical Presentation", "7th Flight Performance", "7th Overall"],
    coverImage: `${PUBLIC}/images/all/Jetaayu-Hero.jpeg`,
    description: "Jetaayu is the 2017 flagship of Team Assailing Falcons. The aircraft can be modified for weather analysis and thermal imaging. In SAE EAST Aero Design Competition, Jetaayu secured an overall world ranking of 7. It also helped the team secure an overall 3rd ranking in the Indian Space Conclave 2017 competition held by SEDS VIT.",
    gallery: [
      `${PUBLIC}/images/all/Jetaayu-Hero.jpeg`,
      `${PUBLIC}/images/all/Jetaayu-2.jpg`
    ]
  }
];

// =================================================================================
// 4. GALLERY PAGE (updated categories: Flights, Competition Photos, Events, General)
// - Team photos and award images have been added into relevant categories.
// =================================================================================
export const GALLERY_CATEGORIES = [
  {
    name: "Flights",
    coverImage: `${PUBLIC}/images/all/Vidhyut-Flight-Comp.jpg`,
    photos: [
      `${PUBLIC}/images/all/Vidhyut-Flight.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight2.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight3.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Flight-Comp.jpg`,
      `${PUBLIC}/images/all/Marut-Comp-Flight.jpg`,
      `${PUBLIC}/images/all/Airavat-Flight.jpg`,
      `${PUBLIC}/images/all/Redbird-Flight-Comp.jpeg`,
    ]
  },
  {
    name: "Competition Photos",
    coverImage: `${PUBLIC}/images/all/Airavat-Comp.jpg`,
    photos: [
      `${PUBLIC}/images/all/Redbird-Flight-Comp.jpeg`,
      `${PUBLIC}/images/all/Marut-Comp.jpg`,
      `${PUBLIC}/images/all/Marut-Comp-Flight.jpg`,
      `${PUBLIC}/images/all/Marut-Comp-Team3.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Comp.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Comp2.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Comp-Flight.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Team-Comp.jpg`,
      `${PUBLIC}/images/all/Airavat-Comp.jpg`,
      `${PUBLIC}/images/all/Airavat-Comp-2.jpg`,
      `${PUBLIC}/images/all/Comp-1.jpg`,
      `${PUBLIC}/images/all/Comp-2.jpg`
    ]
  },
  {
    name: "Events",
    coverImage: `${PUBLIC}/images/all/Events.jpg`,
    photos: [
      `${PUBLIC}/images/all/Events.jpg`,
      `${PUBLIC}/images/all/Events-2.jpg`,
      `${PUBLIC}/images/all/Events-3.jpg`,
      `${PUBLIC}/images/all/Trident-Team-Events.jpg`,
      `${PUBLIC}/images/all/Events-AC25-1.jpg`,
      `${PUBLIC}/images/all/Events-AC25-2.jpg`,
      `${PUBLIC}/images/all/Events-AC24.jpg`,
      `${PUBLIC}/images/all/Events-ID.jpg`
    ]
  },
  {
    name: "Team",
    coverImage: `${PUBLIC}/images/all/Team-India.jpg`,
    photos: [
      `${PUBLIC}/images/all/Team-India.jpg`,
      `${PUBLIC}/images/all/Vidhyut-Team-Comp.jpg`,
      `${PUBLIC}/images/all/Marut-Comp-Team3.jpg`,
      `${PUBLIC}/images/all/Aquarius-Team.jpg`,
      `${PUBLIC}/images/all/Trident-Team2.jpg`,
      `${PUBLIC}/images/all/Airavat-Team.jpg`,
      `${PUBLIC}/images/all/Redbird-Team.jpg`,
      `${PUBLIC}/images/all/Zephyrus-Team.jpg`,
      `${PUBLIC}/images/all/Nautilus-Hero-Team.jpg`,
      `${PUBLIC}/images/all/Carvao-Team.jpg`,
    ]

  },
  {
    name: "General",
    coverImage: `${PUBLIC}/images/all/General2.jpg`,
    photos: [
      `${PUBLIC}/images/all/General2.jpg`,
      `${PUBLIC}/images/all/General3.jpg`,
      `${PUBLIC}/images/all/General4.jpg`,
      `${PUBLIC}/images/all/General5.jpg`
    ]
  },
  {
    name: "Awards",
    coverImage: `${PUBLIC}/images/all/Vidhyut-Awards.jpg`,
    photos: [
      `${PUBLIC}/images/all/Vidhyut-Awards.jpg`,
      `${PUBLIC}/images/all/Trident-Awards.jpg`,
      `${PUBLIC}/images/all/Trident-Awards-2.jpeg`,
      `${PUBLIC}/images/all/Redbird-Award.jpg`,
      `${PUBLIC}/images/all/Aquarius-Award.png`
    ]
  }
];

// =================================================================================
// 5. CONTACT US PAGE
// =================================================================================
export const CONTACT_CONFIG = {
  introText: "Interested in sponsoring or joining? Let us know."
};


// =================================================================================
// 6. SPONSOR US PAGE
// =================================================================================
export const PERKS = [
    { icon: Cpu, title: 'Technical Collaboration', desc: 'Component donations, dev boards, electronics and hardware.' },
    { icon: Layers, title: 'Software & Licenses', desc: 'Software licenses, compute credits, SDKs.' },
    { icon: Gift, title: 'Monetary Support', desc: 'Funding for projects, discounts on components and services.' },
    { icon: Wrench, title: 'Mentorship & Access', desc: 'Office hours, guest lectures, recruitment pipeline.' },
];

export const WHAT_WE_PROVIDE = [
    'Brand visibility across competitions, social and campus events',
    'Technical reports, demo day, post-campaign analytics',
    'Access to student talent for internships & recruitment',
    'Brand placement on banners, team apparel, website and social media'
];

export const WHAT_WE_EXPECT = [
    'Clear deliverables and timeline for in-kind donations',
    'Logo and brand assets (SVG, color guide) for marketing purposes',
    'Technical documentation for hardware/software donations',
    'Compliance with safety & export rules for restricted components'
];