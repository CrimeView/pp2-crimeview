import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../FirebaseConnection";
import React, { useState } from "react";
import { Button, Card, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from "reactstrap";
import {toast} from 'react-toastify';

function ConfigurarConta() {
  const user = auth.currentUser;
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [email, setEmail] = useState(userData.email);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function updateEmailHandler() {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        if (newEmail !== email) {
          updateEmail(user, newEmail)
            .then(() => {
              alert("E-mail atualizado");
            })
            .catch((error) => {
              alert("Erro ao atualizar o e-mail");
            });
        }
      })
      .catch((error) => {
        console.log("Erro ao reautenticar o usuário:", error);
      });
  }

  function updatePasswordHandler() {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            alert("Senha atualizada");
          })
          .catch((error) => {
            alert("Erro ao atualizar a senha");
          });
      })
      .catch((error) => {
        console.log("Erro ao reautenticar o usuário:", error);
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="mx-auto" lg="4" md="6">
            <Card className="card-register">
              <h3 className="title mx-auto" style={{ color: "#B33C12" }}>
                Configurar Conta
              </h3>

              <Form className="register-form">
                <label>E-mail</label>
                <InputGroup className="form-group-no-border">
                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                  <Input
                    placeholder="E-mail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>

                <label>Senha Atual</label>
                <InputGroup className="form-group-no-border">
                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                  <Input
                    placeholder="Senha Atual"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </InputGroup>

                <label>Nova Senha</label>
                <InputGroup className="form-group-no-border">
                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                  <Input
                    placeholder="Nova senha"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputGroup>

                <Button
                  block
                  className="btn-round"
                  color="danger"
                  type="button"
                  onClick={updateEmailHandler}
                  disabled={!currentPassword}
                >
                  Atualizar E-mail
                </Button>

                <Button
                  block
                  className="btn-round"
                  color="danger"
                  type="button"
                  disabled={!currentPassword || !newPassword}
                  onClick={updatePasswordHandler}
                >
                  Atualizar Senha
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ConfigurarConta;
