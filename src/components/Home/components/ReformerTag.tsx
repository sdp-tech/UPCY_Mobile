import { View, Text, StyleSheet } from 'react-native';
const ReformerTag = () => {
  return (
    <View style={Styles.container}>
      <Text style={TextStyles.label}>리폼러</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: 49,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#E9EBF8',
  },
});

const TextStyles = StyleSheet.create({
  label: {
    color: '#612FEF',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default ReformerTag;
