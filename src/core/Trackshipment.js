import React, { Component } from "react";
import { Button, Step, Icon } from "semantic-ui-react";
import Topbar from "./reusableComponents/Topbar";

class Trackshipment extends Component {
  render() {
    const some = () => {
      console.log("====================================");
      console.log(this.props.match.params.id);
      console.log("====================================");
    };

    some();

    const bb = () => (
      <Step.Group >
        <Step completed>
          <Icon name="truck" />
          <Step.Content>
            <Step.Title>Shipping</Step.Title>
            <Step.Description>Choose your shipping options</Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Icon name="truck" />
          <Step.Content>
            <Step.Title>Received</Step.Title>
            <Step.Description>At wholeseller</Step.Description>
          </Step.Content>
        </Step>

        <Step active>
          <Step.Content>
            <Step.Title>shipping</Step.Title>
            <Step.Description>Choose your shipping options</Step.Description>
          </Step.Content>
        </Step>
        <Step active>
          <Step.Content>
            <Step.Title>Received</Step.Title>
            <Step.Description>At Distributor</Step.Description>
          </Step.Content>
        </Step>
        <Step active>
          <Step.Content>
            <Step.Title>Ship[ping</Step.Title>
            <Step.Description>Choose your shipping options</Step.Description>
          </Step.Content>
        </Step>
        <Step active>
          <Step.Content>
            <Step.Title>Received</Step.Title>
            <Step.Description>At Pharma</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    );

    return (
      <div>
        <Topbar
          title="Shipment Tracker..!"
          description=" manufacturer can get info of shipment"
        />
        {bb()}
      </div>
    );
  }
}

export default Trackshipment;
