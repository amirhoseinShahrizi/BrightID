import React, { useState } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { HeaderShownContext, useHeaderHeight } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';
import codePush from 'react-native-code-push';
import { SvgXml } from 'react-native-svg';
import { useDispatch, useSelector } from '@/store/hooks';
import {
  setEditProfileMenuLayout,
  setEditProfileTextLayout,
} from '@/reducer/walkthroughSlice';
// import HomeScreen from '@/components/HomeScreen';
import HomeScreen from '@/components/HomeScreenRedesigned';
import { BLACK, ORANGE, WHITE, GREY, PRIMARY, GRAY9, GRAY2, DRAWER_BACKGROUND, GRAY10, DRAWER_BLURED_BACKGROUND } from '@/theme/colors';
import { fontSize } from '@/theme/fonts';
import { DEVICE_LARGE, DEVICE_IOS } from '@/utils/deviceConstants';
import { retrieveImage, photoDirectory } from '@/utils/filesystem';
import Home from '@/components/Icons/Home';
import Pencil from '@/components/Icons/Pencil';
import RecoveryAccount from '@/components/Icons/RecoveryAccount';
import List from '@/components/Icons/List';
import GraphQl from '@/components/Icons/GraphQl';
import Faq from '@/components/Icons/Faq';
import Mail from '@/components/Icons/Mail';
import Devices from '@/components/Icons/Devices';
import FindFriendsScreen from '@/components/FindFriends/FindFriendsScreen';
import TasksScreen from '@/components/Tasks/TasksScreen';
import BituVerificationScreen from '@/components/Tasks/BituVerificationScreen';
import GraphExplorerScreen from '@/components/SideMenu/GraphExplorerScreen';
import ContactUsScreen from '@/components/SideMenu/ContactUsScreen';
import EditProfileScreen from '@/components/EditProfile/EditProfileScreen';
import RecoveryConnectionsScreen from '@/components/RecoveryConnections/RecoveryConnectionsScreen';
import GroupsDrawerIcon from '@/static/groups_drawer.svg';
import FindFriendsIcon from '@/static/findfriends_drawer.svg';
import { SettingsScreen } from '@/components/SideMenu/SettingsScreen';
import AppSettings from '@/components/Icons/AppSettings';
import HomeIcon from '@/components/Icons/drawer/HomeIcon';
import EditProfileIcon from '@/components/Icons/drawer/EditProfileIcon';
import RecoveryConnectionsIcon from '@/components/Icons/drawer/RecoverConnectionsIcon';
import AchievementsIcon from '@/components/Icons/drawer/AchievementsIcon';
import GroupsIcon from '@/components/Icons/drawer/GroupsIcon';
import ExplorerIcon from '@/components/Icons/drawer/ExplorerIcon';
import SettingsIcon from '@/components/Icons/drawer/SettingsIcon';
import ContactUsIcon from '@/components/Icons/drawer/ContactUsIcon';
import TutorialIcon from '@/components/Icons/drawer/TutorialIcon';
import { BrightIdLogo, HdrLeft, NotificationBell } from '@/components/Header/Header';

