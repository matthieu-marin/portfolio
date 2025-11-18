import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

interface ImagePreviewTooltipProps {
  label: string;
  imageUrl: string;
  children: React.ReactNode;
}

export function ImagePreviewTooltip({ label, imageUrl, children }: ImagePreviewTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const updatePosition = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const tooltipWidth = 384;
        const tooltipHeight = 400;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 16;
        const mobile = viewportWidth < 768;

        setIsMobile(mobile);

        let top = rect.bottom + 8;

        // Vérifier si on dépasse en bas
        if (top + tooltipHeight > viewportHeight - padding) {
          top = Math.max(padding, viewportHeight - tooltipHeight - padding);
        }

        let left = 0;

        if (!mobile) {
          // Sur desktop, positionner près de l'élément
          left = rect.left;

          // Vérifier qu'on ne dépasse pas à droite
          if (left + tooltipWidth > viewportWidth - padding) {
            left = viewportWidth - tooltipWidth - padding;
          }

          // Vérifier qu'on ne dépasse pas à gauche
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

  const getTransformStyle = () => {
    if (alignment === 'center') {
      return 'translateX(-50%)';
    } else if (alignment === 'right') {
      return 'translateX(-100%)';
    }
    return 'translateX(0)';
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="cursor-default">
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
            className="fixed z-[9999] bg-titlebar border-2 border-accent rounded-lg shadow-2xl overflow-hidden pointer-events-none"
            style={isMobile ? { 
              top: `${position.top}px`,
              left: '16px',
              right: '16px',
              maxWidth: '384px',
              margin: '0 auto',
              boxSizing: 'border-box',
              boxShadow: '0 0 40px rgba(203, 166, 247, 0.6), 0 10px 50px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'var(--titlebar)'
            } : {
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: '384px',
              boxSizing: 'border-box',
              boxShadow: '0 0 40px rgba(203, 166, 247, 0.6), 0 10px 50px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'var(--titlebar)'
            }}
          >
            {/* Preview Image */}
            <div className="w-full">
              <img 
                src={imageUrl} 
                alt={label}
                className="w-full h-auto object-cover"
              />
              <div className="p-2 bg-sidebar/50 border-t border-accent/30">
                <p className="text-xs font-mono text-syntax-comment">// {label}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}