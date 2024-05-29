import { NavigationProp } from '@react-navigation/native';
import { BottomBarContextType } from '../../contexts/BottomBarContext'

export const handleBackPress = (navigation: NavigationProp<any>, showBottomBar: BottomBarContextType['showBottomBar']) => {
    showBottomBar(); // 먼저 바텀바를 보여주도록 상태 업데이트
    navigation.goBack(); // 그 다음 화면을 이전 스택으로 전환
};