const CustomItem = ({
  onPress,
  label,
  icon: Icon,
  focused,
  testId,
}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      testID={testId}
      activeOpacity={0.3}
      style={[
        styles.drawerItem,
        {
          backgroundColor: focused
            ? WHITE
            : 'transparent',
        },
      ]}
      onPress={onPress}
      onLayout={(e) => {
        if (label === 'Edit Profile') {
          //  X / Y / Height of the entire menu element for walkthough box
          dispatch(setEditProfileMenuLayout(e.nativeEvent?.layout));
        }
      }}
    >
      <Icon  color={focused ? PRIMARY : GRAY9} width={20} height={20}/>
      <Text
        style={[
          styles.labelStyle,
          {
            color: focused ? PRIMARY : GRAY9,
          },
        ]}
        onLayout={(e) => {
          if (label === 'Edit Profile') {
            // use text to determine proper width of walkthrough box
            dispatch(setEditProfileTextLayout(e.nativeEvent?.layout));
          }
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (props) => {
  const { state, navigation } = props;
  // selectors
  const photoFilename = useSelector((state) => state.user.photo.filename);
  const name = useSelector((state) => state.user.name);
  // keep profile photo up to date
  const [profilePhoto, setProfilePhoto] = useState('');
  const { t } = useTranslation();

  retrieveImage(photoFilename).then(setProfilePhoto);
  // React.useLayoutEffect(() => {}, [navigation])


  // prevent console error and blank photo
  const profileSource = profilePhoto
    ? {
        uri: profilePhoto,
      }
    : {
        uri: `file://${photoDirectory()}/${photoFilename}`,
      };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={profileSource}
          style={styles.drawerPhoto}
          accessibilityLabel="user photo"
        />
        <Text style={styles.userName}>{name}</Text>
      </View>
      <CustomItem
        testId="drawerHomeBtn"
        focused={state.routeNames[state.index] === 'HomeScreen'}
        label={t('drawer.label.home')}
        icon={HomeIcon}
        onPress={() => {
          navigation.navigate('HomeScreen');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Home</Text>}
          })
        }}
      />
      <CustomItem
        testId="drawerEditProfileBtn"
        focused={state.routeNames[state.index] === 'Edit Profile'}
        label={t('drawer.label.editProfile')}
        icon={EditProfileIcon}
        onPress={() => {
          navigation.navigate('Edit Profile');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Edit Profile</Text>},
            headerStyle: {
              // height: DEVICE_LARGE ? 80 : 70,
              height: 52,
              shadowRadius: 0,
              elevation: -1,
              zIndex: 0,
            },
            
          })
        }}
      />
      <CustomItem
        testId="drawerRecoveryConnectionsBtn"
        focused={state.routeNames[state.index] === 'Recovery Connections'}
        label="Recovery Connections"
        icon={RecoveryConnectionsIcon}
        onPress={() => {
          navigation.navigate('Recovery Connections');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Recovery Connections</Text>}
          })
        }}
      />
      <CustomItem
        testId="drawerAchievementsBtn"
        focused={state.routeNames[state.index] === 'Achievements'}
        label={t('drawer.label.achievements')}
        icon={AchievementsIcon}
        onPress={() => {
          navigation.navigate('Achievements');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Achievements</Text>}
          })
        }}
      />

      <CustomItem
        focused={false}
        testId="groupsBtn"
        label={t('drawer.label.groups')}
        icon={GroupsIcon}
        onPress={() => {
          navigation.navigate('Groups');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Groups</Text>}
          })
        }}
      />

      <CustomItem
        testId="drawerExplorerCodeBtn"
        focused={state.routeNames[state.index] === 'Copy Explorer Code'}
        label={t('drawer.label.copyExplorerCode')}
        icon={ExplorerIcon}
        onPress={() => {
          navigation.navigate('Copy Explorer Code');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Explorer Code</Text>}
          })
        }}
      />

      {/* <CustomItem
        focused={false}
        testId="findFriendsBtn"
        inactiveTintColor={BLACK}
        inactiveBackgroundColor={WHITE}
        activeTintColor={WHITE}
        activeBackgroundColor={ORANGE}
        label={t('drawer.label.findFriends')}
        icon={() => (
          <SvgXml
            xml={FindFriendsIcon}
            width={DEVICE_LARGE ? 28 : 24}
            height={DEVICE_LARGE ? 28 : 24}
          />
        )}
        onPress={() => {
          navigation.navigate('FindFriendsScreen');
        }}
      /> */}

      {/* <CustomItem
        focused={false}
        testId="devicesBtn"
        inactiveTintColor={BLACK}
        inactiveBackgroundColor={WHITE}
        activeTintColor={WHITE}
        activeBackgroundColor={ORANGE}
        label={t('drawer.label.devices')}
        icon={({ focused }) => (
          <Devices
            width={DEVICE_LARGE ? 28 : 24}
            height={DEVICE_LARGE ? 28 : 24}
            color={focused ? GREY : BLACK}
            highlight={focused ? WHITE : ORANGE}
          />
        )}
        onPress={() => {
          navigation.navigate('Devices', { syncing: false, asScanner: false });
        }}
      /> */}

      <CustomItem
        testId="drawerSettingsBtn"
        focused={state.routeNames[state.index] === 'Settings'}
        label={t('drawer.label.settings', 'Settings')}
        icon={SettingsIcon}
        onPress={() => {
          navigation.navigate('Settings');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Settings</Text>}
          })
        }}
      />
      {/* <CustomItem
        testId="drawerUpdateBtn"
        focused={false}
        inactiveTintColor={BLACK}
        inactiveBackgroundColor={WHITE}
        activeTintColor={WHITE}
        activeBackgroundColor={ORANGE}
        label={t('drawer.label.checkForUpdates')}
        icon={({ focused }) => (
          <Faq
            width={DEVICE_LARGE ? 28 : 24}
            height={DEVICE_LARGE ? 28 : 24}
            color={focused ? GREY : BLACK}
            highlight={focused ? WHITE : ORANGE}
          />
        )}
        onPress={() => {
          codePush.sync(
            {
              updateDialog: {},
              installMode: codePush.InstallMode.IMMEDIATE,
            },
            (status) => {
              if (status === codePush.SyncStatus.UP_TO_DATE) {
                Alert.alert(
                  t('drawer.alert.title.upToDate'),
                  t('drawer.alert.text.upToDate'),
                );
              }
            },
          );
        }}
      /> */}
      <CustomItem
        testId="drawerContactUsBtn"
        focused={state.routeNames[state.index] === 'ContactUs'}
        label={t('drawer.label.contactUs')}
        icon={ContactUsIcon}
        onPress={() => {
          navigation.navigate('ContactUs');
          navigation.setOptions({
            headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Contact us</Text>}
          })
        }}
      />

      <CustomItem
        testId="drawerTutorialBtn"
        focused={state.routeNames[state.index] === 'Tutorial'}
        label={t('drawer.label.tutorial')}
        icon={TutorialIcon}
        onPress={() => {
          // navigation.navigate('ContactUs');
          // navigation.setOptions({
          //   headerTitle: () => {return <Text style={{fontFamily: 'Poppins-Medium', fontSize: fontSize[18], fontWeight: '600',}}>Contact us</Text>}
          // })
        }}
      />

      {/* {__DEV__ && (
        <CustomItem
          testId="drawerIconsBtn"
          focused={state.routeNames[state.index] === 'SampleIconPage'}
          // style={styles.drawerItem}
          // labelStyle={styles.labelStyle}
          label="Sample Icon Page"
          icon={({ focused }) => (
            <List
              width={DEVICE_LARGE ? 28 : 24}
              height={DEVICE_LARGE ? 28 : 24}
              color={focused ? GREY : BLACK}
              highlight={focused ? WHITE : ORANGE}
            />
          )}
          onPress={() => {
            navigation.navigate('SampleIconPage');
          }}
        />
      )} */}
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

