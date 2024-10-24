import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParams } from "./Home";
import { PhotoType, useImagePicker } from "../hooks/useImagePicker";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Alert, Button, Dimensions, Image, TouchableOpacity, View } from "react-native";
import PencilIcon from "../assets/common/Pencil.svg"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomScrollView from "../common/CustomScrollView";
import InputView from "../common/InputView";
import { getAccessToken, getRefreshToken, removeAccessToken, removeMarketUUID, removeNickname, removeRefreshToken } from "../common/storage";
import { LoginContext } from "../common/Context";
import { MyPageStackParams } from "./MyPage";
import DetailScreenHeader from "../components/Home/components/DetailScreenHeader";
import Request from "../common/requests";
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
    profile_image: undefined | PhotoType;
    nickname: string;
    introduce: string;
};

function ProfilePic({ form, setForm }: ProfileProps) {
    const [photo, setPhoto] = useState(form.profile_image); // 프로필 사진은 form.profile_image.uri?
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
                    // buttonLabel=""
                    // photo={form.profile_image}
                    // setPhoto={p => {
                    //   setForm(prev => {
                    //     return { ...prev, profile_image: p[0] };
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
                        opacity: 10
                    }}>
                    {photo !== undefined && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 'auto', height: '100%', borderRadius: 100 }}
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
    const request = Request();
    const userInfo = route.params.userInfo;
    const [form, setForm] = useState<ProfileType>({
        profile_image: userInfo.profile_image,
        nickname: userInfo.nickname,
        introduce: userInfo.introduce,
    });

    const UpdateImage = async () => {
        const accessToken = await getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // multipart/form-data 설정
        };
        const formData = new FormData();
        formData.append('profile_image', {
            uri: form.profile_image?.uri, // 파일의 URI
            type: 'image/jpeg', // 이미지 형식 (예: 'image/jpeg')
            name: form.profile_image?.fileName || 'profile.jpg', // 파일 이름
        });
        try {
            const response = await request.post(`/api/user/profile-image`, formData, headers)
            if (response && response.status === 201) {
                console.log('프로필 이미지 수정 성공')
            } else {
                console.log('이미지 업로드 실패');
                console.log(response);
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const UpdateUser = async () => { // 유저 프로필 업데이트 
        const accessToken = await getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        const data = {
            nickname: form.nickname,
            introduce: form.introduce,
        }
        try {
            const response = await request.put(`/api/user`, data, headers);
            if (response && response.status === 200) {
                await UpdateImage(); // 유저 프로필 이미지 업데이트 
                console.log('유저 데이터 업데이트 성공', response.data);
                navigation.navigate({ name: 'MyPage', params: { userInfo: userInfo }, merge: true });
            }
            else {
                console.log(response);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const Logout = async () => {
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();
        const params = {
            refresh: refreshToken
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        try {
            const response = await request.post(`/api/user/logout`, params, headers)
            if (response && response.status === 200) {
                console.log('로그아웃 합니다.')
                removeAccessToken();
                removeRefreshToken();
                setLogin(false);
                console.log('AccessToken: ', { accessToken }, '| RefreshToken: ', { refreshToken });
                navigation.getParent()?.reset({
                    index: 0, // 스택 초기화 
                    routes: [{ name: 'Home' }],
                });
            } else {
                console.log(response);
            }
        }
        catch (err) {
            console.error(err)
        }
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

    useEffect(() => {
        userInfo.nickname = form.nickname;
        userInfo.introduce = form.introduce;
        userInfo.profile_image = form.profile_image;
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
                        <Button title='저장하기' onPress={UpdateUser} />
                        <Button title="로그아웃" onPress={handleLogout()} color='red' />
                    </View>
                </CustomScrollView>
            </View>
        </SafeAreaView>
    );
}

export default FixMyPage;