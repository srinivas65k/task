import requests
import json


# Test a basic get user details#
# Make sure that port 4001 is running in localhost

# you can start test by using 
# RUN pytest test.py from the home directory
# RUN pytest test.py -rP wheather api passes or fails

# NOTE : Make sure you have granted access token before starting the test otherwise you will get a stdout call error for get request

headers = {
    'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE5MDJhODA2MWQ1NzQyMTIwZWE5NGIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTYxNDAyMTMsImV4cCI6MTY5NjIyNjYxM30.S5Am7M6f8cueWRglrnIcwfPbOpv5-8a8WGsU5_lXsGs"
}
def testApi():
    response = requests.get("http://localhost:4001/getUserDetails",headers=headers)
    if response.status_code == 200:
        assert response.status_code == 200
    else:
        print('Error: {0}'.format(response.status_code))

def testApi2():
    response = requests.get("http://localhost:4001/getGroups", headers=headers)
    if response.status_code == 200:
        assert response.status_code == 200
    else:
        print('Error: {0}'.format(response.status_code))


if __name__ == '__main__':
    testApi()
    testApi2()