import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PortfolioWrite from './PortfolioWrite';
import PortfolioSubmit from './PortfolioSubmit';
import TempStorage from '../Market/TempStorage';

export interface AddPortfolioProps {
  route: any;
  navigation: any;
}

export type AddPortfolioParams = {
  Write: undefined;
  Submit: undefined;
  TempStorage: undefined;
};

export default function AddPortfolio() {
  const Stack = createNativeStackNavigator<AddPortfolioParams>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Write">
      <Stack.Screen name="Write" component={PortfolioWrite} />
      <Stack.Screen name="Submit" component={PortfolioSubmit} />
      <Stack.Screen name="TempStorage" component={TempStorage} />
    </Stack.Navigator>
  );
}
