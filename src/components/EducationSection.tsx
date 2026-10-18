import React, { useState } from 'react';
import { 
  LayoutGrid, 
  GitCommit, 
  ListOrdered, 
  Maximize2, 
  GraduationCap, 
  Calendar, 
  Award, 
  Sparkles, 
  ChevronRight,
  School,
  BookMarked
} from 'lucide-react';
import { EducationLevel, ViewMode } from '../types';

interface EducationSectionProps {
  education: EducationLevel[];
  onSelectLevel: (level: EducationLevel) => void;
  onOpenEditModal: (tabIndex: number) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onSelectLevel,
  onOpenEditModal,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter education levels
  const filteredLevels = selectedFilter === 'all'
    ? education
    : education.filter((item) => item.id === selectedFilter);

  // Accent styling helper
  const getThemeStyles = (accent: 'sky' | 'purple' | 'rose') => {
    switch (accent) {
      case 'sky':
        return {
          badgeBg: 'bg-sky-500/90 text-white',
          cardBorder: 'hover:border-sky-300',
          tagBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500',
          gradientBtn: 'from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700',
          ring: 'ring-sky-200',
          glow: 'group-hover:shadow-sky-100',
        };
      case 'purple':
        return {
          badgeBg: 'bg-purple-600/90 text-white',
          cardBorder: 'hover:border-purple-300',
          tagBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500',
          gradientBtn: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
          ring: 'ring-purple-200',
          glow: 'group-hover:shadow-purple-100',
        };
      case 'rose':
      default:
        return {
          badgeBg: 'bg-rose-500/90 text-white',
          cardBorder: 'hover:border-rose-300',
          tagBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          gradientBtn: 'from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700',
          ring: 'ring-rose-200',
          glow: 'group-hover:shadow-rose-100',
        };
    }
  };

  return (
    <section id="education-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-8">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>เส้นทางการศึกษา • Chronological Pathway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            ประวัติการศึกษา (Education Journey)
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            บันทึกประสบการณ์และองค์ความรู้สำคัญตลอด 3 ระดับการศึกษา เพื่อสะท้อนการพัฒนาตนเองอย่างต่อเนื่อง
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex p-1 bg-white/90 border border-purple-100 rounded-2xl shadow-pastel-sm">
            <button
              id="view-mode-cards"
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>การ์ดภาพใหญ่ (3 Cards)</span>
            </button>

            <button
              id="view-mode-timeline"
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>ไทม์ไลน์ขั้นบันได</span>
            </button>

            <button
              id="view-mode-compact"
              type="button"
              onClick={() => setViewMode('compact')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>แบบย่อ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Level Selector (Pill Filter Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap mr-1">
          เลือกระดับ:
        </span>
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-purple-100'
          }`}
        >
          ทั้งหมด (3 ระดับ)
        </button>

        {education.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedFilter(item.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === item.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-pastel-sm'
                : 'bg-white hover:bg-purple-50 text-slate-700 border border-purple-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>{item.buttonLabel || item.schoolName}</span>
          </button>
        ))}
      </div>

      {/* VIEW 1: 3-COLUMN CARDS GRID (DEFAULT) */}
      {viewMode === 'cards' && (
        <div 
          id="education-cards-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredLevels.map((item, index) => {
            const styles = getThemeStyles(item.accentColor);
            const actualIndex = education.findIndex(e => e.id === item.id);
            return (
              <div
                key={item.id}
                id={`education-card-${item.id}`}
                className={`group relative flex flex-col rounded-3xl bg-white/95 backdrop-blur-md border border-purple-100/90 shadow-pastel-md hover:shadow-pastel-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden ${styles.cardBorder}`}
              >
                {/* Large Prominent Image (h-64) */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.schoolName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />

                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-black/20 pointer-events-none" />

                  {/* Overlays on Photo - Top-Left: Pill badge with customizable button label */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md ${styles.badgeBg}`}>
                      {item.buttonLabel}
                    </span>
                  </div>

                  {/* Overlays on Photo - Top-Right: Quick expand icon button */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      type="button"
                      onClick={() => onSelectLevel(item)}
                      title="ดูรายละเอียดแบบเต็ม"
                      className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Overlays on Photo - Bottom: Years attended & Level indicator */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white pointer-events-none">
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                      <Calendar className="w-3 h-3 text-pink-300" />
                      <span>{item.years}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-200 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                      {item.levelNumber}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Education Level Tag */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles.tagBg}`}>
                        <School className="w-3 h-3" />
                        <span>{item.levelName}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenEditModal(actualIndex + 1)}
                        className="text-[11px] text-purple-600 hover:text-purple-800 font-medium hover:underline cursor-pointer"
                      >
                        แก้ไขระดับนี้
                      </button>
                    </div>

                    {/* School / University Name */}
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-purple-900 transition-colors">
                      {item.schoolName}
                    </h3>

                    {/* Faculty / Major Box (Special highlight for University or major) */}
                    {item.faculty && (
                      <div className={`p-3 rounded-2xl border text-xs font-medium ${
                        item.id === 'university'
                          ? 'bg-rose-50/80 border-rose-200/80 text-rose-900 font-semibold'
                          : 'bg-purple-50/50 border-purple-100 text-purple-900'
                      }`}>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                          {item.id === 'university' ? 'คณะ / สาขาวิชา' : 'หลักสูตร / แผนการเรียน'}
                        </span>
                        <span>{item.faculty}</span>
                      </div>
                    )}

                    {/* Short Description */}
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-purple-50 space-y-3">
                    {/* GPA / Honors pill badge */}
                    {item.gpa && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/70">
                        <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span className="font-semibold">{item.gpa}</span>
                      </div>
                    )}

                    {/* Customizable Details Button */}
                    <button
                      type="button"
                      onClick={() => onSelectLevel(item)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${styles.gradientBtn} shadow-pastel-sm hover:shadow-pastel-md active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                      <span>{item.detailsButtonText || 'ดูรายละเอียดเพิ่มเติม'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: STEPPED TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div id="education-timeline-container" className="relative pl-6 sm:pl-8 space-y-12 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-sky-400 before:via-purple-500 before:to-rose-500 before:rounded-full">
          {filteredLevels.map((item, index) => {
            const styles = getThemeStyles(item.accentColor);
            return (
              <div key={item.id} className="relative group">
                {/* Stepped Numbered Node */}
                <div className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 border-white shadow-pastel-md flex items-center justify-center text-white text-xs font-bold ${styles.badgeBg} z-10 transition-transform group-hover:scale-110`}>
                  {index + 1}
                </div>

