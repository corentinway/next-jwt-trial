import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Login, LoginFunction} from '../pages/login';

const mockLogin : LoginFunction = jest.fn((username, password) => {
    return Promise.resolve(true);
})

describe('Login', () => {
    beforeEach(() => {
        render(<Login login={mockLogin}/>);
    });
    it('renders login form', () => {
        // https://testing-library.com/docs/queries/about/#screen
        const formTitle : HTMLHeadingElement = screen.getByRole('heading');
        expect(formTitle).toBeDefined();
        expect(formTitle.textContent).toBe('Login');

        const loginInput : HTMLInputElement = screen.getByRole('textbox', {name: 'user name'});
        expect(loginInput.name).toBe('username');

        const passwordInput : HTMLInputElement = screen.getByRole('textbox', {name: 'password'});
        expect(passwordInput.name).toBe('password');
    });
    it('labels must be linked to input fields', () => {
        const { container } = render(<Login login={mockLogin}/>);

        const labels : NodeListOf<HTMLLabelElement> = container.querySelectorAll('label');
        labels.forEach( (label : HTMLLabelElement) => {
            const inputId = label.getAttribute('for');
            expect(inputId).toBeDefined();
            

            const matchedInput : HTMLInputElement | null = container.querySelector(`#${inputId}`);
            expect(matchedInput).toBeTruthy();
            expect(matchedInput?.tagName).toBe('INPUT');
        })
    });
    it('should display error message for both field', async () => {
        // GIVEN no input
        // WHEN validating
        fireEvent.submit(screen.getByRole('button'));
        // THEN
        expect(await screen.findAllByRole('alert')).toHaveLength(2);        
        expect(mockLogin).not.toBeCalled();
    });
    it('should display 1 alert given only user name', async () => {
        // GIVEN user name only
        fireEvent.input(screen.getByRole('textbox', {name: 'user name'}), {
            target: {
                value: 'my_user_name'
            }
        });
        // WHEN
        fireEvent.submit(screen.getByRole('button'));
        // THEN
        expect(await screen.findAllByText(/Password is required/i)).toHaveLength(1);
        expect(mockLogin).not.toHaveBeenCalled();
    });
    it('should display 1 alert given only password', async () => {
        // GIVEN user name only
        fireEvent.input(screen.getByRole('textbox', {name: 'password'}), {
            target: {
                value: 'dslkdfskldfsl'
            }
        });
        // WHEN
        fireEvent.submit(screen.getByRole('button'));
        // THEN
        expect(await screen.findAllByText(/user name is required/i)).toHaveLength(1);
        expect(mockLogin).not.toHaveBeenCalled();
    });
    it('should not display error given valid values', async () => {
        // GIVEN valid data
        fireEvent.input(screen.getByRole('textbox', {name: 'user name'}), {
            target: {
                value: 'corentin'
            }
        });
        fireEvent.input(screen.getByRole('textbox', {name: 'password'}), {
            target: {
                value: 'azerty'
            }
        });
        // WHEN form is submitted
        fireEvent.submit(screen.getByRole('button'));
        // THEN
        await waitFor( () => expect(screen.findAllByText(/is required/i)).toHaveLength(0));
        expect(mockLogin).toBeCalledWith('corentin', 'azerty');
    });
});