import { FormEvent, useState, useMemo, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { actionDetailsState, userActionsState } from '../states';

import Select, { ISelectOption } from './Select';
import TextInput from './TextInput';
import api from '../services/api';

import { IAction, IActionPayload } from '../types';

const USER_ID = '62d691d5599fface86d0b6a6';

function ActionQueueForm() {
  const actionDetails = useRecoilValue(actionDetailsState);
  const [userActions, setUserActions] = useRecoilState(userActionsState);
  const [quantity, setQuantity] = useState<number>(1);

  const selectRef = useRef<HTMLSelectElement>(null);

  const actionDetailOptions: ISelectOption[] = useMemo(() => {
    return actionDetails?.map(el => ({
      value: el._id,
      children: el.name,
    }));
  }, [actionDetails]);

  const addUserActions = async () => {
    if (selectRef.current?.value) {
      const action: IActionPayload = {
        user: USER_ID,
        action_detail: selectRef.current?.value,
      };

      const newActions: IAction[] | null = await api.actions.post(action, quantity);

      if (newActions) setUserActions(currentActions => [...currentActions, ...newActions]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addUserActions();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select options={actionDetailOptions} ref={selectRef} />

        <TextInput value={quantity} onChange={setQuantity} />

        <input type="submit" value="Ajouter" />
      </form>

      <div>
        {userActions?.map((action: IAction) => (
          <div key={action._id}>{action.action_detail.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ActionQueueForm;
