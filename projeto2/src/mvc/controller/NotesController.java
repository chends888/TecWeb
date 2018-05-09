package mvc.controller;

import java.sql.SQLException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import mvc.model.DAO;
import mvc.model.Note;

@Controller
public class NotesController {
	@RequestMapping("/")
	public String execute() {
		// System.out.println("Lógica do MVC");
		return "create";
	}

	@RequestMapping("createNote")
	public String create(Note note) {
		DAO dao;
		try {
			dao = new DAO();
			dao.create(note);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "create";
	}
}