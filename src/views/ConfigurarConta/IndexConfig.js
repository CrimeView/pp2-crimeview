
import React, { useState } from "react";

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

function ConfigurarConta() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  function handleEditarDados(e) {
  e.preventDefault();
  //
  }

  function handleSalvarAlteracoes(e) {
    e.preventDefault();
    //
  }
  return (
    <>
      <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto" style={{color: "#B33C12"}}>Configurar Conta</h3>

                
                <Form className="register-form">
                  <label>Nome</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>*/}
                    </InputGroupAddon>
                    <Input placeholder="Nome" type="text" />
                  </InputGroup>


                  <label>Sobrenome</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input placeholder="Sobrenome" type="text" />
                  </InputGroup>

                  <label>Senha Atual</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input placeholder="Senha atual" type="password" />
                  </InputGroup>

                  <label>Nova Senha</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input placeholder="Nova senha" type="password" />
                  </InputGroup>

                  <label>Repetir Senha</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input placeholder="Repetir senha" type="password" />
                  </InputGroup>

                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    onClick={(e) => handleEditarDados()}
                  >
                    Editar dados
                  </Button>
                </Form>

                
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => handleSalvarAlteracoes()}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </Card>
              
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default ConfigurarConta;
