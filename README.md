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

    Create a new employee field. You must send in a request body to post.

     Key  | Value
     ---  | ----- 
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

    HTTP STATUS 201 (Created)

```

# PATCH /api/employees:id

    Update valid employee fields. You must send in a request body to update. Only one update field is required to PATCH


    Key  | Value
    ---- | ----- 
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
    PATCH https://immense-refuge-35905.herokuapp.com/api/employees/31

    REQ BODY: {
       
        "id": 31,
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

    HTTP STATUS 200 (Okay)

```
# DELETE /api/employees/:id

    Delete selected id

    
    DELETE https://immense-refuge-35905.herokuapp.com/api/employees/5

    HTTP STATUS 204 (Deleted)

    
