import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import ActionQueueForm from './components/ActionQueueForm';
import ActionCreditViewer from './components/ActionCreditViewer';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <ActionCreditViewer />
          <ActionQueueForm />
        </div>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
