import React from 'react';
import { 
  Search, 
  List, 
  Volume2, 
  VolumeX, 
  Printer, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon,
  Type
} from 'lucide-react';
import { BookTheme, FontSize } from '../types';

interface HeaderProps {
  currentPageIndex: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  theme: BookTheme;
  onChangeTheme: (theme: BookTheme) => void;
  fontSize: FontSize;
  onChangeFontSize: (size: FontSize) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onOpenSearch: () => void;
  onOpenTOC: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPageIndex,
  totalPages,
  onPrevPage,
  onNextPage,
  theme,
  onChangeTheme,
  fontSize,
  onChangeFontSize,
  isPlayingAudio,
  onToggleAudio,
  onOpenSearch,
  onOpenTOC,
  onPrint
}) => {
  const isDark = theme === 'night';

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors shadow-sm ${
      theme === 'paper'
        ? 'bg-[#F9F6F0]/95 border-[#E2D5C3] text-[#1F2937]'
        : theme === 'sepia'
        ? 'bg-[#F3EAD8]/95 border-[#D8C7B0] text-[#1A0F07]'
        : 'bg-[#1C1815]/95 border-[#332A24] text-[#EAE3DC]'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        
        {/* Left: Brand & TOC */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenTOC}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold border transition-all min-h-[44px] ${
              isDark
                ? 'bg-[#2A231E] border-[#443830] hover:bg-[#382E28] text-[#EAE3DC]'
                : 'bg-white border-[#D8C7B5] hover:bg-[#EFE7DC] text-[#1F2937]'
            }`}
            title="Open Table of Contents"
          >
            <List className="w-5 h-5 text-[#8C3A2B] shrink-0" />
            <span className="hidden sm:inline">Contents</span>
          </button>

          <button
            onClick={onOpenSearch}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold border transition-all flex items-center gap-1.5 min-h-[44px] ${
              isDark
                ? 'bg-[#2A231E] border-[#443830] hover:bg-[#382E28] text-[#EAE3DC]'
                : 'bg-white border-[#D8C7B5] hover:bg-[#EFE7DC] text-[#1F2937]'
            }`}
            title="Search the Book"
          >
            <Search className="w-4 h-4 text-[#8C3A2B] shrink-0" />
            <span className="hidden md:inline text-xs sm:text-sm text-[#1F2937] dark:text-[#EAE3DC]">Search...</span>
          </button>
        </div>

        {/* Center: Title & Page Control */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={onPrevPage}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-xl hover:bg-black/10 disabled:opacity-30 disabled:pointer-events-none transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Previous Page"
          >
            <ChevronLeft className="w-6 h-6 text-[#8C3A2B]" />
          </button>

          <div className="text-center">
            <h1 className="font-serif font-bold text-xs sm:text-sm tracking-tight line-clamp-1 max-w-[150px] sm:max-w-xs md:max-w-md">
              Ancient Secrets of Chinese Medicine
            </h1>
            <p className="text-[11px] font-serif font-semibold opacity-90">
              Page <span className="font-bold text-[#8C3A2B] text-xs">{currentPageIndex + 1}</span> of {totalPages}
            </p>
          </div>

          <button
            onClick={onNextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="p-2 rounded-xl hover:bg-black/10 disabled:opacity-30 disabled:pointer-events-none transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Next Page"
          >
            <ChevronRight className="w-6 h-6 text-[#8C3A2B]" />
          </button>
        </div>

        {/* Right: Controls & Preferences */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio Ambient Switcher */}
          <button
            onClick={onToggleAudio}
            className={`p-2.5 rounded-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isPlayingAudio
                ? 'bg-[#8C3A2B] text-white border-[#8C3A2B] animate-pulse'
                : isDark
                ? 'bg-[#2A231E] border-[#443830] text-[#EAE3DC] hover:text-white'
                : 'bg-white border-[#D8C7B5] text-[#1F2937] hover:bg-[#EFE7DC]'
            }`}
            title={isPlayingAudio ? "Pause Ambient Music" : "Play Relaxing Ambient Music (Guqin & Water)"}
          >
            {isPlayingAudio ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-[#8C3A2B]" />}
          </button>

          {/* Mobile Theme & Font Size Quick Toggles */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              onClick={() => {
                const themes: BookTheme[] = ['paper', 'sepia', 'night'];
                const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
                onChangeTheme(themes[nextIdx]);
              }}
              className={`p-2 rounded-xl border text-xs font-serif font-bold transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isDark
                  ? 'bg-[#2A231E] border-[#443830] text-[#EAE3DC]'
                  : 'bg-white border-[#D8C7B5] text-[#1F2937]'
              }`}
              title="Toggle Theme (Rice Paper, Sepia, Night)"
            >
              {theme === 'paper' && <Sun className="w-4 h-4 text-amber-700" />}
              {theme === 'sepia' && <span className="font-bold text-amber-900 text-xs">Sepia</span>}
              {theme === 'night' && <Moon className="w-4 h-4 text-amber-200" />}
            </button>

            <button
              onClick={() => {
                const sizes: FontSize[] = ['sm', 'md', 'lg', 'xl'];
                const nextIdx = (sizes.indexOf(fontSize) + 1) % sizes.length;
                onChangeFontSize(sizes[nextIdx]);
              }}
              className={`px-2.5 py-2 rounded-xl border font-mono font-bold text-xs uppercase transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isDark
                  ? 'bg-[#2A231E] border-[#443830] text-[#EAE3DC]'
                  : 'bg-white border-[#D8C7B5] text-[#8C3A2B]'
              }`}
              title="Font Size"
            >
              <Type className="w-3.5 h-3.5 mr-0.5" />
              <span>{fontSize.toUpperCase()}</span>
            </button>
          </div>

          {/* Desktop Theme Selector */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10">
            <button
              onClick={() => onChangeTheme('paper')}
              className={`p-2 rounded-lg text-xs font-serif font-bold transition-colors ${
                theme === 'paper' ? 'bg-white shadow-sm text-[#1F2937]' : 'opacity-70 hover:opacity-100'
              }`}
              title="Rice Paper"
            >
              <Sun className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={() => onChangeTheme('sepia')}
              className={`p-2 rounded-lg text-xs font-serif font-bold transition-colors ${
                theme === 'sepia' ? 'bg-[#EADBC8] shadow-sm text-[#1A0F07]' : 'opacity-70 hover:opacity-100'
              }`}
              title="Warm Sepia"
            >
              <span className="font-bold text-xs">A</span>
            </button>
            <button
              onClick={() => onChangeTheme('night')}
              className={`p-2 rounded-lg text-xs font-serif font-bold transition-colors ${
                theme === 'night' ? 'bg-[#332A24] text-white shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
              title="Night Mode"
            >
              <Moon className="w-4 h-4 text-amber-200" />
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="hidden md:flex items-center gap-1 p-0.5 rounded-xl border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10">
            <Type className="w-4 h-4 ml-1 opacity-70" />
            {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((size) => (
              <button
                key={size}
                onClick={() => onChangeFontSize(size)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase transition-colors min-h-[36px] ${
                  fontSize === size ? 'bg-[#8C3A2B] text-white' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Print / Export */}
          <button
            onClick={onPrint}
            className={`p-2.5 rounded-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDark
                ? 'bg-[#2A231E] border-[#443830] text-[#EAE3DC] hover:text-white'
                : 'bg-white border-[#D8C7B5] text-[#1F2937] hover:bg-[#EFE7DC]'
            }`}
            title="Print or Save Book as PDF"
          >
            <Printer className="w-5 h-5 text-[#8C3A2B]" />
          </button>
        </div>
      </div>
    </header>
  );
};
