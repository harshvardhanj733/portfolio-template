interface PortfolioTemplate {
  name: string;
  email: string;
  role: string;
  about: string;
  experience?: {
    company: string;
    position: string;
    duration: string;
    responsibilities: string[];
  }[];
  socials?: {
    [key: string]: string;
  }[];
  projects?: {
    title: string;
    description: string;
    liveUrl?: string;
    githubUrl?: string;
    tech: string[];
  }[];
  education?: { institution: string; degree: string; duration: string }[];
  skills?: { [key: string]: number }[];
  resume?: string;
  additionalInfo?: any;
}

export type { PortfolioTemplate };
