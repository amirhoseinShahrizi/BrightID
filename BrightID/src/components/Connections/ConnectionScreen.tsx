import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SectionList,
  Linking,
  FlatList,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { SvgXml } from 'react-native-svg';
import Clipboard from '@react-native-community/clipboard';
import GroupAvatar from '@/components/Icons/GroupAvatar';
import { photoDirectory } from '@/utils/filesystem';
import { DEVICE_LARGE } from '@/utils/deviceConstants';
import {
  ORANGE,
  BLUE,
  WHITE,
  BLACK,
  DARKER_GREY,
  DARK_BLUE,
  LIGHT_GREY,
  DARK_GREEN,
  GRAY1,
  GRAY10,
  GRAY9,
  GRAY2,
  GRAY7,
  SUCCESS,
  LIGHT_SUCCESS,
  WARNING,
  LIGHT_WARNING,
  INFO,
  LIGHT_INFO,
  GRAY8,
} from '@/theme/colors';
import { fontSize } from '@/theme/fonts';
import { connection_levels, report_sources } from '@/utils/constants';
import Chevron from '../Icons/Chevron';
import TrustLevelView from './TrustLevelView';
import { useSelector } from '@/store/hooks';
import {
  SocialMediaShareActionType,
  SocialMediaType,
} from '@/components/EditProfile/socialMediaVariations';
import { selectAllSocialMediaVariationsByType } from '@/reducer/socialMediaVariationSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Twitter from '../Icons/connectionPage/socialMedia/Twitter';
import Instagram from '../Icons/connectionPage/socialMedia/Instagram';
import Linkedin from '../Icons/connectionPage/socialMedia/Linkedin';
import Telegram from '../Icons/connectionPage/socialMedia/Telegram';
import Discord from '../Icons/connectionPage/socialMedia/Discord';

/**
 Connection details screen
 To make maximum use of the performance optimization from Flatlist/SectionList, the whole
 screen is rendered as SectionList. The Profile information (Photo, Name etc.) is rendered
 via ListHeaderComponent, the "Report" button on the bottom via ListFooterComponent.
* */
type Props = {
  connection: Connection;
  verificationsTexts: Array<string>;
  connectedAt: number;
  mutualGroups: Array<Group>;
  mutualConnections: Array<Connection>;
  recoveryConnections: Array<RecoveryConnection>;
  possibleDuplicates: Array<Connection>;
  loading: boolean;
};

type SocialMediaOnConnectionPage = {
  id: SocialMediaId;
  icon: any;
  shareActionType: SocialMediaShareActionType;
  shareActionData: string;
};

interface Section {
  title: string;
  data: Array<Connection | Group | SocialMediaOnConnectionPage[]>;
  key: ConnectionScreenSectionKeys;
  numEntries: number;
}

enum ConnectionScreenSectionKeys {
  CONNECTIONS = 'connections',
  GROUPS = 'groups',
  RECOVERY_CONNECTIONS = 'recoveryConnections',
  DUPLICATES = 'duplicates',
  SOCIAL_MEDIA = 'socialMedia',
}

const isPhoneNumber = (profile: string): boolean => {
  const c = profile[0];
  return c === '+' || (c >= '0' && c <= '9');
};

const PHOTO_WIDTH = 120;

