$(document).ready(function() {
	setCurrentPage("home.html");	
});

$(".getHref").click(function() {
	setBackPage("home.html");
	displayPage(this.id);
});