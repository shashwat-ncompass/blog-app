# blog-app

<h2>Register User</h2>
Post <br>
<p>auth/register</p>
<p>Req:
  {
      "name":"rakesh",
      "email":"rakesh@gmail.com",
      "password":"hello1"
  }
</p>
<br>
<h2>Login User</h2>
Post <br>
<p>auth/login</p>
<p>Req:
  {
      "email":"rakesh@gmail.com",
      "password":"hello1"
  }
</p>
<br>
<h2>Assign Role to User</h2>
Post <br>
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
<h2>Create Topic</h2>
Post <br>
<p>topic/create</p>
Authenticated Route
<p>Req:
  {
    "name": "Sports",
    "description": "Sports is a famous game"
}
</p>
<br>
<h2>Update Topic</h2>
Post <br>
<p>topic/:id/update</p>
Authenticated Route
<p>Req:
   {
      "fieldToUpdate": "name",
      "newValue": "Football is all"
  }
</p><br>
<p>fieldToUpdate Enum : [name,description]</p>
<h2>Update Topic</h2>
Post <br>
<p>topic/:id</p>
Authenticated Route <br>
<h2>Create Blog</h2>
Post <br>
<p>blog/create</p>
Authenticated Route
<p>Req:
   {
    "name": "Topic 1",
    "topicId": "c27a82f7-2d46-4f52-99eb-4832dee1e2d4",
    "desc": "desc",
    "owner": "desc",
    "header": "Sample header",
    "footer": "Sample footer",
    "body": "Sample body"
}
</p><br>
<h2>Update Blog</h2>
Post <br>
<p>blog/:id/update</p>
Authenticated Route
<p>Req:
   {
    "fieldToUpdate":"name",
    "updatedValue":"Topic 1 --"
}
<p>fieldToUpdate Enum : ['name', 'desc', 'header', 'footer', 'body']</p>
</p><br>

<h2>Delete Blog</h2> 
Post <br>
<p>blog/:id/delete</p>
Authenticated Route
<p>Req:
   {
    "fieldToUpdate":"name",
    "updatedValue":"Topic 1 --"
}
<p>fieldToUpdate Enum : ['name', 'desc', 'header', 'footer', 'body']</p>
</p><br>

<h2>Assign Editor/Viewr to User</h2>
Post <br>
Authenticated Route
<p>topic/assign-role</p>
<p>Req:
  {
    "userId": "",
    "role": "",
    "topicDetails": ""
} 
</p>
role Enum:['viewer','editor']
<br>

