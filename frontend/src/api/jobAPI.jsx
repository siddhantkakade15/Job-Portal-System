import API from './axiosInstance';

export const fetchAllJobs = (params) => API.get('/jobs', { params });
export const fetchJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (jobData) => API.post('/jobs', jobData);
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const fetchRecruiterJobs = () => API.get('/jobs/recruiter');
