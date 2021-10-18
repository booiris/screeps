import requests, json, gzip, base64, time, influxdb

token = "30c95ef3-26a6-46a7-8ce1-caff9c3da22c"

url = "https://screeps.com/api/user/memory?shard=shard3&_token="
url += token

r = requests.get(url)
res = json.loads(r.text)["data"]
res = res[3:]
data = gzip.decompress(base64.b64decode(res)).decode()
data = json.loads(data)["stats"]
print(data)

client = influxdb.InfluxDBClient('localhost', 8086, 'screeps')
for x in data:
    if not data[x]:
        continue
    measurement = x
    fields = data[x]
    if not isinstance(fields, dict):
        measurement = "stats"
        if x == "time":
            x = "times"
        fields = {x: fields}
    if measurement == "time":
        measurement = "times"
    res = [{"measurement": measurement, "fields": fields}]
    client.write_points(res, database="screeps")

# while (True):
#     try:
#         r = requests.get(url)
#         res = json.loads(r.text)["data"]
#         res = res[3:]
#         data = gzip.decompress(base64.b64decode(res)).decode()
#         print(data)
#     except Exception as e:
#         print('Reason:', e)
#     time.sleep(60)
