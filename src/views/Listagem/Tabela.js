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
import React from "react";



// reactstrap components
import { Container, Row, Col, Table } from "reactstrap";

// core components

function SectionDark() {
  return (
    <>
    <br></br>
    <br></br>,
      <div className="section">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
                <h3>Lista de Usuários</h3>
                <br></br>
            <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Tipo</th>
            <th>Data de cadastro</th>
            <th>Opções</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">maria_lidia@gmail.com</th>
            <td>Usuário</td>
            <td>08/03/2023</td>
            <button>Deletar</button>
            <button>Atualizar</button>
          </tr>
          <tr>
            <th scope="row">acss7@discente.ifpe.edu.br</th>
            <td>Administrador(a)</td>
            <td>28/09/2023</td>
            <button>Deletar</button>
            <button>Atualizar</button>
          </tr>
          <tr>
            <th scope="row">Chiquinha_do_chaves@gmail.com</th>
            <td>Usuário</td>
            <td>01/10/2021</td>
            <button>Deletar</button>
            <button>Atualizar</button>
            
          </tr>
          
        </tbody>
      </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionDark;
