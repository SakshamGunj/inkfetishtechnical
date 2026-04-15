import { LiveAnthology } from '@/types/anthology';

/**
 * Filters anthologies by their submission status
 * 
 * **Validates: Requirements 6.1, 6.2, 6.3**
 * 
 * @param anthologies - Array of live anthologies to filter
 * @param status - Status to filter by ('open', 'editorial', or 'closed')
 * @returns New array containing only anthologies matching the specified status
 * 
 * **Preconditions:**
 * - anthologies is a valid array (may be empty)
 * - status is one of: 'open', 'editorial', 'closed'
 * 
 * **Postconditions:**
 * - Returns array containing only anthologies matching the status
 * - Original array is not mutated
 * - Returned array maintains original order
 * - If no matches, returns empty array
 */
export function filterAnthologiesByStatus(
  anthologies: LiveAnthology[],
  status: 'open' | 'editorial' | 'closed'
): LiveAnthology[] {
  // Input validation
  if (!Array.isArray(anthologies)) {
    throw new Error('anthologies must be a valid array');
  }

  if (!['open', 'editorial', 'closed'].includes(status)) {
    throw new Error('status must be one of: open, editorial, closed');
  }

  // Filter using immutable operation
  return anthologies.filter((anthology) => anthology.status === status);
}

/**
 * Sorts anthologies by their submission deadline
 * 
 * **Validates: Requirements 6.4, 6.5, 6.6, 6.7**
 * 
 * @param anthologies - Array of live anthologies to sort
 * @param order - Sort order: 'asc' for earliest first, 'desc' for latest first (default: 'asc')
 * @returns New array sorted by deadline
 * 
 * **Preconditions:**
 * - anthologies is a valid array
 * - All anthologies have valid deadline ISO date strings
 * - order is either 'asc' or 'desc'
 * 
 * **Postconditions:**
 * - Returns new array sorted by deadline
 * - Original array is not mutated
 * - 'asc' order: earliest deadline first
 * - 'desc' order: latest deadline first
 * - Invalid dates are placed at the end
 */
export function sortAnthologiesByDeadline(
  anthologies: LiveAnthology[],
  order: 'asc' | 'desc' = 'asc'
): LiveAnthology[] {
  // Input validation
  if (!Array.isArray(anthologies)) {
    throw new Error('anthologies must be a valid array');
  }

  if (!['asc', 'desc'].includes(order)) {
    throw new Error('order must be either asc or desc');
  }

  // Create shallow copy to avoid mutation
  const sorted = [...anthologies];

  // Sort with invalid date handling
  sorted.sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);

    const isValidA = !isNaN(dateA.getTime());
    const isValidB = !isNaN(dateB.getTime());

    // Place invalid dates at the end
    if (!isValidA && !isValidB) return 0;
    if (!isValidA) return 1;
    if (!isValidB) return -1;

    // Sort valid dates
    const comparison = dateA.getTime() - dateB.getTime();
    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Calculates whether to show scarcity trigger and generates the message
 * 
 * **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**
 * 
 * @param anthology - Live anthology to check for scarcity
 * @returns Scarcity object with show flag and message, or null if conditions not met
 * 
 * **Preconditions:**
 * - anthology is a valid LiveAnthology object
 * - anthology.status is defined
 * 
 * **Postconditions:**
 * - Returns scarcity object if conditions met, null otherwise
 * - Scarcity shows when: status='open' AND spotsRemaining < 10
 * - Message format: "Only X spots left!"
 * - Returns null if status is not 'open' or spotsRemaining >= 10
 */
export function calculateScarcityTrigger(
  anthology: LiveAnthology
): { show: boolean; message: string } | null {
  // Input validation
  if (!anthology || typeof anthology !== 'object') {
    throw new Error('anthology must be a valid LiveAnthology object');
  }

  if (!anthology.status) {
    throw new Error('anthology.status must be defined');
  }

  // Check scarcity conditions
  const isOpen = anthology.status === 'open';
  const hasSpotsRemaining = 
    anthology.spotsRemaining !== null && 
    anthology.spotsRemaining !== undefined;
  const isLowSpots = hasSpotsRemaining && anthology.spotsRemaining < 10;

  // Return scarcity object if all conditions met
  if (isOpen && isLowSpots) {
    return {
      show: true,
      message: `Only ${anthology.spotsRemaining} spots left!`
    };
  }

  // Return null if conditions not met
  return null;
}
