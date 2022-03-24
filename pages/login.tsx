
import * as Yup from 'yup';

function Login() {
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
                    <form>
                        <div className="form-group">
                            <label>UserName</label>
                            <input name="username"
                                type="text"
                                className=""
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="username"
                                type="password"
                                className=""
                            />
                        </div>
                        <button 
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;