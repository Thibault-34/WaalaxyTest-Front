import { FormEvent, useEffect, useState, useMemo, useRef } from 'react';

import Select, { ISelectOption } from './Select';
import TextInput from './TextInput';
import api from '../services/api';

import { IActionDetail, IAction, IActionPayload } from '../types';

const USER_ID = '62d691d5599fface86d0b6a6';

function ActionQueueForm() {
  const [actionDetails, setActionDetails] = useState<IActionDetail[]>([]);
  const [actions, setActions] = useState<IAction[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setActionDetailsFromApi();
    setUserActionsFromApi();
  }, []);

  const setActionDetailsFromApi = async () => {
    const actionsDetails = await api.actionDetails.getAll();

    if (actionsDetails) setActionDetails(actionsDetails);
  };

  const setUserActionsFromApi = async () => {
    const actions = await api.actions.getAllByUser(USER_ID);

    if (actions) setActions(actions);
  };

  const actionDetailOptions: ISelectOption[] = useMemo(() => {
    return actionDetails.map(el => ({
      value: el._id,
      children: el.name,
    }));
  }, [actionDetails]);

  const addActions = async () => {
    const selectedActionDetail: IActionDetail | undefined = actionDetails.find(
      actionDetail => actionDetail._id === selectRef.current?.value,
    );

    if (selectedActionDetail) {
      const action: IActionPayload = {
        user: USER_ID,
        action_detail: selectedActionDetail._id,
      };

      const newActions: IAction[] | null = await api.actions.post(action, quantity);

      if (newActions) setActions(currentActions => [...currentActions, ...newActions]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addActions();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select options={actionDetailOptions} ref={selectRef} />

        <TextInput value={quantity} onChange={setQuantity} />

        <input type="submit" value="Ajouter" />
      </form>

      <div>
        {actions.map(action => (
          <div key={action._id}>{action.action_detail.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ActionQueueForm;
