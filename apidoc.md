# Social Media api useing node js 


1. user register 
    <br>
        url:http: http://localhost:8000/api/v1/users/
    # user register  
        name 
        email
        password
        date_of_birth

2. login user 
# default 
    <br>
        email
        password

        return a jwt token

3. getAlluser access only admin 
# get user
    url : http://localhost:8000/api/v1/users


4. following 
<br>
url : http://localhost:8000/api/v1/users/following/:id

    # body  
        {
            "userId" : "id"
        }
     



5.like and dislike 


url : 

