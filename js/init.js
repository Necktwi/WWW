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
var UserThings, UserActions, AddThing, ChoosePic, NewThingImgs;
var searchPlcHldr = 'Search a thing near by';
var caretPos=0;
const MaxImgsPerThing=3;
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
   console.log(String.fromCharCode(event.charCode));
   if ((event.keyCode == 8 || event.keyCode == 46)
       && this.value.length==1) { // Backspace
      showPlaceHolder.call(this);
      event.preventDefault();
   } else if(this.value === this.plcHldr) {
      if(isPrintable(event.keyCode)) {
         this.value='';
         this.classList.add("typing");
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
   Mouth.plcHldr="Search a thing near by";
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
   UserThings = document.getElementById('UserThings');
   addEvent(Passwords2, 'keydown', signup);
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
   NewThingImgs=document.getElementById("NewThingImgs");
   NewThingImgs.count=0;
   // ChoosePic=document.getElementById("ChoosePic");
   // ChoosePic.onclick = function(ev) {
   //    ChoosePic.click();
   // };
   // ChoosePic.onchange = function(ev) {
   //    if (!ev.target.files[0]) return;
   //    var f = ev.target.files[0], r = new FileReader();
   //    r.readAsArrayBuffer(f);
   //    r.onload = function() {
   //       ev.target.value = '';
   //       var postUpload = function() {
   //          ++NewThingImgs.count;
   //          var newImg=document.getElementById("NI"+NewThingImgs.count);
   //          newImg.src=
   //             "/upload/"+Username.value+"/"+encodeURIComponent(f.name);
   //       }
   //       sendFileData(f.name, new Uint8Array(r.result), 2048, postUpload);
   //    };
   // };
   var newimgs = NewThingImgs.children;
   for (var i=0; i<newimgs.length; ++i) {
      var editBtn = document.createElement("input");
      editBtn.type="file";
      editBtn.classList.add("editBtn");
      editBtn.thingId=-1;
      editBtn.picId=i;
      editBtn.onchange=selectFiles;
      newimgs[i].append(editBtn);
   }
   document.body.style.display='inline';
};

var selectFiles = function(ev) {
   if (!ev.target.files[0]) return;
   var btn = ev.target;
   var f = btn.files[0], r = new FileReader();
   r.readAsArrayBuffer(f);
   r.onload = function() {
      ev.target.value = '';
      btn.postChunk = function() {
         var jso=JSON.parse(this.text);
         this.thingId=jso["thingId"];
      }
      btn.postUpload = function() {
         var thissvg=this.previousElementSibling;
         var newimg=document.createElement("img");
         newimg.classList.add("fixedSize");
         thissvg.classList.add("hidden");
         newimg.src=
            "/upload/"+Username.value+"/"+this.thingId+"."+this.picId+".jpg";
         this.insertAdjacentElement('beforeBegin', newimg);
      }
      sendFileData(f.name, new Uint8Array(r.result), 2048, btn);
   };
}

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
var login=function(feed) {
   var res = JSON.parse(feed.responseText);
   if(res.login===true) {
      Lock.classList.add("hidden");
      Password.classList.add("hidden");
      User.innerHTML=Username.value;
      Usermenu.classList.remove("hidden");
      Signupdiv.classList.add("hidden");
      UserActions.classList.remove("hidden");
   } else {
      Log.innerHTML="No No...! Check username and password :)";
      Lock.classList.add("hidden");
      Password.classList.add("hidden");
      Signupdiv.classList.remove("hidden");
      Usermenu.classList.add("hidden");
      Lock.classList.remove("hidden");
      
   }
   delete Password.shuttle;
}
var unlock=function(){
   Lock.classList.add("hidden");
   Username.classList.remove("hidden");
   Signupdiv.classList.remove("hidden");
   Signup.checked=false;
   Username.focus();
};
var usrnmEvent = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      Username.classList.add("hidden");
      if(Password.value!=Password.plcHldr)Password.type='password';
      Password.classList.remove('hidden');
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
      Lock.classList.remove("hidden");
      UserActions.classList.add("hidden");
   } else {
      Log.innerHTML="Huh! Something went wrong! Try again:)";
   }
   delete Unlock.shuttle;
}
var togglesignup = function() {
   if (Signup.checked) {
      Password.classList.add("hidden");
      Username.classList.remove("hidden");
      Email.classList.remove("hidden");
      Passwords1.classList.remove("hidden");
      Passwords2.classList.remove("hidden");
   } else {
      Email.classList.add("hidden");
      Passwords1.classList.add("hidden");
      Passwords2.classList.add("hidden");
   }
}
var signup = function() {
   if(event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
      var url = "signup";
      var f={};
      Password.classList.add("hidden");
      Username.classList.remove("hidden");
      f.content="{username:\""+Username.value+"\",password:\"";
      f.content+=Passwords2.value + "\",email:\""+Email.value+"\"}";
      f.postExpdtn=actMail;
      Passwords2.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
   }
}
var actMail = function(feed){
   var res = JSON.parse(feed.responseText);
   if(res.actEmailSent){
      Log.innerHTML=
         "Activation mail sent. Please check your spam folder aswell";
      Username.classList.add("hidden");
      Email.classList.add("hidden");
      Passwords1.classList.add("hidden");
      Passwords2.classList.add("hidden");
      Signupdiv.classList.add("hidden");
      Lock.classList.remove("hidden");
   } else {
      Log.innerHTML=
         "Email already registered! Check for Actiavation mail or use another email id";
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

var addThing = function () {
   AddThing.value="Upload";
   NewThingImgs.classList.remove("hidden");
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

// Helper function to display upload status
var setStatus = function(text) {
  document.getElementById('log').innerText = text;
};


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
      setStatus(
         'Uploading ' + name + ', bytes ' + offset + '..' +
            (offset + chunk.length) + ' of ' + data.length);
      fetch(url, opts)
         .then(function(res) {
            ok = res.ok;
            return res.text();
         })
         .then(function(text) {
            if (!ok) setStatus('Error: ' + text);
            else if(offset >= data.length){
               setStatus(name + ' uploaded!');
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
