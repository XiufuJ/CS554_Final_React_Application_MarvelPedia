import firebase from 'firebase';
import fire from '../config/Fire'
import ReactDOM from 'react-dom';
import { savePDF } from '@progress/kendo-react-pdf';

const api = {

    registerWithEmailAndPassword: async (email, password) => {
        try {
            const userCredential = await fire.auth().createUserWithEmailAndPassword(email, password);
            console.log(userCredential);
            return userCredential.user;
        } catch (e) {
            console.log(e);
            return e.code;
        }
        
    },
    signInWithEmailAndPassword: async (email, password) => {
        try {
            const userCredential = await fire.auth().signInWithEmailAndPassword(email, password);
            return userCredential;
        } catch (e) {
            console.log(e);
            return e.code;
        }
        
    },
    signInWithGoogleAccount: async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const userCredential = await firebase.auth().signInWithPopup(googleProvider);
            return userCredential.user;
        } catch (e) {
            return e.code;
        }
        
    },
    signout: async () => {
        console.log('logout');
        await fire.auth().signOut();
    },
    forgetPassword: async (email) => {
        try {
            return fire.auth().sendPasswordResetEmail(email);
        } catch (e) {
            console.log(e);
            return e.code;
        }
    },
    getCommentsByComicId: async (comicId) => {
        const comicCommentRef = fire.database().ref('comicComents').child(comicId);
        try {
            const valObj = (await comicCommentRef.orderByKey().once('value')).val();
            if (!valObj) {
                return [];
            }
            return Object.values(valObj);

        } catch (e) {
            console.log(e);
        }
    },
    createComentByComicId: async (comicId, userEmail, comment) => {
        const comicComentsRef = fire.database().ref('comicComents').child(comicId);
        try {
            await comicComentsRef.push().set({
                userEmail,
                comment
            });
        } catch (e) {
            console.log(e);
        }
    },
    generatePdf:async (rootRef) => {
        console.log(rootRef);
        savePDF(ReactDOM.findDOMNode(rootRef),{
            paperSize: 'Executive',
            margin: 20,
            scale: 0.6,
            fileName: "CS554_Final.pdf"
            
        });
    }

    
}

export default api;