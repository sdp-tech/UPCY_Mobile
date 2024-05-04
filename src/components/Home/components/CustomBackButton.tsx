import { useNavigation } from "@react-navigation/native";
import { useBottomBar } from "../../../../contexts/BottomBarContext";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import React from "react";
import Arrow from '../../../assets/common/Arrow.svg';

// 확인용
// 2차 확인용

const BackButton = styled.TouchableOpacity`
    padding: 10px;
    z-index: 1;
`
export const CustomBackButton = () => {
    const navigation = useNavigation();
    const { showBottomBar } = useBottomBar();

    const handleBackPress = () => {
        showBottomBar(); // 먼저 바텀바를 보여주도록 상태 업데이트
        navigation.goBack(); // 그 다음 화면을 이전 스택으로 전환
    };

    return (
        <BackButton onPress={handleBackPress}>
            <Arrow color='black' />
        </BackButton>
    );
};
