import { existingUser, userJwt } from '@mocks/data/user.mock';
import { rest } from 'msw';

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;

export const signupMock = rest.post(`${BASE_URL}/signup`, (req, res, ctx) => {
  const result = { message: 'User created successfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const signInMockError = rest.post(`${BASE_URL}/signin`, (req, res, ctx) => {
  const result = { message: 'Invalid credentials' };
  return res(ctx.status(400), ctx.json(result));
});

export const authHandlers = [signupMock, signInMockError];
