import React, { useState } from "react";
import "./App.css";

const Header = ({ text }) => <h1>{text}</h1>;
const Content = ({ text, vote }) => (
  <>
    <h3>
      <i>{text}</i>
    </h3>
    <p>
      Voted <strong>{vote}</strong> times
    </p>
  </>
);
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

function App() {
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
  });
  const [randomNum, setRandomNum] = useState(0);
  const largestVote = Math.max(...Object.values(votes));
  console.log(largestVote);
  const mostVoted = Number(
    Object.keys(votes).filter((voteKey) => votes[voteKey] == largestVote)[0]
  );
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "If you think your management doesn’t know what it’s doing or that your organisation turns out low-quality software crap that embarrasses you, then leave.",
    "Before software can be reusable it first has to be usable.",
    "Design and programming are human activities; forget that and all is lost.",
    "It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.",
    "Real programmers can write assembly code in any language.",
    "Premature optimization is the root of all evil in programming.",
  ];
  const voteHandler = (randomNum) => {
    var newVotes = { ...votes };
    newVotes[randomNum] += 1;
    setVotes(newVotes);
    console.log(votes);
  };
  const nextHandler = () => {
    var rand = Math.floor(Math.random() * (anecdotes.length - 1));
    setRandomNum(rand);
    console.log(randomNum);
  };

  return (
    <div className="containerWrap">
      <div className="container">
        <Header text="Anecdote of the day" />
        <Content text={anecdotes[randomNum]} vote={votes[randomNum]} />
        <div className="buttonsWrap">
          <Button onClick={() => voteHandler(randomNum)} text="vote" />
          <Button onClick={() => nextHandler()} text="next anecdote" />
        </div>
        <Header text="Anecdote with most votes" />
        <Content text={anecdotes[mostVoted]} vote={largestVote} />
      </div>
    </div>
  );
}

export default App;
