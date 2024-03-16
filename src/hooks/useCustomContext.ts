import { useContext } from 'react';

type CustomContextType = undefined;

export default function useCustomContext({
  context,
}: {
  context: CustomContextType;
}) {
  const CustomContexts = {};
  // const state = useContext(CustomContexts[context]);
  // if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  // return state;
}
