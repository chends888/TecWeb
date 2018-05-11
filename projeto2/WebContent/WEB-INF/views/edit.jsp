<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>

<body>
	<h3>Edit note - ${note.note_id}</h3>
	<c:out value="${note.note_id}"/>
	<form action="editNote" method="post">
		<input type="hidden" name="note_id" value="${note.note_id}" />

		Descrição: <br />
		<textarea name="content" cols="80" rows="6"> ${note.content} </textarea>
		<br /> <input type="submit" value="Done" />
	</form>
</body>

</html>