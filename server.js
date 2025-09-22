const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// CORS proxy endpoint
app.get('/api/proxy', async (req, res) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        console.log(`Proxying request to: ${url}`);

        // Make request to the target URL with proper headers
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 10000, // 10 second timeout
            maxRedirects: 5
        });

        console.log(`✅ Successfully fetched data for: ${url}`);
        console.log(`📊 Response status: ${response.status}, Content length: ${response.data.length} characters`);

        // Send the HTML content back to the client
        res.json({
            success: true,
            data: response.data,
            status: response.status,
            statusText: response.statusText
        });

    } catch (error) {
        console.error('Proxy error:', error.message);
        
        if (error.response) {
            // The request was made and the server responded with a status code
            res.status(error.response.status).json({
                success: false,
                error: `HTTP ${error.response.status}: ${error.response.statusText}`,
                status: error.response.status
            });
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({
                success: false,
                error: 'No response received from target server',
                details: error.message
            });
        } else {
            // Something happened in setting up the request
            res.status(500).json({
                success: false,
                error: 'Request setup failed',
                details: error.message
            });
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'CORS Proxy Server is running',
        timestamp: new Date().toISOString()
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 CORS Proxy Server is running at http://localhost:${PORT}`);
    console.log(`📝 Brain Test Game is available at http://localhost:${PORT}`);
    console.log(`🔧 Proxy endpoint: http://localhost:${PORT}/api/proxy?url=<target_url>`);
    console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 Server is shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👋 Server is shutting down gracefully...');
    process.exit(0);
});