import {render, screen} from '@testing-library/react';
import Login from '../pages/login';

describe('Login', () => {
    it('renders login form', () => {
        const {container} = render(<Login />);

        // https://testing-library.com/docs/queries/about/#screen
        const formTitle = container.querySelector('h4');
        expect(formTitle).toBeDefined();
        expect(formTitle.textContent).toBe('Login');

        const inputs = container.querySelectorAll('form input');
        expect(inputs.length).toBe(2);

        const loginInput = inputs[0];
        expect(loginInput.name).toBe('username');

        const passwordInput = inputs[1];
        expect(passwordInput.name).toBe('password');
    });
    // TODO check accessibility label -> input
    // TODO check field validation
});