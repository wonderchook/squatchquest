#!/usr/bin/env node

// Bigfoot QR Code Image Generator using OpenAI DALL-E 3
// Generates all missing base illustrations with proper style matching

const fs = require('fs');
const path = require('path');
const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable not set');
    process.exit(1);
}

// Complete image generation data from AI_IMAGE_PROMPTS.md
const imagePrompts = [
    {
        id: 'hub',
        name: 'Main Bigfoot Hub',
        backgroundColor: '#D4A5D9',
        prompt: 'A friendly Bigfoot character waving cheerfully with a mountain silhouette in the background, warm friendly demeanor like the farmacy character, flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick brown outlines, cute mascot style with soft round shapes, warm brown fur, beige highlights, soft purple background, square format, designed as QR code background'
    },
    {
        id: '01',
        name: 'Nature Nurture Farmacy',
        backgroundColor: '#9CAF88',
        prompt: 'A friendly brown Bigfoot character sniffing a single large flower with curiosity, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, sage green background, square format, designed as QR code background'
    },
    {
        id: '02',
        name: 'Book and Brush',
        backgroundColor: '#7B68BB',
        prompt: 'A friendly brown Bigfoot character holding a large paintbrush in one hand and an open book in the other, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, purple background, square format, designed as QR code background'
    },
    {
        id: '03',
        name: 'Bigfoot Treasures',
        backgroundColor: '#B8956A',
        prompt: 'A friendly brown Bigfoot character peeking mischievously over the edge of an open treasure chest, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, warm brown background, square format, designed as QR code background'
    },
    {
        id: '04',
        name: 'Ewe & I Yarn Shop',
        backgroundColor: '#E8BABA',
        prompt: 'A friendly brown Bigfoot character knitting with needles and yarn, with a friendly sheep standing beside him, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, soft pink background, square format, designed as QR code background'
    },
    {
        id: '05',
        name: 'Diversified Games',
        backgroundColor: '#4169E1',
        prompt: 'A friendly brown Bigfoot character holding and admiring a large D20 die with joy, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, royal blue background, square format, designed as QR code background'
    },
    {
        id: '06',
        name: 'Spruce Beauty Shop',
        backgroundColor: '#008080',
        prompt: 'A friendly brown Bigfoot character in a spa robe with pink hair curlers on head, admiring himself in a mirror, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, teal background, square format, designed as QR code background'
    },
    {
        id: '07',
        name: 'NW Salmon Smokehouse',
        backgroundColor: '#FF8C00',
        prompt: 'A friendly brown Bigfoot character catching a large jumping salmon mid-air, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, deep orange background, square format, designed as QR code background'
    },
    {
        id: '08',
        name: 'JJ Nails',
        backgroundColor: '#FF1493',
        prompt: 'A friendly brown Bigfoot character admiring his brightly painted nails with delight and confidence, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, hot pink background, square format, designed as QR code background'
    },
    {
        id: '09',
        name: 'Royal Sushi & Teriyaki',
        backgroundColor: '#DC143C',
        prompt: 'A friendly brown Bigfoot character using chopsticks to eat a large piece of sushi with satisfaction, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, red background, square format, designed as QR code background'
    },
    {
        id: '10',
        name: 'Smiths Mercantile',
        backgroundColor: '#8B6F47',
        prompt: 'A friendly brown Bigfoot character wearing a cowboy hat and carrying shopping bags, ready for adventure, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, rustic brown background, square format, designed as QR code background'
    },
    {
        id: '11',
        name: 'Taqueria Lolita',
        backgroundColor: '#FF7F50',
        prompt: 'A friendly brown Bigfoot character taking a huge bite out of an oversized taco with gusto, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, bright orange background, square format, designed as QR code background'
    },
    {
        id: '12',
        name: 'Furniture World',
        backgroundColor: '#A0826D',
        prompt: 'A friendly brown Bigfoot character sinking contentedly into a small cozy couch that is comically too small for him, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, warm brown background, square format, designed as QR code background'
    },
    {
        id: '13',
        name: 'Doggie Designs',
        backgroundColor: '#FF9500',
        prompt: 'A friendly brown Bigfoot character petting a happy dog with hearts floating around them, same cute mascot style as farmacy reference with warm brown fur and beige highlights, flat vector illustration, bold simple shapes, minimal detail, thick brown outlines, soft round shapes, orange background, square format, designed as QR code background'
    }
];

