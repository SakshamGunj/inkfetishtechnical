import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LiveAnthologyCard } from './LiveAnthologyCard';
import { LiveAnthology } from '@/types/anthology';

describe('LiveAnthologyCard', () => {
  const mockAnthology: LiveAnthology = {
    id: 'test-anthology',
    title: 'Test Anthology',
    genre: 'Poetry',
    status: 'open',
    deadline: '2026-12-31',
    reward: 'Publication + Prize',
    description: 'A test anthology description that meets the minimum character requirement for validation purposes and testing.',
    submissionCount: 50,
    spotsRemaining: 8,
    accentColor: '#9D00FF',
    ctaLink: '/anthology/test-anthology'
  };

  it('renders anthology title', () => {
    render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    expect(screen.getByText('Test Anthology')).toBeInTheDocument();
  });

  it('renders status badge for open anthology', () => {
    render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    expect(screen.getByText('SUBMISSIONS OPEN')).toBeInTheDocument();
  });

  it('renders status badge for editorial anthology', () => {
    const editorialAnthology = { ...mockAnthology, status: 'editorial' as const };
    render(<LiveAnthologyCard anthology={editorialAnthology} index={0} />);
    expect(screen.getByText('EDITORIAL REVIEW')).toBeInTheDocument();
  });

  it('renders status badge for closed anthology', () => {
    const closedAnthology = { ...mockAnthology, status: 'closed' as const };
    render(<LiveAnthologyCard anthology={closedAnthology} index={0} />);
    expect(screen.getByText('CLOSED')).toBeInTheDocument();
  });

  it('displays scarcity trigger when spots < 10 and status is open', () => {
    render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    expect(screen.getByText('Only 8 spots left!')).toBeInTheDocument();
  });

  it('does not display scarcity trigger when spots >= 10', () => {
    const noScarcityAnthology = { ...mockAnthology, spotsRemaining: 15 };
    render(<LiveAnthologyCard anthology={noScarcityAnthology} index={0} />);
    expect(screen.queryByText(/spots left/i)).not.toBeInTheDocument();
  });

  it('does not display scarcity trigger when status is not open', () => {
    const closedWithScarcity = { 
      ...mockAnthology, 
      status: 'closed' as const, 
      spotsRemaining: 5 
    };
    render(<LiveAnthologyCard anthology={closedWithScarcity} index={0} />);
    expect(screen.queryByText(/spots left/i)).not.toBeInTheDocument();
  });

  it('renders CTA button when status is open', () => {
    render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    expect(screen.getByText('SUBMIT NOW')).toBeInTheDocument();
  });

  it('does not render CTA button when status is editorial', () => {
    const editorialAnthology = { ...mockAnthology, status: 'editorial' as const };
    render(<LiveAnthologyCard anthology={editorialAnthology} index={0} />);
    expect(screen.queryByText('SUBMIT NOW')).not.toBeInTheDocument();
    expect(screen.getByText('Under Review')).toBeInTheDocument();
  });

  it('does not render CTA button when status is closed', () => {
    const closedAnthology = { ...mockAnthology, status: 'closed' as const };
    render(<LiveAnthologyCard anthology={closedAnthology} index={0} />);
    expect(screen.queryByText('SUBMIT NOW')).not.toBeInTheDocument();
    expect(screen.getByText('Submissions Closed')).toBeInTheDocument();
  });

  it('renders custom CTA text when provided', () => {
    const customCTAAnthology = { ...mockAnthology, ctaText: 'JOIN NOW' };
    render(<LiveAnthologyCard anthology={customCTAAnthology} index={0} />);
    expect(screen.getByText('JOIN NOW')).toBeInTheDocument();
  });

  it('renders all required fields', () => {
    render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    
    // Title
    expect(screen.getByText('Test Anthology')).toBeInTheDocument();
    
    // Genre
    expect(screen.getByText('Poetry')).toBeInTheDocument();
    
    // Description
    expect(screen.getByText(/test anthology description/i)).toBeInTheDocument();
    
    // Deadline label
    expect(screen.getByText('Deadline')).toBeInTheDocument();
    
    // Reward
    expect(screen.getByText('Publication + Prize')).toBeInTheDocument();
  });

  it('applies accent color to border', () => {
    const { container } = render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    const card = container.querySelector('[style*="border"]');
    expect(card).toHaveStyle({ border: '4px solid #9D00FF' });
  });

  it('applies accent color to title', () => {
    const { container } = render(<LiveAnthologyCard anthology={mockAnthology} index={0} />);
    const title = container.querySelector('h3');
    expect(title).toHaveStyle({ color: '#9D00FF' });
  });
});
