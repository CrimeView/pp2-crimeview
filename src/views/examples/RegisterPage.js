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
import React, { useEffect, useState } from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import api from '../../ENDERECO_SERVIDOR';
import { toast, ToastContainer } from "react-toastify";
import IndexNavbar from "components/Navbars/IndexNavbar";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import axios from "axios";
import { Redirect } from "react-router-dom";

function RegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [display,setDisplay] = useState("");
  const user = JSON.parse(localStorage.getItem('userData'));

  async function logar() {
    let request = {
      email: email,
      senha: senha
    }
    await axios.post(api + '/admin/login', request)
      .then(response => {
        setEmail("");
        setSenha("");
        localStorage.setItem('userData', JSON.stringify(response.data));
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }).catch(error => {
        toast.error("Usuário ou senha inválidos");
      })
  }

  useEffect(() => {

    if(user){
      setDisplay("none");
    } else{
      setDisplay("block")
    }

  }, [])

  return (
    <>

      <ToastContainer autoClose={3000} />
      <IndexNavbar />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container style={{display: `${display}`}}>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto" style={{ color: 'black', fontWeight: 600 }}>Acesso restrito</h3>

                <Form className="register-form">
                  <label>E-mail</label>
                  <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Senha</label>
                  <Input placeholder="Password" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                  <Button block className="btn-round" color="danger" onClick={() => logar()}>
                    Entrar
                  </Button>
                </Form>

              </Card>
            </Col>
          </Row>
        </Container>

      </div>
    </>
  );
}

export default RegisterPage;
