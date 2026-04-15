import ImageKit from 'imagekit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ImageKit configuration (hardcoded credentials)
const imagekit = new ImageKit({
  publicKey: "public_V+TbEtQmLO9JpA+8ModN+ZUblxM=",
  privateKey: "private_Hiu7DbxQ8gceIqX6tj16upurV4g=",
  urlEndpoint: "https://ik.imagekit.io/7dsi2oyqe"
});

// Test configuration
const TEST_IMAGES_FOLDER = '/Users/sakshamgunj/Documents/authorverse-summit-launch/(Bulk 1) of participation';

async function testImageKitConnection() {
  console.log('🧪 Testing ImageKit connection with hardcoded credentials...\n');

  try {
    console.log('✅ Using hardcoded ImageKit credentials');
    console.log('📡 Testing connection to ImageKit...');

    // Test 2: Try to upload a small test image
    const testImagePath = path.join(TEST_IMAGES_FOLDER, '1.jpg');

    if (!fs.existsSync(testImagePath)) {
      console.log('❌ Test image not found at:', testImagePath);
      return false;
    }

    console.log('📤 Testing upload with 1.jpg...');

    const result = await imagekit.upload({
      file: fs.readFileSync(testImagePath),
      fileName: 'test-upload-1.jpg',
      folder: '/test-uploads',
      useUniqueFileName: true,
      tags: ['test', 'authorverse-summit']
    });

    console.log('✅ Test upload successful!');
    console.log('📄 File URL:', result.url);
    console.log('🆔 File ID:', result.fileId);
    console.log('📏 File Size:', result.size, 'bytes');

    // Test 3: Clean up test file
    console.log('\n🧹 Cleaning up test file...');
    await imagekit.deleteFile(result.fileId);
    console.log('✅ Test file deleted successfully');

    console.log('\n🎉 All tests passed! ImageKit is ready for bulk upload.');
    return true;

  } catch (error) {
    console.log('❌ Test failed:', error.message);

    if (error.message.includes('Invalid credentials')) {
      console.log('\n💡 This usually means:');
      console.log('1. Your API keys are incorrect');
      console.log('2. Your account has insufficient permissions');
      console.log('3. Your account is not active');
    }

    return false;
  }
}

// Run the test
testImageKitConnection().then(success => {
  if (!success) {
    console.log('\n📋 Troubleshooting:');
    console.log('1. Check if your ImageKit account is active');
    console.log('2. Verify the hardcoded credentials are correct');
    console.log('3. Ensure you have upload permissions in ImageKit');
    console.log('4. Check if test image exists at:', TEST_IMAGES_FOLDER + '/1.jpg');
  } else {
    console.log('\n🎉 Ready to run bulk upload!');
    console.log('Run: npm run upload-images');
  }
});
