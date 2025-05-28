var Logo, LogoDiv,Inbox,OwlOnPerch, owlMail;
var SearchTool,LocationPin,LocationDDiv,Location,LocTxt;
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
var lstThnDtls, lstThnMsgs;

var ferrylog = function (msg, interval=15000) {
   if (Log.children.length)
      Log.lastElementChild.classList.add("hidden");
   var nl=document.createElement("div");
   nl.innerHTML=msg;
   Log.insertAdjacentElement("beforeEnd", nl);
   clearInterval(clearLogInterval);
   clearLogInterval = setInterval(
      function(){Log.lastElementChild.classList.add("hiddenLog")}, interval
   );
}

var toggleLog = function () {
   if (Log.classList.contains("visible")) {
      Log.classList.remove("visible");
   } else {
      Log.classList.add("visible");
   }
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
      } else {
         search.call(this);
      }
      event.preventDefault(event);
      return false;
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
   locationBox.value = Location.value;
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

var showBoxUpdtLoc = function() {
   Location.dont=false;
   updateLocation.call(this, true);
};

var updateLocation = function (show) {
   if (show) {
      LocTxt.classList.add("hidden");
      Location.classList.remove("hidden");
   }
   var onPosition = function (position) {
      if (Location.dont) {
         return;
      }
      Location.value=position.coords.latitude.toPrecision(9);
      Location.value+=","+position.coords.longitude.toPrecision(9);
      if (!browserID) {
         window.cookieShuttle();
      }
      setTimeout(updateLocation, 60000);
   }
   var onPosErr = function (posErr) {
      if (posErr.code == posErr.PERMISSION_DENIED) {
         ferrylog("U denied locating you! Enter ur preferred "+
                  "Longitude,Latitude above.");
         LocTxt.classList.add("hidden");
         Location.classList.remove("hidden");
         LocationPin.onclick=window.cookieShuttle;
         return;
      }
      ferrylog(posErr.message);
      setTimeout(updateLocation, 60000);
   }
   var options = {
      enableHighAccuracy:true
   }
   if (navigator.geolocation) {
      var options = {
         enableHighAccuracy:false
      }
      navigator.geolocation.getCurrentPosition(onPosition,onPosErr,options);
      ferrylog("LocatingU!", 100000);
   } else {
      ferrylog("Geolocation is not supported by this browser.");
      cookieShuttle();
   }
}

