import toast from 'react-hot-toast';
import { getRequest, } from '../api/API_requests';

interface info {
  email: string;
  name: string;
  password: string;
}

export const emailValidation = (input: string | undefined) => {
  const check = input?.includes('@');
  return check ? '' : 'Email Must Contain @'
}

export const passwordValidation = (input: string) => {
  const regex = /^(?=.*[!@#$%^&*()_\-+=\[\]{};:\'",.<>/?])(?=.*[A-Z])(?=.*[0-9]).{8,}$/
  const check = input.match(regex)
  return check ? '' : 'Password must be at least 8 characters, include 1 number, one Capital letter, and one special character'
}

export const confirmPassword = (password: string, confirm: string) => {
  return (password === confirm) ? '' : 'Passwords Do Not Match'
}

interface Credentials {
  name: string;
  password: string;
  id: number;
  email: string;
}

export const getUserFromDb = ({ name, password, id, }: Credentials) => {
  return getRequest('users')
    .then((users) => users.find((user: info) => {
      const correctName = user.name === name;
      const correctPassword = user.password === password
      if (correctName && !correctPassword) toast.error('Wrong Password')
      if (correctPassword && !correctName) toast.error('Wrong Name')
      if (correctName && correctPassword) {
        toast.success(`Welcome ${name}`)
        return user.name === name && user.password === password
      }
    }))
}

export const checkForExistingUser = ({ name, password, email, id }: Credentials) => {
  return getRequest('users')
    .then((users) => users.find((user: info) => {
      return user.name === name && user.email === email
    }))

}
