import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import CheckBox from '@react-native-community/checkbox';
import { connection_levels } from '@/utils/constants';
import RadioBtnChecked from '@/components/Icons/connectionPage/RadioBtnChecked';
import { setFilters } from '@/actions';
// import Modal from "react-native-modal";


const trustLevels = [
  connection_levels.SUSPICIOUS,
  connection_levels.JUST_MET,
  connection_levels.ALREADY_KNOWN,
  connection_levels.RECOVERY,
  connection_levels.REPORTED,
];

export const FilterByTrustLevelModal = ({filterByTrustLevel, setFilterByTrustLevel}) => {

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  // const [isChecked, setIsChecked] = useState(false);
  
  const filters = useSelector((state) => state.connections.filters);
  
  const [newFilters, setNewFilters] = useState<ConnectionLevel[]>(
    filters || [],
    );
    
  const onApply = () => {
    dispatch(setFilters(newFilters));
    setFilterByTrustLevel(false);
    // handleModalRequestClose();
    // dispatch(setConnectionsSort(newConnectionsSort));
    // navigation.goBack();
  };

  // const handleCheckboxToggle = () => {
  //   // Toggle the checkbox state
  //   setIsChecked(!isChecked);
  // };


    const handleModalCloseByCancel = () => {
      setNewFilters(filters || [])
      setFilterByTrustLevel(false);
    }


    const renderFilterRadioBtn = (trustLevel: ConnectionLevel) => {
      // const active = btnReason === reason;
      const active = newFilters.includes(trustLevel);
      const updateFilters = () => {
        // start with a new filter array to prevent mutating state
        let updatedFilters = [];
        if (active) {
          // remove filter
          updatedFilters = newFilters.filter((filter) => filter !== trustLevel);
        } else {
          // add filter
          updatedFilters = newFilters.concat(trustLevel);
        }
        setNewFilters(updatedFilters);  
      };

      // useEffect(() => {
      //   console.log({newFilters})
      // }, [newFilters]);
      // useEffect(() => {
      //   console.log({filters})
      // }, [filters]);

      
      return (
        <>
        {/* <TouchableOpacity
          testID={`${trustLevel}-RadioBtn`}
          key={trustLevel}
          onPress={updateFilters}
          style={styles.radioButton}
        >
          <View style={styles.radioSquare}>
            {active && <View style={styles.radioInnerSquare} />}
          </View>
          <View style={styles.radioLabel}>
            <Text style={styles.modalText}>{trustLevel}</Text>
          </View>
        </TouchableOpacity> */}
          <View style={styles.rowContainer}
            key={trustLevel}
          >
              {/* <CheckBox value={isChecked} onValueChange={updateFilters} tintColors={{true: ACTION, false: ACTION}}/> */}
              <TouchableOpacity style={styles.radioBtn} onPress={() => updateFilters()}>
                {active && <RadioBtnChecked />}
              </TouchableOpacity>
              

              <View style={styles.horizontalGap} />
              <Text style={styles.modalText}>
                  {trustLevel}
              </Text>
          </View>

          {
            (trustLevel!=connection_levels.REPORTED) &&
            <View style={styles.splitter}/>
          }
        </>

      );
    };


    return <>
    
    {/* {makeConnectionModal && <TouchableOpacity style={styles.closingModal2} onPress={() => {setMakeConnectionModal(false)}} />} */}
    {filterByTrustLevel && <View  style={styles.closingModalView}/>}
    <Modal  animationType='slide' visible={filterByTrustLevel} transparent={true} onRequestClose={() => handleModalCloseByCancel()}>
        {/* <TouchableOpacity style={styles.closingModal} onPress={() => {handleModalRequestClose()}} /> */}
        <TouchableWithoutFeedback onPress={() => {handleModalCloseByCancel()}}>
            <View style={styles.closingModal}/>
        </TouchableWithoutFeedback>

        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}> 

              <View style={styles.modalHeaderContainer}>
                  <Text style={styles.modalHeaderText}>
                      Filter by Trust Level
                  </Text>
                  <TouchableOpacity style={styles.closeIconContainer} onPress={() => {handleModalCloseByCancel()}}>
                      <Close />
                  </TouchableOpacity>
              </View>

              <View style={styles.radioButtonsContainer}>
                {trustLevels.map(renderFilterRadioBtn)}
              </View>

              {/* <View style={styles.rowContainer}>
                  <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} tintColors={{true: ACTION, false: ACTION}}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      Suspicious
                  </Text>
              </View>

              <View style={styles.splitter}/>
              
              <View style={styles.rowContainer}>
                  <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} tintColors={{true: ACTION, false: ACTION}}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      Just Met
                  </Text>
              </View>

              <View style={styles.splitter}/>

              <View style={styles.rowContainer}>
                  <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} tintColors={{true: ACTION, false: ACTION}}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      Already Known
                  </Text>
              </View>

              <View style={styles.splitter}/>

              <View style={styles.rowContainer}>
                  <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} tintColors={{true: ACTION, false: ACTION}}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      Recovery
                  </Text>
              </View>

              <View style={styles.splitter}/>

              <View style={styles.rowContainer}>
                  <CheckBox value={isChecked} onValueChange={handleCheckboxToggle} tintColors={{true: ACTION, false: ACTION}}/>
                  <View style={styles.horizontalGap} />
                  <Text style={styles.modalText}>
                      Reported
                  </Text>
              </View> */}

              

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn1}
                    onPress={() => {
                        handleModalCloseByCancel();
                    }}
                >
                  <Text style={styles.btn1Text}>Cancel</Text>
                </TouchableOpacity>
                <View style={{width: 20}}/>
                <TouchableOpacity style={styles.btn2}
                    onPress={onApply}
                >
                  <Text style={styles.btn2Text}>Apply Filter</Text>
                </TouchableOpacity>
              </View>

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
  radioBtn: {
    width: 20,
    height: 20,
    borderWidth: 1.4,
    borderRadius: 6,
    borderColor: ACTION,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioButtonsContainer: {
    marginLeft: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
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
        color: GRAY9,
        fontFamily: 'Poppins-Medium',
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