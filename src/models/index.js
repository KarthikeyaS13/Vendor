/**
 * @typedef {Object} DashboardStatistic
 * @property {string} name - The label for the statistic (e.g., "Pending Approvals").
 * @property {string|number} value - The numeric value to display.
 * @property {string} icon - The name of the icon to render.
 * @property {string} color - The text color class for the icon.
 * @property {string} bg - The background color class for the icon container.
 */

/**
 * @typedef {Object} VendorInvitation
 * @property {string} id - Unique identifier for the invitation.
 * @property {string} email - The invited vendor's email address.
 * @property {string} status - Current status (e.g., "Sent", "Opened", "Completed").
 * @property {string} sentAt - ISO date string of when it was sent.
 */

/**
 * @typedef {Object} VendorApplication
 * @property {string} id - Unique identifier for the application (e.g., "APP-1042").
 * @property {string} vendorName - The name of the vendor company.
 * @property {string} category - The business category (e.g., "Transportation").
 * @property {string} status - Current status of the application (e.g., "Pending Review").
 * @property {string} submittedAt - Formatted date string or ISO date of submission.
 */

/**
 * @typedef {Object} ApprovalQueueItem
 * @property {string} id - Application ID.
 * @property {string} name - Vendor Name.
 * @property {string} category - Vendor Category.
 * @property {string} status - Current Status.
 * @property {string} submitted - Formatted submission date.
 */

/**
 * @typedef {Object} ActivityLog
 * @property {string} id - Unique identifier for the activity log.
 * @property {string} text - Description of the activity.
 * @property {string} time - Human readable time elapsed (e.g., "2 hours ago").
 * @property {string} [timestamp] - ISO date string.
 */

/**
 * @typedef {Object} Notification
 * @property {string} id - Unique identifier.
 * @property {string} title - Notification title.
 * @property {string} message - Notification message body.
 * @property {boolean} isRead - Whether the notification has been read.
 * @property {string} createdAt - ISO date string.
 */

export default {};