async function generateImageWithDALLE(prompt, filename) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            style: "vivid"
        });

        const options = {
            hostname: 'api.openai.com',
            path: '/v1/images/generations',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
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
                    
                    if (response.data && response.data[0] && response.data[0].url) {
                        const imageUrl = response.data[0].url;
                        downloadImage(imageUrl, filename)
                            .then(() => {
                                console.log(`✓ Generated: ${filename}`);
                                resolve();
                            })
                            .catch(reject);
                    } else {
                        reject(new Error('No image URL in response'));
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

async function generateMissingImages() {
    console.log('🎨 Starting Bigfoot image generation with DALL-E 3...\n');
    
    // Create output directory if it doesn't exist
    const outputDir = './generated_images';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    // Check which images already exist
    const existingFiles = fs.existsSync(outputDir) ? fs.readdirSync(outputDir) : [];
    console.log('📋 Existing files:', existingFiles);
    
    for (let i = 0; i < imagePrompts.length; i++) {
        const item = imagePrompts[i];
        const filename = path.join(outputDir, `${item.id}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/--+/g, '-')}.png`);
        
        // Skip if file already exists
        if (fs.existsSync(filename)) {
            console.log(`⏭️  Skipping ${item.name} - already exists\n`);
            continue;
        }
        
        console.log(`Generating ${i + 1}/${imagePrompts.length}: ${item.name}`);
        console.log(`Background: ${item.backgroundColor}`);
        console.log(`File: ${filename}`);
        console.log(`Prompt: ${item.prompt.substring(0, 100)}...\n`);
        
        try {
            await generateImageWithDALLE(item.prompt, filename);
            
            // DALL-E 3 has rate limits, so pause longer between requests
            if (i < imagePrompts.length - 1) {
                console.log('⏸️  Pausing 65 seconds before next generation (DALL-E rate limit)...\n');
                await new Promise(resolve => setTimeout(resolve, 65000));
            }
        } catch (error) {
            console.error(`❌ Failed to generate ${item.name}: ${error.message}\n`);
            
            // If we hit rate limits, wait longer
            if (error.message.includes('rate limit') || error.message.includes('429')) {
                console.log('🚫 Rate limit hit, waiting 2 minutes before continuing...\n');
                await new Promise(resolve => setTimeout(resolve, 120000));
                i--; // Retry this image
            }
            // Continue with next image for other errors
        }
    }
    
    console.log('🎉 Image generation complete!');
    console.log(`📁 Check the ${outputDir} directory for your generated images.`);
}

// Single image test function
async function testSingleImage(imageIndex = 0) {
    console.log('🧪 Testing single image generation with DALL-E 3...\n');
    
    const outputDir = './test_images';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    const item = imagePrompts[imageIndex];
    const filename = path.join(outputDir, `dalle-test-${item.id}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`);
    
    console.log(`Testing: ${item.name}`);
    console.log(`Background: ${item.backgroundColor}`);
    console.log(`File: ${filename}\n`);
    
    try {
        await generateImageWithDALLE(item.prompt, filename);
        console.log('🎉 DALL-E test successful!');
    } catch (error) {
        console.error(`❌ DALL-E test failed: ${error.message}`);
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args[0] === 'test') {
        const imageIndex = args[1] ? parseInt(args[1]) : 0;
        testSingleImage(imageIndex).catch(console.error);
    } else if (args[0] === 'list') {
        console.log('Available images to generate:');
        imagePrompts.forEach((item, index) => {
            console.log(`${index}: ${item.id} - ${item.name} (${item.backgroundColor})`);
        });
    } else {
        generateMissingImages().catch(console.error);
    }
}

module.exports = { generateImageWithDALLE, downloadImage, imagePrompts, testSingleImage };