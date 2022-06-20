import { collection,  getDocs } from 'firebase/firestore/lite';
import { FierbaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('El id del usuario no existe');

    const collectionRef = collection(FierbaseDB, `${uid}/journal/notes`);
    let docs = await getDocs(collectionRef);
    docs.forEach(doc => {
        console.log(doc.data());
    })

}