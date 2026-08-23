import requests
import json
import csv
import time

app_id = "11224099eac214bd329a2eee86d9042211"
secret_key = "cfsk_ma_prod_bfe9fc5e4670cc7c7fefd9363f027a72_efa3a41c"

headers = {
    "x-client-id": app_id,
    "x-client-secret": secret_key,
    "x-api-version": "2025-01-01"
}

order_ids_raw = """
spa_vol2_1784736432599_0ct1u
spa_vol2_1784716672700_fy2cb
spa_vol2_1784822532719_809rp
spa_vol2_1784818158131_fkl1u
spa_vol2_1784817687641_6igfp
spa_vol2_1784798116263_d9xxk
spa_vol2_1784794696266_k1hxb
spa_vol2_1784747804990_14ms1
spa_vol2_1784893669708_0klx2
spa_vol2_1784888327174_gszfh
spa_vol2_1784883476352_50awb
spa_vol2_1784221659092_vyjr0
spa_vol2_1784217780019_vc50t
spa_vol2_1784211793535_hkwcr
spa_vol2_1784211768168_ajb9p
spa_vol2_1784211738971_3ljob
spa_vol2_1782489216796_e7hmz
spa_vol2_1782471434810_h25p2
spa_vol2_1782467727670_4i0ko
spa_vol2_1782467505983_9t1ji
spa_vol2_1782467410432_bpmcy
spa_vol2_1782465816403_m9ngr
spa_vol2_1782464589398_vuv3b
spa_vol2_1782464074733_q0zlh
spa_vol2_1782463897901_r1gup
spa_vol2_1782463229050_7jyw0
spa_vol2_1782463000153_698xd
spa_vol2_1782461463899_yvrvt
spa_vol2_1782459986214_d6gta
spa_vol2_1783357003786_524yh
spa_vol2_1783351381887_8oztp
spa_vol2_1783349794110_a5utl
spa_vol2_1783349703298_jpzto
spa_vol2_1783342838267_wq7z4
spa_vol2_1783337334068_rqm2e
spa_vol2_1783329922334_0627e
spa_vol2_1783329370063_b8twn
spa_vol2_1783312603599_p95kl
spa_vol2_1783301582077_0bilv
spa_vol2_1783009509505_jwtko
spa_vol2_1783003630441_ij9d6
spa_vol2_1783000763511_9fdpp
spa_vol2_1782998241720_vlf37
spa_vol2_1782986442769_8l2uh
spa_vol2_1782981404240_jbywr
spa_vol2_1782969756768_jucrh
spa_vol2_1783270506361_qag5k
spa_vol2_1783268407396_1zp3l
spa_vol2_1783266096954_3oe40
spa_vol2_1783249180629_zpwpy
spa_vol2_1783247103836_hfo1n
spa_vol2_1783237183367_7oct7
spa_vol2_1783441163741_6i4nt
spa_vol2_1783437567890_pyteq
spa_vol2_1783435622196_bsz50
spa_vol2_1783435310645_0umee
spa_vol2_1783406289958_mctx9
spa_vol2_1783403251580_2uxvb
spa_vol2_1783403160841_5qdgb
spa_vol2_1782929435666_4osgw
spa_vol2_1782912871666_923w2
spa_vol2_1782909942341_pwycj
spa_vol2_1782905283756_l9nc5
spa_vol2_1782891927123_ei6ck
spa_vol2_1782877466617_h96os
spa_vol2_1782847955834_o76ag
spa_vol2_1784398077063_hv998
spa_vol2_1784386700092_girom
spa_vol2_1784386601584_py82f
spa_vol2_1784385965705_v38fj
spa_vol2_1784374168864_f7c7x
spa_vol2_1784371507932_59mft
spa_vol2_1782747422894_zu1ex
spa_vol2_1782735588417_3vczw
spa_vol2_1782721031445_xrccx
spa_vol2_1782720753362_ikc2e
spa_vol2_1783879719937_3x5bb
spa_vol2_1783878063545_xjsi5
spa_vol2_1783870728603_fbev3
spa_vol2_1783870652537_ncdxe
spa_vol2_1783870390465_z7t4d
spa_vol2_1783830598049_2f0n0
spa_vol2_1784050134492_l6a93
spa_vol2_1784043488008_pzof5
spa_vol2_1784043215983_gqo9s
spa_vol2_1784040617974_dp2r5
spa_vol2_1784010314111_ay4u7
spa_vol2_1782836368689_pabx8
spa_vol2_1782835486331_inuku
spa_vol2_1782835461470_umtjy
spa_vol2_1782835369475_8c1kk
spa_vol2_1782827445051_chqdg
spa_vol2_1782825654127_87o39
spa_vol2_1782824807693_rpxft
spa_vol2_1782804985591_uy6nv
spa_vol2_1782799008641_e0t3b
spa_vol2_1784306735766_588aq
spa_vol2_1784299516557_e0qnr
spa_vol2_1784298860217_dwf5w
spa_vol2_1784296918957_vtglf
spa_vol2_1782550178107_obkct
spa_vol2_1782550144145_y67f9
spa_vol2_1782550067973_d4h3s
spa_vol2_1782549169490_ub3w9
spa_vol2_1782535189611_rg8ki
spa_vol2_1782534373975_2nqbv
spa_vol2_1783088552807_nztf6
spa_vol2_1783067145023_12ph0
spa_vol2_1783065322065_im2tb
spa_vol2_1783062711276_kng5j
spa_vol2_1783061676090_egy4b
spa_vol2_1783041490242_9tu0u
spa_vol2_1782666050032_rlzcj
spa_vol2_1782640502423_gdld4
spa_vol2_1782638089854_fzjhm
spa_vol2_1783955662821_z502y
spa_vol2_1783946860712_2o32e
spa_vol2_1783888130044_kf6ys
spa_vol2_1784570338650_1u9ix
spa_vol2_1784563539969_osfv7
spa_vol2_1784544450258_f0b11
spa_vol2_1784533618276_y6f6j
spa_vol2_1784658471116_p6r0p
spa_vol2_1784642458707_ojc6u
spa_vol2_1784609939569_x97rx
spa_vol2_1784602228340_s8hds
spa_vol2_1784596493302_k135t
spa_vol2_1783152388189_hudn6
spa_vol2_1783575835088_d3bp6
spa_vol2_1783488750159_u0dvk
spa_vol2_1784115237749_tu2fk
spa_vol2_1784480436916_e7cii
spa_vol2_1785035676741_ru6ny
spa_vol2_1785460365438_8t92s
"""

