import React, { Dispatch, SetStateAction, useMemo, useRef, useCallback, useEffect } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DetailModal({
  open,
  setOpen
}: ModalProps) {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        opacity={1}
      />
    ),
    [],
  );

  // variables
  const snapPoints = useMemo(() => ['85%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (open) handlePresentModalPress();
  }, [open, handlePresentModalPress]);

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
    >
      <BottomSheetView style = {{ flex : 1}}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '222' }}> Text</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
