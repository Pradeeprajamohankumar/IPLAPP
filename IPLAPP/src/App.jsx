import React from "react";
import Header from "./Components/Header/Header";
import Welcome from "./Components/Welcome/Welcome";
import DropdownMenu from "./Components/Dropdown/DropdownMenu";

function App(){
    return(
        <div>
            <Header/>
            <Welcome />
            <DropdownMenu/>
        </div>
    );
}
export default App;