import API from './axiosInstance';

export const applyForJob = (jobId) => API.post(`/apply/${jobId}`);
export const getUserApplications = () => API.get('/applications/user');
export const getJobApplicants = (jobId) => API.get(`/apply/job/${jobId}`);
export const updateApplicationStatus = (id, status) => API.put(`/apply/${id}`, { status });
