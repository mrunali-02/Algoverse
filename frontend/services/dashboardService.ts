import { apiClient } from './api';

export const dashboardService = {
  async getDashboardSummary() {
    try {
      const response = await apiClient.get('/progress/');
      return response.data;
    } catch (error) {
      console.warn('Backend API offline, using fallback dashboard stats', error);
      return {
        completedCount: 1,
        inProgressCount: 1,
        totalQuizzesTaken: 5,
        accuracyRate: 90,
      };
    }
  },

  async getBookmarks() {
    try {
      const response = await apiClient.get('/bookmarks/');
      return response.data;
    } catch (error) {
      return [];
    }
  },
};
