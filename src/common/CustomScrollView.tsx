import { DimensionValue } from 'react-native';
import {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

interface CustomScrollViewProps extends KeyboardAwareScrollViewProps {
  minHeight?: DimensionValue;
  children: any;
}

const CustomScrollView = ({
  minHeight,
  children,
  ...props
}: CustomScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={10}
      alwaysBounceVertical={false}
      contentContainerStyle={{ flexGrow: 1, minHeight: minHeight }}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default CustomScrollView;
