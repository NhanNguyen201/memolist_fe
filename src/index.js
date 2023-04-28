import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createTheme';

import theme from './utils/theme';

import store from './redux/store';
const muiTheme = createMuiTheme(theme);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));


reportWebVitals();
