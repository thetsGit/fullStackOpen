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

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </>
);

export default Course;
