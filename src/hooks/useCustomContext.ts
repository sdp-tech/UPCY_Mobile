import { useContext } from 'react';

export default function useCustomContext<T>({
  givenContext,
}: {
  givenContext: React.Context<T | null>;
}) {
  const state = useContext(givenContext);
  if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}
