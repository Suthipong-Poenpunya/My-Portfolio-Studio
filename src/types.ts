export interface EducationLevel {
  id: 'elementary' | 'secondary' | 'university';
  buttonLabel: string; // e.g. "ประถมศึกษา" / "ม.ต้น" / "Elementary School"
  levelName: string; // e.g. "ระดับการศึกษาขั้นพื้นฐาน (Basic Education)"
  schoolName: string; // e.g. "โรงเรียนบ้านโคกวิทยาคม"
  years: string; // e.g. "2554 – 2563"
  faculty: string; // e.g. "แผนการเรียนวิทยาศาสตร์ - คณิตศาสตร์" or "คณะครุศาสตร์ จุฬาฯ & คณะวิทยาศาสตร์ ม.รามคำแหง"
  description: string;
  fullDescription: string;
  detailsButtonText: string;
  gpa: string;
  honors: string;
  image: string;
  accentColor: 'sky' | 'purple' | 'rose';
  achievements: string[];
  skills: string[];
  levelNumber: string; // e.g. "Level 01"
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface BannerData {
  name: string;
  subtitle: string;
  badge: string;
  image: string;
  highlights: string[];
  bio?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
  location?: string;
}

export interface PortfolioData {
  banner: BannerData;
  education: EducationLevel[];
  projects?: ProjectItem[];
}

export type ViewMode = 'cards' | 'timeline' | 'compact';
