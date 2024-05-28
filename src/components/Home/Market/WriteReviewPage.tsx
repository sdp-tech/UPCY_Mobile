import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, ScrollViewBase, Text, TouchableOpacity, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { Body14B, Body14M, Body16B, Subtitle16B } from '../../../styles/GlobalText';
import Arrow from '../../../assets/common/Arrow.svg';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safearea-height';
import { CustomBackButton } from '../components/CustomBackButton';
import ScrollToTopButton from '../../../common/ScrollToTopButtonFlat';
import { Image } from 'react-native';
import DetailScreenHeader from '../components/DetailScreenHeader';
import StarRating from '../../../common/StarRating';
import { ScreenContainer } from 'react-native-screens';
import InputBox from '../../../common/InputBox';
import { useBottomBar } from '../../../../contexts/BottomBarContext';
import { handleBackPress } from '../../../common/navigationUtils';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const statusBarHeight = getStatusBarHeight(true);
const { width, height } = Dimensions.get("window");

interface WriteReviewPageProps {
    scrollViewRef: React.RefObject<ScrollView>;
}
const ButtonSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
`

const FooterButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:12px;
  justify-content: center;
  border-radius: 12px;
`
const ReviewComponent = ({ feedBack }: any) => {
    return (
        <View style={{ marginLeft: 10 }}>
            <Body14B>{feedBack}</Body14B>
        </View>
    )
}

