import {
    SafeAreaView,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    Text,
} from 'react-native';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';
import CustomScrollView from '../../../common/CustomScrollView';
import { useEffect, useState } from 'react';
import { PhotoType, useImagePicker } from '../../../hooks/useImagePicker';
import { useNavigation } from '@react-navigation/native';
import Check from '../../../assets/common/CheckIcon.svg'

type UpcyProfileType = {
    picture: undefined | PhotoType;
    nickname: string;
    introduce: string;
}

function ProfilePic() {
    const [photo, setPhoto] = useState<PhotoType | undefined>(undefined);
    const [handleAddButtonPress, handleImagePress] = useImagePicker(setPhoto);

    return (
        <View
            style={{
                marginTop: 30,
                alignSelf: 'center',
                position: 'relative',
            }}>
            <TouchableOpacity
                onPress={photo === undefined ? handleAddButtonPress : handleImagePress}>
                <View
                    style={{
                        position: 'relative',
                        width: 82,
                        height: 82,
                        borderRadius: 100,
                        backgroundColor: '#D9D9D9',
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        marginBottom: 0,
                    }}>
                    {photo !== undefined && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 'auto', height: '100%', borderRadius: 100 }}
                            alt={photo.fileName}
                        />
                    )}
                </View>
            </TouchableOpacity>
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: '#303441',
                    width: 32,
                    height: 32,
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 0,
                    right: 0,
                }}>
                <PencilIcon strokeWidth={1} />
            </View>
        </View>
    );
}

export const UpcyFormProfile = () => {
    const { width } = Dimensions.get('screen');
    const [isModalVisible, setModalVisible] = useState(false);
    const [nickname, setNickname] = useState('');
    const [introduce, setIntroduce] = useState('');
    const navigation = useNavigation();

    const handleButtonPress = () => {
        // 모달을 표시
        setModalVisible(true);

        // 3초 후 모달 닫고 페이지 이동
        setTimeout(() => {
            setModalVisible(false);
            navigation.getParent()?.reset({
                index: 0, // 첫 번째 화면부터 시작
                routes: [{ name: 'Home' }], // 새로운 스택에 홈 화면만 남김
            });
        }, 3000); // 3000ms = 3초
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomScrollView
                additionalStyles={{
                    minHeight: 650,
                    marginHorizontal: width * 0.04,
                }}>
                <View style={{ flexGrow: 1 }}>
                    <ProfilePic />
                    <InputView
                        title="닉네임"
                        value={nickname}
                        setValue={setNickname}
                        caption={{ default: '본인을 나타내는 닉네임을 작성해주세요' }}
                    />
                    <InputView
                        title="소개글"
                        value={introduce}
                        setValue={setIntroduce}
                        caption={{ default: '본인을 소개하는 글을 작성해주세요' }}
                        long={true}
                    />

                    <BottomButton
                        value="완료"
                        pressed={false}
                        onPress={handleButtonPress}
                        style={{
                            width: '75%',
                            alignSelf: 'center',
                            marginTop: 'auto',
                            marginBottom: 10,
                        }}
                    />
                </View>
            </CustomScrollView>
            <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => {
                setModalVisible(false);  // 백 버튼 등으로 모달을 닫을 때 처리
            }}>
                <View style={styles.modalContainer}>
                    <Check></Check>
                    <Text style={[styles.text, styles.textClr]}>{` `}</Text>
                    <Text style={[styles.text, styles.textClr]}>{`가입이 완료되었습니다. `}</Text>
                    <Text style={[styles.upcy, styles.textClr]}>UPCY와 함께 지속가능한 옷장을 만들어봐요!</Text>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});