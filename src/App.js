import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import useAuth from './hooks/useAuth';
import { writeLog } from './utils/firebaseService';

const App = () => {
  const { uid } = useAuth();

  return (
    <ChatContextProvider>
      <div className='flex transition duration-500 ease-in-out'>
        <SideBar />
        <ChatView writeLog={(prompt, response, rating) => writeLog(uid, prompt, response, rating)} />
      </div>
    </ChatContextProvider>
  );
};

export default App;