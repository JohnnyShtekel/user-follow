function UpdateUserRow(response) {
    var target = response["target"];
    var source = response["source"];
    var isFollow = response["isFollow"];
    var user = response["user"];
    var elementID = target.name + 0 + source.name;
    var rowElement = document.getElementById(elementID);
    var board = document.getElementById("board");
    rowElement.innerHTML = "";
    var p = document.createElement("h5");
    var groupName = "user have no group";

    if (typeof target.group !== 'undefined' && target.group.length > 0) {
        groupName = target.group[0].name;
    }

    p.innerHTML = "User:    " + target.name + "   ,Group Name:    " + groupName + "   ,Number Of Followers:   " + target.followers_number;
    var button = document.createElement("button");
    button.id = source.name+"ID";
    var followUrl;
    if(isFollow){

         button.innerHTML = "UnFollow";
        button.style.backgroundColor = "orange";
        followUrl = "unfollow"
    }
    else {
        button.innerHTML= "Follow";
        button.style.backgroundColor = "green";
        followUrl = "follow"
    }
    button.onclick = function() {setFollow(target.name,source.name,followUrl)};
    rowElement.appendChild(p);
    rowElement.appendChild(button);

}


function setFollow(target,source,nextState) {
    var type = "POST";
    var data = {"target":target,"source":source,"nextState": nextState};
    var url = "follow";
    setServerCall(type,url,data,UpdateUserRow);
}

function addFollowersUsersToBoard(follows,userName,boardElemnt) {

    for (i = 0; i < follows.length; i++) {
        createUserRow(follows[i],userName,boardElemnt)
    }
    handleView(Estatus.DATASET);
}

function setRow(follow,userName,boardEelement,element,isOnBaord) {

    var rowId = follow.name + 0 + userName;
    element.id = rowId;

    var groupName = "user have no group";

    if (typeof follow.group !== 'undefined' && follow.group.length > 0) {
        groupName = follow.group[0].name;
    }

    var p = document.createElement("h5");
    p.innerHTML = "User:    " + follow.name + "   ,Group Name:    " + groupName + "   ,Number Of Followers:   " + follow.followers_number;
    var button = document.createElement("button");
    button.id = follow.name+"ID";
    var followUrl;
    if(follow["isfollow"] == false){
        button.innerHTML= "Follow";
        button.style.backgroundColor = "green";
        followUrl = "follow"
    }
    else {
        button.innerHTML = "UnFollow";
        button.style.backgroundColor = "orange";
        followUrl = "unfollow"
    }

    button.onclick = function() {setFollow(follow.name,userName,followUrl)};
    element.appendChild(p);
    element.appendChild(button);
    if(isOnBaord == false){
      boardEelement.appendChild(element)
    }

}


function createUserRow(follow,userName,boardEelement) {
    var element = document.createElement("div");
    element.classList.add("row");
    setRow(follow,userName,boardEelement,element,false);
}

function setLogedinUserData(response) {

    if(response["status"] == "UserNotExist") {
        Materialize.toast('invalid token ', 4000);
        handleView(Estatus.NOLOGIN)
    }

    var user = response["user"];
    var followByUser = response["follow_by_user"];
    console.log(response);
    var dashboardHeader =  document.getElementById("userNameHeader");
    var board =  document.getElementById("board");
    dashboardHeader.innerHTML = "";
    board.innerHTML = "";
    dashboardHeader.innerHTML  = "Welcome " + user.name;
    addFollowersUsersToBoard(followByUser,user.name,board);
}

function getUserData(cookie) {
    var type = "POST";
    var url = "user";
    var data = {'token': cookie};
    setServerCall(type,url,data,setLogedinUserData);
}

