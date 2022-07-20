import { useRecoilValue, useResetRecoilState } from 'recoil';

import GuardedScreen from '../components/GuardedScreen';
import ActionQueueForm from '../components/ActionQueueForm';
import ActionCreditViewer from '../components/ActionCreditViewer';
import { currentUserState, userActionCreditsState, userActionsState } from '../states';

const ActionQueue = () => {
  const currentUser = useRecoilValue(currentUserState);
  const resetCurrentUser = useResetRecoilState(currentUserState);
  const resetUserActionCredits = useResetRecoilState(userActionCreditsState);
  const resetUserActions = useResetRecoilState(userActionsState);

  const _logOut = () => {
    resetCurrentUser();
    resetUserActionCredits();
    resetUserActions();
  };

  return (
    <GuardedScreen>
      <div>Hello {currentUser?.name}</div>

      <div>
        <ActionCreditViewer />
        <ActionQueueForm />
      </div>

      <input type="submit" value="Se déconnecter" onClick={_logOut} />
    </GuardedScreen>
  );
};

export default ActionQueue;
