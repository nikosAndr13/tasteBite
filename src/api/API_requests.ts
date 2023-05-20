import { baseurl, } from "./API_CONFIG"
import { toast } from 'react-hot-toast'

export const getRequest = (endpoint: string): Promise<[]> => {
  return fetch(`${baseurl}${endpoint}`).then(res => {
    if (!res.ok) {
      toast.error(`Could not reach ${endpoint}`);
    }
    return res.json();
  })
}

export type Recipe = {
  title: string,
  category: string,
  userid: number | undefined,
  username: string | undefined,
  description: string,
  ingredients: string,
  directions: string,
  imageUrl: string,
}

export const postRequest = (endpoint: string, bodyObj: object) => {
  const body = JSON.stringify(bodyObj)

  return fetch(`${baseurl}${endpoint}`, {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body,
  })
}

export const patchRequest = (endpoint: string, bodyObj: object) => {
  const body = JSON.stringify(bodyObj)

  return fetch(`${baseurl}${endpoint}`, {
    method: 'PATCH',
    headers: { "Content-Type": 'application/json' },
    body,
  })

}

export const delete_request = (endpoint: string, id: string) => {
  return fetch(`${baseurl}${endpoint}/${id}`, { method: 'DELETE' })
}
