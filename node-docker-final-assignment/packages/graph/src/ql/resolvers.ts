/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request } from 'express';

export default  {
  register: async function({ userInput }: {userInput: { name: string, age: number}}, req: Request): Promise<any> {
    return {
      name: 'rushi',
      age: 22,
    };
  },
  login: async function({ email, password }: { email: string; password: string;}): Promise<{ token: string; userId: string; }> {
    return {
      token: 'dummyToken123',
      userId: 'userId1234',
    };
  }
};
