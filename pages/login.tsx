
import * as Yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm} from 'react-hook-form';
import { useState } from 'react';

export type LoginFunction = (username: string, password : string) => Promise<boolean>;

export function Login({login} : {login: LoginFunction}) {

    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("");

    type FormType = {
        username: RequiredStringSchema<string | undefined>,
        password: RequiredStringSchema<string | undefined>,
    }

    const formConstraint : FormType = {
        username: Yup.string().required('User name is required'),
        password: Yup.string().required('Password is required')
    }

    const validationSchema = Yup.object().shape(formConstraint);

    const formOptions = {
        resolver: yupResolver(validationSchema)
    };

    type FormValues = {
        username: string,
        password: string,
    };

    const {register, handleSubmit, setError, formState} = useForm<FormValues>(formOptions);
    const { errors } = formState;

    
    // see https://react-hook-form.com/api/useform/handlesubmit/
    async function onSubmit({username, password} : FormValues ) {
        // TODO FIXME
        // TODO use setError
        //console.log(`sending login data ${username} and ${password}`);
        const isValid = await login(username, password);
        if (!isValid) {
            setApiError(true);
            setApiErrorMessage('Invalid credentials');
        }
        return Promise.resolve();
    }

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            Login Page
            <div className="alert alert-info">
                UserName : test <br />
                Password: test
            </div>
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="username">UserName</label>
                            <input 
                                type="text"
                                role="textbox"
                                aria-label="user name"
                                id="username"
                                {...register('username')}
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            />
                            <div role="alert" className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='password'>Password</label>
                            <input 
                                type="password"
                                role="textbox"
                                aria-label="password"
                                id="password"
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <div role="alert" className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button 
                            disabled={formState.isSubmitting}
                            className="btn btn-primary"
                        >
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        {
                            apiError &&
                            <div role="alert" className='alert alert-danger mt-3 mb-0'>
                                {apiErrorMessage}
                                </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}