package mvc.model;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

// Estabelecer a conexão com database MySQL e tratar as requisições do CRUD
public class DAO {
	private Connection connection = null;

	public DAO() throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		connection = (Connection) DriverManager.getConnection("jdbc:mysql://localhost/projeto2", "chends", "8888");
	}

	public List<Note> getList() {
		List<Note> Notes = new ArrayList<Note>();
		try {
			PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Notes");
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Note note = new Note();
				note.setNote_id(rs.getInt("note_id"));
				note.setContent(rs.getString("content"));
				note.setUser_id(rs.getInt("user_id"));
				note.setCategory(rs.getString("category"));
				// TODO hardcode
				Calendar deadline = Calendar.getInstance();
				Date day = rs.getDate("deadline");
				deadline.setTime(day);
				note.setDeadline(deadline);
				note.setSpotifyurl(rs.getString("spotifyurl"));
				Notes.add(note);
			}
			rs.close();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return Notes;
	}

	public void close() {
		try {
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void create(Note note) {
		try {
			String sql = "INSERT INTO Notes (content, user_id, category, deadline, spotifyurl) values(?,?,?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, note.getContent());
			// TODO Fix hardcode
			stmt.setInt(2, 3);
			stmt.setString(3, note.getCategory());
			stmt.setDate(4, new Date(note.getDeadline().getTimeInMillis()));
			stmt.setString(5, note.getSpotifyurl());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void update(Note note) {
		String sql = "UPDATE Notes SET " + "content=?, user_id=?, category=?, deadline=?, spotifyurl=? WHERE note_id=?";
		try {
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, note.getContent());
			// TODO Fix hardcode
			stmt.setLong(2, 2);
			stmt.setString(3, note.getCategory());
			// TODO Fix hardcode
			// stmt.setDate(4, null);
			stmt.setDate(4, new Date(note.getDeadline().getTimeInMillis()));
			stmt.setString(5, note.getSpotifyurl());
			stmt.setInt(6, note.getNote_id());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void remove(Note note) {
//		System.out.println(note);
//		System.out.println(note.getNote_id());
		try {
			PreparedStatement stmt = connection.prepareStatement("DELETE FROM Notes WHERE note_id=?");
			stmt.setInt(1, note.getNote_id());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	public Note findNote(Integer note_id) {
//		System.out.println(note_id);
		Note note = new Note();
		try {
			PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Notes WHERE note_id = ?");
			stmt.setLong(1, note_id);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				note.setNote_id(rs.getInt("note_id"));
				note.setContent(rs.getString("content"));
				note.setUser_id(rs.getInt("user_id"));
				note.setCategory(rs.getString("category"));
				Calendar deadline = null;
				note.setDeadline(deadline);
				note.setSpotifyurl(rs.getString("spotifyurl"));
			}

//			System.out.println(note.getContent());
			rs.close();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return note;
	}
	
	public void createUser(User user) {
		try {
			String sql = "INSERT INTO User (username, pwd) values(?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			System.out.println(user.getPassword());
			stmt.setString(1, user.getUsername());
			stmt.setString(2, user.getPassword());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}