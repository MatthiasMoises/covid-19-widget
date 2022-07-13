/* eslint-disable */

import axios from 'axios'
import store from './../store'

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'App-Id': process.env.VUE_APP_ID,
    'App-Key': process.env.VUE_APP_KEY
  }
})

// Handler config
const isHandlerEnabled = (config = { handlerEnabled: true }) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
    false : true
}

// Request Handlers
const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    store.dispatch('forms/setLoading', true)

    if (store.getters['forms/getSelectedLanguage']) {
      request.headers['Model'] = `infermedica-${store.getters['forms/getSelectedLanguage']}`
    }
  }
  return request
}

// Response Handlers
const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    if (error.response.status === 400) {
      store.dispatch('forms/setLoading', false)
      store.dispatch('forms/resetCurrentQuestion')
      return Promise.reject(error)
    }
  }
  return Promise.reject({ error })
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
    store.dispatch('forms/setLoading', false)
  }
  return response
}

// USe Request Handlers
axiosInstance.interceptors.request.use(
  request => requestHandler(request)
)

// Use Response Handlers
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

export default axiosInstance
