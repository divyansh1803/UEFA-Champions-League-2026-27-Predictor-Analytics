const fs = require('fs');
let content = fs.readFileSync('src/components/PlayerPhoto.tsx', 'utf-8');

// The CSS initials are actually perfectly fine and much faster than ui-avatars.
// Let's just make sure it compiles cleanly and the limit is applied.

