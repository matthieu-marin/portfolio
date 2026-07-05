import { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { useLanguage } from '../../i18n/hooks';
import { useRenderer } from '../contexts/RendererContext';
import { motion, AnimatePresence } from 'motion/react';
import type { Page } from '../../app/types';
import { FILE_REGISTRY } from '../data/fileRegistry';

interface FileExplorerProps {
  onFileSelect: (id: Page) => void;
  onVisibilityChange?: (visible: boolean) => void;
}

const EXPLORER_PAGES: Page[] = [
  'home',
  'about',
  'experience',
  'projects',
  'skills',
  'contact',
];

export function FileExplorer({ onFileSelect, onVisibilityChange }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['portfolio', 'src', 'pages']);
  const [width, setWidth] = useState(256); // 64 * 4 = 256px (w-64)
  const [isResizing, setIsResizing] = useState(false);
  const { t } = useLanguage();
  const { enabled } = useRenderer();

  const MIN_WIDTH = 0;
  const MAX_WIDTH = 600;
  const DEFAULT_WIDTH = 256;

  useEffect(() => {
    if (!isResizing) return;

    let rafId: number | null = null;
    let pendingClientX = 0;

    const apply = () => {
      rafId = null;
      const newWidth = pendingClientX;
      if (newWidth < 50 && newWidth > 0) {
        setWidth(0);
        onVisibilityChange?.(false);
      } else if (newWidth >= 50 && newWidth <= MAX_WIDTH) {
        setWidth(newWidth);
      } else if (newWidth > MAX_WIDTH) {
        setWidth(MAX_WIDTH);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingClientX = e.clientX;
      if (rafId === null) rafId = requestAnimationFrame(apply);
    };
    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, onVisibilityChange]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleDoubleClick = () => {
    if (width === 0) {
      setWidth(DEFAULT_WIDTH);
      if (onVisibilityChange) {
        onVisibilityChange(true);
      }
    } else {
      setWidth(0);
      if (onVisibilityChange) {
        onVisibilityChange(false);
      }
    }
  };

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev =>
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  const rootLabel = enabled ? t('explorer.root.human') : t('explorer.root.code');

  return (
    <div 
      className="bg-sidebar border-r border-border flex flex-col relative"
      style={{ width: `${width}px` }}
    >
      <div className="p-2 border-b border-border">
        <span className="text-xs uppercase tracking-wide opacity-60">Explorer</span>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="select-none">
          <div
            className="flex items-center gap-1 px-2 py-1 hover:bg-hover cursor-pointer"
            onClick={() => toggleFolder('portfolio')}
          >
            {expandedFolders.includes('portfolio') ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            {expandedFolders.includes('portfolio') ? (
              <FolderOpen className="w-4 h-4 text-folder" />
            ) : (
              <Folder className="w-4 h-4 text-folder" />
            )}
            <span className="text-sm">{rootLabel}</span>
          </div>

          <AnimatePresence>
            {expandedFolders.includes('portfolio') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 overflow-hidden"
              >
                <div
                  className="flex items-center gap-1 px-2 py-1 hover:bg-hover cursor-pointer"
                  onClick={() => toggleFolder('src')}
                >
                  {expandedFolders.includes('src') ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  {expandedFolders.includes('src') ? (
                    <FolderOpen className="w-4 h-4 text-folder" />
                  ) : (
                    <Folder className="w-4 h-4 text-folder" />
                  )}
                  <span className="text-sm">src</span>
                </div>

                <AnimatePresence>
                  {expandedFolders.includes('src') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 overflow-hidden"
                    >
                      <div
                        className="flex items-center gap-1 px-2 py-1 hover:bg-hover cursor-pointer"
                        onClick={() => toggleFolder('pages')}
                      >
                        {expandedFolders.includes('pages') ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        {expandedFolders.includes('pages') ? (
                          <FolderOpen className="w-4 h-4 text-folder" />
                        ) : (
                          <Folder className="w-4 h-4 text-folder" />
                        )}
                        <span className="text-sm">pages</span>
                      </div>

                      <AnimatePresence>
                        {expandedFolders.includes('pages') && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 overflow-hidden"
                          >
                            {EXPLORER_PAGES.map((id, index) => {
                              const meta = FILE_REGISTRY[id];
                              const HumanIcon = meta.humanIcon;
                              return (
                                <motion.div
                                  key={id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.15, delay: index * 0.03 }}
                                  className="flex items-center gap-1 px-2 py-1 hover:bg-hover cursor-pointer group"
                                  onClick={() => onFileSelect(id)}
                                >
                                  {enabled ? (
                                    <>
                                      <HumanIcon className={`w-4 h-4 ${meta.badgeClass}`} />
                                      <span className="text-sm truncate">{t(meta.humanLabelKey)}</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className={`text-[10px] font-mono w-6 shrink-0 ${meta.badgeClass}`}>
                                        {meta.badge}
                                      </span>
                                      <span className="text-sm truncate">{meta.fileName}</span>
                                    </>
                                  )}
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div 
        className="absolute top-0 right-0 w-1 h-full hover:bg-accent cursor-col-resize transition-colors group"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="absolute inset-y-0 -right-1 w-3" />
      </div>
    </div>
  );
}