export const HomeDrawer = () => {
  let headerHeight = useHeaderHeight();
  if (DEVICE_IOS && DEVICE_LARGE) {
    headerHeight += 7;
  }



  return (
    <Drawer.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        sceneContainerStyle: [styles.sceneContainer],
        drawerStyle: [styles.drawer],
        // drawerActiveTintColor: WHITE,
        // drawerInactiveTintColor: BLACK,
        // drawerActiveBackgroundColor: ORANGE,
        // drawerInactiveBackgroundColor: WHITE,
        drawerItemStyle: styles.drawerItem,
        drawerLabelStyle: styles.labelStyle,
        overlayColor: DRAWER_BLURED_BACKGROUND,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} navigation={props.navigation} />}
      
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Achievements" component={TasksScreen} />
      <Drawer.Screen name="FindFriendsScreen" component={FindFriendsScreen} />
      <Drawer.Screen
        name="BituVerification"
        component={BituVerificationScreen}
      />
      <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />
      <Drawer.Screen
        name="Recovery Connections"
        component={RecoveryConnectionsScreen}
      />
      <Drawer.Screen
        name="Copy Explorer Code"
        component={GraphExplorerScreen}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      {__DEV__ && (
        <Drawer.Screen
          name="SampleIconPage"
          component={require('@/components/Icons/SamplePage').default}
        />
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: WHITE,
  },
  drawer: {
    zIndex: 100,
    elevation: 100,
    width: '78%',
    marginTop: 52,
    // borderTopRightRadius: 40,
    backgroundColor: DRAWER_BACKGROUND,
    opacity: 0.99,
    shadowColor: 'rgba(196, 196, 196, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  drawerPhoto: {
    width: DEVICE_LARGE ? 48 : 42,
    height: DEVICE_LARGE ? 48 : 42,
    borderRadius: 71,
  },
  profileContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    // paddingLeft: DEVICE_LARGE ? 45 : 35,
    paddingLeft: 20,
    paddingTop: DEVICE_LARGE ? 20 : 18,
    // paddingBottom: DEVICE_LARGE ? 30 : 25,
    paddingBottom: 16,
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[16],
    marginLeft: DEVICE_LARGE ? 20 : 18,
  },
  drawerItem: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 20,
    overflow: 'hidden',
    // paddingLeft: DEVICE_LARGE ? 43 : 34,
    paddingLeft: 16,
    paddingVertical: 16,
    borderRadius: 12
  },
  labelStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[16],
    marginLeft: 16,
  },
});
