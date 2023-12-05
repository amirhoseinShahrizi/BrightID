import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { createSelector } from '@reduxjs/toolkit';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTranslation } from 'react-i18next';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from '@/store/hooks';
import {
  fetchApps,
  selectActiveDevices,
  setActiveNotification,
  updateBlindSigs,
} from '@/actions';
import { linkedContextTotal } from '@/reducer/appsSlice';
import { verifiedConnectionsSelector } from '@/reducer/connectionsSlice';
import { retrieveImage } from '@/utils/filesystem';
import { BLACK, BLUE, DARKER_GREY, GRAY1, GRAY10, GRAY2, GRAY6, GRAY7, GRAY8, GRAY9, INFO, LIGHT_INFO, LIGHT_SUCCESS, LIGHT_WARNING, ORANGE, PRIMARY, SUCCESS, WARNING, WHITE } from '@/theme/colors';
import fetchUserInfo from '@/actions/fetchUserInfo';
import ChatBox from '@/components/Icons/ChatBox';
import Camera from '@/components/Icons/Camera';
import { DEVICE_LARGE } from '@/utils/deviceConstants';
import { fontSize } from '@/theme/fonts';
import { setHeaderHeight } from '@/reducer/walkthroughSlice';
import {
  removeCurrentNodeUrl,
  selectBaseUrl,
  selectIsPrimaryDevice,
} from '@/reducer/settingsSlice';
import { NodeApiContext } from '@/components/NodeApiGate';
import { getVerificationPatches } from '@/utils/verifications';
import {
  selectCompletedTaskIds,
  selectTaskIds,
} from '@/components/Tasks/TasksSlice';

import { version as app_version } from '../../package.json';
import { uInt8ArrayToB64 } from '@/utils/encoding';
import { updateSocialMediaVariations } from '@/components/EditProfile/socialMediaThunks';
import {
  DEEP_LINK_PREFIX,
  discordUrl,
  UNIVERSAL_LINK_PREFIX,
} from '@/utils/constants';
import { LinearGradient } from 'react-native-svg';
import Friends from './Icons/Friends';
import Discord from './Icons/Discord';
import QrCodeIcon from './Icons/QrCodeIcon';
import QrCodeScannerIcon from './Icons/QrCodeScannerIcon';

/**
 * Home screen of BrightID
 * ==========================
 */

/** Selectors */

export const verificationPatchesSelector = createSelector(
  (state: RootState) => state.user.verifications,
  getVerificationPatches,
);

/** HomeScreen Component */

