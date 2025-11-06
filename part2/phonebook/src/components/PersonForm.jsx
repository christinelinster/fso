const PersonForm = ({newName, newNumber, onAddName, onNameChange, onNumberChange}) => {
    return (
        <div>
            <form onSubmit={onAddName}>
                <p>name:<input value={newName} onChange={onNameChange} /></p>
                <p>number:<input value={newNumber} onChange={onNumberChange} /></p>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm