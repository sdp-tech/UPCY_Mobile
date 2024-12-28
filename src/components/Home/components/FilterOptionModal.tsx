import { useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SelectedOptionProps, selectOptionDropdown } from '../HomeMain';

const FilterOptionModal = ({
  open,
  setOpen,
  setSelectedOption,
}: {
  open: boolean;
  setOpen: (dropdownOpen: boolean) => void;
  setSelectedOption: (selectedOption: SelectedOptionProps) => void;
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ['40%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
    setOpen(false);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) setOpen(false);
  }, []);

  const handleSelectOption = (selectedOption: SelectedOptionProps) => {
    setSelectedOption(selectedOption);
    handlePresentModalClose();
  };

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      <BottomSheetFlatList
        data={selectOptionDropdown}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleSelectOption(item)}>
            <Text style={TextStyles.modalItem}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </BottomSheetModal>
  );
};

const TextStyles = StyleSheet.create({
  modalItem: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

const styles = StyleSheet.create({
  dropdownMenu: {
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    zIndex: 1000,
    width: 100,
    elevation: 5,
  },
  bottomSheet: {
    padding: 10,
  },
  modalItem: {
    paddingVertical: 12,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default FilterOptionModal;
