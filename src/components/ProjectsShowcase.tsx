import React from 'react';
import { ProjectItem } from '../types';
import { ExternalLink, Github, Sparkles, FolderGit2 } from 'lucide-react';

interface ProjectsShowcaseProps {
  projects?: ProjectItem[];
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects-showcase-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-8">
      <div className="mb-8 pb-4 border-b border-purple-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1.5">
            <FolderGit2 className="w-4 h-4" />
            <span>ผลงานและนวัตกรรม • Featured Projects</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            ผลงานนวัตกรรมและระบบเทคโนโลยีการศึกษา
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            ผลงานการพัฒนาระบบซอฟต์แวร์ เว็บแอปพลิเคชัน และเทคโนโลยีการศึกษาที่ใช้งานจริง
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group flex flex-col rounded-3xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-pastel-sm hover:shadow-pastel-md hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Action Links floating on image */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-sm hover:scale-110 transition-all"
                    title="เปิดดูเว็บไซต์ (Live Demo)"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-700" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-sm hover:scale-110 transition-all"
                    title="ดูซอร์สโค้ด (GitHub)"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-900" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-900 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-50">
                {project.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-purple-50 text-[10px] font-medium text-purple-700 border border-purple-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
