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
import { Col, Container, Row, Table } from "reactstrap";

// core components

function SectionTabelaDados() {
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
                    <th>Sexo</th>
                    <th>Natureza Jurídica</th>
                    <th>Data</th>
                    <th>Ano</th>
                    <th>Idade</th>
                    <th>Total de Vítimas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Jaboatão dos Guararapes</td>
                    <td>Região Metropolitana</td>
                    <td>Masculino</td>
                    <td>Homicídio</td>
                    <td>01/01/2004</td>
                    <td>2004</td>
                    <td>24</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Recife</td>
                    <td>Região Metropolitana</td>
                    <td>Masculino</td>
                    <td>Homicídio</td>
                    <td>01/01/2008</td>
                    <td>2008</td>
                    <td>44</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Caruaru</td>
                    <td>Agreste</td>
                    <td>Feminino</td>
                    <td>Lesão Corporal por Violencia Doméstica/Familiar</td>
                    <td>01/01/2020</td>
                    <td>2020</td>
                    <td>27</td>
                    <td>1</td>
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

export default SectionTabelaDados;
