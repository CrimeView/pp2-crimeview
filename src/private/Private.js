import { Redirect } from "react-router-dom";

export default function Private({children}){
    
    const signUser = localStorage.getItem("userData");

    if(!signUser){
        return <Redirect to="/" />
    }


    return children;
}