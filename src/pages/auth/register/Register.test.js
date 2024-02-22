import { signupMockError } from '@mocks/handlers/auth';
import { server } from '@mocks/server';
import Register from '@pages/auth/register/Register';
import { render, screen, waitFor } from '@root/test.utils';
import { Utils } from '@services/utils/utils.service';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Register', () => {
  it('signup form should have its labels', () => {
    render(<Register />);
    const usernameLabel = screen.getByLabelText('Username');
    const emailLabel = screen.getByLabelText('Email');
    const passwordLabel = screen.getByLabelText('Password');

    expect(usernameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  describe('Button', () => {
    it('should be disabled', () => {
      render(<Register />);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
    });

    it('should be enabled with input values', () => {
      render(<Register />);
      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'manny');
      userEvent.type(emailLabel, 'manny@test.com');
      userEvent.type(passwordLabel, 'qwerty');

      expect(buttonElement).toBeEnabled();
    });

    it('should change label when clicked', async () => {
      jest.spyOn(Utils, 'generateAvatar').mockReturnValue('avatar image');
      render(<Register />);
      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'manny');
      userEvent.type(emailLabel, 'manny@test.com');
      userEvent.type(passwordLabel, 'qwerty');

      act(() => {
        userEvent.click(buttonElement);
      });

      await waitFor(() => {
        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('SIGNUP IN PROGRESS...');
      });
    });
  });
});
