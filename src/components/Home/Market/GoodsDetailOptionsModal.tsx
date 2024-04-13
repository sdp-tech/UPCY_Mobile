import { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const DetailModal = () => {
    const snapPoints = useMemo(() => ['50%','75%', '100%'], []);
  
    const bottomSheetRef = useRef<BottomSheet>(null);
  
    const handleClosePress = () => bottomSheetRef.current?.close();
    const handleOpenPress = () => bottomSheetRef.current?.expand();
    return (
      <View style={styles.container}>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</ Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
});

export default DetailModal;
