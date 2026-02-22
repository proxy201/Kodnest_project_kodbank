# Kodbank AI Chatbot Setup Guide

## Overview
The Kodbank AI Chatbot is powered by Google Gemini API and provides users with instant assistance for banking-related queries.

## Features
- 💬 Real-time conversational AI
- 🤖 Context-aware responses about Kodbank
- 📱 Responsive floating chat widget
- 💾 Conversation history tracking
- 🎨 Beautiful, modern UI

## Setup Instructions

### 1. Get Your Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file (if it doesn't exist):
   ```bash
   copy .env.example .env
   ```

3. Open `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

The required package `@google/generative-ai` has already been installed. If you need to reinstall:

```bash
cd backend
npm install
```

### 4. Start the Application

Start both backend and frontend:

```bash
# In the backend directory
npm start

# In a new terminal, start the frontend
cd frontend
npm start
```

## Using the Chatbot

1. Look for the floating chat icon (💬) in the bottom-right corner of any page
2. Click the icon to open the chat window
3. Type your question about Kodbank and press Enter or click the send button
4. The AI assistant will respond with helpful information

## Example Questions

Users can ask questions like:
- "What is Kodbank?"
- "How do I check my balance?"
- "Is my account secure?"
- "What banking services do you offer?"
- "How do I register for an account?"
- "Can I view my transaction history?"

## Technical Details

### Backend API Endpoint
- **POST** `/api/chatbot/ask`
- **Request Body:**
  ```json
  {
    "message": "User's question",
    "conversationHistory": []
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "response": "AI assistant's response",
    "timestamp": "2026-02-22T10:30:00.000Z"
  }
  ```

### Frontend Component Location
- Component: `frontend/src/components/Chatbot.js`
- Styles: `frontend/src/styles/Chatbot.css`

## Customization

### Modify Chatbot Context
Edit the `KODBANK_CONTEXT` variable in `backend/routes/chatbot.js` to customize the assistant's knowledge about Kodbank.

### Styling
Modify `frontend/src/styles/Chatbot.css` to change colors, sizes, and animations.

### Position
The chatbot is positioned in the bottom-right corner by default. Change the position in `Chatbot.css`:
```css
.chatbot-container {
  bottom: 20px;  /* Change this */
  right: 20px;   /* Change this */
}
```

## Troubleshooting

### Chatbot not responding
1. Check that `GEMINI_API_KEY` is set in your `.env` file
2. Verify the backend server is running
3. Check browser console for errors
4. Ensure you have an active internet connection

### API Rate Limits
Google Gemini free tier has rate limits. If you exceed them:
- Wait a few minutes before trying again
- Consider upgrading to a paid plan for higher limits

### Error Messages
- "Gemini API key is not configured" - Add your API key to `.env`
- "Failed to generate response" - Check your API key validity and internet connection

## Security Notes

- Never commit your `.env` file to version control
- Keep your Gemini API key private
- The `.env` file is already in `.gitignore`
- Regenerate your API key if it's accidentally exposed

## API Costs

The Google Gemini API offers a generous free tier:
- Free tier includes many requests per day
- Check current pricing at [Google AI Pricing](https://ai.google.dev/pricing)

## Support

For issues or questions:
1. Check this documentation first
2. Review the troubleshooting section
3. Contact Kodbank support

---

**Note:** The chatbot is designed to answer Kodbank-related questions. For sensitive account-specific queries, users should contact support directly through secure channels.
