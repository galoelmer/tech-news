import 'react-native-gesture-handler';
import { store } from 'context/store';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { makeServer } from './server';
import App from './src/App';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const Main = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
};

registerRootComponent(Main);
