import React from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import NewOrders from './NewOrders';
import InProgressOrders from './InProgressOrders';
import CompletedOrders from './CompletedOrders';

const OrderManagementTabs = () => {
  return (
    <Tabs.Container>
      <Tabs.Tab name="새 주문">
        <Tabs.ScrollView>
          <NewOrders />
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
