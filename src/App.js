import React, { useState } from 'react';
import { View, Image, Dimensions, AsyncStorage } from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';

import AppLoading from './components/AppLoading';
import { cacheImages, cacheFonts } from './helpers/AssetsCaching';

import Pricing from './drawer/pricing';
import Wallet from './drawer/CardView';
import Login from './drawer/login';
import Profile from './drawer/profile';
import Lists from './drawer/lists';
import Settings from './drawer/settings';
import Report from './drawer/report';
import Insurance from './drawer/insurance';
import TripDetail from './views/trip_detail';
import ScratchCard from './views/ScratchCard';

import vectorFonts from './helpers/vector-fonts';

const WINDOW_WIDTH = Dimensions.get('window').width;

const isLoggedIn=true;

AsyncStorage.getItem("isLoggedIn").then((value) => {
  if(value === "true"){
    isLoggedIn = true;
  }
}).done();

const CustomDrawerContentComponent = props => {
  var copyprops = Object.assign({}, props);
  copyprops.items = copyprops.items.filter(item => item.key !== 'TripDetail')
  copyprops.items = copyprops.items.filter(item => item.key !== 'ScratchCard')
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('./images/icon1.png')}
          style={{ width: 210, height: 100 }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <DrawerItems {...copyprops} />
      </View>
    </View>
  )
}

const MainRoot = createAppContainer(
  createDrawerNavigator(
    {
      Login: {
        path: '/login',
        screen: Login,
      },
      Profile: {
        path: '/profile',
        screen: Profile,
      },
      Lists: {
        path: '/lists',
        screen: Lists, 
      },
      Report: {
        path: '/report',
        screen: Report,
      },
      Insurance: {
        path: '/insurance',
        screen: Insurance,
      },
      "TripDetail": {
        path: '/trip_detail',
        screen: TripDetail,
      },
      Pricing: {
        path: '/pricing',
        screen: Pricing,
      },
      Wallet: {
        path: '/cardView',
        screen: Wallet,
      },
      ScratchCard: {
        path: '/ScratchCard',
        screen: ScratchCard,
      },
    },
    {
      initialRouteName: isLoggedIn ? 'Lists': 'Login',
      contentOptions: {
        activeTintColor: '#548ff7',
        activeBackgroundColor: 'transparent',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: 'transparent',
        labelStyle: {
          fontSize: 15,
          marginLeft: 0,
        },
      },
      drawerWidth: 250,
      contentComponent: CustomDrawerContentComponent,
    }
  )
);

export default () => {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('../assets/images/bg_screen1.jpg'),
      require('../assets/images/bg_screen2.jpg'),
      require('../assets/images/bg_screen3.jpg'),
      require('../assets/images/bg_screen4.jpg'),
      require('../assets/images/user-cool.png'),
      require('../assets/images/user-hp.png'),
      require('../assets/images/user-student.png'),
      require('../assets/images/avatar1.jpg'),
    ]);

    const fontAssets = cacheFonts([
      ...vectorFonts,
      { georgia: require('../assets/fonts/Georgia.ttf') },
      { regular: require('../assets/fonts/Montserrat-Regular.ttf') },
      { light: require('../assets/fonts/Montserrat-Light.ttf') },
      { bold: require('../assets/fonts/Montserrat-Bold.ttf') },
      { UbuntuLight: require('../assets/fonts/Ubuntu-Light.ttf') },
      { UbuntuBold: require('../assets/fonts/Ubuntu-Bold.ttf') },
      { UbuntuLightItalic: require('../assets/fonts/Ubuntu-Light-Italic.ttf') },
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <MainRoot />;
};