import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PlusSquare from '../../assets/lookbook/plusSquare.svg';
import { Container } from 'react-native-collapsible-tab-view';

const LookbookAddButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={Styles.container}>
          <PlusSquare />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: 54,
    height: 54,
    backgroundColor: 'black',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

export default LookbookAddButton;
