import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Utensils, ChevronRight } from 'lucide-react';
import { ALL_RECIPES } from '../data/recipesData';
import { ALL_BOOK_PAGES } from '../data/pageNavigation';
import { Recipe } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPageIndex: (index: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPageIndex
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return { pages: [], recipes: [] };
    const query = searchTerm.toLowerCase().trim();

    // Matching pages
    const matchedPages = ALL_BOOK_PAGES.filter(p => 
      p.title.toLowerCase().includes(query)
    );

    // Matching recipes
    const matchedRecipes = ALL_RECIPES.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.ingredientes.some(i => i.toLowerCase().includes(query)) ||
      r.introducao.toLowerCase().includes(query) ||
      r.dicaMestraLin.toLowerCase().includes(query) ||
      r.chapterTitle.toLowerCase().includes(query)
    );

    return { pages: matchedPages, recipes: matchedRecipes };
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#D8C7B5] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-[#1F2937]">
        {/* Header */}
        <div className="p-4 border-b border-[#E5D7C5] flex items-center gap-3 bg-[#F4EDE2]">
          <Search className="w-5 h-5 text-[#8C3A2B] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes, ingredients (e.g., ginger, sleep, digestion)..."
            className="flex-1 bg-transparent border-none text-base outline-none placeholder-[#4B5563] text-[#1F2937] font-medium"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1.5 hover:bg-[#E5D7C5] rounded-full text-[#8C3A2B] transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#E5D7C5] rounded-xl text-[#8C3A2B] transition-colors ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!searchTerm.trim() ? (
            <div className="text-center py-10 text-[#374151]">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-[#8C3A2B] opacity-50" />
              <p className="font-serif text-lg font-bold">Search Master Lin's collection of recipes and wisdom</p>
              <p className="text-sm text-[#4B5563] mt-1 font-serif">Examples: "Ginger", "Blood Pressure", "Chapter 4", "Honey"</p>
            </div>
          ) : (
            <>
              {/* Pages Results */}
              {searchResults.pages.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C3A2B] mb-2 px-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Book Sections ({searchResults.pages.length})
                  </h3>
                  <div className="space-y-1">
                    {searchResults.pages.map((p) => {
                      const pageIndex = ALL_BOOK_PAGES.findIndex(item => item.id === p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            if (pageIndex !== -1) {
                              onSelectPageIndex(pageIndex);
                              onClose();
                            }
                          }}
                          className="w-full text-left p-3 rounded-xl hover:bg-[#EFE7DC] transition-colors flex items-center justify-between group border border-transparent hover:border-[#D8C7B5] min-h-[48px]"
                        >
                          <div>
                            <p className="font-serif font-bold text-[#1F2937] group-hover:text-[#8C3A2B]">
                              {p.title}
                            </p>
                            <span className="text-xs text-[#4B5563] font-mono">Page {p.pageNumber}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#8C3A2B] group-hover:translate-x-1 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recipe Results */}
              {searchResults.recipes.length > 0 ? (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C3A2B] mb-2 px-2 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4" /> Recipes Found ({searchResults.recipes.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.recipes.map((r: Recipe) => {
                      const pageNav = ALL_BOOK_PAGES.find(p => p.recipeId === r.id);
                      const pageIndex = pageNav ? ALL_BOOK_PAGES.findIndex(p => p.id === pageNav.id) : -1;

                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            if (pageIndex !== -1) {
                              onSelectPageIndex(pageIndex);
                              onClose();
                            }
                          }}
                          className="w-full text-left p-4 bg-white rounded-xl hover:bg-[#EFE7DC] transition-all border border-[#E5D7C5] hover:border-[#8C3A2B] group shadow-sm min-h-[52px]"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-bold text-[#8C3A2B] bg-[#F4EDE2] px-2.5 py-0.5 rounded-md border border-[#E5D7C5]">
                                Recipe #{r.id}
                              </span>
                              <h4 className="font-serif font-bold text-base text-[#1F2937] mt-1 group-hover:text-[#8C3A2B] transition-colors">
                                {r.title}
                              </h4>
                              <p className="text-xs text-[#4B5563] mt-0.5 font-serif font-medium">
                                {r.chapterTitle}
                              </p>
                            </div>
                            <span className="text-xs text-[#8C3A2B] font-mono font-bold bg-[#F4EDE2] px-2.5 py-1 rounded-lg border border-[#E5D7C5]">
                              Page {pageNav?.pageNumber}
                            </span>
                          </div>
                          <p className="text-xs text-[#374151] mt-2 line-clamp-2 italic font-serif bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EBE1D3]">
                            "{r.introducao}"
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                searchResults.pages.length === 0 && (
                  <div className="text-center py-8 text-[#4B5563] font-serif">
                    No results found for "{searchTerm}".
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
