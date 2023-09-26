import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

const firebaseConfigDan = {
  apiKey: 'AIzaSyBhsjVuPP_njleOaq68JRQ3BNbbdzSrMZc',
  authDomain: 'test-4b540.firebaseapp.com',
  projectId: 'test-4b540',
  storageBucket: 'test-4b540.appspot.com',
  messagingSenderId: '929535662880',
  appId: '1:929535662880:web:9d0f0f019f6b87a8319545',
};

const firebaseConfig = {
  apiKey: "AIzaSyCHiv7gPoRZ_LKD-7XfDW1HjpsRlQA816Y",
  authDomain: "log-chat-gpt.firebaseapp.com",
  projectId: "log-chat-gpt",
  storageBucket: "log-chat-gpt.appspot.com",
  messagingSenderId: "107892481835",
  appId: "1:107892481835:web:1d42ab7d2c302706892f6e",
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
  console.log('Wrote log');
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
