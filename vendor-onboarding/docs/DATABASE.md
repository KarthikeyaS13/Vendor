# DATABASE DESIGN

# Nexus Vendor Onboarding Platform

Version: 1.0

---

# 1. Introduction

This document defines the complete database architecture for the Vendor Onboarding Platform.

The database is designed following enterprise application principles.

The primary goals are:

• Data Integrity

• Scalability

• Auditability

• Performance

• Maintainability

The platform is expected to support thousands of vendors and millions of uploaded documents while maintaining acceptable performance.

The database follows a relational model using MySQL.

Every business entity has its own table.

No business information should be duplicated.

Every important action should remain traceable.

Soft deletion should be preferred over permanent deletion.

Every table should include standard audit columns.

---

# 2. Database Principles

The following principles apply to every table.

Every table should have:

Primary Key

Created Date

Created By

Updated Date

Updated By

Status

Active Flag

Version Number

Soft Delete Flag (if applicable)

Every foreign key should enforce referential integrity.

Every lookup table should be configurable.

Hardcoded values should never exist inside application code.

---

# 3. Entity Relationship Overview

The primary entities are:

Users

↓

Roles

↓

Vendor Invitations

↓

Vendor Applications

↓

Vendor Company Profile

↓

Business Information

↓

Financial Information

↓

Contacts

↓

Documents

↓

Approval Workflow

↓

Audit Logs

↓

Notifications

↓

ERP Synchronization

Each module references the Vendor Application as the primary business object.

---

# 4. Users Table

Purpose

Stores internal system users.

Examples

Administrator

Procurement

Finance

Compliance

Management

Columns

id

employee_id

first_name

last_name

email

phone

password_hash

department_id

role_id

status

last_login

created_at

updated_at

Relationships

One User belongs to one Department.

One User belongs to one Role.

One User may review many Vendor Applications.

One User may create many Invitations.

---

# 5. Roles Table

Purpose

Defines application permissions.

Columns

id

role_name

role_description

created_at

updated_at

Examples

Administrator

Procurement

Finance

Compliance

Management

Auditor

Relationships

One Role has many Users.

---

# 6. Permissions Table

Purpose

Stores application permissions.

Examples

Invite Vendor

Approve Vendor

Reject Vendor

Download Documents

View Reports

Manage Users

Manage Settings

Columns

id

permission_name

module

description

Relationships

Many Roles

↓

Many Permissions

---

# 7. Departments Table

Purpose

Stores organizational departments.

Examples

Procurement

Finance

Compliance

Legal

Management

IT

Columns

id

department_name

department_code

manager_id

status

---

# 8. Vendor Invitations

Purpose

Represents invitations sent to vendors.

This table starts the onboarding process.

Columns

id

invitation_number

company_name

vendor_type

business_category

contact_person

email

phone

country

token

token_expiry

status

created_by

created_at

updated_at

Relationships

One Invitation

↓

One Vendor Application

Business Rules

Only one active invitation per email.

Expired tokens cannot be reused.

Cancelled invitations become inactive.

---

# 9. Vendor Applications

Purpose

Represents every onboarding application.

This is the central business entity.

Almost every module references this table.

Columns

id

application_number

invitation_id

current_step

completion_percentage

status

assigned_department

assigned_user

submitted_at

approved_at

rejected_at

erp_sync_status

created_at

updated_at

Relationships

One Application

↓

One Company Profile

↓

One Business Profile

↓

One Financial Profile

↓

Many Contacts

↓

Many Documents

↓

Many Approval Records

↓

Many Notifications

↓

Many Audit Logs

This table acts as the parent entity for the onboarding process.

---

# 10. Vendor Company Profile

Purpose

Stores the legal identity and primary registration details of the vendor.

Every Vendor Application has exactly one Company Profile.

This information is eventually synchronized with the ERP system after approval.

Columns

id

application_id

company_name

legal_company_name

registered_business_name

company_logo

company_website

gst_number

pan_number

cin_number

msme_number

startup_india_number

date_of_incorporation

business_type

industry

company_description

registered_address

corporate_address

factory_address

city

state

country

postal_code

latitude

longitude

status

created_at

updated_at

Relationships

Vendor Application

↓

One Company Profile

Business Rules

GST Number must be unique.

PAN Number must be unique.

Company Name is mandatory.

Legal Company Name is mandatory.

Addresses must support future multiple address expansion.

---

# 11. Vendor Business Information

Purpose

Stores operational and commercial information.

This section helps Procurement understand the vendor's business capabilities.

Columns

id

application_id

vendor_category_id

business_category_id

nature_of_business

products

services

years_in_business

employee_count

annual_turnover

