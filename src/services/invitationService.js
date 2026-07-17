import { apiClient } from './apiClient';

export const invitationService = {
  getInvitations: () => apiClient('/invitations'),
  createInvitation: (data) => apiClient('/invitations', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  validateToken: (token) => apiClient(`/invitations/${token}`),
  submitRegistration: (token, data) => apiClient(`/vendor/register/${token}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
};
