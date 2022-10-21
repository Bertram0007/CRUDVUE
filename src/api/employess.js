import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/employee'

export const create = (data) => {
  return axios({
    method: 'POST',
    url: '/add',
    data
  });
};

export const list = (options) => {
  console.log(options)
  return axios({
    method: 'post',
    url:'/list',
    data:options
  });
};

export const getDataById = (id) => {
  return axios({
    method: 'GET',
    url: `/api/v1/employee/${id}`
  });
};

export const update = ( data) => {
  return axios({
    method: 'post',
    url: `/update`,
    data
  });
};

export const deleteById = (ids) => {
  return axios({
    method: 'post',
    url: `/remove`,
    data:ids
  });
};