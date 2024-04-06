import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import InputBox, { InputBoxProps } from './InputBox';
import { Body16B, Caption11M } from '../styles/GlobalText';
import InfoIcon from '../assets/common/Info.svg';
import { GRAY, PURPLE } from '../styles/GlobalColor';
import { useRef, useState } from 'react';
import InfoModal from './InfoModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface InputViewProps extends InputBoxProps {
  containerStyle?: ViewStyle;
  title?: string;
  info?: string;
  caption?: {
    none?: false | string;
    invalid?: false | string;
  };
}

const InputView = ({
  containerStyle,
  title,
  info,
  value,
  setValue,
  caption,
  ...props
}: InputViewProps) => {
  const [infoModal, setInfoModal] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ViewRef = useRef<View>(null);

  const getViewMeasure = () => {
    ViewRef.current?.measureInWindow((x, y) => {
      console.log(x, y);
      setPos({ top: y + 20, left: x + 50 });
    });
  };

  return (
    <View style={{ marginVertical: 10, ...containerStyle }}>
      <View
        ref={ViewRef}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
        }}>
        {title && <Body16B>{title}</Body16B>}
        {info && (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPressIn={() => {
              getViewMeasure();
              setInfoModal(true);
            }}
            onPressOut={() => setInfoModal(false)}>
            <InfoIcon />
            <InfoModal
              content={info}
              visible={infoModal}
              setVisible={setInfoModal}
              pos={pos}
            />
          </TouchableOpacity>
        )}
      </View>
      <InputBox
        value={value}
        setValue={setValue}
        style={{ marginTop: 8 }}
        {...props}
      />
      {value === '' && caption?.none && (
        <Caption11M style={{ color: GRAY }}>{caption.none}</Caption11M>
      )}
      {caption?.invalid && (
        <Caption11M style={{ color: PURPLE }}>{caption.invalid}</Caption11M>
      )}
      {/* {info && (
        <InfoModal
          content={info}
          visible={infoModal}
          setVisible={setInfoModal}
        />
      )} */}
    </View>
  );
};

export default InputView;
