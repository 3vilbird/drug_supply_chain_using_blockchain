import React from "react";
import { Button, Step, Icon, Card, Table } from "semantic-ui-react";
import Shipment_status from "./Shipment_status";

const Tracker_shipper = ({
  setReload = (f) => f,
  reload = undefined,
  Batch_id,
  name,
  Des,
  Quan,
  mnfdate,
  expdate,
  manufacturer,
  wholeseller,
  distributor,
  pharmacist,
  status,
}) => {
  const medicine_Info = () => (
    <Table celled inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={5}>Batch Id :</Table.HeaderCell>
          <Table.HeaderCell>{Batch_id}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Name :</Table.HeaderCell>
          <Table.HeaderCell>{name}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Des :</Table.HeaderCell>
          <Table.HeaderCell>{Des}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Quan :</Table.HeaderCell>
          <Table.HeaderCell>{Quan}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Mnf date :</Table.HeaderCell>
          <Table.HeaderCell>{mnfdate}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Manufacturer :</Table.HeaderCell>
          <Table.HeaderCell>{manufacturer}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>wholeseller :</Table.HeaderCell>
          <Table.HeaderCell>{wholeseller}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Disrtibutor :</Table.HeaderCell>
          <Table.HeaderCell>{distributor}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Pharmacist :</Table.HeaderCell>
          <Table.HeaderCell>{pharmacist}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );

  return (
    <div
      className="card p-2"
      style={{
        width: "50rem",
        alignItem: "center",
        justifyContent: "center",
      }}
    >
      <Table inverted>
        <Table.Row>
          <Table.HeaderCell
            width={10}
            textAlign="center"
            style={{ fontSize: "1.5rem", fontStyle: "italic" }}
          >
            Medicine info...!
          </Table.HeaderCell>
        </Table.Row>
      </Table>
      {medicine_Info()}
      <Shipment_status id={status} />
      <Button
        secondary
        onClick={() => {
          setReload(!reload);
        }}
      >
        {" "}
        click
      </Button>
    </div>
  );
};

export default Tracker_shipper;
