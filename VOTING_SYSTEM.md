# Poetry Voting System

## Overview
The voting system allows users to vote for their favorite poetry submissions. Each device is limited to 5 votes total, with a maximum of 1 vote per poem.

## Features

### For Voters
- **Gallery View**: Browse all approved poetry submissions in a beautiful card layout
- **Vote Limits**: Each device can vote up to 5 times total
- **One Vote Per Poem**: Users can only vote once per submission
- **Real-time Updates**: Vote counts update in real-time
- **Modal View**: Click on any poem to read it in full with voting options
- **Progress Tracking**: See how many votes you've used and how many remain

### For Admins
- **Submission Approval**: Review and approve/reject poetry submissions
- **Vote Monitoring**: See vote counts for each approved submission
- **Status Management**: Change submission status between submitted, approved, and rejected

## Database Structure

### Collections

#### `inkcult_submissions`
- `userId`: User who submitted the poem
- `userName`: Name of the author
- `userEmail`: Email of the author
- `title`: Poem title
- `content`: Poem content (HTML)
- `theme`: Theme/category
- `submissionDate`: When submitted
- `status`: 'submitted' | 'under_review' | 'approved' | 'rejected'
- `voteCount`: Number of votes (defaults to 0)

#### `inkcult_votes`
- `submissionId`: ID of the voted submission
- `deviceId`: Unique device identifier for vote tracking
- `userId`: Optional user ID (for authenticated users)
- `createdAt`: When the vote was cast
- `submissionTitle`: Title of the voted poem
- `submissionAuthor`: Author of the voted poem

## How It Works

### Device Tracking
- Each device gets a unique ID stored in localStorage
- Votes are tracked by device ID to prevent multiple votes from the same device
- This works for both authenticated and anonymous users

### Vote Limits
- Maximum 5 votes per device
- Maximum 1 vote per poem per device
- Votes cannot be changed once submitted

### Real-time Updates
- Uses Firestore real-time listeners to update vote counts instantly
- All users see updated vote counts without refreshing

## Routes

- `/voting` - Main voting gallery page
- `/inkcultt` - Poetry submission portal (with link to voting)

## Security Rules

- Anyone can create votes (device-based tracking)
- Authenticated users can read their own votes
- All authenticated users can read approved submissions
- Admins can update submission status

## Usage

1. **Submit Poems**: Users submit poems through `/inkcultt`
2. **Admin Review**: Admins review and approve submissions
3. **Vote**: Users vote for approved poems at `/voting`
4. **Results**: Vote counts are displayed in real-time

## Technical Implementation

- **Frontend**: React with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Real-time**: Firestore onSnapshot listeners
- **State Management**: React hooks with local state