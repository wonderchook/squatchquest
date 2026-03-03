#!/usr/bin/env node

// Bigfoot QR Code Image Generator using Gemini Imagen API
// Generates base illustrations using the correct API format

const fs = require('fs');
const path = require('path');
const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable not set');
    process.exit(1);
}

// Image generation data from AI_IMAGE_PROMPTS.md
const imagePrompts = [
    {
        id: 'hub',
        name: 'Main Bigfoot Hub',
        backgroundColor: '#D4A5D9',
        prompt: 'Bigfoot waving cheerfully with a mountain silhouette in the background, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '03',
        name: 'Bigfoot Treasures',
        backgroundColor: '#B8956A',
        prompt: 'Bigfoot peeking mischievously over the edge of an open treasure chest, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '04',
        name: 'Ewe & I Yarn Shop',
        backgroundColor: '#E8BABA',
        prompt: 'Bigfoot knitting with needles and yarn, with a friendly sheep standing beside him, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '05',
        name: 'Diversified Games',
        backgroundColor: '#4169E1',
        prompt: 'Bigfoot holding and admiring a large D20 die with joy, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '06',
        name: 'Spruce Beauty Shop',
        backgroundColor: '#008080',
        prompt: 'Bigfoot in a spa robe with pink hair curlers on head, admiring himself in a mirror, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    }
];

async function generateImageWithGemini(prompt, filename) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            "instances": [
                {
                    "prompt": prompt
                }
            ],
            "parameters": {
                "sampleCount": 1
            }
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            path: '/v1beta/models/imagen-4.0-generate-001:predict',
            method: 'POST',
            headers: {
                'x-goog-api-key': GEMINI_API_KEY,
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(responseData);
                    
                    if (response.error) {
                        reject(new Error(`API Error: ${response.error.message}`));
                        return;
                    }
                    
                    console.log('API Response structure:', JSON.stringify(response, null, 2));
                    
                    // The response structure might be different, let's log it to see
                    if (response.predictions && response.predictions[0]) {
                        const prediction = response.predictions[0];
                        
                        // Check different possible locations for the image data
                        if (prediction.bytesBase64Encoded) {
                            // Save base64 encoded image
                            const imageData = prediction.bytesBase64Encoded;
                            const buffer = Buffer.from(imageData, 'base64');
                            fs.writeFileSync(filename, buffer);
                            console.log(`✓ Generated: ${filename}`);
                            resolve();
                        } else {
                            reject(new Error('No image data found in response'));
                        }
                    } else {
                        reject(new Error('Unexpected response structure'));
                    }
                } catch (error) {
                    reject(new Error(`Failed to parse response: ${error.message}\nResponse: ${responseData}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Request failed: ${error.message}`));
        });

        req.write(data);
        req.end();
    });
}

async function testOneImage() {
    console.log('🎨 Testing Gemini Imagen API with one image...\n');
    
    // Create output directory if it doesn't exist
    const outputDir = './test_images';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    const testItem = imagePrompts[0]; // Hub image
    const filename = path.join(outputDir, `test-${testItem.id}.png`);
    
    console.log(`Testing: ${testItem.name}`);
    console.log(`Background: ${testItem.backgroundColor}`);
    console.log(`File: ${filename}\n`);
    
    try {
        await generateImageWithGemini(testItem.prompt, filename);
        console.log('🎉 Test successful! Image generated.');
    } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
        console.error('\nThis will help us debug the API response format.');
    }
}

// Run the test
if (require.main === module) {
    testOneImage().catch(console.error);
}

module.exports = { generateImageWithGemini, imagePrompts };