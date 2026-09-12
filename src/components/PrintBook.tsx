import React from 'react';
import { BOOK_METADATA, PAGE_CONTENTS } from '../data/bookContent';
import { ALL_RECIPES } from '../data/recipesData';
import { OptimizedBookCover } from './OptimizedBookCover';

export const PrintBook: React.FC = () => {
  return (
    <div className="hidden print:block text-black bg-white p-8 space-y-12 font-serif">
      
      {/* CAPA PRINT */}
      <div className="page-break text-center py-16 space-y-8 border-b-2 border-black">
        <h1 className="text-4xl font-bold tracking-tight text-amber-900">{BOOK_METADATA.title}</h1>
        <p className="text-lg italic text-gray-700 max-w-xl mx-auto">{BOOK_METADATA.subtitle}</p>
        <div className="my-8">
          <OptimizedBookCover
            alt="Master Lin Cover"
            size="print"
            className="w-64 mx-auto rounded-lg shadow-md border"
          />
        </div>
        <p className="text-xl font-bold">Author: {BOOK_METADATA.author}</p>
      </div>

      {/* DIREITOS AUTORAIS PRINT */}
      <div className="page-break space-y-6 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">{PAGE_CONTENTS.page2_copyright.title}</h2>
        {PAGE_CONTENTS.page2_copyright.sections.map((s, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="font-bold text-base">{s.heading}</h3>
            <p className="text-sm text-gray-800 leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>

      {/* APRESENTAÇÃO DA MESTRA LIN PRINT */}
      <div className="page-break space-y-4 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">{PAGE_CONTENTS.page3_presentation.title}</h2>
        <p className="italic text-gray-600 mb-4">{PAGE_CONTENTS.page3_presentation.subtitle}</p>
        {PAGE_CONTENTS.page3_presentation.textParagraphs.map((p, idx) => (
          <p key={idx} className="text-sm leading-relaxed text-gray-900">{p}</p>
        ))}
      </div>

      {/* UMA MENSAGEM PRINT */}
      <div className="page-break space-y-4 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">{PAGE_CONTENTS.page4_message.title}</h2>
        {PAGE_CONTENTS.page4_message.paragraphs.map((p, idx) => (
          <p key={idx} className="text-sm leading-relaxed text-gray-900 italic">{p}</p>
        ))}
      </div>

      {/* SUMÁRIO E TODAS AS 100 RECEITAS PRINT */}
      <div className="page-break pt-8 space-y-8">
        <h2 className="text-3xl font-bold border-b-2 border-amber-900 pb-2">The 100 Traditional Recipes</h2>
        {ALL_RECIPES.map((r) => (
          <div key={r.id} className="border p-6 rounded-lg space-y-4 my-6 page-break-inside-avoid bg-gray-50">
            <div className="border-b pb-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{r.chapterTitle}</span>
              <h3 className="text-xl font-bold text-gray-900">Recipe #{r.id}: {r.title}</h3>
            </div>

            <p className="italic text-sm text-amber-900">"{r.introducao}"</p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold border-b pb-1 mb-2 text-amber-900">Ingredients:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {r.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-bold border-b pb-1 mb-2 text-amber-900">Preparation:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {r.modoPreparo.map((m, i) => <li key={i}>{m}</li>)}
                </ol>
              </div>
            </div>

            <div className="text-xs space-y-2 pt-2 border-t">
              <p><strong>How to Enjoy:</strong> {r.comoConsumir}</p>
              <p><strong>Precautions:</strong> {r.cuidados}</p>
              <p><strong>Traditional Lore:</strong> {r.curiosidade}</p>
              <p className="italic text-amber-900"><strong>Master Lin's Tip:</strong> "{r.dicaMestraLin}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
