import React from 'react';
import { BLACK, GRAY1, GRAY10, GRAY2, GRAY9 } from "@/theme/colors";
import { fontSize } from "@/theme/fonts";
import {  Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import Close from '@/components/Icons/Close';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';


// export const InformationModal = ({informationModal, setInformationModal, totalApps, LinkedApps}) => {
export const InformationModal = () => {

    const navigation = useNavigation();

    const handleModalCloseByCancel = () => {
      // setInformationModal(false);
      navigation.goBack();
    }

    return <>
    {/* { <View style={styles.closingModalView}/>} */}
    <View  style={styles.container}>
        {/* <TouchableOpacity style={styles.closingModal} onPress={() => {handleModalRequestClose()}} /> */}
        {/* <TouchableWithoutFeedback onPress={handleModalCloseByCancel}>
            <View style={styles.blurView}/>
        </TouchableWithoutFeedback> */}
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor={BLACK}
        />
        <TouchableWithoutFeedback onPress={handleModalCloseByCancel}>
          <View style={styles.blurView} />
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
                    {19}
                  </Text>
                </View>

                <View style={styles.horizontalGap}/>

                <View style={styles.appsContainer}>
                  <Text style={styles.normalText}>
                    You're Linked to
                  </Text>
                  <Text style={styles.BoldText}>
                    {0}
                  </Text>
                </View>

              </View>
          </View>
        </View>
    </View>
  </>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
      blurView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
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