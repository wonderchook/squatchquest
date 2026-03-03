# PNW Wilds Market Street Adventure - Setup Instructions

**Bigfoot-Themed QR Scavenger Hunt**
Downtown Chehalis, March 7, 2026
Benefiting Nature Nurture Farmacy & Lewis County Historical Museum

---

## What's In This Package

This scavenger hunt kit contains everything you need to run a successful event:

- **scavenger_hunt_app.html** - Interactive web app with QR scanner and trivia questions
- **participant_card.pdf** - 2-page printable card for participants (includes instructions and tracking sheet)
- **ALL_QR_SIGNS_COMBINED.pdf** - All 13 signs in one PDF for reference
- **qr_sign_[1-13].pdf** - Individual sign PDFs (one per stop location)
- **qr_codes_standalone** folder - QR code images for custom printing or signage
- **art_qr_codes** folder - Decorated QR code versions with Bigfoot/forest themes
- **AI_IMAGE_PROMPTS.md** - Prompts used to generate promotional images

---

## Step 1: Host the Web App

The scavenger hunt uses a single HTML file (`scavenger_hunt_app.html`) that participants access via QR codes or direct link.

### Easiest Option: Netlify Drop
1. Visit [netlify.com/drop](https://netlify.com/drop)
2. Drag and drop `scavenger_hunt_app.html` onto the page
3. Netlify creates a free hosting link instantly
4. Your hunt will be live at something like `https://xxxxx.netlify.app/`

### Alternative: GitHub Pages
1. Create a GitHub repository
2. Upload `scavenger_hunt_app.html` to the repo
3. Go to Settings > Pages > Deploy from a branch
4. Select main branch and save
5. Your site will be at `https://yourusername.github.io/repo-name/scavenger_hunt_app.html`

### Alternative: Ask Someone to Host
If you don't have technical resources, reach out to:
- Local IT professionals
- Web design students
- Library technology programs
- Community center tech teams

They can host the HTML file on any basic web server.

---

## Step 2: Update QR Codes

**Important:** The QR codes in this package point to a placeholder URL: `https://yoursite.com/hunt.html?stop=1`

You need to regenerate them with your actual hosting URL.

### How to Update QR Codes:

1. Note your actual hosting URL (from Step 1). Example: `https://xxxxx.netlify.app/scavenger_hunt_app.html`

2. For each stop (1-13), you'll need a URL like:
   - `https://xxxxx.netlify.app/scavenger_hunt_app.html?stop=1`
   - `https://xxxxx.netlify.app/scavenger_hunt_app.html?stop=2`
   - etc.

3. Use [QR Code Monkey](https://www.qrcode-monkey.com/) or [QR Code Generator](https://www.qr-code-generator.com/):
   - Paste each URL into the generator
   - Download the QR code image as PNG
   - Save as `qr_code_stop_[1-13].png`

4. Print the updated QR codes on half-page cardstock (5.5" x 8.5") and laminate

**Tip:** You can automate this with a script if you're tech-savvy, but manual regeneration takes about 15-20 minutes.

---

## Step 3: Print Materials

### Participant Cards
- **Format:** 2-page printable PDF (participant_card.pdf)
- **Quantity:** 40-50 copies minimum
- **Paper:** Cardstock (65-110 lb) for durability
- **Print Settings:**
  - Color (full color recommended for visibility)
  - Double-sided printing
  - Scale to fit page
- **Post-Print:** Laminate with 3-mil laminate sheets for weather resistance
- **Binding:** Punch corner and add brass fastener OR comb binding

### QR Signs for Businesses
- **Format:** Half-page (5.5" x 8.5" when printed on 8.5" x 11" paper)
- **Quantity:** One per business location (13 total)
- **Files to Use:** `qr_sign_[1-13].pdf` (includes business name, Bigfoot facts, and QR code)
- **Paper:** Cardstock or waterproof poster paper
- **Lamination:** Required - 3-mil laminate for outdoor durability
- **Display:** Window or door mount with suction cups or double-sided tape

**Print Checklist:**
- [ ] Participant cards printed, laminated, bound
- [ ] All 13 QR signs printed with updated codes
- [ ] Laminated and ready for delivery
- [ ] Assembled in labeled folders by business

---

## Step 4: Day-of Setup

### Before Event Day (1-2 weeks prior)
- [ ] Confirm with all 13 business owners that they'll display signs
- [ ] Deliver laminated QR signs to each location
- [ ] Request they place signs in visible window/door area
- [ ] Confirm the web app is working and loading correctly
- [ ] Test the QR codes with a phone to ensure they link correctly

### Day-of Setup (Morning of March 7)
- [ ] Arrive 1-2 hours before event start
- [ ] Walk to each of the 13 stops and verify signs are posted
- [ ] Check that QR codes are scannable (clean off any moisture)
- [ ] Test scanning 2-3 codes with a smartphone to confirm functionality
- [ ] Set up participant check-in table with supplies:
  - Laminated participant cards
  - Pens or pencils
  - Contact info cards
  - Prize drawing entry forms

### During Event
1. **Check-In:** Hand each participant a laminated card and explain the hunt
2. **Explain the Rules:**
   - Visit all 13 stops in Downtown Chehalis
   - At each stop, scan the QR code with a phone
   - Answer the Bigfoot trivia question correctly
   - The app tracks progress (can show partially completed screen)
   - Return completed card for prize drawing
3. **Support:** Have a coordinator with a phone available for troubleshooting QR scans
4. **Prize Drawings:** Pull names from completed cards for local business gift certificates

---

## The 13 Stops & Trivia Questions

All questions are Bigfoot/nature themed and tied to each business's vibe.

### Stop 1: Nature Nurture Farmacy
**Question:** What's the best remedy for poison oak according to holistic practitioners?

A) Essential oils & oatmeal bath
B) Ice and antihistamine
C) Bleach and vinegar
D) Ignore it and let it heal