var openMap = function () {
   window.open(event.target.url,'map');
}
var toggleInbox = function () {
   if (Inbox.classList.contains("hidden")) {
      Inbox.classList.remove("hidden");
   } else {
      Inbox.classList.add("hidden");      
   }
}
var sendOwl = function () {
   var showOwl=false;
   OwlOnPerch.classList.add("owlSent");
   setTimeout(function () {
      if (!showOwl) {
         showOwl=true;
      } else {
         OwlOnPerch.classList.remove("owlSent");
         if (Inbox.news>0) {
            OwlOnPerch.classList.remove("nonews");
         } else {
            OwlOnPerch.classList.add("nonews");
         }
      }
   }, 1000);      
   var url = "owl";
   var f={};
   var cnt={};
   var md;
   var rmds=Inbox.rmds;
   Inbox.rmds=[];
   var irmds=Inbox.irmds;
   Inbox.irmds=[];
   var mds=Inbox.mds;
   Inbox.mds=[];
   for (var i=0; i<mds.length; ++i) {
      md = mds[i];
      var thing = md.parentElement.parentElement.parentElement;
      var tusr = GetElementInsideContainer(thing, "ThingUsr").innerHTML;
      if (!cnt.Qs)
         cnt["Qs"]={};
      if (!cnt.Qs[tusr])
         cnt.Qs[tusr]={};
      cnt.Qs[tusr][thing.thingId]=md.children[2].innerHTML;
   }
   for (var i=0; i<rmds.length; ++i) {
      md = rmds[i];
      thing=md.parentElement.parentElement.parentElement;
      tid=thing.thingId;
      mid=parseInt(md.children[0].innerHTML);
      if (!cnt.Rs)
         cnt.Rs={};
      if (!cnt.Rs[tid])
         cnt.Rs[tid]=[];
      cnt.Rs[tid].push(mid);
   }
   f.content=JSON.stringify(cnt);
   f.postExpdtn = function (feed) {
      var res = JSON.parse(feed.responseText);
      if (res.status==1) {
         for (var md of mds) {
            md.classList.remove("inQ");
         }
         for (var md of rmds) {
            md.classList.remove("inQ");
            --Inbox.news;
         }
         for (var md of irmds) {
            md.classList.remove("inQ");
         }
         for (const stid in res["news"]) {
            var tid = parseInt(stid);
            var things = UserThings[Username.value];
            var thing = things[tid];
            var msgd = GetElementInsideContainer(thing, "msgs");
            md = msgd.firstElementChild;
            var itms=Inbox.things[tid];
            for (const smid in res["news"][stid]) {
               if (!isNaN(parseInt(md.firstElementChild.innerHTML))) {
                  md = md.cloneNode(true);
               }
               var msg = res["news"][stid][smid];
               md.children[0].innerHTML=msg["id"];
               md.children[1].innerHTML=msg["user"]+": ";
               md.children[2].innerHTML=msg["msg"];
               msgd.insertAdjacentElement("beforeEnd", md);
               md.onclick=markAsRead;
               var imd = md.cloneNode(true);
               Inbox.insertAdjacentElement("beforeEnd", imd);
               imd.classList.add("new");
               imd.md=md;
               md.imd=imd;
               imd.onclick=showThing;
               md.classList.add("new");
               itms.add(msg["id"]);
               ++Inbox.news;
            }
         }
      }
      if (showOwl) {
         OwlOnPerch.classList.remove("owlSent");
         if (Inbox.news>0) {
            OwlOnPerch.classList.remove("nonews");
         } else {
            OwlOnPerch.classList.add("nonews");
         }
      } else {
         showOwl=true;
      }
   };
   f.reqHeaders=[["content-type", "text/json"]];
   shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}
