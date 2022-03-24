
import * as Yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm} from 'react-hook-form';

function Login() {

    type FormType = {
        username: RequiredStringSchema<string | undefined>,
        password: RequiredStringSchema<string | undefined>,
    }

    const formConstraint : FormType = {
        username: Yup.string().required('Username is required'),
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
    function onSubmit({username, password} : FormValues ) {
        // TODO FIXME
        // TODO use setError
        console.log(`sending login data ${username} and ${password}`);
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
                            <label>UserName</label>
                            <input 
                                type="text"
                                {...register('username')}
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password"
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button 
                            disabled={formState.isSubmitting}
                            className="btn btn-primary"
                        >
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        {
                            errors.apiError &&
                            <div className='alert alert-danger mt-3 mb-0'>errors.apiError?.message</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;