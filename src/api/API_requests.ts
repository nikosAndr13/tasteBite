import { baseurl, } from "./API_CONFIG"
import { toast } from 'react-hot-toast'

const user = localStorage.getItem('user')
let token: string;
if (user) {
  const parsedUser = JSON.parse(user);
  token = parsedUser.token
}

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
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

export const patchRequest = (endpoint: string, bodyObj: object) => {
  const body = JSON.stringify(bodyObj)
  return fetch(`${baseurl}${endpoint}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body,
  })

}

export const delete_request = (endpoint: string) => {
  return fetch(`${baseurl}${endpoint}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
