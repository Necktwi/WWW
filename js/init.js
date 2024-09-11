var Logo;
var SearchTool;
var SearchToolOpacity=1;
var SearchToolBlink;
var Mouth;
var Lock,Desc,LockBlock,CMPD;
var Signupdiv;
var Username, Credentials;
var Password;
var Email;
var Passwords1, Password1L, Password2L, CaptchaImg, Captcha, NewL;
var Passwords2, ConsentL, Consent, NonRecovery;
var SignIn,SignUp,Recover;
var Usermenu;
var User;
var Unlock, Log;
var UserThing, UserThings, UserActions, AddThing, ChoosePic;
var SVGS;
var searchPlcHldr = 'Search things near U';
var caretPos=0;
const MaxImgsPerThing=3;
var browserID;
var userData;
var ferrylog = function (msg) {
   Log.innerHTML=msg;
}
var Rotate=function(){
   var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
       prop,
       el = document.createElement('div');
   for(var i = 0, l = props.length; i < l; i++) {
      if(typeof el.style[props[i]] !== "undefined") {
         prop = props[i];
         break;
      }
   }
   var xAngle = 0, yAngle = 0;
   setInterval(function(){
      yAngle+=180;
      Logo.style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
   }, 2000);
   
};
var addEvent = function(elem, type, fn) {
   if (elem.addEventListener) elem.addEventListener(type, fn, false);
   else if (elem.attachEvent) elem.attachEvent('on' + type, fn);
};
var setCaretPos=function(elem, caretPos) {
   if(elem != null) {
      if(elem.createTextRange) {
         var range = elem.createTextRange();
         range.move('character', caretPos);
         range.select();
      } else {
         if(elem.selectionStart) {
            //elem.focus();
            elem.setSelectionRange(caretPos, caretPos);
         } else;
         //elem.focus();
      }
   }
};
var inputOnFocus=function(){
   if (this.value === this.plcHldr) {
      setCaretPos(this,0);
      this.classList.remove("typing");
      //this.style.color="rgb(192,192,192)";
      //event.cancelBubble=true;
   } else {
      if(this.ctype==='password')this.type='password';
      //this.style.color="rgb(0,0,0)";
      this.classList.add("typing");
   }
};
var showPlaceHolder = function () {
   this.type='text';
   this.value = this.plcHldr;
   //this.style.color="rgb(192,192,192)";
   this.classList.remove("typing");
   setCaretPos(this,0);
};
var inputOnBlur=function(){
   if (this.value === '') {
      this.classList.remove("typing");
      showPlaceHolder.call(this);
   }
};
var isPrintable=function(keycode){
   return (keycode > 47 && keycode < 58)   || // number keys
      (keycode > 64 && keycode < 91)       || // letter keys
      (keycode > 95 && keycode < 112)      || // numpad keys
      (keycode > 185 && keycode < 193)     || // ;=,-./` (in order)
      (keycode > 218 && keycode < 223);       // [\]' (in order)
}
var inputOnKeyDown=function(){
   //console.log("onKeyDown: "+this.value + ", " + event.keyCode);
   if ((event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 229 ||
        event.inputType === 'deleteContentBackward') && this.value.length<=1) {
      // Backspace
      showPlaceHolder.call(this);
      event.preventDefault();
   } else if(this.value === this.plcHldr) {
      if (event.data !== null || isPrintable(event.keyCode)) {
         this.value=event.data;
         this.classList.add("typing");
         // if(this.ctype==='password')
         //    this.type='password';
      }
      event.preventDefault();
   }
};
var onBeforeInput = function () {
   console.log("beforeInput: " + this.value);
   if (this.value === this.plcHldr) {
      this.value='';
      this.classList.add("typing");
      if(this.ctype==='password')this.type='password';
   }
}
var onKeyPress = function () {
   console.log("keyPress: "+event.target.value);
}
var onInput = function () {
   console.log("onInput: "+event.target.value);
}
var viewportHandler = function() {
   var viewport = event.target;
   var bottom =
       (CMPD*(window.innerHeight-event.target.height)+0.2).toString()+"cm";
   Log.style.bottom=bottom;
}

