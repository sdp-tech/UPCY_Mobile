import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import FilterFunnel from '../../../assets/common/FilterFunnel.svg';

type StyleFilterButtonProps = {
  onPressStyleFilterButton: (isFilterElementOpen: boolean) => void;
};

export const StyleFilterButton = ({
  onPressStyleFilterButton,
}: StyleFilterButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onPressStyleFilterButton(true);
      }}>
      <Text style={TextStyles.text}>스타일</Text>
      <FilterFunnel width={13} height={13} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E9EBF8',
    height: 32,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    flexShrink: 0,
    width: 100,
  },
});

const TextStyles = StyleSheet.create({
  text: {
    color: '#612FEF',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 15,
    paddingVertical: 10,
  },
});
