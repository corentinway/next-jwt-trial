import {render, screen} from '@testing-library/react';
import Login from '../pages/login';

describe('Login', () => {
    it('renders login form', () => {
        const {container} = render(<Login />);

        // https://testing-library.com/docs/queries/about/#screen
        const formTitle = container.querySelector('h4');
        expect(formTitle).toBeDefined();
    });
});