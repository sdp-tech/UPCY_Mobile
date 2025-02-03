import React from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import NewOrders from './NewOrders';
import InProgressOrders from './InProgressOrders';
import CompletedOrders from './CompletedOrders';
import { BLACK, LIGHTGRAY, PURPLE, GREEN } from '../../../styles/GlobalColor';

const OrderManagementTabs = ({ navigation, route }: any) => {
  return (
    <Tabs.Container
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          activeColor={PURPLE} // 활성 탭 글씨 색상
          inactiveColor='gray' // 비활성 탭 글씨 색상
          indicatorStyle={{
            backgroundColor: PURPLE, // 활성 탭 인디케이터 색상
            height: 4, // 인디케이터 두께
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
          tabStyle={{
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}
        />
      )}
    >
      <Tabs.Tab name="새 주문">
        <Tabs.ScrollView>
          <NewOrders navigation={navigation} route={route} />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="거래 중">
        <Tabs.ScrollView>
          <InProgressOrders />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="완료/취소">
        <Tabs.ScrollView>
          <CompletedOrders />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default OrderManagementTabs;
