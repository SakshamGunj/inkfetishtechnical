# Inkcultt Poetry Portal

The Inkcultt Poetry Portal is a fully-featured poetry submission platform integrated into the Verse Author Ink application.

## Features

### For Users
- **User Authentication**: Sign up and log in with email and password
- **Poetry Submission**: Submit up to 3 poems with rich text formatting
- **Writing Prompts**: Get inspiration from admin-created writing prompts
- **Submission Tracking**: Monitor the status of your submitted poems
- **Profile Management**: View your submission statistics and profile information
- **Responsive Design**: Optimized for both mobile and desktop devices

### For Admins
- **Prompt Management**: Create and manage writing prompts through the admin panel
- **User Monitoring**: Track user registrations and submissions
- **Dark Theme UI**: Professional admin interface with tabbed navigation

## How to Use

### Access the Portal
Navigate to `/inkcultt` to access the poetry submission portal.

### User Registration
1. Click "Need an account? Sign Up" on the login screen
2. Enter your full name, email address, and password
3. Click "Create Account"

### Submit Poetry
1. Log in to your account
2. Click on the "Submit Poetry" tab
3. Fill in the poem title, theme/category, and content using the rich text editor
4. Click "Submit Poetry"
5. Your submission will appear in the "My Submissions" tab

### Admin Panel
1. Navigate to `/admin`
2. Switch to the "Inkcultt Poetry Portal" tab
3. Create new writing prompts in the admin interface

## Technical Details

### Firebase Collections
- `inkcult_users`: User profiles and statistics
- `inkcult_submissions`: Poetry submissions with status tracking
- `inkcult_prompts`: Writing prompts for inspiration

### Submission Limits
- Each user can submit a maximum of 3 poems
- Once the limit is reached, the submission form is disabled
- Status tracking: submitted → under_review → approved/rejected

### Rich Text Editor
- Powered by ReactQuill for professional text formatting
- Supports bold, italic, headings, and other text styling
- Dark theme integration for consistent UI experience

### Security
- Email/password authentication via Firebase Auth
- User data isolation - users can only access their own submissions
- Read-only access to writing prompts for all authenticated users

## Design
- Dark theme with purple/indigo gradient backgrounds
- Glass morphism effects with backdrop blur
- Framer Motion animations for smooth interactions
- Mobile-first responsive design
- Consistent with the existing application's design language

## Status Tracking
- **Submitted**: Initial status when poem is submitted
- **Under Review**: Admin has started reviewing the submission
- **Approved**: Submission has been accepted
- **Rejected**: Submission was not accepted

Navigate to your profile tab to see detailed statistics about your submissions and account information.
