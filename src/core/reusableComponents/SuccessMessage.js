import React from "react";
import { Message } from "semantic-ui-react";

const SuccessMessage = ({ message = "this is a test success message" }) => {
  return (
    <div>
      <Message success header="Success....!" content={message} />
    </div>
  );
};

export default SuccessMessage;
