import * as React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
// import { LinearGradient } from 'expo';
import HomeScreen from './components/HomeScreen';
import ConnectionsScreen from './components/ConnectionsScreen';
import GroupsScreen from './components/GroupsScreens/GroupsScreen';
import Onboard from './components/OnboardingScreens/Onboard';
import SignUp from './components/OnboardingScreens/SignUp';
import NewConnectionScreen from './components/WebrtcScreens/NewConnectionScreen';
import RtcAnswerScreen from './components/WebrtcScreens/RtcAnswerScreen';
import PreviewConnectionScreen from './components/WebrtcScreens/PreviewConnectionScreen';
import SuccessScreen from './components/WebrtcScreens/SuccessScreen';
import AppBootstrap from './AppBootstrap';

/**
 * This is BrightID's router, written with React-Navigation
 * Here's the app flow:
 * bootstrap component loads user data from async storage
 * this determines whether to navigate to the onboarding or app stack
 * the onboarding stack contains an intro screen, and a screen for uploading a photo and creating a user name
 * the appstack contains most of the app
 */

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Connections: {
      screen: ConnectionsScreen,
    },
    Groups: {
      screen: GroupsScreen,
    },
    NewConnection: {
      screen: NewConnectionScreen,
    },
    RtcAnswer: {
      screen: RtcAnswerScreen,
    },
    Success: {
      screen: SuccessScreen,
    },
    PreviewConnection: {
      screen: PreviewConnectionScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      title: 'BrightID',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'EurostileRegular',
        fontWeight: '200',
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
      headerBackground: (
        <LinearGradient
          colors={['#F52828', '#F76B1C']}
          style={{ flex: 1, width: '100%' }}
        />
      ),
    },
  },
);

const OnboardingStack = createStackNavigator(
  {
    Onboard: {
      screen: Onboard,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    initialRouteName: 'Onboard',
    navigationOptions: {
      title: 'BrightID',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'EurostileRegular',
        fontWeight: '200',
        fontSize: 24,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
      headerTransparent: true,
      headerBackground: (
        <LinearGradient
          colors={['#F52828', '#F76B1C']}
          style={{ flex: 1, width: '100%' }}
        />
      ),
    },
  },
);

export default createSwitchNavigator(
  {
    AppBootstrap,
    App: AppStack,
    Onboarding: OnboardingStack,
  },
  {
    initialRouteName: 'AppBootstrap',
  },
);
