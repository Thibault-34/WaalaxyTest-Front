import { FormEvent, useState, useMemo, useRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { actionDetailsState, userActionsState, currentUserState } from '../states';

import Select, { ISelectOption } from './Select';
import TextInput from './TextInput';
import Button from './Button';
import api from '../services/api';

import { IAction, IActionPayload } from '../types';

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
`;

const ActionQueueContainer = styled.div`
  margin-bottom: 24px;
`;

const Li = styled.li`
  padding: 2px 4px;
`;

const Ul = styled.ul`
  height: 150px;
  padding: 0px 0px;
  background-color: white;
  overflow: scroll;
  list-style-type: none;
  border-radius: 4px;

  & ${Li}:nth-child(2n) {
    background-color: #aeaeae;
  }
`;

function ActionQueueForm(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
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
    <div {...props}>
      <Form onSubmit={handleSubmit}>
        <Select options={actionDetailOptions} ref={selectRef} />

        <TextInput value={quantity} onChange={setQuantity} />

        <Button value="Ajouter" />
      </Form>

      <ActionQueueContainer>
        <Ul>
          {userActions?.map((action: IAction, index) => (
            <Li key={action._id}>
              {index + 1}: {action.action_detail.name}
            </Li>
          ))}
        </Ul>
      </ActionQueueContainer>
    </div>
  );
}

export default ActionQueueForm;
