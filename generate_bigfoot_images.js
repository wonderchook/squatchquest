#!/usr/bin/env node

// Bigfoot QR Code Image Generator using Gemini API
// Generates base illustrations and QR-integrated versions

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
    },
    {
        id: '07',
        name: 'NW Salmon Smokehouse',
        backgroundColor: '#FF8C00',
        prompt: 'Bigfoot catching a large jumping salmon mid-air, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '08',
        name: 'JJ Nails',
        backgroundColor: '#FF1493',
        prompt: 'Bigfoot admiring his brightly painted nails with delight and confidence, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '09',
        name: 'Royal Sushi & Teriyaki',
        backgroundColor: '#DC143C',
        prompt: 'Bigfoot using chopsticks to eat a large piece of sushi with satisfaction, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '10',
        name: 'Smith\'s Mercantile',
        backgroundColor: '#8B6F47',
        prompt: 'Bigfoot wearing a cowboy hat and carrying shopping bags, ready for adventure, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '11',
        name: 'Taqueria Lolita',
        backgroundColor: '#FF7F50',
        prompt: 'Bigfoot taking a huge bite out of an oversized taco with gusto, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '12',
        name: 'Furniture World',
        backgroundColor: '#A0826D',
        prompt: 'Bigfoot sinking contentedly into a small cozy couch that\'s comically too small for him, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    },
    {
        id: '13',
        name: 'Doggie Designs',
        backgroundColor: '#FF9500',
        prompt: 'Bigfoot petting a happy dog with hearts floating around them, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, 1080x1080 pixels, square format, only 2-3 colors, designed to work as a QR code background'
    }
];

async function generateImageWithGemini(prompt, filename) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1beta/models/imagen-3.0-generate-001:generateImage?key=${GEMINI_API_KEY}`,
            method: 'POST',
            headers: {
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
                    console.log('Raw API response:', responseData);
                    const response = JSON.parse(responseData);
                    
                    if (response.error) {
                        reject(new Error(`API Error: ${response.error.message}`));
                        return;
                    }
                    
                    // Handle different possible response structures
                    if (response.candidates && response.candidates[0] && response.candidates[0].content) {
                        // New API structure with inline base64 data
                        const candidate = response.candidates[0];
                        if (candidate.content.parts && candidate.content.parts[0] && candidate.content.parts[0].inlineData) {
                            const imageData = candidate.content.parts[0].inlineData.data;
                            const buffer = Buffer.from(imageData, 'base64');
                            fs.writeFileSync(filename, buffer);
                            console.log(`✓ Generated: ${filename}`);
                            resolve();
                        } else {
                            reject(new Error('No image data found in candidate'));
                        }
                    } else if (response.generatedImages && response.generatedImages[0]) {
                        // Alternative structure with URL
                        const imageUrl = response.generatedImages[0].url || response.generatedImages[0].uri;
                        if (imageUrl) {
                            return downloadImage(imageUrl, filename)
                                .then(() => {
                                    console.log(`✓ Generated: ${filename}`);
                                    resolve();
                                })
                                .catch(reject);
                        } else {
                            reject(new Error('No URL in generated images'));
                        }
                    } else {
                        reject(new Error(`Unexpected response structure: ${JSON.stringify(response, null, 2)}`));
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

async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        
        https.get(url, (response) => {
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                resolve();
            });
            
            file.on('error', (error) => {
                fs.unlink(filename, () => {}); // Delete partial file
                reject(error);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function generateAllImages() {
    console.log('🎨 Starting Bigfoot image generation with Gemini API...\n');
    
    // Create output directory if it doesn't exist
    const outputDir = './generated_images';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    for (let i = 0; i < imagePrompts.length; i++) {
        const item = imagePrompts[i];
        const filename = path.join(outputDir, `${item.id}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`);
        
        console.log(`Generating ${i + 1}/${imagePrompts.length}: ${item.name}`);
        console.log(`Background: ${item.backgroundColor}`);
        console.log(`File: ${filename}\n`);
        
        try {
            await generateImageWithGemini(item.prompt, filename);
            
            // Brief pause between requests to be nice to the API
            if (i < imagePrompts.length - 1) {
                console.log('⏸️  Pausing 2 seconds before next generation...\n');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch (error) {
            console.error(`❌ Failed to generate ${item.name}: ${error.message}\n`);
            continue; // Continue with next image instead of stopping
        }
    }
    
    console.log('🎉 Image generation complete!');
    console.log(`📁 Check the ${outputDir} directory for your generated images.`);
    console.log('\n📋 Next steps:');
    console.log('1. Review generated images for quality');
    console.log('2. Generate QR codes with URLs');
    console.log('3. Composite images with QR codes');
    console.log('4. Create final signage PDFs');
}

// Run the generator
if (require.main === module) {
    generateAllImages().catch(console.error);
}

module.exports = { generateImageWithGemini, downloadImage, imagePrompts };