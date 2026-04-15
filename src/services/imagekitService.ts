import imagekit from '../lib/imagekit';
import crypto from 'crypto';

export interface AuthParams {
  token: string;
  expire: string;
  signature: string;
}

export interface UploadResult {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  height?: number;
  width?: number;
  size: number;
  fileType: string;
}

/**
 * Generate authentication parameters for client-side ImageKit uploads
 * This should be called from a secure backend endpoint
 */
export function generateAuthParams(): AuthParams {
  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 hours from now

  const privateKey = process.env.NEXT_PUBLIC_VITE_IMAGEKIT_PRIVATE_KEY || "your_private_key_here";
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(token + expire)
    .digest('hex');

  return {
    token,
    expire: expire.toString(),
    signature
  };
}

/**
 * Upload file to ImageKit (server-side)
 */
export async function uploadToImageKit(
  file: File | Buffer,
  fileName: string,
  options: {
    folder?: string;
    tags?: string[];
    useUniqueFileName?: boolean;
    isPrivateFile?: boolean;
    customMetadata?: Record<string, any>;
  } = {}
): Promise<UploadResult> {
  try {
    const uploadOptions = {
      file,
      fileName,
      folder: options.folder || '/uploads',
      tags: options.tags ? options.tags.join(',') : '',
      useUniqueFileName: options.useUniqueFileName ?? true,
      isPrivateFile: options.isPrivateFile ?? false,
      customMetadata: options.customMetadata ? JSON.stringify(options.customMetadata) : undefined
    };

    const result = await imagekit.upload(uploadOptions);

    return {
      fileId: result.fileId,
      name: result.name,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      height: result.height,
      width: result.width,
      size: result.size,
      fileType: result.fileType
    };
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

/**
 * Delete file from ImageKit
 */
export async function deleteFromImageKit(fileId: string): Promise<void> {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error('ImageKit delete error:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

/**
 * Get file details from ImageKit
 */
export async function getFileDetails(fileId: string) {
  try {
    return await imagekit.getFileDetails(fileId);
  } catch (error) {
    console.error('ImageKit get file details error:', error);
    throw new Error(`Failed to get file details: ${error.message}`);
  }
}

/**
 * Generate ImageKit URL with transformations
 */
export function generateTransformedUrl(
  url: string,
  transformations: Record<string, any>
): string {
  const transformationString = Object.entries(transformations)
    .map(([key, value]) => `${key}-${value}`)
    .join(',');

  return `${url}?tr=${transformationString}`;
}
