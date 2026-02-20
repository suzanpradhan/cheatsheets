import { Language } from '@/utils/interfaces/language';

export interface Snippet {
  id: number;
  language: Language;
  title: string;
  description?: string;
  code_snippet: string;
  created_at: string;
  updated_at: string;
}
