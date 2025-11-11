const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    const messageClass = message.type === 'error' ? 'error' : 'success'

    return (
        <div className={`message ${messageClass}`}>
            {message.text}
        </div>
    )
}

export default Notification