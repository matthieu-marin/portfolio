export type Page =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'experience'
  | 'chronology';

export type PanelId = 'explorer' | 'extensions';

export interface Tab {
  id: Page;
  name: string;
  path: string;
}
