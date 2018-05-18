package mvc.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
//		System.out.println(note_id);
		try {
			DAO dao = new DAO();
			model.addAttribute("note", dao.findNote(note_id));
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "edit";
	}

	@RequestMapping("editNote")
	public String edit(Note note) {
		try {
			DAO dao = new DAO();
			System.out.println(note.getNote_id());
			System.out.println(note.getCategory());
			System.out.println(note.getDeadline());
			dao.update(note);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}

	// Login and session
	@RequestMapping("loginform")
	public String login() {
		return "loginform";
	}
	
	@RequestMapping("signup")
	public String signup() {
		return "signupform";
	}

	@RequestMapping("register")
	public String add(String username, String pwd) {
		System.out.println(username);
		System.out.println(pwd);
		try {
			System.out.println(username);
			System.out.println(pwd);
			User user = new User();
			user.setUsername(username);
			user.setPassword(pwd);
			DAO dao = new DAO();
			dao.createUser(user);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return "redirect:loginform";
	}

	@RequestMapping("login")
	public String login(String username, String pwd, HttpSession session) {
		try {
			User user = new User();
			user.setUsername(username);
			user.setPassword(pwd);
			if (new DAO().userExists(user)) {
				session.setAttribute("userlogged", user.getUsername());
				return "redirect:/";
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
//		System.out.println("user not found");
		return "redirect:loginform";
	}

	@RequestMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:loginForm";
	}

}