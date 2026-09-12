import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Share2, 
  Check, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Quote, 
  Heart, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  ChevronLeft,
  Info,
  ShieldAlert,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { BookTheme, FontSize, BookPageNavigation } from '../types';
import { PAGE_CONTENTS, CHAPTER_INTROS } from '../data/bookContent';
import { ALL_RECIPES } from '../data/recipesData';
import { ALL_BOOK_PAGES } from '../data/pageNavigation';
import { playChimeSound } from '../utils/audioSynth';
import { OptimizedBookCover } from './OptimizedBookCover';

interface PageViewerProps {
  pageNav: BookPageNavigation;
  theme: BookTheme;
  fontSize: FontSize;
  bookmarks: number[];
  onToggleBookmark: (recipeId: number) => void;
  onGoToPage: (pageIndex: number) => void;
}

export const PageViewer: React.FC<PageViewerProps> = ({
  pageNav,
  theme,
  fontSize,
  bookmarks,
  onToggleBookmark,
  onGoToPage
}) => {
  // Recipe portion scaling & timer state
  const [portionScale, setPortionScale] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Calculate scroll reading progress for recipe/page
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll progress on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollProgress(0);
  }, [pageNav.id]);

  // Font size class mapping - optimized for 45+ readers with high legibility
  const fontSizeClasses = {
    sm: 'text-base leading-relaxed sm:text-lg',
    md: 'text-lg leading-relaxed sm:text-xl',
    lg: 'text-xl leading-loose sm:text-2xl',
    xl: 'text-2xl leading-loose sm:text-3xl'
  }[fontSize];

  // Theme container classes with dark high-contrast fonts in light modes (#1F2937)
  const themeContainerClasses = {
    paper: 'bg-[#FAF7F2] text-[#1F2937] border-[#D8C7B5] shadow-xl',
    sepia: 'bg-[#F4EAD5] text-[#1A0F07] border-[#D8C7B0] shadow-xl',
    night: 'bg-[#221C18] text-[#E5DCD5] border-[#382E28] shadow-2xl'
  }[theme];

  // Heading color class per theme
  const headingColorClass = {
    paper: 'text-[#8C3A2B]',
    sepia: 'text-[#722E22]',
    night: 'text-[#E89282]'
  }[theme];

  // Subtitle / Muted text color per theme
  const subtitleColorClass = {
    paper: 'text-[#374151]',
    sepia: 'text-[#3B2613]',
    night: 'text-[#C5B7AD]'
  }[theme];

  // Recipe timer countdown effect
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playChimeSound();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const startSteepTimer = (minutes: number) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const currentRecipe = pageNav.recipeId 
    ? ALL_RECIPES.find(r => r.id === pageNav.recipeId) 
    : null;

  const isBookmarked = currentRecipe ? bookmarks.includes(currentRecipe.id) : false;

  const copyRecipeToClipboard = (recipeText: string) => {
    navigator.clipboard.writeText(recipeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-2 sm:my-8 px-1 sm:px-6 relative">
      
      {/* Scroll Reading Progress Bar (Requirement 5) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-black/5 dark:bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-[#8C3A2B] via-amber-600 to-[#8C3A2B] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`p-4 sm:p-10 md:p-14 rounded-2xl border transition-all ${themeContainerClasses}`}>
        
        {/* PÁGINA 1: CAPA ELEGANTE */}
        {pageNav.type === 'cover' && (
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#8C3A2B]/40 bg-[#8C3A2B]/10 text-[#8C3A2B] font-serif text-xs sm:text-sm tracking-widest uppercase font-bold">
              Premium Illustrated Edition • Eastern Wisdom
            </div>

            <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-4 border-[#D8C7B5] shadow-2xl group">
              <OptimizedBookCover
                alt="Master Lin - Ancient Secrets of Chinese Medicine"
                priority={true}
                size="full"
                className="transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-4 left-0 right-0 text-white p-4 text-center pointer-events-none">
                <p className="font-serif italic text-xs text-amber-200">Presented by</p>
                <p className="font-serif font-bold text-lg text-amber-100">{PAGE_CONTENTS.page1_cover.author}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className={`font-serif font-bold text-3xl sm:text-5xl tracking-tight leading-tight ${headingColorClass}`}>
                {PAGE_CONTENTS.page1_cover.title}
              </h1>
              <p className={`font-serif italic text-base sm:text-xl max-w-2xl mx-auto font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page1_cover.subtitle}
              </p>
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 max-w-xl mx-auto text-left bg-black/5 dark:bg-white/5 p-4 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C3A2B] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Cover Art Direction & Description
              </h4>
              <p className="text-xs sm:text-sm font-serif leading-relaxed italic opacity-90">
                {PAGE_CONTENTS.page1_cover.artDescription}
              </p>
            </div>
          </div>
        )}

        {/* PÁGINA 2: DIREITOS AUTORAIS E ISENÇÃO */}
        {pageNav.type === 'copyright' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-black/10 dark:border-white/10 pb-4 text-center">
              <ShieldAlert className="w-10 h-10 mx-auto text-[#8C3A2B] mb-2" />
              <h2 className={`font-serif font-bold text-2xl sm:text-3xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page2_copyright.title}
              </h2>
            </div>

            <div className="space-y-6">
              {PAGE_CONTENTS.page2_copyright.sections.map((sec, idx) => (
                <div key={idx} className="p-5 sm:p-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
                  <h3 className={`font-serif font-bold text-lg sm:text-xl flex items-center gap-2 ${headingColorClass}`}>
                    <Info className="w-5 h-5 shrink-0" /> {sec.heading}
                  </h3>
                  <p className={`${fontSizeClasses} font-serif`}>{sec.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PÁGINA 3: APRESENTAÇÃO DA MESTRA LIN */}
        {pageNav.type === 'presentation' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
              <span className="font-serif italic text-sm text-[#8C3A2B] font-bold block mb-1">Opening Chapter</span>
              <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page3_presentation.title}
              </h2>
              <p className={`font-serif italic text-base sm:text-lg mt-1 font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page3_presentation.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
              <div className="md:col-span-1">
                <OptimizedBookCover
                  alt="Master Lin"
                  size="thumb"
                  className="rounded-2xl border-2 border-[#D8C7B5] shadow-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                {PAGE_CONTENTS.page3_presentation.textParagraphs.slice(0, 3).map((para, i) => (
                  <p key={i} className={`${fontSizeClasses} font-serif`}>
                    {i === 0 ? <span className="float-left text-5xl font-bold font-serif text-[#8C3A2B] pr-3 leading-none">{para.charAt(0)}</span> : null}
                    {i === 0 ? para.slice(1) : para}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              {PAGE_CONTENTS.page3_presentation.textParagraphs.slice(3).map((para, i) => (
                <p key={i} className={`${fontSizeClasses} font-serif`}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* PÁGINA 4: UMA MENSAGEM DA MESTRA LIN */}
        {pageNav.type === 'message' && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
              <Heart className="w-8 h-8 mx-auto text-[#8C3A2B] mb-2 fill-[#8C3A2B]/20" />
              <h2 className={`font-serif font-bold text-3xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page4_message.title}
              </h2>
              <p className={`font-serif italic text-base mt-1 font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page4_message.subtitle}
              </p>
            </div>

            <div className="bg-black/5 dark:bg-white/5 p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 space-y-4 font-serif">
              {PAGE_CONTENTS.page4_message.paragraphs.map((p, idx) => (
                <p key={idx} className={`${fontSizeClasses} italic`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* PÁGINA 5: O QUE É MTC */}
        {pageNav.type === 'mtc-explanation' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
              <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page7_mtcExplanation.title}
              </h2>
              <p className={`font-serif italic text-base sm:text-lg mt-1 font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page7_mtcExplanation.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {PAGE_CONTENTS.page7_mtcExplanation.sections.map((sec, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
                  <h3 className={`font-serif font-bold text-xl sm:text-2xl ${headingColorClass}`}>
                    {sec.title}
                  </h3>
                  <p className={`${fontSizeClasses} font-serif leading-relaxed`}>
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PÁGINA 6: INGREDIENTES MAIS UTILIZADOS */}
        {pageNav.type === 'ingredients-guide' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
              <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page8_ingredientsGuide.title}
              </h2>
              <p className={`font-serif italic text-base sm:text-lg mt-1 font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page8_ingredientsGuide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAGE_CONTENTS.page8_ingredientsGuide.items.map((ing, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-1">
                  <h3 className={`font-serif font-bold text-base sm:text-lg ${headingColorClass}`}>
                    {ing.name}
                  </h3>
                  <p className="text-sm sm:text-base font-serif opacity-90">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PÁGINA 7: COMO APROVEITAR MELHOR */}
        {pageNav.type === 'best-practices' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
              <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page9_bestPractices.title}
              </h2>
              <p className={`font-serif italic text-base sm:text-lg mt-1 font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page9_bestPractices.subtitle}
              </p>
            </div>

            <div className="space-y-5">
              {PAGE_CONTENTS.page9_bestPractices.tips.map((tip, idx) => (
                <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2">
                  <h3 className={`font-serif font-bold text-lg sm:text-xl ${headingColorClass}`}>
                    {tip.title}
                  </h3>
                  <p className={`${fontSizeClasses} font-serif`}>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PÁGINA 8: SUMÁRIO DOS CAPÍTULOS */}
        {pageNav.type === 'table-of-contents' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
              <BookOpen className="w-10 h-10 mx-auto text-[#8C3A2B] mb-2" />
              <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${headingColorClass}`}>
                {PAGE_CONTENTS.page10_tableOfContents.title}
              </h2>
              <p className={`font-serif italic text-base sm:text-lg mt-1 font-medium ${subtitleColorClass}`}>
                {PAGE_CONTENTS.page10_tableOfContents.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAGE_CONTENTS.page10_tableOfContents.chapters.map((chap) => {
                const chapterIntroPage = ALL_BOOK_PAGES.find(p => p.type === 'chapter-intro' && p.chapterId === chap.id);
                const pageIndex = chapterIntroPage ? ALL_BOOK_PAGES.findIndex(p => p.id === chapterIntroPage.id) : -1;

                return (
                  <button 
                    key={chap.id}
                    onClick={() => {
                      if (pageIndex !== -1) {
                        onGoToPage(pageIndex);
                      }
                    }}
                    className="w-full text-left p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#8C3A2B] transition-all group cursor-pointer min-h-[52px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-bold text-xs uppercase text-[#8C3A2B] tracking-wider">
                          {chap.title}
                        </span>
                        <span className="text-xs font-mono font-bold opacity-75 bg-[#8C3A2B]/10 text-[#8C3A2B] px-2.5 py-0.5 rounded-full">
                          10 Recipes
                        </span>
                      </div>
                      <h3 className={`font-serif font-bold text-lg sm:text-xl group-hover:text-[#8C3A2B] transition-colors`}>
                        {chap.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#8C3A2B] mt-4 font-serif font-bold">
                      Open Chapter <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CHAPTER HUB PAGE (Requirement 3: Intermediate Chapter Page showing all 10 Recipe Cards) */}
        {pageNav.type === 'chapter-intro' && pageNav.chapterId && (
          <div className="space-y-8 animate-fade-in">
            {/* Chapter Header */}
            {(() => {
              const chapId = pageNav.chapterId;
              const chapterData = CHAPTER_INTROS[chapId] || CHAPTER_INTROS[1];
              const chapterRecipes = ALL_RECIPES.filter(r => r.chapterId === chapId);

              return (
                <>
                  <div className="text-center pb-6 border-b border-black/10 dark:border-white/10">
                    <span className="px-4 py-1.5 rounded-full bg-[#8C3A2B]/15 text-[#8C3A2B] font-serif text-xs sm:text-sm font-bold uppercase tracking-widest inline-block mb-3">
                      Chapter {chapId}
                    </span>
                    <h2 className={`font-serif font-bold text-2xl sm:text-4xl ${headingColorClass}`}>
                      {chapterData.title}
                    </h2>
                    <p className={`font-serif italic text-base sm:text-lg mt-2 font-medium ${subtitleColorClass}`}>
                      {chapterData.subtitle}
                    </p>
                  </div>

                  {/* Intro Paragraphs */}
                  <div className="space-y-4 font-serif max-w-3xl mx-auto">
                    {chapterData.paragraphs.map((p, idx) => (
                      <p key={idx} className={`${fontSizeClasses} leading-relaxed`}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Interactive Recipe Cards Grid (Requirement 3) */}
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
                      <h3 className={`font-serif font-bold text-xl sm:text-2xl ${headingColorClass}`}>
                        Chapter {chapId} Recipes
                      </h3>
                      <span className="text-xs font-serif text-[#8C3A2B] font-bold bg-[#8C3A2B]/10 px-3 py-1 rounded-full">
                        10 Traditional Recipes
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {chapterRecipes.map((r) => {
                        const recipePageNav = ALL_BOOK_PAGES.find(p => p.recipeId === r.id);
                        const recipePageIndex = recipePageNav ? ALL_BOOK_PAGES.findIndex(p => p.id === recipePageNav.id) : -1;

                        return (
                          <div 
                            key={r.id}
                            onClick={() => {
                              if (recipePageIndex !== -1) {
                                onGoToPage(recipePageIndex);
                              }
                            }}
                            className="p-5 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#D8C7B5] dark:border-white/10 hover:border-[#8C3A2B] hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-md cursor-pointer group flex flex-col justify-between min-h-[140px]"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono font-bold text-[#8C3A2B] bg-[#8C3A2B]/10 px-2.5 py-1 rounded-md">
                                  Recipe #{r.id}
                                </span>
                                <span className="text-[11px] font-mono text-[#8C6D53] dark:text-[#C5B7AD]">
                                  Page {recipePageNav?.pageNumber}
                                </span>
                              </div>
                              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1F2937] dark:text-[#E5DCD5] group-hover:text-[#8C3A2B] transition-colors leading-snug">
                                {r.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#C5B7AD] font-serif line-clamp-2 mt-1.5 italic">
                                {r.introducao}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                              <span className="text-xs text-[#8C6D53] dark:text-[#C5B7AD] font-serif font-medium">
                                {r.ingredientes.length} ingredients
                              </span>
                              <button className="px-3 py-1.5 bg-[#8C3A2B] text-white font-serif text-xs font-bold rounded-lg group-hover:bg-[#722E22] transition-colors flex items-center gap-1 min-h-[36px]">
                                View Recipe <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mestra Lin Quote */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/90 dark:bg-[#F4EAD5] border-2 border-[#8C3A2B]/40 my-8 text-center relative max-w-2xl mx-auto shadow-sm">
                    <Quote className="w-8 h-8 text-[#8C3A2B] opacity-30 absolute top-4 left-4" />
                    <p className="font-serif italic text-lg sm:text-xl text-black leading-relaxed relative z-10 font-bold">
                      "{chapterData.mestraLinClosingQuote}"
                    </p>
                    <span className="block font-serif text-sm font-bold text-[#8C3A2B] mt-4">
                      — Master Lin
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* PÁGINAS DE RECEITA (RECEITAS 1 A 100) */}
        {pageNav.type === 'recipe' && currentRecipe && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Top Chapter Breadcrumb & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs sm:text-sm font-serif font-bold text-[#8C3A2B] bg-[#8C3A2B]/10 px-3 py-1 rounded-full inline-block mb-1">
                  Chapter {currentRecipe.chapterId} • {currentRecipe.chapterTitle}
                </span>
                <h2 className={`font-serif font-bold text-2xl sm:text-3xl ${headingColorClass}`}>
                  Recipe #{currentRecipe.id}: {currentRecipe.title}
                </h2>
              </div>

              {/* Bookmark & Copy Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onToggleBookmark(currentRecipe.id)}
                  className={`px-3.5 py-2.5 rounded-xl border font-serif text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all min-h-[44px] ${
                    isBookmarked
                      ? 'bg-[#8C3A2B] text-white border-[#8C3A2B]'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#8C3A2B]'
                  }`}
                  title={isBookmarked ? "Remove from Bookmarks" : "Save Recipe"}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => copyRecipeToClipboard(
                    `${currentRecipe.title}\n\nIngredients:\n${currentRecipe.ingredientes.join('\n')}\n\nPreparation:\n${currentRecipe.modoPreparo.join('\n')}\n\nMaster Lin's Tip: ${currentRecipe.dicaMestraLin}`
                  )}
                  className="px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-[#8C3A2B] transition-all text-xs sm:text-sm font-serif font-bold flex items-center gap-1.5 min-h-[44px]"
                  title="Copy Recipe"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* 1. INTRODUÇÃO */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#8C3A2B]/10 border border-[#8C3A2B]/20 font-serif italic text-base sm:text-lg text-[#8C3A2B] font-medium leading-relaxed">
              <p>"{currentRecipe.introducao}"</p>
            </div>

            {/* Interactive Portion Scaler & Steep Timer Bar */}
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Portion Scaler */}
              <div className="flex items-center justify-between sm:justify-start gap-2 text-xs sm:text-sm font-serif">
                <span className="font-bold text-[#8C3A2B]">Servings:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 4].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setPortionScale(scale)}
                      className={`px-3.5 py-2 rounded-xl font-mono font-bold transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                        portionScale === scale
                          ? 'bg-[#8C3A2B] text-white shadow-sm'
                          : 'bg-black/10 dark:bg-white/10 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {scale}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer for Infusion / Steeping */}
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs sm:text-sm font-serif border-t sm:border-t-0 pt-3 sm:pt-0 border-black/10 dark:border-white/10">
                <span className="font-bold text-[#8C3A2B] flex items-center gap-1">
                  <Timer className="w-4 h-4" /> Steep (5 min):
                </span>
                {timerSeconds > 0 ? (
                  <div className="flex items-center gap-2.5 bg-[#8C3A2B] text-white font-mono px-3.5 py-2 rounded-xl font-bold min-h-[44px]">
                    <span>
                      {Math.floor(timerSeconds / 60)}:
                      {(timerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                    <button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1 hover:bg-white/20 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title={isTimerRunning ? "Pause" : "Start"}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setTimerSeconds(0); setIsTimerRunning(false); }}
                      className="p-1 hover:bg-white/20 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title="Reset"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startSteepTimer(5)}
                    className="px-4 py-2 bg-[#8C3A2B]/20 text-[#8C3A2B] font-bold rounded-xl hover:bg-[#8C3A2B]/30 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    Start 5 min
                  </button>
                )}
              </div>
            </div>

            {/* 2. INGREDIENTES & 3. MODO DE PREPARO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingredientes */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
                <h3 className={`font-serif font-bold text-xl sm:text-2xl border-b border-black/10 dark:border-white/10 pb-2 ${headingColorClass}`}>
                  2. Ingredients {portionScale > 1 && `(${portionScale}x)`}
                </h3>
                <ul className="space-y-3 font-serif">
                  {currentRecipe.ingredientes.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-base sm:text-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8C3A2B] mt-2.5 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modo de Preparo */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
                <h3 className={`font-serif font-bold text-xl sm:text-2xl border-b border-black/10 dark:border-white/10 pb-2 ${headingColorClass}`}>
                  3. Preparation
                </h3>
                <ol className="space-y-3 sm:space-y-4 font-serif">
                  {currentRecipe.modoPreparo.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-base sm:text-lg">
                      <span className="w-7 h-7 rounded-full bg-[#8C3A2B] text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 4. COMO CONSUMIR & 5. CUIDADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 sm:p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-1">
                <h4 className={`font-serif font-bold text-base sm:text-lg ${headingColorClass}`}>
                  4. How to Enjoy
                </h4>
                <p className={`${fontSizeClasses} font-serif`}>
                  {currentRecipe.comoConsumir}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-amber-50/90 dark:bg-[#F4EAD5] border border-amber-300 shadow-sm space-y-1">
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#8C3A2B] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" /> 5. Precautions
                </h4>
                <p className={`${fontSizeClasses} text-black font-bold font-serif`}>
                  {currentRecipe.cuidados}
                </p>
              </div>
            </div>

            {/* 6. CURIOSIDADE & 7. DICA DA MESTRA LIN */}
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-1">
                <h4 className={`font-serif font-bold text-base sm:text-lg ${headingColorClass}`}>
                  6. Eastern Lore & Wisdom
                </h4>
                <p className={`${fontSizeClasses} font-serif italic`}>
                  {currentRecipe.curiosidade}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/90 dark:bg-[#F4EAD5] border-2 border-[#8C3A2B]/40 shadow-sm space-y-2">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#8C3A2B] flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-[#8C3A2B] shrink-0" /> 7. Master Lin's Heartfelt Tip
                </h4>
                <p className="font-serif italic text-base sm:text-xl text-black font-bold leading-relaxed">
                  "{currentRecipe.dicaMestraLin}"
                </p>
              </div>
            </div>

            {/* INTRA-CHAPTER NAVIGATION BAR (Requirement 4: Previous Recipe, Next Recipe, Return to Chapter) */}
            <div className="pt-8 border-t-2 border-black/10 dark:border-white/10 my-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Previous Recipe Button */}
                {(() => {
                  const currentIdx = ALL_BOOK_PAGES.findIndex(p => p.id === pageNav.id);
                  const chapterIntroNav = ALL_BOOK_PAGES.find(p => p.type === 'chapter-intro' && p.chapterId === currentRecipe.chapterId);
                  const chapterIntroIdx = chapterIntroNav ? ALL_BOOK_PAGES.findIndex(p => p.id === chapterIntroNav.id) : -1;

                  // Find previous recipe in same chapter
                  const prevRecipeNav = ALL_BOOK_PAGES.find((p, idx) => idx < currentIdx && p.type === 'recipe' && p.chapterId === currentRecipe.chapterId);

                  return (
                    <button
                      onClick={() => {
                        if (currentRecipe.id > 1) {
                          const prevRecipePage = ALL_BOOK_PAGES.find(p => p.recipeId === currentRecipe.id - 1);
                          if (prevRecipePage) {
                            const pIdx = ALL_BOOK_PAGES.findIndex(p => p.id === prevRecipePage.id);
                            if (pIdx !== -1) onGoToPage(pIdx);
                          }
                        } else if (chapterIntroIdx !== -1) {
                          onGoToPage(chapterIntroIdx);
                        }
                      }}
                      className="w-full px-4 py-3 bg-[#FAF7F2] dark:bg-white/5 border border-[#D8C7B5] dark:border-white/10 hover:border-[#8C3A2B] text-[#1F2937] dark:text-[#E5DCD5] rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all min-h-[48px]"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#8C3A2B]" /> Previous Recipe
                    </button>
                  );
                })()}

                {/* Return to Chapter Hub Button */}
                {(() => {
                  const chapterIntroNav = ALL_BOOK_PAGES.find(p => p.type === 'chapter-intro' && p.chapterId === currentRecipe.chapterId);
                  const chapterIntroIdx = chapterIntroNav ? ALL_BOOK_PAGES.findIndex(p => p.id === chapterIntroNav.id) : -1;

                  return (
                    <button
                      onClick={() => {
                        if (chapterIntroIdx !== -1) {
                          onGoToPage(chapterIntroIdx);
                        }
                      }}
                      className="w-full px-4 py-3 bg-[#8C3A2B] text-white hover:bg-[#722E22] rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all min-h-[48px]"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Chapter {currentRecipe.chapterId}
                    </button>
                  );
                })()}

                {/* Next Recipe Button */}
                {(() => {
                  return (
                    <button
                      onClick={() => {
                        if (currentRecipe.id < 100) {
                          const nextRecipePage = ALL_BOOK_PAGES.find(p => p.recipeId === currentRecipe.id + 1);
                          if (nextRecipePage) {
                            const pIdx = ALL_BOOK_PAGES.findIndex(p => p.id === nextRecipePage.id);
                            if (pIdx !== -1) onGoToPage(pIdx);
                          }
                        }
                      }}
                      disabled={currentRecipe.id >= 100}
                      className="w-full px-4 py-3 bg-[#FAF7F2] dark:bg-white/5 border border-[#D8C7B5] dark:border-white/10 hover:border-[#8C3A2B] text-[#1F2937] dark:text-[#E5DCD5] disabled:opacity-40 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all min-h-[48px]"
                    >
                      Next Recipe <ChevronRight className="w-4 h-4 text-[#8C3A2B]" />
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Footer Page Number inside Card */}
        <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm font-serif opacity-80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#374151] dark:text-[#C5B7AD]">
          <span>Ancient Secrets of Chinese Medicine</span>
          <span className="font-bold text-[#8C3A2B]">Page {pageNav.pageNumber}</span>
          <span>Master Lin</span>
        </div>
      </div>
    </div>
  );
};
