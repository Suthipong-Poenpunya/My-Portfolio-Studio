import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  School, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Tag
} from 'lucide-react';
import { EducationLevel } from '../types';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLevel: EducationLevel | null;
  educationList: EducationLevel[];
  onSelectLevel: (level: EducationLevel) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  selectedLevel,
  educationList,
  onSelectLevel,
}) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!selectedLevel) return;
      
      const currentIndex = educationList.findIndex(e => e.id === selectedLevel.id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectLevel(educationList[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < educationList.length - 1) {
        onSelectLevel(educationList[currentIndex + 1]);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, selectedLevel, educationList, onSelectLevel]);

  if (!isOpen || !selectedLevel) return null;

  const currentIndex = educationList.findIndex((item) => item.id === selectedLevel.id);
  const prevLevel = currentIndex > 0 ? educationList[currentIndex - 1] : null;
  const nextLevel = currentIndex < educationList.length - 1 ? educationList[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      <div 
        id="detail-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="detail-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto"
        >
          {/* Top Bar with Navigation & Close */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-b border-purple-100/80">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-purple-600" />
                {selectedLevel.buttonLabel} ({selectedLevel.levelNumber})
              </span>
              <span className="text-xs text-slate-400">
                {currentIndex + 1} จาก {educationList.length} ระดับ
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Previous Milestone */}
              <button
                type="button"
                disabled={!prevLevel}
                onClick={() => prevLevel && onSelectLevel(prevLevel)}
                title={prevLevel ? `ก่อนหน้า: ${prevLevel.buttonLabel}` : 'ระดับแรกแล้ว'}
                className="p-1.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-100/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Milestone */}
              <button
                type="button"
                disabled={!nextLevel}
                onClick={() => nextLevel && onSelectLevel(nextLevel)}
                title={nextLevel ? `ถัดไป: ${nextLevel.buttonLabel}` : 'ระดับสุดท้ายแล้ว'}
                className="p-1.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-100/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                id="btn-close-detail-modal"
                type="button"
                onClick={onClose}
                className="ml-2 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body with Scroll */}
          <div className="max-h-[80vh] overflow-y-auto">
            {/* Full-size cover image */}
            <div className="relative h-60 sm:h-72 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedLevel.image}
                alt={selectedLevel.schoolName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-pink-200">
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                    <Calendar className="w-3 h-3 text-pink-300" />
                    {selectedLevel.years}
                  </span>
                  <span>{selectedLevel.levelName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedLevel.schoolName}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Faculty / Major Box */}
              {selectedLevel.faculty && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50/50 to-indigo-50/40 border border-purple-100 flex items-start gap-3">
                  <School className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold uppercase text-purple-700">
                      คณะ / แผนการศึกษา (Faculty / Major)
                    </span>
                    <p className="text-base font-bold text-slate-900 mt-0.5">
                      {selectedLevel.faculty}
                    </p>
                  </div>
                </div>
              )}

              {/* GPA & Honors */}
              {(selectedLevel.gpa || selectedLevel.honors) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedLevel.gpa && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium">ผลการศึกษา</span>
                        <p className="text-sm font-bold text-slate-900">{selectedLevel.gpa}</p>
                      </div>
                    </div>
                  )}

                  {selectedLevel.honors && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium">เกียรติประวัติ / ทุนการศึกษา</span>
                        <p className="text-sm font-bold text-slate-900 truncate">{selectedLevel.honors}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>รายละเอียดและประสบการณ์การเรียนรู้</span>
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-purple-50 shadow-sm">
                  {selectedLevel.fullDescription || selectedLevel.description}
                </p>
              </div>

              {/* Key Achievements Checklist */}
              {selectedLevel.achievements && selectedLevel.achievements.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-pink-600" />
                    <span>ผลงานและกิจกรรมเด่น (Key Achievements)</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedLevel.achievements.map((achievement, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/40 border border-purple-100/70 text-xs sm:text-sm text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Tags */}
              {selectedLevel.skills && selectedLevel.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    <span>ทักษะที่ได้รับการฝึกฝน (Skills &amp; Competencies)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLevel.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 shadow-sm"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Navigation between Milestones */}
          <div className="px-6 py-4 bg-slate-50 border-t border-purple-100 flex items-center justify-between">
            <button
              type="button"
              disabled={!prevLevel}
              onClick={() => prevLevel && onSelectLevel(prevLevel)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ระดับก่อนหน้า</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-pastel-sm transition-all cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>

            <button
              type="button"
              disabled={!nextLevel}
              onClick={() => nextLevel && onSelectLevel(nextLevel)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span>ระดับถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
