import { FormEvent, useEffect, useState, useMemo, useRef } from 'react';

import Select, { ISelectOption } from './components/Select';
import TextInput from './components/TextInput';

import { IActionDetail, IAction } from './types';

const ACTION_DETAILS: IActionDetail[] = [
  {
    _id: 'actiondetailid1',
    name: 'Action A',
    max_value: 30,
  },
  {
    _id: 'actiondetailid2',
    name: 'Action B',
    max_value: 30,
  },
];

const ACTIONS: IAction[] = [
  {
    _id: 'actionid1',
    user: 'userid1',
    action_detail: {
      _id: 'actiondetailid1',
      name: 'Action A',
      max_value: 30,
    },
  },
  {
    _id: 'actionid2',
    user: 'userid1',
    action_detail: {
      _id: 'actiondetailid2',
      name: 'Action B',
      max_value: 30,
    },
  },
];

function App() {
  const [actionDetails, setActionDetails] = useState<IActionDetail[]>([]);
  const [actions, setActions] = useState<IAction[]>([]);
  const [quantity, setQuantity] = useState<number>(0);

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setActions(ACTIONS);
    setActionDetails(ACTION_DETAILS);
  }, []);

  const actionDetailOptions: ISelectOption[] = useMemo(() => {
    return actionDetails.map(el => ({
      value: el._id,
      children: el.name,
    }));
  }, [actionDetails]);

  const addActions = () => {
    const selectedActionDetail: IActionDetail | undefined = actionDetails.find(
      actionDetail => actionDetail._id === selectRef.current?.value,
    );

    if (selectedActionDetail) {
      const registerNewActions = (actionDetails: IActionDetail[]): IAction[] => {
        return actionDetails.map(actionDetail => ({
          _id: `${Math.floor(Math.random() * 1000000 + 1)}`,
          user: 'userid',
          action_detail: actionDetail,
        }));
      };

      const newActions: IAction[] = registerNewActions(
        Array.from({ length: quantity }, () => selectedActionDetail),
      );

      setActions([...actions, ...newActions]);
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

export default App;
