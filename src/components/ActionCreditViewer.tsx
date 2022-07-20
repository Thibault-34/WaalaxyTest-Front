import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useRecoilValue } from 'recoil';

import { userActionCreditsState } from '../states';

const ActionCreditViewer = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const userActionCredits = useRecoilValue(userActionCreditsState);

  return (
    <div {...props}>
      {userActionCredits?.map(actionCredit => (
        <div key={actionCredit._id}>
          <span>{actionCredit.action_detail.name}:</span> <span>{actionCredit.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ActionCreditViewer;
