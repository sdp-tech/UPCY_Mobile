import { useState } from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";  // Tabs를 불러오는 부분을 확인하세요
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const OrderPage = ({ navigation }: { navigation: any }) => {

    const { width } = Dimensions.get("window");

    const [orderlist, setOrderList] = useState([
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
        <Tabs.Container>
            {orderlist.map((order, index) => (
                <Tabs.Tab name={`Tab ${index}`} key={index}>
                    <OrderInfoBox>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: width * 0.05
                            }}
                        >
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 14,
                                    fontWeight: "500"
                                }}
                            >
                                {order.orderDate}
                            </Text>

                            {!order.is_finished ? (
                                <TradingTag>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontWeight: '700'
                                        }}
                                    >
                                        거래중
                                    </Text>
                                </TradingTag>
                            ) : (
                                <FinishedTag>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontWeight: '700'
                                        }}
                                    >
                                        거래 완료
                                    </Text>
                                </FinishedTag>
                            )}

                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: width * 0.05
                            }}
                        >
                            <ImageBackground
                                style={{
                                    width: width * 0.25,
                                    height: width * 0.25
                                }}
                                imageStyle={{
                                    height: width * 0.25
                                }}
                                source={{ uri: order.photoUri }}
                            />

                            <View
                                style={{
                                    flexDirection: "column",
                                    flex: 1,
                                    justifyContent: "space-around",
                                    paddingLeft: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "700"
                                    }}
                                >
                                    {order.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "700",
                                        color: "#8E8E8E"
                                    }}
                                >
                                    결제 금액: {order.price}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "500"
                                    }}
                                >
                                    거래 방식: {order.is_online ? '비대면' : '대면'}
                                </Text>
                            </View>
                        </View>

                    </OrderInfoBox>
                </Tabs.Tab>
            ))}
        </Tabs.Container>
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

export default OrderPage;
