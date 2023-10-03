import humanId from 'human-id'
import { database } from './firebase';
import { ref, set } from 'firebase/database';

const idOptions = {
    adjectiveCount: 2,
    separator: '-',
    capitalize: false,
}

function createHumanID() {
    return humanId(idOptions);
}

async function getReadableID(uid) {
    const userRef = ref(database, 'users/' + uid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val().readableID;
    } else {
      return null;  // or handle this case as needed
    }
}

function storeReadableID(uid, readableID) {
    const userRef = ref(database, 'users/' + uid);
    return set(userRef, {
      readableID
    }).catch(error => {
      console.error('Failed to store readable ID:', error);
    });
}

export { createHumanID, getReadableID, storeReadableID };