import { Context } from 'koa';

export interface User {
  name: string;
  id: number;
  password: string;
}

export interface Vlad {
  name: string;
  id: number;
  password: string;
}

export const userArray: Array<User> = [
  {id: 1, name: 'Dima', password: '123'},
  {id: 2, name: 'Vlad', password: '1234'}
]

export function loginHandle(ctx: Context) {
  const user = ctx.request.body as unknown as User;

  const existedUser = userArray.find(({id}) => id === user.id);
  if (existedUser && existedUser.password === user.password) {
    const userId = user.id;
    const counter = 0;
    const expires = new Date();
    ctx.cookies.set(
      'session_key',
      new Buffer(JSON.stringify({userId, counter, expires})).toString('base64'),
      { httpOnly: true }
    );

    ctx.body = { registered: true };
  } else {
    ctx.body = { registered: false };
    ctx.status = 404;
  }
}
