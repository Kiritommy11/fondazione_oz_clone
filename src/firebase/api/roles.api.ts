import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getRolesFromFirestore = async () => {
  const snapshot = await getDocs(collection(db, 'roles'));
  return snapshot.docs.map(doc => ({
    label: doc.data().name,
    value: doc.data().name,
  }));
};