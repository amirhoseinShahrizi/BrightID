import React, { useContext, useMemo, useState } from 'react';
import { BLACK, GRAY1, GRAY2, GRAY9, PRIMARY, WHITE } from "@/theme/colors";
import { fontSize } from "@/theme/fonts";
import {  Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import Close from '@/components/Icons/Close';
import { c } from 'msw/lib/glossary-de6278a9';
import QrCodeIcon from '@/components/Icons/QrCodeIcon';
import Friends from '@/components/Icons/Friends';
import { useDispatch, useSelector } from '@/store/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import Modal from "react-native-modal";


export const MakeConnectionModal = ({makeConnectionModal, setMakeConnectionModal}) => {

  // const navigation = useNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();


    const handleModalRequestClose = () => {
        setMakeConnectionModal(false);
    }

    return <>
    
    {/* <ReactNativeModal>

    </ReactNativeModal> */}
    
    {makeConnectionModal && <TouchableOpacity style={styles.closingModalView} onPress={() => {setMakeConnectionModal(false)}} />}
    <Modal  animationType='slide' visible={makeConnectionModal} transparent={true} onRequestClose={() => handleModalRequestClose()}>
        {/* <TouchableOpacity style={styles.closingModal} onPress={() => {handleModalRequestClose()}} /> */}
        <TouchableWithoutFeedback onPress={() => {handleModalRequestClose()}}>
            <View style={styles.closingModal}/>
        </TouchableWithoutFeedback>


        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}> 

              <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeaderText}>
                      Make Connection
                  </Text>
                  <TouchableOpacity style={styles.closeIconContainer} onPress={() => {handleModalRequestClose()}}>
                      <Close />
                  </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.rowContainer} 
                  onPress={() => {
                    handleModalRequestClose();
                    navigation.navigate('MyCode');
                    }
                  }
                >
                  <QrCodeIcon color={GRAY9} width={20} height={20}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      My Code
                  </Text>
              </TouchableOpacity>

              <View style={styles.splitter}/>

              <TouchableOpacity style={styles.rowContainer} onPress={() => {
                handleModalRequestClose();
                navigation.navigate('FindFriendsScreen');

              }}>
                  <Friends color={GRAY9}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      Find Friends
                  </Text>
              </TouchableOpacity>

          </View>
        </View>
    </Modal>
  </>

}

const styles = StyleSheet.create({
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
      justifyContent: 'flex-start',
      paddingLeft: 20,
      alignItems: 'center',
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
      modalText: {
        textAlign: 'center',
        color: BLACK,
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
        height: 236,
        backgroundColor: GRAY1,
        justifyContent: 'flex-start',
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        position: 'relative',
        bottom: 0,
        alignItems: 'center',
        zIndex: 900
      },
});