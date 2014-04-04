$(document).ready(function() {
    setCurrentPage("members.html");
    var memberConcatString = "";
    console.log("works");    
    db.transaction(function (t) {
        t.executeSql("SELECT m.has_partner, m.id m_id, m.Name m_name, f.id f_id, f.Name f_name FROM male AS m JOIN female AS f ON m.spouse_id = f.id ORDER BY m.Name", [],
            function (tran, r) {
                for(var i =0;i< r.rows.length; i++) {
                    if(r.rows.item(i).has_partner == 1) {
                        memberConcatString += "<div class='row memberImgAndData'><div class='col-xs-6 memberImgData'><img src='img/DP/"+r.rows.item(i).m_id+".jpg' class='img-responsive' onerror='imgError(this)'></div><div class='col-xs-6 coupleData'>";

                        memberConcatString += "<a onclick='getParentPage("+r.rows.item(i).m_id+")' class='memberLink'><span>"+r.rows.item(i).m_name+"</span></a><hr class='coupleDivider'>";

                        memberConcatString += "<a onclick='getParentPage("+r.rows.item(i).f_id+")' class='memberLink'><span>"+r.rows.item(i).f_name+"</span></a></div></div><br/>";
                    } else {
                        memberConcatString += "<div class='row singleMemberImgAndData'><div class='col-xs-6 singleMemberImgData'><img src='img/DP/"+r.rows.item(i).m_id+".jpg' class='img-responsive' onerror='imgError(this)'></div><div class='col-xs-6 singleData'>";

                        memberConcatString += "<a onclick='getParentPage("+r.rows.item(i).m_id+")' class='memberLink'><span>"+r.rows.item(i).m_name+"</span></a></div></div><br/>";
                    }
                    console.log(memberConcatString);
                    $(".homeContent").append(memberConcatString);
                    memberConcatString = "";
                }
                memberConcatString = "";
            },
            function (t, e) {
                alert("Error:" + e.message);
            }
        );
    });
});

function getParentPage(id) {
    setBackPage("members.html");
    localStorage.setItem("user_id", id);
    if(id % 2 == 0) {
        localStorage.setItem("user_sex", "F");
    }
    else {
        localStorage.setItem("user_sex", "M");
    }
    displayPage("parentInfo.html");
}

function imgError(source) {
    console.log("error");
    source.src = "img/customer.png";
    if($(source).parent().hasClass('memberImgData')) {          
      $(source).parent().removeClass("col-xs-6");
      $(source).parent().addClass("col-xs-5");
      $(source).parent().next().removeClass("col-xs-6 coupleData");
      $(source).parent().next().addClass("col-xs-7");
    } else {          
      $(source).parent().removeClass("col-xs-6");
      $(source).parent().addClass("col-xs-5");
      $(source).parent().next().removeClass("col-xs-6 singleData");
      $(source).parent().next().addClass("col-xs-7 noData");
    }
  }

$(".getHref").click(function() {
    setBackPage("members.html");
    displayPage(this.id);
});