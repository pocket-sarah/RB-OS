// Configuration - Update these URLs after deploying to Render
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000' 
    : 'https://python-backend-api.onrender.com'; // Update with your Render URL

const PHP_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://php-cloudflared.onrender.com'; // Update with your Render URL

// Test Python API connection
async function testPythonAPI() {
    const statusDiv = document.getElementById('python-status');
    statusDiv.innerHTML = '<div class="status">Testing Python API...</div>';
    
    try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        
        statusDiv.innerHTML = `
            <div class="status success">
                ✅ Python API is running!
                <br>Response: ${data.message}
            </div>
        `;
    } catch (error) {
        statusDiv.innerHTML = `
            <div class="status error">
                ❌ Error connecting to Python API: ${error.message}
            </div>
        `;
    }
}

// Fetch data from Python backend
async function fetchPythonData() {
    const statusDiv = document.getElementById('python-status');
    const dataDiv = document.getElementById('python-data');
    
    statusDiv.innerHTML = '<div class="status">Fetching data...</div>';
    
    try {
        const response = await fetch(`${API_URL}/api/data`);
        const data = await response.json();
        
        statusDiv.innerHTML = '<div class="status success">✅ Data fetched successfully!</div>';
        dataDiv.style.display = 'block';
        dataDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        statusDiv.innerHTML = `
            <div class="status error">
                ❌ Error fetching data: ${error.message}
            </div>
        `;
    }
}

// Submit data to Python backend
async function submitData() {
    const input = document.getElementById('dataInput');
    const statusDiv = document.getElementById('submit-status');
    
    if (!input.value.trim()) {
        statusDiv.innerHTML = '<div class="status error">Please enter some data first!</div>';
        return;
    }
    
    statusDiv.innerHTML = '<div class="status">Submitting data...</div>';
    
    try {
        const response = await fetch(`${API_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: input.value,
                timestamp: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        
        statusDiv.innerHTML = `
            <div class="status success">
                ✅ Data submitted successfully!
                <br>Server response: ${data.message}
            </div>
        `;
        
        input.value = '';
    } catch (error) {
        statusDiv.innerHTML = `
            <div class="status error">
                ❌ Error submitting data: ${error.message}
            </div>
        `;
    }
}

// Test PHP service through Cloudflare tunnel
async function testPHPService() {
    const statusDiv = document.getElementById('php-status');
    const dataDiv = document.getElementById('php-data');
    
    statusDiv.innerHTML = '<div class="status">Testing PHP service...</div>';
    
    try {
        const response = await fetch(`${PHP_URL}/`);
        const data = await response.text();
        
        statusDiv.innerHTML = '<div class="status success">✅ PHP service is running!</div>';
        dataDiv.style.display = 'block';
        dataDiv.innerHTML = `<pre>${data}</pre>`;
    } catch (error) {
        statusDiv.innerHTML = `
            <div class="status error">
                ❌ Error connecting to PHP service: ${error.message}
                <br>Make sure the PHP service is deployed and the URL is correct.
            </div>
        `;
    }
}

// Show connection status on page load
window.addEventListener('load', () => {
    console.log('App loaded');
    console.log('API URL:', API_URL);
    console.log('PHP URL:', PHP_URL);
});
