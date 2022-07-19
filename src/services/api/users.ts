import { IUserPayload, IUser } from '../../types';

const API_URI = 'http://localhost:5000/api';

const get = async (userName: string): Promise<IUser | null> => {
  try {
    const response = await fetch(`${API_URI}/users/${userName}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status === 200) return json as IUser;

    console.error(json as { message: string });

    return null;
  } catch (error) {
    return null;
  }
};

const post = async (user: IUserPayload): Promise<IUser | null> => {
  try {
    const response = await fetch(`${API_URI}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const json = await response.json();

    if (response.status === 200) return json as IUser;

    console.error(json as { message: string });

    return null;
  } catch (error) {
    return null;
  }
};

export default {
  post,
  get,
};
