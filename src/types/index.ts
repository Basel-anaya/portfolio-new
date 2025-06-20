export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  github?: string
  demo?: string
  featured?: boolean
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string
  type: 'work' | 'education' | 'fellowship'
}

export interface Skill {
  name: string
  category: 'framework' | 'language' | 'tool' | 'ai' | 'database'
  proficiency?: number
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface Research {
  id: string
  title: string
  description: string
  authors: string[]
  year: string
  status: 'Published' | 'Under Review' | 'In Progress' | 'Completed'
  type: string
  keywords: string[]
  doi?: string
  arxiv?: string
  github?: string
}

export interface Blog {
  id: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  featured: boolean
  content?: string
  image?: string
} 