import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { PURPLE, PURPLE2 } from '../styles/GlobalColor';

const Toggle = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}) => {
  const X_COORD_OFF = 0;
  const X_COORD_ON = 24;
  const ANIMATION_DURATION = 500;

  const animationXTrans = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setIsOn(prev => !prev);
  };

  useEffect(() => {
    console.log('animation on');
    Animated.timing(animationXTrans, {
      toValue: isOn ? X_COORD_ON : X_COORD_OFF,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [animationXTrans, isOn]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={{
            backgroundColor: isOn ? PURPLE : PURPLE2,
            ...Styles.container,
          }}>
          <Animated.View
            style={{
              transform: [{ translateX: animationXTrans }],
              ...Styles.button,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: 50,
    height: 26,
    borderRadius: 100,
    margin: 5,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: 'white',
  },
});

export default Toggle;
