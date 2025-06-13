import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const fetchIcons = async () => {
  try {
    const iconsCol = collection(db, 'icons');
    const iconsSnapshot = await getDocs(iconsCol);

    return iconsSnapshot.docs.map(doc => {
      const data = doc.data();
      const iconValue = data.name || '';
      return {
        label: iconValue.replace(/-/g, ' '),
        value: iconValue,
      };
    });
  } catch (error) {
    console.error('Errore durante il caricamento delle icone:', error);
    throw error;
  }
};
// controller/icons.ts
export const getAllIcons = async () => {
  const snapshot = await getDocs(collection(db, 'icons'));
  return snapshot.docs.map((doc) => doc.data().name);
};
export const fetchIconsFromFirestore = async () => {
  const iconsSnapshot = await getDocs(collection(db, 'icons'));
  return iconsSnapshot.docs.map(doc => ({
    label: doc.data().name.replace(/-/g, ' '),
    value: doc.data().name,
  }));
};