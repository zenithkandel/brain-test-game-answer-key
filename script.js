document.addEventListener('DOMContentLoaded', () => {
    const levelInput = document.getElementById('levelInput');
    const searchButton = document.getElementById('searchButton');
    const solutionDiv = document.getElementById('solution');
    const loadingMessage = document.getElementById('loadingMessage');

    searchButton.addEventListener('click', fetchSolution);
    levelInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchSolution();
        }
    });

    async function fetchSolution() {
        const levelNumber = levelInput.value;
        if (!levelNumber) {
            alert("Please enter a level number.");
            return;
        }

        loadingMessage.classList.remove('hidden');
        solutionDiv.classList.add('hidden');
        solutionDiv.innerHTML = '';

        try {
            // Use our local Node.js CORS proxy server
            const targetUrl = `https://dazepuzzle.com/brain-test-level-${levelNumber}/`;
            const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;

            console.log(`Fetching solution for level ${levelNumber}...`);

            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch data from proxy');
            }

            // Parse the HTML content
            const parser = new DOMParser();
            const doc = parser.parseFromString(result.data, 'text/html');

            const answerElement = doc.querySelector("body > main > section.cr-post-content > div > div > div > div > blockquote > p > strong");
            
            if (answerElement && answerElement.innerText.trim()) {
                const answerText = answerElement.innerText.trim();
                solutionDiv.innerHTML = `
                    <div class="answer-card">
                        <h3>🧠 Brain Test Level ${levelNumber}</h3>
                        <p><strong>Answer:</strong> ${answerText}</p>
                    </div>
                `;
            } else {
                // Try alternative selectors if the main one fails
                const altSelectors = [
                    "blockquote p strong",
                    "blockquote strong",
                    ".answer strong",
                    "strong"
                ];
                
                let found = false;
                for (const selector of altSelectors) {
                    const element = doc.querySelector(selector);
                    if (element && element.innerText.trim()) {
                        const answerText = element.innerText.trim();
                        solutionDiv.innerHTML = `
                            <div class="answer-card">
                                <h3>🧠 Brain Test Level ${levelNumber}</h3>
                                <p><strong>Answer:</strong> ${answerText}</p>
                            </div>
                        `;
                        found = true;
                        break;
                    }
                }
                
                if (!found) {
                    solutionDiv.innerHTML = `
                        <div class="error-card">
                            <h3>❌ Solution Not Found</h3>
                            <p>Could not find the solution for Brain Test level ${levelNumber}.</p>
                            <p>Please verify the level number is correct.</p>
                        </div>
                    `;
                }
            }

        } catch (error) {
            console.error("Failed to fetch solution:", error);
            
            // Provide specific error messages based on error type
            let errorMessage = '';
            let errorTitle = '';
            
            if (error.message.includes('Failed to fetch')) {
                errorTitle = '🔌 Connection Error';
                errorMessage = 'Unable to connect to the server. Make sure the Node.js server is running on port 3000.';
            } else if (error.message.includes('HTTP error! status: 404')) {
                errorTitle = '❓ Level Not Found';
                errorMessage = `Brain Test level ${levelNumber} was not found. Please check the level number.`;
            } else if (error.message.includes('HTTP error! status: 500')) {
                errorTitle = '⚠️ Server Error';
                errorMessage = 'The server encountered an error while fetching the solution. Please try again.';
            } else {
                errorTitle = '❌ Error';
                errorMessage = `Failed to fetch solution for level ${levelNumber}. Please try again later.`;
            }
            
            solutionDiv.innerHTML = `
                <div class="error-card">
                    <h3>${errorTitle}</h3>
                    <p>${errorMessage}</p>
                    <p><small>Error details: ${error.message}</small></p>
                </div>
            `;
        } finally {
            loadingMessage.classList.add('hidden');
            solutionDiv.classList.remove('hidden');
        }
    }


});