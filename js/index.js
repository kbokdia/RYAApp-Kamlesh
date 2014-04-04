var db;
var backLog = [];
var backURL = "";
// Wait for device API libraries to load
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {    
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("backbutton", onBackKeyDown, false);

    if(localStorage.getItem("localDBversion") == null) {
        localStorage.setItem("dbInit", false);
        console.log("No DB .. dbInit set to false");
    }
    else {
        console.log(localStorage.getItem("localDBversion"));    
        localStorage.setItem("dbInit", true);
        console.log("DB present .. dbInit set to true");
    }
    
    $("#loadAd").fadeOut("slow");
	
    if(getBoolean(localStorage.getItem("isLoggedIn")) != true) {
        displayPage("login.html");
        console.log("no login");
    } else {
        displayPage("home.html");
        console.log("Loginned");
    }

    onStartDBcheck(localStorage.getItem("dbInit"));
}

// Handle the Pause event
//

function onPause() {
    console.log("app was paused by user");
}

// Handle the resume event
//

function onResume() {
    console.log("resumed");
    onResumeDBcheck(localStorage.getItem("dbInit"));
}

function onResumeDBcheck(dbInit) {
    console.log("Checking on resume connection");
    // Check on resume connection

    if(isConnectionAvailable()) {
        // Connection available
        console.log("Connection Available");
        getResumeOnlineDBversion();
    }
    else {
        // Connection not available
        // DB not initialized , insert Pre-Installed DB.

        console.log("Connection not available");

        if(!(getBoolean(dbInit))) {
            console.log("Inserting Pre-Installed DB");
            initDB(1);
            setupOfflineDB();  
            // SET dbInit to true
            // SET localDBversion to the version of the DB which you have inserted.     LIKE localDBversion = 1;
        }
    }        
}


// GET the Resume online database version
//

function getResumeOnlineDBversion() {
    var url = "http://incorelabs.com/rya/admin/db_version.php";         // GET ONLINE DB version
    $.getJSON(url, function(json) {
        console.log(json[0][0]);
        matchResumeDB(json[0][0]);
    });
}


// MATCH the localDBversion with the onlineDBversion
//

function matchResumeDB(onlineDBversion) {
    if(getBoolean(localStorage.getItem("dbInit"))) {            // DB is initialized
        console.log("DB is intialized");
        if(localStorage.getItem("localDBversion") != onlineDBversion) {       // Check the DB version
            // get DB from server and insert.
            setupResumeOnlineDB(true);
            console.log("inserting from server");
        }            
    }
    else {
        // DB not initialized
        // get DB from server and insert
        console.log("DB is not intialized");
        initDB(onlineDBversion);
        // SET dbInit to true
        setupResumeOnlineDB(false);
        console.log("Then insert the DB from server.");
    }
}

// Check the versioning and insertion of DB.
//

function onStartDBcheck(dbInit) {
    console.log("Checking connection");
    // Check connection

    if(isConnectionAvailable()) {
        // Connection available
        console.log("Connection Available");
        getStartOnlineDBversion();
    }
    else {
        // Connection not available
        // DB not initialized , insert Pre-Installed DB.
        console.log("Connection not available");

        if(getBoolean(dbInit)) {
            initDB(localStorage.getItem("localDBversion"));
            createUserTable(localStorage.getItem("userData"));

            createTable(localStorage.getItem("maleData"));

            createTable(localStorage.getItem("femaleData"));

            createTable(localStorage.getItem("commonData"));

            createTable(localStorage.getItem("kidsData"));

            createTable(localStorage.getItem("directorsData"));

            createTable(localStorage.getItem("eventsData"));
        } else {
            console.log("Inserting Pre-Installed DB");
            initDB(1);
            setupOfflineDB();  
            // SET dbInit to true
            // SET localDBversion to the version of the DB which you have inserted.     LIKE localDBversion = 1;
        }
    }        
}

// GET the Resume online database version
//

function getStartOnlineDBversion() {
    var url = "http://incorelabs.com/rya/admin/db_version.php";         // GET ONLINE DB version
    $.getJSON(url, function(json) {
        console.log(json[0][0]);
        initDB(json[0][0]);
        setupStartOnlineDB();
    });
}

