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
        response = urllib.request.urlopen(req, timeout=30)
        response_data = json.loads(response.read().decode('utf-8'))
        if response_data.get('success'):
            return response_data['data']['url']
    except Exception as e:
        pass
    return None

def main():
    api_key = "54c251bca7dbbabab5837926a6a96edd"
    csv_file = "/Users/sakshamgunj/authorverse-summit-launch/Certificates details from 1 st feb to 1st march - Sheet1.csv"
    image_dir = "/Users/sakshamgunj/authorverse-summit-launch/5979024086968439208/1_(Bulk 1) Bulk IWL Certificatr"

    with open(csv_file, mode='r', encoding='utf-8') as f:
        reader = list(csv.reader(f))
        
    headers = reader[0]
    has_cert = "certificate_image_url" in headers
    if not has_cert:
        headers.append("certificate_image_url")
        
    print(f"Total rows to process: {len(reader)-1}", flush=True)
    
    for i, row in enumerate(reader[1:], start=1):
        if not row: continue
        
        # Check if already has a valid URL
        if has_cert and len(row) == len(headers) and row[-1].startswith("http"):
            continue
            
        # Needs upload
        image_path = os.path.join(image_dir, f"{i}.png")
        if not os.path.exists(image_path):
            print(f"File {image_path} not found", flush=True)
            if not has_cert or len(row) < len(headers):
                row.append("")
            continue
            
        print(f"Uploading {i}.png...", flush=True)
        
        url = None
        for attempt in range(3):
            url = upload_to_imgbb(image_path, api_key)
            if url: 
                break
            time.sleep(1)
            
        if url:
            print(f"Success row {i}: {url}", flush=True)
            if has_cert and len(row) == len(headers):
                row[-1] = url
            elif len(row) == len(headers) - 1:
                row.append(url)
            else:
                row.extend([""] * (len(headers) - len(row) - 1) + [url])
        else:
            print(f"Failed row {i}", flush=True)
            if len(row) < len(headers):
                row.append("")
                
        # Write back to file after every upload so we don't lose data
        # flush the entire list to file
        with open(csv_file, mode='w', encoding='utf-8', newline='') as out:
            writer = csv.writer(out)
            writer.writerows(reader)
            
    print("All uploads complete.", flush=True)

if __name__ == "__main__":
    main()
