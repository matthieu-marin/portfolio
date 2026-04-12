import { X } from 'lucide-react';

interface Tab {
  id: string;
  name: string;
  path: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (id: any) => void;
  onTabClose: (id: any) => void;
}

export function TabBar({ tabs, activeTab, onTabClick, onTabClose }: TabBarProps) {
  return (
    <div className="flex bg-tabs border-b border-border overflow-x-auto scrollbar-thin">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`
            flex items-center gap-2 px-3 md:px-4 py-2 border-r border-border cursor-pointer
            min-w-fit group relative flex-shrink-0
            ${activeTab === tab.id ? 'bg-editor text-accent' : 'bg-tabs hover:bg-hover'}
          `}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="text-xs md:text-sm truncate max-w-[120px] md:max-w-none">{tab.name}</span>
          <button
            className="opacity-0 md:group-hover:opacity-100 md:opacity-100 hover:bg-close-hover rounded p-0.5 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            aria-label={`Close ${tab.name}`}
          >
            <X className="w-3 h-3" />
          </button>
          
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </div>
      ))}
    </div>
  );
}