annual_turnover_currency

production_capacity

operating_regions

warehouse_locations

manufacturing_locations

export_countries

major_clients

website

linkedin

status

created_at

updated_at

Relationships

Vendor Application

↓

One Business Profile

---

# 12. Vendor Financial Information

Purpose

Stores financial information required by Finance.

Columns

id

application_id

bank_name

branch_name

account_holder_name

account_number

ifsc_code

swift_code

iban

currency

payment_terms

credit_period

gst_registration_type

tax_category

tds_applicable

annual_revenue

financial_year

auditor_name

status

created_at

updated_at

Sensitive Columns

Account Number

IFSC

SWIFT

IBAN

should be encrypted before storage.

Relationships

Vendor Application

↓

One Financial Profile

---

# 13. Vendor Contacts

Purpose

Stores multiple contact persons.

One vendor may have many contacts.

Columns

id

application_id

contact_name

designation

department

email

phone

mobile

extension

preferred_contact_method

is_primary

status

created_at

updated_at

Relationships

Vendor Application

↓

Many Contacts

Business Rules

One contact must always be Primary.

Duplicate emails are not allowed.

---

# 14. Vendor Documents

Purpose

Stores metadata of uploaded documents.

Actual files are stored in cloud storage or secure file storage.

Columns

id

application_id

document_type_id

document_name

original_filename

storage_path

mime_type

file_size

version

expiry_date

verification_status

verified_by

verified_at

uploaded_by

uploaded_at

remarks

checksum

Relationships

Vendor Application

↓

Many Documents

Business Rules

Files should never be deleted.

New uploads create new versions.

Only latest approved version is active.

---

# 15. Document Types

Purpose

Defines configurable document categories.

Columns

id

document_name

description

mandatory

requires_expiry

allowed_extensions

maximum_size

status

Examples

GST Certificate

PAN Card

Cancelled Cheque

MSME Certificate

ISO Certificate

Trade License

Insurance

Factory License

Vendor Agreement

NDA

Safety Certificate

---

# 16. Approval Workflow

Purpose

Stores approval stages.

Columns

id

workflow_name

sequence

department

role

approval_required

status

Relationships

One Workflow

↓

Many Approval Records

Workflow Examples

Procurement

↓

Finance

↓

Compliance

↓

Management

---

# 17. Approval History

Purpose

Stores every approval decision.

Nothing should overwrite previous approvals.

Columns

id

application_id

workflow_stage

reviewer_id

decision

remarks

reviewed_at

previous_status

new_status

created_at

Decision Values

Approved

Rejected

Changes Requested

Escalated

Forwarded

Saved Draft

---

# 18. Reviewer Comments

Purpose

Stores conversations between reviewers and vendors.

Columns

id

application_id

parent_comment_id

comment_by

comment_for

comment

visibility

attachment

created_at

Visibility

Internal

Vendor

Both

Relationships

Application

↓

Many Comments

---

# 19. Notifications

Purpose

Stores all notifications.

Columns

id

user_id

application_id

notification_type

title

message

read_status

channel

sent_at

created_at

Channels

Portal

Email

SMS

Future Push

---

# 20. Audit Logs

Purpose

Tracks every action inside the platform.

Columns

id

application_id

user_id

action

module

previous_value

new_value

ip_address

browser

device

created_at

Audit logs should never be deleted.

Audit logs should remain immutable.

---

# 21. ERP Synchronization

Purpose

Tracks ERP integration.

Columns

id

application_id

erp_system

erp_vendor_id

sync_status

retry_count

last_attempt

last_success

error_message

created_at

Sync Status

Pending

In Progress

Completed

Failed

Retry Scheduled

---

# 22. Master Tables

The application should avoid hardcoded values.

The following should be configurable through master tables.

Countries

States

Cities

Vendor Categories

Business Categories

Departments

Roles

Permissions

Currencies

Languages

Document Types

Notification Templates

Approval Workflows

Email Templates

Questionnaire Questions

These tables should be manageable through the Admin Portal.

---

# 23. Indexing Strategy

The following fields should be indexed.

Vendor Code

Application Number

Invitation Number

GST Number

PAN Number

Email

Status

Department

Reviewer

Created Date

Submission Date

Indexes should be optimized for filtering, searching, and reporting.

---

# 24. Database Standards

Every table should include:

Primary Key

Created At

Updated At

Created By

Updated By

Status

Version Number

Soft Delete Flag (where applicable)

Every foreign key should enforce referential integrity.

Cascade deletes should be avoided for business data.

Soft deletion should be preferred.

Historical data should never be permanently removed.

Database migrations should be version controlled.

Schema changes should remain backward compatible whenever possible.