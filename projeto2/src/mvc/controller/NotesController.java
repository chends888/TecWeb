package mvc.controller;

import java.sql.SQLException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import mvc.model.DAO;
import mvc.model.Note;
import mvc.model.User;

@Controller
public class NotesController {

	@RequestMapping("/")
	public String lista(Model model) {

		try {
			DAO dao = new DAO();
			model.addAttribute("notes", dao.getList());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return "home";
	}

	@RequestMapping("create")
	public String create() {
		return "create";
	}

	@RequestMapping("createNote")
	public String add(Note note) {

		try {
			DAO dao = new DAO();
			dao.create(note);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}

	@RequestMapping("remove")
	public String remove(Note note) {
		try {
			DAO dao = new DAO();
			dao.remove(note);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}

	@RequestMapping("edit")
	public String edit(Integer note_id, Model model) {
		System.out.println(note_id);
		try {
			DAO dao = new DAO();
			// model.addAttribute("note", dao.findNote(note_id));
			model.addAttribute("note", dao.findNote(note_id));
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
//		System.out.println(model);
		return "edit";
	}

	@RequestMapping("editNote")
	public String edit(Note note) {
		try {
			DAO dao = new DAO();
			dao.update(note);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}
	
	
	// Login and session
	@RequestMapping("signup")
	public String signup() {
		return "signupform";
	}
	
	@RequestMapping("addUser")
	public String adiciona(User user) {

		try {
			DAO dao = new DAO();
			dao.createUser(user);
			System.out.println(user.getPassword());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}
}