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

// reactstrap components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Table } from "reactstrap";

// core components

function SectionTabelaDados() {

  const [dados, setDados] = useState([]);

  async function buscarDados() {

    const api = `http://localhost:8080/api/dados`;

    axios.get(api)
    .then(response => {
      console.log(response.data);
      setDados(response.data)
    }).catch(error => {
      console.log(error);
    })
    
  }

  useEffect(() => {
    buscarDados();
  }, [])

  return (
    <>
      <br></br>
      <br></br>,
      <div className="section">

        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">

              <h3>GERENCIAMENTO DE DADOS</h3>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Município</th>
                    <th>Região Geográfica</th>
                    <th>Natureza Jurídica</th>
                    <th>Data</th>
                    <th>Total de Vítimas</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map(dado => {
                    return(
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.municipio}</td>
                      <td>{dado.regiao}</td>
                      <td>{dado.natureza}</td>
                      <td>{dado.data}</td>
                      <td>{dado.vitima}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionTabelaDados;
