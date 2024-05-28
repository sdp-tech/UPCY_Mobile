import { Text, View } from 'react-native';
import ReviewItem from '../components/ReviewItem';
import { FlatList } from 'react-native-gesture-handler';
import React from 'react';
import Review from "../../../assets/common/Review.svg";
import { BLACK } from '../../../styles/GlobalColor';

const Reviews = () => {
    return (
        <View>
            <View style={{
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center',
                borderBottomColor: "#dcdcdc",
                borderBottomWidth: 1,
            }}>
                <Review color={BLACK} />
                <Text style={{ marginLeft: 8 }}>후기(3)</Text>
            </View>
            <FlatList
                data={[...new Array(3).keys()]}
                // 3은 임시. 등록된 리뷰 수만큼 노출. 특정 개수 이상 넘어가면 다른 리뷰 노출하도록 하는 기능 필요할 듯. 
                renderItem={({ item }: any) => {
                    return (
                        <ReviewItem onPress={() => { }} />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default Reviews