**Correct Answer:** A) Essential oils & oatmeal bath

---

### Stop 2: Book and Brush
**Question:** If Bigfoot were a painter, what style would he channel?

A) Abstract expressionism
B) Hyperrealism
C) Bob Ross style (happy little trees)
D) Cubism

**Correct Answer:** C) Bob Ross style (happy little trees)

---

### Stop 3: Bigfoot Treasures
**Question:** If you found Bigfoot's most prized possession, what would it be?

A) A collection of abandoned human watches
B) The world's softest pine cone
C) A plaster cast of their own footprint
D) A signed photo from the Patterson-Gimlin film

**Correct Answer:** C) A plaster cast of their own footprint

---

### Stop 4: Ewe & I
**Question:** According to the yarn shop owner's dreams, how many skeins exist in their ideal collection?

A) 42 skeins and a nightmare
B) Infinitely many
C) 87 skeins and a dream
D) 13 skeins and silence

**Correct Answer:** C) 87 skeins and a dream

---

### Stop 5: Diversified Games
**Question:** What's the favorite board game for creatures who prefer to stay hidden?

A) Hide & Seek Championship Edition
B) Risk
C) Uno
D) Monopoly

**Correct Answer:** A) Hide & Seek Championship Edition

---

### Stop 6: Spruce
**Question:** What signature spa treatment does Spruce offer for sasquatches?

A) The Forest Floor Mud Wrap
B) Sasquatch Special deep conditioning
C) The Bigfoot Soak
D) Claw Maintenance Deluxe

**Correct Answer:** B) Sasquatch Special deep conditioning

---

### Stop 7: NW Salmon Smokehouse
**Question:** How many pounds of salmon did the smokehouse use last season?

A) 23 pounds
B) 47 pounds
C) 156 pounds
D) Over 9,000 pounds

**Correct Answer:** B) 47 pounds

---

### Stop 8: JJ Nails
**Question:** How many nails did Bigfoot ask for in the last appointment?

A) 10 nails (hands only, friend)
B) 20 nails (hands AND feet)
C) 8 nails (claws don't count)
D) 50 nails (never stops growing)

**Correct Answer:** B) 20 nails (hands AND feet)

---

### Stop 9: Royal Sushi
**Question:** What's the name of Royal Sushi's signature roll inspired by forest adventures?

A) The Wilderness Roll
B) The Sasquatch Supreme
C) The Hidden Valley Roll
D) Forest Crunch Roll

**Correct Answer:** D) Forest Crunch Roll

---

### Stop 10: Smith's Mercantile
**Question:** If you could grab anything from Smith's Mercantile to prove your Bigfoot sighting, what would it be?

A) A field guide to cryptids
B) Binoculars and a camera
C) Hiking boots
D) I Believe Bigfoot t-shirt

**Correct Answer:** D) I Believe Bigfoot t-shirt

---

### Stop 11: Taqueria Lolita
**Question:** What's Bigfoot's reaction to authentic tacos at Taqueria Lolita?

A) "Finally, some forest greens!"
B) "These spices mask the human smell"
C) "Why is everything so small?"
D) All of the above

**Correct Answer:** D) All of the above

---

### Stop 12: Furniture World
**Question:** If Bigfoot wanted to upgrade their cave furniture, what would be essential?

A) Ergonomic desk chair
B) Adjustable shelving
C) Extra-long couch
D) Bean bag chair (larger size)

**Correct Answer:** C) Extra-long couch

---

### Stop 13: Doggie Designs
**Question:** What grooming style would Bigfoot request at Doggie Designs?

A) Full spa treatment with aromatherapy
B) Trim and tidy with nail polish
C) Mud bath special
D) Just a bath

**Correct Answer:** D) Just a bath

---

## Customization Tips

### Change the Trivia Questions
1. Edit the questions directly in `scavenger_hunt_app.html`
2. Find the section marked `// TRIVIA DATA` in the HTML
3. Update question text, answer options, and correct answer index
4. Save the file and re-upload to your hosting

### Add or Remove Businesses
1. To add a stop: Duplicate a QR sign template, update business name and question
2. To remove a stop: Delete the corresponding question from the app and remove the PDF
3. Update participant cards to reflect new number of stops
4. Regenerate QR codes for all affected stops

### Change Colors
1. Open `scavenger_hunt_app.html` in a text editor
2. Find the `<style>` section
3. Look for color codes (e.g., `#2d5016` for forest green)
4. Change hex codes to your preferred colors:
   - Primary color (greens/browns work best for Bigfoot theme)
   - Accent colors for buttons and highlights
5. Save and re-upload

### Branding & Logos
- Add your organization's logo to the top of the HTML app
- Include logos on participant cards
- Add QR code link to your website's event page in the app footer

---

## Additional Resources

- **QR Code Generator:** [qrcode-monkey.com](https://www.qrcode-monkey.com/)
- **Free Hosting:** [netlify.com](https://netlify.com)
- **Image Generation (for promotional materials):** Use AI tools like Midjourney, DALL-E, or Stable Diffusion
- **Lamination:** Office supply stores (Staples, Office Depot) offer laminating services if you don't have equipment

---

**Created for PNW Wilds 2026**
**Downtown Chehalis, March 7, 2026**
**Benefiting Nature Nurture Farmacy & Lewis County Historical Museum**

For questions or support, contact your event organizer.