var init = function () {
   Logo=document.getElementById('logo');
   LogoDiv=document.getElementById('logoDiv');
   Inbox=document.getElementById('inbox');
   Inbox.things={};
   Inbox.mds=[];
   Inbox.rmds=[];
   Inbox.news=0;
   Inbox.irmds=[];
   OwlOnPerch=document.getElementById('owlOnPerch');
   OwlOnPerch.onclick=toggleInbox;
   LogoDiv.parentElement.style.display="block";
   SearchTool=document.getElementById('search-tool');
   LocationPin=document.getElementById('LocationPin');
   Location=document.getElementById('LocationBox');
   LocationDDiv=document.getElementById('LocationDDiv');
   addEvent(Location, 'keydown', function () {
      if (!this.dont) {
         this.dont=true;
         ferrylog("Ok, not locating you. Enter preferred location in "+
                  "XX.XXXX,YY.YYYY format");
         LocationPin.onclick=cookieShuttle;
      }
      if (event.keyCode==13) {
         cookieShuttle();
      }
   });
   LocTxt=document.getElementById('LocTxt');
   Mouth=document.getElementById('mouth');
   MouthPad=document.getElementById('mouth-pad');
   if (location.href.indexOf('?')==-1) {
      Logo.classList.add("big");
   }
   /*
   setTimeout(function() {
      Logo.classList.add("transform2s3d");
      Logo.classList.remove("big");
      CMPD=0.8/Lock.getBoundingClientRect().width;
      window.visualViewport.addEventListener("resize", viewportHandler);
      },2000);
   */
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
   Log.onclick=toggleLog;
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
   lstThnDtls = GetElementInsideContainer(Thing, "ThingDetails");
   lstThnMsgs = GetElementInsideContainer(Thing, "msgdiv");
   UserThings = {};
   Thing.remove();
   addEvent(Passwords2, 'keydown', signup);
   addEvent(Captcha, 'keydown', signup);
   Things=document.getElementById("Things");
   UserActions=document.getElementById("UserActions");
   AddThing=document.getElementById("AddThing");
   AddThing.plcHldr="Add a thing to the fair";
   SVGS=document.getElementById("SVGS");
   window.cookieShuttle = function () {
      Location.classList.add("hidden");
      var url = "cookie";
      var f={};
      var pstr = Location.value;
      ferrylog("Location: " + pstr);
      f.content="{bid:\""+browserID+"\",geoposition:["+pstr+"]}";
      f.postExpdtn=onBID;
      shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
      LocationPin.classList.remove('empty');
   }
   LocationPin.onclick = showBoxUpdtLoc;
   Logo.onclick = function () {
      LocationPin.classList.remove("hidden");
      showBoxUpdtLoc.call(LocationPin);
      Logo.onclick = function () {
         if (LocationDDiv.classList.contains("hidden")) {
            LocationDDiv.classList.remove("hidden");
         } else {
            LocationDDiv.classList.add("hidden");            
         }
      }
   }
   updateLocation();
};
var sendMsg = function () {
   var thing=this.parentElement.parentElement.parentElement;
   var mdiv = GetElementInsideContainer(thing, "msgdiv");
   var msgd = GetElementInsideContainer(mdiv, "msgs");
   var msginpt = GetElementInsideContainer(mdiv, "msginpt");
   var md = msgd.firstElementChild;
   var ld = md.firstElementChild;
   var id = parseInt(ld.innerHTML);
   var mid=1;
   if (!isNaN(id)) {
      mid= parseInt(msgd.lastElementChild.firstElementChild.innerHTML);
      md = msgd.children[0].cloneNode(true);
   }
   md.children[0].innerHTML=mid;
   md.children[1].innerHTML=User.innerHTML+": ";
   md.children[2].innerHTML=msginpt.value;
   msginpt.value="";
   msgd.insertAdjacentElement("beforeEnd", md);
   md.classList.add('inQ');
   Inbox.mds.push(md);
   ferrylog("Ur query will b sent by next owl!");
}

var selectFiles = function(ev) {
   if (!ev.target.files[0]) return;
   var btn = ev.target;
   var f = btn.files[0], r = new FileReader();
   if (f.size>2000000) {
      ferrylog("File size exceeded 2MB");
      return;
   }
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
         if (thisimg.length)
            thisimg = thisimg[0];
         else
            thisimg=document.createElement("img");
         thisimg.classList.add("fixedSize");
         thisimg.src=
            "/upload/"+User.innerHTML+"/"+this.thingId+"."+this.picId+".jpg?"+
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
      LogoDiv.classList.remove("if");
      LogoDiv.parentElement.style.display="table-cell";
      LocationDDiv.classList.remove("if");
      document.getElementsByTagName("footer")[0].classList.remove("if");
      Logo.onclick=null;
      LocationPin.classList.remove("hidden");
   }
   if (res.sid) {
   }
   if (res.name && res.email) {
      Username.value=res.name;
      Email.value=res.email;
      login(feed);
   } else {
      updateThings(res);
   }
   Location.classList.add("hidden");
   Location.onclick=updateLocation;
   LocTxt.innerHTML=Location.value;
   LocTxt.classList.remove("hidden");
   LocationPin.onclick = showBoxUpdtLoc;
   LocationDDiv.classList.remove("hidden");
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
      User.innerHTML=res.name;
      User.obj=res;
      Usermenu.classList.remove("hidden");
      Signupdiv.classList.add("hidden");
      UserActions.classList.remove("hidden");
      OwlOnPerch.classList.remove("hidden");
      updateThings(res);
      owlMail=setInterval(sendOwl, 30000);
      ferrylog("SignedIn!");
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

