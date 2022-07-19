export interface IActionDetail {
  _id: string;
  name: string;
  max_value: number;
}

export interface IAction {
  _id: string;
  user: string;
  action_detail: IActionDetail;
}
