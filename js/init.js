var Logo, LogoDiv,Mbox,Inbox,Outbox,OwlOnPerch, owlMail;
var LocationPin,LocationDDiv,LocationDiv,Location,LocTxt,LocTTimeout,LocTHide;
var SearchTool,SearchToolOpacity=1,SearchBar;
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
var Unlock, Log, ThingRemovables=[];
var ThingLocationL, ThingLocationBox, ThingNameL, ThingNameBox;
var chusPicBtn, chusPicBtnL, ThingDetailsDiv, CnclEdtBtn;
var Thing, Things, UserThings, UserActions, AddThing, ChoosePic, ReplyBtn;
var SVGS, ReplyBox, ReplyDiv, Msginpt, QSendDiv, MsgBtn;
var searchPlcHldr = 'Search things near U';
var caretPos=0;
const MaxImgsPerThing=3;
var browserID;
var userData;
var clearLogInterval;
var lstThn, lstThnDtls;
var Header,Htable;

var ferrylog = function (msg, interval=15000) {
   if (Log.children.length) {
      Log.lastElementChild.classList.add("hidden");
   }
   var nl=document.createElement("div");
   nl.innerHTML=msg;
   Log.insertAdjacentElement("beforeEnd", nl);
   clearInterval(clearLogInterval);
   clearLogInterval = setInterval(
      function(){Log.lastElementChild.classList.add("hidden")}, interval
   );
   return Log.children.length-1;
}

