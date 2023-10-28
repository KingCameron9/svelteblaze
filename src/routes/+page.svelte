<script lang='ts'>
    import {app, db} from '$lib/testing/firebase.ts'
    import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
    import {docWrite} from '$lib/stores/doc.ts'
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

    let ref = doc(db, '/testing/default');

    type Def = {
        value: number;
    }

    let store = docWrite<Def>('/testing/default');
    
    // onSnapshot(ref, () => {console.log('read')});
</script>

<button on:click={() => {$store.value += 1}}>{$store?.value}</button>
<button on:click={() => {goto('other')}}>leave</button>
