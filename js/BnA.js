$(document).ready(function() {
    setCurrentPage("BnA.html");
    var todayMale = new Date();
    var todayMaleString = "<div class='panel-body'>";
    var tmrMaleString = "<div class='panel-body'>";
    var dayAfterMaleString = "<div class='panel-body'>";
    
    db.transaction(function (t) {
        buildDateQuery = "SELECT id, Name FROM male WHERE DOB LIKE '" + getCompareDate(todayMale.getDate(), (todayMale.getMonth() + 1)) +"%'";
        t.executeSql(buildDateQuery, [],
            function (tran, r) {
                for(var i = 0;i<r.rows.length;i++) {
                    todayMaleString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                }

                todayMale.setDate(todayMale.getDate() + 1);
                
                buildDateQuery = "SELECT id, Name FROM male WHERE DOB LIKE '" + getCompareDate(todayMale.getDate(), (todayMale.getMonth() + 1)) +"%'";
                t.executeSql(buildDateQuery, [],
                    function (tran, r) {
                        for(var i = 0;i<r.rows.length;i++) {
                            tmrMaleString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                        }

                        todayMale.setDate(todayMale.getDate() + 1);
                        
                        buildDateQuery = "SELECT id, Name FROM male WHERE DOB LIKE '" + getCompareDate(todayMale.getDate(), (todayMale.getMonth() + 1)) +"%'";
                        t.executeSql(buildDateQuery, [],
                            function (tran, r) {
                                for(var i = 0;i<r.rows.length;i++) {
                                    dayAfterMaleString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                                }
                            },
                            function (t, e) {
                                alert("Error:" + e.message);
                            }
                        );
                    },
                    function (t, e) {
                        alert("Error:" + e.message);
                    }
                );
            },
            function (t, e) {
                alert("Error:" + e.message);
            }
        );
    });

    var todayFemale = new Date();
    var todayFemaleString = "";
    var tmrFemaleString = "";
    var dayAfterFemaleString = "";

    db.transaction(function (t) {
        buildDateQuery = "SELECT id, Name FROM female WHERE DOB LIKE '" + getCompareDate(todayFemale.getDate(), (todayFemale.getMonth() + 1)) +"%'";
        t.executeSql(buildDateQuery, [],
            function (tran, r) {                                
                for(var i = 0;i<r.rows.length;i++) {                                
                    todayFemaleString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                }
                todayFemale.setDate(todayFemale.getDate() + 1);
                
                buildDateQuery = "SELECT id, Name FROM female WHERE DOB LIKE '" + getCompareDate(todayFemale.getDate(), (todayFemale.getMonth() + 1)) +"%'";
                t.executeSql(buildDateQuery, [],
                    function (tran, r) {                                        
                        for(var i = 0;i<r.rows.length;i++) {                                        
                            tmrFemaleString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                        }
                        todayFemale.setDate(todayFemale.getDate() + 1);
                        
                        buildDateQuery = "SELECT id, Name FROM female WHERE DOB LIKE '" + getCompareDate(todayFemale.getDate(), (todayFemale.getMonth() + 1)) +"%'";
                        t.executeSql(buildDateQuery, [],
                            function (tran, r) {                                
                                for(var i = 0;i<r.rows.length;i++) {
                                    dayAfterFemaleString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                                }                                
                            },
                            function (t, e) {
                                alert("Error:" + e.message);
                            }
                        );
                    },
                    function (t, e) {
                        alert("Error:" + e.message);
                    }
                );
            },
            function (t, e) {
                alert("Error:" + e.message);
            }
        );
    });

    var todayKids = new Date();
    var todayKidsString = "";
    var tmrKidsString = "";
    var dayAfterKidsString = "";


    db.transaction(function (t) {
        buildDateQuery = "SELECT id, Name FROM kids WHERE DOB LIKE '" + getCompareDate(todayKids.getDate(), (todayKids.getMonth() + 1)) +"%'";
        t.executeSql(buildDateQuery, [],
            function (tran, r) {                                
                for(var i = 0;i<r.rows.length;i++) {                                
                    todayKidsString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                }
                todayKidsString += "</div>";
                
                todayKids.setDate(todayKids.getDate() + 1);
                
                buildDateQuery = "SELECT id, Name FROM kids WHERE DOB LIKE '" + getCompareDate(todayKids.getDate(), (todayKids.getMonth() + 1)) +"%'";
                t.executeSql(buildDateQuery, [],
                    function (tran, r) {                                        
                        for(var i = 0;i<r.rows.length;i++) {                                        
                            tmrKidsString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                        }
                         
                        tmrKidsString += "</div>";

                        todayKids.setDate(todayKids.getDate() + 1);
                        
                        buildDateQuery = "SELECT id, Name FROM kids WHERE DOB LIKE '" + getCompareDate(todayKids.getDate(), (todayKids.getMonth() + 1)) +"%'";
                        t.executeSql(buildDateQuery, [],
                            function (tran, r) {
                                
                                for(var i = 0;i<r.rows.length;i++) {
                                    dayAfterKidsString += "<a onclick='getParentPage("+r.rows.item(i).id+")'><span>"+r.rows.item(i).Name+"</span></a><br/>";
                                }
                                dayAfterKidsString += "</div>";
                                console.log(todayMaleString);
                                console.log(todayFemaleString);
                                console.log(todayKidsString);
                                console.log(tmrMaleString);
                                console.log(tmrFemaleString);
                                console.log(tmrKidsString);
                                console.log(dayAfterMaleString);
                                console.log(dayAfterFemaleString);
                                console.log(dayAfterKidsString);
                                $("#todayBday").append(todayMaleString + todayFemaleString + todayKidsString);
                                $("#tmrBday").append(tmrMaleString + tmrFemaleString + tmrKidsString);
                                $("#dayAfterBday").append(dayAfterMaleString + dayAfterFemaleString + dayAfterKidsString);
                            },
                            function (t, e) {
                                alert("Error:" + e.message);
                            }
                        );
                    },
                    function (t, e) {
                        alert("Error:" + e.message);
                    }
                );
            },
            function (t, e) {
                alert("Error:" + e.message);
            }
        );
    });

    var todayAsary = new Date();
    var todayAsaryString = "<div class='panel-body'>";    
    var tmrAsaryString = "<div class='panel-body'>";
    var dayAfterAsaryString = "<div class='panel-body'>";

    db.transaction(function (t) {
        buildDateQuery = "SELECT m.id m_id, m.Name m_name, f.id f_id, f.Name f_name FROM common c INNER JOIN male m ON c.id = m.id INNER JOIN female f ON m.spouse_id = f.id WHERE c.DOM LIKE '" + getCompareDate(todayAsary.getDate(), (todayAsary.getMonth() + 1)) +"%' ORDER BY m.Name";
        
        t.executeSql(buildDateQuery, [],
            function (tran, r) {                                
                for(var i = 0;i<r.rows.length;i++) {
                    todayAsaryString += "<div class='Asary'>";
                    todayAsaryString += "<a onclick='getParentPage("+r.rows.item(i).m_id+")'><span>"+r.rows.item(i).m_name+"</span></a><br/>";
                    todayAsaryString += "<a onclick='getParentPage("+r.rows.item(i).f_id+")'><span>"+r.rows.item(i).f_name+"</span></a></div><br/>";
                }

                todayAsaryString += "</div>";
                
                todayAsary.setDate(todayAsary.getDate() + 1);
                
                buildDateQuery = "SELECT m.id m_id, m.Name m_name, f.id f_id, f.Name f_name FROM common c INNER JOIN male m ON c.id = m.id INNER JOIN female f ON m.spouse_id = f.id WHERE c.DOM LIKE '" + getCompareDate(todayAsary.getDate(), (todayAsary.getMonth() + 1)) +"%' ORDER BY m.Name";
                t.executeSql(buildDateQuery, [],
                    function (tran, r) {
                        for(var i = 0;i<r.rows.length;i++) {
                            tmrAsaryString += "<div class='Asary'>";
                            tmrAsaryString += "<a onclick='getParentPage("+r.rows.item(i).m_id+")'><span>"+r.rows.item(i).m_name+"</span></a><br/>";
                            tmrAsaryString += "<a onclick='getParentPage("+r.rows.item(i).f_id+")'><span>"+r.rows.item(i).f_name+"</span></a></div><br/>";
                        }
                         
                        tmrAsaryString += "</div>";

                        todayAsary.setDate(todayAsary.getDate() + 1);
                        
                        buildDateQuery = "SELECT m.id m_id, m.Name m_name, f.id f_id, f.Name f_name FROM common c INNER JOIN male m ON c.id = m.id INNER JOIN female f ON m.spouse_id = f.id WHERE c.DOM LIKE '" + getCompareDate(todayAsary.getDate(), (todayAsary.getMonth() + 1)) +"%' ORDER BY m.Name";
                        t.executeSql(buildDateQuery, [],
                            function (tran, r) {                                
                                for(var i = 0;i<r.rows.length;i++) {
                                    dayAfterAsaryString += "<div class='Asary'>";
                                    dayAfterAsaryString += "<a onclick='getParentPage("+r.rows.item(i).m_id+")'><span>"+r.rows.item(i).m_name+"</span></a><br/>";
                                    dayAfterAsaryString += "<a onclick='getParentPage("+r.rows.item(i).f_id+")'><span>"+r.rows.item(i).f_name+"</span></a></div><br/>";
                                }
                                dayAfterAsaryString += "</div>";
                                
                                console.log(todayAsaryString);                                
                                console.log(tmrAsaryString);                                
                                console.log(dayAfterAsaryString);
                                $("#todayAsary").append(todayAsaryString);
                                $("#tmrAsary").append(tmrAsaryString);
                                $("#dayAferAsary").append(dayAfterAsaryString);
                            },
                            function (t, e) {
                                alert("Error:" + e.message);
                            }
                        );
                    },
                    function (t, e) {
                        alert("Error:" + e.message);
                    }
                );
            },
            function (t, e) {
                alert("Error:" + e.message);
            }
        );
    });
});

function getCompareDate(compareDay, compareMonth) {
    var compareDate = "";
    if (compareDay < 10) {
        compareDate += "0" + compareDay + "-";
    } else {
        compareDate += compareDay + "-";
    }

    if(compareMonth <10) {
        compareDate += "0" + compareMonth;
    } else {
        compareDate += compareMonth;
    }
    return compareDate;
}

function getParentPage(id) {
    setBackPage("BnA.html");
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
    setBackPage("BnA.html");
    displayPage(this.id);
});