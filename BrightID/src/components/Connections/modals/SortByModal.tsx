import React, { useContext, useMemo, useState } from 'react';
import { ACTION, BLACK, GRAY1, GRAY2, GRAY9, PRIMARY, WHITE } from "@/theme/colors";
import { fontSize } from "@/theme/fonts";
import {  Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import Close from '@/components/Icons/Close';
import { c } from 'msw/lib/glossary-de6278a9';
import QrCodeIcon from '@/components/Icons/QrCodeIcon';
import Friends from '@/components/Icons/Friends';
import { useDispatch, useSelector } from '@/store/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TrustIcon from '@/components/Icons/connectionPage/Trust';
import Calendar from '@/components/Icons/connectionPage/Calendar';
import UserSquare from '@/components/Icons/connectionPage/UserSquare';
import UpArrow from '@/components/Icons/connectionPage/UpArrow';
import { types } from '@/utils/sorting';
import { setConnectionsSort, setFilters } from '@/actions';
import Chevron from '@/components/Icons/Chevron';
import Camera from '@/components/Icons/Camera';
// import Modal from "react-native-modal";

const ascending = [
  types.byNameAscending,
  types.byDateAddedAscending,
  types.byTrustLevelAscending,
];

const byName = [types.byNameDescending, types.byNameAscending];

const byDate = [types.byDateAddedDescending, types.byDateAddedAscending];

const byTrust = [types.byTrustLevelDescending, types.byTrustLevelAscending];



export const SortModal = ({sortModal, setSortModal}) => {

  const dispatch = useDispatch();

  const filters = useSelector((state) => state.connections.filters);

  // const navigation = useNavigation();
  const connectionsSort =
    useSelector((state) => state.connections.connectionsSort) ||
    types.byDateAddedDescending;

  const [newFilters, setNewFilters] = useState<ConnectionLevel[]>(
    filters || [],
  );

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [newConnectionsSort, setNewConnectionsSort] = useState(connectionsSort);

  const onApply = () => {
    // dispatch(setFilters(newFilters));
    dispatch(setConnectionsSort(newConnectionsSort));
    setSortModal(false);
    // handleModalRequestClose();
    // navigation.goBack();
  };

    const handleModalCloseByCancel = () => {
      setNewConnectionsSort(connectionsSort)
      setSortModal(false);
    }

    return <>
    
    {/* <ReactNativeModal>

    </ReactNativeModal> */}
    
    {/* {makeConnectionModal && <TouchableOpacity style={styles.closingModal2} onPress={() => {setMakeConnectionModal(false)}} />} */}
    
    {sortModal && <View style={styles.closingModalView}/>}
    <Modal  animationType='slide' visible={sortModal} transparent={true} onRequestClose={() => handleModalCloseByCancel()}>
        {/* <TouchableOpacity style={styles.closingModal} onPress={() => {handleModalRequestClose()}} /> */}
        <TouchableWithoutFeedback onPress={() => {handleModalCloseByCancel()}}>
            <View style={styles.closingModal}/>
        </TouchableWithoutFeedback>

        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}> 

              <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeaderText}>
                      Sort by
                  </Text>
                  <TouchableOpacity style={styles.closeIconContainer} onPress={() => {handleModalCloseByCancel()}}>
                      <Close />
                  </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.rowContainer} 
                  onPress={() => {
                    // toggles sort method
                    const sortMethod = byDate
                      .filter((n) => n !== newConnectionsSort)
                      .shift();
                    setNewConnectionsSort(sortMethod);
                  }}
                >
                  <View style={{flexDirection: 'row'}}>
                    <Calendar color={
                        byDate.includes(newConnectionsSort)
                        ? ACTION
                        : GRAY9}
                    />
                    <View style={styles.horizontalGap} />
                    <Text style={[
                      styles.modalText,
                      byDate.includes(newConnectionsSort)
                      ? styles.activeButtonText
                      : {},
                      ]}
                    >
                        Date
                    </Text>
                  </View>
                  {
                    byDate.includes(newConnectionsSort) &&
                    <Chevron
                    width={16}
                    height={16}
                    strokeWidth={byDate.includes(newConnectionsSort) ? 3 : 1.5}
                    color={byDate.includes(newConnectionsSort) ? ACTION : GRAY9}
                    direction={
                      byDate.includes(newConnectionsSort) &&
                      ascending.includes(newConnectionsSort)
                        ? 'up'
                        : 'down'
                    }
                  />}
              </TouchableOpacity>

              <View style={styles.splitter}/>

              <TouchableOpacity style={[styles.rowContainer, {}]} 
                onPress={() => {
                  // toggles sort method
                  const sortMethod = byName
                    .filter((n) => n !== newConnectionsSort)
                    .shift();
                  setNewConnectionsSort(sortMethod);
                }}
              >
                  <View style={{flexDirection: 'row'}}>
                    <UserSquare color={
                        byName.includes(newConnectionsSort)
                        ? ACTION
                        : GRAY9}
                    />
                    <View style={styles.horizontalGap} />
                    <Text 
                      style={[styles.modalText,
                        byName.includes(newConnectionsSort)
                        ? styles.activeButtonText
                        : {},]}
                    >
                        Name
                    </Text>
                  </View>
                  {
                    byName.includes(newConnectionsSort) &&
                    <Chevron
                    width={16}
                    height={16}
                    strokeWidth={byName.includes(newConnectionsSort) ? 3 : 1.5}
                    color={byName.includes(newConnectionsSort) ? ACTION : GRAY9}
                    direction={
                      byName.includes(newConnectionsSort) &&
                      ascending.includes(newConnectionsSort)
                        ? 'up'
                        : 'down'
                    }
                  />}
              </TouchableOpacity>

              <View style={styles.splitter}/>

              <TouchableOpacity style={styles.rowContainer} 
                onPress={() => {
                  const sortMethod = byTrust
                    .filter((n) => n !== newConnectionsSort)
                    .shift();
                  setNewConnectionsSort(sortMethod);
                }}
              >
                  <View style={{flexDirection: 'row'}}>
                    <TrustIcon
                      color={
                        byTrust.includes(newConnectionsSort)
                        ? ACTION
                        : GRAY9}
                    />
                    <View style={styles.horizontalGap} />
                    <Text 
                    style={[styles.modalText,
                      byTrust.includes(newConnectionsSort)
                      ? styles.activeButtonText
                      : {},]}
                    >
                        Trust Level
                    </Text>
                  </View>
                  {
                    byTrust.includes(newConnectionsSort) &&
                    <Chevron
                      width={16}
                      height={16}
                      strokeWidth={byTrust.includes(newConnectionsSort) ? 3 : 1.5}
                      color={byTrust.includes(newConnectionsSort) ? ACTION : GRAY9}
                      direction={
                        byTrust.includes(newConnectionsSort) &&
                        ascending.includes(newConnectionsSort)
                          ? 'up'
                          : 'down'
                      }
                    />
                  }
              </TouchableOpacity>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn1} onPress={handleModalCloseByCancel}>
                  <Text style={styles.btn1Text}>Cancel</Text>
                </TouchableOpacity>
                <View style={{width: 20}}/>
                <TouchableOpacity style={styles.btn2} onPress={onApply}>
                  <Text style={styles.btn2Text}>Apply</Text>
                </TouchableOpacity>
              </View>

          </View>
        </View>
    </Modal>
  </>

}