// Intialize DB
//

function initDB(onlineDBversion) {
    var dbVersion = onlineDBversion;
    var dbName = "EGAdb";
    var dbDisplayName = "EGAdatabase";
    var dbSize = 4 * 1024 * 1024;
    if (window.openDatabase) {
        db = openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
        localStorage.setItem("dbInit", true);
        localStorage.setItem("localDBversion",dbVersion);
        console.log("Initial DB version :: " + db.version);
    } else {
        db = null;
        alert("REGRETSS!!! Switch to a Webkit-based Device");
    }    
}

function setupStartOnlineDB() {
    var url = "http://incorelabs.com/rya/admin/users.php";    

    $.getJSON(url, function(userData) {

        localStorage.setItem("userData", userData);

        createUserTable(localStorage.getItem("userData"));
    });

    url = "http://incorelabs.com/rya/admin/male.php";

    $.getJSON(url, function(maleData) {

        localStorage.setItem("maleData", maleData);

        createTable(localStorage.getItem("maleData"));
    });

    url = "http://incorelabs.com/rya/admin/female.php";

    $.getJSON(url, function(femaleData) {

        localStorage.setItem("femaleData", femaleData);

        createTable(localStorage.getItem("femaleData"));
    });

    url = "http://incorelabs.com/rya/admin/common.php";

    $.getJSON(url, function(commonData) {

        localStorage.setItem("commonData", commonData);

        createTable(localStorage.getItem("commonData"));

    });
    
    url = "http://incorelabs.com/rya/admin/kids.php";

    $.getJSON(url, function(kidsData) {

        localStorage.setItem("kidsData", kidsData);

        createTable(localStorage.getItem("kidsData"));

    });

    url = "http://incorelabs.com/rya/admin/directors.php";

    $.getJSON(url, function(directorsData) {

        localStorage.setItem("directorsData", directorsData);

        createTable(localStorage.getItem("directorsData"));
    });

    url = "http://incorelabs.com/rya/admin/events.php";

    $.getJSON(url, function(eventsData) {

        localStorage.setItem("eventsData", eventsData);

        createTable(localStorage.getItem("eventsData"));
    });
}

// Setup Offline DB
//

function setupOfflineDB() {
    createTable(offline_users_data);
    createTable(offline_male_data);
    createTable(offline_female_data);
    createTable(offline_common_data);
    createTable(offline_kids_data);
    createTable(offline_directors_data);
    createTable(offline_events_data);
}

// Setup Online DB
//

function setupResumeOnlineDB(isDBintialized) {
    var url = "http://incorelabs.com/rya/admin/users.php";    

    $.getJSON(url, function(userData) {

        localStorage.setItem("userData", userData);

        if(isDBintialized) {
            var mixedBagUser = localStorage.getItem("userData").split("&#");
            deleteUserTable("users", mixedBagUser);
        } else
            createUserTable(localStorage.getItem("userData"));
    });

    url = "http://incorelabs.com/rya/admin/male.php";

    $.getJSON(url, function(maleData) {

        localStorage.setItem("maleData", maleData);

        if(isDBintialized) {
            var mixedBagMale = localStorage.getItem("maleData").split("&#");
            deleteTable("male", mixedBagMale);
        }
            
        else
            createTable(localStorage.getItem("maleData"));
    });

    url = "http://incorelabs.com/rya/admin/female.php";

    $.getJSON(url, function(femaleData) {

        localStorage.setItem("femaleData", femaleData);

        if(isDBintialized) {
            var mixedBagFemale = localStorage.getItem("femaleData").split("&#");
            deleteTable("female", mixedBagFemale);
        }
            
        else
            createTable(localStorage.getItem("femaleData"));
    });

    url = "http://incorelabs.com/rya/admin/common.php";

    $.getJSON(url, function(commonData) {

        localStorage.setItem("commonData", commonData);

        if(isDBintialized) {
            var mixedBagCommon = localStorage.getItem("commonData").split("&#");
            deleteTable("common", mixedBagCommon);
        }
            
        else
            createTable(localStorage.getItem("commonData"));
    });
    
    url = "http://incorelabs.com/rya/admin/kids.php";

    $.getJSON(url, function(kidsData) {

        localStorage.setItem("kidsData", kidsData);

        if(isDBintialized) {
            var mixedBagKids = localStorage.getItem("kidsData").split("&#");
            deleteTable("kids", mixedBagKids);
        }
            
        else
            createTable(localStorage.getItem("kidsData"));
    });

    url = "http://incorelabs.com/rya/admin/directors.php";

    $.getJSON(url, function(directorsData) {

        localStorage.setItem("directorsData", directorsData);

        if(isDBintialized) {
            var mixedBagDirectors = localStorage.getItem("directorsData").split("&#");
            deleteTable("directors", mixedBagDirectors);
        }
            
        else
            createTable(localStorage.getItem("directorsData"));
    });

    url = "http://incorelabs.com/rya/admin/events.php";

    $.getJSON(url, function(eventsData) {

        localStorage.setItem("eventsData", eventsData);

        if(isDBintialized) {
            var mixedBagEvents = localStorage.getItem("eventsData").split("&#");
            deleteTable("events", mixedBagEvents);
        }
            
        else
            createTable(localStorage.getItem("eventsData"));
    });
}