export const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const name = useSelector((state) => state.user.name);
  const taskIds = useSelector(selectTaskIds);
  const completedTaskIds = useSelector(selectCompletedTaskIds);
  const verificationPatches = useSelector(verificationPatchesSelector);
  const isPrimaryDevice = useSelector(selectIsPrimaryDevice);
  const activeDevices = useSelector(selectActiveDevices);
  const photoFilename = useSelector((state) => state.user.photo.filename);
  const connectionsCount = useSelector(verifiedConnectionsSelector).length;
  const linkedContextsCount = useSelector(linkedContextTotal);
  const baseUrl = useSelector(selectBaseUrl);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const api = useContext(NodeApiContext);
  const { id } = useSelector((state) => state.user);
  const { secretKey, publicKey } = useSelector((state) => state.keypair);

  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      retrieveImage(photoFilename).then(setProfilePhoto);
      dispatch(fetchUserInfo(api))
        .then(() => {
          console.log(`fetchUserInfo done`);
          setLoading(false);
        })
        .catch((e) => {
          console.log(
            `fetchUserInfo failed: ${e instanceof Error ? e.message : e}`,
          );
          setLoading(false);
        });
    }, [api, dispatch, photoFilename]),
  );

  useEffect(() => {
    if (api) {
      dispatch(fetchApps(api)).then(() => {
        if (isPrimaryDevice) {
          console.log(`updating blind sigs...`);
          dispatch(updateBlindSigs());
        }
      });
      dispatch(updateSocialMediaVariations());
    }
  }, [api, dispatch, isPrimaryDevice]);

  useEffect(() => {
    if (activeDevices.length) {
      console.log(`checking signing key...`);
      const invalidSigingKey = !activeDevices.find(
        (d) => d.signingKey === publicKey,
      );
      if (invalidSigingKey) {
        return Alert.alert(
          t('common.alert.title.invalidSigningKey'),
          t('common.alert.text.invalidSigningKey'),
          [
            {
              text: 'Switch to different node',
              onPress: () => {
                dispatch(removeCurrentNodeUrl());
              },
            },
          ],
        );
      }
    }
  }, [activeDevices, dispatch, publicKey, t]);

  useEffect(() => {
    dispatch(setHeaderHeight(headerHeight));
  }, [dispatch, headerHeight]);

  const { showActionSheetWithOptions } = useActionSheet();

  const handleChat = () => {
    if (__DEV__) {
      const { delStorage } = require('@/utils/dev');
      delStorage(dispatch);
    } else {
      showActionSheetWithOptions(
        {
          options: [
            t('home.chatActionSheet.discord'),
            t('common.actionSheet.cancel'),
          ],
          cancelButtonIndex: 1,
          title: t('home.chatActionSheet.title'),
          showSeparators: true,
          textStyle: {
            color: BLUE,
            textAlign: 'center',
            width: '100%',
          },
          titleTextStyle: {
            textAlign: 'center',
            width: '100%',
          },
        },
        (index) => {
          if (index === 0) {
            Linking.openURL(discordUrl).catch((err) =>
              console.log('An error occurred', err),
            );
          }
        },
      );
    }
  };

  const DeepPasteLink = () => {
    if (__DEV__) {
      return (
        <TouchableOpacity
          testID="pasteDeeplink"
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
          }}
          onPress={async () => {
            let url = await Clipboard.getString();
            if (url.startsWith(`${UNIVERSAL_LINK_PREFIX}connection-code/`)) {
              url = url.replace(`${UNIVERSAL_LINK_PREFIX}connection-code/`, '');

              navigation.navigate('ScanCode', { qrcode: url });
            } else {
              url = url.replace(UNIVERSAL_LINK_PREFIX, DEEP_LINK_PREFIX);
              console.log(`Linking.openURL with ${url}`);
              Linking.openURL(url);
            }
          }}
        >
          <Material
            name="content-paste"
            size={DEVICE_LARGE ? 28 : 23}
            color={WHITE}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const userBrightId = __DEV__ ? (
    <View>
      <Text testID="userBrightId" style={{ fontSize: 6, color: WHITE }}>
        {id}
      </Text>
      <Text testID="userPublicKey" style={{ fontSize: 6, color: WHITE }}>
        {publicKey}
      </Text>
      <Text testID="userSecretKey" style={{ fontSize: 6, color: WHITE }}>
        {uInt8ArrayToB64(secretKey)}
      </Text>
    </View>
  ) : null;

  const badge = (status: String) => {
    if(status === 'Verified'){
      return<View style={[styles.badgeContainer, {borderColor: SUCCESS,
        backgroundColor: LIGHT_SUCCESS}]}>
        <Text style={[styles.badgeText, {color: SUCCESS}]}> 
          {status}
        </Text>
      </View>
    } else if(status === 'Unverified'){
      return<View style={[styles.badgeContainer, {borderColor: WARNING,
        backgroundColor: LIGHT_WARNING, marginBottom: 10}]}>
        <Text style={[styles.badgeText, {color: WARNING}]}> 
          {status}
        </Text>
      </View>
    } else if(status === 'Soon'){
      return<View style={[styles.badgeContainer, {borderColor: INFO,
        backgroundColor: LIGHT_INFO}]}>
        <Text style={[styles.badgeText, {color: INFO}]}> 
          {status}
        </Text>
      </View>
    }
  }

  console.log('hello')

  return (
    <View style={styles.wrapper}>
      <View style={styles.animatedBG}></View>
        <StatusBar
            barStyle="dark-content"
            backgroundColor={GRAY2}
            animated={true}
        />
        <View style={styles.container}>
          
          <View style={styles.backgroundCircle}>
            {profilePhoto ? (
              <Image
                source={{
                  uri: profilePhoto,
                }}
                style={styles.photo}
                resizeMode="cover"
                onError={(e) => {
                  console.log(e);
                }}
                accessible={true}
                accessibilityLabel={t('common.accessibilityLabel.profilePhoto')}
              />
            ) : null}
          </View>

          
          <View style={styles.countsWrapper}>
            <TouchableOpacity style={styles.countsContainer} onPress={() => {
            dispatch(setActiveNotification(null));
            navigation.navigate('Connections');
          }}>
              <Text style={styles.countsNumber}>{connectionsCount}</Text>
              <Text style={styles.countsText}>{t('home.button.connections')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.countsContainer} onPress={() => {
            dispatch(setActiveNotification(null));
            navigation.navigate('Apps', {
              baseUrl: undefined,
              appId: undefined,
              appUserId: undefined,
            });
          }}>
              <Text style={styles.countsNumber}>{linkedContextsCount}</Text>
              <Text style={styles.countsText}>{t('home.button.apps')}</Text>
            </TouchableOpacity>  
          </View>
          
          <Text style={styles.name}>{name}</Text>

            <View style={styles.row}>
              <View style={styles.tripleBox}>
                <View style={styles.tripleBoxTextContainer}>
                  <Text style={styles.tripleBoxHeader}>Meet</Text>
                  <Text style={styles.tripleBoxNormalText}>verification</Text>
                </View>
                {verificationPatches.length > 0 ? (badge('Verified')) : 0 ? (
                  <View style={{margin: 2}}>
                    <ActivityIndicator size="small" color={DARKER_GREY} animating />
                  </View>
                  ) : (
                    <>
                      {badge('Unverified')}
                      <TouchableOpacity style={styles.joinMeetContainer} onPress={() => {
                    Linking.openURL('https://meet.brightid.org');
                  }}>
                        <Text style={styles.joinMeetText}>Join Meet</Text>
                      </TouchableOpacity>
                    </>
                  )
                }                
              </View>
              <View style={styles.horizontalGap} />

              <View style={styles.tripleBox}>
                <View style={styles.tripleBoxTextContainer}>
                  <Text style={styles.tripleBoxHeader}>Bitu</Text>
                  <Text style={styles.tripleBoxNormalText}>verification</Text>
                </View>
                {badge('Soon')}
              </View>

              <View style={styles.horizontalGap} />

            <View style={styles.tripleBox}>
                  <View style={styles.tripleBoxTextContainer}>
                    <Text style={styles.tripleBoxHeader}>Aura</Text>
                    <Text style={styles.tripleBoxNormalText}>verification</Text>
                  </View>
                  {badge('Soon')}
                </View>
            </View>

          {/* <View style={styles.verticalGap}/> */}
          {/* <View style={styles.verticalGap}/> */}
          
          <View style={styles.column}>
            <TouchableOpacity 
              style={styles.firstBtn} 
              onPress={() => {
                navigation.navigate('FindFriendsScreen');
              }}
            >
              <Friends />
              <Text style={styles.firstBtnTxt}>Find Friends</Text>
            </TouchableOpacity>

            <View style={styles.verticalGap}/>

            <View style={[styles.row, {justifyContent: 'space-between', width: '100%'}]}>
              <TouchableOpacity 
                style={styles.secondBtn}
                onPress={() => {
                  dispatch(setActiveNotification(null));
                  navigation.navigate('MyCode');
                }}
                accessible={true}
                accessibilityLabel={t('home.accessibilityLabel.connect')}
              >
                <QrCodeIcon color={WHITE}/>
                <Text style={styles.secondBtnTxt}>{t('home.button.myCode')}</Text>
              </TouchableOpacity>

              {/* <View style={styles.horizontalGap} /> */}

              <TouchableOpacity 
                style={styles.secondBtn}
                onPress={() => {
                  dispatch(setActiveNotification(null));
                  navigation.navigate('ScanCode');
                }}
                accessible={true}
                accessibilityLabel={t('home.accessibilityLabel.connect')}
              >
                <QrCodeScannerIcon color={WHITE}/>
                <Text style={styles.secondBtnTxt}>{t('home.button.scanCode')}</Text>
              </TouchableOpacity>
            </View>

          </View>
          
          {/* <View style={styles.verticalGap}/> */}
          {/* <View style={styles.verticalGap}/> */}
          {/* <View style={styles.verticalGap}/> */}
          
          <TouchableOpacity style={styles.row} onPress={handleChat}>
            <Discord />
            <Text style={styles.discordText}>BrightID Discord</Text>
          </TouchableOpacity>

          
          
        </View>

    </View>
  );
};

