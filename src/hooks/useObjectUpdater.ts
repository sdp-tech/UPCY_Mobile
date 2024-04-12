import { Dispatch, SetStateAction, useCallback } from 'react';

export default function useObjectUpdater<T>(
  setForm: Dispatch<SetStateAction<T>>,
) {
  return useCallback((v: any, t: string) => {
    setForm(prev => {
      return { ...prev, [t]: v };
    });
  }, []);
}
