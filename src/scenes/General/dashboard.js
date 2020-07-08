import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BackendRoutes = require("./../../routes/backendRoutes");

const Dashboard = (props) => {
  const defaultUserState = {id: 0, email: "", role : 1}
  const [user, setUser] = useState(defaultUserState);
  const [ID, setID] = useState(0);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(1);

  /** fetchData()
    * @param null
    * @return object
    * @description async function, usage example: fetchData().then(res => setUser(res))
    */

  const fetchData = async () => {
    let res = await axios
      .get(BackendRoutes.check, {withCredentials: true});

    if (typeof res.data.passport != "undefined") {
      return res.data.passport;
    } else {
      return {}
    }
  }

  useEffect(() => {
    document.title = "BIST League 3.0";
    fetchData()
      .then(res => {
        // Set User State
        setUser(res);

        // Set ID, Email, Role State
        let temp = Object.values(res);  // Object.values expected to return single array
        temp = temp.pop();              // This strips the array, if it pops empty array, it becomes undefined.

        if (typeof temp == "undefined") {
          temp = defaultUserState       // This repopulates the undefined value from temp to default object.
        }

        setID(temp.id);
        setEmail(temp.email);
        setRole(temp.role);
      }
    );
  }, []);
  
  return (
    <div>
      {JSON.stringify(user)}<br/>
      User ID : {ID}<br/>
      Email: {email}<br/>
      Role: {role}<br/>
      <div>
        {/* <ul>
          {JSON.stringify(this.state.user)}
       </ul> */}
      </div>
      <div>
        <a href={BackendRoutes.login}>login</a><br/>
        <a href={BackendRoutes.register}>register</a><br/>
        <a href={BackendRoutes.logout}>logout</a>
      </div>
    </div>
  );
}

// class Dashboard extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: []
//     }
//   }

//   componentDidMount(){
    // try {
    //   fetch("/api/bistleague3/auth/login/check")
    //     .then(res => res.json())
    //     .then(user => {
    //       if (typeof user.passport != "undefined") {
    //         this.setState({user: user.passport});
    //       } else {
    //         this.setState({user: {}});
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // } catch (err) {
    //   console.log("Compile first, it seems the client wanted to fetch something you don't want to. Try stop the server and run npm start", err.message);
    // }
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           <ul>
//             {JSON.stringify(this.state.user)}
//          </ul>
//         </div>
//         <div>
//           <a href={BackendRoutes.login}>login</a><br/>
//           <a href={BackendRoutes.register}>register</a><br/>
//           <a href={BackendRoutes.logout}>logout</a>
//         </div>
//       </div>
//     )
//   }
// }

export default Dashboard;