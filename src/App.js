import React from 'react';
import styled from 'styled-components';
import routes from './routes';

const Container = styled.div`
  text-align: center;
`

function App() {
  return (
    <Container>
      {routes}
    </Container>
  );
}

export default App;