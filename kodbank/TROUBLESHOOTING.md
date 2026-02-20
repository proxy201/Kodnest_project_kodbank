# Kodbank - Troubleshooting & FAQs

## ❌ Common Issues & Solutions

### Backend Issues

#### 1. "ECONNREFUSED" - Database Connection Failed
```
Error: connect ECONNREFUSED <host>:3306
```
**Solutions:**
- Check AIVEN database is running
- Verify DB_HOST is correct (check AIVEN console)
- Verify DB_USER and DB_PASSWORD
- Check your IP is whitelisted in AIVEN firewall
- Try connecting with MySQL client first:
  ```bash
  mysql -h <host> -u <user> -p
  ```

#### 2. "ER_NOT_FOUND_CONDITION_2006" - No Database
```
Client does not support authentication protocol requested by server
```
**Solutions:**
- Run database setup: `node setup-db.js`
- Check DB_HOST port (usually 3306)
- Try from AIVEN console first

#### 3. "EADDRINUSE" - Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solutions:**

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_number> /F
```

Mac/Linux:
```bash
lsof -i :5000
kill -9 <PID_number>
```

Or change PORT in .env to 5001, 5002, etc.

#### 4. "ValidationError" - Missing Environment Variables
```
Error: Cannot read property 'host' of undefined
```
**Solutions:**
- Create `backend/.env` file
- Add all required variables:
  ```env
  PORT=5000
  DB_HOST=...
  DB_USER=...
  DB_PASSWORD=...
  DB_NAME=kodbank
  JWT_SECRET=...
  JWT_EXPIRE=24h
  CORS_ORIGIN=http://localhost:3000
  NODE_ENV=development
  ```
- Restart server

---

### Frontend Issues

#### 1. "Module not found" Error
```
Cannot find module 'react-router-dom'
```
**Solutions:**
```bash
cd frontend
npm install
# Or for specific package:
npm install react-router-dom
```

#### 2. CORS Error in Console
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solutions:**
- Update backend CORS_ORIGIN:
  ```env
  CORS_ORIGIN=http://localhost:3000
  ```
- Restart backend server
- Clear browser cache (Ctrl+F5)
- Check frontend .env.local has correct API_URL

#### 3. "Cannot GET /" Error
```
Cannot GET /register
404 Not Found
```
**Solutions:**
- Check React Router setup in App.js
- Verify npm start is running frontend
- Clear browser cache
- Try incognito window

#### 4. API Calls Return 404
```
404 Not Found /api/auth/register
```
**Solutions:**
- Verify backend is running on correct port
- Check REACT_APP_API_URL in .env.local
- Verify routes are defined (auth.js, balance.js)
- Test with CURL:
  ```bash
  curl http://localhost:5000/health
  ```

#### 5. Token Not Stored
```
Token undefined in localStorage
```
**Solutions:**
- Check login response in Network tab
- Verify token exists in response
- Check browser console for errors
- Try logout and login again
- Clear localStorage: `localStorage.clear()`

---

### Database Issues

#### 1. "Access denied for user" Error
```
Error: Access denied for user 'avnadmin'@'<ip>'
```
**Solutions:**
- Check password is correct
- Verify IP is whitelisted in AIVEN
- In AIVEN console → Details → Access Control → Add your IP
- Use 0.0.0.0/0 for development (not secure - change for production)

#### 2. "Unknown database 'kodbank'"
```
Error: Unknown database 'kodbank'
```
**Solutions:**
- Run setup: `node setup-db.js`
- Check DB_NAME in .env (should be "kodbank")
- Verify you have permissions to create database

#### 3. "Table already exists"
```
You can ignore this - tables already exist
```
**Solutions:**
- This is normal on subsequent runs
- Setup script uses "CREATE TABLE IF NOT EXISTS"
- No action needed

#### 4. "Duplicate entry for key 'username'"
```
Error: Duplicate entry 'john_doe' for key 'KodUser.username'
```
**Solutions:**
- Username already exists
- Use different username in registration
- Or clear table:
  ```bash
  mysql -h <host> -u <user> -p kodbank
  DELETE FROM KodUser;
  DELETE FROM UserToken;
  ```

---

### Authentication Issues

#### 1. "Invalid username or password"
```
Always shows error even with correct password
```
**Solutions:**
- Verify user exists in DB:
  ```bash
  mysql -h <host> -u <user> -p kodbank
  SELECT * FROM KodUser WHERE username = 'johnny';
  ```
- Check password is hashed (starts with $2b$)
- Try registering new user
- Clear browser cookies

#### 2. "Invalid or expired token"
```
Error when checking balance
```
**Solutions:**
- Token might be expired (24-hour limit)
- Log out and log in again
- Clear cookies: 
  ```bash
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  ```
- Check JWT_SECRET is same in backend

#### 3. "No token provided"
```
GET /api/bank/check-balance returns 401
```
**Solutions:**
- Ensure you're logged in first
- Check token cookie exists:
  - DevTools → Application → Cookies
- Check Authorization header is sent:
  - DevTools → Network → check-balance → Headers
- Try login again

---

### Deployment Issues

#### 1. Vercel Deployment Fails
```
Build failed: npm ERR! code ENOENT
```
**Solutions:**
- Check all dependencies in package.json
- Ensure .gitignore doesn't exclude needed files
- Verify package.json "build" script exists
- Check `vercel.json` configuration

#### 2. API not found on Vercel
```
404: Cannot POST /api/auth/login
```
**Solutions:**
- Update REACT_APP_API_URL to Vercel URL
- Check `vercel.json` routes configuration
- Verify environment variables in Vercel dashboard
- Check backend routes are correct

#### 3. Database connection fails on Vercel
```
ECONNREFUSED: connect to AIVEN
```
**Solutions:**
- Add Vercel IP to AIVEN whitelist
  - Vercel IPs: Check [Vercel docs](https://vercel.com/docs/concepts/projects/project-overview#system-ip-whitelist)
  - Or just use 0.0.0.0/0 (less secure)
- Verify environment variables are set
- Check credentials haven't changed
- Test with MySQL client from Vercel logs

---

## ❓ FAQs

### Q: How do I reset the database?
**A:** 
```bash
cd backend
node setup-db.js
```

### Q: How do I change the initial balance (100000)?
**A:** Edit `backend/routes/auth.js` line 47:
```javascript
[uid, username, email, hashedPassword, phone, 50000, 'Customer']
// Change 50000 to your desired amount
```

### Q: Can I use a local MySQL instead of AIVEN?
**A:** Yes! Just change DB_HOST to `localhost` and use local credentials.

### Q: How do I add new roles (Manager, Admin)?
**A:** In registration form, add role dropdown instead of hardcoding 'Customer'.

### Q: Why is the balance showing as ???.??
**A:** Check balance value in database. Might be null or invalid type.

### Q: How do I extend token expiry beyond 24 hours?
**A:** Change JWT_EXPIRE in .env:
```env
JWT_EXPIRE=7d    # 7 days
JWT_EXPIRE=30d   # 30 days
```

### Q: Can logged-in users see each other's balance?
**A:** No - backend extracts username from JWT token, ensuring users can only see their own balance.

### Q: What happens to tokens after logout?
**A:** Frontend clears localStorage. Backend doesn't revoke token (expires automatically after 24h). For immediate revocation, implement token blacklist.

### Q: How do I enable email verification?
**A:** Add email service (Nodemailer, SendGrid):
1. Generate verification token
2. Send email with link
3. Verify before allowing login

### Q: Can I delete old user accounts?
**A:** Yes:
```bash
mysql -h <host> -u <user> -p kodbank
DELETE FROM KodUser WHERE username = 'old_user';
-- Deletes associated tokens automatically due to CASCADE
```

### Q: How do I monitor API usage?
**A:** Add logging middleware:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

---

## 🔧 Debug Mode

### Enable Console Logging

**Backend:**
Add to `server.js`:
```javascript
// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  next();
});
```

**Frontend:**
Add to `api.js`:
```javascript
apiClient.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

