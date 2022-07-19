import { IActionCredit } from '../../types';

const API_URI = 'http://localhost:5000/api';

const getAllByUser = async (userId: string): Promise<IActionCredit[] | null> => {
  try {
    const response = await fetch(`${API_URI}/action-credits/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status === 200) return json as IActionCredit[];

    console.error(json as { message: string });

    return null;
  } catch (error) {
    return null;
  }
};

export default {
  getAllByUser,
};
