import { apiClient } from './apiClient';

/**
 * Dashboard API Services
 * Fetches data for the procurement dashboard.
 */

export const dashboardService = {
  /**
   * Fetches the key statistics for the dashboard.
   * @returns {Promise<import('../models').DashboardStatistic[]>}
   */
  async getStats() {
    return apiClient('/dashboard/stats');
  },

  /**
   * Fetches the list of recent vendor activities.
   * @returns {Promise<import('../models').ActivityLog[]>}
   */
  async getRecentActivities() {
    return apiClient('/dashboard/activities');
  },

  /**
   * Fetches the queue of applications pending approval.
   * @returns {Promise<import('../models').ApprovalQueueItem[]>}
   */
  async getApprovalQueue() {
    return apiClient('/dashboard/queue');
  }
};
