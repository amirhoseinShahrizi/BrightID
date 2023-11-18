import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createSelector } from '@reduxjs/toolkit';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useSelector } from '@/store/hooks';
import { INVITE_ACTIVE } from '@/utils/constants';
import { DEVICE_LARGE } from '@/utils/deviceConstants';
import { BLACK, GRAY1, GRAY10, GRAY9, WHITE } from '@/theme/colors';
// import Bell from '@/components/Icons/NotificationBell';
import Bell from '@/components/Icons/NotificationBellNew';
// import Menu from '@/components/Icons/Menu';
import Menu from '@/components/Icons/MenuNew';
import {
  pendingConnection_states,
  selectAllPendingConnections,
} from '@/components/PendingConnections/pendingConnectionSlice';
import { toggleDrawer, navigate } from '@/NavigationService';
import { fontSize } from '@/theme/fonts';

/** SELECTORS */

const unconfirmedSelector = createSelector(
  selectAllPendingConnections,
  (pendingConnections) =>
    pendingConnections.filter(
      (pc) => pc.state === pendingConnection_states.UNCONFIRMED,
    ),
);

const inviteSelector = createSelector(
  (state: RootState) => state.groups.invites,
  (invites) => invites.filter(({ state }) => state === INVITE_ACTIVE),
);

/** COMPONENTS */

export const NotificationBell = () => {
  const pendingConnections = useSelector(
    (state) => unconfirmedSelector(state)?.length,
  );

  const invites = useSelector((state) => inviteSelector(state)?.length);

  const backupPending = useSelector(
    (state) => state.notifications.backupPending,
  );

  const displayBadge = backupPending || invites || pendingConnections;

  return (
    <TouchableOpacity
      testID="notificationsBtn"
      style={{ marginRight: 25 }}
      onPress={() => {
        Keyboard.dismiss();
        navigate('Notifications');
      }}
    >
      <Bell color={BLACK} alert={true} />
    </TouchableOpacity>
  );
};

/** OPTIONS */

export const BrightIdLogo = () => {
  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //     navigate('HomeScreen');
    //   }}
    //   testID="BrightIdLogo"
    // >
    // </TouchableWithoutFeedback>
    <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Home</Text>
  );
};

export const HdrLeft = () => {
    return (
        <TouchableOpacity
          testID="toggleDrawer"
          style={{
            width: DEVICE_LARGE ? 80 : 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            Keyboard.dismiss();
            toggleDrawer();
            
          }}
        >
          <Menu width={DEVICE_LARGE ? 30 : 24} />
        </TouchableOpacity>
      );
}

const homeScreenOptions: StackNavigationOptions = {
  headerTitle: () => <BrightIdLogo />,
  headerLeft: () => <HdrLeft />,
  headerRight: () => <NotificationBell />,
  headerStyle: {
    // height: DEVICE_LARGE ? 80 : 70,
    height: 52,
    shadowRadius: 0,
    elevation: -1,
    zIndex: 0
  },
  headerBackgroundContainerStyle:{
    backgroundColor: GRAY1,
    zIndex: 0,
    elevation: -1
  },
  headerTitleAlign: 'center',
  // headerTintColor: 'transparent',
  // headerTransparent: true,
  
};