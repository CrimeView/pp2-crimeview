import React from "react";

import { NavItem, NavLink } from "reactstrap";

export default function NavAdmin() {

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
    </>

    );
}