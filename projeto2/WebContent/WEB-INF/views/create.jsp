<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<style>
	<%@ include file="/css/style.css"%>
	
/* Popup container - can be anything you want */
.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* The actual popup */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
    color: #DFDFDF;
	font-family: Helvetica, Arial, sans-serif;
}

/* Popup arrow */
.popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
    from {opacity: 0;} 
    to {opacity: 1;}
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
}
	
	


</style>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>Create Note</title>

	
</head>
<body>
	<h2> Creating note </h2>
	<form action='createNote' method='post'>
	<!-- TODO -->
	<%-- <input type="hidden" name="note_id" value="${note.n}"/> --%>
	<input type='text' name='content' placeholder="Note Content (required)"><br>
	<input type='text' name='category' placeholder="Category"><br>
	<input type='text' name='deadline' placeholder="Deadline (dd/MM/yyyy)"><br>
	<input type='text' name='spotifyurl' placeholder="URI"><br>

	<div class="popup" onclick="myFunction()">How to get URI?
	<span class="popuptext" id="myPopup">Right click song/album/playlist etc > Share > Copy Spotify URI</span>
	</div>

	<script>
	// When the user clicks on div, open the popup
	function myFunction() {
	    var popup = document.getElementById("myPopup");
	    popup.classList.toggle("show");
	}
	</script>
		
		<br>
		<input type='submit' value='Submit'>
		</form>

</body>
</html>