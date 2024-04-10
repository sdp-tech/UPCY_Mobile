import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PortfolioWrite from './PortfolioWrite';

export interface AddPortfolioProps {
  route: any;
  navigation: any;
}

export type AddPortfolioParams = {
  PortfolioWrite: undefined;
};

export default function AddPortfolio() {
  const Stack = createNativeStackNavigator<AddPortfolioParams>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PortfolioWrite">
      <Stack.Screen name="PortfolioWrite" component={PortfolioWrite} />
    </Stack.Navigator>
  );
}
