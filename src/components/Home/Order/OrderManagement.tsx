import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderManagementTabs from './OrderManagementTabs';
import DetailScreenHeader from '../components/DetailScreenHeader';

const OrderManagement = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <DetailScreenHeader
        title="주문 관리"
        leftButton="CustomBack"
        onPressLeft={() => navigation.goBack()}
        rightButton="None"
        onPressRight={() => {}}
      />
      <OrderManagementTabs />
    </SafeAreaView>
  );
};

export default OrderManagement;
