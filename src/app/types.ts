export type Page =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'experience';

export type PanelId = 'explorer' | 'git' | 'extensions';

export interface Tab {
  id: Page;
  name: string;
  path: string;
}
