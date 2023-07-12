/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";



import Logo from '../../assets/logo.png';

import NavAdmin from "components/NavAdmin";
import NavUser from "components/NavUser";


function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const user = JSON.parse(localStorage.getItem("userData"))


  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">

      <div className="navbar-translate">
        <NavbarBrand
          data-placement="bottom"
          href="/index"
          target="_blank"
          title="Coded by Creative Tim"
        >
          <img src={Logo} width={120} />
        </NavbarBrand>
        <button
          aria-expanded={navbarCollapse}
          className={classnames("navbar-toggler navbar-toggler", {
            toggled: navbarCollapse
          })}
          onClick={toggleNavbarCollapse}
        >
          <span className="navbar-toggler-bar bar1" />
          <span className="navbar-toggler-bar bar2" />
          <span className="navbar-toggler-bar bar3" />
        </button>
      </div>
      <Collapse
        className="justify-content-end"
        navbar
        isOpen={navbarCollapse}
      >
        <Nav navbar>


          <NavItem>
            <NavLink
              href="/"
            >

              <i title="Home" class="fa fa-home" aria-hidden="true"></i>
              Home
            </NavLink>
          </NavItem>

          {user && 
          
          (user.id ? 
            <NavAdmin />
            :
            <NavUser />
          )


        }

         



          <NavItem>
            <NavLink
              data-placement="bottom"
              href="https://instagram.com/crimeviewbr?igshid=YmMyMTA2M2Y="
              target="_blank"
              title="Follow us on Instagram"
            >
              <i className="fa fa-instagram" />
              <p className="d-lg-none">Instagram</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-placement="bottom"
              href="https://github.com/CrimeView/pp2-crimeview"
              target="_blank"
              title="Star on GitHub"
            >
              <i className="fa fa-github" />
              <p className="d-lg-none">GitHub</p>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="https://micaellesilv4.editorx.io/crimeview"
              target="_blank"
            >
              <i className="nc-icon nc-book-bookmark" /> Conheça o projeto
            </NavLink>
          </NavItem>



        </Nav>
      </Collapse>

    </Navbar>
  );
}

export default IndexNavbar;
