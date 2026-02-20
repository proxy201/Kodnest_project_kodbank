const pool = require('./db');

async function setupDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to AIVEN MySQL Database');

    // Create KodUsers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS KodUsers (
        uid VARCHAR(36) PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        balance DECIMAL(15,2) DEFAULT 100000.00,
        role ENUM('Customer', 'Manager', 'Admin') DEFAULT 'Customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('✅ KodUsers table created/verified');

    // Create UserTokens table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS UserTokens (
        tid VARCHAR(36) PRIMARY KEY,
        token TEXT NOT NULL,
        uid VARCHAR(36) NOT NULL,
        expiry DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uid) REFERENCES KodUsers(uid) ON DELETE CASCADE,
        INDEX idx_uid (uid),
        INDEX idx_expiry (expiry)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('✅ UserTokens table created/verified');

    console.log('\n✅ Database setup completed successfully!');
    console.log('\nYou can now start the server with: npm run dev');
  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    console.log('\n⚠️  Please check your AIVEN database credentials in .env file');
    process.exit(1);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

// Run setup
setupDatabase();

