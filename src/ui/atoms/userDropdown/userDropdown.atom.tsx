import React from 'react';
import { View, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown'; // CAMBIATO
import { styles } from './userDropdown.styles';
import { UserOption } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/assets/colors';

const UserDropdown = ({
  data,
  value,
  onChange,
  isFocus,
  setIsFocus,
  loading,
}: {
  data: UserOption[];
  value: string[]; // array di UID
  onChange: (val: string[]) => void;
  isFocus: boolean;
  setIsFocus: (v: boolean) => void;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text>Caricamento utenti...</Text>
      </View>
    );
  }

  return (
    <MultiSelect 
      style={[styles.dropdown, isFocus && { borderColor: Colors.BorderColorDropDown }]}
      containerStyle={styles.dropdownContainer}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={{}}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value} // array di stringhe
      onChange={(selected: string[]) => {
        onChange(selected);
      }}
       renderSelectedItem={(item: UserOption, unSelect?: (item: UserOption) => void) => (
  <View style={styles.selectedItemContainer}>
    <Text style={styles.selectedItemText}>{item.label}</Text>
    <Ionicons
      name="close-circle"
      size={18}
      color="red"
      style={styles.removeIcon}
      onPress={() => unSelect?.(item)} 
    />
  </View>
)}

      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      placeholder={!isFocus ? 'Seleziona utenti' : '...'}
      searchPlaceholder="Cerca..."
      renderItem={(item: UserOption, selected?: boolean) => (
        <View style={styles.itemContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemLabel}>
            {item.label}
          </Text>
          <Text style={styles.itemRole}>{item.role}</Text>
        </View>
      )}
      
    />
  );
};

export default UserDropdown;
