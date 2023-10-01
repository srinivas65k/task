import requests

def testApi():
    headers = {
        "authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE5MDJhODA2MWQ1NzQyMTIwZWE5NGIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTYxNDAyMTMsImV4cCI6MTY5NjIyNjYxM30.S5Am7M6f8cueWRglrnIcwfPbOpv5-8a8WGsU5_lXsGs"
    }
    response = requests.get("http://localhost:4001/getUserDetails",headers=headers).json()
    assert response["status"] == True

if __name__ == '__main__':
    testApi()