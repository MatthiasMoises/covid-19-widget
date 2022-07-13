/* eslint-disable */

import { axiosInstance } from '@/services/Api'

const infoEndpoint = 'info'
const diagnosisEndpoint = 'diagnosis'
const triageEndpoint = 'triage'
// const searchEndpoint = 'search'
// const symptomsEndpoint = 'symptoms'
// const riskFactorsEndpoint = 'risk_factors'

export default {

  async selectModel () {
    const response = await axiosInstance.get(infoEndpoint)
    return response
  },

  async diagnosis (answers) {
    const reponse = await axiosInstance.post(diagnosisEndpoint, {
      sex: answers.sex,
      age: answers.age,
      evidence: answers.evidence
    })
    return reponse
  },

  async triage (answers) {
    const response = await axiosInstance.post(triageEndpoint, {
      sex: answers.sex,
      age: answers.age,
      evidence: answers.evidence
    })
    return response
  }

}
