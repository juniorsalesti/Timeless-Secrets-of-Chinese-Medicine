export type BookTheme = 'paper' | 'sepia' | 'night';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface Recipe {
  id: number;
  title: string;
  chapterId: number;
  chapterTitle: string;
  introducao: string;
  ingredientes: string[];
  modoPreparo: string[];
  comoConsumir: string;
  cuidados: string;
  curiosidade: string;
  dicaMestraLin: string;
  tempoPreparoMinutos?: number;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  recipes: Recipe[];
}

export type PageType = 
  | 'cover'
  | 'copyright'
  | 'presentation'
  | 'message'
  | 'how-to-use'
  | 'recipe-structure'
  | 'mtc-explanation'
  | 'ingredients-guide'
  | 'best-practices'
  | 'table-of-contents'
  | 'chapter-intro'
  | 'recipe';

export interface BookPageNavigation {
  id: string;
  pageNumber: number;
  title: string;
  type: PageType;
  chapterId?: number;
  recipeId?: number;
}
