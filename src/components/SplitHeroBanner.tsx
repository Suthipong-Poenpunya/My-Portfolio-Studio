import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Edit3, 
  ArrowDownCircle, 
  CheckCircle2, 
  Camera, 
  Award, 
  BookOpen,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { BannerData } from '../types';

interface SplitHeroBannerProps {
  banner: BannerData;
  onOpenEditModal: (tabIndex?: number) => void;
  onScrollToEducation: () => void;
}

export const SplitHeroBanner: React.FC<SplitHeroBannerProps> = ({
  banner,
  onOpenEditModal,
  onScrollToEducation,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10">
      <div 
        id="hero-banner-card"
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/95 via-purple-50/40 to-pink-50/50 backdrop-blur-xl border border-purple-100/90 shadow-pastel-lg p-6 sm:p-10 lg:p-12 transition-all duration-300"
      >
        {/* Ambient background decorative glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-purple-300/25 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300/25 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            {/* Badge */}
            <div 
              id="hero-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200/80 shadow-pastel-sm text-purple-800 text-xs sm:text-sm font-semibold tracking-wide"
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>{banner.badge || 'PORTFOLIO • SUTHIPONG POENPUNYA'}</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            </div>

            {/* Personal Name */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600/70">
                Education Portfolio Showcase
              </span>
              <h1 
                id="hero-person-name"
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]"
              >
                <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-950 bg-clip-text text-transparent">
                  {banner.name || 'Suthipong Poenpunya'}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p 
              id="hero-subtitle"
              className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl"
            >
              {banner.subtitle || 'Developer & Educational Technologist • I create innovative educational technology solutions that bridge the gap between development and learning.'}
            </p>

            {/* Social & Contact Links */}
            {(banner.github || banner.linkedin || banner.email || banner.phone) && (
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {banner.github && (
                  <a
                    href={banner.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 hover:text-purple-700 border border-purple-100 rounded-xl text-xs font-medium shadow-sm transition-all hover:scale-105"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-900" />
                    <span>GitHub</span>
                  </a>
                )}
                {banner.linkedin && (
                  <a
                    href={banner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 hover:text-blue-700 border border-purple-100 rounded-xl text-xs font-medium shadow-sm transition-all hover:scale-105"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {banner.email && (
                  <a
                    href={`mailto:${banner.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 hover:text-rose-700 border border-purple-100 rounded-xl text-xs font-medium shadow-sm transition-all hover:scale-105"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-500" />
                    <span>{banner.email}</span>
                  </a>
                )}
                {banner.phone && (
                  <a
                    href={`tel:${banner.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 hover:text-emerald-700 border border-purple-100 rounded-xl text-xs font-medium shadow-sm transition-all hover:scale-105"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{banner.phone}</span>
                  </a>
                )}
                {banner.location && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-slate-500 text-xs font-normal">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{banner.location}</span>
                  </span>
                )}
              </div>
            )}

            {/* Micro-check indicators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 pt-1">
              {(banner.highlights && banner.highlights.length > 0
                ? banner.highlights
                : ['2 Bachelor\'s Degrees (CU & RU)', 'Developer & EdTech', 'นวัตกรรมเทคโนโลยีการศึกษา', 'รองรับ Google Sites']
              ).map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-1.5 text-xs font-medium text-purple-900/80 bg-purple-100/50 px-3 py-1 rounded-full border border-purple-200/50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                id="hero-btn-edit-content"
                type="button"
                onClick={() => onOpenEditModal(0)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl text-sm font-semibold shadow-pastel-md hover:shadow-pastel-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>แก้ไขข้อมูล (Edit Content)</span>
                <Sparkles className="w-4 h-4 text-pink-200" />
              </button>

              <button
                id="hero-btn-view-education"
                type="button"
                onClick={onScrollToEducation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-purple-50/80 text-slate-700 hover:text-purple-700 border border-purple-200/80 rounded-2xl text-sm font-semibold shadow-pastel-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <ArrowDownCircle className="w-4 h-4 text-purple-500" />
                <span>ดูประวัติการศึกษา</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Floating Showcase Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div 
              id="hero-showcase-frame"
              className="relative w-full max-w-md group"
            >
              {/* Outer macOS-style Window Frame */}
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-pastel-lg overflow-hidden transition-all duration-300 group-hover:shadow-pastel-glow group-hover:-translate-y-1">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 via-slate-50 to-pink-50/50 border-b border-purple-100">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-rose-500/40 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500/40 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-500/40 inline-block" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider text-purple-900/60 uppercase">
                    PORTFOLIO SHOWCASE
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenEditModal(0)}
                    title="เปลี่ยนรูปภาพแบนเนอร์"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 hover:text-purple-800 bg-white/80 hover:bg-white px-2 py-0.5 rounded-md border border-purple-200/60 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3 h-3" />
                    <span>เปลี่ยนรูป</span>
                  </button>
                </div>

                {/* Banner Showcase Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100">
                  <img
                    id="hero-banner-image"
                    src={banner.image}
                    alt={banner.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  {/* Subtle bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Banner Info */}
                  <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
                    <p className="text-xs font-medium text-pink-200">
                      Educational Technologist &amp; Developer
                    </p>
                    <p className="text-sm font-semibold truncate">
                      {banner.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Milestone Badges */}
              <div className="absolute -top-3 -right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-pink-200 shadow-pastel-md text-xs font-semibold text-pink-700">
                <Award className="w-4 h-4 text-pink-500" />
                <span>3 Milestones</span>
              </div>

              <div className="absolute -bottom-3 -left-3 z-20 flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-indigo-200 shadow-pastel-md text-xs font-semibold text-indigo-700">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Academic Journey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
