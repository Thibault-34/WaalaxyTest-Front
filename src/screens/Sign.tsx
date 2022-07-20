import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import Input from '../components/Input';
import Button from '../components/Button';
import { currentUserState } from '../states';
import api from '../services/api';

const Form = styled.form`
  display: flex;
  justify-content: space-between; ;
`;

const StyledTextInput = styled(Input).attrs(props => ({
  ...props,
  type: 'text',
}))`
  flex: 1;
  margin-right: 24px;
`;

const Sign = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [name, setName] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let user = await api.users.get(name);

    if (!user) {
      user = await api.users.post({ name });
    }

    if (user) setCurrentUser(user);
  };

  if (currentUser) return <Navigate to="/" replace={true} />;

  return (
    <div>
      <h2>Connexion</h2>

      <Form onSubmit={handleSubmit}>
        <StyledTextInput
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nom d'utilisateur existant ou nouveau"
        />

        <Button value="Entrer" />
      </Form>
    </div>
  );
};

export default Sign;
