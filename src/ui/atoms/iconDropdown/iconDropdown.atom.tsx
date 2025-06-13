// components/atoms/IconDropdown.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/assets/colors';
import { styles } from './icondropDown.styles';

const IconDropdown = ({
  icons,
  value,
  onChange,
  isFocus,
  setIsFocus,
  loading,
}: {
  icons: { label: string; value: string }[];
  value: string | null;
  onChange: (val: string) => void;
  isFocus: boolean;
  setIsFocus: (v: boolean) => void;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text>Caricamento icone...</Text>
      </View>
    );
  }

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: Colors.BorderColorDropDown }]}
      placeholderStyle={styles.placeholderStyle}
      containerStyle={styles.dropdownContainer}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
      data={icons}
      search
      mode='modal'
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onChange(item.value);
        setIsFocus(false);
      }}
      renderItem={(item) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Ionicons name={item.value as any} size={20} style={{ marginRight: 10 }} />
          <Text>{item.label}</Text>
        </View>
      )}
      renderLeftIcon={() =>
        value ? <Ionicons name={value as any} size={20} style={{ marginRight: 10 }} /> : null
      }
      placeholder={!isFocus ? "Seleziona un'icona" : '...'}
      searchPlaceholder="Cerca..."
    />
  );
};

export default IconDropdown;