// const PHOTO_WIDTH = DEVICE_LARGE ? 90 : 78;
const PHOTO_WIDTH = 120;

const styles = StyleSheet.create({
    joinMeetContainer: {
      position: 'absolute',
      bottom: 0,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      backgroundColor: PRIMARY,
      paddingVertical: 4,
      width: '100%',
      
    },
    joinMeetText: {
      color: GRAY1,
      fontFamily: 'Poppins-Medium',
      fontSize: fontSize[14],
      alignSelf: 'center'
    },
    wrapper: {
      flex: 1,
    },
    animatedBG: {
      // backgroundColor: 'LinearGradient(119deg, #1C1C1C 8.69%, rgba(28, 28, 28, 0.67) 62.63%)',
      backgroundColor: GRAY10,
      height: '25%',
      // zIndex: -10,
      // marginTop: 56
    },
    container: {
      backgroundColor: GRAY1,
      // backgroundColor: 'yellow',
      flex: 1,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      marginTop: -32,
      // justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingHorizontal: 20,
      paddingTop: '24%'
    },
    backgroundCircle: {
      backgroundColor: GRAY1,
      borderRadius: 100,
      height: 140,
      width: 140,
      position: 'absolute',
      top: -60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    photo: {
      width: PHOTO_WIDTH,
      height: PHOTO_WIDTH,
      borderRadius: 100,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    name: {
      position:'absolute',
      top: '16%',
      color: GRAY9,
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize[18],
      fontWeight: '600',
    },
    countsWrapper: {
      flexDirection: 'row', 
      position: 'absolute', 
      top: 14, 
      justifyContent: 'space-between', 
      width: '90%',
      paddingRight: '5%'
    },
    countsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      borderColor: 'red',
    },
    countsNumber: {
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize[22],
      color: GRAY9,
    },
    countsText: {
      fontFamily: 'Poppins-Regular',
      fontSize: fontSize[12],
      color: GRAY8,
    },
    firstBtn: {
      width: '100%',
      borderColor: PRIMARY,
      borderWidth: 1,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 14,
      color: PRIMARY,
    },
    firstBtnTxt: {
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize[16],
      color: PRIMARY,
      marginLeft: 12
    },
    secondBtn: {
      backgroundColor: PRIMARY,
      // flex: 1,
      width: '48%',
      aspectRatio: 1.5,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 16
    },
    secondBtnTxt: {
      fontFamily: 'Poppins-Medium',
      fontSize: fontSize[16],
      color: WHITE,
      fontWeight: '600',
    },
    horizontalGap: {
      width: 20
    },
    verticalGap: {
      height: 20
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
    tripleBox: {
      flex: 1,
      aspectRatio: 1 / 1.25,
      flexDirection: 'column',
      backgroundColor: WHITE,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: GRAY2,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 12,
      paddingBottom: 28
    },
    tripleBoxTextContainer:{
      alignItems: 'center',
    },
    tripleBoxHeader: {
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize[15],
      color: GRAY9,
    },
    tripleBoxNormalText: {
      fontFamily: 'Poppins-Light',
      fontSize: fontSize[10],
      color: GRAY7,
      marginTop: -5
    },
    badgeContainer: {
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth: 1,
      alignSelf: 'center',
      // marginBottom: '25%',
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    badgeText: {
      fontFamily: 'Poppins-Medium',
      fontSize: fontSize[12],
    },
    discordText: {
      fontSize: fontSize[16],
      color: GRAY8,
      textDecorationLine: 'underline',
      fontFamily: 'Poppins-Medium',
      marginLeft: 12,
    }



});

export default HomeScreen;
