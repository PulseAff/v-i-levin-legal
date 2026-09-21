'use client';

import React, { createContext, useContext, useState } from 'react';
import { ConsultationModal } from '@/components/ui/ConsultationModal';

interface ConsultationContextType {
  openConsultation: (serviceCategory?: string) => void;
  closeConsultation: () => void;
  isConsultationOpen: boolean;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('Иммиграция и Green Card США');

  const openConsultation = (serviceCategory?: string) => {
    if (serviceCategory) {
      setDefaultService(serviceCategory);
    }
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
  };

  return (
    <ConsultationContext.Provider
      value={{
        openConsultation,
        closeConsultation,
        isConsultationOpen: isOpen,
      }}
    >
      {children}
      <ConsultationModal
        isOpen={isOpen}
        onClose={closeConsultation}
        defaultService={defaultService}
      />
    </ConsultationContext.Provider>
  );
};

export const useConsultation = (): ConsultationContextType => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};
