import { Redirect } from "react-router-dom";

export default function Private({children}){
    
    const signUser = JSON.parse(localStorage.getItem("userData"));

    if(signUser.uid){
        return <Redirect to="/" />
    }


    return children;
}