const WriteReviewPage: React.FC<WriteReviewPageProps> = ({ scrollViewRef }) => {
    const navigation = useNavigation();
    const [detail, setDetail] = useState("");
    const [marketName] = useState("마켓명");
    const [serviceName] = useState("서비스 이름 어쩌구저쩌구")
    const [message, setMessage] = useState<string>("");
    const scrollRef = useRef<ScrollView>(null);

    const { hideBottomBar, showBottomBar } = useBottomBar();

    useEffect(() => {
        hideBottomBar();
        return () => showBottomBar();
    }, []);

    interface Storage {
        id: number;
        feedBack: string;
        isChecked?: boolean; // isChecked 속성은 선택적(optional)으로 정의합니다.
    }
    const handleCheckboxChange1 = (isChecked: boolean, id: number) => {
        const newItems1 = tradeFeed.map((item) => {
            if (item.id == id) {
                // 체크가 되었다면, isChecked를 동기화. 처음 누르면 true, 한 번 더 누르면 false.
                return { ...item, isChecked: isChecked };
            }
            else {
                return { ...item };
            }
        });
        setTradeFeed(newItems1);
    };

    const [tradeFeed, setTradeFeed] = useState<Storage[]>([
        {
            id: 1,
            feedBack: '약속을 잘 지켜요',
            isChecked: false
        },
        {
            id: 2,
            feedBack: '상담이 친절해요',
            isChecked: false
        },
        {
            id: 3,
            feedBack: '답장이 빨랐어요',
            isChecked: false
        },
        {
            id: 4,
            feedBack: '잘 받았어요',
            isChecked: false
        }
    ])
    const [designFeed, setDesignFeed] = useState<Storage[]>([
        {
            id: 1,
            feedBack: '마무리가 꼼꼼해요',
            isChecked: false
        },
        {
            id: 2,
            feedBack: '요청사항과 같아요',
            isChecked: false
        },
        {
            id: 3,
            feedBack: '잘 맞아요',
            isChecked: false
        },
        {
            id: 4,
            feedBack: '트렌디해요',
            isChecked: false
        }
    ])
    const WriteReviewBottomBar =
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignContent: "center", position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "#ffffff" }}>
                <ButtonSection style={{ flex: 1, marginHorizontal: 10, marginBottom: 40, marginTop: 10 }}>
                    <FooterButton style={{ flex: 0.6, backgroundColor: "#DBFC72" }}>
                        <Subtitle16B style={{ color: "#612FEF" }}>등록하기</Subtitle16B>
                    </FooterButton>
                </ButtonSection>
            </View>
        </SafeAreaView>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DetailScreenHeader
                title='후기 작성'
                leftButton='CustomBack'
                onPressLeft={() => { }}
                rightButton='Exit'
                onPressRight={() => handleBackPress(navigation, showBottomBar)}
            />
            <SafeAreaView>
                <ScrollView
                    bounces={false} ref={scrollRef}>
                    {/* 그림이랑 마켓명, 서비스 이름 들어가는 곳 */}
                    <View style={{ flexDirection: 'row', padding: 16, borderBottomColor: '#DFDFDF', borderBottomWidth: 1 }}>
                        <Image
                            style={{ alignSelf: 'center', width: width * (0.2), height: width * (0.2) }}
                            source={{ uri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp' }}
                        />
                        <View style={{ flexDirection: 'column', padding: 16, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontWeight: "700" }}>{marketName}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "700" }}>{serviceName}</Text>
                        </View>
                    </View>
                    {/* 상품은 어떠셨나요~ + 별점 */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 28 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>상품은 어떠셨나요?</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: "700", color: "#BDBDBD", marginBottom: 20 }}>별점을 매겨주세요</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <StarRating />
                        </View>
                    </View>
                    {/* 거래, 디자인 체크하는 부분 시작 */}
                    <View style={{ flex: 1, padding: 16, borderBottomWidth: 1, alignItems: 'center', borderBottomColor: "#DFDFDF" }}>
                        {/* 연보라 상자 */}
                        <View style={{
                            height: height * (0.25), width: width * 0.9, borderRadius: 12, backgroundColor: "#E9EBF8",
                            flexDirection: 'row', padding: 16, justifyContent: 'space-around'
                        }}>
                            {/* 거래 부분 */}
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View style={{
                                    height: height * 0.03, width: width * 0.13, backgroundColor: "#FFFFFF",
                                    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, borderRadius: 12, marginBottom: 6
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: "700" }}>거래</Text>
                                </View>
                                {tradeFeed.map((item) => (
                                    <View>
                                        <BouncyCheckbox
                                            isChecked={item.isChecked || false}
                                            size={25}
                                            fillColor="#612FEF"
                                            unfillColor="#FFF"
                                            textComponent=<ReviewComponent feedBack={item.feedBack} />
                                            iconStyle={{ borderColor: "#612FEF" }}
                                            innerIconStyle={{ borderWidth: 2 }}
                                            onPress={(isChecked) =>
                                                handleCheckboxChange1(isChecked, item.id)
                                            }
                                        />
                                    </View>
                                ))}
                            </View>
                            {/* 디자인 부분 */}
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View style={{
                                    height: height * 0.03, width: width * 0.16, backgroundColor: "#FFFFFF",
                                    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, borderRadius: 12, marginBottom: 6
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: "700" }}>디자인</Text>
                                </View>
                                {designFeed.map((item) => (
                                    <View>
                                        <BouncyCheckbox
                                            isChecked={item.isChecked || false}
                                            size={25}
                                            fillColor="#612FEF"
                                            unfillColor="#FFF"
                                            textComponent=<ReviewComponent feedBack={item.feedBack} />
                                            iconStyle={{ borderColor: "#612FEF" }}
                                            innerIconStyle={{ borderWidth: 2 }}
                                            onPress={(isChecked) =>
                                                handleCheckboxChange1(isChecked, item.id)
                                            }
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1, borderBottomWidth: 1, alignSelf: 'center', width: width, alignItems: 'center',
                        borderBottomColor: "#DFDFDF", justifyContent: 'center', paddingTop: 16
                    }}>
                        <View style={{ width: width * 0.9 }}>
                            <View style={{ flexDirection: 'row', paddingBottom: 10, alignSelf: 'flex-start' }}>
                                <Body16B>내용</Body16B>
                            </View>
                            <View style={{ width: width * 0.9 }}>
                                <InputBox value={message} setValue={setMessage} placeholder="메세지를 입력하세요" long />
                            </View>
                            <View style={{ flexDirection: 'column', paddingVertical: 10, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                                <Text style={{ color: '#929292', fontSize: 14, fontWeight: '700', marginBottom: 4 }}>● 주의사항: 어쩌구 </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {WriteReviewBottomBar}
        </SafeAreaView>
    )

}

export default WriteReviewPage