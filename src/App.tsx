import React from 'react';
import styled from 'styled-components';

import List from './components/List/List';
import Header from './components/Header/Header';

const Container = styled.div`
  padding: 10px;
`

const App = () => {
  return (
    <Container>
      <Header />
      <List />
    </Container>
  );
};

export default App;
