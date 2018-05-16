<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<style><%@ include file="/css/style.css"%></style>

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Edit Note</title>

	
</head>

<body>
	<h2> Editing note </h2>

	<form action="editNote" method="post">
		<input type="text" name="content" value="${note.content}" /><br>
		<input type='text' name='category' value="${note.category}"><br>
		<input type='text' name= "deadline" value="${note.deadline.get()}"><br>
		
		<%-- <input type='text' name='deadline' value= "<fmt:formatDate value='${note.deadline.time}' pattern= 'dd/MM/yyyy' />" /> <br> --%>
		<%-- <input type="text" name="deadline" value= "<fmt:formatDate value='${note.deadline.time}' pattern= 'dd/MM/yyyy'/>"/> <br> --%>
		<%-- <% System.out.println(note.deadline); %> --%>
		<input type='text' name='spotifyurl' value="${note.spotifyurl}"><br>
		

		<br /> <input type="submit" value="Done" />
	</form>
</body>

</html>