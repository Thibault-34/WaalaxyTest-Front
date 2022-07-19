import { IActionPayload, IAction } from '../../types';

const API_URI = 'http://localhost:5000/api';

const post = async (action: IActionPayload, quantity: number): Promise<IAction[] | null> => {
  try {
    const response = await fetch(`${API_URI}/actions?quantity=${quantity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action),
    });

    const json = await response.json();

    if (response.status === 200) return json as IAction[];

    console.error(json as { message: string });

    return null;
  } catch (error) {
    return null;
  }
};

const getAllByUser = async (userId: string): Promise<IAction[] | null> => {
  try {
    const response = await fetch(`${API_URI}/actions/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status === 200) return json as IAction[];

    console.error(json as { message: string });

    return null;
  } catch (error) {
    return null;
  }
};

export default {
  post,
  getAllByUser,
};
