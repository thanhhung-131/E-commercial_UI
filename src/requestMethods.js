import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/'
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTMyNTc5ZDFkODY3Y2RhNzI4MmFiMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NTg4OTg4NCwiZXhwIjoxNjk2MTQ5MDg0fQ.4VIJ1jhNDpGmV4tTgyyfrWCyunjc0mR0CSlrqHbPGAk'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})