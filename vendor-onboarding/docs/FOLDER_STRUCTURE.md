# FOLDER STRUCTURE

# Nexus Vendor Onboarding Platform

Version 1.0

---

# Introduction

This document defines the complete project structure for the Vendor Onboarding Platform.

Every developer and AI coding assistant should follow this structure.

Files should never be placed in arbitrary locations.

Every module should follow the same architecture.

The application should remain scalable as additional procurement modules are introduced.

The project follows Feature-Based Architecture combined with Shared Component Architecture.

Business modules remain isolated while reusable components remain centralized.

---

# Root Structure

src/

app/

assets/

components/

config/

constants/

contexts/

features/

hooks/

layouts/

pages/

routes/

services/

stores/

styles/

types/

utils/

Each folder has a specific responsibility.

---

# app/

Contains application initialization.

Examples

App.tsx

Providers

Theme

Authentication Bootstrap

Global Error Boundary

Application Configuration

This folder should not contain business features.

---

# assets/

Contains static resources.

logos/

images/

illustrations/

icons/

fonts/

animations/

Files inside assets should never contain business logic.

---

# components/

Contains reusable UI components.

Examples

Button

Card

Input

Modal

Drawer

Avatar

Badge

Table

Search

Pagination

Status Chip

Timeline

Stepper

Breadcrumb

Skeleton Loader

Empty State

Error State

Components inside this folder should never know anything about Vendors or Procurement.

They are generic.

---

# config/

Contains application configuration.

API URL

Environment

Theme

Feature Flags

Application Constants

---

# constants/

Contains reusable constants.

Examples

Application Status

Vendor Status

Approval Status

Document Status

Permission Names

Role Names

Notification Types

Never hardcode these values inside components.

---

# contexts/

Contains React Context Providers.

Examples

Authentication

Theme

Notification

Permission

Language

---

# features/

This is the heart of the application.

Every business module gets its own folder.

Example

features/

authentication/

dashboard/

vendor-invitations/

vendor-applications/

company-profile/

business-profile/

financial-profile/

contacts/

documents/

approvals/

notifications/

reports/

settings/

users/

audit/

erp/

Each feature contains:

components/

pages/

services/

hooks/

types/

validation/

Feature modules should remain isolated.

---

# hooks/

Reusable React hooks.

Examples

useApi

useDebounce

usePagination

usePermissions

useNotifications

useFileUpload

Hooks should never depend on business modules.

---

# layouts/

Application layouts.

Examples

Admin Layout

Vendor Layout

Authentication Layout

Error Layout

Every page should reuse layouts.

---

# pages/

Contains page entry points only.

Pages should remain lightweight.

Business logic belongs inside feature modules.

---

# routes/

Contains routing configuration.

Admin Routes

Vendor Routes

Protected Routes

Public Routes

Role Based Routes

---

# services/

Contains API communication.

Examples

Authentication Service

Invitation Service

Vendor Service

Approval Service

ERP Service

Notification Service

Report Service

Audit Service

Every API call should originate here.

Never call APIs directly from components.

---

# stores/

Contains state management.

Examples

Authentication Store

Dashboard Store

Vendor Store

Notification Store

Settings Store

Keep state modular.

---

# styles/

Contains global styling.

Tailwind Extensions

Theme Variables

Global Styles

Typography

Spacing

---

# types/

Contains shared TypeScript types.

Examples

User

Vendor

Invitation

Document

Approval

Notification

Report

Audit

ERP

Avoid duplicate interfaces.

---

# utils/

Contains utility functions.

Examples

Date Formatting

Currency Formatting

GST Validation

PAN Validation

Phone Formatting

File Validation

Token Helpers

Permission Helpers

Utilities should remain framework independent.

---

# Feature Folder Example

features/

vendor-applications/

components/

pages/

hooks/

services/

types/

validation/

constants/

Every feature follows the same structure.

---

# Naming Convention

Folders

kebab-case

Files

PascalCase for Components

camelCase for Hooks

Services

InvitationService.ts

VendorService.ts

ApprovalService.ts

Hooks

useInvitation.ts

useDashboard.ts

useVendor.ts

Components

VendorTable.tsx

InvitationModal.tsx

ApprovalTimeline.tsx

Types

Vendor.ts

Invitation.ts

Approval.ts

Validation

vendorSchema.ts

financialSchema.ts

documentSchema.ts

---

# Import Rules

Feature modules should not directly import from other feature modules.

Shared functionality should move into:

components/

hooks/

utils/

services/

types/

This prevents circular dependencies.

---

# Architecture Philosophy

The project follows modular architecture.

Every module should be independently maintainable.

Every component should have one responsibility.

Business logic should remain separate from presentation.

The structure should support future procurement modules without requiring major reorganization.

This document defines the official folder organization for the Vendor Onboarding Platform.

Every future feature should integrate into this structure.