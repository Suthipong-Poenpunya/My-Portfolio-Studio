import React, { useState, useEffect } from 'react';
import { PortfolioData, EducationLevel } from './types';
import { DEFAULT_PORTFOLIO_DATA, LOCAL_STORAGE_KEY } from './data/defaultData';
import { TopActionBar } from './components/TopActionBar';
import { SplitHeroBanner } from './components/SplitHeroBanner';
import { EducationSection } from './components/EducationSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { DetailModal } from './components/DetailModal';
import { EditModal } from './components/EditModal';
import { EmbedCodeModal } from './components/EmbedCodeModal';
import { Footer } from './components/Footer';

export default function App() {
  // Load data with localStorage fallback
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure education array has 3 levels and clean migration from old placeholder
        if (
          parsed &&
          parsed.banner &&
          parsed.banner.name &&
          !parsed.banner.name.includes('Kanyakon') &&
          Array.isArray(parsed.education) &&
          parsed.education.length === 3
        ) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data:', e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalTab, setEditModalTab] = useState(0);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [selectedDetailLevel, setSelectedDetailLevel] = useState<EducationLevel | null>(null);

  // Update document title when name changes
  useEffect(() => {
    if (portfolioData.banner.name) {
      document.title = `${portfolioData.banner.name} • Education Portfolio`;
    }
  }, [portfolioData.banner.name]);

  // Save changes to state & localStorage
  const handleSaveData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // Reset to template defaults
  const handleResetDefault = () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  // Open Edit modal with specific tab
  const handleOpenEditModal = (tabIndex: number = 0) => {
    setEditModalTab(tabIndex);
    setIsEditModalOpen(true);
  };

  // Smooth scroll down to education journey section
  const handleScrollToEducation = () => {
    const el = document.getElementById('education-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf8fc] text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      {/* Ambient background soft pastel gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-purple-200/35 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pink-200/35 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-indigo-200/25 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Action Bar */}
        <TopActionBar
          onOpenEditModal={() => handleOpenEditModal(0)}
          onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        />

        {/* Split Hero Top Banner */}
        <main className="flex-1">
          <SplitHeroBanner
            banner={portfolioData.banner}
            onOpenEditModal={handleOpenEditModal}
            onScrollToEducation={handleScrollToEducation}
          />

          {/* Exactly 3 Education Levels Section */}
          <EducationSection
            education={portfolioData.education}
            onSelectLevel={(level) => setSelectedDetailLevel(level)}
            onOpenEditModal={(tabIndex) => handleOpenEditModal(tabIndex)}
          />

          {/* Featured Projects from Suthipong's Portfolio */}
          {portfolioData.projects && portfolioData.projects.length > 0 && (
            <ProjectsShowcase projects={portfolioData.projects} />
          )}
        </main>

        {/* Footer */}
        <Footer
          studentName={portfolioData.banner.name}
          onOpenEditModal={() => handleOpenEditModal(0)}
          onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        />
      </div>

      {/* Detail Inspection Modal */}
      <DetailModal
        isOpen={!!selectedDetailLevel}
        onClose={() => setSelectedDetailLevel(null)}
        selectedLevel={selectedDetailLevel}
        educationList={portfolioData.education}
        onSelectLevel={(level) => setSelectedDetailLevel(level)}
      />

      {/* In-App "Edit Content" Tabbed Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        initialTab={editModalTab}
        data={portfolioData}
        onSave={handleSaveData}
        onResetDefault={handleResetDefault}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Google Sites Embed Code Modal */}
      <EmbedCodeModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />
    </div>
  );
}
