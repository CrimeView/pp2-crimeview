import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';
import cidades from '../../docs/cidades';
import regioesPE from "docs/regioes";
import { toast } from "react-toastify";

export default function ReportarCrime(props) {

  const [userData, setUserData] = useState(false);

  const [modal, setModal] = useState(false);

  const [municipio, setMunicipio] = useState("");
  const [regiao, setRegiao] = useState("");
  const [natureza, setNatureza] = useState("");
  const [vitimas, setVitimas] = useState("");

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const verificarUser = localStorage.getItem("userData");
    console.log(verificarUser)

    if(verificarUser != "null"){
      setUserData(true);
    } else{
      setUserData(false);
    }

    

  }, []);

  function reportarCrime() {
    const api = `http://localhost:8080/api/dadosReport`
    const data = {
      regiao: regiao,
      natureza: natureza,
      municipio: municipio,
      vitima: vitimas,
      statusDado: true,
      id_usuario: 1
    }

    console.log(data);

    axios.post(api, data)
      .then(response => {
        toast.success("Crime reportado com sucesso!");
        setRegiao("");
        setNatureza("");
        setMunicipio("");
        setVitimas("");
        setModal(false);
      }).catch(error => {
        toast.error("Ops! Ocorreu um erro ao reportar.");
      })


  }



  return (
    <>
      {userData &&
        <Button style={{ position: "absolute", bottom: "25px", left: "25px" }} className="buttonReport" color="danger" onClick={toggle}>
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Reportar Crime
        </Button>
      }


      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><span style={{ fontWeight: 600 }}>Reportar Crime</span></ModalHeader>
        <ModalBody>
          <form action="" method="post">

            <label style={{ fontWeight: 600 }} htmlFor="select">Natureza</label>
            <Input
              bsSize=""
              type="select" value={natureza} onChange={e => setNatureza(e.target.value)}>
              <option selected>Selecione...</option>
              <option value="Homicidio">Homicidio</option>
              <option value="Roubo">Roubo</option>
            </Input>

            <br />
            <label style={{ fontWeight: 600 }} htmlFor="select">Região geográfica</label>
            <Input
              bsSize=""
              type="select"
              value={regiao}
              onChange={e => setRegiao(e.target.value)}
            >
              <option value="" selected>Selecione a região...</option>
              {regioesPE.map((regiao, index) => {
                return (
                  <option key={index} value={regiao}>{regiao}</option>
                );
              })}
            </Input>

            <br />
            <label style={{ fontWeight: 600 }} htmlFor="select">Município</label>
            <Input
              bsSize=""
              type="select"
              value={municipio}
              onChange={e => setMunicipio(e.target.value)}
            >
              <option value="" selected>Selecione a região...</option>
              {cidades.map(cidade => {
                return (
                  <option key={cidade.id} value={cidade.cidade}>{cidade.cidade}</option>
                );
              })}
            </Input>

            <br />

            <label style={{ fontWeight: 600 }} htmlFor="">Total de vítimas</label>
            <Input
              bsSize=""
              type="number"
              min={1}
              value={vitimas}
              onChange={e => setVitimas(e.target.value)}
            />


          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => reportarCrime()}>
            Reportar
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );

}