import API from './api';

export const uploadImage = async (file) => {
  if (!file) return '';

  const formData = new FormData();
  formData.append('file', file);

  const response = await API.post('/upload', formData);

  return response?.data?.url || response?.data?.imageUrl || '';
};