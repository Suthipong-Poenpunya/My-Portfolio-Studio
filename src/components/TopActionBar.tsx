import React, { useState } from 'react';
import { Sparkles, Code2, Edit3, Check, Globe } from 'lucide-react';

interface TopActionBarProps {
  onOpenEditModal: () => void;
  onOpenEmbedModal: () => void;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({
  onOpenEditModal,
  onOpenEmbedModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleQuickCopyEmbed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentUrl = window.location.href;
    const iframeCode = `<iframe src="${currentUrl}" width="100%" height="960" style="border:0; border-radius:24px; box-shadow:0 12px 36px rgba(120,80,220,0.12);" allowfullscreen loading="lazy"></iframe>`;
    
    navigator.clipboard.writeText(iframeCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }).catch(() => {
      // Fallback open the embed modal
      onOpenEmbedModal();
    });
  };

  return (
    <header className="w-full max-w-7xl mx-auto pt-4 pb-2 px-4 sm:px-6 lg:px-8">
      <div 
        id="top-action-bar-container"
        className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-md border border-purple-100/80 rounded-2xl shadow-pastel-sm transition-all"
      >
        {/* Left: Status Badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-medium text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Education Portfolio Template</span>
          </div>
          <span className="hidden md:inline-flex text-xs text-purple-600/80 items-center gap-1 font-normal">
            <Globe className="w-3.5 h-3.5 text-purple-500" />
            พร้อมใช้งานสำหรับนักศึกษา &amp; Google Sites
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Quick copy / open embed code */}
          <div className="flex items-center">
            <button
              id="btn-copy-embed-code"
              type="button"
              onClick={handleQuickCopyEmbed}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-indigo-50/90 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 border border-indigo-200/70 active:scale-95'
              }`}
              title="คลิกเพื่อคัดลอกโค้ด <iframe> สำหรับ Google Sites"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>คัดลอกแล้ว!</span>
                </>
              ) : (
                <>
                  <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>โค้ดฝัง Google Sites</span>
                </>
              )}
            </button>
            <button
              id="btn-open-embed-modal"
              type="button"
              onClick={onOpenEmbedModal}
              className="ml-1 px-2 py-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg text-xs font-semibold"
              title="ดูตัวอย่างการฝังและวิธีตั้งค่า"
            >
              แนะนำ
            </button>
          </div>

          {/* Edit Content Button */}
          <button
            id="btn-open-edit-modal-top"
            type="button"
            onClick={onOpenEditModal}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl text-xs font-medium shadow-pastel-sm hover:shadow-pastel-md active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>แก้ไขข้อมูล (Edit Content)</span>
            <Sparkles className="w-3 h-3 text-pink-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