apiClient.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Error:', error);
  throw error;
});
```

### Check Database
```bash
mysql -h <host> -u <user> -p kodbank

# View all users
SELECT uid, username, email, balance, role FROM KodUser;

# View tokens
SELECT tid, uid, expiry FROM UserToken;

# View specific user
SELECT * FROM KodUser WHERE username = 'john_doe';
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Click on request
5. Check Status, Headers, Response

---

## 📞 Getting Help

1. **Check the logs:**
   - Backend: Console output
   - Frontend: Browser console (F12)
   - Database: AIVEN logs

2. **Test with CURL:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"test","password":"test"}'
   ```

3. **Simulate production locally:**
   ```bash
   NODE_ENV=production npm start
   ```

4. **Check everything is connected:**
   - Backend running? `http://localhost:5000/health`
   - Database connected? `node setup-db.js`
   - Frontend running? `http://localhost:3000`

---

## 🎯 Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| API 404 | Restart backend, check routes |
| CORS error | Update CORS_ORIGIN in .env |
| DB connection | Check AIVEN IP whitelist |
| Token invalid | Re-login, clear cookies |
| Port in use | Kill process or change port |
| Module not found | npm install |
| Token not stored | Check login response |
| Balance shows error | Verify DB connection |

---

**Still stuck?** 
- Re-read SETUP_GUIDE.md
- Check logs in console
- Test each endpoint with CURL
- Verify all credentials are correct
