import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';

import * as Realm from 'realm-web';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const app = new Realm.App(process.env.MONGO_APP_ID);

async function getValidAccessToken() {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. Tokens must be refreshed after
    // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
    await app.currentUser.refreshAccessToken();
  }
  return app.currentUser.accessToken;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_URI,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

function insert_log(prompt, model_response) {
  const user_id = app.currentUser.id;
  // const timestamp
  // TODO
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChatContextProvider>
        <div className='flex transition duration-500 ease-in-out'>
          <SideBar />
          <ChatView post_log={insert_log} />
        </div>
      </ChatContextProvider>
    </ApolloProvider>
  );
};

export default App;
