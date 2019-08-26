import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Report from '../views/report';

import config from '../config/stack';

const ListsDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: Report,

      navigationOptions: ({ navigation }) => ({
        title: 'Report',
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
  drawerLabel: 'Report',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="list"
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

export default ListsDrawerItem;
