

const Persons = ({ persons, onDeletePerson }) => {


  return (
    <div>
      {
        persons.map(person =>
          <p key={person.name}>
            {person.name} {person.number}
            <button value={person.name} onClick={() => onDeletePerson(person)}>delete</button>
          </p>
        )
      }

    </div>

  )
}

export default Persons