import { FormEvent, useState, useMemo, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { actionDetailsState, userActionsState, currentUserState } from '../states';

import Select, { ISelectOption } from './Select';
import TextInput from './TextInput';
import api from '../services/api';

import { IAction, IActionPayload } from '../types';

function ActionQueueForm() {
  const actionDetails = useRecoilValue(actionDetailsState);
  const [userActions, setUserActions] = useRecoilState(userActionsState);
  const currentUser = useRecoilValue(currentUserState);
  const [quantity, setQuantity] = useState<number>(1);

  const selectRef = useRef<HTMLSelectElement>(null);

  const actionDetailOptions: ISelectOption[] = useMemo(() => {
    return actionDetails?.map(el => ({
      value: el._id,
      children: el.name,
    }));
  }, [actionDetails]);

  const addUserActions = async () => {
    if (selectRef.current?.value && currentUser?._id) {
      const action: IActionPayload = {
        user: currentUser?._id,
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