const styles = StyleSheet.create({
    btn1Text: {
      color: ACTION,
      fontFamily: 'Poppins-Medium',
      fontSize: fontSize[16],
      fontWeight: '600',
      textAlign: 'center',
      // marginRight: '50%',
    },
    btn1: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: ACTION
    },
    btn2Text: {
      color: GRAY1,
      fontFamily: 'Poppins-Medium',
      fontSize: fontSize[16],
      fontWeight: '600',
      textAlign: 'center',
      // marginRight: '50%',
    },
    btn2: {
      flex: 1,
      paddingVertical: 14,
      backgroundColor: ACTION,
      borderRadius: 16
    },
    btnContainer: {
      flexDirection: 'row',
      width: '90%',
      marginTop: 40
    },
    splitter: {
      width: '90%',
      height: 1,
      backgroundColor: GRAY2,
      marginVertical: 16,
      // paddingHorizontal: 20
      
    },
    rowContainer: {
      width: '100%',
      flexDirection: 'row',
      paddingLeft: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 20
      // justifyContent: 'flex-start',
      // backgroundColor: 'red'

    },

    closeIconContainer: {
        position: 'absolute',
        top: 21,
        right: 30
    },
    modalHeaderText: {
        // marginRight: 30,
        fontFamily: 'Poppins-Bold',
        // fontFamily: 'Poppins-Regular',
        fontSize: fontSize[16],
        fontWeight: '600',
        textAlign: 'center',
        color: GRAY9,
        // marginRight: '50%',
      },
      modalHeaderContainer: {
        flexDirection: 'row',
        // alignContent: 'center'
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: GRAY2,
        width: '100%',
        paddingVertical: 21,
        marginBottom: 20
      },
      activeButtonText: {
        color: ACTION
      },
      modalText: {
        textAlign: 'center',
        color: GRAY9,
        fontFamily: 'Poppins-Regular',
        fontSize: fontSize[14],
        fontWeight: '400',
      },
      horizontalGap: {
        width: 12
      },
      modalBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      closingModalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // justifyContent:'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1001,
        // width: '100%',
        // height: '100%'
      },
      closingModal: {
        flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        // justifyContent:'center',
      },
      modalCenteredView: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        // top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: "100%",
        // height: 236,
        backgroundColor: GRAY1,
        justifyContent: 'flex-start',
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        position: 'relative',
        bottom: 0,
        alignItems: 'center',
        paddingBottom: 40,
        zIndex: 1001,
      },
});