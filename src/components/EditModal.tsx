import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Upload, 
  Link, 
  Trash2, 
  Image as ImageIcon, 
  User, 
  School, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';
import { PortfolioData, EducationLevel } from '../types';

interface EditModalProps {
  isOpen: boolean;
  initialTab?: number;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onResetDefault: () => void;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  initialTab = 0,
  data,
  onSave,
  onResetDefault,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<number>(initialTab);
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal opens or initialTab changes
  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setActiveTab(initialTab);
      setSaveSuccess(false);
    }
  }, [isOpen, initialTab, data]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // File upload handler converting image to Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'banner' | number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Guard max file size ~ 3MB for localStorage safety
    if (file.size > 4 * 1024 * 1024) {
      alert('ขนาดไฟล์รูปภาพเกิน 4MB กรุณาเลือกรูปภาพขนาดเล็กลงหรือใช้ URL แทน');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'banner') {
        setFormData((prev) => ({
          ...prev,
          banner: { ...prev.banner, image: result },
        }));
      } else {
        setFormData((prev) => {
          const newEdu = [...prev.education];
          newEdu[target] = { ...newEdu[target], image: result };
          return { ...prev, education: newEdu };
        });
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value
    e.target.value = '';
  };

  const handleEducationChange = (
    index: number,
    field: keyof EducationLevel,
    value: any
  ) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  const tabs = [
    { id: 0, label: 'แบนเนอร์ (Banner)', icon: User },
    { id: 1, label: `ระดับ 1: ${formData.education[0]?.buttonLabel || 'ประถม'}`, icon: School },
    { id: 2, label: `ระดับ 2: ${formData.education[1]?.buttonLabel || 'มัธยม'}`, icon: School },
    { id: 3, label: `ระดับ 3: ${formData.education[2]?.buttonLabel || 'มหาวิทยาลัย'}`, icon: School },
  ];

  return (
    <AnimatePresence>
      <div 
        id="edit-content-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="edit-content-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-purple-100 flex flex-col max-h-[90vh] overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50/70 via-white to-pink-50/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  แก้ไขข้อมูลพอร์ตโฟลิโอ (Edit Content)
                </h3>
                <p className="text-xs text-slate-500">
                  ปรับเปลี่ยนข้อความ รูปภาพ และชื่อปุ่มได้ทันที ระบบจะบันทึกลงเบราว์เซอร์ (localStorage) โดยอัตโนมัติ
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

          {/* Navigation Tabs */}
          <div className="flex border-b border-purple-100 bg-slate-50/80 px-4 sm:px-6 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`edit-tab-${tab.id}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-purple-600 text-purple-700 bg-white rounded-t-xl'
                      : 'border-transparent text-slate-500 hover:text-purple-600 hover:bg-purple-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: BANNER EDIT */}
            {activeTab === 0 && (
              <div id="form-tab-banner" className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      ชื่อ-นามสกุล (Personal Name) *
                    </label>
                    <input
                      id="input-banner-name"
                      type="text"
                      value={formData.banner.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          banner: { ...prev.banner, name: e.target.value },
                        }))
                      }
                      placeholder="เช่น Kanyakon Hengliang หรือ กัญญาภัค เฮงเหลียง"
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                    />
                  </div>

                  {/* Badge Text */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      ข้อความป้ายกำกับด้านบน (Badge)
                    </label>
                    <input
                      id="input-banner-badge"
                      type="text"
                      value={formData.banner.badge}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          banner: { ...prev.banner, badge: e.target.value },
                        }))
                      }
                      placeholder="เช่น PORTFOLIO • EDUCATION"
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    คำโปรยหัวเรื่อง (Subtitle) *
                  </label>
                  <textarea
                    id="input-banner-subtitle"
                    rows={2}
                    value={formData.banner.subtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        banner: { ...prev.banner, subtitle: e.target.value },
                      }))
                    }
                    placeholder="เช่น Developer & Educational Technologist • I create innovative educational technology solutions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all resize-none"
                  />
                </div>

                {/* Social & Contact Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      GitHub URL
                    </label>
                    <input
                      id="input-banner-github"
                      type="url"
                      value={formData.banner.github || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          banner: { ...prev.banner, github: e.target.value },
                        }))
                      }
                      placeholder="เช่น https://github.com/Suthipong-Poenpunya"
                      className="w-full px-4 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      LinkedIn URL
                    </label>
                    <input
                      id="input-banner-linkedin"
                      type="url"
                      value={formData.banner.linkedin || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          banner: { ...prev.banner, linkedin: e.target.value },
                        }))
                      }
                      placeholder="เช่น https://www.linkedin.com/in/..."
                      className="w-full px-4 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Email
                    </label>
                    <input
                      id="input-banner-email"
                      type="email"
                      value={formData.banner.email || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          banner: { ...prev.banner, email: e.target.value },
                        }))
                      }
                      placeholder="เช่น suthipong7754@gmail.com"
                      className="w-full px-4 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      เบอร์โทรศัพท์ (Phone)
                    </label>
                    <input
                      id="input-banner-phone"
                      type="text"
                      value={formData.banner.phone || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          banner: { ...prev.banner, phone: e.target.value },
                        }))
                      }
                      placeholder="เช่น 0623525681"
                      className="w-full px-4 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                </div>

                {/* Banner Image Control */}
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-purple-600" />
                      <span>รูปภาพแบนเนอร์ (Banner Showcase Image)</span>
                    </label>
                    {formData.banner.image && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            banner: { ...prev.banner, image: '' },
                          }))
                        }
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ลบรูปภาพ</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Thumbnail Preview */}
                    <div className="relative w-36 h-28 rounded-xl overflow-hidden bg-white border border-purple-200 shadow-sm flex-shrink-0">
                      {formData.banner.image ? (
                        <img
                          src={formData.banner.image}
                          alt="Banner Preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[11px] p-2 text-center bg-slate-50">
                          <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                          <span>ไม่มีรูปภาพ</span>
                        </div>
                      )}
                    </div>

                    {/* Image Controls: Upload or URL */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-xl text-xs font-semibold text-purple-700 cursor-pointer shadow-sm transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>อัปโหลดรูปจากเครื่อง (Upload File)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'banner')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="relative">
                        <Link className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          id="input-banner-image-url"
                          type="url"
                          value={formData.banner.image}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              banner: { ...prev.banner, image: e.target.value },
                            }))
                          }
                          placeholder="หรือวาง URL รูปภาพ (https://...)"
                          className="w-full pl-9 pr-4 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TABS 2, 3, 4: EDUCATION 1, 2, 3 */}
            {activeTab >= 1 && activeTab <= 3 && (() => {
              const eduIndex = activeTab - 1;
              const edu = formData.education[eduIndex];
              if (!edu) return null;

              return (
                <div id={`form-tab-education-${eduIndex}`} className="space-y-5">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-purple-900 font-medium">
                    กำลังแก้ไขข้อมูลระดับ: <strong className="font-bold text-purple-950">{edu.levelName}</strong> ({edu.levelNumber})
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Button Name / Label */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        ชื่อปุ่ม / ป้ายกำกับ (Button Label) *
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-buttonLabel`}
                        type="text"
                        value={edu.buttonLabel}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'buttonLabel', e.target.value)
                        }
                        placeholder="เช่น ประถมศึกษา หรือ Elementary School"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>

                    {/* Education Level Title */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        ระดับการศึกษา (Education Level) *
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-levelName`}
                        type="text"
                        value={edu.levelName}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'levelName', e.target.value)
                        }
                        placeholder="เช่น ระดับประถมศึกษา (Elementary School)"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* School / University Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        ชื่อสถานศึกษา / มหาวิทยาลัย (School Name) *
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-schoolName`}
                        type="text"
                        value={edu.schoolName}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'schoolName', e.target.value)
                        }
                        placeholder="เช่น มหาวิทยาลัยเกษตรศาสตร์ หรือ โรงเรียนชลกันยานุกูล"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>

                    {/* Years */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        ปีการศึกษา (Years Attended) *
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-years`}
                        type="text"
                        value={edu.years}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'years', e.target.value)
                        }
                        placeholder="เช่น 2560 – 2566 หรือ 2020 – 2024"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Faculty / Major */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        คณะ / สาขาวิชา / แผนการเรียน (Faculty / Major)
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-faculty`}
                        type="text"
                        value={edu.faculty}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'faculty', e.target.value)
                        }
                        placeholder="เช่น คณะเทคโนโลยีสารสนเทศ สาขาวิชาวิทยาการคอมพิวเตอร์"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>

                    {/* Details Button Text */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        ข้อความปุ่มดูรายละเอียด (Details Button Text) *
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-detailsButtonText`}
                        type="text"
                        value={edu.detailsButtonText}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'detailsButtonText', e.target.value)
                        }
                        placeholder="เช่น ดูรายละเอียดเพิ่มเติม หรือ View Details"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* GPA and Honors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        เกรดเฉลี่ย (GPA)
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-gpa`}
                        type="text"
                        value={edu.gpa}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'gpa', e.target.value)
                        }
                        placeholder="เช่น เกรดเฉลี่ย 3.95 / 4.00"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        เกียรตินิยม / ทุนการศึกษา (Honors)
                      </label>
                      <input
                        id={`input-edu-${eduIndex}-honors`}
                        type="text"
                        value={edu.honors}
                        onChange={(e) =>
                          handleEducationChange(eduIndex, 'honors', e.target.value)
                        }
                        placeholder="เช่น เกียรตินิยมอันดับ 1 / นักเรียนทุนเรียนดี"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      คำอธิบายสั้นบนการ์ด (Description) *
                    </label>
                    <textarea
                      id={`input-edu-${eduIndex}-description`}
                      rows={2}
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(eduIndex, 'description', e.target.value)
                      }
                      placeholder="สรุปกิจกรรมหรือความสนใจหลัก..."
                      className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Full Description for Inspection Modal */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      คำอธิบายแบบละเอียดในหน้าต่างป๊อปอัพ (Full Description for Modal)
                    </label>
                    <textarea
                      id={`input-edu-${eduIndex}-fullDescription`}
                      rows={3}
                      value={edu.fullDescription}
                      onChange={(e) =>
                        handleEducationChange(eduIndex, 'fullDescription', e.target.value)
                      }
                      placeholder="รายละเอียดเชิงลึก ประสบการณ์และองค์ความรู้ที่ได้รับ..."
                      className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm transition-all"
                    />
                  </div>

                  {/* Education Image Upload / URL */}
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-purple-600" />
                        <span>รูปภาพสถานศึกษา (Cover Photo)</span>
                      </label>
                      {edu.image && (
                        <button
                          type="button"
                          onClick={() => handleEducationChange(eduIndex, 'image', '')}
                          className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>ลบรูปภาพ</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      {/* Thumbnail Preview */}
                      <div className="relative w-36 h-28 rounded-xl overflow-hidden bg-white border border-purple-200 shadow-sm flex-shrink-0">
                        {edu.image ? (
                          <img
                            src={edu.image}
                            alt="Preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[11px] p-2 text-center bg-slate-50">
                            <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                            <span>ไม่มีรูปภาพ</span>
                          </div>
                        )}
                      </div>

                      {/* Image Controls */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-xl text-xs font-semibold text-purple-700 cursor-pointer shadow-sm transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>อัปโหลดรูปภาพใหม่ (Upload File)</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, eduIndex)}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="relative">
                          <Link className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id={`input-edu-${eduIndex}-image-url`}
                            type="url"
                            value={edu.image}
                            onChange={(e) =>
                              handleEducationChange(eduIndex, 'image', e.target.value)
                            }
                            placeholder="หรือวาง URL รูปภาพ (https://...)"
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-purple-200 text-xs focus:ring-2 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Reset to defaults */}
            <button
              id="btn-reset-default-content"
              type="button"
              onClick={() => {
                if (window.confirm('คุณต้องการคืนค่าเริ่มต้นของเทมเพลตทั้งหมดหรือไม่?')) {
                  onResetDefault();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>คืนค่าเริ่มต้น (Reset Default)</span>
            </button>

            {/* Cancel & Save */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                id="btn-cancel-edit-content"
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ยกเลิก (Cancel)
              </button>

              <button
                id="btn-save-content"
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xs font-bold shadow-pastel-md hover:shadow-pastel-lg active:scale-95 transition-all cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>บันทึกเรียบร้อย!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>บันทึกการเปลี่ยนแปลง (Save Changes)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
