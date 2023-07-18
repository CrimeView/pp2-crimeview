import React from "react";

import { NavItem, NavLink } from "reactstrap";
import {signOut} from 'firebase/auth';
import {auth} from '../../FirebaseConnection';

export default function NavAdmin() {

    const userData = JSON.parse(localStorage.getItem("userData"));

    async function logout(){
        signOut(auth);
        localStorage.clear();
        window.location.reload();
    }

    return(
        <>
        <NavItem>
            <NavLink
                href="/dados"
            >
                <i class="fa fa-database" aria-hidden="true"></i>
                <p title="Gerenciar Dados">Gerenciar dados</p>
            </NavLink>
        </NavItem>

        <NavItem>
            <NavLink
                href="/usuarios"
            >
                <i class="fa fa-users" aria-hidden="true"></i>
                Lista de usuários
            </NavLink>
        </NavItem>

        {userData && 
        <NavItem>
            <NavLink
                href="#"
                onClick={() => logout()}
            >
                <i class="fa fa-users" aria-hidden="true"></i>
                Sair
            </NavLink>
        </NavItem>
        
        }
    </>

    );
}