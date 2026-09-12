import React, { useState } from 'react';
import { BookOpen, X, ChevronRight, Bookmark, ArrowRight } from 'lucide-react';
import { ALL_BOOK_PAGES } from '../data/pageNavigation';
import { PAGE_CONTENTS } from '../data/bookContent';
import { ALL_RECIPES } from '../data/recipesData';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPageIndex: (index: number) => void;
  bookmarks: number[];
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  onSelectPageIndex,
  bookmarks
}) => {
  const [activeTab, setActiveTab] = useState<'pages' | 'chapters' | 'bookmarks'>('chapters');

  if (!isOpen) return null;

  const basePages = ALL_BOOK_PAGES.filter(p => p.type !== 'recipe' && p.type !== 'chapter-intro');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#D8C7B5] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-[#1F2937]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5D7C5] bg-[#F4EDE2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#8C3A2B] shrink-0" />
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1F2937]">Table of Contents</h2>
              <p className="text-xs text-[#374151]">Quickly explore chapters, pages, and recipes from Master Lin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#E5D7C5] rounded-xl text-[#8C3A2B] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5D7C5] bg-[#EFE7DC] text-xs sm:text-sm font-serif">
          <button
            onClick={() => setActiveTab('chapters')}
            className={`flex-1 py-3 px-3 text-center border-b-2 font-bold transition-colors min-h-[48px] ${
              activeTab === 'chapters'
                ? 'border-[#8C3A2B] text-[#8C3A2B] bg-[#FAF7F2]'
                : 'border-transparent text-[#374151] hover:text-[#1F2937]'
            }`}
          >
            10 Chapters (100 Recipes)
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`flex-1 py-3 px-3 text-center border-b-2 font-bold transition-colors min-h-[48px] ${
              activeTab === 'pages'
                ? 'border-[#8C3A2B] text-[#8C3A2B] bg-[#FAF7F2]'
                : 'border-transparent text-[#374151] hover:text-[#1F2937]'
            }`}
          >
            Introductory Pages
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-3 px-3 text-center border-b-2 font-bold transition-colors flex items-center justify-center gap-1.5 min-h-[48px] ${
              activeTab === 'bookmarks'
                ? 'border-[#8C3A2B] text-[#8C3A2B] bg-[#FAF7F2]'
                : 'border-transparent text-[#374151] hover:text-[#1F2937]'
            }`}
          >
            <Bookmark className="w-4 h-4" /> Bookmarks ({bookmarks.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {activeTab === 'chapters' && (
            <div className="space-y-4">
              {PAGE_CONTENTS.page10_tableOfContents.chapters.map((chap) => {
                const chapterIntroPage = ALL_BOOK_PAGES.find(p => p.type === 'chapter-intro' && p.chapterId === chap.id);
                const chapterIntroIndex = chapterIntroPage ? ALL_BOOK_PAGES.findIndex(p => p.id === chapterIntroPage.id) : -1;
                const chapterRecipes = ALL_RECIPES.filter(r => r.chapterId === chap.id);

                return (
                  <div key={chap.id} className="bg-white border border-[#E5D7C5] rounded-xl p-4 shadow-sm hover:border-[#8C3A2B] transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#EBE1D3] pb-3">
                      <div>
                        <span className="text-xs font-serif uppercase tracking-wider text-[#8C3A2B] font-bold">
                          Chapter {chap.id}
                        </span>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F2937]">
                          {chap.name}
                        </h3>
                      </div>

                      <button
                        onClick={() => {
                          if (chapterIntroIndex !== -1) {
                            onSelectPageIndex(chapterIntroIndex);
                            onClose();
                          }
                        }}
                        className="px-3.5 py-2 bg-[#8C3A2B] text-white font-serif text-xs font-bold rounded-xl hover:bg-[#722E22] transition-colors flex items-center gap-1 min-h-[40px]"
                      >
                        View Chapter <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {chapterRecipes.map((r) => {
                        const pageNav = ALL_BOOK_PAGES.find(p => p.recipeId === r.id);
                        const index = pageNav ? ALL_BOOK_PAGES.findIndex(p => p.id === pageNav.id) : -1;

                        return (
                          <button
                            key={r.id}
                            onClick={() => {
                              if (index !== -1) {
                                onSelectPageIndex(index);
                                onClose();
                              }
                            }}
                            className="text-left p-2.5 rounded-lg hover:bg-[#F4EDE2] border border-transparent hover:border-[#E5D7C5] transition-all flex items-center justify-between text-xs sm:text-sm group min-h-[44px]"
                          >
                            <span className="font-serif font-bold text-[#1F2937] group-hover:text-[#8C3A2B] line-clamp-1 pr-2">
                              {r.id}. {r.title}
                            </span>
                            <span className="text-[11px] text-[#8C3A2B] font-mono bg-[#F4EDE2] px-2 py-0.5 rounded font-bold shrink-0">
                              Page {pageNav?.pageNumber}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {basePages.map((p) => {
                const index = ALL_BOOK_PAGES.findIndex(item => item.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPageIndex(index);
                      onClose();
                    }}
                    className="text-left p-4 bg-white hover:bg-[#EFE7DC] border border-[#E5D7C5] hover:border-[#8C3A2B] rounded-xl transition-all group flex items-center justify-between min-h-[52px]"
                  >
                    <div>
                      <span className="text-xs text-[#8C3A2B] font-bold uppercase tracking-wider block">
                        Page {p.pageNumber}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#1F2937] group-hover:text-[#8C3A2B] transition-colors mt-0.5">
                        {p.title}
                      </h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8C3A2B] group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div>
              {bookmarks.length === 0 ? (
                <div className="text-center py-12 text-[#374151]">
                  <Bookmark className="w-12 h-12 mx-auto mb-3 text-[#8C3A2B] opacity-40" />
                  <p className="font-serif text-lg font-bold">No saved recipes yet</p>
                  <p className="text-xs sm:text-sm text-[#374151] mt-1 max-w-sm mx-auto">
                    You can save any recipe to this list by clicking the "Save" button while reading.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {bookmarks.map((recId) => {
                    const recipe = ALL_RECIPES.find(r => r.id === recId);
                    if (!recipe) return null;

                    const pageNav = ALL_BOOK_PAGES.find(p => p.recipeId === recipe.id);
                    const index = pageNav ? ALL_BOOK_PAGES.findIndex(p => p.id === pageNav.id) : -1;

                    return (
                      <button
                        key={recipe.id}
                        onClick={() => {
                          if (index !== -1) {
                            onSelectPageIndex(index);
                            onClose();
                          }
                        }}
                        className="w-full text-left p-4 bg-white border border-[#E5D7C5] hover:border-[#8C3A2B] rounded-xl hover:bg-[#EFE7DC] transition-all flex items-center justify-between group min-h-[52px]"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-[#8C3A2B] fill-[#8C3A2B] shrink-0" />
                            <h4 className="font-serif font-bold text-base text-[#1F2937] group-hover:text-[#8C3A2B]">
                              Recipe #{recipe.id}: {recipe.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[#374151] mt-1 font-serif font-medium">{recipe.chapterTitle}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#8C3A2B] bg-[#F4EDE2] px-2.5 py-1 rounded-lg shrink-0">
                          Page {pageNav?.pageNumber}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
