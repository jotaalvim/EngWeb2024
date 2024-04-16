import requests
import json

url = 'http://localhost:7777'
#response = requests.get(url)

# fiz isto para os 2 datasets
with open('../dataset-extra3.json', 'r') as file:
    data2 = json.load(file)

for data in data2["pessoas"]:

    json_data = json.dumps(data)

    #print(json_data)
    #print("--------------------------------------------------------------------------------")
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json_data, headers=headers)

    if response.status_code == 200:
        print("POST request successful!")
    else:
        print("Error:", response.status_code)
    
