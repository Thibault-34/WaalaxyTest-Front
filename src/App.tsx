import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

import MainRouter from './router';

const AppContainer = styled.div`
  width: 350px;
  margin: auto;
  padding: 48px;
  background-color: #e0e0e0;
  border-radius: 8px;
`;

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <AppContainer>
          <MainRouter />
        </AppContainer>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
