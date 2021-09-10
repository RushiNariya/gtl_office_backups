import React, { createContext } from "react";
import UserProfile from './UserProfile';
export const userContext = createContext();
export const profileContext = createContext(); 
const App = () => {
    return(
        <userContext.Provider value={{ fname: 'Saurabh', lname: 'Shukla' }}>
            <profileContext.Provider value={{ profile: 'Web Developer' }}>
               <UserProfile />
           </profileContext.Provider>
       </userContext.Provider>
    );
}

export default App;
