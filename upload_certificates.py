import csv
import os
import base64
import json
import urllib.request
import urllib.parse
import ssl
from concurrent.futures import ThreadPoolExecutor, as_completed

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
        response = urllib.request.urlopen(req)
        response_data = json.loads(response.read().decode('utf-8'))
        if response_data.get('success'):
            return response_data['data']['url']
        else:
            print(f"Failed to upload {image_path}: {response_data}")
            return None
    except Exception as e:
        print(f"Error uploading {image_path}: {e}")
        return None

def process_row(args):
    row, row_index, image_dir, api_key = args
    if not row:
        return row_index, row
        
    image_filename = f"{row_index}.png"
    image_path = os.path.join(image_dir, image_filename)
    
    if os.path.exists(image_path):
        print(f"Uploading {image_filename} for row {row_index}...")
        img_url = upload_to_imgbb(image_path, api_key)
        
        if img_url:
            row.append(img_url)
        else:
            row.append("")
    else:
        print(f"Warning: {image_filename} not found.")
        row.append("")
        
    return row_index, row

def main():
    api_key = "54c251bca7dbbabab5837926a6a96edd"
    csv_file = "/Users/sakshamgunj/authorverse-summit-launch/Certificates details from 1 st feb to 1st march - Sheet1.csv"
    image_dir = "/Users/sakshamgunj/authorverse-summit-launch/5979024086968439208/1_(Bulk 1) Bulk IWL Certificatr"
    temp_csv = "/Users/sakshamgunj/authorverse-summit-launch/Certificates_temp.csv"

    with open(csv_file, mode='r', encoding='utf-8') as infile:
        reader = list(csv.reader(infile))
        
    if not reader:
        return
        
    headers = reader[0]
    if "certificate_image_url" not in headers:
        headers.append("certificate_image_url")
        
    rows_to_process = []
    for i, row in enumerate(reader[1:], start=1):
        if row: # don't append if empty row
            rows_to_process.append((row, i, image_dir, api_key))
            
    results = {}
    
    max_workers = 10
    print(f"Starting {len(rows_to_process)} uploads with {max_workers} threads...")
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_row = {executor.submit(process_row, arg): arg for arg in rows_to_process}
        for future in as_completed(future_to_row):
            idx, updated_row = future.result()
            results[idx] = updated_row
            print(f"Finished row {idx}")
            
    with open(temp_csv, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(headers)
        
        for i in range(1, len(reader)):
            if i in results:
                writer.writerow(results[i])
            else:
                writer.writerow(reader[i]) # write empty rows if there were any
            
    os.replace(temp_csv, csv_file)
    print("Upload completed and CSV updated.")

if __name__ == "__main__":
    main()
