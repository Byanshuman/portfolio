# Image Integration Steps for Your Portfolio

## Your Uploaded Image
**File Name:** `BeautyPlus_20221208160141438_save.jpg`
**Location:** `/images/`
**Size:** 1.02 MB
**Description:** Professional profile photo with green background

---

## Step 1: Edit index.html

You need to add the profile image to the About section.

### Location to Find in index.html:
Search for this text in your index.html:
```html
<div class="about-text">
<div class="mission-statement">
```

### Code to Add (RIGHT BEFORE the above):
Add this line BEFORE `<div class="about-text">` (or as a sibling inside `<div class="about-content">`):

```html
<img src="images/BeautyPlus_20221208160141438_save.jpg" alt="Anshuman Yadav - HR Professional" class="profile-image">
```

### Better Option - Rename Image First:
For cleaner code, rename your image to:
- `profile.jpg`

Then use:
```html
<img src="images/profile.jpg" alt="Anshuman Yadav - HR Professional" class="profile-image">
```

---

## Step 2: Add CSS Styling to styles.css

Add these styles to your `styles.css` file:

```css
/* Profile Image Styling */
.profile-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-image {
    width: 180px;
    height: 180px;
  }
}
```

---

## Step 3: Verify on Live Website

After making changes:
1. Commit the changes to GitHub
2. Your site will auto-deploy (GitHub Pages)
3. Visit: `https://byanshuman.github.io/Professional-Portfolio-Website/`
4. Scroll to About section and check if profile image appears

---

## File Placement Summary

```
Project Root/
├── images/
│   ├── BeautyPlus_20221208160141438_save.jpg  (Your profile photo)
│   ├── DSC_3200.jpg                           (Your second image)
│   └── profile/
│       └── .gitkeep
├── index.html                                  (Edit to add <img> tag)
├── styles.css                                  (Edit to add CSS)
└── ...
```

---

## Alternative: Use Both Images

If you want to use `DSC_3200.jpg` as hero background:

### In index.html (hero section):
```html
<section id="home" class="hero" style="background-image: url('images/DSC_3200.jpg');">
```

### In styles.css:
```css
.hero {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .hero {
    background-attachment: scroll;
  }
}
```

---

## Quick Reference

✅ Images uploaded to `/images/` folder
✅ Created `/images/profile/` subfolder
📝 Next: Add HTML img tag to index.html
🎨 Then: Add CSS styling to styles.css
✔️ Finally: Commit and deploy

---

## Need Help?

Refer to `IMAGES_INTEGRATION_GUIDE.md` for:
- More detailed examples
- Image optimization tips
- Responsive design patterns
- SEO best practices
