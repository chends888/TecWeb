<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<html>
<body>
	<table>
		<tr>
			<th>Descrição</th>
			<th>Finalizado</th>
			<th>Data de finalização</th>
			<th>Data de finalização</th>
		</tr>
		<c:forEach items="${notes}" var="notes">
			<tr>

				<td>${notes.content}</td>
				<td>${notes.category}</td>
				<td>${notes.spotifyurl}</td>
				<td><a href="remove?note_id=${notes.note_id}">Remove</a></td>
				<td><a href="edit?note_id=${notes.note_id}">Edit</a></td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>