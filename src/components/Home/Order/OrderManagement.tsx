import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-safearea-height';
import { Title20B, Body14R, Caption11M } from '../../../styles/GlobalText.tsx';
import { BLACK, BLACK2 } from '../../../styles/GlobalColor.tsx';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import DetailScreenHeader from '../components/DetailScreenHeader.tsx';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabProps } from '../../../../App.tsx';
import OrderManagementTabs from './OrderManagementTabs';
import OrderPage from './OrderPage.tsx';
import QuotationPage, { QuotationProps } from '../Quotation/QuotationPage.tsx';
import CompletedOrderPop from './CompletedOrderPop.tsx';
import WriteReviewPage from '../Market/WriteReviewPage.tsx';

type OrderInfoType = {
  id: string;
  name: string;
  customer: string;
  orderDate: string;
  is_online: boolean;
  navigation: any;
}

export type OrderProps = {
  navigation: any;
  route: any;
  flatListRef?: React.RefObject<FlatList<any>>;
}

export type OrderStackParams = {
  OrderManagementTabs: undefined;
  OrderPage: undefined;
  CompletedOrder: undefined;
  QuotationPage: QuotationProps;
  WriteReviewPage: undefined;
}

const OrderStack = createStackNavigator<OrderStackParams>();

const OrderScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<TabProps, '주문관리'>) => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="OrderPage" component={OrderPage} />
      <OrderStack.Screen name="CompletedOrderPop" component={CompletedOrderPop} />
      <OrderStack.Screen name="QuotationPage" component={QuotationPage} />
      <OrderStack.Screen name="WriteReviewPage" component={WriteReviewPage} />
    </OrderStack.Navigator>
  )
}



const OrderManagement = ({ navigation, route }: BottomTabScreenProps<TabProps, '주문관리'>) => {
  const { width } = Dimensions.get('window');
  const scrollRef = useRef<ScrollView | null>(null);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <OrderStack.Navigator>
        {/* OrderManagementTabs: 탭 네비게이션 */}
        <OrderStack.Screen
          name="OrderManagementTabs"
          component={OrderManagementTabs}
          options={{
            header: () => (
              <DetailScreenHeader
                title="주문 관리"
                leftButton="CustomBack"
                onPressLeft={() => {}}
                rightButton="None"
                onPressRight={() => {}}
              />
            ),
          }}
        />
        <OrderStack.Screen
          name="QuotationPage"
          component={QuotationPage}
          options={{
            title: '주문 상세',
            headerStyle: { backgroundColor: '#f0f0f0' },
            headerTintColor: '#000',
          }}
        />
      </OrderStack.Navigator>
    </SafeAreaView>
  );
};

export default OrderManagement;
