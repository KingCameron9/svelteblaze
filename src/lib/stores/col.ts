import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../testing/firebase.ts';
import { writable } from 'svelte/store';

interface DocWrite<T> {
	subscribe: (cb: (value: T | null) => void) => void | (() => void);
	set: (value: T) => void;
}

export async function colWrite<T = object[] | any>(path: string, placeHolder?: T[]) {
	let ref = collection(db, path);
	console.log('hello');
	// const { subscribe } = writable(placeHolder, (set) => {
	// 	console.log('hello');
	// 	let unsubscribe = onSnapshot(ref, (snapshot) => {
	// 		const data = snapshot.docs;
	// 		console.log('data: ' + JSON.stringify(data));
	// 	});
	// });
	//
	let results = (await getDocs(ref)).docs;
	results.forEach((doc) => {
		console.log(doc.data());
	});
}
