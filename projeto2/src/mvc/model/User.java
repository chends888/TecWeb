package mvc.model;

public class User {
	
	private Integer user_id;
	private String username;
	private String senha;
	
	public Integer getUser_id() {
		return this.user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	
	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
	public String getPassword() {
		return this.senha;
	}

	public void setPassword(String pwd) {
		this.senha = pwd;
	}


}
