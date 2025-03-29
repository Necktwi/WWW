var Logo;
var SearchTool,LocationPin;
var SearchToolOpacity=1;
var SearchToolBlink;
var Mouth,MouthPad;
var Lock,Desc,LockBlock,CMPD;
var Signupdiv;
var Username, Credentials;
var Password;
var Email, SubmitBtn;
var Passwords1, Password1L, Password2L, CaptchaImg, Captcha, NewL;
var Passwords2, ConsentL, Consent, NonRecovery;
var SignIn,SignUp,Recover;
var Usermenu;
var User;
var Unlock, Log;
var Thing, Things, UserThings, UserActions, AddThing, ChoosePic;
var SVGS;
var searchPlcHldr = 'Search things near U';
var caretPos=0;
const MaxImgsPerThing=3;
var browserID;
var userData;
var clearLogInterval;

var ferrylog = function (msg, interval=15000) {
   Log.innerHTML=msg;
   clearInterval(clearLogInterval);
   clearLogInterval = setInterval(function(){Log.innerHTML=""}, interval);
}

var Rotate = function () {
   var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
       prop,
       el = document.createElement('div');
   for (var i = 0, l = props.length; i < l; i++) {
      if (typeof el.style[props[i]] !== "undefined") {
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
var addEvent = function (elem, type, fn) {
   if (elem.addEventListener) elem.addEventListener(type, fn, false);
   else if (elem.attachEvent) elem.attachEvent('on' + type, fn);
};
var removeEvent = function (elem, type, fn) {
   if (elem.removeEventListener) elem.removeEventListener(type, fn, false);
   else if (elem.dettachEvent) elem.dettachEvent('on' + type, fn);
};
var setCaretPos = function (elem, caretPos) {
   if(elem != null) {
      if (elem.createTextRange) {
         var range = elem.createTextRange();
         range.move('character', caretPos);
         range.select();
      } else {
         if (elem.selectionStart) {
            //elem.focus();
            elem.setSelectionRange(caretPos, caretPos);
         } else;
         //elem.focus();
      }
   }
};
var inputOnFocus = function () {
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
var inputOnBlur = function () {
   if (this.value === '') {
      this.classList.remove("typing");
      showPlaceHolder.call(this);
   }
};
var isPrintable = function (keycode) {
   return (keycode > 47 && keycode < 58)   || // number keys
      (keycode > 64 && keycode < 91)       || // letter keys
      (keycode > 95 && keycode < 112)      || // numpad keys
      (keycode > 185 && keycode < 193)     || // ;=,-./` (in order)
      (keycode > 218 && keycode < 223);       // [\]' (in order)
}
var inputOnKeyDown = function () {
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
var getLocation = function () {
   var locateBtn = event.target;
   var locationBox = GetElementInsideContainer(locateBtn.parentElement,
                                               "ThingLocationBox");
   locationBox.value = geoposition.coords.latitude + "," +
      geoposition.coords.longitude;
}

var nxtImg = function (reverse) {
   var nxtBtn = event.target;
   var imgs = nxtBtn.parentElement.parentElement.firstElementChild;
   var img = imgs.getElementsByClassName("inlineVisible")[0];
   var nxtImg = reverse?
       (img.previousElementSibling?img.previousElementSibling:
        imgs.lastElementChild):
       (img.nextElementSibling?img.nextElementSibling:imgs.firstElementChild);
   img.classList.replace("inlineVisible", "inlineHidden");
   nxtImg.classList.replace("inlineHidden", "inlineVisible");
}

var viewportHandler = function() {
   var viewport = event.target;
   var bottom =
       (CMPD*(window.innerHeight-event.target.height)+0.2).toString()+"cm";
   Log.style.bottom=bottom;
}

var updateLocation = function () {
   var onPosition = function (position) {
      window.geoposition=position
   }
   var onPosErr = function (posErr) {
      ferrylog(posErr.message);
   }
   var options = {
      enableHighAccuracy:true
   }
   navigator.geolocation.getCurrentPosition(onPosition);
}

var openMap = function () {
   window.open(event.target.url,'map');
}

var init = function () {
   Logo=document.getElementById('logo');
   SearchTool=document.getElementById('search-tool');
   LocationPin=document.getElementById('LocationPin');
   Mouth=document.getElementById('mouth');
   MouthPad=document.getElementById('mouth-pad');
   if (location.href.indexOf('?')==-1) {
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
   addEvent(MouthPad, 'submit', search);
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
   SubmitBtn=document.getElementById("SubmitBtn");
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
   addEvent(SearchTool, 'click', search);
   addEvent(SubmitBtn, 'click', authenticateUser);
   Unlock = document.getElementById('unlock');
   Usermenu = document.getElementById('usermenu');
   Things = document.getElementById('Things');
   Consent = document.getElementById('Consent');
   ConsentL = document.getElementById('ConsentL');
   Thing = GetElementInsideContainer(Things, "Thing");
   UserThings = {};
   Thing.remove();
   addEvent(Passwords2, 'keydown', signup);
   addEvent(Captcha, 'keydown', signup);
   Things=document.getElementById("Things");
   UserActions=document.getElementById("UserActions");
   AddThing=document.getElementById("AddThing");
   AddThing.plcHldr="Add a thing to the fair";
   SVGS=document.getElementById("SVGS");
   browserID = getCookie("bid");
   var sendShuttle = function () {
      var url = "cookie";
      var f={};
      var pstr = window.geoposition?
          geoposition.coords.latitude + "," + geoposition.coords.longitude:
          "0";
      ferrylog("Location: " + pstr);
      f.content="{bid:\""+browserID+"\",geoposition:["+pstr+"]}";
      f.postExpdtn=onBID;
      shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
      LocationPin.classList.remove('empty');
   }
   var onPosition = function (position) {
      window.geoposition=position
      sendShuttle();
   }
   var onPositionError = function (posError) {
      console.log(posError);
   }
   if (navigator.geolocation) {
      var options = {
         enableHighAccuracy:false
      }
      navigator.geolocation.getCurrentPosition(onPosition,onPositionError,
                                               options);
      ferrylog("Locating U! Wait for a while ...", 100000);
   } else {
      ferrylog("Geolocation is not supported by this browser.");
      sendShuttle();
   }
   setInterval(updateLocation, 60000);
};

var selectFiles = function(ev) {
   if (!ev.target.files[0]) return;
   var btn = ev.target;
   var f = btn.files[0], r = new FileReader();
   var l = btn.previousElementSibling;
   r.readAsArrayBuffer(f);
   var thisThing =
       this.parentElement.parentElement.parentElement.parentElement;
   if (!l.teb) {
      var teb = GetElementInsideContainer(thisThing, "ThingEditBtn");
      teb.disabled=true;
      l.teb=teb;
   }
   r.onload = function() {
      //ev.target.value = '';
      l.postChunk = function() {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
      }
      l.postUpload = function() {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
         var thissvg=this.parentElement.getElementsByTagName('svg');
         if (thissvg.length) {
            thissvg = thissvg[0];
            thissvg.classList.add("hidden");
         }
         var thisimg=this.parentElement.getElementsByTagName('img');
         if (thisimg)
            thisimg = thisimg[0];
         else
            thisimg=document.createElement("img");
         thisimg.classList.add("fixedSize");
         thisimg.src=
            "/upload/"+Username.value+"/"+this.thingId+"."+this.picId+".jpg?"+
            new Date().getTime();
         this.insertAdjacentElement('beforeBegin', thisimg);
         var thisThing = this.parentElement.parentElement.parentElement.parentElement;
         thisThing.thingId=this.thingId;
         var tid = GetElementInsideContainer(thisThing, "ThingId");
         tid.innerHTML=this.thingId.toString();
         this.parentElement.classList.remove("dummy");
         this.teb.disabled=false;
      }
      sendFileData(f.name, new Uint8Array(r.result), 2048, l);
   };
}
var about = function () {
   ferrylog("Gowtham Kudupudi");
}
var onBID = function (feed) {
   var res = JSON.parse(feed.responseText);
   if (res.bid) {
      setCookie("bid", res.bid, 7);
      browserID=getCookie("bid");
   }
   updateThings(res);
   if (res.sid) {
   }
   if (res.name && res.email) {
      Username.value=res.name;
      Email.value=res.email;
      login(feed);
   }
   delete shuttle;
}
var onCaptcha = function(feed){
   var res = JSON.parse(feed.responseText);
   if (res.cap) {
      CaptchaImg.src="/tmp/"+browserID+".jpg?"+new Date().getTime();
   }
   delete shuttle;
}
var login = function(feed) {
   var res = JSON.parse(feed.responseText);
   if(res.password) {
      LockBlock.classList.replace("inlineVisible","inlineHidden");
      Credentials.classList.add("hidden");
      User.innerHTML=Username.value;
      User.obj=res;
      Usermenu.classList.remove("hidden");
      Signupdiv.classList.add("hidden");
      UserActions.classList.remove("hidden");
      updateThings(res);
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
var deleteThings = function () {
   Things.innerHTML="";
   delete UserThings;
   UserThings = {};
}

var updateThings = function (res) {
   if (res.name)
      userData = res;
   if (res.things) {
      for (var i=0; i<res.things.length; ++i) {
         var thing=res.things[i];
         var newThing=true;
         if (!thing.user && !userData["name"])
            return;
         var un;
         if (!thing.user) {
            un = userData["name"];
         } else {
            un = thing.user;
         }
         if (!UserThings[un]) {
               UserThings[un]={};
            }
         if (UserThings[un][thing.id]) {
            newThing=false;
         } else if (UserThings[un][-1]) {
            UserThings[un][thing.id]=UserThings[un][-1];
            UserThings[un][-1]=undefined;
            newThing=false;
         }

         var thingN=
             newThing?Thing.cloneNode(true):UserThings[un][thing.id];
         thingN.thingId=thing.id;
         var imgsHldr = thingN.children[0];
         var imgs=imgsHldr.children[0];
         if (newThing) {
            var imgHldr = imgs.children[0];
            var img = imgHldr.children[0];
            var SIB = imgHldr.children[1];
            SIB.thingId=thing.id;
            SIB.picId=0;
            if (res.things[i].pics && res.things[i].pics.length) {
               img.src="/upload/"+res.things[i].user+"/"+res.things[i].id+
                  "."+0+".jpg?"+new Date().getTime();
               for (var j=1; j<res.things[i].pics.length; ++j) {
                  imgHldr = imgs.children[0].cloneNode(true);
                  imgHldr.classList.replace("inlineVisible", "inlineHidden");
                  img = imgHldr.children[0];
                  SIB = imgHldr.children[1];
                  img.src="/upload/"+res.things[i].user+"/"+res.things[i].id+
                     "."+j+".jpg?"+new Date().getTime();
                  SIB.thingId=thing.id;
                  SIB.picId=j;
                  imgs.children[j-1].insertAdjacentElement(
                     'afterEnd', imgHldr);
               }
            } else {
               var SVG = SVGS.children[0].cloneNode(true);
               imgHldr.replaceChild(SVG, img);
               imgHldr.classList.add("dummy");
            }
         }
         for (var j=0; j<imgs.children.length; ++j) {
            var imgHldr = imgs.children[j];
            imgHldr.children[imgHldr.children.length-2].
               classList.add("hidden");
         }
         var dummies=imgs.getElementsByClassName("dummy");
         if (imgs.children.length>1 && imgs.children.length>dummies.length)
            for (var j=0; j<dummies.length; ++j) {
               dummies[j].classList.replace("inlineVisible","inlineHidden");
            }
         var id=GetElementInsideContainer(thingN, "ThingId");
         id.innerText=thing.id;
         if (thing.name && thing.name.length) {
            var name=GetElementInsideContainer(thingN, "ThingName");
            name.innerText=thing.name;
         }
         var locPin = GetElementInsideContainer(thingN, "ThingLocationPin");
         if (thing.location && thing.location.length) {
            var location=GetElementInsideContainer(thingN, "ThingLocation");
            var locStr=thing.location.length?thing.location.join(","):
               thing.location;
            location.innerText=locStr;
            if (locStr.length) {
               locPin.title=locStr;
               locPin.classList.remove("empty");
               locPin.onclick=openMap;
               locPin.url="https://maps.google.com?q="+locStr;
            } else {
               locPin.classList.add("empty");
               locPin.onclick=getLocation;
            }
         } else {
            locPin.classList.add("empty");
         }
         var UserThingEditBtn =
             GetElementInsideContainer(thingN, "ThingEditBtn");
         UserThingEditBtn.onclick=editThing;
         if (!User.innerHTML.length || User.innerHTML!=res.things[i].user)
            UserThingEditBtn.classList.add("hidden");
         else {
            UserThingEditBtn.classList.remove("hidden");
         }
         UserThings[un][thing.id]=thingN;
         thingN.user=un;
         if(newThing)Things.append(thingN);
      }
      Things.classList.remove("hidden");
   }
}

var unlock = function(){
   LockBlock.classList.replace("inlineVisible","inlineHidden");
   Credentials.classList.remove("hidden");
   SignUp.checked=false;
   Username.focus();
};

var onKeyDown = function () {
   
}

var usrnmEvent = function () {
   if (event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      Password.focus();
   }
}

var authenticateUser = function () {
   if ((event.keyCode==13 && this.value !== this.plcHldr) ||
       this === SubmitBtn) { //13==enter
      var url = "login";
      var f={};
      var pstr = window.geoposition?
          geoposition.coords.latitude + "," + geoposition.coords.longitude:
          "0";
      ferrylog("Location: " + pstr);
      
      f.content="{username:\""+Username.value+"\"";
      f.content+=",password:\""+core.MD5(Password.value) +
         "\",geoposition:["+pstr+"]}";
      f.postExpdtn=login;
      Password.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}

var updateSearchedThings = function (feed) {
   var res = JSON.parse(feed.responseText);
   ferrylog(feed.responseText);
   res.search=true;
   deleteThings();
   updateThings(res);
}

var search = function () {
   var pstr = window.geoposition?
       geoposition.coords.latitude + "," + geoposition.coords.longitude:
       "0";
   var url = "search";
   var f={};
   f.content = "{bid:\"" + browserID +"\"";
   f.content += ",search:\""+mouth.value + "\",geoposition:["+pstr+"]}";
   f.postExpdtn=updateSearchedThings;
   f.reqHeaders=[["Content-type", "text/json"]];
   SearchTool.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   event.preventDefault();
}
var lock = function () {
   var url = "logout";
   var f={};
   f.content="";
   f.postExpdtn=logout;
   Unlock.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}
var logout = function (feed) {
   var res = JSON.parse(feed.responseText);
   if (res.logout===true) {
      Usermenu.classList.add("hidden");
      LockBlock.classList.replace("inlineHidden", "inlineVisible");
      UserActions.classList.add("hidden");
      UserThings.innerHTML="";
   } else {
      Log.innerHTML="Huh! Something went wrong! Try again:)";
   }
   delete Unlock.shuttle;
}
var togglesignup = function () {
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
      removeEvent(SubmitBtn, "click", authenticateUser);
      addEvent(SubmitBtn, "click", signup);      
   } else {
      Signupdiv.classList.add("hidden");
      PasswordL.classList.remove("hidden");
      UsernameL.classList.remove("hidden");
      Password.focus();
      removeEvent(SubmitBtn, "click", signup);
      addEvent(SubmitBtn, "click", authenticateUser);      
   }
}

var signup = function () {
   if(event.keyCode==13 && this.value !== this.plcHldr ||
      this === SubmitBtn) { //13==enter
      var url = "signup";
      var f={};
      Username.value=Username.value.trim();
      if (!validUsername(Username.value)) {
         ferrylog("Invalid Username, should be [a-zA-Z.] and length <24");
         return;
      } else if (Passwords1.value!=Passwords2.value) {
         ferrylog("passwords didn't match");
         return;
      } else if (!validPassword(Passwords2.value)) {
         ferrylog("Password not made of [a-zA-Z0-9.@#$%] or its length >24");
         return;
      }
      f.content="{email:\""+Email.value+"\",captcha:\""+ Captcha.value+"\","
      if (!Recover.checked) {
         f.content += "username:\""+Username.value+"\"";
      }
      f.content+= ",password:\""+
         core.MD5(Passwords2.value)+"\",consent:" + Consent.checked + "}";
      f.postExpdtn=actMail;
      Passwords2.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}

var actMail = function (feed) {
   var res = JSON.parse(feed.responseText);
   ferrylog(res.msg);
   if (res.actEmailSent == 2) {
      SignIn.checked=true;
      togglesignup();
   }
   togglesignup();
   delete Passwords2.shuttle;
}
var getCookie = function (cname) {
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
   updateThings(userData);
   editThing.call(GetElementInsideContainer(
      Things.children[Things.children.length-1], "ThingEditBtn"));
}

var editThing = function(newThing) {
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
   var ThingLocPin = GetElementInsideContainer(thisUserThing,
                                                  "ThingLocationPin");
   ThingLocationB.value=ThingLocation.innerText;
   ThingLocationB.classList.remove("hidden");
   ThingLocPin.classList.add("empty");
   ThingLocPin.onclick=getLocation;
   var imgs=GetElementInsideContainer(thisUserThing, "Imgs");
   for (var i=0;i<imgs.children.length; ++i) {
      var SIB = imgs.children[i].children[1];
      SIB.classList.remove("hidden");
   }
   var dummies=imgs.getElementsByClassName("dummy");
   // for (var i=0; i<dummies.length; ++i) {
   //    dummies[i].classList.replace("inlineHidden","inlineVisible");;
   // }
   for (var i=imgs.children.length; i<MaxImgsPerThing; ++i) {
      var imgHldr = imgs.children[0].cloneNode(true);
      var img = imgHldr.children[0];
      var thisSVG = SVGS.children[i].cloneNode(true);
      imgHldr.replaceChild(thisSVG,img);
      imgHldr.classList.add("dummy");
      imgHldr.children[1].picId=i;
      imgHldr.children[1].thingId=thisUserThing.thingId;
      imgHldr.children[1].classList.remove("hidden");
      if (i) {
         imgHldr.classList.replace("inlineVisible", "inlineHidden")
         imgs.children[i-1].insertAdjacentElement('afterEnd', imgHldr);
      } else
         imgs.insertAdjacentElement('afterBegin', imgHldr);
   }
   this.value="Update";
   this.onclick=updateThing;
   this.classList.remove("hidden");
}

var updateThing = function() {
   UserActions.classList.remove("hidden");
   var url = "updateThing";
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
   if (!validThingName(ThingNameB.value)) {
      ferrylog("Invalid ThingName");
      return false;
   }
   thing.name=ThingNameB.value;
   var location = ThingLocationB.value.split(',');
   thing.location = [parseFloat(location[0]), parseFloat(location[1])];
   content.things.push(thing);
   f.user=content;
   f.content=JSON.stringify(content);
   f.reqHeaders=[["Content-type", "text/json"]];
   f.postExpdtn = function (feed) {
      var res=JSON.parse(feed.responseText);
      if (res.password) {
         updateThings(res);
      } else {
         ferrylog(res.error);
      }
      delete f.shuttle;
   };
   f.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   ThingName.classList.remove("hidden");
   ThingNameB.classList.add("hidden");
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
	fileName.insertAdjacentElement('beforeBegin',
                                  document.createElement('br'));
	fileName.insertAdjacentElement('beforeBegin', pInd);
	fileName.insertAdjacentElement('afterEnd', gauge);
}

// Send a large blob of data chunk by chunk
var sendFileData = function(name, data, chunkSize, l) {
   var sendChunk = function(offset) {
      var chunk = data.subarray(offset, offset + chunkSize) || '';
      var opts = {method: 'POST', body: chunk};
      var url = '/upload?offset=' + offset;
      url += '&chunkSize=' + chunkSize;
      url += '&totalSize=' + data.length;
      url += "&thingId=" + l.thingId;
      url += "&picId=" + l.picId;
      var ok;
      ferrylog('Uploading ' + name + ', bytes ' + offset + '..' +
               (offset + chunk.length) + ' of ' + data.length);
      fetch(url, opts)
         .then(function(res) {
            ok = res.ok;
            return res.text();
         })
         .then(function(text) {
            if (!ok) {
               ferrylog('Error: ' + text);
               l.teb.disabled=false;
            }
            else if(offset+chunk.length >= data.length){
               ferrylog(name + ' uploaded!');
               if(l.postUpload) {
                  l.text=text;
                  l.postUpload();
               }
            } else {
               if(l.postChunk){
                  l.text=text;
                  l.postChunk();
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

function validUsername (name) {
   for (var i=0; i<name.length;++i) {
      if (!((name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90) ||
            (name.charCodeAt(i)>=97 && name.charCodeAt(i)<=122) ||
            (name.charAt(i)=='.'))) {
         return false;
      }
   }
   return (name.length && name.length < 24);
}
function validPassword (name) {
   for (var i=0; i<name.length;++i) {
      if (!((name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90) ||
            (name.charCodeAt(i)>=97 && name.charCodeAt(i)<=122) ||
            (name.charCodeAt(i)>=48 && name.charCodeAt(i)<=57) ||
            (name.charAt(i)=='.' || name.charAt(i)=='@' ||
             name.charAt(i)=='#') ||
            (name.charAt(i)=='$' || name.charAt(i)=='%'))) {
         return false;
      }
   }
   return (name.length && name.length < 24);
}

var validThingName = function (name) {
   for (var i=0; i<name.length;++i) {
      if (!((name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90) ||
            (name.charCodeAt(i)>=97 && name.charCodeAt(i)<=122) ||
            (name.charAt(i)==' '))) {
         return false;
      }
   }
   return (name.length && name.length < 64);
}
