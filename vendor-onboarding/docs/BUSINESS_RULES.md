# BUSINESS RULES

# Nexus Vendor Onboarding Platform

Version: 1.0

---

# 1. Introduction

This document defines every business rule governing the Vendor Onboarding Platform.

Business rules describe how the application should behave under different conditions.

These rules are independent of programming language, framework, database, or UI implementation.

Every frontend screen, backend API, database operation, and approval workflow must follow these rules.

If application behavior conflicts with these business rules, these rules take precedence.

The objective of these rules is to ensure consistent business behavior across all modules.

---

# 2. Vendor Invitation Rules

The onboarding process always starts with an invitation.

Public registration is not permitted.

Only authorized Procurement users can create vendor invitations.

Every invitation must contain:

- Company Name
- Vendor Type
- Contact Person
- Email Address

The email address is mandatory.

A secure invitation token must be generated.

Tokens must be unique.

Tokens must not be predictable.

Tokens must expire automatically.

Invitation expiry duration should be configurable.

Default expiry is seven days.

Only active invitations may be opened.

Expired invitations cannot be reused.

Cancelled invitations cannot be reused.

Every invitation can be resent.

Resending an invitation invalidates the previous token.

Only one active invitation may exist for a vendor email.

Duplicate active invitations are not allowed.

---

# 3. Vendor Registration Rules

Vendors cannot create accounts independently.

Registration begins only through a valid invitation.

Registration progress should be saved automatically.

The vendor may exit the application and continue later.

Mandatory fields must be completed before moving to the next step.

The vendor cannot submit the application until every required section is complete.

The vendor cannot skip mandatory steps.

Each step should validate independently.

The application should calculate completion percentage automatically.

Once submitted:

The application becomes read-only.

The vendor cannot edit information unless changes are requested.

---

# 4. Company Information Rules

Company Name is mandatory.

Legal Company Name is mandatory.

GST Number is mandatory for Indian vendors.

PAN Number is mandatory for Indian vendors.

Company Website is optional.

Company Logo is optional.

Registered Address is mandatory.

Country is mandatory.

State is mandatory.

City is mandatory.

Postal Code is mandatory.

GST format must be validated.

PAN format must be validated.

Duplicate GST numbers are not allowed.

Duplicate PAN numbers are not allowed.

A single GST cannot belong to multiple active vendors.

---

# 5. Business Information Rules

Business Category is mandatory.

Vendor Category is mandatory.

Nature of Business is mandatory.

Years In Business must be positive.

Employee Count cannot be negative.

Annual Turnover cannot be negative.

Vendor Categories should be configurable.

Business Categories should be configurable.

Industry classifications should be configurable.

---

# 6. Financial Rules

Bank Name is mandatory.

Account Number is mandatory.

IFSC Code is mandatory for Indian bank accounts.

Account Holder Name is mandatory.

Cancelled Cheque upload is mandatory.

Payment Terms are mandatory.

Sensitive financial information should be encrypted.

Finance reviewers cannot modify vendor-entered financial data.

Finance reviewers may only approve, reject, or request updates.

---

# 7. Contact Person Rules

Every vendor must have at least one contact person.

Exactly one contact must be marked as Primary Contact.

Primary Contact cannot be deleted unless another contact becomes Primary.

Duplicate email addresses are not allowed within the same vendor.

Phone numbers should follow country-specific validation.

---

# 8. Document Management Rules

Documents are considered business assets.

Every uploaded document must have its own lifecycle.

Documents cannot be permanently deleted.

Every uploaded document should maintain version history.

Uploading a new version should not overwrite the previous version.

Every document belongs to exactly one document type.

Examples include:

GST Certificate

PAN Card

Certificate of Incorporation

Cancelled Cheque

MSME Certificate

ISO Certificate

Trade License

Insurance

Vendor Agreement

NDA

Safety Certificate

Additional Supporting Documents

Every document records:

Document ID

Vendor ID

Document Type

File Name

Version

Uploaded By

Uploaded Date

Expiry Date

Verification Status

Verified By

Verification Date

Reviewer Comments

Storage Location

Checksum

Document Status may be:

Pending

Uploaded

Verified

Rejected

Expired

Needs Replacement

Archived

Mandatory documents must be uploaded before submission.

Optional documents may be uploaded later.

Expired documents cannot be verified.

Rejected documents require reviewer remarks.

Only the latest approved version should be considered active.

All previous versions remain accessible in document history.

Maximum upload size should be configurable.

Supported file types should be configurable.

Executable files are never permitted.

Files should be virus scanned before storage.

---

# 9. Approval Workflow Rules

Every submitted application enters the approval workflow.

Applications cannot skip approval stages.

Each stage must be completed before the next stage begins.

Only authorized reviewers may approve applications.

Reviewers can only act on applications assigned to them unless they have override permissions.

