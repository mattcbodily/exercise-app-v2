import React from 'react';
import styled from 'styled-components';
import Battle from './Components/Battle';

const Container = styled.div`
  text-align: center;
`

function App() {
  return (
    <Container>
      <Battle />
    </Container>
  );
}

export default App;