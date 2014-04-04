$("#search_btn").click(function(e){
    var activeFields = [];
    console.log(JSON.stringify($('form').serializeArray()));
    console.log($('form').serializeArray());
    var searchData = $('form').serializeArray();
    var i = 0;
    $.each(searchData, function(index, val) {
        if(val.value != "") {
            activeFields[i] = true;
        } else {
            activeFields[i] = false;
        }
        i++;
        console.log(index);
        console.log(val);
    });
    var memberName = $("#memberName").val();
    var bloodGroup = $("#bloodGroup").val();
    var memberOccupation = $("#memberOccupation").val();
    console.log(activeFields);
    var queryString = [];
    queryString[0] = "SELECT id, Name FROM male WHERE";
    queryString[1] = "SELECT id, Name FROM female WHERE";
    queryString[2] = "SELECT id, Name FROM kids WHERE";

    console.log(memberName);
    console.log(bloodGroup);
    console.log(memberOccupation);

    var nameQueryString = "Name LIKE '%"+memberName+"%'";
    var bloodQueryString = "Blood_Group = '"+bloodGroup+"'";
    var occupationQueryString = "Occupation LIKE '%"+memberOccupation+"%'";
    console.log("Active fields");

    if(activeFields[0]) {

        queryString[0] += " " + nameQueryString;
        queryString[1] += " " + nameQueryString;
        queryString[2] += " " + nameQueryString;

        if(activeFields[1]) {

            queryString[0] += " AND "+bloodQueryString;
            queryString[1] += " AND "+bloodQueryString;
            queryString[2] += " AND "+bloodQueryString;

            if(activeFields[2]) {

                queryString[0] += " AND "+occupationQueryString;
                queryString[1] += " AND "+occupationQueryString;
                queryString.pop();

            }
        }
    } else if(activeFields[1]) {

        queryString[0] += " " + bloodQueryString;
        queryString[1] += " " + bloodQueryString;
        queryString[2] += " " + bloodQueryString;

        if(activeFields[2]) {

            queryString[0] += " AND "+occupationQueryString;
            queryString[1] += " AND "+occupationQueryString;
            queryString.pop();
        }
    } else if(activeFields[2]) {

        queryString[0] += " " + occupationQueryString;
        queryString[1] += " " + occupationQueryString;
        queryString.pop();
    }

    console.log(queryString[0]);
    console.log(queryString[1]);
    if(queryString.length == 3)
        console.log(queryString[2]);
    

    var k = 0;
    var resultsID = [];
    var resultsName = [];


/*    for(i=0; i < queryString.length;i++) {
        console.log("Value of i :: " + i);

        db.transaction(function (t) {
            console.log(queryString[i]);
            t.executeSql(queryString[i], [],
                function(tran, r) {

                    console.log(queryString[i]);
                    for(var j =0; j< r.rows.length; j++) {
                        console.log(j);
                        console.log(r.rows.length);
                        console.log(r.rows.item(j));
                        resultsID[k] = r.rows.item(j).id;
                        resultsName[k] = r.rows.item(j).Name;
                        console.log("Value of k :: " + k);
                        k++;
                    }                    
                },
                function (t, e) {
                    alert("Error:" + e.message);
                }
            );
        });
    }*/

    db.transaction(function (t) {
        console.log(queryString[0]);
        t.executeSql(queryString[0], [],
            function(tran, r) {
                console.log(queryString[0]);
                for(var j =0; j< r.rows.length; j++) {
                    console.log(j);
                    console.log(r.rows.length);
                    console.log(r.rows.item(j));
                    resultsID[k] = r.rows.item(j).id;
                    resultsName[k] = r.rows.item(j).Name;
                    console.log("Value of k :: " + k);
                    k++;
                }
                console.log(resultsName);
                console.log(resultsID);
                db.transaction(function (t) {
                    console.log(queryString[1]);
                    t.executeSql(queryString[1], [],
                        function(tran, r) {
                            console.log(queryString[1]);
                            for(var j =0; j< r.rows.length; j++) {
                                console.log(j);
                                console.log(r.rows.length);
                                console.log(r.rows.item(j));
                                resultsID[k] = r.rows.item(j).id;
                                resultsName[k] = r.rows.item(j).Name;
                                console.log("Value of k :: " + k);
                                k++;
                            }
                            console.log(resultsName);
                            console.log(resultsID);

                            if(queryString.length == 3) {
                                db.transaction(function (t) {
                                    console.log(queryString[2]);
                                    t.executeSql(queryString[2], [],
                                        function(tran, r) {
                                            console.log(queryString[2]);
                                            for(var j =0; j< r.rows.length; j++) {
                                                console.log(j);
                                                console.log(r.rows.length);
                                                console.log(r.rows.item(j));

                                                resultsID[k] = r.rows.item(j).id;
                                                resultsName[k] = r.rows.item(j).Name;
                                                console.log("Value of k :: " + k);
                                                k++;
                                            }
                                            console.log(resultsName);
                                            console.log(resultsID);
                                            displayResults(k, resultsID, resultsName);
                                        },
                                        function (t, e) {
                                            alert("Error:" + e.message);
                                        }
                                    );
                                });
                            } else {
                                console.log(resultsName);
                                console.log(resultsID);
                                displayResults(k, resultsID, resultsName);
                            }
                        },
                        function (t, e) {
                            alert("Error:" + e.message);
                        }
                    );
                });
            },
            function (t, e) {
                alert("Error:" + e.message);
            }
        );
    });
});


function displayResults(k, resultsID, resultsName) {
    console.log(resultsName);
    console.log(resultsID);

    var searchConcatString = "";
    if(k>0) {
        for(var i=0;i<k;i++) {
            searchConcatString += "<div class='row singleMemberImgAndData'><div class='col-xs-6 singleMemberImgData'><img src='img/DP/"+resultsID[i]+".jpg' class='img-responsive' onerror='imgError(this)'></div><div class='col-xs-6 singleData'>";
            searchConcatString += "<a onclick='getParentPage("+resultsID[i]+")' class='memberLink'><span>"+resultsName[i]+"</span></a></div></div><br/>";
        }
    } else {
        searchConcatString = "<div><h2>NO RESULTS FOUND !! </h2></div>"
    }

    
    console.log(searchConcatString);

    setBackPage(getCurrentPage());
    // append
    $('#searchModal').modal('hide');
    localStorage.setItem("searchData",searchConcatString);
    displayPage("search_results.html");
//    displaySearchPage(searchConcatString);
    searchConcatString = "";
}