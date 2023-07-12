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
import axios from "axios";
import moment from 'moment';
// reactstrap components
import { Container, Row, Col, Table } from "reactstrap";

// core components

function SectionDark() {

  const userData = JSON.parse(localStorage.getItem('userData'));
  const [historico, setHistorico] = useState([])

  function buscarHistorico() {
    const api = `http://localhost:8080/api/`;

    axios.get(api+'dadosReport/user/'+userData.uid)
    .then(reports => {
      setHistorico(reports.data)
    })
  }

  useEffect(() => {
    buscarHistorico()

  },[])
  

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
            <th>Vítimas</th>
          </tr>
        </thead>
        <tbody>
          {historico.map(report=>{
             const dataFormat = `${report.data[0]}-${report.data[1]}-${report.data[2]}`
            return(
          <tr>
              <th scope="row">{report.municipio}</th>
              <td>{report.natureza}</td>
              <td style={{ fontWeight: 500 }}>{moment(dataFormat).format('DD/MM/YYYY')}</td>
              <td>{report.vitima}</td>
           </tr>
            )
            

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

export default SectionDark;
