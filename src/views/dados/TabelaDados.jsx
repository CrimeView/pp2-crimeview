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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { toast } from "react-toastify";
import 'chart.js/auto';

function SectionTabelaDados() {
  const [dados, setDados] = useState([]);
  const [dadosReport, setDadosReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const registrosPorPagina = 100;
  const [selectedDataSource, setSelectedDataSource] = useState('dados'); // Fonte de dados selecionada ('dados' ou 'dadosReport')
  const [chartData, setChartData] = useState({});
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Vítimas'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Data'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Municípios com mais vítimas',
        font: {
          size: 18}
      }
    },
    filterMunicipios: true
  };

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

  
  
   
    //Gerar o gráfico
    async function gerarGrafico() {
      try {
        const api = `http://localhost:8080/api/dadosReport`; 
  
        const response = await axios.get(api);
        const dados = response.data;
  
        // Filtrar e ordenar os municípios com mais vítimas
        const municipiosOrdenados = dados
          .sort((a, b) => b.vitima - a.vitima)
          .slice(0, 5) // Altere para exibir o número desejado de municípios com mais vítimas
          .map(dado => dado.municipio);
  
        // Filtrar os dados dos municípios selecionados
        const dadosFiltrados = dados.filter(dado => municipiosOrdenados.includes(dado.municipio));

        //cores
        const cores = [
          "rgba(255, 0, 0, 0.5)",    // Vermelho claro
          "rgba(0, 255, 0, 0.5)",    // Verde claro
          "rgba(0, 0, 255, 0.5)",    // Azul claro
          "rgba(255, 255, 0, 0.5)",  // Amarelo claro
          "rgba(128, 0, 128, 0.5)"   // Roxo claro
        ];


        // Criar os datasets para o gráfico
        const datasets = [];
        for (let i = 0; i < municipiosOrdenados.length; i++) {
        const municipio = municipiosOrdenados[i];
        const vitimasPorMunicipio = dadosFiltrados
          .filter(dado => dado.municipio === municipio)
          .map(dado => dado.vitima);

        datasets.push({
          label: municipio,
          data: vitimasPorMunicipio,
          fill: false,
          borderColor: cores[i % cores.length], 
          backgroundColor: cores[i % cores.length]// Seleciona uma cor da lista de cores fixas
        });
      }

        const chartData = {
          labels: dadosFiltrados.map(dado => dado.data), 
          datasets: datasets,
        };
  
      setChartData(chartData);
          
      const chartWindow = window.open("", "_blank");
      if (chartWindow) {
        chartWindow.document.write(`
          <html>
            <head>
              <title>Gráfico de Vítimas por Data</title>
              <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </head>
            <body>
              <canvas id="chartCanvas"></canvas>
              <script>
                const ctx = document.getElementById('chartCanvas').getContext('2d');
                new Chart(ctx, {
                  type: 'bar',
                  data: ${JSON.stringify(chartData)},
                  options: ${JSON.stringify(options)}
                });
              </script>
            </body>
          </html>
        `);
        chartWindow.document.close();
      }
      } catch (error) {
        console.error("Erro ao buscar os dados do gráfico:", error);
      }
      
    }

    

    {/*//gerar uma cor aleatória a cada chamada
 const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
*/}


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
                
                  
                
                  <button className="btn" onClick={generatePDF}>Exportar PDF</button>
                  <button className="btn" onClick={gerarGrafico}>
                    Gerar Gráfico
                  </button>

                  {/*{Object.keys(chartData).length > 0 && (
                    <Bar data={chartData} options={options}
                     />
                  )}*/}
                  
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