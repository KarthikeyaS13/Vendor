# UI GUIDELINES

# Nexus Vendor Onboarding Platform

Version 1.0

---

# Introduction

This document defines the complete user interface and user experience standards for the Vendor Onboarding Platform.

Every page, component, animation, spacing, color, icon, typography, and interaction should follow these guidelines.

The objective is to create a modern enterprise SaaS application that feels comparable to Stripe Dashboard, Linear, Odoo, Atlassian, Notion, Vercel Dashboard, and Microsoft Dynamics while maintaining its own clean identity.

The interface should prioritize clarity, usability, accessibility, and productivity over visual decoration.

Users should immediately understand what actions are required without confusion.

The UI should reduce cognitive load while presenting large amounts of enterprise data.

---

# Design Philosophy

The platform is an enterprise business application.

It is not a marketing website.

It is not an e-commerce website.

It is not a social media platform.

The interface should feel:

Professional

Minimal

Organized

Predictable

Fast

Responsive

Modern

Scalable

Information Dense without appearing cluttered.

Every screen should have a clear purpose.

Every action should be intentional.

---

# Design Inspiration

The UI should combine ideas from:

Stripe Dashboard

Linear

Odoo

Atlassian Jira

GitHub

Notion

Microsoft Dynamics

Oracle Fusion

SAP Fiori

The goal is to build something cleaner and more modern than Odoo while keeping enterprise usability.

---

# Color System

Primary

Blue

Used for:

Primary Buttons

Active Navigation

Links

Selected Tabs

Progress

Secondary

Gray

Used for:

Borders

Backgrounds

Cards

Tables

Inputs

Success

Green

Approval

Completed

Verified

Activated

Warning

Amber

Pending

Review

Attention Required

Information

Error

Red

Rejected

Expired

Validation Errors

Dangerous Actions

Backgrounds

Pure White

Light Gray

Soft Neutral Surfaces

Avoid colorful gradients.

Avoid neon colors.

Avoid glassmorphism.

---

# Typography

Use a clean sans-serif font.

Recommended

Inter

Font hierarchy

Page Title

Section Heading

Card Heading

Body

Caption

Buttons should use medium weight.

Paragraphs should remain readable.

Avoid decorative typography.

---

# Layout

Desktop First

Responsive

12 Column Grid

Maximum Content Width

Sidebar Width

Collapsed Sidebar Support

Sticky Header

Scrollable Content Area

Consistent spacing between every section.

Large pages should be divided into meaningful content blocks.

---

# Navigation

Desktop

Left Sidebar

Top Navigation

Mobile

Drawer Navigation

Bottom actions only where appropriate.

The sidebar should contain:

Dashboard

Vendor Invitations

Vendor Applications

Documents

Reports

Users

Settings

The active navigation should always be visually obvious.

---

# Cards

Every information block should be displayed using cards.

Cards should have:

Rounded Corners

Soft Shadow

Consistent Padding

Clear Titles

Action Area

Cards should never appear crowded.

Cards should align perfectly inside the grid.

---

# Tables

Enterprise applications rely heavily on tables.

Every table should support:

Sorting

Searching

Filtering

Pagination

Column Selection

Sticky Header

Row Selection

Bulk Actions

Export

Hover States

Loading State

Empty State

Responsive Collapse

Tables should never display horizontal scrolling unless absolutely necessary.

---

# Forms

Forms should be divided into logical sections.

Every input should contain:

Label

Placeholder

Validation

Helper Text

Required Indicator

Error Message

Autocomplete where appropriate.

The user should never guess what is expected.

---

# Buttons

Primary

Save

Submit

Approve

Send Invitation

Secondary

Cancel

Back

Reset

Outline

View

Preview

Download

Danger

Delete

Reject

Archive

Loading buttons should display progress.

Disabled buttons should clearly indicate why they are disabled.

---

# Modals

Use modals only for focused tasks.

Examples

Invite Vendor

Assign Reviewer

Approve

Reject

Preview Document

Delete Confirmation

Large workflows should never be inside a modal.

---

# Icons

Use Lucide React.

Icons should be simple.

Do not overuse icons.

Every icon should reinforce meaning.

---

# Status Chips

Every status should have a consistent visual style.

Examples

Draft

Invitation Sent

In Progress

Submitted

Procurement Review

Finance Review

Compliance Review

Approved

Rejected

Expired

ERP Sync

Vendor Active

The same status should always have the same color across the application.

---

# Progress Indicators

Progress should be displayed wherever appropriate.

Registration Wizard

Application Completion

Document Upload

ERP Synchronization

Approval Timeline

Progress should never be misleading.

---

# Empty States

Every page should have meaningful empty states.

Examples

No Invitations Found

No Vendor Applications

No Pending Reviews

No Notifications

No Documents Uploaded

Empty states should guide the user toward the next action.

---

# Loading States

Never display blank screens.

Use Skeleton Loaders.

Buttons should display loading indicators.

Large tables should display placeholder rows.

Charts should display loading placeholders.

---

# Error States

Errors should explain:

What happened.

Why it happened.

How to fix it.

Avoid technical messages.

Instead of

HTTP 500

Display

Something went wrong. Please try again or contact your administrator.

---

# Animations

Animations should be subtle.

Use Framer Motion.

Recommended animations:

Fade

Slide

Scale

Expand

Collapse

Avoid dramatic animations.

Speed should feel responsive.

---

# Accessibility

Keyboard Navigation

Visible Focus States

Screen Reader Support

Color Contrast

ARIA Labels

Semantic HTML

Large Click Areas

Accessibility should never be optional.

---

# Responsive Design

Desktop

Laptop

Tablet

Mobile

Every page should remain usable.

Tables should adapt gracefully.

Forms should stack vertically on smaller devices.

Navigation should collapse into a drawer.

---

# Component Library

Reusable components should include:

Button

Input

Textarea

Dropdown

Checkbox

Radio

Switch

Date Picker

File Upload

Avatar

Badge

Card

Table

Modal

Drawer

Tabs

Accordion

Timeline

Stepper

Breadcrumb

Pagination

Search Bar

Notification

Toast

Skeleton Loader

Empty State

Error State

Every component should have a consistent API and appearance.

---

# Final Design Goal

The final application should feel like a premium enterprise procurement platform.

A procurement manager should be able to spend an entire workday using the application without confusion or visual fatigue.

The interface should communicate trust, stability, professionalism, and efficiency.

Every new screen added to the application should naturally fit into this design system without requiring redesign.