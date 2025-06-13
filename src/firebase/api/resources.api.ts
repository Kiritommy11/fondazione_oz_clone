import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ButtonLinkPromps } from '@/src/ui/navigation/types';

export const fetchCustomResources = async (): Promise<ButtonLinkPromps[]> => {
  const snapshot = await getDocs(collection(db, 'resources'));
  return snapshot.docs.map(doc => ({
      ...(doc.data() as ButtonLinkPromps),
      id: doc.id
    }));
};

export const deleteResource = async (id: string) => {
  await deleteDoc(doc(db, 'resources', id));
};

export const addSubButtonToResource = async (
  resourceId: string,
  newButton: { title: string; iconName: string; url: string }
) => {
  const docRef = doc(db, 'resources', resourceId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error('Documento non trovato');

  const existingData = docSnap.data();
  const existingButtons = existingData.buttons || {};

  const key = newButton.title.toLowerCase().replace(/\s+/g, '');
  const updatedButtons = { ...existingButtons, [key]: newButton };

  await setDoc(docRef, { ...existingData, buttons: updatedButtons });
};
export const createResource = async (
  collectionName: string,
  data: any
) => {
  const newDocRef = doc(collection(db, collectionName)); // genera ID automatico
  await setDoc(newDocRef, data);
};
export const fetchResourceById = async (resourceId: string) => {
  const docRef = doc(db, 'resources', resourceId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error('Resource not found');
  return { id: docSnap.id, ...docSnap.data() };
};