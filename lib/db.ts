import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Lazy database initialization for serverless compatibility
let db: Database.Database | null = null;
let dbInitialized = false;

function getDatabase(): Database.Database {
  // Skip database initialization during build time (Vercel)
  // This prevents build failures - database will initialize at runtime
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    // Return a minimal mock for build time
    throw new Error('Database not available during build. Use runtime queries only.');
  }

  if (!db) {
    const sourceDbPath = path.join(process.cwd(), 'data', 'web44ai.db');
    
    // On Vercel serverless, the file system is read-only except for /tmp
    // SQLite requires write access for journaling even for read operations
    // So we copy the database to /tmp if we're in a serverless environment
    let dbPath = sourceDbPath;
    
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      const tmpDbPath = '/tmp/web44ai.db';
      
      // Copy database to /tmp if it doesn't exist or is older than source
      try {
        const sourceExists = fs.existsSync(sourceDbPath);
        const tmpExists = fs.existsSync(tmpDbPath);
        
        if (sourceExists && (!tmpExists || needsCopy(sourceDbPath, tmpDbPath))) {
          fs.copyFileSync(sourceDbPath, tmpDbPath);
          console.log('Copied database to /tmp for serverless compatibility');
        }
        
        if (fs.existsSync(tmpDbPath)) {
          dbPath = tmpDbPath;
        }
      } catch (copyError) {
        console.warn('Could not copy database to /tmp:', copyError);
        // Continue with source path, may fail but worth trying
      }
    }

    // Ensure data directory exists (for local development)
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir) && !dbPath.startsWith('/tmp')) {
      try {
        fs.mkdirSync(dbDir, { recursive: true });
      } catch (error) {
        console.warn('Could not create data directory');
      }
    }

    try {
      db = new Database(dbPath, { readonly: false });
      // Enable foreign keys
      db.pragma('foreign_keys = ON');
      console.log('Database opened successfully from:', dbPath);
    } catch (error) {
      console.error('Database initialization error:', error);
      // Try read-only mode as last resort
      try {
        db = new Database(dbPath, { readonly: true });
        console.log('Database opened in read-only mode');
      } catch (readOnlyError) {
        console.error('Read-only mode also failed:', readOnlyError);
        // Fallback to in-memory database
        db = new Database(':memory:');
        console.warn('Using in-memory database fallback');
      }
    }
  }

  if (!dbInitialized) {
    initDatabase();
    dbInitialized = true;
  }

  return db;
}

// Check if we need to copy the database (source is newer)
function needsCopy(sourcePath: string, destPath: string): boolean {
  try {
    const sourceStat = fs.statSync(sourcePath);
    const destStat = fs.statSync(destPath);
    return sourceStat.mtimeMs > destStat.mtimeMs;
  } catch {
    return true;
  }
}

// Initialize database tables
function initDatabase() {
  if (!db) return;

  try {
    // Users table for admin authentication
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Blog posts table
    db.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author_id INTEGER,
        published BOOLEAN DEFAULT 0,
        published_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        meta_title TEXT,
        meta_description TEXT,
        image TEXT,
        schema_json TEXT,
        FOREIGN KEY (author_id) REFERENCES users(id)
      )
    `);
    
    // Add new columns if they don't exist (for existing databases)
    try {
      db.exec(`ALTER TABLE blog_posts ADD COLUMN image TEXT`);
    } catch (e) {
      // Column already exists, ignore
    }
    try {
      db.exec(`ALTER TABLE blog_posts ADD COLUMN schema_json TEXT`);
    } catch (e) {
      // Column already exists, ignore
    }

    // Police stations table
    db.exec(`
      CREATE TABLE IF NOT EXISTS police_stations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        address TEXT,
        phone TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Services table
    db.exec(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact form submissions
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact_number TEXT,
        email TEXT,
        request_type TEXT,
        client_name TEXT,
        client_dob TEXT,
        police_station TEXT,
        interview_date TEXT,
        interview_time TEXT,
        attendance_type TEXT,
        offence_summary TEXT,
        contact_window TEXT,
        contact_window_time TEXT,
        support_needs TEXT,
        consent BOOLEAN DEFAULT 0,
        user_agent TEXT,
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, published_at);
      CREATE INDEX IF NOT EXISTS idx_police_station_slug ON police_stations(slug);
      CREATE INDEX IF NOT EXISTS idx_service_slug ON services(slug);
      CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at);
    `);
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Export proxy that initializes lazily
const dbProxy = new Proxy({} as Database.Database, {
  get(_target, prop) {
    const dbInstance = getDatabase();
    const value = (dbInstance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(dbInstance);
    }
    return value;
  }
});

export default dbProxy;

