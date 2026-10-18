import React from 'react';
import { GraduationCap, Heart, Code2, Edit3, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  studentName: string;
  onOpenEditModal: () => void;
  onOpenEmbedModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  studentName,
  onOpenEditModal,
  onOpenEmbedModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 mt-12 border-t border-purple-100/80">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span>
            © {new Date().getFullYear()} <strong>{studentName}</strong> • Education Portfolio Template
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenEmbedModal}
            className="hover:text-purple-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>โค้ดฝัง Google Sites</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onOpenEditModal}
            className="hover:text-purple-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-pink-500" />
            <span>แก้ไขข้อมูล</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 rounded-lg bg-white border border-purple-100 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition-all cursor-pointer"
            title="กลับขึ้นด้านบน"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
