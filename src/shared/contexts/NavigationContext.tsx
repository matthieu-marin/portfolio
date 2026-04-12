import { createContext, useContext, useState, ReactNode } from 'react';

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
  const [targetSkillId, setTargetSkillId] = useState<string | null>(null);
  const [targetExperienceId, setTargetExperienceId] = useState<string | null>(null);
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null);

  return (
    <NavigationContext.Provider value={{ 
      targetSkillId, 
      setTargetSkillId,
      targetExperienceId,
      setTargetExperienceId,
      targetProjectId,
      setTargetProjectId
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

