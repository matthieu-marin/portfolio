import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface NavigationContextType {
  targetSkillId: string | null;
  setTargetSkillId: (id: string | null) => void;
  targetExperienceId: string | null;
  setTargetExperienceId: (id: string | null) => void;
  targetProjectId: string | null;
  setTargetProjectId: (id: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [targetSkillId, setTargetSkillIdState] = useState<string | null>(null);
  const [targetExperienceId, setTargetExperienceIdState] = useState<string | null>(null);
  const [targetProjectId, setTargetProjectIdState] = useState<string | null>(null);

  const setTargetSkillId = useCallback((id: string | null) => setTargetSkillIdState(id), []);
  const setTargetExperienceId = useCallback(
    (id: string | null) => setTargetExperienceIdState(id),
    []
  );
  const setTargetProjectId = useCallback(
    (id: string | null) => setTargetProjectIdState(id),
    []
  );

  const value = useMemo(
    () => ({
      targetSkillId,
      setTargetSkillId,
      targetExperienceId,
      setTargetExperienceId,
      targetProjectId,
      setTargetProjectId,
    }),
    [
      targetSkillId,
      setTargetSkillId,
      targetExperienceId,
      setTargetExperienceId,
      targetProjectId,
      setTargetProjectId,
    ]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
