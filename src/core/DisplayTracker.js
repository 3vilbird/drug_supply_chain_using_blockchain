import React, { useState, useEffect } from "react";
import { Button, Step, Icon, Card, Table } from "semantic-ui-react";
import { trackPackage } from "../etherium/MedicineDeploy";
import Shipment_status from "./reusableComponents/Shipment_status";

const DisplayTracker = ({
  b_id,
  name,
  des,
  manu_date,
  exp_date,
  manuFctr,
  wholese,
  distri,
  pharma,
  shipment,
  quantity,
}) => {
  const [load, setLoad] = useState(false);

  const som = () => {
    console.log(
      "===>",
      b_id,
      name,
      des,
      manu_date,
      exp_date,
      manuFctr,
      wholese,
      distri,
      pharma,
      shipment,
      quantity
    );
  };

  useEffect(() => {
    som();
  }, []);

  const medicine_Info = () => (
    <Table celled inverted>
      <Table.Header>        
        <Table.Row>
          <Table.HeaderCell width={5}>Batch Id :</Table.HeaderCell>
          <Table.HeaderCell>{b_id}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Name :</Table.HeaderCell>
          <Table.HeaderCell>{name}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Des :</Table.HeaderCell>
          <Table.HeaderCell>{des}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Quan :</Table.HeaderCell>
          <Table.HeaderCell>{quantity}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Mnf date :</Table.HeaderCell>
          <Table.HeaderCell>{manu_date}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Exp date :</Table.HeaderCell>
          <Table.HeaderCell>{exp_date}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Manufacturer:</Table.HeaderCell>
          <Table.HeaderCell>{manuFctr}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Wholeseller :</Table.HeaderCell>
          <Table.HeaderCell>{wholese}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Distributor :</Table.HeaderCell>
          <Table.HeaderCell>{distri}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Pharma :</Table.HeaderCell>
          <Table.HeaderCell>{pharma}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );

  return (
    <div>
      {medicine_Info()}

      <Shipment_status id={parseInt(shipment)} />
    </div>
  );
};

export default DisplayTracker;
