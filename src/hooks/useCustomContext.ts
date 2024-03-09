import { useContext } from 'react';
import { ReformProfileContext } from '../components/Auth/Reformer/Reformer';

type CustomContextType = 'ReformerProfile';

export default function useCustomContext({
  context,
}: {
  context: CustomContextType;
}) {
  const CustomContexts = {
    ReformerProfile: ReformProfileContext,
  };
  const state = useContext(CustomContexts[context]);
  if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}
