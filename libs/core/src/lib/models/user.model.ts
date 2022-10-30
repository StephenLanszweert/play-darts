import { Language } from "../enums";

export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  language: Language;
}
