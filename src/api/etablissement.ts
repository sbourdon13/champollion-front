import api from "./config"
import { AxiosError } from "axios"
import {
  EtablissementInfo,
  EtablissementType,
  EtablissementPostesList,
  ResponseError,
} from "./types"

export const getEtablissementType = async (input: string) => {
  try {
    const response = await api.get(`/get-etablissement-type?siret=${input}`)
    return response.data?.data as EtablissementType
  } catch (err) {
    let status
    if (err instanceof AxiosError) status = err?.request?.status
    let message = String(err)
    if (err instanceof AxiosError && status && String(status).startsWith("4")) {
      message = err?.response?.data[0]?.message
    }
    return Promise.reject({
      status,
      message,
    } as ResponseError)
  }
}

export const getEtablissementInfo = async (id: string | number) => {
  try {
    const response = await api.get(`/get-etablissement-infos?etablissement_id=${id}`)
    return response.data?.data as EtablissementInfo
  } catch (err) {
    let status
    if (err instanceof AxiosError) status = err?.request?.status
    let message = String(err)
    if (err instanceof AxiosError && status && String(status).startsWith("4")) {
      message = err?.response?.data[0]?.message
    }
    return Promise.reject({
      status,
      message,
    } as ResponseError)
  }
}

export const getEtablissementPostesList = async (id: number) => {
  try {
    const response = await api.get(
      `/get-etablissement-postes-list?etablissement_id=${id}`
    )
    return response.data?.data as EtablissementPostesList
  } catch (err) {
    let status
    if (err instanceof AxiosError) status = err?.request?.status
    let message = String(err)
    if (err instanceof AxiosError && status && String(status).startsWith("4")) {
      message = err?.response?.data[0]?.message
    }
    return Promise.reject({
      status,
      message,
    } as ResponseError)
  }
}
