$(document).ready(function() {   
    $(".homeContent").append(localStorage.getItem("searchData"));    
});

function getParentPage(id) {
    setBackPage("search_results.html");
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
  setBackPage("search_results.html");
  displayPage(this.id);
});