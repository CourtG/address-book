import './App.css';
import { useState } from "react";
import Axios from 'axios';


function App() {

  const [location, setLocation] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");

  const [newLocation, setNewLocation] = useState("");
  const [newAlias, setNewAlias] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [userList, setUserList] = useState([]);

// ADD USER (and add to UserList)
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


// GET USER LIST
  const getUsers = () => {
    Axios.get("http://localhost:5432/users").then((response) => {
      setUserList(response.data)
    });
  };

// UPDATES (db and UserList)
const updateUserLocation = (id) => {
  Axios.put("http://localhost:5432/update", {location: newLocation, id: id})
    .then((response) => {
    setUserList(userList.map((val) => {
      return val.id == id ? {
        id: val.id, 
        location: newLocation, 
        alias: val.alias, 
        email: val.email
      } : val
    }))
    }
  );
};

const updateUserAlias = (id) => {
  Axios.put("http://localhost:5432/update", {alias: newAlias, id: id})
    .then((response) => {
    setUserList(userList.map((val) => {
      return val.id == id ? {
        id: val.id, 
        location: val.location, 
        alias: newAlias, 
        email: val.email
      } : val
    }))
    }
  );
};

const updateUserEmail = (id) => {
  Axios.put("http://localhost:5432/update", {email: newEmail, id: id})
    .then((response) => {
    setUserList(userList.map((val) => {
      return val.id == id ? {
        id: val.id, 
        location: val.location, 
        alias: val.alias, 
        email: newEmail
      } : val
    }))
    }
  );
};

// DELETE USER (by ID, update UserList)

const deleteUser = (id) => {
  Axios.delete(`http://localhost:5432/delete/${id}`)
    .then ((response) => {
      setUserList(userList.filter((val)=> {
        return val.id != id
      }))
    });
};


// INPUT FORM (add/show Users + update/delete buttons per user)

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
        <input type="text" onChange={(event) => {
          setEmail(event.target.value);
        }}/>

{/* BUTTONS TO ADD/SHOW USERS */}

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

{/* UPDATE INPUTS */}
                <div> 
                  {""}
                  <input 
                    type="text" 
                    placeholder="city"
                    onChange={(event) => {
                      setNewLocation(event.target.value);
                    }}
                  />

                  {""}
                  <input 
                    type="text" 
                    placeholder="initials"
                    onChange={(event) => {
                      setNewAlias(event.target.value);
                    }}
                  />

                  {""}
                  <input 
                    type="text" 
                    placeholder="email@email.com"
                    onChange={(event) => {
                      setNewEmail(event.target.value);
                    }}
                  />
                

{/* UPDATE AND DELETE BUTTONS */}

                  <button onClick={()=> {
                    updateUserLocation(val.id);
                    }}
                    >
                      {""}
                      Update Location
                  </button>

                  <button onClick={()=> {
                    updateUserAlias(val.id);
                    }}
                    >
                      {""}
                      Update Alias
                  </button>
                                    
                  <button onClick={()=> {
                    updateUserEmail(val.id);
                    }}
                    >
                      {""}
                      Update Email
                  </button>

                  
                  <button 
                    onClick={()=> {
                      deleteUser(val.id);
                      }}
                      >
                  Delete User
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
