import csv
import os
import base64
import json
import urllib.request
import urllib.parse
import ssl
import time

ssl._create_default_https_context = ssl._create_unverified_context

def upload_to_imgbb(image_path, api_key):
    try:
        with open(image_path, "rb") as file:
            payload = {
                "key": api_key,
                "image": base64.b64encode(file.read()).decode('utf-8')
            }
        
        data = urllib.parse.urlencode(payload).encode('utf-8')
        req = urllib.request.Request("https://api.imgbb.com/1/upload", data=data)
        
        # ADDED TIMEOUT OF 30 SECONDS
        response = urllib.request.urlopen(req, timeout=30)
        response_data = json.loads(response.read().decode('utf-8'))
        if response_data.get('success'):
            return response_data['data']['url']
        else:
            print(f"Failed to upload {image_path}: {response_data}")
            return None
    except Exception as e:
        print(f"Error uploading {image_path}: {e}")
        return None

def main():
    api_key = "54c251bca7dbbabab5837926a6a96edd"
    csv_file = "/Users/sakshamgunj/authorverse-summit-launch/Certificates details from 1 st feb to 1st march - Sheet1.csv"
    image_dir = "/Users/sakshamgunj/authorverse-summit-launch/5979024086968439208/1_(Bulk 1) Bulk IWL Certificatr"
    temp_csv = "/Users/sakshamgunj/authorverse-summit-launch/Certificates_temp2.csv"

    # read original
    with open(csv_file, mode='r', encoding='utf-8') as infile:
        reader = list(csv.reader(infile))
        
    if not reader:
        return
        
    headers = reader[0]
    has_cert_col = "certificate_image_url" in headers
    if not has_cert_col:
        headers.append("certificate_image_url")
        
    with open(temp_csv, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(headers)
        
        for i, row in enumerate(reader[1:], start=1):
            if not row:
                continue
                
            # If we resume from a partially modified file
            if has_cert_col and len(row) == len(headers) and row[-1].startswith("http"):
                writer.writerow(row)
                continue
                
            image_filename = f"{i}.png"
            image_path = os.path.join(image_dir, image_filename)
            
            img_url = ""
            if os.path.exists(image_path):
                print(f"Uploading {image_filename} for row {i}...")
                for attempt in range(3):
                    img_url = upload_to_imgbb(image_path, api_key)
                    if img_url:
                        break
                    print(f"Retrying row {i} (Attempt {attempt+2}/3)...")
                    time.sleep(2)
            else:
                print(f"Warning: {image_filename} not found.")
                
            if has_cert_col and len(row) == len(headers):
                row[-1] = img_url
            else:
                row.append(img_url)
                
            writer.writerow(row)
            outfile.flush()
            
    os.replace(temp_csv, csv_file)
    print("Upload completed and CSV updated.")

if __name__ == "__main__":
    main()
