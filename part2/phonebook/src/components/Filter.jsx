const Filter = ({ onSearch }) => {
    return (
        <div>
            filter shown with <input onChange={onSearch} type="text" />
        </div>
    )
}

export default Filter