const https = require('https');

https.get('https://web44ai.vercel.app', {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract navigation section
    const infoMatch = data.match(/Information[\s\S]{0,2000}?Information/);
    if (infoMatch) {
      console.log('Information dropdown content:');
      console.log(infoMatch[0].substring(0, 500));
    }
    
    // Check for specific patterns
    console.log('\n=== Checks ===');
    console.log('Has "Privacy Policy" in body:', data.includes('Privacy Policy'));
    console.log('Has "FAQ" after Information:', data.indexOf('Information') < data.indexOf('FAQ'));
    console.log('Has "Help & Advice" in footer:', data.includes('Help & Advice'));
    
    // Look for our specific changes
    const hasLegalOnly = data.includes('Legal & Compliance');
    console.log('Has "Legal & Compliance" (mobile menu):', hasLegalOnly);
  });
}).on('error', console.error);



























