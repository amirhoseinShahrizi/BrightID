import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { fontSize } from '@/theme/fonts';
import Search from '@/components/Icons/Search';
import { GRAY4, GRAY6, GRAY9, GREY, LIGHT_BLACK, WHITE } from '@/theme/colors';
import { useDispatch, useSelector } from '@/store/hooks';
import SearchIcon from '../Icons/connectionPage/SearchIcon';

/**
 * Search Bar in the Connections Screen
 * TODO: Add functionality for the Ionicons
 * TODO: add search filter in redux actions
 */

const SearchBarRedesigned = ({
  setSearchValue,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // reset search Param
    return () => {
      dispatch(setSearchValue(''));
      // console.log('clearing search param');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (<View style={styles.searchIconContainer}>
    <SearchIcon />
    {/* <Text style={styles.searchText}>Search name...</Text> */}
        <TextInput
          testID="SearchParam"
          onChangeText={(value) => {
            dispatch(setSearchValue(value));
          }}
          style={styles.searchText}
          placeholder={'Serach name...'}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="none"
          underlineColorAndroid="transparent"
          placeholderTextColor={GRAY6}
          clearTextOnFocus={true}
          textAlign='left'
          onFocus={() => {
            dispatch(setSearchValue(''));
          }}
        />
  </View>
  );
};

const styles = StyleSheet.create({
  searchText: {
    textAlign: 'center',
    color: GRAY9,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize[14],
    fontWeight: '400',
    marginLeft: 16,
    width: '90%'
  },
  searchIconContainer: {
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: GRAY4
  },
});

export default SearchBarRedesigned;
