import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const getOne = (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

const addOne = (newData) =>
  axios.post(baseUrl, newData).then((res) => res.data);

const deleteOne = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const putOne = (id, newData) =>
  axios.put(`${baseUrl}/${id}`, newData).then((res) => res.data);

export default { getAll, addOne, deleteOne, putOne, getOne };
