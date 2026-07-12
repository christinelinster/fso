import axios from 'axios'

const baseUrl = '/api/persons'

const getPersons = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updatePerson = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

export default {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
}