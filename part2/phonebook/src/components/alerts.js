export const Alert = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="alertBox">{message}</div>;
};
export const ErrorAlert = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="errorAlertBox">{message}</div>;
};
