import React from 'react';
import { View, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { styles } from './roleDropdown.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/assets/colors';

type RoleOption = {
  label: string;
  value: string;
};

const RoleDropdown = ({
  data,
  value,
  onChange,
  isFocus,
  setIsFocus,
  loading,
}: {
  data: RoleOption[];
  value: string[];
  onChange: (val: string[]) => void;
  isFocus: boolean;
  setIsFocus: (v: boolean) => void;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text>Caricamento ruoli...</Text>
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
      value={value}
      onChange={(selected: string[]) => {
        onChange(selected);
      }}
      renderSelectedItem={(item: RoleOption, unSelect?: (item: RoleOption) => void) => (
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
      placeholder={!isFocus ? "Seleziona ruoli" : '...'}
      searchPlaceholder="Cerca..."
      renderItem={(item: RoleOption, selected?: boolean) => (
        <View style={styles.itemContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemLabel}>
            {item.label}
          </Text>
        </View>
      )}
    />
  );
};

export default RoleDropdown;
