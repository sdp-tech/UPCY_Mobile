import { View, Text, StyleSheet, Dimensions } from 'react-native';
const ReformerTag = () => {
  return (
    <View style={Styles.container}>
      <Text style={TextStyles.label}>리폼러</Text>
    </View>
  );
};
const { width, height } = Dimensions.get('screen');
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EBF8',
    borderRadius: 20,
    paddingVertical: height * 0.005,
    paddingHorizontal: height * 0.012,
  },
});

const TextStyles = StyleSheet.create({
  label: {
    color: '#612FEF',
    fontSize: width * 0.03,
    fontWeight: '600',
  },
});

export default ReformerTag;
