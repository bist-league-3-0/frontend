import React, {Component} from 'react';

class RegisterScene extends Component {
    render() {
        return (
            <div>
                <h1>Register Form</h1>
                <form action="http://localhost:9000/register" method="post">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>
                    {/* <div>
                        <label htmlFor="password">Verify Password:</label>
                        <input type="password" name="password" id="password"/>
                    </div> */}
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="username" name="username" id="username"/>
                    </div>
                    <input type="submit" value="register"/>
                </form>
            </div>
        );
    }
}

export default RegisterScene;