var init=function(){
   Logo=document.getElementById('logo');
   SearchTool=document.getElementById('search-tool');
   Mouth=document.getElementById('mouth');
   if(location.href.indexOf('?')==-1){
      Logo.classList.add("big");
   }
   setTimeout(function() {
      Logo.classList.add("transform2s3d");
      Logo.classList.remove("big");
      CMPD=0.8/Lock.getBoundingClientRect().width;
      window.visualViewport.addEventListener("resize", viewportHandler);
   },2000);
   setTimeout(function() {
      Logo.classList.add("small");
   },5000);
   Mouth.plcHldr=searchPlcHldr;
   Mouth.value=Mouth.plcHldr;
   Lock=document.getElementById("lock");
   CMPD=0.8/Lock.getBoundingClientRect().width;
   Desc=document.getElementById("Desc");
   LockBlock=document.getElementById("LockBlock");
   Username=document.getElementById("username");
   UsernameL=document.getElementById("UsernameL");
   Password=document.getElementById("password");
   PasswordL=document.getElementById("PasswordL");
   Credentials=document.getElementById("Credentials");
   NonRecovery=document.getElementById("NonRecovery");
   //Username.plcHldr = 'Username:';
   //Password.plcHldr = 'Password:';
   Password.type='password';
   //Password.value=Password.plcHldr;
   Signupdiv=document.getElementById("signupdiv");
   SignIn=document.getElementById("SignIn");
   Recover=document.getElementById("Recover");
   SignUp=document.getElementById("SignUp");
   SignIn.checked=true;
   Email=document.getElementById("email");
   EmailL=document.getElementById("EmailL");
   Passwords1=document.getElementById("passwords1");
   Passwords2=document.getElementById("passwords2");
   Password1L=document.getElementById("Password1L");
   Password2L=document.getElementById("Password2L");
   NewL=document.getElementById("NewL");
   //Email.plcHldr='Email:';
   //Passwords1.plcHldr='New password:';
   //Passwords2.plcHldr='Retype password:';
   //Email.value=Email.plcHldr;
   //Passwords1.value=Passwords1.plcHldr;
   //Passwords2.value=Passwords2.plcHldr;
   Passwords1.type='password';
   Passwords2.type='password';
   CaptchaImg=document.getElementById("CaptchaImg");
   Captcha=document.getElementById("Captcha");
   Log=document.getElementById("Log");
   NonRecovery=document.getElementById("NonRecovery");
   var inputs=document.getElementsByClassName("labeled");
   for (var i=0; i<inputs.length; ++i) {
      var elm = inputs[i];
      if(elm.type!="text")continue;
      elm.classList.add("inptTxtBx");
      addEvent(elm, 'focus', inputOnFocus);
      addEvent(elm, 'blur', inputOnBlur);
      addEvent(elm, 'click', inputOnFocus);
      //addEvent(elm, 'keydown', inputOnKeyDown);
      //addEvent(elm, 'keypress', onKeyPress);
      //addEvent(elm, 'input', onInput);
      addEvent(elm, 'beforeinput', inputOnKeyDown);
   }
   User = document.getElementById('user');
   addEvent(Username, 'keydown', usrnmEvent);
   addEvent(Password, 'keydown', authenticateUser);
   Unlock = document.getElementById('unlock');
   Usermenu = document.getElementById('usermenu');
   UserThings = document.getElementById('UserThings');
   Consent = document.getElementById('Consent');
   ConsentL = document.getElementById('ConsentL');
   UserThing = GetElementInsideContainer(UserThings, "UserThing");
   UserThing.remove();
   addEvent(Passwords2, 'keydown', signup);
   addEvent(Captcha, 'keydown', signup);
   browserID = getCookie("bid");
   var url = "cookie";
   var f={};
   f.content="{bid:\""+browserID+"\"}";
   f.postExpdtn=onBID;
   shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   UserThings=document.getElementById("UserThings");
   UserActions=document.getElementById("UserActions");
   AddThing=document.getElementById("AddThing");
   AddThing.plcHldr="Add a thing to the fair";
   SVGS=document.getElementById("SVGS");
   document.body.style.display='inline';
};

