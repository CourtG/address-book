
import './App.css';
import { useState } from "react";
import Axios from 'axios';


function App() {

  const [location, setLocation] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");

  const [newLocation, setNewLocation] = useState("");

  const [userList, setUserList] = useState([]);

  const addUser = () => {
    Axios.post('http://localhost:5432/create', {
      location: location, 
      alias: alias, 
      email: email
    }).then(() => {
      setUserList([...userList, 
        {
        location: location, 
        alias: alias, 
        email: email,
        },
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:5432/users").then((response) => {
      setUserList(response.data)
    });
  };

const updateUserLocation = (id) => {
  Axios.put("http://localhost:5432/update", {location: newLocation, id: id})
    .then((response) => {
    alert("update");
    }
  );
};

  return (
    <div className="App">
      <div className="information">
        <label>Location:</label>
        <input type="text" onChange={(event) => {
          setLocation(event.target.value);
        }}
        />

        <label>Alias:</label>
        <input type="text" onChange={(event) => {
          setAlias(event.target.value);
        }}/>

        <label>Email:</label>
        <input type="mail" onChange={(event) => {
          setEmail(event.target.value);
        }}/>

        <button onClick={addUser}>Add User</button>
      </div>

        <div className="users">
          <button onClick={getUsers}>Show Users</button>

          {userList.map((val, key) => {
            return (
              <div className="user"> 

                <div>
                  <h3>Location: {val.location}</h3>
                  <h3>Alias: {val.alias}</h3> 
                  <h3>Email: {val.email}</h3> 
                </div>

                <div> 
                  {""}
                  <input 
                    type="text" 
                    placeholder="Toronto..."
                    onChange={(event) => {
                      setNewLocation(event.target.value);
                    }}
                  />

                  <button onClick={()=>{
                    updateUserLocation(val.id);
                    }}
                    >
                      {""}
                      Update
                  </button>
                  </div>

              </div>
            );
          })}
        </div>

    </div>
  );
}

export default App;
