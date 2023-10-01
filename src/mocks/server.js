import { authHandlers } from '@mocks/handlers/auth';
import { setupServer } from 'msw/node';

export const server = setupServer(...authHandlers);
