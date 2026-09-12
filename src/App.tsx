import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PageViewer } from './components/PageViewer';
import { SearchModal } from './components/SearchModal';
import { TableOfContentsModal } from './components/TableOfContentsModal';
import { PrintBook } from './components/PrintBook';
import { ALL_BOOK_PAGES } from './data/pageNavigation';
import { BookTheme, FontSize } from './types';
import { toggleAmbientSound, playPageFlipSound } from './utils/audioSynth';
import { Heart, BookOpen, Search, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [theme, setTheme] = useState<BookTheme>('paper');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTOCOpen, setIsTOCOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('mestra_lin_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mestra_lin_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Storage restriction fallback
    }
  }, [bookmarks]);

  // Keyboard navigation (Arrow keys left/right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchOpen || isTOCOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, isSearchOpen, isTOCOpen]);

  const goToNextPage = () => {
    if (currentPageIndex < ALL_BOOK_PAGES.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
      playPageFlipSound();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      playPageFlipSound();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPageIndex = (index: number) => {
    if (index >= 0 && index < ALL_BOOK_PAGES.length) {
      setCurrentPageIndex(index);
      playPageFlipSound();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBookmark = (recipeId: number) => {
    setBookmarks(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleToggleAudio = () => {
    const playing = toggleAmbientSound((state) => setIsPlayingAudio(state));
    setIsPlayingAudio(playing);
  };

  const currentPage = ALL_BOOK_PAGES[currentPageIndex];

  // Theme background styles
  const bgThemeClasses = {
    paper: 'bg-[#F2ECE1] text-[#3B2F2F]',
    sepia: 'bg-[#EADBC8] text-[#3D2C1D]',
    night: 'bg-[#15110E] text-[#E5DCD5]'
  }[theme];

  return (
    <div className={`min-h-screen flex flex-col font-serif transition-colors duration-300 print:bg-white ${bgThemeClasses}`}>
      
      {/* Screen Reader Header Bar */}
      <div className="print:hidden">
        <Header
          currentPageIndex={currentPageIndex}
          totalPages={ALL_BOOK_PAGES.length}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          theme={theme}
          onChangeTheme={setTheme}
          fontSize={fontSize}
          onChangeFontSize={setFontSize}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenTOC={() => setIsTOCOpen(true)}
          onPrint={() => window.print()}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-4 px-2 sm:px-4 print:py-0">
        <PageViewer
          pageNav={currentPage}
          theme={theme}
          fontSize={fontSize}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          onGoToPage={handleSelectPageIndex}
        />
      </main>

      {/* Bottom Floating Navigation Controls (Mobile & Desktop) */}
      <div className="print:hidden sticky bottom-3 z-30 max-w-lg mx-auto px-3 my-2">
        <div className="bg-[#1C1815]/95 text-white border border-[#3A3028] backdrop-blur-md rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-1 sm:gap-2">
          
          <button
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-xs font-serif font-bold transition-all min-h-[48px]"
            title="Previous Page"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-amber-200" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsTOCOpen(true)}
              className="p-2.5 rounded-xl hover:bg-white/10 text-amber-200 transition-colors min-h-[48px] min-w-[44px] flex items-center justify-center"
              title="Table of Contents"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl hover:bg-white/10 text-amber-200 transition-colors min-h-[48px] min-w-[44px] flex items-center justify-center"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsTOCOpen(true)}
              className="p-2.5 rounded-xl hover:bg-white/10 text-amber-200 transition-colors relative min-h-[48px] min-w-[44px] flex items-center justify-center"
              title="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#8C3A2B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            <span className="text-[11px] font-mono text-amber-200/90 font-bold px-1 sm:hidden">
              {currentPageIndex + 1}/{ALL_BOOK_PAGES.length}
            </span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === ALL_BOOK_PAGES.length - 1}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#8C3A2B] hover:bg-[#A34534] disabled:opacity-30 disabled:pointer-events-none text-xs font-serif font-bold transition-all text-white shadow-md min-h-[48px]"
            title="Next Page"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Screen Reader Footer */}
      <footer className="print:hidden py-6 border-t border-black/10 dark:border-white/10 text-center text-xs font-serif opacity-70">
        <p className="flex items-center justify-center gap-1">
          Crafted with care and devotion by <span className="font-bold text-[#8C3A2B]">Master Lin</span> <Heart className="w-3.5 h-3.5 fill-[#8C3A2B] text-[#8C3A2B]" />
        </p>
        <p className="text-[11px] mt-1 opacity-75">
          100 Traditional Recipes Inspired by Eastern Wisdom for Everyday Wellness
        </p>
      </footer>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPageIndex={handleSelectPageIndex}
      />

      {/* Table of Contents Modal */}
      <TableOfContentsModal
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        onSelectPageIndex={handleSelectPageIndex}
        bookmarks={bookmarks}
      />

      {/* Printable PDF View */}
      <PrintBook />
    </div>
  );
}
