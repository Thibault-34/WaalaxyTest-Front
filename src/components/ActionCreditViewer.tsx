import { useState, useEffect } from 'react';

import api from '../services/api';

import { IActionCredit } from '../types';

const USER_ID = '62d691d5599fface86d0b6a6';

const ActionCreditViewer = () => {
  const [actionCredits, setActionCredits] = useState<IActionCredit[]>([]);

  useEffect(() => {
    setActionCreditFromApi();
  }, []);

  const setActionCreditFromApi = async () => {
    const actionCredits = await api.actionCredits.getAllByUser(USER_ID);

    if (actionCredits) setActionCredits(actionCredits);
  };

  return (
    <div>
      {actionCredits.map(actionCredit => (
        <div key={actionCredit._id}>
          <span>{actionCredit.action_detail.name}:</span> <span>{actionCredit.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ActionCreditViewer;
