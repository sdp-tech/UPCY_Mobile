import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParams } from "./Home";
import { PhotoType, useImagePicker } from "../hooks/useImagePicker";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, Button, Dimensions, Image, TouchableOpacity, View } from "react-native";
import PencilIcon from "../assets/common/Pencil.svg"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomScrollView from "../common/CustomScrollView";
import InputView from "../common/InputView";
import { removeAccessToken, removeNickname, removeRefreshToken } from "../common/storage";
import { LoginContext } from "../common/Context";
import { MyPageStackParams } from "./MyPage";
import DetailScreenHeader from "../components/Home/components/DetailScreenHeader";
export interface MypageProps extends ProfileProps {
    route: any;
    navigation: any;
}

type FixMyPageProps = StackScreenProps<MyPageStackParams, 'FixMyPage'>;

interface ProfileProps {
    form: ProfileType;
    setForm: Dispatch<SetStateAction<ProfileType>>;
}

type ProfileType = {
    profilephoto: undefined | PhotoType;
    nickname: string;
    introduce: string;
};

function ProfilePic({ form, setForm }: ProfileProps) {
    const [photo, setPhoto] = useState(form.profilephoto);
    const [handleAddButtonPress, handleImagePress] = useImagePicker(setPhoto);

    useEffect(() => {
        setForm(prev => {
            return { ...prev, profilephoto: photo };
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
                    // buttonLabel=""
                    // photo={form.profilephoto}
                    // setPhoto={p => {
                    //   setForm(prev => {
                    //     return { ...prev, profilephoto: p[0] };
                    //   });
                    // }}
                    // max={1}
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

const FixMyPage = ({ navigation, route }: FixMyPageProps) => {
    const { isLogin, setLogin } = useContext(LoginContext);
    const Logout = () => {
        removeAccessToken();
        removeNickname();
        removeRefreshToken();
        setLogin(false);
        navigation.getParent()?.reset({
            index: 0, // 스택 초기화 
            routes: [{ name: '홈' }], // 홈으로 이동 
        });
    };

    function handleLogout(): () => void {
        return () => {
            Alert.alert(
                "로그아웃 하시겠습니까?",
                "",
                [
                    { text: "아니오", onPress: () => { }, style: "destructive" },
                    { text: "네", onPress: Logout }
                ],
                { cancelable: false }
            );
        }
    }

    const userInfo = route.params.userInfo;

    const [form, setForm] = useState<ProfileType>({
        profilephoto: userInfo.profilephoto,
        nickname: userInfo.nickname,
        introduce: userInfo.introduce,
    });

    useEffect(() => {
        userInfo.nickname = form.nickname;
        userInfo.introduce = form.introduce;
        userInfo.profilephoto = form.profilephoto;
    }, [form]);

    function handleBackPress(): () => void {
        return () => {
            Alert.alert(
                "저장하지 않고 나가시겠습니까?",
                "",
                [
                    { text: "아니오", onPress: () => { }, style: "destructive" },
                    { text: "네", onPress: () => navigation.goBack() }
                ],
                { cancelable: false }
            );
        };
    };

    function handleSave(): () => void {
        return () => { navigation.navigate({ name: 'MyPage', params: { userInfo: userInfo }, merge: true }); };
    }

    const { width } = Dimensions.get('screen');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DetailScreenHeader
                title='프로필 수정'
                leftButton="LeftArrow"
                rightButton="None"
                onPressLeft={handleBackPress()}
                onPressRight={handleBackPress()}
            />
            <View>
                <CustomScrollView
                    additionalStyles={{
                        minHeight: 650,
                        marginHorizontal: width * 0.04,
                    }}
                    bounces={false} overScrollMode="never">
                    <View style={{ flexGrow: 1 }}>
                        <ProfilePic form={form} setForm={setForm} />
                        <InputView
                            title="닉네임"
                            value={form.nickname}
                            setValue={v => {
                                setForm(prev => {
                                    return { ...prev, nickname: v };
                                });
                            }}
                            placeholder={userInfo.nickname}
                        />
                        <InputView
                            title="소개글"
                            value={form.introduce}
                            setValue={v => {
                                setForm(prev => {
                                    return { ...prev, introduce: v };
                                });
                            }}
                            long={true}
                            placeholder={userInfo.introduce}
                        />
                    </View>
                    <View style={{ flexDirection: "row", flexGrow: 1, alignSelf: "center" }}>
                        <Button title='저장하기' onPress={handleSave()} />
                        <Button title="로그아웃" onPress={handleLogout()} color='red' />
                    </View>
                </CustomScrollView>
            </View>
        </SafeAreaView>
    );
}

export default FixMyPage;