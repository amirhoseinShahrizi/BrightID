import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { DEVICE_LARGE } from '@/utils/deviceConstants';
import { headerOptions, NavHome } from './helpers';
import AppsScreenController from '@/components/Apps/AppsScreenController';
import { Stack } from './Navigator';
import { GRAY1, GRAY10 } from '@/theme/colors';
import Info from '@/components/Icons/NewInfoIcon';
import { TouchableOpacity, View } from 'react-native';


const headerRightIcon = () => {

  return <>
    <TouchableOpacity style={{paddingRight: 20}}>
      <Info />
    </TouchableOpacity>
  </>
}


const topOptions: StackNavigationOptions = {
  ...headerOptions,
  headerRight: headerRightIcon,
  headerTitle: 'Application',
  headerLeft: () => <NavHome />,

  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: GRAY1,
    height: 56,
    paddingVertical: 16,
    // shadowRadius: 0,
    elevation: 0,
    // paddingRight: 100
  },
  
  // headerTintColor: 'transparent',
  // headerTransparent: true,
  
};

const Apps = () => (
  <Stack.Screen
    name="Apps"
    component={AppsScreenController}
    options={topOptions}
  />
);

export default Apps;
