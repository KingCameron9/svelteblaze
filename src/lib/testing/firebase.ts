import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { connectFirestoreEmulator, doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';

let opts: FirebaseOptions = {
	apiKey: 'AIzaSyCVvKeTnPmm0hWUGRRzwjhgQVMTjFkUyEM',
	authDomain: 'helix-23087.firebaseapp.com',
	projectId: 'helix-23087',
	storageBucket: 'helix-23087.appspot.com',
	messagingSenderId: '930820455772',
	appId: '1:930820455772:web:269410c160a9fb3efd1599',
	measurementId: 'G-X7T4G1CPCQ'
};

export let app = initializeApp(opts);

export let db = getFirestore();

if (!db._settingsFrozen) {
	connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