var selectFiles = function(ev) {
   if (!ev.target.files[0]) return;
   var btn = ev.target;
   var f = btn.files[0], r = new FileReader();
   r.readAsArrayBuffer(f);
   r.onload = function() {
      //ev.target.value = '';
      btn.postChunk = function() {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
      }
      btn.postUpload = function() {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
         var thissvg=this.previousElementSibling;
         var newimg=document.createElement("img");
         newimg.classList.add("fixedSize");
         thissvg.classList.add("hidden");
         newimg.src=
            "/upload/"+Username.value+"/"+this.thingId+"."+this.picId+".jpg?"+
            new Date().getTime();
         this.insertAdjacentElement('beforeBegin', newimg);
         var thisThing = this.parentElement.parentElement.parentElement;
         thisThing.thingId=this.thingId;
         var tid = GetElementInsideContainer(thisThing, "ThingId");
         tid.innerHTML=this.thingId.toString();
         this.parentElement.classList.remove("dummy");
      }
      sendFileData(f.name, new Uint8Array(r.result), 2048, btn);
   };
}
var about = function () {
   ferrylog("Gowtham Kudupudi");
}
var onBID=function(feed){
   var res = JSON.parse(feed.responseText);
   if (res.bid){
      setCookie("bid", res.bid, 7);
      browserID=getCookie("bid");
   }
   if (res.sid){
   }
   if (res.name && res.email) {
      Username.value=res.name;
      Email.value=res.email;
      login(feed);
   }
   delete shuttle;
}
var onCaptcha=function(feed){
   var res = JSON.parse(feed.responseText);
   if (res.cap) {
      CaptchaImg.src="/tmp/"+browserID+".jpg?"+new Date().getTime();
   }
   delete shuttle;
}
var login=function(feed) {
   var res = JSON.parse(feed.responseText);
   if(res.password) {
      LockBlock.classList.replace("inlineVisible","inlineHidden");
      Credentials.classList.add("hidden");
      User.innerHTML=Username.value;
      User.obj=res;
      Usermenu.classList.remove("hidden");
      Signupdiv.classList.add("hidden");
      UserActions.classList.remove("hidden");
      updateUser(res);
      ferrylog("Signed in!");
   } else {
      ferrylog("No No...! Check username and password :)");
      // LockBlock.classList.replace("inlineVisible","inlineHidden");
      // Credentials.classList.remove("hidden");
      // Signupdiv.classList.add("hidden");
      // Usermenu.classList.add("hidden");
      // LockBlock.classList.replace("inlineHidden", "inlineVisible");
   }
   delete Password.shuttle;
}
var updateUser = function(res) {
   userData = res;
   if (res.things) {
      for (var i=0; i<res.things.length; ++i) {
         var thing=res.things[i];
         var newThing = UserThings.children.length<=i;
         var thingN=
             newThing?UserThing.cloneNode(true):UserThings.children[i];
         thingN.thingId=thing.id;
         var imgs = thingN.children[0];
         if (newThing) {
            var imgHldr = imgs.children[0];
            var img = imgHldr.children[0];
            var SIB = imgHldr.children[1];
            if (res.things[i].pics.length) {
               img.src="/upload/"+res.name+"/"+i+"."+0+".jpg?"+new Date().getTime();
               SIB.thingId=thing.id;
               SIB.picId=0;
               for (var j=1; j<res.things[i].pics.length; ++j) {
                  imgHldr = imgs.children[0].cloneNode(true);
                  img = imgHldr.children[0];
                  SIB = imgHldr.children[1];
                  img.src="/upload/"+res.name+"/"+i+"."+j+".jpg?"+new Date().getTime();
                  SIB.thingId=thing.id;
                  SIB.picId=j;
                  imgs.children[j-1].insertAdjacentElement(
                     'afterEnd', imgHldr);
               }
            } else {
               imgs.removeChild(imgHldr);
            }
         }
         for (var j=0; j<imgs.children.length; ++j) {
            var imgHldr = imgs.children[j];
            imgHldr.children[imgHldr.children.length-1].
               classList.add("hidden");
         }
         var dummies=imgs.getElementsByClassName("dummy");
         for (var j=0; j<dummies.length; ++j) {
            dummies[j].classList.replace("inlineVisible","inlineHidden");
         }
         var id=GetElementInsideContainer(thingN, "ThingId");
         id.innerText=thing.id;
         if (thing.name && thing.name.length) {
            var name=GetElementInsideContainer(thingN, "ThingName");
            name.innerText=thing.name;
         }
         if (thing.location && thing.location.length) {
            var location=GetElementInsideContainer(thingN, "ThingLocation");
            location.innerText=thing.location;
         }
         var UserThingEditBtn =
             GetElementInsideContainer(thingN, "ThingEditBtn");
         UserThingEditBtn.onclick=editThing;
         if(newThing)UserThings.append(thingN);
      }
      UserThings.classList.remove("hidden");
   }
}
var unlock = function(){
   LockBlock.classList.replace("inlineVisible","inlineHidden");
   Credentials.classList.remove("hidden");
   SignUp.checked=false;
   Username.focus();
};
var usrnmEvent = function() {
   if (event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      Password.focus();
   }
}
var authenticateUser = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      var url = "login";
      var f={};
      f.content="{username:\""+Username.value+"\"";
      f.content+=",password:\""+core.MD5(Password.value) +"\"}";
      f.postExpdtn=login;
      Password.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}
