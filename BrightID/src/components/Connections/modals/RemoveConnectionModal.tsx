import React, { useContext, useMemo, useState } from 'react';
import { ACTION, BLACK, ERROR, GRAY1, GRAY2, GRAY8, GRAY9, PRIMARY, WHITE } from "@/theme/colors";
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
// import Modal from "react-native-modal";


export const RemoveConnectionModal = ({removeConnectionModal, setRemoveConnectionModal}) => {

  // const navigation = useNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();


    const handleModalRequestClose = () => {
        setRemoveConnectionModal(false);
    }

    return <>
    
    {/* <ReactNativeModal>

    </ReactNativeModal> */}
    
    {/* {makeConnectionModal && <TouchableOpacity style={styles.closingModal2} onPress={() => {setMakeConnectionModal(false)}} />} */}
    <Modal  animationType='slide' visible={removeConnectionModal} transparent={true} onRequestClose={() => handleModalRequestClose()}>
        <TouchableWithoutFeedback onPress={() => {handleModalRequestClose()}}>
            <View style={styles.closingModal}/>
        </TouchableWithoutFeedback>

        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}> 

              <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeaderText}>
                      Remove Connection
                  </Text>
                  <TouchableOpacity style={styles.closeIconContainer} onPress={() => {handleModalRequestClose()}}>
                      <Close />
                  </TouchableOpacity>
              </View>

              <Text style={styles.infoText}>Are you sure you want to remove {'Alfredo Di Stéfano'} from your connections?</Text>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn1} onPress={() => {
                    handleModalRequestClose();
                    // navigation.navigate('MyCode');
                    }
                  }>
                  <Text style={styles.btn1Text}>Cancel</Text>
                </TouchableOpacity>

                <View style={{width: 20}}/>

                <TouchableOpacity style={styles.btn2} onPress={() => {
                    handleModalRequestClose();
                    // navigation.navigate('MyCode');
                    }
                  }>
                  <Text style={styles.btn2Text}>Remove</Text>
                </TouchableOpacity>
              </View>

          </View>
        </View>
    </Modal>
  </>

}

const styles = StyleSheet.create({
    infoText: {
      color: GRAY9,
      fontFamily: 'Poppins-Regular',
      fontSize: fontSize[14],
      fontWeight: '500',
      textAlign: 'center',
      // marginRight: '50%',
    },
    btn1Text: {
      color: GRAY8,
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
      borderColor: GRAY8
    },
    btn2Text: {
      color: ERROR,
      fontFamily: 'Poppins-Medium',
      fontSize: fontSize[16],
      fontWeight: '600',
      textAlign: 'center',
      // marginRight: '50%',
    },
    btn2: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: ERROR
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
      closingModal2: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // justifyContent:'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        width: '100%',
        height: '100%'
      },
      closingModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
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