var openfileprompt = function () {
   this.nextElementSibling.click();
}
var showThingDetails = function () {
   var thnDtls = GetElementInsideContainer(
      this.parentElement, "ThingDetails");
   if (thnDtls!=lstThnDtls) {
      lstThnDtls.classList.add("hidden");
      if (lstThnMsgs)lstThnMsgs.classList.add("hidden");
   }
   lstThnDtls = thnDtls;
   lstThnMsgs = GetElementInsideContainer(
      this.parentElement, "msgdiv");
   if (lstThnDtls.classList.contains("hidden")) {
      lstThnDtls.classList.remove("hidden");
      if (lstThnMsgs)lstThnMsgs.classList.remove("hidden");
   } else {
      lstThnDtls.classList.add("hidden");
      if (lstThnMsgs)lstThnMsgs.classList.add("hidden");
   }
}
var markAsRead = function () {
   this.classList.remove("new");
   this.classList.add("inQ");
   if (this.md) {
      this.md.classList.remove("new");
      this.md.classList.add("inQ");
      this.md.onclick=null;
      Inbox.irmds.push(this);
      Inbox.rmds.push(this.md);
   } else {
      this.imd.classList.remove("new");
      this.imd.classList.add("inQ");
      this.onclick=null;
      Inbox.irmds.push(this.imd);
      Inbox.rmds.push(this);
   }
}
var showThing = function () {
   Inbox.classList.add("hidden");
   thing=this.md.parentElement.parentElement.parentElement;
   var md = GetElementInsideContainer(thing, "msgdiv");
   if (md.classList.contains("hidden")) {
      showThingDetails.call(GetElementInsideContainer(thing, "ThingName"));
   }
   thing.scrollIntoView();
   if (this.classList.contains("new")) {
      markAsRead.call(this);
   }
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
         var thisThingUser = User.innerHTML==thing.user;
         var thingN=
             newThing?Thing.cloneNode(true):UserThings[un][thing.id];
         thingN.thingId=thing.id;
         var imgsHldr = thingN.children[0];
         var imgs = imgsHldr.children[0];
         var msgDiv = GetElementInsideContainer(thingN, "msgdiv");
         var QSendDiv = GetElementInsideContainer(msgDiv, "qSendDiv");
         var msgd = GetElementInsideContainer(msgDiv, "msgs");
         var msgBtn = GetElementInsideContainer(msgDiv, "msgBtn");
         var UserThingEditBtn =
             GetElementInsideContainer(thingN, "ThingEditBtn");
         if (newThing) {
            var imgHldr = imgs.children[0];
            var img = imgHldr.children[0];
            var SIB = imgHldr.children[1];
            SIB.onclick=openfileprompt;
            SIB.thingId=thing.id;
            SIB.picId=0;
            var pics = res.things[i].pics;
            if (pics && pics.length) {
               img.src="/upload/"+res.things[i].user+"/"+res.things[i].id+
                  "."+0+".jpg?"+pics[0].ts;
               for (var j=1; j<pics.length; ++j) {
                  imgHldr = imgs.children[0].cloneNode(true);
                  imgHldr.classList.replace("inlineVisible", "inlineHidden");
                  img = imgHldr.children[0];
                  SIB = imgHldr.children[1];
                  img.src="/upload/"+res.things[i].user+"/"+res.things[i].id+
                     "."+j+".jpg?"+pics[j].ts;
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
            msgBtn.onclick=sendMsg;
            UserThingEditBtn.onclick=editThing;
            var tid=GetElementInsideContainer(thingN, "ThingId");
            tid.innerText=thing.id;
            var tusr=GetElementInsideContainer(thingN, "ThingUsr");
            tusr.innerText=un;
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
         if (thing.name && thing.name.length) {
            var name=GetElementInsideContainer(thingN, "ThingName");
            name.innerText=thing.name;
            name.onclick=showThingDetails;
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
         var dtls=GetElementInsideContainer(thingN, "ThingDetails");
         var dtlsta;
         if (thing.details) {
            dtls.innerHTML=thing.details;
            dtlsta=GetElementInsideContainer(thingN, "ThingDetailsTA");
            dtlsta.value=thing.details;
         }
         dtlsta=GetElementInsideContainer(thingN, "ThingDetailsDiv");
         if (!dtlsta.classList.contains("hidden")) {
            dtlsta.classList.add("hidden");
            dtls.classList.remove("hidden");
         }
         if (thisThingUser) {
            UserThingEditBtn.classList.remove("hidden");
         } else {
            UserThingEditBtn.classList.add("hidden");
         }
         if (!User.innerHTML.length) {
               msgDiv.classList.add("hidden");
         } else {
            if (thisThingUser) {
               QSendDiv.classList.add("hidden");
            } else {
               QSendDiv.classList.remove("hidden");
            }
         }
         var rmsgs=res.things[i].rmsgs;
         var itms;
         if (!Inbox.things[thing.id]) {
            itms=Inbox.things[thing.id]=new Set();
         } else {
            itms=Inbox.things[thing.id];
         }
         if (rmsgs) {
            for (var l=0,m=0; l<rmsgs.length; ++l,++m) {
               var rmsg=rmsgs[l];
               var md;
               if (l<msgd.children.length) {
                  md = msgd.children[m];
                  var ld = md.children[0];
                  var id = parseInt(ld.innerHTML);
                  if (id<rmsg["id"]) {
                     --l;
                  } else {
                     md.children[0].innerHTML=rmsg["id"];
                     md.children[1].innerHTML=rmsg["user"]+": ";
                     md.children[2].innerHTML=rmsg["msg"];
                  }
               } else {
                  md = msgd.children[0].cloneNode(true);
                  md.children[0].innerHTML=rmsg["id"];
                  md.children[1].innerHTML=rmsg["user"]+": ";
                  md.children[2].innerHTML=rmsg["msg"];
                  msgd.insertAdjacentElement("beforeEnd", md);
               }
               if (thisThingUser && !itms.has(rmsg["id"])) {
                  var imd = md.cloneNode(true);
                  Inbox.insertAdjacentElement(
                     "beforeEnd", imd);
                  if (rmsg["new"]) {
                     imd.classList.add("new");
                     md.onclick=markAsRead;
                     md.classList.add("new");
                     ++Inbox.news;
                  }
                  imd.md=md;
                  md.imd=imd;
                  imd.onclick=showThing;
                  itms.add(rmsg["id"]);
               }
            }
         }
         UserThings[un][thing.id]=thingN;
         thingN.user=un;
         if(newThing) {
            if (thing.id!="-1") {
               Things.append(thingN);
            } else {
               Things.insertAdjacentElement('afterBegin', thingN);
            }
         }
      }
      Things.classList.remove("hidden");
   }
   if (Inbox.news) {
      OwlOnPerch.classList.remove("nonews");
   } else {
      OwlOnPerch.classList.add("nonews");
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
      var pstr = Location.value;
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
   ferrylog(res.things.length+" thing"+(res.things.length==1?"":"s")+" found");
   res.search=true;
   deleteThings();
   updateThings(res);
}

var search = function () {
   var pstr = Location.value;
   var url = "search";
   var f={};
   f.content = "{bid:\"" + browserID +"\"";
   f.content += ",search:\"";
   f.content+= mouth.value==mouth.plcHldr?"":mouth.value;
   f.content+="\",geoposition:["+pstr+"]}";
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
      clearInterval(owlMail);
      Usermenu.classList.add("hidden");
      Username.value="";
      Password.value="";
      LockBlock.classList.replace("inlineHidden", "inlineVisible");
      UserActions.classList.add("hidden");
      var edbns = document.getElementsByClassName("thngEdBtn");
      for (var i=0; i<edbns.length; ++i) {
         edbns[i].classList.add("hidden");
      }
      OwlOnPerch.classList.add("hidden");
      ferrylog("Bye!");
   } else {
      setCookie("bid","",0);
      ferrylog("Huh! Something went wrong! Try again:) or close window.");
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
      if (SignUp.checked && !validUsername(Username.value)) {
         ferrylog("Invalid Username, should be [a-zA-Z.] and length <24");
         return;
      } else if (Passwords1.value!=Passwords2.value) {
         ferrylog("passwords didn't match");
         return;
      } else if (!validPassword(Passwords2.value)) {
         ferrylog("Password not made of [a-zA-Z0-9.@#$%] or its length >24");
         return;
      } else if (!validEmail(Email.value)) {
         ferrylog("Email not made of [a-zA-Z.@] or its length >48");
         return;
      } else if (!Consent.checked) {
         ferrylog("U didn't consent to this tool usage :/");
         return;
      }
      f.content="{email:\""+Email.value+"\",captcha:\""+ Captcha.value+"\","
      if (!Recover.checked) {
         f.content += "username:\""+Username.value+"\",";
      }
      f.content+= "password:\""+
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
   if (userData["things"][userData["things"].length-1].id==-1) {
      UserActions.classList.add("hidden");
      UserThings[User.innerHTML][-1].classList.remove("hidden");
      return;
   }
   userData["things"][userData["things"].length] = {
      "id":-1,
      "name":"",
      "location":"",
      "pics":[]
   };
   updateThings(userData);
   editThing.call(GetElementInsideContainer(
      Things.children[0], "ThingEditBtn"));
}

var editThing = function(newThing) {
   UserActions.classList.add("hidden");
   var thisUserThing = this.parentElement;
   var ThingName = GetElementInsideContainer(thisUserThing, "ThingName");
   var ThingNameL = GetElementInsideContainer(thisUserThing, "ThingNameL");
   var ThingNameB = GetElementInsideContainer(thisUserThing, "ThingNameBox");
   var CnclEdtBtn = GetElementInsideContainer(thisUserThing, "cnclEdtBtn");
   ThingNameB.value=ThingName.innerText;
   ThingName.classList.add("hidden");
   ThingNameB.classList.remove("hidden");
   ThingNameL.classList.remove("hidden");
   CnclEdtBtn.classList.remove("hidden");
   var ThingLocation = GetElementInsideContainer(
      thisUserThing, "ThingLocation");
   var ThingLocationL = GetElementInsideContainer(
      thisUserThing, "ThingLocationL");
   var ThingLocationB = GetElementInsideContainer(
      thisUserThing, "ThingLocationBox");
   var ThingLocPin = GetElementInsideContainer(
      thisUserThing, "ThingLocationPin");
   var ThingDetails = GetElementInsideContainer(
      thisUserThing, "ThingDetails");
   var ThingDetailsDiv = GetElementInsideContainer(
      thisUserThing, "ThingDetailsDiv");
   ThingLocationB.value=ThingLocation.innerText;
   ThingLocationB.classList.remove("hidden");
   ThingLocationL.classList.remove("hidden");
   ThingDetails.classList.add("hidden");
   ThingDetailsDiv.classList.remove("hidden");
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
      var SIBl = imgHldr.children[1];
      SIBl.picId=i;
      SIBl.onclick=openfileprompt;
      SIBl.thingId=thisUserThing.thingId;
      SIBl.classList.remove("hidden");
      if (i) {
         imgHldr.classList.replace("inlineVisible", "inlineHidden")
         imgs.children[i-1].insertAdjacentElement('afterEnd', imgHldr);
      } else
         imgs.insertAdjacentElement('afterBegin', imgHldr);
   }
   this.value="Update";
   this.onclick=updateThing;
   CnclEdtBtn.onclick=updateThing;
   this.classList.remove("hidden");
}

var updateThing = function() {
   UserActions.classList.remove("hidden");
   var cncl = this.value=="Cancel";
   var url = "updateThing";
   var f={};
   var content = {};
   content.things=[];
   var UserThing = this.parentElement;
   var ThingName = GetElementInsideContainer(UserThing, "ThingName");
   var ThingNameL = GetElementInsideContainer(UserThing, "ThingNameL");
   var ThingNameB = GetElementInsideContainer(UserThing, "ThingNameBox");
   var ThingLocation = GetElementInsideContainer(UserThing, "ThingLocation");
   var ThingLocationL = GetElementInsideContainer(UserThing, "ThingLocationL");
   var ThingLocationB = GetElementInsideContainer(
      UserThing, "ThingLocationBox");
   var ThingDetailsTA = GetElementInsideContainer(
      UserThing, "ThingDetailsTA");
   var updtBtn = cncl?this.previousElementSibling:this;
   if (!(cncl && UserThing.thingId==-1)) {
      ThingName.classList.remove("hidden");
      ThingNameB.classList.add("hidden");
      ThingNameL.classList.add("hidden");
      ThingLocationB.classList.add("hidden");
      ThingLocationL.classList.add("hidden");
      updtBtn.value="edit";
      updtBtn.onclick=editThing;
   } else {
      UserThing.classList.add("hidden");
      return;
   }
   if (cncl) {
      this.classList.add("hidden");
      return;
   }
   if (!validThingName(ThingNameB.value)) {
      ferrylog("InvalidThingName-NoNumberOnlyWords");
      return false;
   }
   var thing={};thing.id=UserThing.thingId;
   thing.name=ThingNameB.value;
   var location = ThingLocationB.value.split(',');
   thing.location = [parseFloat(location[0]), parseFloat(location[1])];
   if (!validThingDetails(ThingDetailsTA.value)) {
      ferrylog("Invalid thing details.");
   }
   thing.details = ThingDetailsTA.value;
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
      ferrylog('Uploading '+name+(offset+chunk.length)+'/'+data.length+'B');
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
      if (!((name.charAt(i)>='A' && name.charAt(i)<='Z') ||
            (name.charAt(i)>='a' && name.charAt(i)<='z') ||
            (name.charAt(i)>='0' && name.charAt(i)<='9') ||
            (name.charAt(i)=='.') || (name.charAt(i)=='_'))) {
         return false;
      }
   }
   return (name.length && name.length < 24);
}

function validEmail (name) {
   for (var i=0; i<name.length;++i) {
      if (!((name.charAt(i)>='@' && name.charAt(i)<='Z') ||
            (name.charAt(i)>='a' && name.charAt(i)<='z') ||
            (name.charAt(i)>='0' && name.charAt(i)<='9') ||
            (name.charAt(i)=='.') || (name.charAt(i)=='_'))) {
         return false;
      }
   }
   return (name.length && name.length < 48);
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
   var numstart = false;
   for (var i=0; i<name.length;++i) {
      if (!((name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90) ||
            (name.charCodeAt(i)>=97 && name.charCodeAt(i)<=122) ||
            (name.charAt(i)==' '))) {
         if (name.charAt(i)>='0' && name.charAt(i)<='9') {
            if (!numstart && name.charAt(i-1)==' ') {
               numstart=true;
            }
            continue;
         }
         if (numstart) {
            if (name.charAt(i)==' ') {
               return false;
            } else {
               numstart=false;
               --i;
            }
            continue;
         }
         return false;
      }
   }
   if (numstart) {
      return false;
   }
   return (name.length && name.length <= 64);
}

var validThingDetails = function (name) {
   for (var i=0; i<name.length;++i) {
      if (!((name.charAt(i)>=" ".charAt(0) &&
             name.charAt(i)<="~".charAt(0)) ||
            name.charAt(i)=="\n".charAt(0))) {
         return false;
      }
   }
   if (name.includes("<script")) {
      return false;
   }
   return (name.length <= 256);
}
