# Blog Generator Testing Guide

## Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 2. Access the Blog Generator

1. Navigate to: `http://localhost:3000/admin/blog-generator`
2. You'll be redirected to the login page if not authenticated
3. Login with your admin credentials (check your database for existing users)

### 3. Test Scenarios

## Test Scenario 1: Basic Blog Generation (No Images)

**Steps:**
1. Fill in the form:
   - **Blog Topic**: "Your Rights When Arrested in Kent"
   - **Primary SEO Keyword**: "duty solicitor Kent"
   - **Secondary Keywords**: "police station solicitor, PACE rights"
   - **Target Location**: "Kent"
   - **Category**: "Police Station Advice"
   - **Content Length**: "Optimal"
   - ✅ Check "Include FAQ Section"
   - ✅ Check "Include Internal Links"
   - ❌ Leave "Insert Images into Content" unchecked

2. **Image Source**: Select "External URL" (leave empty for this test)

3. Click **"Generate Blog Post"**

4. **Verify:**
   - Preview appears on the right side
   - Content is generated (AI or fallback)
   - Meta title is ≤ 60 characters
   - Meta description is ≤ 155 characters
   - FAQs are included (if checked)
   - Internal links are included (if checked)

## Test Scenario 2: Blog Generation with Image URL

**Steps:**
1. Fill in the form (same as Scenario 1)

2. **Image Options:**
   - **Image Source**: "External URL"
   - Add image URL: `/blog-images/blog-listing-0.jpg` (or any valid image URL)
   - Select "Featured" radio button for the image
   - ✅ Check "Insert Images into Content"

3. Click **"Generate Blog Post"**

4. **Verify:**
   - Featured image appears in preview
   - Image is inserted at the top of content HTML (if "Insert Images into Content" is checked)
   - Image URL is in the response (`image` and `imageUrls` fields)
   - Schema includes image reference

## Test Scenario 3: Blog Generation with Uploaded Image

**Steps:**
1. Fill in the form

2. **Image Options:**
   - **Image Source**: "Upload from Device"
   - Click file input and select an image file
   - Select "Featured" radio button
   - ✅ Check "Insert Images into Content"

3. Click **"Generate Blog Post"**

4. **Verify:**
   - Image is uploaded to `public/blog-images/` directory
   - Image filename follows pattern: `{slug}-{index}.{ext}`
   - Image appears in preview
   - Image is inserted into content HTML
   - Image is accessible at `/blog-images/{filename}`

## Test Scenario 4: Publish and View Blog Post

**Steps:**
1. Generate a blog post (any scenario above)

2. Click **"Publish"** button

3. **Verify:**
   - Success message appears
   - Published URL is shown (e.g., `/blog/{slug}`)

4. Navigate to the published URL

5. **Verify on Published Page:**
   - Blog post title displays correctly
   - Featured image appears in hero section (if provided)
   - Content displays with proper formatting
   - Images in content are visible (if inserted)
   - Advert block appears at bottom
   - Meta tags are correct (check page source)

## Test Scenario 5: Test Bug Fixes (Character Limits)

**Steps:**
1. Use a very long topic: "Understanding Your Complete Rights and Legal Representation Options When Dealing with Police Station Interviews and Criminal Investigations in Kent"

2. Use a very long location: "Medway, Maidstone, Canterbury, Gravesend, and All Surrounding Areas"

3. Generate blog post

4. **Verify:**
   - Meta title fallback is truncated to 60 characters
   - Meta description fallback is truncated to 155 characters
   - Primary keyword is included in fallback meta descriptions

## Test Scenario 6: Test with AI Disabled (Fallback Content)

**Steps:**
1. Remove or comment out `OPENAI_API_KEY` in `.env.local`

2. Generate a blog post

3. **Verify:**
   - Fallback content is generated
   - Meta title includes `primaryKeyword` (not just `topic`)
   - Meta description includes `primaryKeyword`
   - All character limits are respected
   - Content is still useful and formatted correctly

## Test Scenario 7: Test Image Insertion Toggle

**Steps:**
1. Add an image URL

2. Generate blog post **WITHOUT** "Insert Images into Content" checked
   - Verify: Image is NOT in content HTML, but is in `image` field

3. Generate blog post **WITH** "Insert Images into Content" checked
   - Verify: Image IS in content HTML at the top

## API Testing (Direct)

You can also test the API directly:

```bash
# Test with curl
curl -X POST http://localhost:3000/api/admin/generate-blog \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-session=your-session-cookie" \
  -d '{
    "topic": "Test Blog Post",
    "primaryKeyword": "test keyword",
    "location": "Kent",
    "category": "police-station-advice",
    "seoLength": "short",
    "includeFAQ": true,
    "includeInternalLinks": true,
    "imageSource": "url",
    "imageUrls": ["/blog-images/blog-listing-0.jpg"],
    "featuredImageIndex": 0,
    "includeInContentImages": true
  }'
```

## Checklist for Complete Testing

- [ ] Basic blog generation works
- [ ] Images can be added via URL
- [ ] Images can be uploaded
- [ ] Images appear in preview
- [ ] Images are inserted into content when option is checked
- [ ] Images are NOT inserted when option is unchecked
- [ ] Featured image appears on published blog post
- [ ] Meta title respects 60 character limit
- [ ] Meta description respects 155 character limit
- [ ] Primary keyword is included in all meta descriptions
- [ ] FAQs are generated when requested
- [ ] Internal links are included when requested
- [ ] Schema/JSON-LD is generated correctly
- [ ] Blog post can be published
- [ ] Published blog post displays correctly
- [ ] Fallback content works when AI is unavailable
- [ ] Character limits work with long topics/locations

## Troubleshooting

### Can't Access Blog Generator
- Check if you're logged in: Go to `/admin/login` first
- Check browser console for errors
- Verify admin session cookie exists

### Images Not Showing
- Check browser console for 404 errors
- Verify image path is correct (should start with `/blog-images/`)
- Check that `public/blog-images/` directory exists
- Verify image file was actually uploaded/saved

### AI Generation Not Working
- Check `.env.local` has `OPENAI_API_KEY` set
- Check server console for API errors
- Fallback content should still work

### Character Limit Issues
- Check meta title/description in page source
- Verify truncation is working in API response
- Test with very long input values

## Expected File Structure

```
public/
  blog-images/
    {slug}-1.jpg    # Uploaded images
    {slug}-2.png
    blog-listing-0.jpg  # Existing images
```

## Database Verification

After publishing, check the database:

```sql
SELECT title, slug, meta_title, meta_description, image 
FROM blog_posts 
ORDER BY created_at DESC 
LIMIT 1;
```

Verify:
- `meta_title` ≤ 60 characters
- `meta_description` ≤ 155 characters
- `image` field contains image path (if provided)
- `schema_json` contains valid JSON-LD










