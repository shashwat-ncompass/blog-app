# blog-app

<h2>Register User</h2>
<p>auth/register</p>
<p>Req:
  {
      "name":"rakesh",
      "email":"rakesh@gmail.com",
      "password":"hello1"
  }
</p>
<br>
<p>auth/login</p>
<p>Req:
  {
      "email":"rakesh@gmail.com",
      "password":"hello1"
  }
</p>
<br>
Authenticated Route
<p>user/assign-role</p>
<p>Req:
  {
    "userId": "c94e28c3-24af-4d35-9e95-12c3bba9af0c",
    "userRole": "admin"
  }  
</p>
<br>
<p>fieldToUpdate Enum : [viewe,editor,admin]</p>
<br>
<p>topic/create</p>
Authenticated Route
<p>Req:
  {
    "name": "Sports",
    "description": "Sports is a famous game"
}
</p>
<br>
<p>topic/:id/update</p>
Authenticated Route
<p>Req:
   {
      "fieldToUpdate": "name",
      "newValue": "Football is all"
  }
</p><br>
<p>fieldToUpdate Enum : [name,description]</p>

<p>topic/:id</p>
Authenticated Route


