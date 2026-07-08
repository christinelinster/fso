const Header = ({course}) => <h3>{course}</h3>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ total }) => <strong><p>total of {total} exercises</p></strong>

const Course = ({ course }) => {

  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0)

  return (<div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total total={total} />
  </div>)

}

export default Course