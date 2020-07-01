import React, {Component} from 'react';

class CheckAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: []
        };
        console.log('test');
    }

    componentDidMount(){
        try {
            fetch('http://localhost:9000/users')
                .then(res => res.json())
                .then(account => this.setState({account}))
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        return (
            <div>
                <h1>Fetch Result</h1>
                <ul>
                    {
                        this.state.account.auth ? <li>auth</li> : <li>not auth</li>
                    }
                </ul>
            </div>
        );
    }
}

export default CheckAuth;