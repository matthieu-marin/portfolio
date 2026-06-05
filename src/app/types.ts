export type Page =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'experience';

export interface Tab {
  id: Page;
  name: string;
  path: string;
}
