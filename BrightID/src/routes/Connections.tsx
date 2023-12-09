import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import i18next from 'i18next';
import ConnectionsScreen from '@/components/Connections/ConnectionsScreen';
import ConnectionScreenController from '@/components/Connections/ConnectionScreenController';
import SearchConnections from '@/components/Helpers/SearchConnections';
import { headerOptions, AnimatedHeaderTitle, NavHome } from './helpers';
import { Stack } from './Navigator';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SortIcon from '@/components/Icons/connectionPage/SortIcon';
import Filter from '@/components/Icons/connectionPage/Filter';
import { fontSize } from '@/theme/fonts';
import { GRAY1, GRAY9 } from '@/theme/colors';
import Trashcan from '@/components/Icons/connectionPage/Trashcan';

const connectionsHeaderRightIcons = () => {
  return <View style={styles.iconContainer}>
    <TouchableOpacity onPress={() => {}}>
      <SortIcon />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
      <Filter />
    </TouchableOpacity>
  </View>
}

const connectionHeaderRight = () => {
  return <View style={styles.iconContainer}>
    <TouchableOpacity onPress={() => {}}>
      <Trashcan />
    </TouchableOpacity>
  </View>
}

const connectionsScreenOptions: StackNavigationOptions = {
  ...headerOptions,
  // headerRight: () => <SearchConnections />,
  headerRight: () => connectionsHeaderRightIcons(),
  headerLeft: () => <NavHome />,
  headerTitle: () => (
    // <AnimatedHeaderTitle
    //   text={i18next.t('connections.header.connections', 'Connections')}
    // />
    <Text style={styles.headerTitleText}>
      {i18next.t('connections.header.connections', 'Connections')}
    </Text>
  ),
  headerStyle: {
    backgroundColor: GRAY1,
    height: 56,
    paddingVertical: 16
  },
};

const connectionScreenOptions: StackNavigationOptions = {
  ...headerOptions,
  headerLeft: () => <NavHome />,
  headerRight: () => connectionHeaderRight(),
  headerTitle: () => (
    <Text style={styles.headerTitleText}>
      {i18next.t(
        'connectionDetails.header.connectionDetails',
        'Connection details',
      )}
    </Text>
    // <AnimatedHeaderTitle
    //   text={i18next.t(
    //     'connectionDetails.header.connectionDetails',
    //     'Connection details',
    //   )}
    // />
  ),
  headerStyle: {
    backgroundColor: GRAY1,
    height: 56,
    paddingVertical: 16,
  },
  

};

const Connections = () => {
  return (
    <>
      <Stack.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={connectionsScreenOptions}
      />

      <Stack.Screen
        name="Connection"
        component={ConnectionScreenController}
        options={connectionScreenOptions}
      />
    </>
  );
};

export default Connections;

const styles = StyleSheet.create({

  iconContainer: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-evenly'
  },
  headerTitleText : {
    textAlign: 'center',
    color: GRAY9,
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[16],
    fontWeight: '600',
  }
})
