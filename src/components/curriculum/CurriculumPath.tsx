import type { ReactNode } from 'react';

interface CurriculumPathProps {
  children: ReactNode;
}

export function CurriculumPath({ children }: CurriculumPathProps) {
  return (
    <div className="flex flex-col px-6 py-4">
      {children}
    </div>
  );
}
