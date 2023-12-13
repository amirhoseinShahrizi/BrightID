import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { GRAY1, GRAY2, GRAY4, GRAY9, ORANGE, WHITE } from '@/theme/colors';
import SearchIcon from '../Icons/connectionPage/SearchIcon';
import { fontSize } from '@/theme/fonts';

type Props = {
  searchTerm: string;
  filter: number;
  setSearchTerm: (searchTerm: string) => void;
  setFilter: (filter: number) => void;
  fadeBackgroundSearch: Animated.AnimatedInterpolation;
  translateYSearch: Animated.AnimatedInterpolation;
};

const AppsScreenFilter = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  fadeBackgroundSearch,
  translateYSearch,
}: Props) => {
  const headerHeight = useHeaderHeight();

  const filters = [
    { name: 'All Apps', id: 1 },
    { name: 'Linked', id: 2 },
    { name: 'Verified', id: 3 },
    { name: 'Sponsoring', id: 4 },
  ];

  return (
    <>
      <View style={styles.searchContainer}>

        <View style={styles.searchIconContainer}>
          <SearchIcon />
          <TextInput
            style={styles.searchText}
            onChangeText={(value) => setSearchTerm(value)}
            placeholder="Search name of app..."
            value={searchTerm}
            // onFocus={handleSearchFocus}
          />
        </View>

        <View style={styles.filterContainer}>
          {filters.map((item, index) => (
            <TouchableOpacity
              testID={`btn-${item.name}`}
              key={item.id}
              style={[
                styles.filterItemContainer,
                { backgroundColor: index === filter ? GRAY1 : 'transparent' },
              ]}
              onPress={() => setFilter(index)}
            >
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  color: GRAY9,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchText: {
    // textAlign: 'center',
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
    borderColor: GRAY4,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 24
  },
  searchBackground: {
    position: 'absolute',
    width: '100%',
    height: 120,
    backgroundColor: `white`,
    zIndex: 5,
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    backgroundColor: GRAY2,
    padding: 4,
    borderRadius: 10
  },
  filterItemContainer: {
    padding: 10,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: 'white',
    width: '90%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  shadow: {
    ...Platform.select({
      android: { shadowColor: 'rgba(0,0,0,1)' },
      ios: { shadowColor: 'rgba(0,0,0,0.2)' },
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AppsScreenFilter;
