import { apiClient } from './api';
import { GraphData } from '@/types';

export const progressService = {
  async recordProgress(algorithmSlug: string, status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED', score: number = 100) {
    try {
      const response = await apiClient.post('/progress/', {
        algorithm_slug: algorithmSlug,
        status,
        score,
      });
      return response.data;
    } catch (error) {
      console.warn('API error recording progress:', error);
      return null;
    }
  },

  async saveGraph(title: string, graphData: GraphData, isDirected: boolean, description?: string) {
    try {
      const response = await apiClient.post('/graphs/', {
        title,
        description,
        graph_data: graphData,
        is_directed: isDirected,
      });
      return response.data;
    } catch (error) {
      console.warn('API error saving graph:', error);
      return null;
    }
  },

  async toggleBookmark(algorithmId: string, isBookmarked: boolean) {
    try {
      if (isBookmarked) {
        const response = await apiClient.post('/bookmarks/', { algorithm: algorithmId });
        return response.data;
      }
    } catch (error) {
      console.warn('API error toggling bookmark:', error);
      return null;
    }
  },

  async getAchievements() {
    try {
      const response = await apiClient.get('/progress/achievements/');
      return response.data;
    } catch (error) {
      return [];
    }
  },
};
