$(document).ready(function() {
    setCurrentPage("events.html");
	var eventConcatString = "";
	var anEventString = "anEvent";
	var collapseString = "collapse";
	var eventDataConcatString = "eventData";
	var j = 0;
    console.log("events"); 
    db.transaction(function (t) {
    	t.executeSql("SELECT * FROM events", [],
    		function (tran, r) {
                eventConcatString += "<div class='panel-group' id='"+anEventString+"'>";
    			for(var i =0;i< r.rows.length; i++) {    				
					eventConcatString += "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'>";
    				$.each(r.rows.item(i), function(index, val) {
    					if(val != null) {
    						switch(index) {
    							case "Title":
    								eventConcatString += "<a data-toggle='collapse' data-parent='#"+anEventString+"' href='#"+collapseString+j+"'>"+val+"</a></h4></div>";
									eventConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse in'><div class='panel-body'><div class='panel-group' id='"+eventDataConcatString+i+"'>";
									j++;
    								break;
    							case "Description":
                                    eventConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
    								eventConcatString += "<a data-toggle='collapse' data-parent='#"+eventDataConcatString+i+"' href='#"+collapseString+j+"'>"+index+"</a></h4></div>";
    								eventConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse in'><div class='panel-body'>"+val+"</div></div></div>";
    								j++;
									break;
    							case "Date":
                                    eventConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
    								eventConcatString += "<a data-toggle='collapse' data-parent='#"+eventDataConcatString+i+"' href='#"+collapseString+j+"'>Time</a></h4></div>";
    								eventConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'>"+val;
    								break;
    							case "Time":
    								eventConcatString += " At "+val+"</div></div></div>";
    								j++;
    								break;
    							case "Location":
                                    eventConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
    								eventConcatString += "<a data-toggle='collapse' data-parent='#"+eventDataConcatString+i+"' href='#"+collapseString+j+"'>"+index+"</a></h4></div>";
    								eventConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'>"+val+"</div></div></div>";
    								j++;
    								break;
    							case "Dress_Code":
                                    eventConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
    								eventConcatString += "<a data-toggle='collapse' data-parent='#"+eventDataConcatString+i+"' href='#"+collapseString+j+"'>Dress Code</a></h4></div>";
    								eventConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'>"+val+"</div></div></div>";
    								break;
    						}
    					}
    				});
                    eventConcatString += "</div></div></div></div>";
    			}
                eventConcatString += "</div>";
    			console.log(eventConcatString);
    			$(".homeContent").append(eventConcatString);
    			eventConcatString = "";
    		},
    		function (t, e) {
                alert("Error:" + e.message);
            }
		);
    });
});

$(".getHref").click(function() {
    setBackPage("events.html");
    displayPage(this.id);
});