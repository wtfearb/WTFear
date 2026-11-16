'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuditBookingModal } from './AuditBookingModal';

interface AuditModalContextType {
  readonly isOpen: boolean;
  readonly openModal: () => void;
  readonly closeModal: () => void;
}

const AuditModalContext = createContext<AuditModalContextType | undefined>(undefined);

export function useAuditModal(): AuditModalContextType {
  const context = useContext(AuditModalContext);
  if (!context) {
    throw new Error('useAuditModal must be used within an AuditModalProvider');
  }
  return context;
}

export function AuditModalProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <AuditModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <AuditBookingModal isOpen={isOpen} onClose={closeModal} />
    </AuditModalContext.Provider>
  );
}
