import { IActionDetail } from '../../types';

const API_URI = 'http://localhost:5000/api';

const getAll = async (): Promise<IActionDetail[] | null> => {
  try {
    const response = await fetch(`${API_URI}/action-details`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status === 200) return json as IActionDetail[];

    console.error(json as { message: string });

    return null;
  } catch (error) {
    return null;
  }
};

export default {
  getAll,
};
