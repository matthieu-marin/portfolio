import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

interface SkillTooltipProps {
  skillName: string;
  description: string;
  usage: string;
  children: React.ReactNode;
  onClick: () => void;
}

export function SkillTooltip({ skillName, description, usage, children, onClick }: SkillTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const updatePosition = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const tooltipWidth = 320;
        const tooltipHeight = 300;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 16;
        const mobile = viewportWidth < 768;

        setIsMobile(mobile);

        let top = rect.bottom + 8;

        if (top + tooltipHeight > viewportHeight - padding) {
          top = Math.max(padding, viewportHeight - tooltipHeight - padding);
        }

        let left = 0;

        if (!mobile) {
          left = rect.left;

          if (left + tooltipWidth > viewportWidth - padding) {
            left = viewportWidth - tooltipWidth - padding;
          }

          if (left < padding) {
            left = padding;
          }
        }

        setPosition({ top, left });
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          onClick={handleClick}
          className={`cursor-pointer transition-all ${
            isCtrlPressed ? 'underline decoration-accent decoration-2 underline-offset-4' : ''
          }`}
          title={isCtrlPressed ? `Ctrl+Click to view ${skillName} details` : ''}
        >
          {children}
        </span>
      </div>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[9999] bg-titlebar border-2 border-accent rounded-lg shadow-2xl p-4 pointer-events-none"
            style={isMobile ? { 
              top: `${position.top}px`,
              left: '16px',
              right: '16px',
              maxWidth: '320px',
              margin: '0 auto',
              boxSizing: 'border-box',
              boxShadow: '0 0 40px rgba(203, 166, 247, 0.6), 0 10px 50px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'var(--titlebar)'
            } : {
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: '320px',
              boxSizing: 'border-box',
              boxShadow: '0 0 40px rgba(203, 166, 247, 0.6), 0 10px 50px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'var(--titlebar)'
            }}
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start justify-between border-b border-accent/50 pb-2">
                <div>
                  <span className="text-syntax-keyword">class </span>
                  <span className="text-accent" style={{ fontWeight: 600 }}>{skillName}</span>
                </div>
                <span className="text-syntax-comment text-[10px]">// hover for docs</span>
              </div>
              <div>
                <div className="text-accent mb-1" style={{ opacity: 0.9 }}>/** Description */</div>
                <div className="text-foreground ml-2 leading-relaxed" style={{ opacity: 0.95 }}>{description}</div>
              </div>
              <div>
                <div className="text-accent mb-1" style={{ opacity: 0.9 }}>// Example usage:</div>
                <div className="bg-sidebar rounded p-2.5 ml-2 border border-accent/30" style={{ backgroundColor: 'var(--sidebar)' }}>
                  <code className="text-syntax-string text-[10px] break-words" style={{ opacity: 0.95 }}>{usage}</code>
                </div>
              </div>
              <div className="text-syntax-comment text-[10px] pt-2 border-t border-accent/50 flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-sidebar rounded text-[9px] border border-accent text-accent" style={{ backgroundColor: 'var(--sidebar)' }}>Ctrl</kbd>
                <span>+ Click for details</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}