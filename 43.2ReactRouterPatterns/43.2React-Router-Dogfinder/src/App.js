import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./src/RouteList";
import './App.css';
import NavBar from "./src/NavBar";


/**
 * app
 * state:
 * dogs:
 * isloading: boolean
 *
 * props: none
 * App: route list
  */

function App() {
  const [dogs, setDogs] = useState(
    {
      data: null,
      isLoading: true
    }
  );

  useEffect(() =>{
    async function loadDogs(){
      const response = await axios.get("http://localhost:5001/dogs")
      setDogs({
        data: response.data,
        isLoading: false
      })
    }
    loadDogs()
  }, [])

  if (dogs.isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h1>Welcome</h1>
      <BrowserRouter>
      <NavBar dogs ={dogs.data} />
      <div className="container">
        <RouteList dogs={dogs.data}/>
      </div>
      </BrowserRouter>
    </div>
  );

  }

  return (
    <div className="App">
      <h1>Good luck!</h1>
    </div>
  );


export default App;
