import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import GuardedScreen from '../components/GuardedScreen';
import ActionQueueForm from '../components/ActionQueueForm';
import ActionCreditViewer from '../components/ActionCreditViewer';
import Button from '../components/Button';
import { currentUserState, userActionCreditsState, userActionsState } from '../states';

const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.span`
  color: red;
`;

const StyledActionCreditViewer = styled(ActionCreditViewer)`
  margin-bottom: 24px;
`;

const StyledActionQueueForm = styled(ActionQueueForm)`
  margin-bottom: 24px;
`;

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
      <ScreenWrapper>
        <h2>
          Hello <UserName>{currentUser?.name}</UserName>
        </h2>

        <div style={{ width: '100%' }}>
          <h3>Mes crédits</h3>
          <StyledActionCreditViewer />

          <h3>Mes actions</h3>
          <StyledActionQueueForm />
        </div>

        <Button type="submit" value="Se déconnecter" onClick={_logOut} />
      </ScreenWrapper>
    </GuardedScreen>
  );
};

export default ActionQueue;
