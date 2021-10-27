import requests, json, gzip, base64, time, influxdb

token = "30c95ef3-26a6-46a7-8ce1-caff9c3da22c"

url = "https://screeps.com/api/user/memory?shard=shard3&_token="
url += token

client = influxdb.InfluxDBClient('localhost', 8086, 'screeps')

while (True):
    try:
        r = requests.get(url)
        res = json.loads(r.text)["data"]
        res = res[3:]
        data = gzip.decompress(base64.b64decode(res)).decode()
        data = json.loads(data)["stats"]
        for x in data:
            data[x] = float(data[x])
        res = [{"measurement": "status", "fields": data}]
        client.write_points(res, database="screeps")
    except Exception as e:
        print('Reason:', e)
    time.sleep(120)
