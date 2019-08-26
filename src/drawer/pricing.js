import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Pricing from '../views/pricing';

import config from '../config/stack';

const PricingDrawerItem = createStackNavigator({
  Pricing: {
    screen: Pricing,
    navigationOptions: ({ navigation }) => ({
      title: 'Awards',
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          iconStyle={{ paddingLeft: 10 }}
          onPress={navigation.toggleDrawer}
        />
      ),
    }),
  },
}, config);

PricingDrawerItem.navigationOptions = {
  drawerLabel: 'Awards',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="attach-money"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default PricingDrawerItem;
