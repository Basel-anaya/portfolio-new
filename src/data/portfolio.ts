import { Project, Experience, Skill } from '@/types'

export const projects: Project[] = [
  {
    id: 'medformer',
    title: 'MedFormer: A Biomedical Vision-Language Model with RAG System',
    description: 'MedFormer is an advanced Biomedical Vision-Language Model integrated with a RAG System, designed to address complex diagnostic challenges in healthcare. Utilizing cutting-edge technologies such as Idefics2, LLAMA-3, and Citrinet-512, MedFormer seamlessly integrates textual, visual, and auditory data. Achieved superior performance in benchmarks like MMMU Val, OCRBench, and AI2D.',
    technologies: ['Pytorch', 'VLM', 'AzureML', 'Gradio', 'RAG System', 'IDEFICS2', 'LLAMA-3', 'Citrinet-512'],
    featured: true
  },
  {
    id: 'loreweaver',
    title: 'LoreWeaver: A Novels Generation Multimodal LLM',
    description: 'LoreWeaver is a Novel/Stories Generation Multimodal LLM harnessing a fine-tuned Mistral 7B LLM. The model provides the ability for the impaired individuals to hear the generated stories via text-to-speech and supports the dyslexic individuals by transforming the text story into an image represented story via text-to-image.',
    technologies: ['Pytorch', 'LangChain', 'LLM', 'Jax', 'Mistral 7B', 'Text-to-Speech', 'Text-to-Image'],
    featured: true
  },
  {
    id: 'oculus',
    title: 'Oculus: A Travel Agent RAG System',
    description: 'A travel agent RAG System that utilizes Langchain and the Amadeus API within a Streamlit interface.',
    technologies: ['Pytorch', 'LangChain', 'Streamlit', 'LLM', 'Amadeus API'],
    featured: true
  },
  {
    id: 'valerie',
    title: 'Valerie: A Visual ASR Language Model for Lips Reading',
    description: 'Valerie is a novel visual automatic speech recognition (ASR) language model that combines computer vision and natural language processing for accurate lip reading. Our approach leverages transformer architectures with specialized visual attention mechanisms to decode speech from lip movements, achieving state-of-the-art performance on multiple lip reading benchmarks while maintaining real-time processing capabilities.',
    technologies: ['Pytorch', 'Transformers', 'Computer Vision', 'Visual ASR', 'Attention Mechanisms', 'Real-time Processing'],
    featured: true
  }
]

export const experiences: Experience[] = [
  {
    id: 'ai-engineer-deriv',
    title: 'AI Engineer',
    company: 'Deriv',
    location: 'Remote',
    duration: 'July 2024 - Present',
    description: 'Currently working as an AI Engineer at Deriv, passionate about AI in Medicine & Robotics. Focusing on developing and implementing innovative AI solutions for financial technology applications.',
    type: 'work'
  },
  {
    id: 'ml-engineer-intern-2024',
    title: 'Machine Learning Engineer Intern',
    company: 'ShAI for AI',
    location: 'Amman, Jordan',
    duration: 'March 2024 - July 2024',
    description: 'As an ML Engineer, I played a crucial role in designing, developing, and deploying AI-powered systems that deliver customized and efficient technology solutions to our clients.',
    type: 'work'
  },
  {
    id: 'bachelor-graduate',
    title: 'Bachelor in Artificial Intelligence',
    company: 'University of Jordan',
    location: 'Amman, Jordan',
    duration: 'Oct 2020 - July 2024',
    description: 'Graduated with a bachelor\'s degree in Artificial Intelligence. Completed graduation project on MedFormer, a biomedical vision-language model with RAG system.',
    type: 'education'
  },
  {
    id: 'ml-engineer-fellow',
    title: 'Machine Learning Engineer Fellow',
    company: 'Fellowship.ai',
    location: 'Amman, Jordan',
    duration: 'Oct 2023 - Dec 2023',
    description: 'I have worked as a Machine Learning Engineer at Fellowship.ai. I have had the privilege to be part of a dynamic team working on projects at the intersection of LLMs and LangChain. This Fellowship has provided me with a unique opportunity to learn and apply my skills in a real-world setting.',
    type: 'fellowship'
  },
  {
    id: 'data-scientist-intern',
    title: 'Data Scientist Intern',
    company: 'ShAI for AI',
    location: 'Amman, Jordan',
    duration: 'April 2022 - June 2023',
    description: 'As a Data Scientist Intern at ShAI for AI, I had the opportunity to work on several projects that allowed me to gain valuable experience and develop my skills in data science.',
    type: 'work'
  }
]

