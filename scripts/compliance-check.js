/**
 * BUILD-TIME COMPLIANCE CHECK
 * 
 * Scans all content files for banned patterns and fails the build if found.
 * Run this in CI/CD or as a pre-commit hook.
 */

const fs = require('fs');
const path = require('path');

// Import the banned patterns (we'll need to compile this or use a simpler approach)
// For Node.js, we'll duplicate the patterns here
const BANNED_PATTERNS = [
  {
    id: 'strapline-kent-representation',
    pattern: /free\s+police\s+station\s+representation\s+across\s+kent/gi,
    description: 'Strapline variant claiming free representation across Kent'
  },
  {
    id: 'forty-five-minutes',
    pattern: /(?:available\s+)?within\s+45\s+minutes|attend\s+within\s+45\s+minutes/gi,
    description: '45 minute SLA claims'
  },
  {
    id: 'twenty-four-seven-representation',
    pattern: /24\/7.*?(?:representation|legal\s+services|immediate(?:\s+representation)?)/gi,
    description: '24/7 immediate representation claims'
  },
  {
    id: 'guaranteed-representation',
    pattern: /(?:guaranteed|you\s+are\s+guaranteed\s+to\s+be\s+represented\s+by)/gi,
    description: 'Guarantee language'
  },
  {
    id: 'we-provide-urgent-attendance',
    pattern: /we\s+provide\s+urgent\s+attendance/gi,
    description: 'We provide urgent attendance claims'
  },
  {
    id: 'we-provide-representation',
    pattern: /we\s+provide\s+representation/gi,
    description: 'We provide representation claims'
  },
  {
    id: 'our-advice-representation',
    pattern: /our\s+advice\s+and\s+representation/gi,
    description: 'Our advice and representation claims'
  },
  {
    id: 'subject-to-eligibility',
    pattern: /subject\s+to\s+eligibility\s+(?:and\s+)?(?:availability\s+)?(?:re\s+)?(?:police\s+station\s+advice)?/gi,
    description: 'Inconsistent Legal Aid eligibility messaging'
  },
  {
    id: 'police-station-agent-provides-services',
    pattern: /(?:policestationagent\.com|Police\s+Station\s+Agent)\s+provides.*?legal\s+services.*?(?:across\s+Kent|and\s+the\s+UK)/gi,
    description: 'Website operator providing services claim'
  },
  {
    id: 'ask-for-police-station-agent',
    pattern: /(?:ask\s+for|tell.*?you\s+want|request)\s+["']?(?:Police\s+Station\s+Agent|policestationagent)["']?\s+to\s+(?:represent|attend)/gi,
    description: 'Instructions to ask for Police Station Agent'
  }
];

function scanDirectory(dir, extensions = ['.tsx', '.ts', '.jsx', '.js', '.json', '.md', '.mdx'], results = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    // Skip node_modules, .next, compliance library, etc.
    if (file.name.startsWith('.') || 
        file.name === 'node_modules' || 
        file.name === '.next' || 
        file.name === 'dist' ||
        file.name === 'compliance') {
      continue;
    }
    
    // Skip compliance check script itself
    if (file.name === 'compliance-check.js') {
      continue;
    }

    if (file.isDirectory()) {
      scanDirectory(fullPath, extensions, results);
    } else if (extensions.some(ext => file.name.endsWith(ext))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const relativePath = path.relative(process.cwd(), fullPath);
        
        BANNED_PATTERNS.forEach(({ id, pattern, description }) => {
          const matches = content.match(pattern);
          if (matches) {
            const lines = content.split('\n');
            matches.forEach(match => {
              const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length;
              results.push({
                file: relativePath,
                patternId: id,
                description,
                match: match.substring(0, 100),
                lineNumber
              });
            });
          }
        });
      } catch (err) {
        // Skip binary files or files we can't read
      }
    }
  }

  return results;
}

// Main execution
const projectRoot = process.cwd();
const scanDirs = [
  path.join(projectRoot, 'app'),
  path.join(projectRoot, 'components'),
  path.join(projectRoot, 'data'),
  path.join(projectRoot, 'lib')
].filter(dir => fs.existsSync(dir));

const results = [];
scanDirs.forEach(dir => {
  scanDirectory(dir, undefined, results);
});

if (results.length > 0) {
  console.error('\n❌ COMPLIANCE CHECK FAILED: Banned patterns found!\n');
  console.error('Found', results.length, 'violation(s):\n');
  
  results.forEach(({ file, patternId, description, match, lineNumber }) => {
    console.error(`  File: ${file}:${lineNumber}`);
    console.error(`  Pattern: ${patternId} (${description})`);
    console.error(`  Match: "${match}"\n`);
  });
  
  console.error('Please fix these violations before deploying.\n');
  process.exit(1);
} else {
  console.log('✅ Compliance check passed: No banned patterns found.');
  process.exit(0);
}

