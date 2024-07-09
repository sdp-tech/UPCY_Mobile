import { StyleSheet, View, ViewStyle } from 'react-native';
import { GREEN, PURPLE } from '../../styles/GlobalColor';
import { Upcymall12M } from '../../styles/GlobalText';

const LookbookButton = ({ positioning }: { positioning?: ViewStyle }) => {
  return (
    <View style={{ ...positioning }}>
      <View style={Styles.container}>
        <Upcymall12M style={{ color: GREEN }}>UPCYMALL</Upcymall12M>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: PURPLE,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    width: 'auto',
    alignSelf: 'flex-start',
    margin: 5,
  },
});

export default LookbookButton;
