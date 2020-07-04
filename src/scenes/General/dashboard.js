import React, {Component} from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    }
  }

  componentDidMount(){
    try {
      fetch('/api/bistleague3/auth/login/check')
        .then(res => res.json())
        .then(user => {
          if (typeof user.passport != "undefined") {
            this.setState({user: user.passport});
          } else {
            this.setState({user: {}});
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Compile first, it seems the client wanted to fetch something you don't want to. Try stop the server and run npm start", err.message);
    }
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            {JSON.stringify(this.state.user)}
         </ul>
        </div>
        <div>
          <a href="/login">login</a><br/>
          <a href="/register">register</a><br/>
          <a href="http://localhost:9000/api/bistleague3/auth/logout">logout</a>
        </div>
      </div>
    )
  }
}

export default Dashboard;