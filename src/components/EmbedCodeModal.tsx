import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Code2, Globe, ExternalLink, Sparkles, Monitor, Smartphone } from 'lucide-react';

interface EmbedCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<'960' | '750' | '1200'>('960');
  const [roundedCorner, setRoundedCorner] = useState(true);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://your-portfolio-url.web.app';
  const iframeCode = `<iframe \n  src="${currentUrl}" \n  width="100%" \n  height="${selectedHeight}" \n  style="border:none; ${roundedCorner ? 'border-radius:24px; box-shadow:0 10px 30px rgba(120,80,220,0.12);' : ''} width:100%; display:block;" \n  title="Education Portfolio" \n  allow="clipboard-write" \n  loading="lazy">\n</iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <AnimatePresence>
      <div 
        id="embed-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="embed-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-pink-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  โค้ดฝังสำหรับ Google Sites (Embed Code)
                </h3>
                <p className="text-xs text-slate-500">
                  พร้อมใช้งาน นำไปวางใน Google Sites หรือเว็บไซต์อื่นๆ ได้ทันที
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Options */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span>ความสูงที่แนะนำ:</span>
                <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectedHeight('750')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${selectedHeight === '750' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    กะทัดรัด (750px)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHeight('960')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${selectedHeight === '960' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    มาตรฐาน (960px)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHeight('1200')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${selectedHeight === '1200' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    เต็มหน้า (1200px)
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={roundedCorner}
                  onChange={(e) => setRoundedCorner(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-400"
                />
                <span>ขอบมน + เงาซอฟต์การ์ด</span>
              </label>
            </div>

            {/* Code Box */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-t-2xl text-xs text-slate-300 font-mono">
                <span>HTML iframe code</span>
                <button
                  id="btn-copy-iframe-snippet"
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-purple-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'คัดลอกเรียบร้อย!' : 'คลิกเพื่อคัดลอก'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={5}
                value={iframeCode}
                className="w-full p-4 bg-slate-900 text-purple-200 font-mono text-xs rounded-b-2xl border-0 focus:ring-0 leading-relaxed select-all"
              />
            </div>

            {/* 3 Step Guide for Google Sites */}
            <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-2.5">
              <h4 className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>วิธีนำไปวางใน Google Sites ง่ายๆ 3 ขั้นตอน:</span>
              </h4>
              <ol className="text-xs text-slate-600 space-y-1.5 pl-5 list-decimal font-medium">
                <li>เปิดหน้าเว็บแก้ไข <strong>Google Sites</strong> ของคุณ</li>
                <li>ไปที่แถบขวามือ เลือกเมนู <strong>"แทรก (Insert)" &gt; "ฝัง (Embed)"</strong></li>
                <li>คลิกเลือกแท็บ <strong>"โค้ดฝัง (Embed code)"</strong> แล้ววางโค้ดด้านบน จากนั้นกด <strong>"ถัดไป" &gt; "แทรก"</strong></li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-purple-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              * รองรับการแสดงผลทุกหน้าจอทั้ง PC, แท็บเล็ต และสมาร์ตโฟน
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-pastel-sm'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอกโค้ดฝัง'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
