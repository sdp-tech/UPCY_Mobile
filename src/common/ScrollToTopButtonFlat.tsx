import React, { useRef } from 'react';
import { ScrollView, Button, StyleSheet, View, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import Top from '../assets/common/Top.svg'

interface ScrollToTopButtonProps {
    flatListRef: React.RefObject<FlatList<any>>;
}
const { width, height } = Dimensions.get("window");
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ flatListRef }) => {
    const handlePress = () => {
        flatListRef.current?.scrollToOffset({ offset: -height, animated: true });
    };

    return (
        <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
            <Top></Top>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 50,
        position: 'absolute', // 버튼을 뷰에서 벗어나 자유롭게 위치시킬 수 있게 함
        right: 10,            // 오른쪽에서 10 단위 떨어진 곳에 위치
        bottom: 70,           // 하단에서 90 단위 떨어진 곳에 위치
        zIndex: 1000
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    }
});

export default ScrollToTopButton;
