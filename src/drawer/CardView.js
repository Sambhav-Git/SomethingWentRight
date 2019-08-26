import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import CardView from '../views/cardView';

import config from '../config/stack';

const CardViewDrawerItem = createStackNavigator({
  CardView: {
    screen: CardView,
    navigationOptions: ({ navigation }) => ({
      title: 'Wallet',
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

CardViewDrawerItem.navigationOptions = {
  drawerLabel: 'Wallet',
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

export default CardViewDrawerItem;
