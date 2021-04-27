import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Provider } from 'react-redux';
import store from './redux/store';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      dark: "#1c54b2",
      main: "#2979ff",
      light: "#222222",
    },  
  }
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>,
  </Provider>,
  rootElement);

registerServiceWorker();

