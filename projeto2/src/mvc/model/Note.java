package mvc.model;

import java.util.Calendar;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

// Estrutura do dado que irá ser inserido no database, nosso objeto em java, o Javabean.

public class Note {

	private Integer note_id;
	private String content;
	private Integer user_id;
	private String category;
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Calendar deadline;
	private String spotifyurl;

	public Integer getNote_id() {
		return this.note_id;
	}

	public void setNote_id(Integer note_id) {
		this.note_id = note_id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getUser_id() {
		return this.user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Calendar getDeadline() {
		return this.deadline;
	}

	public void setDeadline(Calendar deadline) {
		this.deadline = deadline;
	}

	public String getSpotifyurl() {
		return this.spotifyurl;
	}

	public void setSpotifyurl(String spotifyurl) {
		this.spotifyurl = spotifyurl;
	}
}
