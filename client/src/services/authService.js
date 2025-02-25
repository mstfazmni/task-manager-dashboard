import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
        return axios.post(`${API_URL}/login`, userData);
};

export const fetchUserProfile = async (token) => {
    return axios.get('http://localhost:5000/api/user/profile', {
        headers: { 'x-auth-token': token }
    });
};