export const skills: Skill[] = [
  { name: 'Pytorch', category: 'framework' },
  { name: 'LangChain', category: 'framework' },
  { name: 'Tensorflow', category: 'framework' },
  { name: 'Jax', category: 'framework' },
  { name: 'Python', category: 'language' },
  { name: 'Julia', category: 'language' },
  { name: 'LLMs', category: 'ai' },
  { name: 'VLMs', category: 'ai' },
  { name: 'MLOps', category: 'ai' },
  { name: 'RAG Systems', category: 'ai' },
  { name: 'Apache Sparks', category: 'tool' },
  { name: 'Git', category: 'tool' },
  { name: 'AzureML', category: 'tool' },
  { name: 'Gradio', category: 'tool' },
  { name: 'MongoDB', category: 'database' }
]

export const personalInfo = {
  name: 'Basel Anaya',
  title: 'AI Engineer @ Deriv',
  subtitle: 'Passionate about AI in Medicine & Robotics',
  experience: '2+ years',
  email: 'baselanaya@gmail.com',
  bio: 'AI Engineer at Deriv with a passion for AI in Medicine & Robotics. After graduating with a degree in Artificial Intelligence from the University of Jordan, I decided to apply my skills and knowledge in building, fine-tuning and deploying LLMs to develop and implement innovative solutions for social impact. I am eager to further enhance my skills and create a meaningful impact through my work.',
  interests: 'When I\'m not building models, I enjoy playing video games and watching movies. I also enjoy learning new things. I am currently learning about GPU Programming and Quantum Computing. I\'m also learning how to play the piano.',
  currentlyLearning: ['GPU Programming', 'Quantum Computing', 'Piano'],
  location: 'Amman, Jordan',
  specialties: ['AI in Medicine', 'Robotics', 'Vision-Language Models', 'RAG Systems']
}

// Research publications and papers
export const research = [
  {
    id: 'valerie-paper',
    title: 'Valerie: A Visual ASR Language Model for Lips Reading',
    description: 'A novel visual automatic speech recognition (ASR) language model that combines computer vision and natural language processing for accurate lip reading. Our approach leverages transformer architectures with specialized visual attention mechanisms to decode speech from lip movements, achieving state-of-the-art performance on multiple lip reading benchmarks while maintaining real-time processing capabilities.',
    authors: ['Basel Anaya'],
    year: '2025',
    status: 'In Progress',
    type: 'Research Paper',
    keywords: ['Lip Reading', 'Visual ASR', 'Computer Vision', 'Transformers', 'Speech Recognition', 'Multimodal AI']
  }
]

// Blog posts and articles
export const blogs = [
  {
    id: 'mlops-real-world-challenges',
    title: 'MLOps in the Real World: Navigating the Challenges and Dilemmas of Production Machine Learning',
    description: 'An in-depth exploration of the real-world challenges faced when implementing MLOps in production environments. Covers the complexities of model deployment, monitoring, versioning, and the organizational changes needed for successful ML operations.',
    date: '2025-06-15',
    readTime: '12 min read',
    tags: ['MLOps', 'Machine Learning', 'Production', 'DevOps', 'AI Engineering'],
    featured: true,
    url: 'https://medium.com/@baselanaya/mlops-in-the-real-world-navigating-the-challenges-and-dilemmas-of-production-machine-learning-7f56f6c67080'
  },
  {
    id: 'faces-detection-haar-cascade',
    title: 'Faces Detection Using Haar Cascade',
    description: 'A comprehensive guide to implementing facial detection using Haar Cascade algorithm with OpenCV and Python. Covers both traditional computer vision approaches and modern TensorFlow implementations.',
    date: '2023-04-24',
    readTime: '6 min read',
    tags: ['Computer Vision', 'OpenCV', 'Python', 'Haar Cascade', 'Face Detection'],
    featured: true,
    url: 'https://medium.com/@baselanaya/faces-detection-using-haar-cascade-3e175aef84f5'
  },
] 