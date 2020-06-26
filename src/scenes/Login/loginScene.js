import React, {Component} from 'react';

class LoginScene extends Component {

    render() {
        return (
            <div>
                <h1>Login Form</h1>
                <form action="http://localhost:9000/login" method="post">
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username"/>
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