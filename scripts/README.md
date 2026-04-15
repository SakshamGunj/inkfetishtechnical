# ImageKit Bulk Upload Script

This script uploads images from the `(Bulk 1) of participation` folder to ImageKit and updates the CSV file with the generated URLs.

## Setup Instructions

### 1. Get ImageKit API Credentials

1. Go to [ImageKit.io](https://imagekit.io) and sign up for an account
2. Navigate to your dashboard
3. Go to Developer → API Keys
4. Copy your:
   - **Public Key**
   - **Private Key**
   - **URL Endpoint** (looks like `https://ik.imagekit.io/your_imagekit_id`)

### 2. Environment Variables

Create a `.env` file in the root directory with your ImageKit credentials:

```bash
# ImageKit Configuration
VITE_IMAGEKIT_PUBLIC_KEY=your_actual_public_key_here
VITE_IMAGEKIT_PRIVATE_KEY=your_actual_private_key_here
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_actual_imagekit_id

# For Node.js scripts (same values as above)
IMAGEKIT_PUBLIC_KEY=your_actual_public_key_here
IMAGEKIT_PRIVATE_KEY=your_actual_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_actual_imagekit_id
```

### 3. Install Dependencies

The required dependencies are already installed:
- `imagekit` - ImageKit SDK
- `csv-writer` - For writing updated CSV
- `csv-parser` - For reading CSV data

## Usage

### Method 1: Using npm script (Recommended)

```bash
npm run upload-images
```

### Method 2: Direct Node execution

```bash
node scripts/uploadImages.js
```

## What the Script Does

1. **Reads CSV Data**: Parses the `septemr comp - Form responses 1.csv` file
2. **Validates Match**: Ensures the number of CSV records matches the number of images
3. **Serial Upload**: Uploads images one by one to ImageKit in the `/participation-images` folder
4. **Updates CSV**: Adds an `Image URL` column with the generated URLs
5. **Progress Tracking**: Shows progress and handles errors gracefully

## Output

The script creates a new CSV file: `septemr comp - Form responses with images.csv`

The updated CSV will have these columns:
- Timestamp
- Email address
- Your Name
- **Image URL** (newly added)

## Features

- ✅ **Serial Processing**: Uploads one image at a time to avoid rate limits
- ✅ **Error Handling**: Continues processing even if individual uploads fail
- ✅ **Progress Tracking**: Shows detailed progress for each upload
- ✅ **File Organization**: Uploads images to organized folders in ImageKit
- ✅ **CSV Integration**: Automatically matches images to CSV records by order
- ✅ **Duplicate Prevention**: Uses consistent naming to avoid duplicates

## File Matching

The script matches images to CSV records by:
- Image `1.jpg` → CSV record 1 (line 2)
- Image `2.jpg` → CSV record 2 (line 3)
- ...
- Image `130.jpg` → CSV record 130 (line 131)

## Troubleshooting

### Common Issues:

1. **"API Key not found"**: Make sure your `.env` file has the correct ImageKit credentials
2. **"File not found"**: Ensure the image files are in the correct folder
3. **"CSV parsing error"**: Check that your CSV file is properly formatted
4. **"Rate limit exceeded"**: The script includes delays between uploads to prevent this

### Error Recovery:

If the script fails partway through:
1. Check the console output for the last successfully processed record
2. The script will create a partial output CSV
3. You can manually resume from where it left off or re-run the entire process

## ImageKit Settings Used

- **Folder**: `/participation-images`
- **Tags**: `participation`, `authorverse-summit`
- **Unique File Names**: Disabled (uses original filenames)
- **File Type**: Images only (.jpg files)

## Security Notes

- Never commit your `.env` file to version control
- Keep your ImageKit private key secure
- The private key is only used for server-side uploads, not exposed to the client

## Cost Considerations

- ImageKit has generous free tiers for most use cases
- 130 images should fit within free limits
- Monitor your ImageKit dashboard for usage statistics
