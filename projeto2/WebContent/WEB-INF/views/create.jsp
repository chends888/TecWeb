<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<style><%@ include file="/css/style.css"%></style>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Create Note</title>
</head>
<body>
		<form action='createNote' method='post'>
		<input type='text' name='content' placeholder="Note Content"><br>
<!-- 		Author: <input type='text' name='author'><br>
		Note category: <input type='text' name='category'><br> -->
		<input type='date' name='deadline' placeholder="Deadline"><br>
		<input type='submit' value='Submit'>
		</form>

</body>
</html>