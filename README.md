# 🧠 Brain Test Solutions

A modern, clean web application that fetches and displays solutions for Brain Test puzzle game levels. Built with a Node.js CORS proxy server to bypass browser restrictions and a beautiful, minimal frontend interface.

![Brain Test Solutions Demo](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18+-blue)

## ✨ Features

- 🎯 **Instant Solution Lookup** - Enter any Brain Test level number to get the answer
- 🚀 **Modern UI/UX** - Clean, minimal, and aesthetic design
- 🔧 **CORS Proxy Server** - Built-in Node.js server to handle cross-origin requests
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⚡ **Fast Performance** - Quick loading with smooth animations
- 🛡️ **Error Handling** - Comprehensive error messages and fallback mechanisms
- 🎨 **Beautiful Cards** - Styled success and error cards with proper visual feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed on your system
- npm (comes with Node.js)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/zenithkandel/brain-test-game-answer-key.git
   cd brain-test-game-answer-key
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

That's it! 🎉

## 🛠️ Usage

1. **Enter a level number** in the input field (e.g., 263, 150, 420)
2. **Click "Consult"** or press Enter
3. **View the solution** in a beautiful card format

### Example Levels to Try
- Level 1: "Tap the largest animal"
- Level 263: "First tap on the turtle's face to send him in his shell then drag the shell to attack the snake"
- Level 150: "Move the car to reveal the key"

## 🏗️ Project Structure

```
brain-test-game/
├── 📄 index.html          # Main HTML file
├── 🎨 style.css           # Modern CSS styling
├── ⚡ script.js           # Frontend JavaScript
├── 🚀 server.js           # Node.js CORS proxy server
├── 📦 package.json        # Project configuration & dependencies
└── 📚 README.md           # This file
```

## 🔧 Technical Details

### Frontend
- **HTML5** - Semantic, accessible markup
- **CSS3** - Modern styling with CSS Grid/Flexbox, animations, and responsive design
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **Inter Font** - Clean, modern typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework for the server
- **Axios** - HTTP client for making requests
- **CORS** - Cross-Origin Resource Sharing middleware

### Architecture
```
Browser → Frontend (HTML/CSS/JS) → Node.js Server → DazePuzzle.com → Response Chain
```

## 🚦 API Endpoints

The server exposes the following endpoints:

### `GET /api/proxy`
Proxies requests to external websites to bypass CORS restrictions.

**Parameters:**
- `url` (required) - The target URL to fetch

**Example:**
```
GET /api/proxy?url=https://dazepuzzle.com/brain-test-level-263/
```

### `GET /api/health`
Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "OK",
  "message": "CORS Proxy Server is running",
  "timestamp": "2025-09-16T07:39:12.823Z"
}
```

### `GET /`
Serves the main application interface.

## ⚙️ Configuration

### Environment Variables
No environment variables required - the app works out of the box!

### Port Configuration
Default port is `3000`. You can modify this in `server.js`:

```javascript
const PORT = 3000; // Change this to your desired port
```

## 🎨 Customization

### Styling
The app uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary: #3b82f6;        /* Primary blue color */
    --success: #10b981;        /* Success green color */
    --error: #ef4444;          /* Error red color */
    --text-primary: #1f2937;   /* Main text color */
    /* ... more variables */
}
```

### Adding New Features
1. **Frontend changes** - Modify `script.js` and `style.css`
2. **Backend changes** - Update `server.js`
3. **New endpoints** - Add routes in the Express app

## 🐛 Troubleshooting

### Common Issues

**❌ Server won't start**
- Check if port 3000 is already in use
- Run `npm install` to ensure dependencies are installed

**❌ "Connection Error" message**
- Make sure the Node.js server is running (`npm start`)
- Check that you're accessing `localhost:3000`, not just opening the HTML file

**❌ Solutions not loading**
- Check your internet connection
- The target website (DazePuzzle) might be temporarily down
- Check browser console for error messages

### Debug Mode
Enable detailed logging by checking the browser console (F12) and server terminal output.

## 📝 Scripts

```bash
npm start       # Start the production server
npm run dev     # Start with nodemon for development (auto-restart)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DazePuzzle.com](https://dazepuzzle.com) - Source of Brain Test solutions
- [Inter Font](https://rsms.me/inter/) - Beautiful typography
- [Express.js](https://expressjs.com/) - Fast web framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Look at existing issues in the repository
3. Create a new issue with detailed information

---

**Made with ❤️ by [zenithkandel](https://github.com/zenithkandel)**

*Happy puzzle solving! 🧩*