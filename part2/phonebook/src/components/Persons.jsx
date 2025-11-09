const Persons = ({ persons, onDelete }) => {
    console.log('Persons.jsx', persons)

    return (
        <div>
            {persons.map(person =>
                <p key={person.name}>{person.name} {person.number}
                    <button onClick={() => onDelete(person.id)}>delete</button>
                </p>)}
        </div>
    )
}

export default Persons