order_ids = [oid.strip() for oid in order_ids_raw.split('\n') if oid.strip()]

csv_filename = "shakespeare_award_addresses.csv"

with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['Order ID', 'Status', 'Name', 'Email', 'WhatsApp', 'Phone (Customer Details)', 'Address', 'City', 'Pincode']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for idx, order_id in enumerate(order_ids):
        try:
            r = requests.get(f"https://api.cashfree.com/pg/orders/{order_id}", headers=headers)
            data = r.json()
            
            if 'order_id' not in data:
                print(f"Error fetching {order_id}: {data}")
                continue

            order_status = data.get('order_status', '')
            cust = data.get('customer_details', {})
            tags = data.get('order_tags', {})

            if tags is None:
                tags = {}

            row = {
                'Order ID': order_id,
                'Status': order_status,
                'Name': tags.get('name', cust.get('customer_name', '')),
                'Email': tags.get('email', cust.get('customer_email', '')),
                'WhatsApp': tags.get('whatsapp', ''),
                'Phone (Customer Details)': cust.get('customer_phone', ''),
                'Address': tags.get('address', ''),
                'City': tags.get('city', ''),
                'Pincode': tags.get('pincode', '')
            }
            writer.writerow(row)
            print(f"[{idx+1}/{len(order_ids)}] Fetched {order_id} ({row['Name']})")
        except Exception as e:
            print(f"[{idx+1}/{len(order_ids)}] Exception on {order_id}: {e}")
        time.sleep(0.2)  # Rate limiting

print(f"Done! Data saved to {csv_filename}")
