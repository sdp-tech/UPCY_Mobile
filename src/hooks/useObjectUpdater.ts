import { Dispatch, SetStateAction, useCallback } from 'react';

export default function useObjectUpdater<T extends object>(
  setForm: Dispatch<SetStateAction<T>>,
) {
  // value의 타입을 한정할 방법은 찾지 못함
  return useCallback((v: any, t: keyof T) => {
    setForm(prev => {
      return { ...prev, [t]: v };
    });
  }, []);
}
