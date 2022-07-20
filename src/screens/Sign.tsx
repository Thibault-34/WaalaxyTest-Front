import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Navigate } from 'react-router-dom';

import TextInput from '../components/TextInput';
import { currentUserState } from '../states';
import api from '../services/api';

const Sign = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [name, setName] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let user = await api.users.get(name);

    if (!user) {
      user = await api.users.post({ name });
      console.log(user);
    }

    if (user) setCurrentUser(user);
  };

  if (currentUser) return <Navigate to="/" replace={true} />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput value={name} onChange={setName} />

        <input value="Entrer" type="submit" />
      </form>
    </div>
  );
};

export default Sign;
