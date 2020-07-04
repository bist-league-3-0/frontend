import React, {Component} from 'react';

class LoginScene extends Component {
    render() {
        return (
            <div>
                <h1>Login Form</h1>
                <form action="http://localhost:9000/api/bistleague3/auth/login" method="post">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>
                    <input type="submit" value="go on"/>
                </form>
            </div>
        );
    }
}

export default LoginScene;