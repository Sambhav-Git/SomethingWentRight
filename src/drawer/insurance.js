import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Insurance from '../views/insurance';

import config from '../config/stack';

const ListsDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: Insurance,

      navigationOptions: ({ navigation }) => ({
        title: 'Insurance',
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
  },
  config,
);

ListsDrawerItem.navigationOptions = {
  drawerLabel: 'Insurance',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="text-document"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="entypo"
      color={tintColor} 
    />
  ),
};

export default ListsDrawerItem;
