import React from "react";
import { Message } from "semantic-ui-react";

const ErrorMessage = ({
  message = "this is a test for the error message",
  hea = "Oops...!",
}) => {
  return (
    <div>
      <Message error header={hea} content={message} />
    </div>
  );
};

export default ErrorMessage;
