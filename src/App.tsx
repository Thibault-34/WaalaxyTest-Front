import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import MainRouter from './router';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <MainRouter />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
