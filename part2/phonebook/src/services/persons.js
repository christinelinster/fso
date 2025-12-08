import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPeople = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)

}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (id, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response.data)
}

export default {
    getAllPeople,
    createPerson,
    deletePerson,
    updateNumber
}