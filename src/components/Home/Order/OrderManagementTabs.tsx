import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewOrders from './NewOrders';
import InProgressOrders from './InProgressOrders';
import CompletedOrders from './CompletedOrders';

const Tab = createMaterialTopTabNavigator();

const OrderManagementTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="NewOrders"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#BDBDBD', height: 2 },
        tabBarLabelStyle: { fontWeight: '700', fontSize: 16 },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen name="새 주문" component={NewOrders} />
      <Tab.Screen name="거래 중" component={InProgressOrders} />
      <Tab.Screen name="완료/취소" component={CompletedOrders} />
    </Tab.Navigator>
  );
};

export default OrderManagementTabs;
