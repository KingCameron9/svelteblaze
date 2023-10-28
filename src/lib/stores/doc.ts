import { type Writable, writable } from 'svelte/store';
import { doc, onSnapshot, setDoc, type Unsubscribe } from 'firebase/firestore';
import { db } from '../testing/firebase.ts';

//TODO create more options
type DocWriteOptions = {};

interface DocWrite<T> {
	subscribe: (cb: (value: T | null) => void) => void | (() => void);
	set: (value: T) => void;
}

export function docWrite<T = object>(
	path: string,
	placeHolder?: T,
	opts?: DocWriteOptions
): DocWrite<T> {
	let ref = doc(db, path);

	let store = writable<T>(placeHolder, (set) => {
		//when firebase data changes
		let unsubscribe = onSnapshot(ref, (snapshot) => {
			console.log('read');
			let data = snapshot.data() as T;
			if (data == null) return;

			//set store to new value
			set(data);
		});

		return () => unsubscribe();
	});

	const { subscribe } = store;

	const set = (value: T) => {
		console.log('read');
		setDoc(ref, value as object);
	};

	return {
		subscribe,
		set
	};
}
