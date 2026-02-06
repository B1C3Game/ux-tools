/**
 * Real-world integration tests for B1C3 UX Tools
 * Demonstrates all utilities in a practical contact form scenario
 */

import {
  isValidEmail,
  isValidUrl,
  sanitizeInput,
  truncateText,
  getElementVisibleText,
  getFocusableElements,
  useFocusTrap,
  clamp,
  debounce,
  throttle,
} from './index';

// ============================================================================
// SCENARIO 1: Form Validation & Sanitization
// ============================================================================

console.log('=== SCENARIO 1: Form Validation ===\n');

const testEmails = [
  'user@example.com',
  'valid+tag@example.co.uk',
  'invalid-email',
  'no-domain@',
  'missing@tld',
];

console.log('Email Validation:');
testEmails.forEach((email) => {
  console.log(`  ${email.padEnd(30)} → ${isValidEmail(email) ? '✓ Valid' : '✗ Invalid'}`);
});

const testUrls = ['https://example.com', 'http://example.com/path?q=1', 'example.com', 'ftp://example.com'];

console.log('\nURL Validation:');
testUrls.forEach((url) => {
  console.log(`  ${url.padEnd(30)} → ${isValidUrl(url) ? '✓ Valid' : '✗ Invalid'}`);
});

// Sanitization example
const userInput = '<script>alert("xss")</script>Hello & goodbye';
const sanitized = sanitizeInput(userInput);
console.log('\nInput Sanitization:');
console.log(`  Input:      ${userInput}`);
console.log(`  Sanitized:  ${sanitized}\n`);

// ============================================================================
// SCENARIO 2: Text Manipulation
// ============================================================================

console.log('=== SCENARIO 2: Text Manipulation ===\n');

const longText =
  'The quick brown fox jumps over the lazy dog and continues running through the forest';
const truncated = truncateText({ text: longText, maxLength: 30, truncateOn: 'word' });
console.log('Text Truncation (word boundary):');
console.log(`  Original: ${longText}`);
console.log(`  Length 30: ${truncated}\n`);

// ============================================================================
// SCENARIO 3: Number Constraints
// ============================================================================

console.log('=== SCENARIO 3: Number Constraints ===\n');

const sliderValue = 150;
const clampedValue = clamp(sliderValue, 0, 100);
console.log('Slider Clamping (0-100):');
console.log(`  Input: ${sliderValue} → Output: ${clampedValue}\n`);

// ============================================================================
// SCENARIO 4: Debounce (Search Input)
// ============================================================================

console.log('=== SCENARIO 4: Debounce (Search with delay) ===\n');

let searchRequest = 0;
const performSearch = debounce((query: string) => {
  searchRequest++;
  console.log(`  [Request #${searchRequest}] Searching for: "${query}"`);
}, 300);

console.log('User types: "react" character by character');
setTimeout(() => performSearch('r'), 100); // 1st character
setTimeout(() => performSearch('re'), 200); // 2nd character
setTimeout(() => performSearch('rea'), 300); // 3rd character  - triggers after 300ms from last call
setTimeout(() => performSearch('reac'), 600); // 4th character
setTimeout(() => performSearch('react'), 700); // 5th character - triggers after 300ms

// Wait for debounce timers to complete
await new Promise((resolve) => setTimeout(resolve, 1500));
console.log(`\nOnly ${searchRequest}/5 requests made (debounced)\n`);

// ============================================================================
// SCENARIO 5: Throttle (Window Resize Handler)
// ============================================================================

console.log('=== SCENARIO 5: Throttle (Event Handler) ===\n');

let resizeCount = 0;
const handleResize = throttle(() => {
  resizeCount++;
  console.log(`  [Resize #${resizeCount}] Layout updated`);
}, 250);

// Simulate rapid resize events
for (let i = 0; i < 10; i++) {
  setTimeout(() => handleResize(), i * 50);
}

await new Promise((resolve) => setTimeout(resolve, 2000));
console.log(`\nOnly ${resizeCount} layout updates (throttled, not ${10})\n`);

// ============================================================================
// SCENARIO 6: DOM Utilities with HTML
// ============================================================================

console.log('=== SCENARIO 6: DOM Utilities ===\n');

const formHTML = `
  <form>
    <label>Email:</label>
    <input type="email" name="email" />
    
    <label>Website:</label>
    <input type="url" name="website" />
    
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
    
    <div style="display: none">Hidden content</div>
  </form>
`;

if (typeof document !== 'undefined') {
  const container = document.createElement('div');
  container.innerHTML = formHTML;
  document.body.appendChild(container);

  const focusableElements = getFocusableElements(container.querySelector('form')!);
  console.log('Focusable elements found:');
  focusableElements.forEach((el, idx) => {
    console.log(`  ${idx + 1}. <${el.tagName.toLowerCase()}> ${el.getAttribute('name') || el.getAttribute('type') || el.textContent}`);
  });

  const visibleText = getElementVisibleText(container.querySelector('form')!);
  console.log(`\nVisible text: "${visibleText}"`);

  container.remove();
} else {
  console.log('(Skipped: DOM environment not available in this test context)');
}

console.log('\n=== All Scenarios Completed ===');
