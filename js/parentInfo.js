$(document).ready(function() {
  setCurrentPage("parentInfo.html");
  var parentHeaderString = "";
  var parentBodyString = "";
  var kidsOnParentString = "";
  var flag = false;
  console.log("Inside document ready");  

  db.transaction(function (t) {
    var commonMaleId = "";
    var spouseUserId = "";    
    userId = parseInt(localStorage.getItem("user_id"));
    console.log(userId);
    userSex = localStorage.getItem("user_sex");
    console.log(userSex);
    if(userSex == "M") {
      userTableName = "male";
      spouseTableName = "female";
      spouseUserId = userId + 1;
      commonMaleId = userId;
    }
    else {
      userTableName = "female";
      spouseTableName = "male";
      spouseUserId = userId - 1;
      commonMaleId = userId - 1;
    }

    console.log(userTableName);
    console.log(spouseTableName);
    console.log(spouseUserId);
    console.log(commonMaleId);

    buildUserColumnNameQuery = "SELECT sql FROM sqlite_master WHERE type='table' AND name = '"+userTableName+"'";

    t.executeSql(buildUserColumnNameQuery, [],
      function(tran, r) {
        var columnParts = r.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').split(', ');
        var userColumnNames = [];
        for(i in columnParts) {
          if(typeof columnParts[i] === 'string')
            userColumnNames.push(columnParts[i].split(" ")[0]);
        }
        console.log(userColumnNames);
        console.log(userColumnNames.length);
        userColumnNames = userColumnNames.slice(1,(userColumnNames.length-1)).toString();
        console.log(userColumnNames);

        buildUserDataQuery = "SELECT "+userColumnNames+" FROM "+userTableName+" WHERE id="+ userId;

        t.executeSql(buildUserDataQuery, [],
          function (tran, r) {
            userData = r.rows.item(0);

            buildSpouseNameQuery = "SELECT Name FROM "+spouseTableName+" WHERE id="+spouseUserId;
            t.executeSql(buildSpouseNameQuery, [],
              function(tran, r) {
                spouseName = r.rows.item(0).Name;

                buildCommonColumnNameQuery = "SELECT sql FROM sqlite_master WHERE type='table' AND name = 'common'";

                t.executeSql(buildCommonColumnNameQuery, [],
                  function(tran, r) {
                    var columnParts = r.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').split(', ');
                    var commonColumnNames = [];
                    for(i in columnParts) {
                      if(typeof columnParts[i] === 'string')
                        commonColumnNames.push(columnParts[i].split(" ")[0]);
                    }
                    console.log(commonColumnNames);
                    console.log(commonColumnNames.length);
                    commonColumnNames = commonColumnNames.slice(1,(commonColumnNames.length-2)).toString();
                    console.log(commonColumnNames);

                    buildCommonDataQuery = "SELECT "+commonColumnNames+" FROM common WHERE id="+ commonMaleId;
                    t.executeSql(buildCommonDataQuery, [],
                      function(tran, r) {
                        commonData = r.rows.item(0);

                        buildKidsNameQuery = "SELECT id, Name FROM kids WHERE parent_id="+commonMaleId;

                        t.executeSql(buildKidsNameQuery, [],
                          function(tran, r) {
                            if(r.rows.length > 0) {
                              kidsOnParentString += "<div class='container-fluid listItems bg-primary otherDetail'><div class='col-xs-12 col-sm-12 pull-left'><h3>Kids</h3></div></div>";
                              for(var i =0;i< r.rows.length; i++) {
                                kidsOnParentString += "<div class='container detailContent'><div class='row'><a onclick='getKidsModal("+r.rows.item(i).id+")'><div class='col-xs-4'><img src='img/customer.png' class='thumbnail'></div><div class='col-xs-8'><div class='detailKidName'>"+r.rows.item(i).Name+"</div></div></a></div></div>";
                              }
                              $("#kidsOnParent").append(kidsOnParentString);
                            }

                            if(userData.has_partner == 1) {
                              parentBodyString += "<div class='row listItems'><a onclick='getSpousePage("+spouseUserId+")'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='spouseInfoTitleLabel'>Spouse</h4><h5 class='spouseInfoTitleDetail'>"+spouseName+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-chevron-right Icon'></span></div></a></div>";

                              parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Date of Marriage</h4><h5 class='infoTitleDetail'>"+commonData.DOM+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-heart Icon'></span></div></div>";
                            }

                            $.each(userData, function(index, val) {
                              if(val != null) {
                                switch(index) {
                                  case "Name":
                                      parentHeaderString += "<div class='row'><div class='col-xs-12'><div class='detailParentName' align='center'>"+val+"</div></div></div>";
                                      parentHeaderString += "<div class='row'><div class='col-xs-12' align='center'>";
                                      parentHeaderString += "<img class='img-responsive' id='DPimage'></div></div><br/>";
                                    break;
                                  case "DOB":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Date of Birth</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-gift Icon'></span></div></div>";
                                    break;
                                  case "Email":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Email</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-envelope Icon'></span></div></div>";
                                    break;
                                  case "Mobile":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Mobile</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-phone Icon'></span></div></div>";
                                    break;
                                  case "Blood_Group":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Blood Group</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-tint Icon'></span></div></div>";
                                    break;
                                  case "Occupation":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Occupation</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-tint Icon'></span></div></div>";
                                    break;
                                  case "off_addr1":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Office Address</h4><h5 class='infoTitleDetail'>"+val+"<br>";
                                    flag = true;
                                    break;
                                  case "off_addr_area":
                                    if(flag) {
                                      parentBodyString += val +"<br>Chennai ";
                                    } else {
                                      parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Office Address</h4><h5 class='infoTitleDetail'>"+val+"<br>Chennai ";
                                      flag = true;
                                    }
                                    break;
                                  case "off_addr_pin":
                                    if(flag) {
                                      parentBodyString += "- " + val;
                                    } else {
                                      parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Office PinCode</h4><h5 class='infoTitleDetail'>"+val;
                                    }
                                    parentBodyString += "</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-briefcase Icon'></span></div></div>";
                                    break;
                                  case "Office_phone":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Office Phone</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-phone-alt Icon'></span></div></div>";
                                    break;
                                }
                              }
                            });

                            $.each(commonData, function(index, val) {
                              if(val != null) {
                                switch(index) {
                                  case "res_addr1":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Residence Address</h4><h5 class='infoTitleDetail'>"+val+"<br>";
                                    flag = true;
                                    break;
                                  case "res_addr_area":
                                    if(flag) {
                                      parentBodyString += val +"<br>Chennai ";
                                    } else {
                                      parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Residence Address</h4><h5 class='infoTitleDetail'>"+val+"<br>Chennai ";
                                      flag = true;
                                    }
                                    break;
                                  case "res_addr_pin":
                                    if(flag) {
                                      parentBodyString += "- " + val;
                                    } else {
                                      parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Residence PinCode</h4><h5 class='infoTitleDetail'>"+val;
                                    }
                                    parentBodyString += "</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-briefcase Icon'></span></div></div>";
                                    break;
                                  case "Residence_Phone":
                                    parentBodyString += "<div class='row listItems'><div class='col-xs-10 col-sm-11 pull-left'><h4 class='infoTitleLabel'>Residence Phone</h4><h5 class='infoTitleDetail'>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-earphone Icon'></span></div></div>";
                                    break;
                                }
                              }
                            });

                            parentHeaderString += "</div></div>";
                            $("#parentHeader").append(parentHeaderString);
                            $("#parentBody").append(parentBodyString);
                            checkImage(commonMaleId);
                            parentHeaderString = "";
                            parentBodyString = "";
                            kidsOnParentString = "";
                            flag = false;                            
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

function checkImage(userId) {
  var img = new Image();
  img.onload = function() {
      // code to set the src on success
      $("#DPimage").attr("src", imageURL);
  };

  img.onerror = function() {
    // doesn't exist or error loading
    $("#DPimage").attr("src", "img/customer.png");
  };

  var imageURL = "img/DP/"+userId+".jpg";

  img.src = imageURL; // fires off loading of image
}

function getSpousePage(id) {
    setBackPage("parentInfo.html");
    localStorage.setItem("spouse_id", id);
    if(id % 2 == 0) {
        localStorage.setItem("spouse_sex", "F");
    }
    else {
        localStorage.setItem("spouse_sex", "M");
    }
    displayPage("spouseInfo.html");
}

function getKidsModal(id) {
  console.log("The kids modal");
  $("#kidsHeader").empty();
  $("#kidsBody").empty();
  var kidsHeaderString = "";
  var kidsBodyString = "";
  db.transaction(function (t) {
    buildKidsColumnNameQuery = "SELECT sql FROM sqlite_master WHERE type='table' AND name ='kids'";

    t.executeSql(buildKidsColumnNameQuery, [],
      function(tran, r) {
        var columnParts = r.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').split(', ');
        var kidsColumnNames = [];
        for(i in columnParts) {
          if(typeof columnParts[i] === 'string')
            kidsColumnNames.push(columnParts[i].split(" ")[0]);
        }
        console.log(kidsColumnNames);
        console.log(kidsColumnNames.length);
        kidsColumnNames = kidsColumnNames.slice(2, kidsColumnNames.length).toString();
        console.log(kidsColumnNames);

        buildKidsDataQuery = "SELECT "+kidsColumnNames+" FROM kids WHERE id="+id;
        t.executeSql(buildKidsDataQuery, [],
          function(tran, r) {
            kidsData = r.rows.item(0);
            kidsHeaderString += "<div class='row'><div class='col-xs-4'><img src='img/customer.png' class='thumbnail'></div><div class='col-xs-8'>";

            $.each(kidsData, function(index, val) {
              if(val != null) {
                switch(index) {
                  case "Name":
                    kidsHeaderString += "<div class='detailParentName'>"+val+"</div>";
                    break;
                  case "DOB":
                    kidsBodyString += "<div class='row kidsItems'><div class='col-xs-10 col-sm-11 pull-left'><h4>Date of Birth</h4><h5>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-gift Icon'></span></div></div>";
                    break;
                  case "Email":
                    kidsBodyString += "<div class='row kidsItems'><div class='col-xs-10 col-sm-11 pull-left'><h4>Email</h4><h5>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-envelope Icon'></span></div></div>";
                    break;
                  case "Mobile":
                    kidsBodyString += "<div class='row kidsItems'><div class='col-xs-10 col-sm-11 pull-left'><h4>Mobile</h4><h5>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-phone Icon'></span></div></div>";
                    break;
                  case "Blood_Group":
                    kidsBodyString += "<div class='row kidsItems'><div class='col-xs-10 col-sm-11 pull-left'><h4>Blood Group</h4><h5>"+val+"</h5></div><div class='col-xs-2 col-sm-1 pull-right'><span class='glyphicon glyphicon-tint Icon'></span></div></div>";
                    break;              
                }
              }
            });

            kidsHeaderString += "</div></div>";
            $("#kidsHeader").append(kidsHeaderString);
            $("#kidsBody").append(kidsBodyString);
            $('#kidsModal').modal('show');
            kidsHeaderString = "";
            kidsBodyString = "";
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
}

$(document).on('click','.click', function(e) {
    //Get the id of this clicked item
    if (typeof(Storage) != "undefined")
    {
        // Store
        localStorage.setItem("kid_id", this.id);        
    }
    else
    {
        alert("error");
    }
});