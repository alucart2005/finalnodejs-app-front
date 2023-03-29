import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertDismissibleExample = ({ isVisible, dismiss }) => {
  // Declare a state variable show with an initial value of true
  // The state will be updated using the setShow function
  const [show, setShow] = useState(true);

  // The useEffect hook updates the show state with the value of isVisible prop
  // It runs every time the isVisible value changes
  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  // If show is true, render the alert component
  return show ? (
    <Alert variant="danger" onClose={dismiss} dismissible>
      {/* The alert component has a variant "danger" and a close button that calls the dismiss prop */}
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      {/* The heading of the alert */}
      <p>
        Change this and that and try again.
      </p>
      {/* The alert message */}
    </Alert>
  ) : null;
};

export default AlertDismissibleExample;
// Export the component as the default export
