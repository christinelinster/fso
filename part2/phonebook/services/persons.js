import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updatePerson = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, newNumber).then(response => response.data)
}

export default {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
}