function ConnectionScreen(props: Props) {
  const {
    connection,
    verificationsTexts,
    connectedAt,
    mutualGroups,
    mutualConnections,
    recoveryConnections,
    loading,
    possibleDuplicates,
  } = props;
  // const navigation = useNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();


  const selectSocialMediaVariations = useMemo(
    selectAllSocialMediaVariationsByType,
    [],
  );
  const socialMediaVariations = useSelector((state) =>
    selectSocialMediaVariations(state, SocialMediaType.SOCIAL_PROFILE),
  );

  const [groupsCollapsed, setGroupsCollapsed] = useState(true);
  const [connectionsCollapsed, setConnectionsCollapsed] = useState(true);
  const [recoveryConnectionsCollapsed, setRecoveryConnectionsCollapsed] =
    useState(true);
  const [possibleDuplicatesCollapsed, setPossibleDuplicatesCollapsed] =
    useState(true);
  const [socialMediaCollapsed, setSocialMediaCollapsed] = useState(true);
  const [connectionSocialMedia, setConnectionSocialMedia] = useState<
    SocialMediaOnConnectionPage[]
  >([]);

  useEffect(() => {
    const socialMediaOnConnectionPage: SocialMediaOnConnectionPage[] = [];
    for (let i = 0; i < socialMediaVariations.length; i++) {
      const element = socialMediaVariations[i];
      const profile = connection.socialMedia?.find(
        (s) => s.id === element.id,
      )?.profile;
      if (profile) {
        let { shareActionType } = element;
        if (
          shareActionType ===
          SocialMediaShareActionType.COPY_IF_PHONE_LINK_IF_USERNAME
        ) {
          if (isPhoneNumber(profile)) {
            shareActionType = SocialMediaShareActionType.COPY;
          } else {
            shareActionType = SocialMediaShareActionType.OPEN_LINK;
          }
        }
        socialMediaOnConnectionPage.push({
          id: element.id,
          icon: element.icon,
          shareActionType,
          shareActionData: element.shareActionDataFormat.replace(
            '%%PROFILE%%',
            profile,
          ),
        });
      }
    }
    setConnectionSocialMedia(socialMediaOnConnectionPage);
  }, [connection, socialMediaVariations]);
  const { t } = useTranslation();

  const toggleSection = (key) => {
    switch (key) {
      case ConnectionScreenSectionKeys.CONNECTIONS:
        setConnectionsCollapsed(!connectionsCollapsed);
        break;
      case ConnectionScreenSectionKeys.GROUPS:
        setGroupsCollapsed(!groupsCollapsed);
        break;
      case ConnectionScreenSectionKeys.RECOVERY_CONNECTIONS:
        setRecoveryConnectionsCollapsed(!recoveryConnectionsCollapsed);
        break;
      case ConnectionScreenSectionKeys.DUPLICATES:
        setPossibleDuplicatesCollapsed(!possibleDuplicatesCollapsed);
        break;
      case ConnectionScreenSectionKeys.SOCIAL_MEDIA:
        setSocialMediaCollapsed(!socialMediaCollapsed);
        break;
    }
  };

  const imageSource = {
    uri: `file://${photoDirectory()}/${connection?.photo?.filename}`,
  };

  const getSections = useMemo(() => {
    const data: Section[] = [
      {
        title: t('connectionDetails.label.mutualConnections'),
        data: connectionsCollapsed ? [] : mutualConnections,
        key: ConnectionScreenSectionKeys.CONNECTIONS,
        numEntries: mutualConnections.length,
      },
      {
        title: t('connectionDetails.label.mutualGroups'),
        data: groupsCollapsed ? [] : mutualGroups,
        key: ConnectionScreenSectionKeys.GROUPS,
        numEntries: mutualGroups.length,
      },
      // {
      //   title: t('connectionDetails.label.recoveryConnections'),
      //   data: recoveryConnectionsCollapsed ? [] : recoveryConnections,
      //   key: ConnectionScreenSectionKeys.RECOVERY_CONNECTIONS,
      //   numEntries: recoveryConnections.length,
      // },
      {
        title: t('connectionDetails.label.possibleDuplicates'),
        data: possibleDuplicatesCollapsed ? [] : possibleDuplicates,
        key: ConnectionScreenSectionKeys.DUPLICATES,
        numEntries: possibleDuplicates.length,
      },
      // {
      //   title: t('connectionDetails.label.socialMedia'),
      //   data: socialMediaCollapsed ? [] : [connectionSocialMedia],
      //   key: ConnectionScreenSectionKeys.SOCIAL_MEDIA,
      //   numEntries: connectionSocialMedia.filter((s) => !!s.shareActionData)
      //     .length,
      // },
    ];
    return data;
  }, [
    t,
    connectionsCollapsed,
    mutualConnections,
    groupsCollapsed,
    mutualGroups,
    recoveryConnectionsCollapsed,
    recoveryConnections,
    possibleDuplicatesCollapsed,
    possibleDuplicates,
    connectionSocialMedia,
    socialMediaCollapsed,
  ]);

  const renderSticker = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={DARKER_GREY} animating />;
    } else {
      return verificationsTexts.length > 0 ? (
        verificationsTexts.map((verificationText, i) => (
          <View key={`verificationView-${i}`} style={styles.verificationBox}>
            <Text key={`verificationText-${i}`} style={styles.verificationText}>
              {verificationText}
            </Text>
          </View>
        ))
      ) : (
        <View style={styles.verificationBox}>
          <Text
            style={{
              ...styles.verificationText,
              color: DARKER_GREY,
              borderColor: DARKER_GREY,
            }}
          >
            Verifications: None
          </Text>
        </View>
      );
    }
  };

  const renderBadge = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={DARKER_GREY} animating />;
    } else {
      return verificationsTexts.length > 0 ? (badge('Verified')) : (badge('Unverified'));
    }
  }

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
        backgroundColor: LIGHT_WARNING}]}>
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
  

  const tripleBoxes = (
    <View style={styles.tripleBoxWrapper}>
      <View style={styles.tripleBox}>
        <View style={styles.tripleBoxTextContainer}>
          <Text style={styles.tripleBoxHeader}>Meet</Text>
          <Text style={styles.tripleBoxNormalText}>verification</Text>
        </View>
        {renderBadge()}
      </View>

      <View style={{width: 20}}/>

      <View style={styles.tripleBox}>
        <View style={styles.tripleBoxTextContainer}>
          <Text style={styles.tripleBoxHeader}>Bitu</Text>
          <Text style={styles.tripleBoxNormalText}>verification</Text>
        </View>
        {badge('Soon')}
      </View>

      <View style={{width: 20}}/>
      

      <View style={styles.tripleBox}>
        <View style={styles.tripleBoxTextContainer}>
          <Text style={styles.tripleBoxHeader}>Aura</Text>
          <Text style={styles.tripleBoxNormalText}>verification</Text>
        </View>
        {badge('Soon')}
      </View>
    </View>
  )

  const renderSocialMedia = (
    <>
      <Text style={styles.socialMediaHeader}>Social Media</Text>
      <View style={styles.socialMediaContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.socialMediaBox}>
            <Twitter />
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback>
          <View style={styles.socialMediaBox}>
            <Instagram />
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback>
          <View style={styles.socialMediaBox}>
            <Linkedin />
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback>
          <View style={styles.socialMediaBox}>
            <Discord />
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback>
          <View style={styles.socialMediaBox}>
            <Telegram />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )

  const connectionHeader = (
    <View style={styles.connectionHeader}>
      <View style={{ alignItems: 'center'}}>
        <View style={styles.connectionInfo}>
            <Text style={styles.connectionTimestampText}>
              {loading
                ? t('connectionDetails.tags.loading')
                : t('connectionDetails.tags.connectedAt', {
                    date: `${moment(
                      parseInt(String(connectedAt), 10),
                    ).fromNow()}`,
                  })}
            </Text>
        </View>

        <View style={styles.photoContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('FullScreenPhoto', {
                  photo: connection.photo,
                });
              }}
            >
              <Image
                source={imageSource}
                style={styles.photo2}
                resizeMode="cover"
                onError={(e) => {
                  console.log(e);
                }}
                accessible={true}
                accessibilityLabel={t('common.accessibilityLabel.userPhoto')}
              />
            </TouchableWithoutFeedback>          
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {connection.name}
        </Text>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TrustLevelView level={connection.level} connectionId={connection.id} />
        </View>
      </View>
      

      {tripleBoxes}
      {renderSocialMedia}


    </View>
  )

  const connectionHeader1 = (
    <>
      <View style={styles.profile}>
        {/* <View style={styles.connectionInfo}>
          <View style={styles.connectionTimestamp}>
            <Text style={styles.connectionTimestampText}>
              {loading
                ? t('connectionDetails.tags.loading')
                : t('connectionDetails.tags.connectedAt', {
                    date: `${moment(
                      parseInt(String(connectedAt), 10),
                    ).fromNow()}`,
                  })}
            </Text>
          </View>
        </View> */}
        <View style={styles.photoContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('FullScreenPhoto', {
                photo: connection.photo,
              });
            }}
          >
            <Image
              source={imageSource}
              style={styles.photo2}
              resizeMode="cover"
              onError={(e) => {
                console.log(e);
              }}
              accessible={true}
              accessibilityLabel={t('common.accessibilityLabel.userPhoto')}
            />
          </TouchableWithoutFeedback>
          
        </View>
        <View style={styles.nameContainer}>
          <View style={styles.nameLabel}>
            <Text style={styles.name} numberOfLines={1}>
              {connection.name}
            </Text>
          </View>
          <View style={styles.profileDivider} />
        </View>
      </View>
      <View style={styles.trustLevelContainer}>
        <TrustLevelView level={connection.level} connectionId={connection.id} />
      </View>
        <View style={styles.verificationsContainer}>{renderSticker()}</View>
      <Text>
        Trust
      </Text>
    </>
  );

  const connectionFooter =
    connection.level !== connection_levels.REPORTED ? (
      <TouchableOpacity
        testID="ReportBtn"
        style={styles.reportBtn}
        onPress={() => {
          navigation.navigate('ReportReason', {
            connectionId: connection.id,
            connectionName: connection.name,
            reporting: true,
            source: report_sources.PROFILE,
          });
        }}
      >
        <Text style={styles.reportBtnText}>
          {t('connectionDetails.button.report')}
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        testID="UnReportBtn"
        style={styles.unReportBtn}
        onPress={() => {
          navigation.navigate('ReportReason', {
            connectionId: connection.id,
            connectionName: connection.name,
            reportReason: connection.reportReason,
            reporting: false,
            source: report_sources.PROFILE,
          });
        }}
      >
        <Text style={styles.unReportBtnText}>
          {t('connectionDetails.button.undoReport')}
        </Text>
      </TouchableOpacity>
    );

  const renderItem = ({ item, index, section }) => {
    if (section.key === ConnectionScreenSectionKeys.RECOVERY_CONNECTIONS) {
      return renderRecoveryItem({ item, index });
    }
    if (section.key === ConnectionScreenSectionKeys.SOCIAL_MEDIA) {
      return renderSocialMediaVariations({ item, index });
    }
    const testID = `${section.key}-${index}`;
    console.log(
      `Rendering Section ${section.key} item ${index} (${item.name}) - testID ${testID}`,
    );
    return (
      <View testID={testID} style={styles.itemContainer}>
        <View style={styles.itemPhoto}>{renderPhoto(item)}</View>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>{item.name}</Text>
        </View>
      </View>
    );
  };

  const renderSocialMediaVariations = ({
    item,
    index,
  }: {
    item: SocialMediaOnConnectionPage[];
    index: number;
  }) => {
    return (
      <FlatList
        style={styles.socialMediaVariations}
        columnWrapperStyle={styles.socialMediaVariationsColumn}
        data={item}
        numColumns={5}
        renderItem={renderSocialMediaVariation}
        keyExtractor={socialMediaVariationsKeyExtractor}
      />
    );
  };

  const socialMediaVariationsKeyExtractor = (
    item: SocialMediaOnConnectionPage,
  ) => {
    return item.id;
  };

  const renderSocialMediaVariation = ({
    item,
  }: {
    item: SocialMediaOnConnectionPage;
  }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (item.shareActionData) {
            const data = item.shareActionData;
            if (item.shareActionType === SocialMediaShareActionType.OPEN_LINK) {
              Linking.openURL(data);
            } else if (
              item.shareActionType === SocialMediaShareActionType.COPY
            ) {
              Clipboard.setString(data);
              if (Platform.OS === 'android') {
                ToastAndroid.show(
                  t('connectionDetails.text.copied'),
                  ToastAndroid.LONG,
                );
              } else {
                Alert.alert(t('connectionDetails.text.copied'));
              }
            }
          }
        }}
      >
        <SvgXml
          xml={item.icon}
          width={DEVICE_LARGE ? 40 : 36}
          height={DEVICE_LARGE ? 40 : 36}
        />
      </TouchableWithoutFeedback>
    );
  };

  const renderRecoveryItem = ({ item, index }) => {
    const testID = `recoveryConnections-${index}`;
    console.log(
      `Rendering Section recoveryConnections item ${index} (${item.id}) - testID ${testID}`,
    );
    const activeAfter = item.activeAfter
      ? `(activates in ${moment
          .duration(item.activeAfter, 'milliseconds')
          .humanize()})`
      : '';
    const activeBefore = item.activeBefore
      ? `(deactivates in ${moment
          .duration(item.activeBefore, 'milliseconds')
          .humanize()})`
      : '';
    return (
      <View testID={testID} style={styles.itemContainer}>
        <View style={styles.itemPhoto}>{renderRecoveryPhoto(item.conn)}</View>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>
            {item?.conn?.name
              ? item.conn.name
              : t('connectionDetails.text.unkownRecoveryConnection')}{' '}
            {activeAfter} {activeBefore}{' '}
          </Text>
        </View>
      </View>
    );
  };

  const renderRecoveryPhoto = (item) => {
    const source = item?.photo?.filename
      ? { uri: `file://${photoDirectory()}/${item.photo.filename}` }
      : require('@/static/default_profile.jpg');
    return (
      <Image
        source={source}
        style={styles.photo}
        resizeMode="cover"
        onError={(e) => {
          console.log(e);
        }}
        accessible={true}
        accessibilityLabel="photo"
      />
    );
  };

  const renderPhoto = (item) => {
    if (item?.photo?.filename) {
      return (
        <Image
          source={{ uri: `file://${photoDirectory()}/${item.photo.filename}` }}
          style={styles.photo}
          resizeMode="cover"
          onError={(e) => {
            console.log(e);
          }}
          accessible={true}
          accessibilityLabel="photo"
        />
      );
    } else {
      return (
        <GroupAvatar
          width={DEVICE_LARGE ? 40 : 36}
          height={DEVICE_LARGE ? 40 : 36}
        />
      );
    }
  };

  const renderSectionHeader = ({ section }: { section: Section }) => {
    let collapsed;
    switch (section.key) {
      case ConnectionScreenSectionKeys.CONNECTIONS:
        collapsed = connectionsCollapsed;
        break;
      case ConnectionScreenSectionKeys.GROUPS:
        collapsed = groupsCollapsed;
        break;
      case ConnectionScreenSectionKeys.RECOVERY_CONNECTIONS:
        collapsed = recoveryConnectionsCollapsed;
        break;
      case ConnectionScreenSectionKeys.DUPLICATES:
        collapsed = possibleDuplicatesCollapsed;
        break;
      case ConnectionScreenSectionKeys.SOCIAL_MEDIA:
        collapsed = socialMediaCollapsed;
        break;
    }
    return (
      <>
        <View style={styles.header}>
          <View style={styles.headerLabel}>
            <Text style={styles.headerLabelText}>{section.title}</Text>
          </View>
          <View style={styles.headerContent}>
            <View style={styles.headerCount}>
              <Text
                testID={`${section.key}-count`}
                style={styles.headerContentText}
              >
                {section.numEntries}
              </Text>
            </View>
            <TouchableOpacity
              testID={`${section.key}-toggleBtn`}
              style={styles.collapseButton}
              onPress={() => toggleSection(section.key)}
              disabled={section.numEntries < 1}
            >
              <Chevron
                width={DEVICE_LARGE ? 18 : 16}
                height={DEVICE_LARGE ? 18 : 16}
                color={section.numEntries ? GRAY8 : LIGHT_GREY}
                direction={collapsed ? 'down' : 'up'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {
          section.key !== ConnectionScreenSectionKeys.DUPLICATES &&
          <View 
          style={{
            width: '100%',
            height: 1,
            backgroundColor: GRAY2,
            marginVertical: 10
          }}
        />}
      </>
    );
  };

  return (
    <>
      <View style={styles.animatedBG} />
      {/* <View style={styles.backgroundCircle}>
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
          </View> */}

      <View testID="ConnectionScreen" style={styles.container}>
        <View style={styles.backgroundCircle}/>

        <SectionList
          style={{width: '100%', zIndex: 200, marginTop: '-27%',}}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          sections={getSections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ListHeaderComponent={connectionHeader}
          // ListFooterComponent={connectionFooter}
          // @ts-ignore: ListFooterComponentStyle is existing, but not included in typescript definition
          // ListFooterComponentStyle={styles.connectionFooter}
          ItemSeparatorComponent={ItemSeparator}
          // SectionSeparatorComponent={SectionSeprator}
          
        />
      </View>
    </>
  );
}

const ItemSeparator = () => {
  return (
    <View
      style={{

        height: 1,
        backgroundColor: GRAY2,
      }}
    />
  );
};


const styles = StyleSheet.create({
  socialMediaHeader: {
    color: GRAY9,
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize[17],
    fontWeight: '600',
    marginBottom: 12
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialMediaBox: {
    width: 48,
    height: 48,
    // flex: 1,
    // marginRight: 20,
    // aspectRatio: 1 / 1,
    backgroundColor: GRAY7,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ItemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: GRAY2,
    marginVertical: 16
  },
  connectionHeader: {
    flexDirection: 'column',
    // marginBottom: 20,
    // marginTop: -50,
    zIndex: 1000
  },
  backgroundCircle: {
    backgroundColor: GRAY1,
    borderRadius: 100,
    height: 140,
    width: 140,
    position: 'absolute',
    top: -60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  photo2: {
    width: PHOTO_WIDTH,
    height: PHOTO_WIDTH,
    borderRadius: 100,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name2: {
    position:'absolute',
    top: '16%',
    color: GRAY9,
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize[18],
    fontWeight: '600',
  },
  animatedBG: {
    // backgroundColor: 'LinearGradient(119deg, #1C1C1C 8.69%, rgba(28, 28, 28, 0.67) 62.63%)',
    backgroundColor: GRAY10,
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -1,
    // marginTop: 56
  },
  // container: {
  //   backgroundColor: GRAY1,
  //   // backgroundColor: 'yellow',
  //   flex: 1,
  //   borderTopLeftRadius: 32,
  //   borderTopRightRadius: 32,
  //   marginTop: -32,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // justifyContent: 'space-evenly',
  //   // paddingHorizontal: 20,
  //   // paddingTop: '24%'
  // },
  wrapper: {
    flex: 1
  },
  socialMediaVariations: {
    marginTop: DEVICE_LARGE ? 8 : 6,
    marginBottom: DEVICE_LARGE ? 8 : 6,
  },
  socialMediaVariationsColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: 10,
    marginTop: DEVICE_LARGE ? 10 : 8,
    marginBottom: DEVICE_LARGE ? 10 : 8,
  },
  container: {
    flex: 1,
    // backgroundColor: 'green',
    backgroundColor: GRAY1,
    // borderTopLeftRadius: 58,
    // marginTop: -58,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    // marginBottom: 5,
    paddingHorizontal: 20,
    zIndex: 1000,
    alignItems: 'center',
    width: '100%'
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center'
    // marginTop: -20,
    // zIndex: 1000
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: '45%',
  },
  profilePhoto: {
    borderRadius: 45,
    width: DEVICE_LARGE ? 90 : 78,
    height: DEVICE_LARGE ? 90 : 78,
    // marginLeft: DEVICE_LARGE ? -5 : -4,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: -3,
    flexGrow: 1,
    maxWidth: '60%',
  },
  nameLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize[18],
    color: GRAY9,
    alignSelf: 'center'
  },
  verificationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: DEVICE_LARGE ? 10 : 0,
    width: '100%',
    backgroundColor: WHITE,
  },
  verificationBox: {
    margin: 1,
  },
  verificationText: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[11],
    color: BLUE,
    borderColor: BLUE,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  profileDivider: {
    borderBottomWidth: 2,
    borderBottomColor: ORANGE,
    paddingBottom: 3,
    width: '98%',
  },
  connectionInfo: {
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GRAY2,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 22
  },
  connectionTimestampText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize[12],
    color: GRAY9,
  },
  trustLevelContainer: {
    marginTop: DEVICE_LARGE ? 16 : 15,
    marginBottom: 10,
  },
  reportBtn: {
    width: '90%',
    borderRadius: 100,
    borderColor: ORANGE,
    borderWidth: 1,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: DEVICE_LARGE ? 13 : 12,
    paddingBottom: DEVICE_LARGE ? 13 : 12,
  },
  reportBtnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize[16],
    color: ORANGE,
    marginLeft: DEVICE_LARGE ? 10 : 8,
  },
  unReportBtn: {
    width: '75%',
    borderRadius: 100,
    borderColor: DARK_GREEN,
    borderWidth: 1,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: DEVICE_LARGE ? 13 : 12,
    paddingBottom: DEVICE_LARGE ? 13 : 12,
  },
  unReportBtnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize[16],
    color: DARK_GREEN,
    marginLeft: DEVICE_LARGE ? 10 : 8,
  },
  header: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLabel: {
    // flex: 2,
  },
  headerLabelText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[14],
    color: GRAY9,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerCount: {
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContentText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize[14],
    color: GRAY8,
  },
  collapseButton: {
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },
  chevron: {
    margin: DEVICE_LARGE ? 7 : 6,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPhoto: {
    margin: 10,
  },
  photo: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  itemLabel: {},
  itemLabelText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[14],
    color: GRAY9,
  },
  connectionFooter: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripleBox: {
    flex: 1,
    aspectRatio: 1 / 1,
    // height: 93,
    flexDirection: 'column',
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // paddingTop: 12,
    paddingBottom: 8
    
  },
  tripleBoxWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20
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
});

export default ConnectionScreen;
