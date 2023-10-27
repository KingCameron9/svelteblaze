<script lang='ts'>
    import {app, db} from '$lib/testing/firebase.ts'
    import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
    import {docWrite} from '$lib/stores/doc.ts'

    let ref = doc(db, '/testing/default');

    type Def = {
        value: number;
    }

    let store = docWrite<Def>('/testing/default');

    // onSnapshot(ref, () => {console.log('read')});
</script>

<p>{$store?.value}</p>