                <div className="ml-4 sm:ml-6 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-pastel-md hover:shadow-pastel-lg transition-all flex flex-col md:flex-row gap-6 items-start">
                  {/* Thumbnail */}
                  <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden flex-shrink-0 bg-purple-50 relative group/thumb">
                    <img
                      src={item.image}
                      alt={item.schoolName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[11px] text-white font-medium">
                      {item.years}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles.tagBg}`}>
                        {item.buttonLabel}
                      </span>
                      <span className="text-xs text-slate-500">• {item.levelName}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {item.schoolName}
                    </h3>

                    {item.faculty && (
                      <p className="text-sm font-semibold text-purple-900 bg-purple-50/70 px-3 py-1.5 rounded-xl inline-block border border-purple-100">
                        {item.faculty}
                      </p>
                    )}

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {item.gpa && (
                        <span className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                          {item.gpa}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => onSelectLevel(item)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl text-white bg-gradient-to-r ${styles.gradientBtn} shadow-sm transition-all cursor-pointer`}
                      >
                        <span>{item.detailsButtonText || 'ดูรายละเอียดเพิ่มเติม'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: COMPACT LIST VIEW */}
      {viewMode === 'compact' && (
        <div id="education-compact-list" className="space-y-4">
          {filteredLevels.map((item) => {
            const styles = getThemeStyles(item.accentColor);
            return (
              <div
                key={item.id}
                onClick={() => onSelectLevel(item)}
                className="group p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-pastel-sm hover:shadow-pastel-md hover:border-purple-200 transition-all flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.schoolName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${styles.tagBg}`}>
                        {item.buttonLabel}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.years}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 truncate">
                      {item.schoolName}
                    </h4>

                    <p className="text-xs text-slate-500 truncate max-w-md">
                      {item.faculty || item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="hidden sm:inline-block text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-100">
                    {item.detailsButtonText || 'ดูข้อมูล'}
                  </span>
                  <div className="p-2 rounded-xl bg-purple-50 group-hover:bg-purple-600 group-hover:text-white text-purple-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
