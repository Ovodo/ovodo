export type Experience = {
  title: string;
  company: string;
  image: string;
  images?: unknown[];
  datess?: string;
  link?: string;
  summary?: string;
  location?: string;
  achievements: string[];
  category?: string[];
  languages?: string[];
  tools?: string[];
  keywords?: string[];
  repo?: string;
  services?: {
    title: string;
    description: string;
  }[];
  video?: string;
};
