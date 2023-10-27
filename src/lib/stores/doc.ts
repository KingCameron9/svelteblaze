import { type Writable, writable } from 'svelte/store';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../testing/firebase.ts';

//TODO create more options
type DocWriteOptions = {};

export function docWrite<T = object>(
	path: string,
	placeHolder?: T,
	opts?: DocWriteOptions
): Writable<T> {
	let store = writable<T>(placeHolder);

	let ref = doc(db, path);

	//when firebase data changes
	onSnapshot(ref, (snapshot) => {
		let data = snapshot.data() as T;
		if (data == null) return;

		//sets hidden parameter that keeps track of if this update was caused by a firebase change
		(data as any)._setByFirebase = true;

		//set store to new value
		store.set(data);
	});

	store.subscribe((snapshot) => {
		if (snapshot == null) return;

		//if this udpate was caused by firebase change, don't update and delete the marker
		if ('_setByFirebase' in (snapshot as any)) {
			delete (snapshot as any)._setByFirebase;
			return;
		}

		//Else, update firebase because store has been changed
		setDoc(ref, snapshot as object);
	});

	return store;
}
