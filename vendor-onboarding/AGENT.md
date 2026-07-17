# AGENT.md

# AI Development Instructions

Version 1.0

---

# Introduction

This document defines how AI coding assistants should contribute to the Vendor Onboarding Platform.

This repository contains an enterprise procurement application.

It is not a demo project.

It is not a CRUD application.

It is not a collection of forms.

It is an enterprise Vendor Lifecycle Management Platform.

Before generating any code, the AI assistant must understand the business domain.

The AI assistant should prioritize business requirements over implementation convenience.

If documentation conflicts with existing code, the documentation should be treated as the source of truth unless explicitly instructed otherwise.

---

# Documents To Read

Before making ANY code changes, always read these files in the following order.

1. PRODUCT_SPEC.md

2. BUSINESS_RULES.md

3. DATABASE.md

4. WORKFLOW.md

5. API_SPEC.md

6. UI_GUIDELINES.md

7. PROJECT_VISION.md

8. README.md

Do not begin implementation until these documents have been understood.

---

# Product Understanding

The application is an invitation-based Vendor Onboarding Platform.

Internal users invite vendors.

Vendors never self-register.

The onboarding process begins with an invitation.

The registration wizard is only one module of the product.

The complete lifecycle is:

Invitation

↓

Registration

↓

Submission

↓

Procurement Review

↓

Finance Review

↓

Compliance Review

↓

Management Approval

↓

ERP Synchronization

↓

Vendor Activated

Every feature should support this lifecycle.

---

# Primary Objective

Build an enterprise procurement platform.

Do not build isolated CRUD pages.

Every screen should contribute to moving vendors through the onboarding workflow.

---

# Design Principles

The interface should feel like:

Stripe Dashboard

Odoo

Linear

Microsoft Dynamics

SAP Ariba

Oracle Fusion

Use modern SaaS design.

Avoid outdated enterprise interfaces.

Avoid unnecessary visual complexity.

---

# Coding Standards

Always write production-quality code.

Never duplicate logic.

Prefer reusable components.

Separate UI from business logic.

Separate API services from UI.

Separate database logic from API controllers.

Avoid large components.

Avoid deeply nested components.

Prefer composition over duplication.

Use meaningful naming.

Never hardcode values.

Never hardcode statuses.

Never hardcode dropdown values.

Everything configurable belongs in the database.

---

# Frontend Standards

Technology

React

Vite

Tailwind CSS

React Router

React Hook Form

Zod

Framer Motion

Lucide React

TanStack Table

Axios

Recharts

Every page must be responsive.

Every page must support:

Loading

Empty

Success

Error

Permission Denied

States.

---

# Backend Standards

Technology

Node.js

Express

MySQL

JWT

REST API

Business rules belong in services.

Controllers should remain lightweight.

Routes should only perform routing.

Validation belongs before business logic.

Database operations belong inside repositories/services.

---

# Database Standards

Never create duplicate tables.

Always reuse existing entities.

Every business entity must reference the Product Specification.

Use foreign keys.

Use indexes.

Soft delete wherever appropriate.

Audit everything.

---

# API Standards

Every endpoint should

Authenticate

Authorize

Validate

Execute Business Rules

Return Standard Response

Generate Audit Log

Return Proper Status Code

Never expose internal exceptions.

---

# UI Standards

Follow UI_GUIDELINES.md exactly.

Never redesign pages independently.

Reuse existing components.

Use consistent spacing.

Use enterprise layouts.

Keep tables consistent.

Keep cards consistent.

Keep forms consistent.

---

# Workflow Standards

Never skip workflow stages.

Never bypass approvals.

Never invent statuses.

Always use documented status transitions.

Every action should create an audit log.

Every approval should create history.

Every rejection requires remarks.

---

# File Upload Standards

Uploaded documents should:

Validate type.

Validate size.

Generate checksum.

Store metadata.

Create version history.

Never overwrite previous versions.

---

# ERP Standards

ERP synchronization begins only after final approval.

Never synchronize incomplete vendors.

Retry synchronization automatically.

Log every synchronization attempt.

Never create duplicate ERP records.

---

# Error Handling

Every API should return meaningful errors.

Frontend should display friendly messages.

Never expose stack traces.

Log every unexpected error.

---

# Performance Standards

Lazy load pages.

Paginate tables.

Optimize API calls.

Avoid unnecessary re-renders.

Use caching where appropriate.

Keep dashboard responsive.

---

# Security Standards

JWT Authentication

Role Based Access Control

Encrypted Sensitive Data

Protected File Downloads

Permission Validation

Rate Limiting

Secure File Uploads

Audit Logs

---

# Before Implementing Any Feature

The AI assistant must ask internally:

What business problem does this solve?

Which workflow does it belong to?

Which database tables are affected?

Which APIs are affected?

Which user roles are affected?

Which audit logs should be generated?

Which notifications should be sent?

Which permissions are required?

Only after answering these questions should implementation begin.

---

# Implementation Strategy

Implement one feature at a time.

Complete the feature fully.

Update documentation if architecture changes.

Do not partially implement workflows.

Do not leave TODO placeholders unless explicitly requested.

---

# Existing Architecture

The application currently consists of:

Admin Portal

Vendor Portal

Invitation System

Registration Wizard

Approval Workflow

Document Management

Reporting

Notifications

Audit Logs

ERP Synchronization

Future modules should integrate into this architecture.

---

# Long-Term Goal

Build an enterprise-grade Vendor Lifecycle Management Platform that can support thousands of vendors, multiple organizations, configurable approval workflows, ERP integrations, reporting, compliance management, and future procurement modules without requiring major architectural changes.

Every decision made by the AI assistant should move the project toward this goal.