import { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FileCode, FolderOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FileExplorerProps {
  onFileSelect: (id: any, name: string, path: string) => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export function FileExplorer({ onFileSelect, onVisibilityChange }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['portfolio', 'src', 'pages']);
  const [width, setWidth] = useState(256); // 64 * 4 = 256px (w-64)
  const [isResizing, setIsResizing] = useState(false);
  const { t } = useLanguage();

  const MIN_WIDTH = 0; // Peut être caché complètement
  const MAX_WIDTH = 600;
  const DEFAULT_WIDTH = 256;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (newWidth < 50 && newWidth > 0) {
        // Si la largeur devient très petite, cacher complètement
        setWidth(0);
        if (onVisibilityChange) {
          onVisibilityChange(false);
        }
      } else if (newWidth >= 50 && newWidth <= MAX_WIDTH) {
        setWidth(newWidth);
      } else if (newWidth > MAX_WIDTH) {
        setWidth(MAX_WIDTH);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
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
    // Double-clic pour restaurer la largeur par défaut ou cacher
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

  const files = [
    { id: 'home', name: 'Home.tsx', path: 'src/pages/Home.tsx', label: t('nav.home') },
    { id: 'about', name: 'About.tsx', path: 'src/pages/About.tsx', label: t('nav.about') },
    { id: 'experience', name: 'Experience.tsx', path: 'src/pages/Experience.tsx', label: t('nav.experience') },
    { id: 'projects', name: 'Projects.tsx', path: 'src/pages/Projects.tsx', label: t('nav.projects') },
    { id: 'skills', name: 'Skills.tsx', path: 'src/pages/Skills.tsx', label: t('nav.skills') },
    { id: 'contact', name: 'Contact.tsx', path: 'src/pages/Contact.tsx', label: t('nav.contact') },
  ];

  return (
    <div 
      className="bg-sidebar border-r border-border flex flex-col relative"
      style={{ width: `${width}px` }}
    >
      <div className="p-2 border-b border-border">
        <span className="text-xs uppercase tracking-wide opacity-60">Explorer</span>
      </div>
      
      <div className="flex-1 overflow-auto">
        {/* Root Folder */}
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
            <span className="text-sm">portfolio</span>
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
                {/* src folder */}
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
                      {/* pages folder */}
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
                            {files.map((file, index) => (
                              <motion.div
                                key={file.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.15, delay: index * 0.03 }}
                                className="flex items-center gap-1 px-2 py-1 hover:bg-hover cursor-pointer group"
                                onClick={() => onFileSelect(file.id, file.name, file.path)}
                              >
                                <FileCode className="w-4 h-4 text-file-tsx" />
                                <span className="text-sm truncate">{file.name}</span>
                              </motion.div>
                            ))}
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

      {/* Poignée de redimensionnement */}
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