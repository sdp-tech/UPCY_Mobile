import { NavigationProp } from '@react-navigation/native';
import { BottomBarContextType } from '../../contexts/BottomBarContext'

export const handleBackPress = (
    navigation: NavigationProp<any>,
    showBottomBar: BottomBarContextType['showBottomBar']
) => {
    showBottomBar(); // 바텀바 보이게 설정

    if (navigation.canGoBack()) {
        navigation.goBack(); // 이전 화면으로 이동
    } else {
        navigation.navigate('UPCY', { screen: 'HomeScreen' }); // goBack 불가능하면 홈으로 이동
    }
};