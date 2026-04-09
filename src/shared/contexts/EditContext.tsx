import { createContext, useContext, useState, ReactNode } from 'react';

interface EditContextType {
  edits: Record<string, string>;
  setEdit: (key: string, value: string) => void;
  resetEdits: () => void;
  hasEdits: boolean;
}

const EditContext = createContext<EditContextType>({
  edits: {},
  setEdit: () => {},
  resetEdits: () => {},
  hasEdits: false,
});

export function EditProvider({ children }: { children: ReactNode }) {
  const [edits, setEdits] = useState<Record<string, string>>({});

  const setEdit = (key: string, value: string) => {
    setEdits(prev => ({ ...prev, [key]: value }));
  };

  const resetEdits = () => setEdits({});

  return (
    <EditContext.Provider value={{ edits, setEdit, resetEdits, hasEdits: Object.keys(edits).length > 0 }}>
      {children}
    </EditContext.Provider>
  );
}

export const useEditContext = () => useContext(EditContext);
