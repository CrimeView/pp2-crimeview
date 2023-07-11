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
import { Chart } from "chart.js";
import { Col, Container, Row, Table } from "reactstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { toast } from "react-toastify";

function SectionTabelaDados() {
  const [dados, setDados] = useState([]);
  const [dadosReport, setDadosReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 10;
  const [selectedDataSource, setSelectedDataSource] = useState('dados'); // Fonte de dados selecionada ('dados' ou 'dadosReport')
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
 

  async function buscarDados() {
    const api = `http://localhost:8080/api/`;

    await axios.get(api + "dados")
      .then(response => {
        console.log(response.data);
        setDados(response.data);
        setLoading(false);
      }).catch(error => {
        console.log(error);
      })

    await axios.get(api + "dadosReport")
      .then(response => {
        console.log(response.data);
        setDadosReport(response.data);
        setLoading(false);
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    buscarDados();
  }, [])

  const indiceUltimoRegistro = paginaAtual * registrosPorPagina;
  const indicePrimeiroRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosPaginaAtual = selectedDataSource === 'dados' ? dados.slice(indicePrimeiroRegistro, indiceUltimoRegistro) : dadosReport.slice(indicePrimeiroRegistro, indiceUltimoRegistro);

  function alterarPagina(numeroPagina) {
    setPaginaAtual(numeroPagina);
  }

  function generatePDF() {
    const doc = new jsPDF();

    const tableData = registrosPaginaAtual.map(item => [item.id, item.municipio, item.regiao, item.natureza, item.data, item.vitima]);

    doc.autoTable({
      head: [['#', 'Município', 'Região', 'Natureza', 'Data', 'vitimas']],
      body: tableData
    })

    doc.save('dados.pdf');
  }

  function handleChangeDataSource(event) {
    setSelectedDataSource(event.target.value);
  }

  async function deleteRegistro(id){
    const api = selectedDataSource === 'dados' ? `http://localhost:8080/api/dados/${id}` : `http://localhost:8080/api/dadosReport/${id}`;

    const confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
      try {
        const response = await axios.delete(api);
        toast.success("Crime reportado com sucesso!");
        buscarDados();
      } catch (error) {
        toast.error("Ocorreu um erro ao excluir o registro.");
      }
    }
  }

  function gerarGrafico() {
    const municipios = {};
    dados.forEach(item => {
      const municipio = item.municipio;
      const vitimas = item.vitima;

      if (!municipios[municipio]) {
        municipios[municipio] = vitimas;
      } else {
        municipios[municipio] += vitimas;
      }
    });

    const municipiosSorted = Object.keys(municipios).sort((a, b) => municipios[b] - municipios[a]);
    const topMunicipios = municipiosSorted.slice(0, 5);

    const labels = topMunicipios;
    const data = topMunicipios.map(municipio => municipios[municipio]);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Vítimas",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const chart = new Chart("chartCanvas", {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    const newTab = window.open();
    newTab.document.body.innerHTML = `
      <h3>Municípios com Mais Vítimas</h3>
      <table>
        <thead>
          <tr>
            <th>Município</th>
            <th>Vítimas</th>
          </tr>
        </thead>
        <tbody>
          ${topMunicipios.map(municipio => `
            <tr>
              <td>${municipio}</td>
              <td>${municipios[municipio]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <canvas id="chartCanvas" width="400" height="400"></canvas>
    `;

    chart.render();
    newTab.document.getElementById("chartCanvas").outerHTML = chart.toBase64Image();
  }

  return (
    <>
      <br />
      <br />
      <div className="section">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h3>GERENCIAMENTO DE DADOS</h3>
              {loading ? (
                <p>Carregando dados...</p>
              ) : (
                <>
                  <div>
                    <label htmlFor="dataSourceSelect">Selecione a fonte de dados:</label><br />
                    <select id="dataSourceSelect" value={selectedDataSource} onChange={handleChangeDataSource}>
                      <option value="dados">Dados</option>
                      <option value="dadosReport">Dados Report</option>
                    </select>
                  </div><br />
                  
                  <button className="btn" onClick={gerarGrafico}>Gerar Gráfico</button>
                  <button className="btn" onClick={generatePDF}>Exportar PDF</button>
                  
                  <br />
                  <br />
                </>
              )}
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Município</th>
                        <th>Região Geográfica</th>
                        <th>Natureza Jurídica</th>
                        <th>Data</th>
                        <th>Total de Vítimas</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrosPaginaAtual.map(dado => {
                        const dataFormat = `${dado.data[0]}-${dado.data[1]}-${dado.data[2]}`
                        return (
                          <tr key={dado.id}>
                            <td style={{ fontWeight: 500 }}>{dado.id}</td>
                            <td style={{ fontWeight: 500 }}>{dado.municipio}</td>
                            <td style={{ fontWeight: 500 }}>{dado.regiao}</td>
                            <td style={{ fontWeight: 500 }}>{dado.natureza}</td>
                            <td style={{ fontWeight: 500 }}>{moment(dataFormat).format('DD/MM/YYYY')}</td>
                            <td style={{ fontWeight: 500 }}>{dado.vitima}</td>
                            <td style={{ fontWeight: 500 }}><button className="btn btn-danger" onClick={() => deleteRegistro(dado.id)}>Excluir</button></td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>

                  <div className="pagination">
                    <button
                      className="btn btn-secondary"
                      onClick={() => alterarPagina(paginaAtual - 1)}
                      disabled={paginaAtual === 1}
                      style={{ marginRight: 10 }}
                    >
                      Anterior
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={() => alterarPagina(paginaAtual + 1)}
                      disabled={indiceUltimoRegistro >= (selectedDataSource === 'dados' ? dados.length : dadosReport.length)}
                    >
                      Próxima
                    </button>
                  </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionTabelaDados;
