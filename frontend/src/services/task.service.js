import { taskSchema } from '../utils/validations/task.schema';
import apiClient from './api.client';

const baseUrl = '/tasks';

export const fetchTasks = async (query) => {
  try {
    const response = await apiClient.get(baseUrl+query);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    taskSchema.parse(taskData);
    const response = await apiClient.post(baseUrl, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    taskSchema.parse(taskData);

    const response = await apiClient.put(`${baseUrl}/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await apiClient.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
