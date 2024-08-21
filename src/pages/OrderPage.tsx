import { useState } from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

interface Order {
    name: string;
    price: any;
    is_online: boolean; // 비대면이면 true 
    photoUri?: any;
    orderDate: string;
    is_finished: boolean; // 거래중이면 false 
}

const OrderPage = ({ navigation }: { navigation: any }) => {
    const { width } = Dimensions.get("window");
    // 밑에 프로퍼티들 받아오는 api 연결 필요 
    const [name, setName] = useState<string>('서비스 이름 어쩌구저쩌구');
    const [price, setPrice] = useState<any>('35,000원');
    const [is_online, setOnline] = useState<boolean>(true);
    const [photoUri, setPhotoUri] = useState<any>('https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp');
    const [orderDate, setOrderDate] = useState<string>('2024-05-22');
    const [is_finished, setFinished] = useState<boolean>(true);
    // orderList만 받아오면 위에 것들은 무시해도 됨. 
    // name이 들어가 있는 곳은 item.name으로 수정하면 됨 (orderlist.map 만들고 나서)
    const [orderlist, setOrderList] = useState<Order[]>([
        {
            name: '서비스 이름 어쩌구저쩌구 1',
            price: '30,000',
            is_online: true,
            photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
            orderDate: '2024-05-22',
            is_finished: false
        },
        {
            name: '서비스 이름 어쩌구저쩌구 2',
            price: '35,000',
            is_online: false,
            photoUri: 'https://image.made-in-china.com/2f0j00efRbSJMtHgqG/Denim-Bag-Youth-Fashion-Casual-Small-Mini-Square-Ladies-Shoulder-Bag-Women-Wash-Bags.webp',
            orderDate: '2024-05-08',
            is_finished: true
        },
    ]);

    return (
        <Tabs.ScrollView style={{ overflow: "hidden" }} bounces={false} overScrollMode="never">
            <OrderInfoBox>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: width * 0.05 }}>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: "500" }}>{orderDate}</Text>
                    {!is_finished ? ( // 거래중 / 거래 완료
                        <TradingTag>
                            <Text style={{ fontSize: 13, fontWeight: '700' }}>거래중</Text>
                        </TradingTag>) : (
                        <FinishedTag>
                            <Text style={{ fontSize: 13, fontWeight: '700' }}>거래 완료</Text>
                        </FinishedTag>
                    )}
                </View>
                <View style={{ flexDirection: "row", marginBottom: width * 0.05 }}>
                    <ImageBackground
                        style={{ width: width * 0.25, height: width * 0.25 }}
                        imageStyle={{ height: width * 0.25 }}
                        source={{ uri: photoUri }} />
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: "space-around", paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "700" }}>{name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: "700", color: "#8E8E8E" }}>결제 금액:{price}</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500" }}>거래 방식: {is_online ? '비대면' : '대면'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: width * 0.055, paddingBottom: !is_finished ? width * 0.05 : 0, borderBottomWidth: !is_finished ? 1 : 0, borderColor: "#BDBDBD" }}>
                    <ChatButton>
                        <Text style={{ color: "#612FEF", fontSize: 14, fontWeight: "700" }}>오픈 채팅</Text>
                    </ChatButton>
                    <QuotationButton onPress={() => navigation.navigate('QuotationPage')}>
                        <Text style={{ color: "white", fontSize: 14, fontWeight: "700" }}>견적서</Text>
                    </QuotationButton>
                </View>
            </OrderInfoBox>
        </Tabs.ScrollView>
    );
}

const TradingTag = styled.View`
    padding: 5px 14px;
    background-color: #D9D9D9;
    border-radius: 19px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 13px;
`;

const FinishedTag = styled.View`
    padding: 5px 14px;
    background-color: #DBFC72;
    border-radius: 19px;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 13px;
`;

const OrderInfoBox = styled.View`
    border-radius: 14px;
    border-color: #612FEF;
    border-width: 1px;
    flex-direction: column;
    padding: 19px;
    margin: 10px;
    min-height: ${Dimensions.get("window").width * 0.2}px;
    flex-grow: 0;
`;

const ChatButton = styled.View`
    border-color: #612FEF;
    border-width: 1px;
    flex: 1;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;

const QuotationButton = styled.TouchableOpacity`
    background-color: #612FEF;
    flex: 1;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;

export default OrderPage;