import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';
import FloatingActionButton from '@/components/Helpers/FloatingActionButton';
import EmptyList from '@/components/Helpers/EmptyList';
import { connectionsSelector } from '@/utils/connectionsSelector';
import { BACKGROUND, GRAY2, ORANGE, PRIMARY, WHITE } from '@/theme/colors';
import { DEVICE_LARGE } from '@/utils/deviceConstants';
import { fontSize } from '@/theme/fonts';
import { NodeApiContext } from '@/components/NodeApiGate';
import { updateConnections, userSelector } from '@/actions';
import ConnectionCard from './ConnectionCard';
import { MAX_DISPLAY_CONNECTIONS } from '@/utils/constants';
import { useDispatch, useSelector } from '@/store/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { MakeConnectionModal } from './modals/MakeConncection';

/**
 * Connection screen of BrightID
 * Displays a search input and list of Connection Cards
 */

/** Helper Component */
const ITEM_HEIGHT = DEVICE_LARGE ? 102 : 92;

const getItemLayout = (_data, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const renderItem = ({ item, index }: { item: Connection; index: number }) => {
  return <ConnectionCard {...item} index={index} />;
};

/** Main Component */

export const ConnectionsScreen = () => {
  const dispatch = useDispatch();
//   const navigation = useNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const api = useContext(NodeApiContext);
  const route: { params?: { group: Group } } = useRoute() as {
    params?: { group: Group };
  };
  const excludeGroup = route.params?.group;
  const connections = useSelector((state) =>
    connectionsSelector(state, excludeGroup?.members),
  ).slice(0, MAX_DISPLAY_CONNECTIONS);
  const { t } = useTranslation();
  const { id } = useSelector(userSelector);

  const handleNewConnection = () => {
    // navigation.navigate('MyCode');
  };

  const ConnectionList = useMemo(() => {
    const onRefresh = async () => {
      console.log('Reloading Connections');
      try {
        const conns = await api.getConnections(id, 'outbound');
        const incomingConns = await api.getConnections(id, 'inbound');
        const incomingConnsById = _.keyBy(incomingConns, 'id');
        for (const conn of conns) {
          conn.incomingLevel = incomingConnsById[conn.id]?.level;
        }
        dispatch(updateConnections(conns));
      } catch (err) {
        console.log(err.message);
      }
    };
    console.log('Rendering Connections List');
    return (
      <FlatList
        style={styles.connectionsContainer}
        data={connections}
        keyExtractor={({ id }, index) => id + index}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingTop: 20,
          flexGrow: 1,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <EmptyList
            iconType="account-off-outline"
            title={t('connections.text.noConnections')}
          />
        }
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, connections]);

  const [makeConnectionModal, setMakeConnectionModal] = useState(false);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={GRAY2}
        animated={true}
      />

      <View style={styles.container} testID="connectionsScreen">
        <MakeConnectionModal  makeConnectionModal={makeConnectionModal} setMakeConnectionModal={setMakeConnectionModal}/>
        <View style={styles.mainContainer}>{ConnectionList}</View>
        {/* <FloatingActionButton onPress={handleNewConnection} /> */}
        
        <TouchableOpacity style={styles.circleButton} onPress={() => {setMakeConnectionModal(true)}}>
            <Material
              name="plus"
              size={36}
              color={WHITE}
              style={{ width: 36, height: 36 }}
            />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  orangeTop: {
    backgroundColor: ORANGE,
    height: DEVICE_LARGE ? 70 : 65,
    width: '100%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    overflow: 'hidden',
    zIndex: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  connectionsContainer: {
    flex: 1,
    width: '100%',
  },
  actionCard: {
    height: DEVICE_LARGE ? 76 : 71,
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_LARGE ? 60 : 55,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    color: WHITE,
    fontSize: fontSize[11],
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: ORANGE,
    backgroundColor: PRIMARY,
    width: 56,
    height: 56,
    borderRadius: 27,
    // shadowColor: 'rgba(0,0,0,0.5)',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 4,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
});

export default ConnectionsScreen;
