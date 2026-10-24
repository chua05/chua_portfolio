// Everything personal lives here so the page never drifts from the CV.
export const profile = {
  name: 'Kyla G. Chua',
  shortName: 'Kyla Chua',
  initials: 'KC',
  location: 'Bulan, Sorsogon, Philippines',
  email: 'chuakyla21@gmail.com',
  phoneDisplay: '0992 456 8299',
  phoneHref: 'tel:+639924568299',
  github: 'https://github.com/chua05',
  githubHandle: 'chua05',
  photo: '/kyla-chua.jpg',
  cv: '/Kyla-Chua-CV.pdf',
  seeking: 'OJT in Business Analysis / Quality Assurance',
  school: 'Sorsogon State University – Bulan Campus',
  degree: 'BS Information Technology, Major in Web Development',
  graduation: 'Expected 2027',
}

export const skillGroups = [
  { label: 'Languages', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'SQL (basic)'] },
  { label: 'Frontend', items: ['React.js', 'Next.js (basic)', 'Tailwind CSS', 'shadcn/ui', 'Lucide Icons'] },
  { label: 'Backend', items: ['Laravel', 'Node.js', 'Express.js'] },
  { label: 'Data', items: ['Firebase Firestore', 'MySQL', 'phpMyAdmin'] },
  { label: 'Testing', items: ['Postman (API testing)', 'Playwright (exploring)'] },
  { label: 'Analysis & Docs', items: ['Requirements analysis', 'ERD', 'DFD', 'Workflow diagrams', 'Architecture diagrams', 'Technical documentation'] },
  { label: 'UI/UX', items: ['Figma', 'Balsamiq'] },
  { label: 'Maps', items: ['Leaflet.js', 'OpenStreetMap', 'Geotagging'] },
  { label: 'Tools & Deploy', items: ['VS Code', 'Cursor', 'Git', 'GitHub', 'Trello', 'Vercel', 'Railway', 'Render'] },
]

export const experience = [
  {
    title: 'Geo-Tagged Reforestation Monitoring System for MENRO',
    kind: 'Capstone project',
    status: 'In progress',
    points: [
      'Web-based system for managing seedling inventory, planting records, and tree survival monitoring.',
      'React.js frontend with a Node.js + Express.js backend; records stored in Firebase Firestore and Firebase Storage.',
      'Geotagging and interactive maps with Leaflet.js and OpenStreetMap; system workflows and technical documentation.',
      'API testing in Postman, Playwright on selected features, deployed with Vercel and Render.',
    ],
  },
  {
    title: 'Web Application Development',
    kind: 'Academic projects',
    points: [
      'Laravel + PHP projects focused on backend development and application functionality.',
      'MySQL databases, Railway for backend deployment, and Postman to test APIs.',
      'Integrated React.js with Laravel in one of the smaller full-stack projects.',
    ],
  },
  {
    title: 'Frontend, UI/UX & Wireframing',
    kind: 'Academic work',
    points: [
      'Built web layouts with Tailwind CSS, shadcn/ui, and Lucide Icons.',
      'Designed in Figma for UI/UX coursework and wireframed in Balsamiq.',
    ],
  },
]
