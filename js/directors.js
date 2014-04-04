$(document).ready(function() {
    setCurrentPage("directors.html");
    var directorConcatString = "";
    db.transaction(function (t) {
        t.executeSql("SELECT * FROM directors", [],
            function (tran, r) {
                for(var i =0;i< r.rows.length; i++) {
                    directorConcatString += "<li class='list-group-item'><div class='col-xs-5'>"+r.rows.item(i).type+"</div><div class='col-xs-7'><a onclick='getDirParentPage("+r.rows.item(i).member_id+")'>"+r.rows.item(i).member_name+"</a></div></li>";
                }
                console.log(directorConcatString);
                $(".list-group").append(directorConcatString);
                directorConcatString = "";
            },
            function (t, e) { alert("Error:" + e.message); }
        );
    });
});     

function getDirParentPage(id) {
    setBackPage("directors.html");
    localStorage.setItem("user_id", id);
    if(id % 2 == 0) {
        localStorage.setItem("user_sex", "F");
    }
    else {
        localStorage.setItem("user_sex", "M");
    }
    displayPage("parentInfo.html");
}

$(".getHref").click(function() {
    setBackPage("directors.html");
    displayPage(this.id);
});