Every approval requires remarks.

Every rejection requires remarks.

Every "Request Changes" action requires remarks.

Applications cannot be approved if mandatory documents remain unverified.

Applications cannot be approved if mandatory information is missing.

Applications cannot be approved while required documents are expired.

Applications should automatically move to the next workflow stage after approval.

Rejected applications stop progressing until vendor corrections are submitted.

---

# 10. Status Transition Rules

Applications move through predefined states.

Allowed transitions include:

Invitation Created

↓

Invitation Sent

↓

Invitation Opened

↓

Registration Started

↓

Draft

↓

Submitted

↓

Procurement Review

↓

Finance Review

↓

Compliance Review

↓

Management Approval

↓

Approved

↓

ERP Synchronization

↓

Vendor Activated

Rejected applications may move to:

Changes Requested

↓

Vendor Updates

↓

Resubmitted

↓

Back To Review

Applications cannot skip workflow stages.

Status changes should only occur through business actions.

Status changes cannot be manually edited from the database.

Every transition creates an audit record.

---

# 11. Notification Rules

Notifications inform users about business events.

Every important action should generate a notification.

Examples include:

Invitation Sent

Invitation Expired

Invitation Accepted

Registration Started

Draft Saved

Application Submitted

Documents Uploaded

Comments Added

Changes Requested

Application Approved

Application Rejected

ERP Synchronization Completed

Notifications should support:

Portal Notification

Email

SMS (Optional)

Future Push Notifications

Notification templates should be configurable.

Notifications should support localization in future versions.

---

# 12. Vendor Rules

Each vendor has a unique identity.

Duplicate vendors are not allowed.

Vendor uniqueness should be validated using:

GST Number

PAN Number

Legal Company Name

Country

Email Address

If a duplicate is detected, Procurement should be notified.

Vendor Codes are generated only after final approval.

Vendor Codes should follow configurable numbering formats.

Example:

VEN000001

VEN000002

VEN000003

Vendor Codes should never be reused.

Deleted vendor codes remain reserved.

---

# 13. Dashboard Rules

The dashboard displays operational information only.

Dashboard data should never be hardcoded.

Widgets should retrieve information from backend APIs.

If data is unavailable:

Display Empty State.

If API is loading:

Display Skeleton Loader.

If API fails:

Display Error State.

Dashboard statistics should update automatically after business events.

Dashboard filters should affect every widget consistently.

---

# 14. Search Rules

Search should work across all major modules.

Search should support:

Company Name

Vendor Code

GST

PAN

Contact Person

Email

Phone

Application Number

Invitation Number

Business Category

Status

Reviewer

Search should ignore case.

Partial matches should be supported.

Results should return within acceptable performance limits.

Advanced filters should be combinable.

Saved searches should be supported in future versions.

---

# 15. Reporting Rules

Reports should always use live database information.

Reports must respect user permissions.

Users should only see reports they are authorized to access.

Supported export formats:

PDF

Excel

CSV

Reports should support:

Date Range

Department

Country

Vendor Category

Reviewer

Application Status

Scheduled report generation should be supported in future versions.

---

# 16. Audit Rules

Every business action creates an audit entry.

Audit logs cannot be modified.

Audit logs cannot be deleted.

Audit logs should include:

Timestamp

User

Role

Department

Action

Previous Value

New Value

IP Address

Browser

Device

Session

Audit logs should remain searchable.

Audit logs should remain exportable.

Audit logs should be retained according to organizational retention policies.

---

# 17. Security Rules

Every API requires authentication unless explicitly public.

Role-based authorization is mandatory.

Passwords must never be stored in plain text.

Sensitive information should be encrypted.

JWT tokens should expire.

Refresh tokens should be revocable.

Invitation tokens should expire automatically.

Files should never be publicly accessible.

Every uploaded document requires authorization before download.

Repeated failed login attempts should temporarily lock the account.

Sensitive business information should never be exposed through client-side code.

---

# 18. ERP Synchronization Rules

ERP synchronization begins only after final approval.

Only approved vendors are synchronized.

Synchronization includes:

Vendor

Addresses

Contacts

Bank Accounts

Payment Terms

Tax Information

Attachments

Categories

If synchronization fails:

Vendor Status remains Approved.

Sync Status becomes Pending Retry.

Automatic retry should occur.

Manual retry should be available.

Every synchronization attempt creates a synchronization log.

Synchronization should never create duplicate vendors inside ERP.

---

# 19. General System Rules

The application should always prioritize data integrity over convenience.

Every business action should be reversible where appropriate.

Nothing should disappear without traceability.

Every screen should support loading, success, empty, and error states.

Every form should support validation.

Every workflow should be configurable.

Business logic should never be hardcoded into UI components.

The system should remain scalable, maintainable, secure, and enterprise-ready.