var lock = function() {
   var url = "logout";
   var f={};
   f.content="";
   f.postExpdtn=logout;
   Unlock.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}
var logout=function(feed){
   var res = JSON.parse(feed.responseText);
   if(res.logout===true){
      Usermenu.classList.add("hidden");
      LockBlock.classList.replace("inlineHidden", "inlineVisible");
      UserActions.classList.add("hidden");
      UserThings.innerHTML="";
   } else {
      Log.innerHTML="Huh! Something went wrong! Try again:)";
   }
   delete Unlock.shuttle;
}
var togglesignup = function() {
   if (SignUp.checked || Recover.checked) {
      var url = "captcha";
      var f={};
      f.content="";
      f.postExpdtn=onCaptcha;
      shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
      PasswordL.classList.add("hidden");
      Signupdiv.classList.remove("hidden");
      if (Recover.checked){
         UsernameL.classList.add("hidden");
         NewL.classList.remove("hidden");
      } else {
         UsernameL.classList.remove("hidden");
         NewL.classList.add("hidden");
      }
   } else {
      Signupdiv.classList.add("hidden");
      PasswordL.classList.remove("hidden");
      UsernameL.classList.remove("hidden");
      Password.focus();
   }
}
var signup = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      var url = "signup";
      var f={};
      if (!(validUsername(Username.value) && Passwords1.value.length<=24 &&
            Passwords1.value==Passwords2.value
            && validPassword(Passwords2.value))) {
         ferrylog("Passwords didn't match or username not made of [a-zA-Z.]"+
                  " or Password not made of [a-zA-Z0-9.@#$%] and " +
                  "they shoud b <24.");
         return;
      }
      f.content="{email:\""+Email.value+"\",captcha:\""+ Captcha.value+"\""
      if (!Recover.checked) {
         f.content += "username:\""+Username.value+"\"";
      }
      f.content+= ",password:\""+
            core.MD5(Passwords2.value)+"\",consent:" + Consent.checked + "}";
      f.postExpdtn=actMail;
      Passwords2.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}
