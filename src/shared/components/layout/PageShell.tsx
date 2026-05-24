import { motion } from 'motion/react';
import { EditableText } from '../EditableText';

interface PageShellProps {
  commentTitle?: string;
  commentEditKey?: string;
  children: React.ReactNode;
}

export function PageShell({ commentTitle, commentEditKey, children }: PageShellProps) {
  return (
    <div className="h-full bg-editor/90 backdrop-blur-sm p-4 md:p-8 overflow-auto relative z-10">
      <div className="max-w-6xl mx-auto space-y-6 min-h-full pb-12">
        {commentTitle !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm md:text-base"
          >
            <span className="text-syntax-comment">
              {'// '}
              {commentEditKey ? (
                <EditableText value={commentTitle} editKey={commentEditKey} />
              ) : (
                commentTitle
              )}
            </span>
          </motion.div>
        )}
        {children}
      </div>
    </div>
  );
}