// DELETE USER Table
function deleteUserTable(tableName, data) {
    db.transaction(function (e) {
        buildDeleteQuery = "DELETE FROM "+tableName;
        e.executeSql(buildDeleteQuery,[], insertUserTable(data), onDbError);
    });
}

// Create USER Table
//
function createUserTable(data) {
    console.log(data);
    var mixedBag = data.split("&#");

    db.transaction(function (t) {        
        t.executeSql(mixedBag[0], [], insertUserTable(mixedBag), onDbError);
    });
}

// Insert USER Table
// 

function insertUserTable(createAndInsertUser) {
    for(var i=1;i<createAndInsertUser.length;i++) {
        insertUserData(createAndInsertUser[i]);
    }
}

// Insert USER Data
//

function insertUserData(insertQueryUser) {    
    db.transaction(function (e) {        
        e.executeSql(insertQueryUser, [], onUserDBcreated, onDbError);
    });
}

// USER DB Created
//

function onUserDBcreated() {
    console.log("This is done.");    
}

// Create Table
//

function createTable(data) {
    console.log(data);
    var mixedBag = data.split("&#");

    db.transaction(function (t) {        
        t.executeSql(mixedBag[0], [], insertTable(mixedBag), onDbError);
    });
}

// Insert Table
// 

function insertTable(createAndInsert) {
    for(var i=1;i<createAndInsert.length;i++) {
        insertData(createAndInsert[i]);
    }
}

// Insert Data
//

function insertData(insertQuery) {    
    db.transaction(function (e) {        
        e.executeSql(insertQuery, [], onDbSuccess, onDbError);
    });
}

// DROP TABLE
function deleteTable(tableName, data) {
    db.transaction(function (e) {
        buildDeleteQuery = "DELETE FROM "+tableName;
        e.executeSql(buildDeleteQuery,[], insertTable(data), onDbError);
    });
}

// Success DB Transaction
//

function onDbSuccess(e) {
    console.log("Successfull DB call");
}

// Error DB Transaction
//

function onDbError(e) {
    console.log("Failed DB call");
}

// Handle Netwrok Status
//

function isConnectionAvailable() {
    var networkState = navigator.connection.type;

    if(networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
        return false;
    } else {
        return true;
    }
}

// Convert String to Boolean
//

function getBoolean(boolString) {
    return ((boolString == "true") ? true : false);
}

// SET current page for each page

function setCurrentPage(url) {
    localStorage.setItem("currentPage", url);
}

// GET current page

function getCurrentPage() {
    return localStorage.getItem("currentPage");
}



