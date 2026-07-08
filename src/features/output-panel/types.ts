export type OutputPanelMode = 'terminal' | 'custom';

export interface OutputPanelProps {
  mode: OutputPanelMode;
  onClose: () => void;
  title?: string;
  customContent?: React.ReactNode;
}

