import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Routes from './routes';
import { theme } from './utils/theme';

const GlobalStyle = createGlobalStyle`
  * {
  font-family: 'Baloo 2', cursive;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
