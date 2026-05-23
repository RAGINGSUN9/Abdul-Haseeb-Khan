export interface Skill {
  name: string;
  category: 'security' | 'ai' | 'dev';
  level: number; // 0 to 100
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'security' | 'ai' | 'dev';
  description: string;
  detailDescription: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  keyFeatures: string[];
  architecture?: string;
  terminalCommandDemo?: string;
  codeSnippet?: string;
}

export interface TerminalLine {
  id: string;
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'highlight';
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'experience' | 'certification';
  badges?: string[];
}
