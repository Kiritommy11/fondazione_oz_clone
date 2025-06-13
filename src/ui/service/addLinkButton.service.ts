// services/addLinkButton.service.ts
import { Alert } from 'react-native';
import { createResource } from '@/src/firebase/api/resources.api';

export const saveLinkButton = async ({
  collectionName,
  title,
  url,
  iconName,
  createCollection,
  subTitle,
  subIcon,
  subUrl,
  navigation,
}: {
  collectionName: string;
  title: string;
  url: string;
  iconName: string | null;
  createCollection: boolean;
  subTitle: string;
  subIcon: string | null;
  subUrl: string;
  navigation: any;
}) => {
  if (!title || !iconName) {
    Alert.alert('Errore', 'Compila almeno nome e icona');
    return;
  }

  if (!createCollection && !url) {
    Alert.alert('Errore', 'Inserisci un URL o attiva la creazione di una collezione');
    return;
  }

  if (createCollection && (!subTitle || !subIcon || !subUrl)) {
    Alert.alert('Errore', 'Compila tutti i campi del bottone interno');
    return;
  }

  const data = createCollection
    ? {
        createdAt: new Date(),
        iconName,
        title,
        type: 'subCollectionContainer',
        buttons: {
          [subTitle.toLowerCase().replace(/\s+/g, '')]: {
            title: subTitle,
            iconName: subIcon,
            url: subUrl,
          },
        },
      }
    : {
        createdAt: new Date(),
        iconName,
        title,
        url,
        type: 'resource',
      };

  try {
    await createResource(collectionName, data);
    Alert.alert('Successo', createCollection ? 'Collezione creata con bottone!' : 'Risorsa semplice aggiunta!');
    navigation.goBack();
  } catch (err) {
    console.error(err);
    Alert.alert('Errore', 'Qualcosa è andato storto');
  }
};
