import { DimensionValue, ViewStyle } from 'react-native';
import {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

interface CustomScrollViewProps extends KeyboardAwareScrollViewProps {
  minHeight?: DimensionValue;
  children: any;
  additionalStyles?: ViewStyle;
}

const CustomScrollView = ({
  minHeight,
  children,
  additionalStyles,
  ...props
}: CustomScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={10}
      alwaysBounceVertical={false}
      contentContainerStyle={{
        ...additionalStyles,
        flexGrow: 1,
        minHeight: minHeight,
      }}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default CustomScrollView;
