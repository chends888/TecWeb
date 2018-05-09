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
		connection = (Connection) DriverManager.getConnection("jdbc:mysql://localhost/projeto2", "root", "8888");
	}

	public List<Note> getList() {
		List<Note> Notes = new ArrayList<Note>();
		PreparedStatement stmt;
		try {
			stmt = connection.prepareStatement("SELECT * FROM Notes");
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				Note note = new Note();
				note.setNote_id(rs.getInt("note_id"));
				note.setContent(rs.getString("content"));
				note.setUser_id(rs.getInt("user_id"));
				note.setCategory(rs.getString("category"));
				Calendar deadline = Calendar.getInstance();
				deadline.setTime(rs.getDate("deadline"));
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
		String sql = "INSERT INTO Notes" + "(content,user_id,category,deadline,spotifyurl) values(?,?,?,?,?)";
		PreparedStatement stmt;
		try {
			stmt = connection.prepareStatement(sql);
			stmt.setString(1, note.getContent());
			stmt.setLong(2, note.getUser_id());
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
		PreparedStatement stmt;
		try {
			stmt = connection.prepareStatement(sql);
			stmt.setString(1, note.getContent());
			stmt.setLong(2, note.getUser_id());
			stmt.setString(3, note.getCategory());
			stmt.setDate(4, new Date(note.getDeadline().getTimeInMillis()));
			stmt.setString(5, note.getSpotifyurl());
			stmt.setInt(5, note.getNote_id());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void remove(Integer id) {
		PreparedStatement stmt;
		try {
			stmt = connection.prepareStatement("DELETE FROM Notes WHERE note_id=?");
			stmt.setLong(1, id);
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

}