# Server Endpoints

Back-end for the heroku database. CRUD functions

You can select from the following fields in you api call
(employees, careers, users)

# Examples

# GET /api/employees

View array of employee objects

``` 
    GET https://immense-refuge-35905.herokuapp.com/api/employees
    
    [
    {
        "id": 27,
        "first_name": "Alexander",
        "last_name": "Smith",
        "address": "123 Your Place Lane",
        "city": "Laguna Beach",
        "state": "CA",
        "zip_code": "92801",
        "phone": "5624561234",
        "modified": "2020-04-24T19:11:54.499Z",
        "career_id": 1,
        "user_id": 1
    },
    {
        "id": 29,
        "first_name": "Johanthan",
        "last_name": "Smith",
        "address": "12345",
        "city": "Anaheim",
        "state": "CA",
        "zip_code": "92801",
        "phone": "7144700763",
        "modified": "2020-04-24T19:39:19.783Z",
        "career_id": 2,
        "user_id": 1
    }
]

```
# POST /api/employees

Create a new employee field 

        Key | Value
    ------------ | -------------
    first_name | STRING
    last_name | STRING
    address | STRING
    city | STRING
    state | STRING
    zip_code | STRING
    phone | STRING
    career_id | INTEGER
    user_id | INTEGER

```
    POST https://immense-refuge-35905.herokuapp.com/api/employees

    REQ BODY: {
       
        "first_name": "EXAMPLE NAME",
        "last_name": "Smith",
        "address": "123 Your Place Lane",
        "city": "Laguna Beach",
        "state": "CA",
        "zip_code": "92801",
        "phone": "5624561234",
        "career_id": 1,
        "user_id": 1
    }

```


