<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
        <html>

        <body>
            <h3>Edit note - ${note.note_id}</h3>
            <form action="edit" method="post">
                <input type="hidden" name="note_id" value="${note.note_id}" />
                
                Descrição:

                <br/>
                <textarea name="descricao" cols="80" rows="6"> ${note.content} </textarea>
                <br/>

                <input type="submit" value="Done" />
            </form>
        </body>

        </html>