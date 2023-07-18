import React from "react";

import { NavItem, NavLink } from "reactstrap";
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConnection';

export default function NavUser() {

    const userData = JSON.parse(localStorage.getItem("userData"));

    async function logout() {
        signOut(auth);
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>

            <NavItem>
                <NavLink
                    href="/historico"
                >
                    <i class="fa fa-history" aria-hidden="true"></i>
                    Histórico de Report
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                    href="/configurar"
                >
                    <i class="fa fa-cogs" aria-hidden="true"></i>
                    Configurar Conta
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