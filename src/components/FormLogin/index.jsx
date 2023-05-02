import React from "react";

import './style.css';

export default function FormLogin(){
    return(
        <>
            <div className="container-form">
                <form action="/">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Informe seu e-mail" />
                </form>
            </div>
        </>
    );
    
}