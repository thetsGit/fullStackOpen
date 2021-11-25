import React from "react";

const Header = ({ course }) => {
  console.log(course);
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  console.log(part, exercises);
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ total_num }) => {
  console.log(total_num);
  return <p>Number of exerciese {total_num}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total_num={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

export default App;
