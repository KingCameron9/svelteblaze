<script lang='ts'>
    import {app, db} from '$lib/testing/firebase.ts'
    import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
    import {docWrite} from '$lib/stores/doc.ts'
    import {colRead} from '$lib/stores/col.ts'
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

    let ref = doc(db, '/testing/default');

    type Def = {
        value: number;
    }

    let store = colRead<Def[]>('/testing/default/collection');
    // onSnapshot(ref, () => {console.log('read')});
    
</script>

<p>{JSON.stringify($store)}</p>
<p>{JSON.stringify($store)}</p>

<button on:click={() => {goto('other')}}>leave</button>

