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
import {auth} from '../../FirebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components

function SectionLogin() {

  const userData = JSON.parse(localStorage.getItem("userData"));

  const [logado, setLogado] = useState("block");

  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  async function logar() {
    await signInWithEmailAndPassword(auth, email,passwd)
    .then(data => {
      toast.success("Você foi logado com sucesso!")
      setEmail("");
      setPasswd("");
      localStorage.setItem("userData", JSON.stringify(data));
      setTimeout(() => {
        setLogado("none");
        window.location.reload();
      },3010);
      
    }).catch(error => {
      toast.error("Usuário ou senha inválidos");
    })
    
  }

  async function criarConta(){
    await createUserWithEmailAndPassword(auth, email, passwd)
    .then(res => {
      toast.success("Conta criada com sucesso!");
      setEmail("");
      setPasswd("");
      localStorage.setItem("userData", JSON.stringify(res));
    }).catch(error => {
      if(error.code === "auth/email-already-in-use"){
        toast.error("Usuário já cadastrado!")
      } else if(error.code === "auth/weak-password"){
        toast.warn("Senha muito fraca!");
      } else if(error.code === "auth/invalid-email"){
        toast.warn("E-mail inválido!")
      }
    })
  }

  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          setLogado("none");
          localStorage.setItem("userData", JSON.stringify(user));
        } else{
          setLogado("block");
        }
      })
    }

    checkLogin()
  })

  return (
    <>
      <div
        className="section section-image section-login"
        style={{ display: `${logado}` }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto" style={{ color: "#B33C12" }}>Bem-vindo(a)</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mt-0"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mt-0 ml-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mt-0 ml-1"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <Form className="register-form">
                  <label>E-mail</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="E-mail" type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)} />
                  </InputGroup>
                  <label>Senha</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Senha" type="password"
                      value={passwd}
                      onChange={e => setPasswd(e.target.value)}
                    />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    onClick={() => logar()}
                  >
                    Entrar
                  </Button>

                  <Button
                    block
                    className="btn-round"
                    color="primary"
                    type="button"
                    onClick={() => criarConta()}
                  >
                    Cadastre-se
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Esqueceu sua senha?
                  </Button>
                </div>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionLogin;