// SET the BACK page
function setBackPage(url) {
    if(localStorage.getItem("backLog") == null) {
        localStorage.setItem("backLog",url);
    }
    else {
        backLog = localStorage.getItem("backLog").split(",");
        backLog.push(url);
        console.log(backLog.toString());
        localStorage.setItem("backLog", backLog.toString());
        backLog = [];
    }
}

// GET the BACK page
function getBackPage() {
    console.log("Back Page function called");
    if(localStorage.getItem("backLog") != null) {
        backLog = localStorage.getItem("backLog").split(",");
        backURL = backLog.pop();
        console.log("the value of backURL inside BAck Page function");
        console.log(backURL);
        if(backLog.length > 0) {
            localStorage.setItem("backLog", backLog);
        }
        else {
            localStorage.removeItem("backLog");
        }
    }
    else {
        console.log("empty");
        backURL = "";
    }
    return backURL;
}

// DISPLAY page using AJAX.

function displayPage(url) {
    $("#app").empty();
    $.get(url, function(data) {       
        $("#app").html(data);
    });
}

$(document).on('click','.backBtn', function(e) {
    console.log("backbutton clicked");
    console.log(backURL);
    console.log("the url");
    var url = getBackPage();
    console.log(url);
    if(url != "") {
        console.log("backbutton clicked inside if");
        displayPage(url);
    } else {
        navigator.notification.confirm('Do you want to exit ?', onConfirm, 'Confirmation', ['Yes','No']);
    }
});

function onBackKeyDown() {    
    console.log("backbutton clicked");
    console.log(backURL);
    console.log("the url");
    var url = getBackPage();
    console.log(url);
    if(url != "") {
        console.log("backbutton clicked inside if");
        displayPage(url);
    } else {
        navigator.notification.confirm('Do you want to exit ?', onConfirm, 'Confirmation', ['Yes','No']);
    }    
}

function onConfirm(buttonIndex) {
    if(buttonIndex == 1) {
        navigator.app.exitApp();
    } else {
        return;
    }
}

// Offline Table DATA
//

var offline_male_data = new Array();
offline_male_data = [
    ["male"],
    ["male_id","male_name","male_dob","male_email_id","male_mobile","male_blood_group","male_off_addr_1","male_off_addr_2","male_off_addr_area","male_off_addr_pin","male_off_phone","has_partner","spouse_id"],
    ["INTEGER","TEXT","TEXT","TEXT","TEXT","TEXT","TEXT","TEXT","TEXT","INTEGER","TEXT","INTEGER","INTEGER"],

    ["PRIMARY KEY NOT NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL","NOT NULL","NOT NULL"],

    [101,"Neelabh Pandey","17-05-1992","incore.labs.np@gmail.com","+918750241945","O+","Hch",null,"Mallital",263001,"05942232380",1,102],
    [103,"Sachin Tiwari","18-05-1992","sachin_tiwari@gmail.com","+919897474103","O-","C-301","Kakkan Street","Potheri",603203,"05942232381",1,104],
    [105,"Darshan Turakhia","19-05-1992","daru@gmail.com","+919897474105","B+","C-302","Kakkan Street","Potheri",603203,"05942232382",0,106],
    [107,"Gaurav Gandhi","20-05-1992","gaurav@gmail.com","+919897474107","O+","B-303","Kakkan Street","Potheri",603203,"05942232383",1,108],
    [109,"Pranav Navnit","21-05-1192","pranav@gmail.com","+919897474109","B+","B-303","Kakkan Street","Potheri",603203,"05942232383",1,110],
    [111,"Bharath Acha","22-05-1992","bharath@gmail.com","+919897474111","O+","Q-301","Kakkan Street","Potheri",603203,"05942232384",1,112],
];

var offline_directors_data = new Array();
offline_directors_data = [
    ["directors"],
    ["director_id","director_type","member_name","member_id"],
    ["INTEGER","TEXT","TEXT","INTEGER"],
    ["PRIMARY KEY NOT NULL","NOT NULL","NOT NULL","NOT NULL"],
    [1,"Treasurer","Neelabh Pandey",101],
    [2,"Sports Incharge","Darshan Turakhia",105],
    [3,"Tour Incharge","Bharath Acha",111],
];