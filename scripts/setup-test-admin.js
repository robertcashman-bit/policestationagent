/**
 * Setup Test Admin Password
 * 
 * This script sets a known password for the test admin user
 * so automated tests can authenticate.
 */

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const TEST_PASSWORD = 'TestAdmin2025!';

async function setupTestAdmin() {
  const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
  const db = new Database(dbPath);

  try {
    // Hash the test password
    const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

    // Update the admin user's password
    const result = db.prepare(`
      UPDATE users SET password_hash = ? WHERE username = 'Cashman100'
    `).run(passwordHash);

    if (result.changes > 0) {
      console.log('✅ Test admin password set successfully');
      console.log('   Username: Cashman100');
      console.log('   Password: TestAdmin2025!');
      console.log('');
      console.log('⚠️  IMPORTANT: Change this password after testing!');
    } else {
      console.log('❌ No admin user found with username "Cashman100"');
      
      // Create the user if it doesn't exist
      const insertResult = db.prepare(`
        INSERT INTO users (username, password_hash) VALUES (?, ?)
      `).run('Cashman100', passwordHash);
      
      console.log('✅ Created new admin user');
      console.log('   Username: Cashman100');
      console.log('   Password: TestAdmin2025!');
    }
  } catch (error) {
    console.error('Error setting up test admin:', error);
  } finally {
    db.close();
  }
}

setupTestAdmin();





