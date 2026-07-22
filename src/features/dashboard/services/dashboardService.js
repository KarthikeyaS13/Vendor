import { apiClient } from '../../../services/apiClient';

/**
 * Dashboard API Services
 * Fetches data for the procurement dashboard.
 */

export const dashboardService = {
  /**
   * Fetches the key statistics for the dashboard.
   * @returns {Promise<import('../../../types').DashboardStatistic[]>}
   */
  async getStats() {
    return apiClient('/dashboard/stats');
  },

  /**
   * Fetches the list of recent vendor activities.
   * @returns {Promise<import('../../../types').ActivityLog[]>}
   */
  async getRecentActivities() {
    return apiClient('/dashboard/activities');
  },

  /**
   * Fetches the queue of applications pending approval.
   * @returns {Promise<import('../../../types').ApprovalQueueItem[]>}
   */
  async getApprovalQueue() {
    return apiClient('/dashboard/queue');
  },

  /**
   * Fetches high-level system metrics (POs, Invoices, Payments).
   */
  async getSystemMetrics() {
    return apiClient('/dashboard/system-metrics');
  }
};
