import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import theme from './theme';
import App from './App';

import { UserProvider } from './UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserProvider>
				<App />
			</UserProvider>
		</ThemeProvider>
	</React.StrictMode>,
);