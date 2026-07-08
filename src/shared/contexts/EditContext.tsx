import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

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

  const setEdit = useCallback((key: string, value: string) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetEdits = useCallback(() => setEdits({}), []);

  const value = useMemo(
    () => ({
      edits,
      setEdit,
      resetEdits,
      hasEdits: Object.keys(edits).length > 0,
    }),
    [edits, setEdit, resetEdits]
  );

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}

export const useEditContext = () => useContext(EditContext);

export function useEdited(key: string, fallback: string): string {
  const { edits } = useContext(EditContext);
  return edits[key] ?? fallback;
}
