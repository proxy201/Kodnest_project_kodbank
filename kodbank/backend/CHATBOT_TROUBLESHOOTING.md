# Kodbank AI Chatbot - Troubleshooting Guide

## Current Status: ❌ Chatbot Not Working

**Issue**: Google Gemini API returning 404 errors for all model names
- Error: "models/{model_name} is not found for API version v1beta"

## Root Causes

Your current API key appears to have one of these issues:

1. **API key is invalid or expired**
2. **Gemini API is not enabled in the project**
3. **API key doesn't have proper permissions**
4. **Project quota has been exceeded**

## Solution Steps

### Step 1: Get a New/Valid Gemini API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"** or **"Create new secret key"**
3. Select your Google Cloud project (or create one)
4. Copy the generated API key

### Step 2: Verify the API Key Works

```bash
# Test the new API key with this script
cd backend
node test-gemini-models.js
```

### Step 3: Update Your .env File

```
GEMINI_API_KEY=your_new_api_key_here
```

### Step 4: Restart the Server

```bash
npm start
# or
node server.js
```

### Step 5: Test the Chatbot

```bash
curl -X POST http://localhost:5000/api/chatbot/ask \
  -H "Content-Type: application/json" \
  -d '{"message":"What is Kodbank?"}'
```

## Available Gemini Models

These models are typically available on the free tier:
- `gemini-pro` - Standard model
- `gemini-pro-vision` - With vision capabilities  
- `gemini-1.5-pro` - Latest high-performance
- `gemini-1.5-flash` - Faster, more efficient

## Current Environment

```
GEMINI_API_KEY_SET: Yes
API_KEY_WORKING: ❌ No (404 errors)
NODE_MODULES: ✅ Installed
BACKEND_SERVER: ✅ Running
CHATBOT_ROUTE: ✅ Configured
```

## Quick Fix Checklist

- [ ] Generate a new API key from aistudio.google.com
- [ ] Ensure you're signed into a Google account
- [ ] Check that the project has "Generative Language API" enabled
- [ ] Copy the full API key (including any special characters)
- [ ] Update .env with the new key
- [ ] Restart the backend server
- [ ] Test with a simple "hello" message

## Advanced Debugging

Enable detailed logging by updating `backend/routes/chatbot.js`:

```javascript
console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
console.log('API Key length:', process.env.GEMINI_API_KEY?.length);
console.log('Attempting model:', model.model);
```

## Support

If issues persist:
1. Check Google Cloud Console for billing and quotas
2. Verify API is enabled for the project
3. Try a fresh API key
4. Check network connectivity
5. Review Google's current API documentation

---

**Note**: The chatbot.js file is correctly configured to work with any valid Gemini API key once you update the environment variable.
