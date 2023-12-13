import React from 'react';
import { GRAY1, GRAY10, GRAY2, GRAY9 } from "@/theme/colors";
import { fontSize } from "@/theme/fonts";
import {  Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import Close from '@/components/Icons/Close';


export const InformationModal = ({informationModal, setInformationModal, totalApps, LinkedApps}) => {


    const handleModalCloseByCancel = () => {
      setInformationModal(false);
    }

    return <>
    {informationModal && <View style={styles.closingModalView}/>}
    <Modal  animationType='slide' visible={informationModal} transparent={true} onRequestClose={() => handleModalCloseByCancel()}>
        {/* <TouchableOpacity style={styles.closingModal} onPress={() => {handleModalRequestClose()}} /> */}
        <TouchableWithoutFeedback onPress={() => {handleModalCloseByCancel()}}>
            <View style={styles.closingModal}/>
        </TouchableWithoutFeedback>

        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}> 

              <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeaderText}>
                      Apps Information
                  </Text>
                  <TouchableOpacity style={styles.closeIconContainer} onPress={() => {handleModalCloseByCancel()}}>
                      <Close />
                  </TouchableOpacity>
              </View>

              <View style={styles.modalAppsContainer}>
                <View style={styles.appsContainer}>
                  <Text style={styles.normalText}>
                    Total Apps
                  </Text>
                  <Text style={styles.BoldText}>
                    {totalApps}
                  </Text>
                </View>

                <View style={styles.horizontalGap}/>

                <View style={styles.appsContainer}>
                  <Text style={styles.normalText}>
                    You're Linked to
                  </Text>
                  <Text style={styles.BoldText}>
                    {LinkedApps}
                  </Text>
                </View>

              </View>
          </View>
        </View>
    </Modal>
  </>

}

const styles = StyleSheet.create({
    appsContainer: {
      flex: 1,
      backgroundColor: GRAY2,
      borderRadius: 16,
      paddingHorizontal: 24,
      paddingVertical: 13,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    normalText: {
      color: GRAY9,
      fontSize: fontSize[12],
      fontFamily: 'Poppins-Medium'
    },
    BoldText: {
      color: GRAY10,
      fontSize: fontSize[20],
      fontFamily: 'Poppins-Bold'
    },

    closeIconContainer: {
        position: 'absolute',
        top: 21,
        right: 30
    },
    modalHeaderText: {
        fontFamily: 'Poppins-Bold',
        fontSize: fontSize[16],
        fontWeight: '600',
        textAlign: 'center',
        color: GRAY9,
      },
      modalHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: GRAY2,
        width: '100%',
        paddingVertical: 21,
        marginBottom: 20
      },
      horizontalGap: {
        width: 20
      },
      modalAppsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
      },
      closingModalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1001,
      },
      closingModal: {
        flex: 1,
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