import React from "react";
import { Button, Step, Icon, Card, Table } from "semantic-ui-react";

const Shipment_status = ({ id }) => {
  let steps = [
    [
      {
        key: "0",
        icon: "truck",
        title: "Manufacturer",
        description: "Choose your shipping options",
      },
    ],
    [
      {
        key: "1",
        icon: "truck",
        completed: true,
        title: "Manufacturer",
        description: "Order shipped successfuly ",
      },
      {
        key: "2",
        icon: "truck",
        title: "Picked",
        active: true,
        description: "Order picked by the shipper",
      },
    ],
    [
      {
        key: "0",
        icon: "truck",
        completed: true,
        title: "Manufacturer",
        description: "Order shipped successfuly ",
      },
      {
        key: "1",
        icon: "truck",
        title: "Picked",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "2",
        icon: "truck",
        title: "Wholeseller",
        active: true,
        description: "Order received by the wholesellerr",
      },
    ],
    [
      {
        key: "0",
        icon: "truck",
        completed: true,
        title: "Manufacturer",
        description: "Order shipped successfuly ",
      },
      {
        key: "1",
        icon: "truck",
        title: "Picked",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "2",
        icon: "truck",
        title: "Wholeseller",
        completed: true,
        description: "Order received by the wholesellerr",
      },
      {
        key: "3",
        icon: "truck",
        title: "Shipper",
        active: true,
        description: "Order picked by the shipper",
      },
    ],
    [
      {
        key: "0",
        icon: "truck",
        completed: true,
        title: "Manufacturer",
        description: "Order shipped successfuly ",
      },
      {
        key: "1",
        icon: "truck",
        title: "Picked",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "2",
        icon: "truck",
        title: "Wholeseller",
        completed: true,
        description: "Order received by the wholesellerr",
      },
      {
        key: "3",
        icon: "truck",
        title: "Shipper",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "4",
        icon: "truck",
        title: "Distributor",
        active: true,
        description: "Order received by the distributor",
      },
    ],
    [
      {
        key: "0",
        icon: "truck",
        completed: true,
        title: "Manufacturer",
        description: "Order shipped successfuly ",
      },
      {
        key: "1",
        icon: "truck",
        title: "Picked",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "2",
        icon: "truck",
        title: "Wholeseller",
        completed: true,
        description: "Order received by the wholesellerr",
      },
      {
        key: "3",
        icon: "truck",
        title: "Shipper",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "4",
        icon: "truck",
        title: "Distributor",
        completed: true,
        description: "Order received by the distributor",
      },
      {
        key: "5",
        icon: "truck",
        title: "Shipper",
        active: true,
        description: "Order picked by the shipper",
      },
    ],
    [
      {
        key: "0",
        icon: "truck",
        completed: true,
        title: "Manufacturer",
        description: "Order shipped successfuly ",
      },
      {
        key: "1",
        icon: "truck",
        title: "Picked",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "2",
        icon: "truck",
        title: "Wholeseller",
        completed: true,
        description: "Order received by the wholesellerr",
      },
      {
        key: "3",
        icon: "truck",
        title: "Shipper",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "4",
        icon: "truck",
        title: "Distributor",
        completed: true,
        description: "Order received by the distributor",
      },
      {
        key: "5",
        icon: "truck",
        title: "Shipper",
        completed: true,
        description: "Order picked by the shipper",
      },
      {
        key: "6",
        icon: "truck",
        title: "Pharmacist",
        completed: true,
        description: "Order received by the pharmacist",
      },
    ],
  ];

  return (
    <Table inverted className="p-3">
      <Step.Group vertical items={steps[id]} />
    </Table>
  );
};

export default Shipment_status;
