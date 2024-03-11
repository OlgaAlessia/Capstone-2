import React from "react";

/** Component for showing alerts.
 *
 * This alert is used in LoginForm, SignupForm and ProfileForm
 **/

function Alert({ type, messages }) {

  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map(error => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}


Alert.defaultProps = {
  type: "danger",
  messages: []
};


export default Alert;
