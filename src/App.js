import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBhsjVuPP_njleOaq68JRQ3BNbbdzSrMZc',
  authDomain: 'test-4b540.firebaseapp.com',
  projectId: 'test-4b540',
  storageBucket: 'test-4b540.appspot.com',
  messagingSenderId: '929535662880',
  appId: '1:929535662880:web:9d0f0f019f6b87a8319545',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth();

signInAnonymously(auth).catch(error => {
  console.error('Failed to sign in anonymously:', error);
});

let uid;

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
