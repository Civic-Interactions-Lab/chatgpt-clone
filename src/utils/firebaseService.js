import { database } from './firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

function writeLog(uid, prompt, response, rating) {
  const logsRef = ref(database, 'users/' + uid + '/logs');
  push(logsRef, {
    prompt,
    response,
    rating,
    timestamp: serverTimestamp(),
  }).catch(error => {
    console.error('Failed to write log:', error);
  });
}

export { writeLog };