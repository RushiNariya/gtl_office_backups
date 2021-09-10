import { IInput } from './IInput';

export default interface IResType {
  status: () => IResType;
  json: (input: IInput) => void;
  header: () => IResType;
}