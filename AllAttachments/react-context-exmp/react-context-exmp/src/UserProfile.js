import React, { useContext } from "react";

import { userContext, profileContext} from './App';

function UserProfile({user}) {
    const {fname, lname} = useContext(userContext);
    const {profile} = useContext(profileContext);

    return (
        <>
            <h1>{fname} {lname}</h1>
            <p>{profile}</p>
        </>
    )

}

export default UserProfile;
