import { useNavigation } from "@react-navigation/native";
import { useBottomBar } from "../../../../contexts/BottomBarContext";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import React from "react";
import Arrow from '../../../assets/common/Arrow.svg';
import { handleBackPress } from "../../../common/navigationUtils";

const BackButton = styled.TouchableOpacity`
    padding: 10px;
    z-index: 1;
`
export const CustomBackButton: React.FC = () => {
    const navigation = useNavigation();
    const { showBottomBar } = useBottomBar();

    return (
        <BackButton onPress={() => handleBackPress(navigation, showBottomBar)}>
            <Arrow color='black' />
        </BackButton>
    );
};
