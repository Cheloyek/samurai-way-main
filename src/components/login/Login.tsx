import React from "react";
import {Field, reduxForm} from "redux-form";

const Login = () => {

    return (
        <div>
            <h1>Hello, please enter your Login</h1>
            <LoginReduxForm/>
        </div>

    )
}

const LoginForm = (props: any) => {

    return (
        <form>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'}/>
                {/*<input placeholder={'Login'}/>*/}
            </div>
            <div>
                <Field type="password" placeholder={'Password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type="checkbox" name={'remember me'} component={'input'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({
    form: 'login'
})(LoginForm)


export default Login