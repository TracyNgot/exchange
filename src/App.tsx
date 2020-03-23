import React from 'react';
import { Spin, Layout } from 'antd';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Routes from './routes';
import { State } from './store';
import { theme } from './utils/theme';

const GlobalStyle = createGlobalStyle`
  * {
  font-family: 'Baloo 2', cursive;
  }
`;

function App() {
  const loading = useSelector((state: State) => state.pockets.loading);

  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Spin spinning={loading} delay={500}>
            <Routes />
          </Spin>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
