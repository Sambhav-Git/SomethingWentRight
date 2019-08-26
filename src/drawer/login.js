import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../views/login';

import config from '../config/stack';

const LoginDrawerItem = createStackNavigator({
  Playground: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
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

LoginDrawerItem.navigationOptions = {
  drawerLabel: () => null,
};

export default LoginDrawerItem;
