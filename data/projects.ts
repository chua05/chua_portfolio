/*
  MY PROJECTS — add, remove, or reorder entries here. The grid, filters, and
  preview modal all update automatically.

  Template (copy, paste, fill in — every field except title/kind/summary is optional):

  {
    title: 'Project name',
    kind: 'figma',            // 'figma' | 'web' | 'docs' — new kinds just need a label in kindLabels
    summary: 'One or two sentences about what it is and your role.',
    tags: ['Figma', 'Prototyping'],
    year: '2026',
    status: 'In progress',    // omit when finished
    image: '/projects/my-cover.png', // put the file in public/projects/
    figma: 'https://www.figma.com/design/...', // shows a live embedded preview
    live: 'https://my-app.vercel.app',
    repo: 'https://github.com/chua05/my-repo',
  },
*/

export type ProjectKind = 'figma' | 'web' | 'docs'

export type Project = {
  title: string
  kind: ProjectKind
  summary: string
  tags?: string[]
  year?: string
  status?: string
  image?: string
  figma?: string
  live?: string
  repo?: string
}

export const kindLabels: Record<ProjectKind, string> = {
  figma: 'Figma design',
  web: 'Web project',
  docs: 'Analysis & docs',
}

export const projects: Project[] = [
  {
    title: 'High-Fidelity UI Design',
    kind: 'figma',
    summary: 'High-fidelity screens designed in Figma for UI/UX coursework. Open it to explore the file right here.',
    tags: ['Figma', 'UI/UX', 'High fidelity'],
    figma: 'https://www.figma.com/design/j138yvCXFRO8YYBIfo3Pue/High-Fidelity?node-id=0-1&t=BwmEuWrJ0SW8fAvH-1',
  },
  {
    title: 'Geo-Tagged Reforestation Monitoring System',
    kind: 'web',
    status: 'In progress',
    summary: 'Capstone for MENRO: seedling inventory, planting records, and tree survival monitoring on an interactive map.',
    tags: ['React.js', 'Express.js', 'Firebase', 'Leaflet.js'],
  },
  {
    title: 'Laravel Web Applications',
    kind: 'web',
    summary: 'Academic management systems built with Laravel and MySQL, with APIs tested in Postman and deployed on Railway.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Postman'],
  },
]
