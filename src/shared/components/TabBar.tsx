import { X } from 'lucide-react';
import type { Page } from '../../app/types';
import { tabDisplay } from '../data/fileRegistry';
import { useRenderer } from '../contexts/RendererContext';
import { useLanguage } from '../../i18n/hooks';

interface TabBarProps {
  tabs: Page[];
  activeTab: Page;
  onTabClick: (id: Page) => void;
  onTabClose: (id: Page) => void;
}

export function TabBar({ tabs, activeTab, onTabClick, onTabClose }: TabBarProps) {
  const { enabled } = useRenderer();
  const { t } = useLanguage();

  return (
    <div className="flex bg-tabs border-b border-border overflow-x-auto scrollbar-thin">
      {tabs.map(id => {
        const { name } = tabDisplay(id, enabled, t);
        return (
          <div
            key={id}
            className={`
              flex items-center gap-2 px-3 md:px-4 py-2 border-r border-border cursor-pointer
              min-w-fit group relative flex-shrink-0
              ${activeTab === id ? 'bg-editor text-accent' : 'bg-tabs hover:bg-hover'}
            `}
            onClick={() => onTabClick(id)}
          >
            <span className="text-xs md:text-sm truncate max-w-[120px] md:max-w-none">{name}</span>
            <button
              className="opacity-0 md:group-hover:opacity-100 md:opacity-100 hover:bg-close-hover rounded p-0.5 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(id);
              }}
              aria-label={`Close ${name}`}
            >
              <X className="w-3 h-3" />
            </button>

            {activeTab === id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </div>
        );
      })}
    </div>
  );
}

