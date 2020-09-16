import React from "react";
import { Table, Divider, Step, Icon, Button, Popup } from "semantic-ui-react";

const Load_info_to_pharma = ({
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
  setReload = (f) => f,
  reload = undefined,
}) => {
  const med_info = () => (
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
          <Table.HeaderCell>Exp date :</Table.HeaderCell>
          <Table.HeaderCell>{expdate}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );

  const track_info = () => (
    <Step.Group vertical>
      <Popup
        trigger={
          <Step>
            <Icon name="industry icon" />
            <Step.Content>
              <Step.Title>Manufacturer</Step.Title>
            </Step.Content>
          </Step>
        }
        inverted
      >
        <h4 className="p-2 "> Manufacturer</h4>
        <p className="p-1">{manufacturer}</p>
      </Popup>
      <Popup
        inverted
        trigger={
          <Step>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Wholeseller</Step.Title>
            </Step.Content>
          </Step>
        }
      >
        <h4 className="p-2 "> Wholeseller</h4>
        <p className="p-1">{wholeseller}</p>
      </Popup>
      <Popup
        inverted
        trigger={
          <Step>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Distributor</Step.Title>
            </Step.Content>
          </Step>
        }
      >
        <h4 className="p-2 "> Distributor</h4>
        <p className="p-1">{distributor}</p>
      </Popup>
      <Popup
        inverted
        trigger={
          <Step active>
            <Icon name="medkit icon" />
            <Step.Content>
              <Step.Title>Pharmacist</Step.Title>
            </Step.Content>
          </Step>
        }
      >
        <h4 className="p-2 "> Pharmacist</h4>
        <p className="p-1">{pharmacist}</p>
      </Popup>
    </Step.Group>
  );

  const tamplet = () => (
    <div className="ml-5">
      <div
        className="card"
        style={{
          width: "50rem",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <div className="card-head">
          <Table inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  width={10}
                  textAlign="center"
                  style={{ fontSize: "1.5rem", fontStyle: "italic" }}
                >
                  Medicine info...!
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </div>
        <div className="card-body">
          <Divider inverted />
          <Table inverted className="p-3">
            <div className="row">
              <div className="col-8">
                {med_info()}
                <Button
                  basic
                  inverted
                  color="teal"
                  className="btn-block"
                  onClick={() => {
                    setReload(!reload);
                  }}
                >
                  Back
                </Button>
              </div>
              <div className="col-4">{track_info()}</div>
            </div>
          </Table>
        </div>
      </div>
    </div>
  );

  return <div>{tamplet()}</div>;
};

export default Load_info_to_pharma;