var actMail = function(feed){
   var res = JSON.parse(feed.responseText);
   ferrylog(res.msg);
   if (res.actEmailSent == 2) {
      SignIn.checked=true;
      togglesignup();
   }
   togglesignup();
   delete Passwords2.shuttle;
}
var getCookie = function(cname) {
   let name = cname + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let ca = decodedCookie.split(';');
   for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
}
var setCookie = function(cname, cvalue, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays*24*60*60*1000));
   let expires = "expires="+ d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires +
      ";path=/;SameSite=Strict";
};
var makeid = function (length) {
   var result     = '';
   var characters =
       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var addThing = function () {
   if (!userData["things"]) {
      userData["things"]=[];
   }
   userData["things"][userData["things"].length] = {
      "id":-1,
      "name":"",
      "location":"",
      "pics":[]
   };
   updateUser(userData);
   editThing.call(GetElementInsideContainer(
      UserThings.children[UserThings.children.length-1], "ThingEditBtn"));
}

var editThing = function() {
   UserActions.classList.add("hidden");
   var thisUserThing = this.parentElement;
   var ThingName = GetElementInsideContainer(thisUserThing, "ThingName");
   var ThingNameB = GetElementInsideContainer(thisUserThing, "ThingNameBox");
   ThingNameB.value=ThingName.innerText;
   ThingName.classList.add("hidden");
   ThingNameB.classList.remove("hidden");
   var ThingLocation = GetElementInsideContainer(thisUserThing,
                                                 "ThingLocation");
   var ThingLocationB = GetElementInsideContainer(thisUserThing,
                                                  "ThingLocationBox");
   ThingLocationB.value=ThingLocation.innerText;
   ThingLocation.classList.add("hidden");
   ThingLocationB.classList.remove("hidden");
   var imgs=GetElementInsideContainer(thisUserThing, "Imgs");
   for (var i=0;i<imgs.children.length; ++i) {
      var SIB = imgs.children[i].children[1];
      SIB.classList.remove("hidden");
   }
   var dummies=imgs.getElementsByClassName("dummy");
   for (var i=0; i<dummies.length; ++i) {
      dummies[i].classList.replace("inlineHidden","inlineVisible");;
   }
   for (var i=imgs.children.length; i<MaxImgsPerThing; ++i) {
      var imgHldr = UserThing.children[0].children[0].cloneNode(true);
      var img = imgHldr.children[0];
      var thisSVG = SVGS.children[i].cloneNode(true);
      imgHldr.replaceChild(thisSVG,img);
      imgHldr.classList.add("dummy");
      imgHldr.children[1].picId=i;
      imgHldr.children[1].thingId=thisUserThing.thingId;
      imgHldr.children[1].classList.remove("hidden");
      if (i)
         imgs.children[i-1].insertAdjacentElement('afterEnd', imgHldr);
      else
         imgs.insertAdjacentElement('afterBegin', imgHldr);
   }
   this.value="Update";
   this.onclick=updateThing;
}
var updateThing = function() {
   UserActions.classList.remove("hidden");
   var url = "updateItem";
   var f={};
   var content = {};
   content.things=[];
   var UserThing = this.parentElement;
   var thing={};thing.id=UserThing.thingId;
   var ThingName = GetElementInsideContainer(UserThing, "ThingName");
   var ThingNameB = GetElementInsideContainer(UserThing, "ThingNameBox");
   var ThingLocation = GetElementInsideContainer(UserThing, "ThingLocation");
   var ThingLocationB = GetElementInsideContainer(UserThing,
                                                  "ThingLocationBox");
   thing.name=ThingNameB.value;
   thing.location=ThingLocationB.value;
   content.things[thing.id]=thing;
   f.user=content;
   f.content=JSON.stringify(content);
   f.reqHeaders=[["Content-type", "text/json"]];
   f.postExpdtn=function(feed){
      var res=JSON.parse(feed.responseText);
      if (res.password) {
         updateUser(res);
      }
      delete f.shuttle;
   };
   f.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   ThingName.classList.remove("hidden");
   ThingNameB.classList.add("hidden");
   ThingLocation.classList.remove("hidden");
   ThingLocationB.classList.add("hidden");
   this.value="Edit";
   this.onclick=editThing;
}

var uploadFile = function(infoBox) {
	var file = this.files[0];
	var feed = new Object();
	var fileName = document.createElement('span');
	fileName.id = file.name;
	fileName.innerHTML = file.name;
	infoBox.appendChild(fileName);
	var pInd = new Image();
	pInd.src = 'images/loading.gif';
	pInd.id = 'pInd';
	feed.pInd = pInd;
	var gauge = document.createElement('span');
	gauge.id = 'gauge';
	feed.elm = this;
	feed.upldOnProgress = function(e) {
	   if (e.lengthComputable) {
		   gauge.innerHTML = '(' + parseInt(e.loaded / e.total * 100) + '%)';
	   }
	}
	feed.postExpedition = function(feed) {
	   feed.response = null;
	   try {
		   feed.response = eval("(" + feed.responseText + ")");
	   } catch (err) {
		   feed.response = {};
	   }
	   if (feed.response.success) {
		   feed.pInd.parentElement.removeChild(feed.pInd);
		   feed.elm.postUpload(feed);
	   } else if (feed.response.error) {
		   feed.pInd.src = '/images/x.png';
		   feed.pInd.parentElement.children['gauge'].innerHTML = '';
		   statusField.innerHTML = feed.response.error;
	   }
	}
	feed.reqHeaders = [
      ["X-Requested-With", "XMLHttpRequest"],
      ["X-File-Name", encodeURIComponent(name)],
      ["Content-Type", "application/octet-stream"]];
	feed.ferry = new core.shuttle(
      "uplaod?file=" + encodeURIComponent(file.name),
      file, feed.postExpedition, feed);
	fileName.insertAdjacentElement('beforeBegin', document.createElement('br'));
	fileName.insertAdjacentElement('beforeBegin', pInd);
	fileName.insertAdjacentElement('afterEnd', gauge);
}

// Send a large blob of data chunk by chunk
var sendFileData = function(name, data, chunkSize, btn) {
   var sendChunk = function(offset) {
      var chunk = data.subarray(offset, offset + chunkSize) || '';
      var opts = {method: 'POST', body: chunk};
      var url = '/upload?offset=' + offset;
      url += '&chunkSize=' + chunkSize;
      url += '&totalSize=' + data.length;
      url += "&thingId=" + btn.thingId;
      url += "&picId=" + btn.picId;
      var ok;
      ferrylog('Uploading ' + name + ', bytes ' + offset + '..' +
               (offset + chunk.length) + ' of ' + data.length);
      fetch(url, opts)
         .then(function(res) {
            ok = res.ok;
            return res.text();
         })
         .then(function(text) {
            if (!ok) ferrylog('Error: ' + text);
            else if(offset+chunk.length >= data.length){
               ferrylog(name + ' uploaded!');
               if(btn.postUpload) {
                  btn.text=text;
                  btn.postUpload();
               }
            } else {
               if(btn.postChunk){
                  btn.text=text;
                  btn.postChunk();
               }
               if (ok && chunk.length > 0) sendChunk(offset + chunk.length);
            }
         });
   };
  sendChunk(0);
};

function GetElementInsideContainer(container, childID) {
   var elms = container.children;
   for (var i = 0; i < elms.length; i++) {
      var elm=elms[i];
      if (elm.id === childID) {
         return elm;
      }
      var child = GetElementInsideContainer(elm, childID);
      if (child) {
         return child;
      }
   }
   return false;
}

function validUsername (username) {
   for (var i=0; i<username.length;++i) {
      if (!((username.charCodeAt(i)>=65 && username.charCodeAt(i)<=90) ||
            (username.charCodeAt(i)>=97 && username.charCodeAt(i)<=122) ||
            (username.charAt(i)=='.'))) {
         return false;
      }
   }
   return true;
}
function validPassword (password) {
   for (var i=0; i<password.length;++i) {
      if (!((password.charCodeAt(i)>=65 && password.charCodeAt(i)<=90) ||
            (password.charCodeAt(i)>=97 && password.charCodeAt(i)<=122) ||
            (password.charCodeAt(i)>=48 && password.charCodeAt(i)<=57) ||
            (password.charAt(i)=='.' || password.charAt(i)=='@' ||
             password.charAt(i)=='#') ||
            (password.charAt(i)=='$' || password.charAt(i)=='%'))) {
         return false;
      }
   }
   return true;
}
