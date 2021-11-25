import React, { useState } from "react";
import "./App.css";

const Header = ({ text }) => <h2>{text}</h2>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const ShowStatus = ({ status, result, ...rest }) => (
  <tr>
    <td>{status}</td>{" "}
    <td>
      {" "}
      <strong>{result ? result : 0}</strong> {rest.unit ? rest.unit : ""}{" "}
    </td>
  </tr>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const onClick = (setStatus, value) => setStatus(value);
  const totalClick = good + neutral + bad;

  return (
    <div className="container">
      <Header text="Give Feedback" />
      <div className="buttonsBox">
        <Button onClick={() => onClick(setGood, good + 1)} text="good" />
        <Button
          onClick={() => onClick(setNeutral, neutral + 1)}
          text="neutral"
        />
        <Button onClick={() => onClick(setBad, bad + 1)} text="bad" />
      </div>

      <Header text="Statistics" />
      {totalClick == 0 ? (
        <p>No feedback given yet</p>
      ) : (
        <table>
          <ShowStatus status="good" result={good} />
          <ShowStatus status="neutral" result={neutral} />
          <ShowStatus status="bad" result={bad} />
          <ShowStatus status="all" result={totalClick} />
          <ShowStatus
            status="average"
            result={((good - bad) / totalClick).toFixed(3)}
          />
          <ShowStatus
            status="positive"
            result={(good / totalClick).toFixed(3)}
            unit="%"
          />
        </table>
      )}
    </div>
  );
}

export default App;
