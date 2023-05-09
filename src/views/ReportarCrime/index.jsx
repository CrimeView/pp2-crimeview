import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

export default function ReportarCrime(props){

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear()}-${dataAtual.getMonth()+1}-${dataAtual.getDate()}`

    const regioesPE = ['Agreste Pernambucano', 'Mata Pernambucana', 'Sertão Pernambucano', 'Região Metropolitana do Recife'];

    return(
        <>
            <Button style={{position: "absolute", bottom: "25px", left: "25px"}} className="buttonReport" color="danger" onClick={toggle}>
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Reportar Crime
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><span style={{fontWeight: 600}}>Reportar Crime</span></ModalHeader>
        <ModalBody>
          <form action="" method="post">

            <label style={{fontWeight: 600}} htmlFor="select">Natureza</label>
          <Input
    bsSize=""
    type="select">
        <option selected>Selecione...</option>
        <option value="Homicidio">Homicidio</option>
        <option value="Roubo">Roubo</option>
    </Input>

        <br />
        <label style={{fontWeight: 600}} htmlFor="select">Região geográfica</label>
        <Input
    bsSize=""
    type="select">
        <option value="" selected>Selecione a região...</option>
        {regioesPE.map((regiao, index) => {
        return(
            <option key={index} value={regiao}>{regiao}</option>
        );
        })}
    </Input>

        <br />

    <label style={{fontWeight: 600}} htmlFor="">Data</label>
  <Input
    bsSize=""
    type="date"
  />

  <br />

  <label style={{fontWeight: 600}} htmlFor="">Total de vítimas</label>
  <Input
    bsSize=""
    type="number"
    min={1}
  />


          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
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