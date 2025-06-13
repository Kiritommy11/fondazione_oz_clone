import { Ionicons } from '@expo/vector-icons';
import { JSX } from 'react';

export enum Screen {
    TabNavigator = 'TabNavigator',
    Home = 'Home',
    Resources = 'Resources',
    Channels = 'Channels',
    Profile = 'Profile',
    Notifications = 'Notifications',
    Login = 'Login',
    EditProfile = 'EditProfile',
    CreateProfile = 'CreateProfile',
    StaffList = 'StaffList',
    StaffDetail = 'StaffDetail',
    AddLinkButton = 'AddLinkButton',
    ResourceDetail = 'ResourceDetail',
    AddSubButtons = 'AddSubButtons',
    EditLinkButton = 'EditLinkButton',
    HomePreference ='HomePreference',
    ChannelChat='ChannelChat',
    CreateChannel='CreateChannel',
    EditChannel='EditChannel'
  }
  export type TabParams = {
    [Screen.Home]: undefined;
    [Screen.Resources]: undefined;
    [Screen.Channels]: undefined;
    [Screen.Profile]: undefined;
  };

  export type MainParamList = {
    
    [Screen.Resources]: undefined;
    [Screen.Channels]: undefined;
    [Screen.Profile]: undefined;
    [Screen.Notifications]: undefined;
    TabNavigator: undefined;
    [Screen.Home]: undefined;

    [Screen.Login]: undefined; 
    [Screen.EditProfile]: undefined; 
    [Screen.CreateProfile]: undefined;
    [Screen.StaffList]: undefined;
    [Screen.StaffDetail]: { userId: string };

    [Screen.AddLinkButton]:{collectionName: string}; // Aggiunta della rotta per il dettaglio delle risorse
    [Screen.ResourceDetail]: { resource: FirestoreResource; }; // Aggiunta della rotta per il dettaglio delle risorse
    [Screen.AddSubButtons]: { resource: FirestoreResource }; // Aggiunta della rotta per il dettaglio delle risorse
    [Screen.EditLinkButton] : {resource: FirestoreResource}
    [Screen.HomePreference] : {slotIndex: number};
    [Screen.ChannelChat]: {channelId:string,channelName:string};
    [Screen.CreateChannel]:undefined;
    [Screen.EditChannel]: {channelId:string,channelName:string};
  };
  
  
  
  export interface Notification {
  id: string;
  message: string;
  sender: string;
  date: string;
  time: string;
  channelId?: string;
  hideCloseIcon?: boolean; // Nuova prop per nascondere l'icona di chiusura
    bgColor?: string; // Nuova prop per modificare il colore di sfondo
}

 export type Resource = {
    id: string;
    title: string;
    icon: JSX.Element;
    onPress: ()=> void;
  };

  
 export type UserData = {
  id: string;
  name: string;
  role: string;
  photoURL: string;
  presence: boolean;
};

  export type ButtonLinkPromps = {
    id: string;
    title: string;
    iconName: keyof typeof Ionicons.glyphMap; // Nome dell'icona
    url?: string; // URL da aprire
    onPress: () => void;
  };

export type UserOption = {
  label: string; // Nome utente
  value: string; // UID o altro identificatore
  role: string;
};
export type FirestoreResource = {
  id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  type: 'subCollectionContainer';
  createdAt: Date | { seconds: number; nanoseconds: number };
  url?: string; // Presente solo se è un link diretto
  buttons?: Record<string, {
    title: string;
    iconName: string;
    url: string;
  }>;
};

