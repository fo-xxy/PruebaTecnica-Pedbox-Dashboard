import React from "react";
import Temas from "./components/Temas";
import 'bootstrap/dist/css/bootstrap.min.css';


//Consumo del api, debe estar activa para que pueda funcionar
function App() {
const API_URL = "http://localhost:3000/api/v1/temas/"; 

  return (
    <div className="App">
            <Temas apiUrl={API_URL} />
    </div>
  );
}

export default App;