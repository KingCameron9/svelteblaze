import { type Writable, writable } from 'svelte/store';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../testing/firebase.ts';

type DocWriteOptions = {};

export function docWrite<T = object>(
	path: string,
	placeHolder?: T,
	opts?: DocWriteOptions
): Writable<T> {
	let store = writable<T>(placeHolder);

	let ref = doc(db, path);

	onSnapshot(ref, (snapshot) => {
		let data = snapshot.data() as T;
		store.set(data);
	});

	return store;
}
