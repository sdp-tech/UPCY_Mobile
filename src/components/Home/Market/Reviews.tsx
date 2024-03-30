import ReviewItem from '../components/ReviewItem';
import { FlatList } from 'react-native-gesture-handler';

const Reviews = () => {
    return (
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
    )
}

export default Reviews