import { ref } from 'vue'
import { db } from '@/db/config'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'

const addCollection = async (collectionId) => {
    const error = ref(null)
    const isPending = ref(false)
    
    const addDocument = async (docId, data) => {
        isPending.value = true

        if(docId) {
            const docRef = doc(db, collectionId, docId)
            return await setDoc(docRef, data).then(() => {
                // console.log('Document written with ID: ', docRef.id)
                isPending.value = false
            }).catch((err) => {
                console.log(err.message)
                error.value = 'Could not add document'
                isPending.value = false
            })
        } else {
            return await addDoc(collection(db, collectionId), data).then(() => {
                // console.log('Document written with ID: ', docRef.id)
                isPending.value = false
            }).catch((err) => {
                console.log(err.message)
                error.value = 'Could not add document'
                isPending.value = false
            })
        }
    }
    return { error, addDocument, isPending }
}

export default addCollection