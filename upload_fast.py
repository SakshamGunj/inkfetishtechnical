import csv
import os
import base64
import json
import urllib.request
import urllib.parse
import ssl
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

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
        else:
            print(f"Failed to upload {image_path}: {response_data}")
            return None
    except Exception as e:
        print(f"Error uploading {image_path}: {e}")
        return None

def process_row(args):
    row, row_index, headers, has_cert_col, image_dir, api_key = args
    if not row:
        return row_index, row, False
        
    if has_cert_col and len(row) == len(headers) and row[-1].startswith("http"):
        return row_index, row, False # already done
        
    image_filename = f"{row_index}.png"
    image_path = os.path.join(image_dir, image_filename)
    
    img_url = ""
    if os.path.exists(image_path):
        print(f"Uploading {image_filename} for row {row_index}...")
        for attempt in range(3):
            img_url = upload_to_imgbb(image_path, api_key)
            if img_url:
                break
            print(f"Retrying row {row_index} (Attempt {attempt+2}/3)...")
            time.sleep(2)
    else:
        print(f"Warning: {image_filename} not found.")
        
    if has_cert_col and len(row) == len(headers):
        row[-1] = img_url
    else:
        row.append(img_url)
        
    return row_index, row, True

def main():
    api_key = "54c251bca7dbbabab5837926a6a96edd"
    csv_file = "/Users/sakshamgunj/authorverse-summit-launch/Certificates details from 1 st feb to 1st march - Sheet1.csv"
    image_dir = "/Users/sakshamgunj/authorverse-summit-launch/5979024086968439208/1_(Bulk 1) Bulk IWL Certificatr"
    temp_csv = "/Users/sakshamgunj/authorverse-summit-launch/Certificates_temp2.csv"

    # read original or temp if it exists and has more data
    target_read = temp_csv if os.path.exists(temp_csv) else csv_file
    
    with open(target_read, mode='r', encoding='utf-8') as infile:
        reader = list(csv.reader(infile))
        
    if not reader:
        return
        
    headers = reader[0]
    has_cert_col = "certificate_image_url" in headers
    if not has_cert_col:
        headers.append("certificate_image_url")
        
    rows_to_process = []
    for i, row in enumerate(reader[1:], start=1):
        rows_to_process.append((row, i, headers, has_cert_col, image_dir, api_key))
        
    results = {}
    for i, row in enumerate(reader[1:], start=1):
        if row: results[i] = row

    csv_lock = threading.Lock()
    
    def write_all_results():
        with csv_lock:
            with open(temp_csv, mode='w', encoding='utf-8', newline='') as outfile:
                writer = csv.writer(outfile)
                writer.writerow(headers)
                for j in range(1, len(reader)):
                    if j in results:
                        writer.writerow(results[j])
                    else:
                        writer.writerow(reader[j])
            
    max_workers = 5
    print(f"Starting {len(rows_to_process)} uploads with {max_workers} threads...")
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_row = {executor.submit(process_row, arg): arg for arg in rows_to_process}
        for future in as_completed(future_to_row):
            idx, updated_row, was_uploaded = future.result()
            results[idx] = updated_row
            if was_uploaded:
                print(f"Finished row {idx}")
                write_all_results() # Save progress
            
    os.replace(temp_csv, csv_file)
    print("Upload completed and CSV updated.")

if __name__ == "__main__":
    main()
