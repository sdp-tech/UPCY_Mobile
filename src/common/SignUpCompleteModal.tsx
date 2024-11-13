import { FC, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import Check from '../assets/common/Check2.svg'
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInParams } from '../components/Auth/SignIn';
import { SignupModalProps } from '../components/Auth/Signup';



const SignupCompleteModal = ({ visible, onClose }: SignupModalProps) => {
    const navigation = useNavigation<StackNavigationProp<SignInParams>>();
    const handleGoToReformer = async () => {
        onClose(); // 모달을 닫고
        await new Promise(resolve => setTimeout(resolve, 100)); // 딜레이 추가
        console.log('BasicForm에서 Reformer로 이동합니다.');
        navigation.navigate('Reformer'); // 네비게이션 수행
    };

    const handleSkip = async () => {
        onClose(); // 모달을 닫고
        await new Promise(resolve => setTimeout(resolve, 100)); // 딜레이 추가
        navigation.dispatch(
            CommonActions.navigate({
                name: "Main",
                params: {
                    screen: "홈", // MainTabNavigator의 홈 화면으로 이동
                },
            })
        );
        console.log('홈으로 이동합니다.');

    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={() => {
            onClose();  // 백 버튼 등으로 모달을 닫을 때 처리
        }}>
            <View style={styles.modalContainer}>
                <Check />
                <Text style={[styles.text, styles.textClr]}>{` `}</Text>
                <Text style={[styles.text, styles.textClr]}>{`가입이 완료되었습니다. `}</Text>
                <Text style={[styles.upcy, styles.textClr]}>업씨와 함께 지속가능한 옷장을 만들어봐요!</Text>
                <TouchableOpacity style={{ position: 'absolute', bottom: 150, flexGrow: 1 }} onPress={handleGoToReformer}>
                    <View style={styles.rectangleView}>
                        <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "600", fontFamily: "Pretendard Variable" }}>리폼러 프로필 등록하기</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ position: "absolute", bottom: 120, fontSize: 12, color: "#eaeaea" }}>프로필 등록 후 서비스를 제공할 수 있습니다.</Text>
                <TouchableOpacity style={{ position: "absolute", bottom: 40, right: 40 }} onPress={handleSkip}>
                    <Text style={{ fontSize: 14, textDecorationLine: "underline", color: "#CEBFFA" }}>건너뛰기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    rectangleView: {
        borderRadius: 8,
        backgroundColor: "#dbfc72",
        flex: 1,
        width: "100%",
        height: 48,
        justifyContent: "center",
        minWidth: "80%",
        alignItems: "center"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#612fef",
    },
    modalText: {
        color: '#fff',
        fontSize: 18,
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
    },
    textClr: {
        color: "#dbfc72",
        fontFamily: "Pretendard Variable",
        lineHeight: 24,
        alignSelf: "stretch"
    },
    text: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center"
    },
    upcy: {
        paddingTop: 16,
        fontSize: 16,
        textAlign: "center"
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#FFF600',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    primaryButtonText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
    },
    footerText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginBottom: 20,
    },
    skipButton: {
        alignItems: 'center',
    },
    skipButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});

export default SignupCompleteModal;