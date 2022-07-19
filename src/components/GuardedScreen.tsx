import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentUserState } from '../states';

const GuardedScreen = ({ children }: React.PropsWithChildren) => {
  const currentUser = useRecoilValue(currentUserState);

  if (!currentUser) return <Navigate to="/sign" replace={true} />;

  return <>{children}</>;
};

export default GuardedScreen;
