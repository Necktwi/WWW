var Logo;
var SearchTool;
var SearchToolOpacity=1;
var SearchToolBlink;
var Mouth;
var Lock;
var Signupdiv;
var Username;
var Password;
var Email;
var Passwords1;
var Passwords2;
var Signup;
var Usermenu;
var User;
var Unlock, Log;
var searchPlcHldr = 'Search an item near by';
var caretPos=0;
var browserID;
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
      this.style.color="rgb(192,192,192)";
      //event.cancelBubble=true;
   } else {
      if(this.ctype==='password')this.type='password';
      this.style.color="rgb(0,0,0)";
   }
};
var showPlaceHolder = function () {
   this.type='text';
   this.value = this.plcHldr;
   this.style.color="rgb(192,192,192)";
   setCaretPos(this,0);
};
var inputOnBlur=function(){
   if (this.value === '') {
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
   console.log(String.fromCharCode(event.charCode));
   if ((event.keyCode == 8 || event.keyCode == 46)
       && this.value.length==1) { // Backspace
      showPlaceHolder.call(this);
      event.preventDefault();
   } else if(this.value === this.plcHldr) {
      if(isPrintable(event.keyCode)) {
         this.value='';
         this.style.color="rgb(0,0,0)"
         if(this.ctype==='password')this.type='password';  
      } else {
         event.preventDefault();
      }
   }
};
var init=function(){
   Logo=document.getElementById('logo');
   SearchTool=document.getElementById('search-tool');
   Mouth=document.getElementById('mouth');
   if(location.href.indexOf('?')==-1){
      Logo.classList.add("big");
   }
   setTimeout(function(){
      Logo.classList.add("transform2s3d");
      Logo.classList.remove("big");
   },2000);
   Mouth.plcHldr="Search an item near by";
   Mouth.value=Mouth.plcHldr;
   Lock=document.getElementById("lock");
   Username=document.getElementById("username");
   Password=document.getElementById("password");
   Username.plcHldr = 'Username:';
   Password.plcHldr = 'Password:';
   Password.ctype='password';
   Password.value=Password.plcHldr;
   Signupdiv=document.getElementById("signupdiv");
   Signup=document.getElementById("signup");
   Signup.checked=false;
   Email=document.getElementById("email");
   Passwords1=document.getElementById("passwords1");
   Passwords2=document.getElementById("passwords2");
   Email.plcHldr='Email:';
   Passwords1.plcHldr='New password:';
   Passwords2.plcHldr='Retype password:';
   Email.value=Email.plcHldr;
   Passwords1.value=Passwords1.plcHldr;
   Passwords2.value=Passwords2.plcHldr;
   Passwords1.ctype='password';
   Passwords2.ctype='password';
   Log=document.getElementById("log");
   var inputs=document.getElementsByTagName("input");
   for (var i=0; i<inputs.length; ++i) {
      var elm = inputs[i];
      if(elm.type!="text")continue;
      elm.classList.add("inptTxtBx");
      addEvent(elm, 'focus', inputOnFocus);
      addEvent(elm, 'blur', inputOnBlur);
      addEvent(elm, 'keydown', inputOnKeyDown);
      addEvent(elm, 'click', inputOnFocus);
   }
   User = document.getElementById('user');
   addEvent(Username, 'keydown', usrnmEvent);
   addEvent(Password, 'keydown', authenticateUser);
   Unlock = document.getElementById('unlock');
   Usermenu = document.getElementById('usermenu');
   addEvent(Passwords2, 'keydown', signup);
   browserID = getCookie("bid");
   var url = "cookie";
   var f={};
   f.content="{bid:\""+browserID+"\"}";
   f.postExpdtn=onBID;
   shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
};
var onBID=function(feed){
   var res = JSON.parse(feed.responseText);
   if (res.bid){
      setCookie("bid", res.bid, 7);
   }
   if (res.sid){
   }
   if (res.username && res.email) {
      Username.value=res.username;
      Email.value=res.email;
      login(feed);
   }
   delete shuttle;
}
var login=function(feed){
   var res = JSON.parse(feed.responseText);
   if(res.login===true){
      Lock.style.display='none';
      Password.style.display='none';
      User.innerHTML=Username.value;
      Usermenu.style.display='inline';
      Signupdiv.style.display='none';
   }
   delete Password.shuttle;
}
var unlock=function(){
   var lock=document.getElementById("lock");
   lock.style.display='none';
   Username.style.display='inline';
   Signupdiv.style.display='inline';
   Signup.checked=false;
   Username.focus();
};
var usrnmEvent = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      Username.style.display='none';
      if(Password.value!=Password.plcHldr)Password.type='password';
      Password.style.display='inline';
      Password.focus();
   }
}
var authenticateUser = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      var url = "login";
      var f={};
      f.content="{username:\""+Username.value+"\"";
      f.content+=",password:\""+Password.value +"\"}";
      f.postExpdtn=login;
      Password.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}
var lock = function() {
   Usermenu.style.display='none';
   Lock.style.display='inline';
}
var togglesignup = function() {
   if (Signup.checked) {
      Email.style.display='block';
      Passwords1.style.display='block';
      Passwords2.style.display='block';
   } else {
      Email.style.display='none';
      Passwords1.style.display='none';
      Passwords2.style.display='none';
   }
}
var signup = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      var url = "signup";
      var f={};
      f.content="{username:\""+Username.value+"\",password:\"";
      f.content+=Passwords2.value + "\",email:\""+Email.value+"\"}";
      f.postExpdtn=actMail;
      Passwords2.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}
var actMail = function(feed){
   var res = JSON.parse(feed.responseText);
   if(res.actEmailSent){
      Log.innerHTML="Activation mail sent. Please check your spam folder aswell";
      Username.style.display='none';
      Email.style.display='none';
      Passwords1.style.display='none';
      Passwords2.style.display='none';
      Signupdiv.style.display='none';
      Lock.style.display='inline';
      
   }
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
