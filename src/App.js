import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let uid;

signInAnonymously(auth).catch(error => {
  console.error('Failed to sign in anonymously:', error);
});

onAuthStateChanged(auth, user => {
  console.log(user);
  if (user) {
    uid = user.uid;
  }
});

function writeLog(prompt, response, rating) {
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

const App = () => {
  return (
    <ChatContextProvider>
      <div className='flex transition duration-500 ease-in-out'>
        <SideBar />
        <ChatView writeLog={writeLog} />
      </div>
    </ChatContextProvider>
  );
};

export default App;
