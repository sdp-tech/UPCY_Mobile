import {
    SafeAreaView,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    Text,
    Alert,
    Pressable,
} from 'react-native';
import BottomButton from '../../../common/BottomButton';
import PencilIcon from '../../../assets/common/Pencil.svg';
import InputView from '../../../common/InputView';
import CustomScrollView from '../../../common/CustomScrollView';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PhotoType, useImagePicker } from '../../../hooks/useImagePicker';
import { useNavigation } from '@react-navigation/native';
import Check from '../../../assets/common/CheckIcon.svg'
import DetailScreenHeader from '../../Home/components/DetailScreenHeader';
import { getAccessToken } from '../../../common/storage';
import Request from '../../../common/requests';
import { BasicFormProps2 } from '../BasicForm';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SignInParams } from '../SignIn';

interface UpcyerProps2 extends UpcyerProps {
    navigation: any;
    route: any;
}

interface UpcyerProps {
    form: BasicFormProps2;
    setForm: Dispatch<SetStateAction<BasicFormProps2>>;
}

type UpcyerPageProps = StackScreenProps<SignInParams, 'Upcyer'>;

function ProfilePic({ form, setForm }: UpcyerProps) {
    const [photo, setPhoto] = useState(form?.profile_image);
    const [handleAddButtonPress, handleImagePress] = useImagePicker(setPhoto);

    useEffect(() => {
        setForm(prev => {
            return { ...prev, profile_image: photo };
        });
    }, [photo]);

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

export const UpcyFormProfile = ({ navigation, route }: UpcyerPageProps) => {
    const { width } = Dimensions.get('screen');
    const [isModalVisible, setModalVisible] = useState(false);
    const [nickname, setNickname] = useState('');
    const [introduce, setIntroduce] = useState('');
    const request = Request();
    const form = route.params.form;
    const [form_, setForm] = useState<BasicFormProps2>({
        mail: form?.mail || '',
        domain: form?.domain || '',
        password: form?.password || '',
        nickname: form?.nickname || '',
        agreement: form?.agreement,
        introduce: form?.introduce || '',
        profile_image: form?.profile_image || undefined,
    });

    useEffect(() => {
        form.agreement = form_.agreement;
        form.domain = form_.domain;
        form.introduce = form_.introduce;
        form.mail = form_.mail;
        form.nickname = form_.nickname;
        form.password = form_.password;
        form.profile_image = form_.profile_image;
    }, [form_])

    const handleSubmit = async () => {
        const params = {
            email: form_.mail + '@' + form_.domain,
            password: form_.password,
            nickname: form_.nickname,
            agreement_terms: form_.agreement.d,
            introduce: form_.introduce,
        };
        if (form_.nickname != '') {
            try {
                const response = await request.post('/api/user/signup', params);
                if (response?.status === 201) {
                    console.log(params);
                    setModalVisible(true);

                    // 3초 후 모달 닫고 페이지 이동
                    setTimeout(() => {
                        setModalVisible(false);
                        navigation.getParent()?.reset({
                            index: 0, // 바로 로그인 화면으로 
                            routes: [{ name: 'Login' }],
                        });
                    }, 3000); // 3000ms = 3초
                } else if (response?.status === 500) {
                    console.log(response);
                    Alert.alert('이미 가입된 이메일입니다.');
                } else {
                    console.error('Error Status:', response?.status);
                    Alert.alert('가입에 실패했습니다.');
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            Alert.alert('닉네임을 입력해주세요.')
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DetailScreenHeader
                title=''
                rightButton='None'
                leftButton='LeftArrow'
                onPressLeft={() => { navigation.goBack() }}
                onPressRight={() => { }} />
            <CustomScrollView
                additionalStyles={{
                    minHeight: 650,
                    marginHorizontal: width * 0.04,
                }}>

                <View style={{ flexGrow: 1 }}>
                    <ProfilePic form={form_} setForm={setForm} />
                    <InputView
                        title="닉네임"
                        value={form_?.nickname}
                        setValue={(value) =>
                            setForm(prev => {
                                return { ...prev, nickname: value };
                            })
                        }
                        caption={{ default: '본인을 나타내는 닉네임을 작성해주세요' }}
                    />
                    <InputView
                        title="소개글"
                        value={form_?.introduce}
                        setValue={(value) =>
                            setForm(prev => {
                                return { ...prev, introduce: value };
                            })
                        }
                        caption={{ default: '본인을 소개하는 글을 작성해주세요' }}
                        long={true}
                    />
                    <Pressable onPress={() => console.log(form)}>
                        <Text>ddddddd</Text>
                    </Pressable>
                    <BottomButton
                        value="완료"
                        pressed={false}
                        onPress={handleSubmit}
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