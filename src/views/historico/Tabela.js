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
            <Table>
        <thead>
          <tr>
            <th>Local</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Horário</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Joana Bezerra</th>
            <td>Estupro</td>
            <td>20/01/2023</td>
            <td>21h</td>
          </tr>
          <tr>
            <th scope="row">Parque da Jaqueira</th>
            <td>Assalto</td>
            <td>22/04/2023</td>
            <td>14h</td>
          </tr>
          <tr>
            <th scope="row">IFPE Jaboatão</th>
            <td>Tráfico</td>
            <td>01/10/2021</td>
            <td>20h</td>
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
