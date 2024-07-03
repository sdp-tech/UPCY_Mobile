import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Body16M, Title20B } from '../../../styles/GlobalText';
import Select from '../../../assets/common/Select.svg';
import Unselect from '../../../assets/common/Unselect.svg';
import { PURPLE } from '../../../styles/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomButton from '../../../common/BottomButton';

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    value: string;
    setValue: (text: string) => void;
}

export default function ServiceCategoryModal({
    open,
    setOpen,
    value,
    setValue,
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
    const { width } = Dimensions.get('screen');

    const regionList = [
        '모자',
        '장갑',
        '지갑',
        '목도리',
        '키링',
        '기타(외주)',
    ];

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePresentModalClose = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index < 0) setOpen(false);
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: string }) => (
            <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }}>
                <TouchableOpacity
                    style={styles.selectItem}
                    onPress={() => setValue(item)}>
                    <Body16M>{item}</Body16M>
                    {item === value ? <Select /> : <Unselect />}
                </TouchableOpacity>
            </View>
        ),
        [value],
    );

    useEffect(() => {
        if (open) handlePresentModalPress();
    }, [open]);

    // renders
    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}>
                <View style={styles.selectItem}>
                    <Title20B>카테고리를 선택해 주세요.</Title20B>
                </View>
                <BottomSheetFlatList data={regionList} renderItem={renderItem} />
                <View style={{ marginHorizontal: width * 0.04 }}>
                    <BottomButton
                        value="적용"
                        pressed={false}
                        onPress={handlePresentModalClose}
                        style={{
                            width: '75%',
                            alignSelf: 'center',
                            marginTop: 10,
                            marginBottom: 30,
                            position: 'absolute',
                            bottom: 70
                        }}
                    />
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    selectItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
    },
});
