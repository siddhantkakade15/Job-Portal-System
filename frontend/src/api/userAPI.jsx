import API from './axiosInstance';

export const getAllUsers = () => API.get('/users');
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const getAllRecruiters = () => API.get('/users/recruiters');
export const approveRecruiter = (id) => API.put(`/users/recruiters/${id}/approve`);
export const removeRecruiter = (id) => API.delete(`/users/recruiters/${id}`);
