<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style><%@ include file="/css/style.css"%></style>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title> To-Do List </title>
</head>
<body>

	<h1> To-Do List </h1>
	<table align = "center">
		<tr>
			<th>What to do?</th>
			<th>Category</th>
			<th>Play your music!</th>
			<th>Deadline</th>
			<th></th>
			<th></th>
		</tr>
		<c:forEach items="${notes}" var="notes">
			<tr>

				<td>${notes.content}</td>
				<td>${notes.category}</td>
				
				<c:choose>
					<c:when test="${not empty notes.spotifyurl}">
						<td><iframe
							src="https://open.spotify.com/embed?uri=${notes.spotifyurl}"
							width="300" height="80" frameborder="0" allowtransparency="true"
							allow="encrypted-media"></iframe></td>
					</c:when>
					
					<c:otherwise>
					<td> No music inserted </td>
					</c:otherwise>
				
				
				</c:choose> 
				
				
				<td><fmt:formatDate value="${notes.deadline.time}" pattern="dd/MM/yyyy"/></td>
				<td><a href="remove?note_id=${notes.note_id}">Finished</a></td>
				<td><a href="edit?note_id=${notes.note_id}">Edit</a></td>


			</tr>
		</c:forEach>
	</table>
	<a href="create">Create note</a>
</body>
</html>