### Create A User

---

<p>[POST] http://127.0.0.1:PORT/api/v1/users</p>
<p>Response Code 200</p>

```
{
  "success": true,
  "message": "User Created",
  "data": {
    "token": "<TOKEN>",
    "username": "<USERNAME>"
  }
}
```

---

### UPLOAD A FILE

<p>[POST] http://127.0.0.1:PORT/api/v1/files</p>
<p>Request Headers:</p>

```
 "Authorization" : Bearer {TOKEN_FROM_CREATING_USER}
```

<p>Request Body: Multipart Form</p>
<p>keyName: file</p>
<p>Response Code 200</p>

```
{
  "success": true,
  "message": "File Stored",
  "data": {
    "publicKey": "<PUBLIC_KEY>",
    "privateKey": "<PRIVATE_KEY>"
  }
}
```

<p>Response Code 478</p>  
  
```
{
  "success": false,
  "data": null,
  "message": "Upload Limit reached!"
}
```
----

Download a file

<p> [GET] http://127.0.0.1:PORT/api/v1/files/PUBLIC_KEY></p>
<p>Response Code 200</p>

```
ACTUAL STREAM OF FILE
```

<p>Response Code 468</p>

```
{
  "success": false,
  "data": null,
  "message": "Download Limit reached!"
}
```

---

Delete a File

<p>[DELETE] http://127.0.0.1:PORT/api/v1/files/PRIVATE_KEY</p>
<p>Request Headers:</p>

```
 "Authorization" : Bearer {TOKEN_FROM_CREATING_USER}
```

<p>Response Code 200</p>

```
{
  "success": true,
  "message": "File Deleted",
  "data": {}
}
```

<p>Response Code 404</p>

```
{
  "success": false,
  "data": null,
  "message": "File not Found"
}
```

<p>Response Code 474</p>

```
{
  "success": false,
  "data": null,
  "message": "This file is already deleted"
}
```

<p>Response Code 403</p>

```
{
  "success": false,
  "data": null,
  "message": "You cannot delete this file"
}
```