var toggleLog = function () {
   if (Log.classList.contains("visible")) {
      Log.classList.remove("visible");
      Log.lastElementChild.classList.add("hidden");
   } else {
      Log.classList.add("visible");
   }
}
var Rotate = function () {
   var props =
       'transform WebkitTransform MozTransform OTransform msTransform'.
       split(' '), prop, el = document.createElement('div');
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
var showAllThings = function () {
   for (let i=0;i<Things.children.length;++i) {
      Things.children[i].classList.remove("hidden");
   }
   setTimeout(function(){
      document.body.scrollIntoView({behavior: "smooth", block: "start"});
   },100)
}
var inputOnKeyDown = function () {
   //console.log("onKeyDown: "+this.value + ", " + event.keyCode);
   if ((event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 229 ||
        event.inputType === 'deleteContentBackward') &&
       this.value.length<=1) {
      // Backspace
      showPlaceHolder.call(this);
      if (Things.classList.contains("search")) {
         showAllThings();
         Things.classList.remove("search");
      }
   } else if(this.value === this.plcHldr) {
      if (event.data !== null || isPrintable(event.keyCode)) {
         this.value=event.data;
         this.classList.add("typing");
         // if(this.ctype==='password')
         //    this.type='password';
      } else {
         //search.call(this);
      }
   } else {
      return;
   }
   event.preventDefault();
   return false;
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
   event.cancelBubble=true;
   var nxtBtn = event.target;
   var imgs = nxtBtn.parentElement.parentElement.firstElementChild;
   var thing = imgs.parentElement.parentElement;
   var imgHldr = imgs.children[imgs.cid];
   imgs.cid = reverse?(imgs.cid?imgs.cid-1:imgs.children.length-1):
      (imgs.cid+1)%imgs.children.length;
   imgHldr.classList.add("hidden");
   imgHldr = imgs.children[imgs.cid];
   imgHldr.classList.remove("hidden");
   if (thing.classList.contains("editMode")) {
      chusPicBtnL.picId=imgs.cid;
   }
}

var viewportHandler = function() {
   var viewport = event.target;
   //var bottom =
   //    (CMPD*(window.innerHeight-event.target.height)+0.2).toString()+"cm";
   let bottom = (window.innerHeight-event.target.height+Log.iypos);
   Log.style.bottom=(bottom<Log.iypos?Log.iypos:bottom)+"px";
   //ferrylog(bottom+" "+Log.children.length);
   mbox.style.maxHeight=
      viewport.height-Htable.offsetHeight-mmToPxls(10+2)+"px";
}

var showBoxUpdtLoc = function() {
   Location.dont=false;
   updateLocation.call(this, true);
};

var LocDShow = function () {
   clearTimeout(LocTTimeout);
   LocTxt.classList.remove("hidden");
}

var LocDHide = function () {
   setTimeout(LocTHide,7000);
}

var mmToPxls = function (mm) {
   return mm/pxlHtMm;
}
var updateLocation = function (show) {
   if (show) {
      if (!Location.classList.contains("hidden")) {
         Location.classList.add("hidden");
         LocTxt.classList.remove("hidden");
         LocTTimeout = setTimeout(LocTHide,7000);
         LocationDiv.onmouseenter = LocDShow;
         LocationDiv.onmouseleave = LocDHide;
         return;
      }
      LocTxt.classList.add("hidden");
      Location.classList.remove("hidden");
      LocationDiv.onmouseenter = null;
      LocationDiv.onmouseleave = null;
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
      if (Location.classList.contains("hidden")) {
         LocTxt.classList.remove("hidden");
         clearTimeout(LocTTimeout);
         LocTTimeout = setTimeout(LocTHide, 7000);         
      }
      setTimeout(updateLocation, 60000);
   }
   var onPosErr = function (posErr) {
      LocTxt.classList.add("hidden");
      Location.classList.remove("hidden");
      LocationPin.onclick=window.cookieShuttle;
      if (posErr.code == posErr.PERMISSION_DENIED) {
         ferrylog("U denied locating you! Enter ur preferred "+
                  "Latitude,Longitude above.");
         return;
      }
      ferrylog(posErr.message+"<br/>Give Latitude,Longitude above");
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
      if (!browserID)
         ferrylog("LocatingU!", 100000);
   } else {
      ferrylog("Geolocation is not supported by this browser.");
      cookieShuttle();
   }
   if (!browserID) {
      pxlHtMm=50/Logo.getBoundingClientRect().height;
      mbox.style.maxHeight=
         window.visualViewport.height-Htable.offsetHeight-
         mmToPxls(10+2)+"px";
      window.visualViewport.addEventListener("resize", viewportHandler);
   }
}

var openMap = function () {
   window.open(event.target.url,'map');
}
var toggleMbox = function () {
   if (Mbox.classList.contains("hidden")) {
      Mbox.classList.remove("hidden");
   } else {
      Mbox.classList.add("hidden");      
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
   var md,reply;
   var rmds=Inbox.rmds;
   Inbox.rmds=[];
   var mds=Inbox.mds;
   Inbox.mds=[];
   var replies=Inbox.replies;
   Inbox.replies=[];
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
      var imd=md.imd?md.imd:md;
      if (imd.rmd) {
         md=imd.rmd;
      } else {
         md=imd.md;
      }
      if (imd.rmd) {
         if (!cnt.rrs)
            cnt.rrs=[];
         cnt.rrs.push(imd.ind);
      } else {
         thing=md.parentElement.parentElement.parentElement;
         tid=thing.thingId;
         mid=parseInt(md.children[0].innerHTML);
         if (!cnt.Rs)
            cnt.Rs={};
         if (!cnt.Rs[tid])
            cnt.Rs[tid]=[];
         cnt.Rs[tid].push(mid);
      }
   }
   for (var i=0; i<replies.length; ++i) {
      reply = replies[i];
      var thing =
          reply.parentElement.parentElement.parentElement.parentElement;
      var mid = reply.parentElement.firstElementChild.innerHTML
      if (!cnt.Reps)
         cnt["Reps"]={};
      if (!cnt.Reps[thing.thingId])
         cnt.Reps[thing.thingId]={};
      cnt.Reps[thing.thingId][mid]=reply.lastElementChild.innerHTML;
   }
   f.content=JSON.stringify(cnt);
   f.postExpdtn = function (feed) {
      var res = JSON.parse(feed.responseText);
      if (!signOk(res)) {
         return;
      }
      if (res.status==1) {
         for (var md of mds) {
            var thing = md.parentElement.parentElement.parentElement;
            var tusr = GetElementInsideContainer(thing, "ThingUsr").innerHTML;
            var mid=res.Qs[tusr][thing.thingId];
            md.children[0].innerHTML=mid;
            md.classList.remove("inQ");
            md.imd.classList.remove("inQ");
         }
         for (var md of rmds) {
            md=md.imd?md.imd:md;
            md.classList.remove("inQ");
            if (md.rmd) {
               md.rmd.classList.remove("inQ");
            } else {
               md.md.classList.remove("inQ");
            }
            --Inbox.news;
         }
         for (var rep of replies) {
            rep.classList.remove("inQ");
            rep.imd.classList.remove("inQ");
         }
         for (const stid in res["news"]) {
            var tthing = res["news"][stid]
            var tid = parseInt(stid);
            var things = UserThings[User.innerHTML];
            var thing = things[tid];
            var msgd = GetElementInsideContainer(thing, "msgs");
            md = msgd.firstElementChild;
            var itms=Inbox.things[tid];
            for (const smid in tthing) {
               if (!isNaN(parseInt(md.firstElementChild.innerHTML))) {
                  md = md.cloneNode(true);
               }
               var msg = tthing[smid];
               md.children[0].innerHTML=msg["id"];
               md.children[1].innerHTML=msg["user"]+": ";
               md.children[2].innerHTML=msg["msg"];
               if (md.children.length==4) {
                  md.removeChild(md.children[3]);
               }
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
         var rnews = res.rnews;
         if (!rnews) rnews=[];
         for (var smsg of rnews) {
            var tusr = smsg[0];
            var things=UserThings[tusr];
            var tid = smsg[1];
            var thing = things[tid];
            var msgd = GetElementInsideContainer(thing, "msgs");
            for (var i=0; i<msgd.children.length; ++i) {
               var md = msgd.children[i];
               var mid = parseInt(md.children[0].innerHTML);
               if (mid!=smsg[2]) {
                  continue;
               }
               var reply=ReplyDiv.firstElementChild.cloneNode(true);
               reply.lastElementChild.innerHTML=smsg[3];
               md.insertAdjacentElement("beforeEnd", reply);
               reply.classList.remove("hidden");
               reply.classList.add("new");
               var oreply=reply.cloneNode(true);
               Inbox.insertAdjacentElement("beforeEnd",oreply);
               reply.imd=oreply;
               reply.onclick=markAsRead;
               oreply.rmd=reply;
               oreply.onclick=showThing;
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
   Header=document.getElementsByTagName("header")[0];
   Htable=Header.firstElementChild;
   Logo=document.getElementById('logo');
   LogoDiv=document.getElementById('logoDiv');
   Inbox=document.getElementById('inbox');
   Mbox=document.getElementById('mbox');
   Outbox=document.getElementById('outbox');
   Inbox.things={};
   Inbox.mds=[];
   Inbox.rmds=[];
   Inbox.news=0;
   Inbox.replies=[]
   OwlOnPerch=document.getElementById('owlOnPerch');
   OwlOnPerch.onclick=toggleMbox;
   LogoDiv.parentElement.style.display="block";
   SearchTool=document.getElementById('searchTool');
   SearchBar=document.getElementById('searchBar');
   LocationPin=document.getElementById('LocationPin');
   Location=document.getElementById('LocationBox');
   LocationDiv=document.getElementById('LocationDiv');
   LocationDDiv=document.getElementById('LocationDDiv');
   ReplyDiv=document.getElementById('replyDiv');
   ReplyBtn=document.getElementById('replyBtn');
   ReplyBox=document.getElementById('replyBox');
   QSendDiv=document.getElementById('qSendDiv');
   MsgBtn=document.getElementById('msgBtn');
   Msginpt=document.getElementById('msginpt');
   ReplyDiv.remove();
   ReplyDiv.classList.remove("hidden");
   QSendDiv.remove();
   QSendDiv.classList.remove("hidden");
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
   MouthPad=document.getElementById('mouthPad');
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
   lstThn = Thing;
   UserThings = {};
   let ctrs = Thing.getElementsByClassName("removable");
   chusPicBtnL = GetElementInsideContainer(Thing, "chusPicBtnL");
   chusPicBtn = GetElementInsideContainer(Thing, "chusPicBtn");
   ThingLocationL = GetElementInsideContainer(Thing, "ThingLocationL");
   ThingLocationBox = GetElementInsideContainer(Thing, "ThingLocationBox");
   ThingNameL = GetElementInsideContainer(Thing, "ThingNameL");
   ThingNameBox = GetElementInsideContainer(Thing, "ThingNameBox");
   ThingDetailsDiv = GetElementInsideContainer(Thing, "ThingDetailsDiv");
   cnclEdtBtn = GetElementInsideContainer(Thing, "cnclEdtBtn");
   cnclEdtBtn.onclick=updateThing;
   chusPicBtn.onclick=openfileprompt;
   chusPicBtn.cid=0;
   for (let i=0; i<ctrs.length; ++i) {
      ThingRemovables.push(ctrs[i]);
      let r = ThingRemovables[i];
      r.pid = r.previousElementSibling.id;
   }
   for (let i=0; i<ThingRemovables.length; ++i) {
      let r = ThingRemovables[i];
      r.remove();
   }
   Thing.remove();
   addEvent(Passwords2, 'keydown', signup);
   addEvent(Captcha, 'keydown', signup);
   UserActions=document.getElementById("UserActions");
   AddThing=document.getElementById("AddThing");
   AddThing.plcHldr="Add a thing to the fair";
   SVGS=document.getElementById("SVGS");
   SVGS.remove();
   window.cookieShuttle = function () {
      hideKeyboard();
      if (location.protocol!="https:") {
         setCookie("bid", "", 7);
      }
      Location.classList.add("hidden");
      var url = "cookie";
      var f={};
      f.pstr = Location.value;
      ferrylog("Location: " + f.pstr);
      f.content="{bid:\""+browserID+"\",geoposition:["+f.pstr+"]}";
      f.postExpdtn=onBID;
      f.reqHeaders=[["content-type", "text/json"]];
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
   // window.onresize = function () {
   //    Log.style.bottom = "0.2cm";
   // };
};
var sendMsg = function () {
   var thing=this.parentElement.parentElement.parentElement;
   var tusr= GetElementInsideContainer(thing, "ThingUsr");
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
      if (md.children.length==4) {
         md.removeChild(md.lastElementChild);
      }
   }
   md.children[0].innerHTML=mid;
   md.children[1].innerHTML=User.innerHTML+": ";
   md.children[2].innerHTML=msginpt.value;
   msginpt.value="";
   msgd.insertAdjacentElement("beforeEnd", md);
   md.classList.add('inQ');
   var imd = md.cloneNode(true);
   var to = imd.removeChild(imd.children[1]);
   to.innerHTML=" :"+tusr.innerHTML;
   imd.insertAdjacentElement("beforeEnd",to);
   imd.md=md;
   Outbox.insertAdjacentElement("beforeEnd",imd);
   imd.onclick=showThing;
   imd.classList.add('inQ');
   md.imd=imd;
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
   var thisThing = this.parentElement.parentElement;
   if (!l.teb) {
      var teb = GetElementInsideContainer(thisThing, "ThingEditBtn");
      teb.disabled=true;
      l.teb=teb;
   }
   r.onload = function () {
      //ev.target.value = '';
      l.postChunk = function() {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
      }
      l.postUpload = function () {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
         var imgsHldr = this.parentElement;
         var imgs = imgsHldr.children[0];
         var imgHldr = imgs.children[imgs.cid];
         var img = imgHldr.firstElementChild;
         if (imgHldr.classList.contains("dummy")) {
            img.remove();
            imgHldr.classList.remove("dummy");
            img = document.createElement('img');
            imgHldr.insertAdjacentElement('beforeEnd', img);
            img.classList.add("fixedSize");
            addDummyImgs(thisThing);
         }
         img.src=
            "/upload/"+User.innerHTML+"/"+this.thingId+"."+this.picId+".jpg?"+
            new Date().getTime();
         thisThing.thingId=this.thingId;
         var tid = GetElementInsideContainer(thisThing, "ThingId");
         tid.innerHTML=this.thingId.toString();
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
      window.bidLoc=feed.pstr.split(',');
      browserID=getCookie("bid");
      LogoDiv.classList.remove("if");
      LogoDiv.parentElement.style.display="table-cell";
      LocationDDiv.classList.remove("if");
      document.getElementsByTagName("footer")[0].classList.remove("if");
      Logo.onclick=null;
      LocationPin.classList.remove("hidden");
      LocTHide = function () {
         LocTxt.classList.add("hidden");
      };
      LocTTimeout = setTimeout(LocTHide,7000);
      LocationDiv.onmouseenter = LocDShow;
      LocationDiv.onmouseleave = LocDHide;
      addEvent(OwlOnPerch, 'mouseenter', function () {
         LocTxt.classList.add("hidden");
      });
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
var markUserThings = function () {
   var uts = UserThings[User.innerHTML];
   for (var tid in uts) {
      uts[tid].classList.add("mine");
   }
}
var login = function(feed) {
   var res = JSON.parse(feed.responseText);
   if(res.password) {
      document.body.classList.add("signed");
      User.innerHTML=res.name;
      User.obj=res;
      updateThings(res);
      markUserThings();
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

var hideThings = function () {
   for (var thing of Things.children) {
      thing.classList.add("hidden");
   }
}

var openfileprompt = function () {
   this.nextElementSibling.click();
}
var showThingDetails = function (show) {
   if (!show && this.parentElement.classList.contains("active")) {
      this.parentElement.classList.remove("active");
      return;
   }
   lstThn.classList.remove("active");
   lstThn = this.parentElement;
   lstThn.classList.add("active");
   if (document.body.classList.contains("signed") &&
       !lstThn.classList.contains("mine")) {
      popQueryBtn.call(lstThn);
   }
   lstThn.scrollIntoView({behavior: "smooth", block: "end"});
}
function hideKeyboard () {
   if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.hide();
      return;
   }
   Mouth.focus();
   // Force keyboard to hide on input field.
   Mouth.setAttribute('readonly', 'readonly');
   // Force keyboard to hide on textarea field.
   Mouth.setAttribute('disabled', 'true');
   setTimeout(function() {
      //actually close the keyboard
      Mouth.blur(); 
      // Remove readonly attribute after keyboard is hidden.
      Mouth.removeAttribute('readonly');
      Mouth.removeAttribute('disabled');
   }, 100);
}

var replyQuery = function () {
   if (!ReplyBox.value.length) {
      return;
   }
   var reply=ReplyDiv.firstElementChild.cloneNode(true);
   reply.lastElementChild.innerHTML=replyBox.value;
   ReplyDiv.insertAdjacentElement("beforeBegin", reply);
   reply.classList.remove("hidden");
   var oreply=reply.cloneNode(true);
   Outbox.insertAdjacentElement("beforeEnd",oreply);
   reply.imd=oreply;
   oreply.rmd=reply;
   oreply.onclick=showThing;
   Inbox.replies.push(reply);
   ReplyDiv.remove();
   ferrylog("Ur reply will b sent by next owl!");
}
var popQueryBtn = function () {
   MsgBtn.onclick=null;
   var p = QSendDiv.parentElement;
   if (p) {
      QSendDiv.remove();
   }
   var md = GetElementInsideContainer(this, "msgdiv");
   md.insertAdjacentElement("beforeEnd", QSendDiv);
   MsgBtn.onclick=sendMsg;
}
var popReplyBtn = function () {
   this.onclick=null;
   ReplyBox.value="";
   var p = ReplyDiv.parentElement;
   if (p) {
      p.onclick=popReplyBtn;
      ReplyDiv.remove();
   }
   this.insertAdjacentElement("beforeEnd", ReplyDiv);
   ReplyBtn.onclick=replyQuery;
}
var markAsRead = function () {
   this.classList.remove("new");
   this.classList.add("inQ");
   this.imd.classList.remove("new");
   this.imd.classList.add("inQ");
   if (this.id!="reply") {
      this.onclick=popReplyBtn;
   }
   Inbox.rmds.push(this.imd);
}
var showThing = function () {
   Mbox.classList.add("hidden");
   var thing;
   if (this.md) {
      thing=this.md.parentElement.parentElement.parentElement;
   } else {
      thing=this.rmd.parentElement.parentElement.parentElement.parentElement;
   }
   showThingDetails.call(GetElementInsideContainer(thing, "ThingName"), true);
   md = this.md?this.md:this.rmd;
   md.classList.add("highlight");
   setTimeout(function(){md.classList.remove("highlight")}, 3000);
   if (this.classList.contains("new")) {
      markAsRead.call(md);
      if (this.md) {
         popReplyBtn.call(md)
      }
   }
   thing.scrollIntoView({behavior: "smooth", block: "end"});
}
const resizeObserver = new ResizeObserver(entries => {
   for (let entry of entries) {
      // Access the new size of the element using entry.contentRect
      //console.log('Element size changed:', entry.contentRect.width, entry.contentRect.height);
      var thing = entry.target.parentElement.parentElement;
      thing.style.width=entry.target.offsetWidth+"px";
   }
});
var thingDist = function (thingN) {
   if (thingN.loc) {
      var xd = window.bidLoc[0]-thingN.loc[0];
      var yd = window.bidLoc[1]-thingN.loc[1];
      return Math.pow(Math.pow(xd,2)+Math.pow(yd,2),0.5);
   }
   return 1000000.000;
}
var insertThing = function (thingN) {
   thingN.d = thingDist(thingN);
   
   if (!Things.children.length) {
      Things.appendChild(thingN);
      return;
   }
   
   let start = 0;
   let end = Things.children.length - 1;
   let insertIndex = Things.children.length; // Default to append at end
   
   while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      let midThing = Things.children[mid];
      
      if (midThing.d > thingN.d) {
         insertIndex = mid;
         end = mid - 1;
      } else {
         start = mid + 1;
      }
   }
   
   if (insertIndex >= Things.children.length) {
      Things.appendChild(thingN);
   } else {
      Things.insertBefore(thingN, Things.children[insertIndex]);
   }
}
var updateThings = function (res) {
   if (res.name) {
      userData = res;
   }
   var thingCount = res.things?res.things.length:0;
   for (var i=0; i<thingCount; ++i) {
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
      if (Object.keys(thing).length==2) {
         thingN.classList.remove("hidden");
         continue;
      }
      thingN.thingId=thing.id;
      if (thing.id==-1) {
         thingN.classList.add("mine");
      }
      var imgsHldr = thingN.children[0];
      var imgs = imgsHldr.children[0];
      imgs.cid = 0;
      resizeObserver.observe(imgs);
      var msgDiv = GetElementInsideContainer(thingN, "msgdiv");
      var msgd = GetElementInsideContainer(msgDiv, "msgs");
      var UserThingEditBtn =
          GetElementInsideContainer(thingN, "ThingEditBtn");
      if (newThing) {
         imgsHldr.onclick=showThingDetails;
         var imgHldr = imgs.children[0];
         var img = imgHldr.children[0];
         var pics = res.things[i].pics;
         if (pics && pics.length) {
            img.src="/upload/"+res.things[i].user+"/"+res.things[i].id+
               "."+0+".jpg?"+pics[0].ts;
            for (var j=1; j<pics.length; ++j) {
               imgHldr = imgs.children[0].cloneNode(true);
               imgHldr.classList.add("hidden");
               img = imgHldr.children[0];
               img.src="/upload/"+res.things[i].user+"/"+res.things[i].id+
                  "."+j+".jpg?"+pics[j].ts;
               imgs.children[j-1].insertAdjacentElement(
                  'afterEnd', imgHldr);
            }
         } else {
            var SVG = SVGS.children[0].cloneNode(true);
            imgHldr.replaceChild(SVG, img);
            imgHldr.classList.add("dummy");
         }
         UserThingEditBtn.onclick=editThing;
         var tid=GetElementInsideContainer(thingN, "ThingId");
         tid.innerText=thing.id;
         var tusr=GetElementInsideContainer(thingN, "ThingUsr");
         tusr.innerText=un;
      }
      if (thing.name && thing.name.length) {
         var name=GetElementInsideContainer(thingN, "ThingName");
         name.innerText=thing.name;
         name.onclick=showThingDetails;
         name.classList.remove("hidden");
      }
      var locPin = GetElementInsideContainer(thingN, "ThingLocationPin");
      if (thing.location && thing.location.length) {
         var location=GetElementInsideContainer(thingN, "ThingLocation");
         thingN.loc=thing.location;
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
      var dtlsDiv;
      if (thing.details) {
         dtls.innerHTML=thing.details;
      }
      var rmsgs=res.things[i].rmsgs;
      var itms;
      if (!Inbox.things[thing.id]) {
         itms=Inbox.things[thing.id]=new Set();
      } else {
         itms=Inbox.things[thing.id];
      }
      if (rmsgs && newThing) {
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
               md.classList.remove("new");
               md.children[0].innerHTML=rmsg["id"];
               md.children[1].innerHTML=rmsg["user"]+": ";
               md.children[2].innerHTML=rmsg["msg"];
               if (md.children.length==4) {
                  md.removeChild(md.children[3]);
               }
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
            if (rmsg["rep"]) {
               var reply=ReplyDiv.firstElementChild.cloneNode(true);
               reply.lastElementChild.innerHTML=rmsg["rep"];
               md.insertAdjacentElement("beforeEnd", reply);
               reply.classList.remove("inQ");
               reply.classList.remove("hidden");
            } else {
               if (!md.onclick && thisThingUser) {
                  md.onclick=popReplyBtn;
               }
            }
         }
      }
      UserThings[un][thing.id]=thingN;
      thingN.user=un;
      if (newThing) {
         if (thing.id!="-1") {
            insertThing(thingN);
         } else {
            Things.insertAdjacentElement('afterBegin', thingN);
         }
      } else {
         thingN.classList.remove("hidden");
      }
   }
   Things.classList.remove("hidden");
   
   if (res.smsgs) {
      for (var j=0; j<res.smsgs.length; ++j) {
         var smsg=res.smsgs[j];
         var to = smsg[0];
         var isR = 0;
         if (!to.length) {
            to = User.innerHTML;
            isR=1;
         }
         var thn = UserThings[to][smsg[1]];
         var msgDiv = GetElementInsideContainer(thn, "msgdiv");
         var msgd = GetElementInsideContainer(msgDiv, "msgs");
         for (var i=0; i<msgd.children.length; ++i) {
            var md = msgd.children[i];
            var mid = parseInt(md.children[0].innerHTML);
            if (mid!=smsg[2]) {
               continue;
            }
            if (isR) {
               md=md.lastElementChild;
            }
            var smd = md.cloneNode(true);
            if (!isR) {
               var toelm = smd.removeChild(smd.children[1]);
               toelm.innerHTML=" :"+to;
               smd.insertAdjacentElement("beforeEnd",toelm);
               md.imd=smd;
               smd.md=md;
            } else {
               md.imd=smd;
               smd.rmd=md;
            }
            Outbox.insertAdjacentElement("beforeEnd",smd);
            smd.onclick=showThing;
            if (!isR && md.children.length==4) {
               var reply = smd.removeChild(smd.children[2]);
               reply.rmd=md.lastElementChild;
               md.lastElementChild.imd=reply;
               for (var m=0; m<res.reps.length; m+=2) {
                  var k = res.reps[m];
                  if (j==k) {
                     reply.classList.add("new");
                     md.children[3].classList.add("new");
                     md.children[3].onclick=markAsRead;
                     reply.ind=k;
                     ++Inbox.news;
                  }
               }
               Inbox.insertAdjacentElement("beforeEnd", reply);
               reply.onclick=showThing;
            }
         }
      }
   }
   if (Inbox.news) {
      OwlOnPerch.classList.remove("nonews");
   } else {
      OwlOnPerch.classList.add("nonews");
   }
}

var unlock = function(){
   if (location.protocol!="https:") {
      ferrylog("U r not using HTTPS; can't unlock!");
      return;
   }
   LockBlock.classList.add("hidden");
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
      hideKeyboard();
      var url = "login";
      var f={};
      var pstr = Location.value;
      ferrylog("Location: " + pstr);
      
      f.content="{username:\""+Username.value+"\"";
      var md5Pass = core.MD5(Password.value);
      f.content+=",password:\""+ md5Pass +"\",geoposition:["+pstr+"]}";
      f.postExpdtn=login;
      f.reqHeaders=[["content-type", "text/json"]];
      Password.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}

var updateSearchedThings = function (feed) {
   var res = JSON.parse(feed.responseText);
   ferrylog(
      res.things.length+" thing"+(res.things.length==1?"":"s")+" found");
   res.search=true;
   //deleteThings();
   hideThings();
   Things.classList.add("search");
   updateThings(res);
   document.body.scrollIntoView({behavior: "smooth", block: "start"});
}

var search = function () {
   hideKeyboard();
   var pstr = Location.value;
   var url = "search";
   var f={};
   f.content = "{bid:\"" + browserID +"\"";
   f.content += ",search:\"";
   if (mouth.value==mouth.plcHldr) {
      showAllThings();
      event.preventDefault();
      return;
   }
   f.content+= mouth.value;
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
   f.reqHeaders=[["content-type", "text/json"]];
   Unlock.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}
var logoutui = function () {
   clearInterval(owlMail);
   if (UserThings[User.innerHTML] && UserThings[User.innerHTML][-1]) {
      UserThings[User.innerHTML][-1].remove();
      delete UserThings[User.innerHTML][-1];
   }
   Username.value="";
   Password.value="";
   User.innerHTML="";
   Inbox.innerHTML="";
   Outbox.innerHTML="";
   document.body.classList.remove("signed");
   var mine = document.getElementsByClassName("mine");
   while (mine.length) {
      mine[0].classList.remove("mine");
   }
   ferrylog("Bye!");
}

var logout = function (feed) {
   var res = JSON.parse(feed.responseText);
   if (res.logout===true) {
      logoutui();
   } else {
      setCookie("bid","",0);
      ferrylog("Huh! Something went wrong! Try again:) or close window.");
   }
   delete Unlock.shuttle;
}

var signOk = function (res) {
   if (res.logout==true) {
      logoutui();
      ferrylog("Ur account is signed in from another device. Signing out!");
      return false;
   }
   return true;
}

var togglesignup = function () {
   if (SignUp.checked || Recover.checked) {
      var url = "captcha";
      var f={};
      f.content="";
      f.postExpdtn=onCaptcha;
      f.reqHeaders=[["content-type", "text/json"]];
      shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
      Signupdiv.classList.remove("hidden");
      PasswordL.classList.add("hidden");
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
      hideKeyboard();
      var url = "signup";
      var f={};
      Username.value=Username.value.trim();
      if (SignUp.checked && !validUsername(Username.value)) {
         return;
      } else if (Passwords1.value!=Passwords2.value) {
         ferrylog("passwords didn't match");
         return;
      } else if (!validPassword(Passwords2.value)) {
         ferrylog("Password not made of [a-zA-Z0-9.@#$%] or its length >24");
         return;
      } else if (!validEmail(Email.value)) {
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
      f.reqHeaders=[["content-type", "text/json"]];
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
   } else if (userData["things"][userData["things"].length-1].id==-1) {
      UserActions.classList.add("hidden");
      UserThings[User.innerHTML][-1].classList.remove("hidden");
      return;
   }
   userData["things"][userData["things"].length] = {
      "id":-1,
      "location":"",
      "pics":[]
   };
   userData["things"]["user"]=User.innerHTML;
   updateThings(userData);
   editThing.call(GetElementInsideContainer(
      Things.children[0], "ThingEditBtn"));
}
var addRemovables = function (thing) {
   for (let i=0; i<ThingRemovables.length; ++i) {
      let r = ThingRemovables[i];
      let p = GetElementInsideContainer(thing, r.pid);
      p.insertAdjacentElement('afterEnd', r);
   }
}
var removeRemovables = function (thing) {
   for (let i=0; i<ThingRemovables.length; ++i) {
      ThingRemovables[i].remove();
   }
}
var removeDummyImgs = function (thing) {
   var imgs=GetElementInsideContainer(thing, "Imgs");
   var dummies=imgs.getElementsByClassName("dummy");
   if (imgs.children.length>1 && dummies.length) {
      dummies[0].remove();
   }
}
var addDummyImgs = function (thing) {
   var imgs=GetElementInsideContainer(thing, "Imgs");
   var i=imgs.children.length;
   if (i<MaxImgsPerThing && !imgs.children[0].classList.contains("dummy")) {
      var imgHldr = imgs.children[0].cloneNode(true);
      var img = imgHldr.children[0];
      var thisSVG = SVGS.children[i].cloneNode(true);
      imgHldr.replaceChild(thisSVG,img);
      imgHldr.classList.add("dummy");
      imgHldr.classList.add("hidden")
      imgs.children[i-1].insertAdjacentElement('afterEnd', imgHldr);
   }
}

var lastCnclEdtBtn;
var editThing = function (newThing) {
   if (lastCnclEdtBtn) {
      updateThing.call(lastCnclEdtBtn);
   }
   UserActions.classList.add("hidden");
   this.classList.remove("thngEdBtn");
   var thisUserThing = this.parentElement;
   thisUserThing.classList.add("editMode");
   var ThingLocation = GetElementInsideContainer(
      thisUserThing, "ThingLocation");
   var ThingDetails = GetElementInsideContainer(
      thisUserThing, "ThingDetails");
   //ThingDetails.classList.add("hidden");
   //ThingName.classList.add("hidden");
   addRemovables(thisUserThing);
   //ThingNameB.classList.remove("hidden");
   //ThingNameL.classList.remove("hidden");
   //CnclEdtBtn.classList.remove("hidden");
   var ThingName = GetElementInsideContainer(thisUserThing, "ThingName");
   var ThingLocPin = GetElementInsideContainer(
      thisUserThing, "ThingLocationPin");
   var imgs = GetElementInsideContainer(thisUserThing, "Imgs");
   var ImgsHldr=imgs.parentElement;
   ImgsHldr.onclick=null;
   ThingLocationBox.value=ThingLocation.innerText;
   ThingNameBox.value=ThingName.innerText;
   ThingDetailsDiv.children[1].value=ThingDetails.innerHTML;
   //ThingLocationB.classList.remove("hidden");
   //ThingLocationL.classList.remove("hidden");
   //ThingDetailsDiv.classList.remove("hidden");
   //ThingDetailsTA.classList.remove("hidden");
   ThingLocPin.classList.add("empty");
   ThingLocPin.onclick=getLocation;
   chusPicBtn.onclick=openfileprompt;
   chusPicBtnL.picId=imgs.cid;
   chusPicBtnL.thingId=thisUserThing.thingId;
   addDummyImgs(thisUserThing)
   this.value="Update";
   this.onclick=updateThing;
   lastCnclEdtBtn=cnclEdtBtn;
   this.classList.remove("hidden");
}

var updateThing = function() {
   lastCnclEdtBtn=null;
   UserActions.classList.remove("hidden");
   var cncl = this.value=="Cancel";
   var edtBtn = this;
   if (cncl) {
      edtBtn = this.nextElementSibling;
   }
   var url = "updateThing";
   var f={};
   var content = {};
   content.things=[];
   var UserThing = this.parentElement;
   var imgs=GetElementInsideContainer(UserThing, "Imgs");
   var ThingLocPin = GetElementInsideContainer(UserThing, "ThingLocationPin");
   var ImgsHldr=imgs.parentElement;
   ImgsHldr.onclick=showThingDetails;
   edtBtn.onclick=editThing;
   edtBtn.value="Edit";
   if (!(cncl && UserThing.thingId==-1)) {
      removeDummyImgs(UserThing);
      if (imgs.cid>=imgs.children.length) {
         imgs.cid=0;
         imgs.children[0].classList.remove("hidden");
      }
      removeRemovables(UserThing);
      UserThing.classList.remove("editMode");
      ThingLocPin.classList.remove('empty');
   } else {
      UserThing.classList.add("hidden");
      return;
   }
   if (cncl) {
      return false;
   }
   if (!validThingName(ThingNameBox.value)) {
      return false;
   }
   var thing={};thing.id=UserThing.thingId;
   thing.name=ThingNameBox.value;
   var location = ThingLocationBox.value.split(',');
   thing.location = [parseFloat(location[0]), parseFloat(location[1])];
   var ThingDetailsTA = ThingDetailsDiv.children[1];
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
      if (!signOk(res)) {
         return;
      }
      if (res.things) {
         updateThings(res);
         showThingDetails.call(ImgsHldr,true);
      } else {
         ferrylog(res.error);
      }
      delete f.shuttle;
   };
   f.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}

// Send a large blob of data chunk by chunk
var sendFileData = function(name, data, chunkSize, l) {
   var totalKB=Math.ceil(data.length/1000);
   var opts = {method: 'POST'};
   var curl = '/upload?thingId=' + l.thingId;
   curl += '&chunkSize=' + chunkSize;
   curl += '&totalSize=' + data.length;
   curl += "&picId=" + l.picId;
   var sendChunk = function(offset) {
      var chunk = data.subarray(offset, offset + chunkSize) || '';
      let url = curl + '&offset=' + offset;
      var ok;
      var sentKB=Math.ceil((offset+chunk.length)/1000);
      var percent=Math.floor(sentKB*100/totalKB);
      ferrylog('Uploading '+name+sentKB+'/'+totalKB+'KB'+'|'+percent+'%');
      opts.body=chunk;
      fetch(url, opts)
         .then(function(res) {
            ok = res.ok;
            return res.text();
         })
         .then(function(text) {
            if (!ok) {
               var res=JSON.parse(text);
               if (!signOk(res)) {
                  return;
               }
               ferrylog('Error: ' + text);
               l.teb.disabled=false;
            } else if(offset+chunk.length >= data.length){
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
      if (!((name.charAt(i)>='a' && name.charAt(i)<='z') ||
            (name.charAt(i)>='0' && name.charAt(i)<='9') ||
            (name.charAt(i)=='.') || (name.charAt(i)=='_'))) {
         ferrylog("Invalid Username, should be [a-z._]");
         return false;
      }
   }
   if (!(name.length && name.length <= 24)) {
      ferrylog("Username length should be >0 && <=24");
      return false;
   }
   return true;
}

function validEmail (name) {
   for (var i=0; i<name.length;++i) {
      if (!((name.charAt(i)>='a' && name.charAt(i)<='z') ||
            (name.charAt(i)>='0' && name.charAt(i)<='9') ||
            name.charAt(i)>='@' ||
            name.charAt(i)=='.' || name.charAt(i)=='_')) {
         ferrylog("Invalid Email, should be [a-z_.@]");
         return false;
      }
   }
   if (!(name.length && name.length <= 48)) {
      ferrylog("Email length should be >0 && <=48");
      return false;
   }
   return true;
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
   return (name.length && name.length <= 24);
}

var validThingName = function (name) {
   var numstart = false;
   for (var i=0; i<name.length;++i) {
      if (name.charAt(i)==' ') {
         if (i+1<name.length) {
            if (name.charAt(i+1)==' ') {
               ferrylog("ThingNameDoubleSpace at "+i);
               return false;
            }
         }
      } else if (!((name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90) ||
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
         ferrylog("InvalidThingName-NoNumberOnlyWords");
         return false;
      }
   }
   if (numstart) {
      ferrylog("InvalidThingName-NoNumberOnlyWords");
      return false;
   }
   if (!(name.length && name.length <= 64)) {
      ferrylog("InvalidThingNameLength, should be >0 && <=64!");
      return false;
   }
   return true;
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
