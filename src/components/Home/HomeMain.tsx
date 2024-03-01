import { useEffect, useState } from 'react';
import { Filter14M } from '../../styles/GlobalText';
import {Text, View, TouchableOpacity, Dimensions } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../pages/Home';

import TabViewSpot from '../../../assets/common/TabViewSpot.svg';
import styled from 'styled-components/native';
import { PURPLE } from '../../styles/GlobalColor';

const { width } = Dimensions.get('window'); //411

const HomeTabViewBox = styled.View `
    width: 762px;
    height: 36px;
    overflow-x: auto;
`

interface HomeTabViewProps {
    onSearch: () => void;
      
}
const HomeTabView = ({onSearch}:HomeTabViewProps) => {
    const [routes] = useState([
        { key: 'all', title: '전체' },
        { key: 'outer', title: '아우터' },
        { key: 'top', title: '상의' },
        { key: 'bottom', title: '하의' },
        { key: 'bag', title: '가방' },
        { key: 'hat', title: '모자' },
        { key: 'accessories', title: '잡화' }
      ]);
    
    return(
        <HomeTabViewBox>
            <Tabs.Container
            
            renderTabBar={props => (
              <MaterialTabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: '#BDBDBD',
                  height: 2
                }}
                style={{
                  backgroundColor: '#612FEF',
                }}
                labelStyle={{
                  color: '#DBFC72',
                  fontWeight: '700',
                  fontSize: 12
                }}/>)}
              >
                {routes.map(route =>
                    (<Tabs.Tab key={route.key} name={route.title}>
                        {route.key === 'all' }
                        {route.key === 'outer' }
                        {route.key === 'top' }
                        {route.key === 'bottom' }
                        {route.key === 'bag'  }
                        {route.key === 'hat' }
                        {route.key === 'accessories' }
                    </Tabs.Tab>)
                 )}
            </Tabs.Container>
        </HomeTabViewBox>
    )
}

export default HomeTabView;