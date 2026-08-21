window.indexPromise= fetch('html/index.html?22').then(r=> r.text());
window.thingsPromise= fetch('html/things.html?3').then(r=> r.text());
window.oopPromise= fetch('img/OwlOnPerch.svg').then(r=> r.text());
window.lockPromise= fetch('img/Lock.svg').then(r=> r.text());
window.unlockPromise= fetch('img/Unlock.svg').then(r=> r.text());
window.addThnPromise= fetch('img/AddThing.svg').then(r=> r.text());
window.svgsPromise= fetch('img/placeHldr.svg').then(r=> r.text());
var MastHead,Logo,LogoDiv,LogoBox,LogoTd,Mbox,Inbox,Outbox,OwlOnPerch,owlMail;
var LocationPin,LocationDDiv,LocationDiv,Location,LocTxt,LocTTimeout,LocTHide;
var SearchTool,SearchToolOpacity=1,SearchBar,LoadTop,LoadBottom;
var SearchToolBlink, GglSnD, GglSn, GglSnB, Gmail, PassBlk;
var Mouth, MouthPad, InUp;
var Lock,Desc,LockBlock,CMPD;
var Signupdiv, ffGglId, BackToLock;
var Username, Credentials;

function urlBase64ToUint8Array (base64) {
	const std = base64.replace(/-/g, '+').replace(/_/g, '/');
	const raw = window.atob(std);
	const uint8 = new Uint8Array(raw.length);
	for (let i = 0; i < raw.length; i++) {
		uint8[i] = raw.charCodeAt(i);
	}
	return uint8;
}
var Password;
var Email, SubmitBtn, ThnUrlLog;
var Passwords1, Password1L, Password2L, CaptchaImg, Captcha, NewL;
var Passwords2, ConsentL, Consent, NonRecovery;
var SignIn,SignUp,Recover;
var Usermenu, TgtUsrDscSbtBtn, SThings, MThings, UThings;
var User, TgtUsrLgHldr, TgtUsrDsc, TgtUsrDscEdtBx, TgtUsrDscEdtBtn;
var Unlock, Log, ThingRemovables=[], imageCompressor;
var ThingLocationL, ThingLocationBox, ThingNameL, ThingNameBox;
var chusPicBtn, chusPicBtnL, ThingDetailsDiv, CnclEdtBtn;
var Thing, Things, UserThings, UserActions, AddThing, ChoosePic, ReplyBtn;
var SVGS, ReplyBox, ReplyDiv, Msginpt, QSendDiv, MsgBtn, AddThingSVG;
var searchPlcHldr= 'Search things near U';
var locPlcHldr= "📍E.g. 12.3456,-78.9012";
var caretPos=0, FtrCmgSnLg;
const MaxImgsPerThing= 3, MAX_UN_LENGTH= 48;
const dscUrSlf= "Describe yourself...";
const FtrCmgSn= "Feature coming soon...";
var browserID,isApple,blinker;
var userData= {}, cnt= {};
var LocatingULog, pxlHtMm= 0;
var lstThn, lstThnDtls, Chin;
var Header,Htable;
var jsonCType= [["content-type", "application/json"]];
var hideLogDiv= function (elm) {
	if (elm.tOut)
		clearTimeout(elm.tOut);
	elm.classList.remove("blink");
	elm.classList.remove("hilit");
	elm.classList.remove("dim");
	elm.classList.add("hidden");
	if (document.getElementsByClassName("blink").length==0) {
		clearTimeout(blinker);
		blinker=null;
	}
}
var updateFL= function (nl, msg) {
	clearTimeout(nl.tOut);
	nl.innerHTML=msg;
	nl.classList.remove("hidden");
	nl.classList.add("blink");
	if (!blinker) {
		blink();
	}
	nl.tOut= setTimeout(hideLogDiv, 15000, nl);
}
var ferrylog= function (msg, timeout=15000) {
	var nl=document.createElement("div");
	nl.innerHTML=msg;
	Log.insertAdjacentElement("beforeEnd", nl);
	nl.classList.add("blink");
	nl.classList.add("hilit");
	if (!blinker) {
		blink();
	}
	nl.tOut= setTimeout(hideLogDiv, timeout, nl);
	return nl;
}

var toggleLog= function () {
	if (Log.classList.contains("visible")) {
		Log.classList.remove("visible");
		Log.lastElementChild.classList.add("hidden");
	} else {
		Log.classList.add("visible");
	}
}
var Rotate= function () {
	var props=
		 'transform WebkitTransform MozTransform OTransform msTransform'.
		 split(' '), prop, el= document.createElement('div');
	for (var i= 0, l= props.length; i < l; i++) {
		if (typeof el.style[props[i]] !== "undefined") {
			prop= props[i];
			break;
		}
	}
	var xAngle= 0, yAngle= 0;
	setInterval(function(){
		yAngle+=180;
		Logo.style[prop]= "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
	}, 2000);
};
var addEvent= function (elem, type, fn) {
	if (elem.addEventListener) elem.addEventListener(type, fn, false);
	else if (elem.attachEvent) elem.attachEvent('on' + type, fn);
};
var removeEvent= function (elem, type, fn) {
	if (elem.removeEventListener) elem.removeEventListener(type, fn, false);
	else if (elem.dettachEvent) elem.dettachEvent('on' + type, fn);
};
var setCaretPos= function (elem, caretPos) {
	if(elem != null) {
		if (elem.createTextRange) {
			var range= elem.createTextRange();
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
var inputOnFocus= function () {
	if (this.value=== this.plcHldr) {
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

var showPlaceHolder= function () {
	this.type='text';
	this.value= this.plcHldr;
	//this.style.color="rgb(192,192,192)";
	this.classList.remove("typing");
	setCaretPos(this,0);
};
var inputOnBlur= function () {
	if (this.value=== '') {
		this.classList.remove("typing");
		showPlaceHolder.call(this);
	}
};
var isPrintable= function (keycode) {
	return (keycode > 47 && keycode < 58)	 || // number keys
		(keycode > 64 && keycode < 91)		 || // letter keys
		(keycode > 95 && keycode < 112)		 || // numpad keys
		(keycode > 185 && keycode < 193)		 || // ;=,-./` (in order)
		(keycode > 218 && keycode < 223);		 // [\]' (in order)
}
var showAllThings= function () {
	for (let i=0;i<Things.children.length;++i) {
		let thing= Things.children[i];
		if (thing.thingId!=-1) {
			if (window.tgtUsr && thing.user!=window.tgtUsr)
				continue;
			thing.classList.remove("hidden");
		}
	}
	setTimeout(function(){
		document.body.scrollIntoView({behavior: "smooth", block: "start"});
	},100)
}
var inputOnKeyDown= function () {
	//console.log("onKeyDown: "+this.value + ", " + event.keyCode);
	if ((event.keyCode== 8 || event.keyCode== 46 || event.keyCode== 229 ||
		  event.inputType=== 'deleteContentBackward') &&
		 this.value.length<=1) {
		// Backspace
		showPlaceHolder.call(this);
		if (this.id==="mouth" && Things.classList.contains("search")) {
			showAllThings();
			Things.classList.remove("search");
		}
	} else if(this.value=== this.plcHldr) {
		if (event.data !== null || isPrintable(event.keyCode)) {
			this.value=event.data;
			this.classList.add("typing");
			// if(this.ctype==='password')
			//		this.type='password';
		} else {
			//search.call(this);
		}
	} else {
		return;
	}
	event.preventDefault();
	return false;
};
var onBeforeInput= function () {
	console.log("beforeInput: " + this.value);
	if (this.value=== this.plcHldr) {
		this.value='';
		this.classList.add("typing");
		if(this.ctype==='password')this.type='password';
	}
}
var onKeyPress= function () {
	console.log("keyPress: "+event.target.value);
}
var onInput= function () {
	console.log("onInput: "+event.target.value);
}
var getLocation= function () {
	var locateBtn= event.currentTarget;
	let thn= locateBtn.parentElement;
	var locationBox= getElementInsideContainer(thn, "ThingLocationBox");
	locationBox.value= Location.value;
}

var nxtImg= function (reverse) {
	event.cancelBubble=true;
	var nxtBtn= event.target;
	var imgs= nxtBtn.parentElement.parentElement.firstElementChild;
	var thing= imgs.parentElement.parentElement;
	var imgHldr= imgs.children[imgs.cid];
	imgs.cid= reverse?(imgs.cid?imgs.cid-1:imgs.children.length-1):
		(imgs.cid+1)%imgs.children.length;
	imgHldr.classList.add("hidden");
	imgHldr= imgs.children[imgs.cid];
	imgHldr.classList.remove("hidden");
	if (thing.classList.contains("editMode")) {
		chusPicBtnL.picId=imgs.cid;
	}
}

var incImg= function (reverse) {
	var incBtn= event.target.id=="eImg"?event.target:this;
	var imgs= incBtn.parentElement.parentElement.firstElementChild;
	var thing= imgs.parentElement.parentElement;
	var imgHldr= imgs.children[imgs.cid];
	var img= imgHldr.children[0];
	if (img.classList.contains("plusSize") || reverse) {
		img.classList.remove("plusSize");
		incBtn.value="<=>"
	} else {
		img.classList.add("plusSize");
		incBtn.value="><";
	}
}
var hasSoftKbd= false;
let initialHeight= window.visualViewport ?
	 window.visualViewport.height : window.innerHeight;
var viewportHandler= function() {
	if (!hasSoftKbd) {
		const viewportHeight= window.visualViewport ?
				window.visualViewport.height : window.innerHeight;
		const ratio= viewportHeight / initialHeight;
		if (ratio<0.75)
			hasSoftKbd= true;
		//ferrylog("hasSoftKbd: " + hasSoftKbd);
	}
	if (isApple) {
		return;
	}
	//var bottom=
	//		(CMPD*(window.innerHeight-event.target.height)+0.2).toString()+"cm";
	//let bottom= (window.innerHeight-event.target.height+Log.iypos);
	//Log.style.bottom=(bottom<Log.iypos?Log.iypos:bottom)+"px";
	//ferrylog(bottom+" "+Log.children.length);
	let viewport= window.visualViewport;
	Header.style.bottom=window.innerHeight-viewport.height+mmToPxls(10)+"px";
	mbox.style.maxHeight=
		viewport.height-Htable.offsetHeight-mmToPxls(20)+"px";
	if (Header.offsetHeight>viewport.height) {
		Header.style.maxHeight=viewport.height+"px";
		Header.style.overflow="auto";
	} else {
		Header.style.overflow="unset";		
	}
}

var showBoxUpdtLoc= function() {
	Location.dont=false;
	updateLocation.call(this, true);
};

var LocDShow= function () {
	clearTimeout(LocTTimeout);
	LocTxt.classList.remove("hidden");
}

var LocDHide= function () {
	setTimeout(LocTHide,7000);
}

var mmToPxls= function (mm) {
	return mm/pxlHtMm;
}
var updateLocation= function (show) {
	if (show) {
		if (!Location.classList.contains("hidden")) {
			Location.classList.add("hidden");
			LocTxt.classList.remove("hidden");
			LocTTimeout= setTimeout(LocTHide,7000);
			LocationDiv.onmouseenter= LocDShow;
			LocationDiv.onmouseleave= LocDHide;
			return;
		}
		LocTxt.classList.add("hidden");
		Location.classList.remove("hidden");
		LocationDiv.onmouseenter= null;
		LocationDiv.onmouseleave= null;
	}
	var onPosition= function (position) {
		if (LocatingULog)
			hideLogDiv(LocatingULog);
		if (Location.dont) {
			return;
		}
		Location.value=position.coords.latitude.toPrecision(9);
		Location.value+=","+position.coords.longitude.toPrecision(9);
		LocTxt.innerHTML=Location.value;
		if (cnt.locked) {
			window.getAllThnsArnd();
		}
		if (Location.classList.contains("hidden")) {
			LocTxt.classList.remove("hidden");
			clearTimeout(LocTTimeout);
			LocTTimeout= setTimeout(LocTHide, 7000);			 
		}
		setTimeout(updateLocation, 60000);
	}
	var onPosErr= function (posErr) {
		if (LocatingULog) {
			hideLogDiv(LocatingULog);
		}
		if (Location.dont || !Location.classList.contains("hidden")) {
			return;
		}
		if (!browserID) {
			Logo.onclick.call(Logo);
		}
		if (posErr.code== posErr.PERMISSION_DENIED) {
			if (LocatingULog) 
				hideLogDiv(LocatingULog);
			ferrylog("U denied locating you! Enter ur preferred "+
						"Latitude,Longitude");
			return;
		}
		ferrylog(posErr.message+"<br/>Give Latitude,Longitude");
		setTimeout(updateLocation, 60000);
	}
	var options= {
		enableHighAccuracy:true
	}
	if (Log.classList.contains("if") &&
		 (window.tgtUsr || urlQuery.get("gp"))) {
		let gp= urlQuery.get("gp")
		let pos= {};
		pos.coords= {};
		if (gp) {
			gp= gp.split(",");
			pos.coords.latitude= Number(gp[0]);
			pos.coords.longitude= Number(gp[1]);
		} else {
			pos.coords.latitude= 0;
			pos.coords.longitude= 0;			
		}
		setTimeout(onPosition, 0,pos);
		const url= new URL(window.location.href);
		url.searchParams.delete("gp");
		history.replaceState({}, "", url);
	} else if (navigator.geolocation) {
		var options= {
			enableHighAccuracy:false
		}
		navigator.geolocation.getCurrentPosition(onPosition,onPosErr,options);
		if (!browserID) {
			if (LocatingULog) 
				hideLogDiv(LocatingULog);
			LocatingULog= ferrylog("LocatingU!", 100000);
		}
	} else {
		let err={};
		err.message="GeoLocationNotSupportedByUrBrowser";
		err.code=100;
		onPosErr(err);
		return;
	}
	if (!browserID) {
		browserID= getCookie("bid");
		if (pxlHtMm==0) {
			let logoHt= Logo.getBoundingClientRect().height;
			if (logoHt==0) {
				ferrylog("zero logo height!");
			}
			pxlHtMm= 50/Logo.getBoundingClientRect().height;
		}
		mbox.style.maxHeight=
			window.visualViewport.height-Htable.offsetHeight-
			mmToPxls(20)+"px";
		window.visualViewport.addEventListener("resize", viewportHandler);
	}
}

var openMap= function () {
	window.open(event.currentTarget.url,'map');
}
	var toggleMbox= function () {
		if (Mbox.classList.contains("hidden")) {
			Mbox.classList.remove("hidden");
		} else {
			Mbox.classList.add("hidden");		  
			setTimeout(subscribe, 3000);
		}
	}
var sendOwl= function () {
	var showOwl= false;
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
	let url= window.location.search;
	url+=url.length?"&":"?";
	url+="req=owl";
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
		md= mds[i];
		var thing= md.parentElement.parentElement.parentElement.parentElement;
		var tusr= thing.user;
		if (!cnt.Qs)
			cnt["Qs"]={};
		if (!cnt.Qs[tusr])
			cnt.Qs[tusr]={};
		cnt.Qs[tusr][thing.thingId]=md.children[2].innerHTML;
	}
	for (var i=0; i<rmds.length; ++i) {
		md= rmds[i];
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
			thing=md.parentElement.parentElement.parentElement.parentElement;
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
		reply= replies[i];
		var thing=
			 reply.parentElement.parentElement.parentElement.parentElement.
			 parentElement;
		var mid= reply.parentElement.firstElementChild.innerHTML
		if (!cnt.Reps)
			cnt["Reps"]={};
		if (!cnt.Reps[thing.thingId])
			cnt.Reps[thing.thingId]={};
		cnt.Reps[thing.thingId][mid]=reply.lastElementChild.innerHTML;
	}
	f.content=JSON.stringify(cnt);
	f.postExpdtn= function (feed) {
		var res= JSON.parse(feed.responseText);
		if (!signOk(res)) {
			return;
		}
		if (res.status==1) {
			for (let md of mds) {
				var thing=
					 md.parentElement.parentElement.parentElement.parentElement;
				var tusr= thing.user;
				var mid=res.Qs[tusr][thing.thingId];
				md.children[0].innerHTML=mid;
				md.classList.remove("inQ");
				md.imd.classList.remove("inQ");
			}
			for (let md of rmds) {
				md=md.imd?md.imd:md;
				md.classList.remove("inQ");
				if (md.rmd) {
					md.rmd.classList.remove("inQ");
				} else {
					md.md.classList.remove("inQ");
				}
				--Inbox.news;
			}
			for (let rep of replies) {
				rep.classList.remove("inQ");
				rep.imd.classList.remove("inQ");
			}
			for (const stid in res["news"]) {
				var tthing= res["news"][stid]
				var tid= parseInt(stid);
				var things= UserThings[User.innerHTML.toLowerCase()];
				var thing= things[tid];
				var msgd= getElementInsideContainer(thing, "msgs");
				md= msgd.firstElementChild;
				var itms=Inbox.things[tid];
				for (const smid in tthing) {
					if (!isNaN(parseInt(md.firstElementChild.innerHTML))) {
						md= md.cloneNode(true);
					}
					var msg= tthing[smid];
					md.children[0].innerHTML=msg["id"];
					md.children[1].innerHTML=msg["user"]+": ";
					md.children[2].innerHTML=msg["msg"];
					if (md.children.length==4) {
						md.removeChild(md.children[3]);
					}
					msgd.insertAdjacentElement("beforeEnd", md);
					md.onclick=markAsRead;
					var imd= md.cloneNode(true);
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
			var rnews= res.rnews;
			if (!rnews) rnews=[];
			for (let smsg of rnews) {
				var tusr= smsg[0];
				var things=UserThings[tusr];
				var tid= smsg[1];
				var thing= things[tid];
				var msgd= getElementInsideContainer(thing, "msgs");
				for (var i=0; i<msgd.children.length; ++i) {
					var md= msgd.children[i];
					var mid= parseInt(md.children[0].innerHTML);
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
					oreply.ind=smsg[4];
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
	f.reqHeaders=jsonCType;
	window.shuttle= new core.shuttle(url,f.content,f.postExpdtn,f);
}
var lastViewPortHeight= 0;
var blurInput= function () {
	window.removeEventListener('scroll', blurInput);
	if (lastViewPortHeight-window.visualViewport.height>40) {
		document.activeElement.blur();
	}
}
var makeDynamic= function () {
	var dElms= document.getElementsByTagName("template");
	while (dElms.length) {
		let dElm= dElms[0];
		dElm.outerHTML=dElm.innerHTML;
	}
}
var onMoreThings= function (feed) {
	var res= JSON.parse(feed.responseText);
	if (res.things.length)
		updateThings(res);
	else {
		LoadBottom.innerHTML="no more!";
		LoadBottom.onclick=null;
	}
}
var loadMore= function () {
	let bottom= false;
	if (this.id== "loadBottom") {
		bottom= true;
	}
	let url= window.location.search;
	url+=url.length?"&":"?";
	url+="req=pts";
	var f={};
	var cnt= {};
	cnt.search=Things.classList.contains("search");
	cnt.dir=bottom?1:-1;
	cnt.ni=-1;
	f.content=JSON.stringify(cnt);
	f.postExpdtn=onMoreThings;
	f.reqHeaders=jsonCType;
	window.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}
function decodeJwtResponse (token) {
	 let base64Url= token.split('.')[1];
	 let base64= base64Url.replace(/-/g, '+').replace(/_/g, '/');
	 let jsonPayload= decodeURIComponent(atob(base64).split('').map(function(c) {
		  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	 }).join(''));
	 return JSON.parse(jsonPayload);
}
var userKeyDown= function () {
	if (!this.keyboardDetermined && event.type=== "keydown") {
		if (event.keyCode==229 && !event.code) {
			this.onkeydown=null;
			this.keyboardDetermined=true;
			return;
		} else {
			this.oninput=null;
		}
		this.keyboardDetermined=true;
	}
	if (this.value.length<=2) { //46=delete
		if(!(event.keyCode== 8 || event.keyCode== 46 || event.keyCode== 229 ||
			event.inputType=== 'deleteContentBackward')) {
			GglSnD.classList.add("hidden");
			PasswordL.classList.remove("hidden");
		} else {
			PasswordL.classList.add("hidden");		 
			GglSnD.classList.remove("hidden");
		}
	}
}
var emailKeyDown= function () {
	if (!this.keyboardDetermined && event.type=== "keydown") {
		if (event.keyCode==229 && !event.code) {
			this.onkeydown=null;
			this.keyboardDetermined=true;
			return;
		} else {
			this.oninput=null;
		}
		this.keyboardDetermined=true;
	}
	if (this.value.length<=2) { //46=delete
		if (!(event.keyCode== 8 || event.keyCode== 46 || event.keyCode== 229 ||
				event.inputType=== 'deleteContentBackward')) {
			GglSnD.classList.add("hidden");
			PassBlk.classList.remove("hidden");
		} else {
			PassBlk.classList.add("hidden");		  
			GglSnD.classList.remove("hidden");
		}
	}
}
var hideUserSignIn= function () {
	Gmail.classList.add("hidden");
	if (this.checked) {
		Recover.classList.add("hidden");
		if (SignUp.checked || Recover.checked) {
			EmailL.classList.add("hidden");
			GglSnB.classList.remove("hidden");
		} else {
			UsernameL.classList.add("hidden");
			GglSnB.classList.remove("hidden");
			SubmitBtn.classList.add("hidden");
		}
	} else {
		if (SignUp.checked || Recover.checked) {
			GglSnB.classList.add("hidden");
			EmailL.classList.remove("hidden");
		} else {
			GglSnB.classList.add("hidden");		 
			UsernameL.classList.remove("hidden");
			SubmitBtn.classList.remove("hidden");
		}
	}
}
var gglSnHandler= function (res) {
	const resPld= decodeJwtResponse(res.credential);
	Username.token=res.credential;
	Gmail.innerHTML=resPld.email;
	gglSnB.classList.add("hidden");
	Gmail.classList.remove("hidden");
	if (SignIn.checked) {
		authenticateUser(resPld);
	} else if (SignUp.checked) {
		signup(resPld);
	}
}
function hasHardwareAcceleration() {
	try {
		const canvas= document.createElement('canvas');
		const gl= canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		return !!(gl && gl instanceof WebGLRenderingContext);
	} catch (e) {
		return false;
	}
}
var last= performance.now();
var frames= 0;
var noBlur= false;
function monitorFPS () {
	++frames;
	const now= performance.now();
	if (now - last >= 2000) { // 2 seconds
		const fps= (frames * 1000) / (now - last);
		if (fps < 20 || window.redraw) {
			document.body.classList.add('noBlur');
			noBlur=true;
			if (window.redraw) {
				setTimeout(()=>{
					redraw= false;
					if (fps >= 20) {
						document.body.classList.remove('noBlur');
						noBlur= false;
					}
				}, 500);
			}
		}
		frames= 0;
		last= now;
	}
	if (!noBlur)
		requestAnimationFrame(monitorFPS);
}
var loadNodes= function (d) {
	let lastElm;
	while (d.children.length) {
		let elm= d.children[0];
		elm.remove();
		let dhtml= elm.getAttribute("dhtml");
		if (dhtml) {
			let keyVal= dhtml.split(':');
			let key= keyVal[0];
			let val= keyVal[1];
			let tgt= val.length? document.getElementById(val) : null;
			if (key== "endChildren") {
				while (elm.children.length) {
					let elmChild= elm.children[0];
					elmChild.remove();
					tgt.insertAdjacentElement("beforeEnd", elmChild);
				}
			} else if (key== "start") {
				tgt.insertAdjacentElement("afterBegin", elm);
			} else if (key== "end") {
				tgt.insertAdjacentElement("beforeEnd", elm);
			}	else if (key== "after") {
				tgt.insertAdjacentElement("afterEnd", elm);
			} else if (key== "parent") {
				loadNodes(elm);
			}
		} else if (!lastElm) {
			loadNodes(elm);
		} else {
			lastElm.insertAdjacentElement("afterEnd", elm);
		}
		lastElm= elm;
	}	 
}
window.init= async function () {
	let isJs= getCookie("js")=="1";
	if (!isJs) {
		setCookie("js","1",99999999);
		location.reload();
	}
	cnt.locked= true;
	makeDynamic();
	let d= document.getElementsByTagName('dummy')[0];
	let svg= await window.indexPromise;
	d.innerHTML= svg;
	loadNodes(d);
	makeDynamic();
	window.indexPromise= undefined;
	svg= await window.thingsPromise;
	d.innerHTML= svg;
	loadNodes(d);
	window.thingsPromise= undefined;
	if (!hasHardwareAcceleration()) {
		document.body.classList.add('noBlur');
		noBlur=true;
	} else {
		requestAnimationFrame(monitorFPS);
	}
	makeDynamic();
	isApple= /iPad|iPhone|iPod/.test(navigator.userAgent);
	window.urlQuery= new URLSearchParams(window.location.search);
	inps= document.getElementsByTagName("input");
	for (let i= 0; i<inps.length; ++i) {
		inps[i].addEventListener(
			'focus',(e)=>{
				lastViewPortHeight=window.visualViewport.height;
				setTimeout(()=>{window.addEventListener('scroll', blurInput)},2000);
			});
	}
	MastHead= document.getElementById("mastHead");
	Header= document.getElementsByTagName("header")[0];
	Htable= Header.firstElementChild;
	LoadTop= document.getElementById('loadTop');
	LoadBottom= document.getElementById('loadBottom');
	LoadBottom.onclick= loadMore;
	Logo= document.getElementById('logo');
	LogoDiv= document.getElementById('logoDiv');
	LogoBox= document.getElementById('logoBox');
	LogoTd= document.getElementById('logoTd');
	BackToLock= document.getElementById('backToLock');
	LogoTd.setAttribute("title",window.location.origin);
	LogoDiv.remove();
	document.body.insertAdjacentElement('afterBegin',LogoDiv);
	Chin= document.getElementById('chin');
	Inbox=document.getElementById('inbox');
	Mbox=document.getElementById('mbox');
	Outbox=document.getElementById('outbox');
	Inbox.things={};
	Inbox.mds=[];
	Inbox.rmds=[];
	Inbox.news=0;
	Inbox.replies=[]
	OwlOnPerch= document.getElementById('owlOnPerch');
	svg= await window.oopPromise;
	OwlOnPerch.innerHTML= svg;
	let temp= OwlOnPerch;
	OwlOnPerch= temp.firstChild;
	temp.replaceWith(OwlOnPerch);
	window.oopPromise= undefined;

	OwlOnPerch.onclick= toggleMbox;
	LogoDiv.parentElement.style.display= "block";
	SearchTool= document.getElementById('searchTool');
	SearchBar= document.getElementById('searchBar');
	LocationPin= document.getElementById('LocationPin');
	Location= document.getElementById('LocationBox');
	Location.plcHldr=locPlcHldr;
	Location.value=locPlcHldr;
	LocationDiv= document.getElementById('LocationDiv');
	LocationDDiv= document.getElementById('LocationDDiv');
	LocationDDiv.remove();
	LogoBox.insertAdjacentElement("beforeEnd", LocationDDiv);
	ReplyDiv= document.getElementById('replyDiv');
	ReplyBtn= document.getElementById('replyBtn');
	ReplyBox= document.getElementById('replyBox');
	QSendDiv= document.getElementById('qSendDiv');
	MsgBtn= document.getElementById('msgBtn');
	Msginpt= document.getElementById('msginpt');
	ReplyDiv.remove();
	ReplyDiv.classList.remove("hidden");
	QSendDiv.remove();
	QSendDiv.classList.remove("hidden");
	addEvent(Location, 'keydown', function () {
		if (!this.dont) {
			this.dont=true;
			ferrylog("Ok, not locating you. Enter preferred location in "+
						"YY.YYYY,XX.XXXX format");
			LocationPin.onclick= getAllThnsArnd;
		}
		if (event.keyCode==13) {
			getAllThnsArnd();
		}
	});
	LocTxt=document.getElementById('LocTxt');
	Mouth=document.getElementById('mouth');
	MouthPad=document.getElementById('mouthPad');
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
	LockBlock= document.getElementById("LockBlock");
	Lock= document.getElementById("lock");
	svg= await window.lockPromise;
	Lock.innerHTML= svg;
	temp= Lock;
	Lock= temp.firstChild;
	temp.replaceWith(Lock);
	CMPD= 0.8/Lock.getBoundingClientRect().width;
	Desc= document.getElementById("Desc");
	
	Username= document.getElementById("username");
	UsernameL= document.getElementById("UsernameL");
	Password= document.getElementById("password");
	PasswordL= document.getElementById("PasswordL");
	Credentials= document.getElementById("Credentials");
	NonRecovery= document.getElementById("NonRecovery");
	//Username.plcHldr= 'Username:';
	//Password.plcHldr= 'Password:';
	Password.type='password';
	//Password.value=Password.plcHldr;
	Signupdiv=document.getElementById("signupdiv");
	InUp=document.getElementById("inUp");
	GglSnD=document.getElementById("gglSnD");
	GglSn=document.getElementById("gglSn");
	GglSnB=document.getElementById("gglSnB");
	Gmail=document.getElementById("gmail");
	GglSn.onchange=hideUserSignIn;
	Username.onkeydown=userKeyDown;
	Username.oninput=userKeyDown;
	PassBlk=document.getElementById("passBlk");
	SignIn=document.getElementById("SignIn");
	Recover=document.getElementById("Recover");
	SignUp=document.getElementById("SignUp");
	SubmitBtn=document.getElementById("SubmitBtn");
	SignIn.checked=true;
	Email=document.getElementById("email");
	EmailL=document.getElementById("EmailL");
	Email.onkeydown= emailKeyDown;
	Email.oninput= emailKeyDown;
	Passwords1=document.getElementById("passwords1");
	Passwords2=document.getElementById("passwords2");
	Password1L=document.getElementById("Password1L");
	Password2L=document.getElementById("Password2L");
	NewL=document.getElementById("NewL");
	TgtUsrDsc= document.getElementById("tgtUsrDsc");
	TgtUsrDscEdtBtn= document.getElementById("tgtUsrDscEdtBtn");
	TgtUsrDscSbtBtn= document.getElementById("tgtUsrDscSbtBtn");
	TgtUsrDscEdtBx= document.getElementById("tgtUsrDscEdtBx");
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
	window.addEventListener('message', e=>{
		if (e.data && e.data.type === 'ffPush') {
			var d= e.data.data;
			ferrylog('Push: ' + (d.user || '') + ': ' +
				(d.thingName || '') + '< ' + (d.msg || ''));
		}
	});
	NonRecovery=document.getElementById("NonRecovery");
	var inputs=document.getElementsByClassName("labeled");
	for (var i=0; i<inputs.length; ++i) {
		var elm= inputs[i];
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
	User= document.getElementById('user');
	User.onclick= function () {
		ferrylog("Switching to Ur things, for proximity view click Logo")
		history.pushState(
			{}, '', User.innerHTML.toLowerCase()+"?gp="+Location.value);
		Things.classList.remove("mThns");
		Things.classList.add("uThns");
	}
	TgtUsrLgHldr= document.getElementById("tgtUsrLgHldr");
	addEvent(Username, 'keydown', usrnmEvent);
	addEvent(Password, 'keydown', authenticateUser);
	addEvent(SearchTool, 'click', search);
	addEvent(SubmitBtn, 'click', authenticateUser);
	Unlock= document.getElementById('unlock');
	svg= await window.unlockPromise;
	Unlock.innerHTML= svg;
	temp= Unlock;
	Unlock= temp.firstChild;
	temp.replaceWith(Unlock);
	window.lockPromise= undefined;
	window.unlockPromise= undefined;
	Usermenu= document.getElementById('usermenu');
	Things= document.getElementById('Things');
	SThings= document.getElementById('SThings');
	MThings= document.getElementById('MThings');
	UThings= document.getElementById('UThings');
	Consent= document.getElementById('Consent');
	ConsentL= document.getElementById('ConsentL');
	Thing= getElementInsideContainer(Things, "Thing");
	lstThn= Thing;
	UserThings= {};
	let ctrs= Thing.getElementsByClassName("removable");
	chusPicBtnL= getElementInsideContainer(Thing, "chusPicBtnL");
	chusPicBtn= getElementInsideContainer(Thing, "chusPicBtn");
	ThingLocationL= getElementInsideContainer(Thing, "ThingLocationL");
	ThingLocationBox= getElementInsideContainer(Thing, "ThingLocationBox");
	ThingNameL= getElementInsideContainer(Thing, "ThingNameL");
	ThingNameBox= getElementInsideContainer(Thing, "ThingNameBox");
	ThingDetailsDiv= getElementInsideContainer(Thing, "ThingDetailsDiv");
	cnclEdtBtn= getElementInsideContainer(Thing, "cnclEdtBtn");
	cnclEdtBtn.onclick=updateThing;
	chusPicBtn.onclick=openfileprompt;
	chusPicBtn.cid=0;
	for (let i=0; i<ctrs.length; ++i) {
		ThingRemovables.push(ctrs[i]);
		let r= ThingRemovables[i];
		r.pid= r.previousElementSibling.id;
	}
	for (let i=0; i<ThingRemovables.length; ++i) {
		let r= ThingRemovables[i];
		r.remove();
	}
	Thing.remove();
	addEvent(Passwords2, 'keydown', signup);
	addEvent(Captcha, 'keydown', signup);
	UserActions= document.getElementById("UserActions");
	AddThing= document.getElementById("AddThing");
	AddThing.plcHldr= "Add a thing to the fair";
	
	AddThingSVG= document.getElementById("AddThingSVG");
	svg= await window.addThnPromise;
	AddThingSVG.innerHTML= svg;
	temp= AddThingSVG;
	AddThingSVG= temp.firstChild;
	temp.replaceWith(AddThingSVG);
	window.addThnPromise= undefined;

	SVGS= document.getElementById("SVGS");
	svg= await window.svgsPromise;
	SVGS.innerHTML= svg;
	temp= SVGS;
	SVGS= temp.firstChild;
	temp.replaceWith(SVGS);
	temp= undefined;
	window.svgsPromise= undefined;
	SVGS.remove();
	window.getAllThnsArnd= function () {
		hideKeyboard();
		Location.classList.add("hidden");
		if (location.search) {
			const thing= urlQuery.get("thing");
			if (thing) {
				window.tgtThing= thing;
			}
		}
		Mouth.value= "";
		search();
		Mouth.value= Mouth.plcHldr;
		LocationPin.classList.remove('empty');
	}
	LocationPin.onclick= showBoxUpdtLoc;
	Logo.onclick= function () {
		LocationPin.classList.remove("hidden");
		showBoxUpdtLoc.call(LocationPin);
		Logo.onclick= function () {
			if (LocationDDiv.classList.contains("hidden")) {
				LocationDDiv.classList.remove("hidden");
			} else {
				LocationDDiv.classList.add("hidden");				 
			}
		}
	}
	if (location.pathname!= "/") {
		window.tgtUsr= location.pathname.substr(1);
	}
	updateLocation();
	// window.onresize= function () {
	//		Log.style.bottom= "0.2cm";
	// };
	document.body.classList.remove("hidden");
	ffGglId="91088616070-phsro3v29up7pts7od1e8snkee0ak774";
	ffGglId+=".apps.googleusercontent.com";
	google.accounts.id.initialize({
		client_id: ffGglId,
		callback: gglSnHandler
	});
	google.accounts.id.renderButton(
		GglSnB,
		{ theme: "outline", size: "medium" }  // customization attributes
	);
	makeDynamic();
	//setTimeOut(showHelp, 5000);
};
var showHelp= function () {
	if (Log.offsetHeight) {
		setTimeOut(showHelp, 1000);
	} else {
		//if ()
		ferrylog("Click User")
	}
}
var cnclTUsrDscEdt= function () {
	TgtUsrDscEdtBx.classList.add("hidden");
	TgtUsrDscEdtBtn.innerHTML= "Edit";
	TgtUsrDscEdtBtn.onclick= tUsrDscEdt;
	TgtUsrDscSbtBtn.classList.add("hidden");
	TgtUsrDsc.classList.remove("hidden");
}
var tUsrDscEdt= function () {
	TgtUsrDsc.classList.add("hidden");
	TgtUsrDscEdtBtn.innerHTML= "Cancel";
	TgtUsrDscEdtBtn.onclick= cnclTUsrDscEdt;
	TgtUsrDscEdtBx.classList.remove("hidden");
	TgtUsrDscSbtBtn.classList.remove("hidden");
}

document.addEventListener('DOMContentLoaded', init);
var sendMsg= function () {
	var thing=this.parentElement.parentElement.parentElement.parentElement;
	var mdiv= getElementInsideContainer(thing, "msgdiv");
	var msgd= getElementInsideContainer(mdiv, "msgs");
	var msginpt= getElementInsideContainer(mdiv, "msginpt");
	var md= msgd.firstElementChild;
	var ld= md.firstElementChild;
	var id= parseInt(ld.innerHTML);
	var mid= 1;
	if (!isNaN(id)) {
		mid= parseInt(msgd.lastElementChild.firstElementChild.innerHTML);
		md= msgd.children[0].cloneNode(true);
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
	var imd= md.cloneNode(true);
	var to= imd.removeChild(imd.children[1]);
	to.innerHTML=" :"+thing.user;
	imd.insertAdjacentElement("beforeEnd",to);
	imd.md=md;
	Outbox.insertAdjacentElement("beforeEnd",imd);
	imd.onclick=showThing;
	imd.classList.add('inQ');
	md.imd=imd;
	Inbox.mds.push(md);
	ferrylog("Ur query will b sent by next owl!");
}
var gotoHome= function () {
	window.location.href= window.location.origin;
}
var proceedCompressedImage= function (compressedSrc) {
	sendFileData(new Uint8Array(compressedSrc), 2048, l);
}

function resizeMe (img, qf, gotBlob, thumbNail) {
	var canvas= document.createElement('canvas');
	var width= img.width;
	var height= img.height;
	let lMaxWidth= thumbNail?mmToPxls(60):mmToPxls(150);
	let lMaxHeight= lMaxWidth;
	// calculate the width and height, constraining the proportions
	if (width > height) {
		if (width > lMaxWidth) {
			//height *= lMaxWidth / width;
			height= Math.round(height *= lMaxWidth / width);
			width= lMaxWidth;
		}
	} else {
		if (height > lMaxHeight) {
			//width *= lMaxHeight / height;
			width= Math.round(width *= lMaxHeight / height);
			height= lMaxHeight;
		}
	}
	// resize the canvas and draw the image data into it
	canvas.width= width;
	canvas.height= height;
	//document.body.appendChild(canvas);
	var ctx= canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height);
	// do the actual resized preview
	// get the data from canvas as 70% JPG (can be also PNG, etc.)
	return canvas.toBlob(gotBlob, "image/jpeg", qf);
}

function selectFiles (ev) {
	if (!ev.target.files[0]) return;
	var btn= ev.target;
	var f= btn.files[0], r= new FileReader();
	var l= btn.previousElementSibling;
	r.readAsArrayBuffer(f);
	var imgsHldr= this.parentElement;
	var thisThing= imgsHldr.parentElement;
	var imgs= imgsHldr.children[0];
	var imgHldr= imgs.children[imgs.cid];
	var img= imgHldr.firstElementChild;
	if (!l.teb) {
		var teb= getElementInsideContainer(thisThing, "ThingEditBtn");
		teb.disabled=true;
		l.teb=teb;
	}
	r.onload= function () {
		//ev.target.value= '';
		l.postChunk= function() {
			var jso=JSON.parse(this.text);
			this.thingId=jso["thingId"];
		}
		l.postUpload= function () {
			var jso=JSON.parse(this.text);
			this.thingId=jso["thingId"];
			thisThing.thingId=this.thingId;
			var tid= getElementInsideContainer(thisThing, "ThingId");
			tid.innerHTML=this.thingId.toString();
			this.teb.disabled=false;
		}
		var limg=r.result;
		var image;
		var blob= new Blob([limg]); // create blob...
		window.URL= window.URL || window.webkitURL;
		var blobURL= window.URL.createObjectURL(blob); // and get it's URL
		var ontblob= function (ab) {
			img.remove();
			imgHldr.classList.remove("dummy");
			img= document.createElement('img');
			imgHldr.insertAdjacentElement('beforeEnd', img);
			img.classList.add("fixedSize");
			img.setAttribute("loading","lazy");
			addDummyImgs(thisThing);
			img.onload= function () {
				ferrylog("thumbLoaded");
				if (f.size>2000000) {
					ferrylog("File size exceeded 2MB! Compressing");
					resizeMe(image,0.7,(ablob)=>{
						if (!ablob) {
							ferrylog("resizeMe failed - ablob undefined");
							return;
						}
						ferrylog("gotBlob: "+ablob.size);
						if (ablob.bytes) {
							ablob.bytes().then((bytes)=>{
								sendFileData(bytes, 2048,l);
							})
						} else if (ablob.arrayBuffer) {
							ablob.arrayBuffer().then((bytes)=>{
								sendFileData(new Uint8Array(bytes), 2048,l);
							})
						}
					})
				} else {
					sendFileData(new Uint8Array(limg), 2048, l);
				}
			}
			img.src=window.URL.createObjectURL(
				new Blob([ab], {'type': 'image/jpeg'}));
		}
		
		// helper Image object
		image= new Image();
		image.onload= function () {
			ferrylog("imageLoaded");
			var resized= resizeMe(image,0.7,(tblob)=>{
				if (!tblob) {
					ferrylog("resizeMe failed - tblob undefined");
					ontblob();
					return;
				}
				ferrylog("gotThumbBlob: "+tblob.size);
				if (tblob.bytes) {
					tblob.bytes().then((tbytes)=>{
						ontblob(tbytes);
					})
				} else if (tblob.arrayBuffer) {
					tblob.arrayBuffer().then((tbytes)=>{
						ontblob(new Uint8Array(tbytes));
					});
				} else {
					ontblob();
				}
			},true);
		}
		image.src= blobURL;
	};
}

var about= function () {
	if (Log.classList.contains('about')) {
		Log.classList.remove('about');
	} else {
		Log.classList.add('about');
	}
}

var hideBlink= function () {
	let blinkElms= document.getElementsByClassName("blink");
	for (let i=0; i<blinkElms.length; ++i) {
		blinkElms[i].classList.add("dim");
		blinkElms[i].classList.remove("hilit");
	}
	blinker=setTimeout(showBlink,300);
}
var showBlink= function () {
	let blinkElms= document.getElementsByClassName("blink");
	for (let i=0; i<blinkElms.length; ++i) {
		blinkElms[i].classList.remove("dim");
		blinkElms[i].classList.add("hilit");
	}
	blinker=setTimeout(hideBlink,3000);
}
var blink= function () {
	blinker=setTimeout(hideBlink,3000)
}
var onCaptcha= function(feed){
	var res= JSON.parse(feed.responseText);
	if (res.cap) {
		CaptchaImg.src="/tmp/"+browserID+".jpg?"+new Date().getTime();
	}
	delete window.shuttle;
}
var markUserThings= function () {
	var uts= UserThings[User.innerHTML.toLowerCase()];
	for (var tid in uts) {
		uts[tid].classList.add("mine");
	}
}
var signInUI= function (res) {
	document.body.classList.add("signed");
	BackToLock.classList.add("hidden");
	User.innerHTML= res.name;
	User.setAttribute("title",location.origin+"/"+res.name.toLowerCase());
	User.obj= res;
	if (window.tgtUsr) {
		TgtUsrDsc.innerHTML= res.tdesc?res.tdesc:dscUrSlf;
		if (User.innerHTML==TgtUsrLgHldr.innerHTML) {
			TgtUsrDsc.classList.remove("hidden");
			TgtUsrDscEdtBtn.classList.remove("hidden");
			TgtUsrDscEdtBtn.onclick= tUsrDscEdt;
			TgtUsrDscSbtBtn.onclick= function () {
				cnclTUsrDscEdt();
				let url= window.location.search;
				url+= url.length?"&":"?";
				url+= "req=usrdscupd";
				var f= {};
				var cnt= {};
				cnt.dsc= TgtUsrDscEdtBx.value;
				f.content= JSON.stringify(cnt);
				f.postExpdtn= function (feed) {
					if (res.error) {
						ferrylog("User description update: "+res.error);
					} else {
						if (!FtrCmgSnLg)
							FtrCmgSnLg= ferrylog(FtrCmgSn);
						else
							updateFL(FtrCmgSnLg, FtrCmgSn);
						TgtUsrDsc.innerHTML= TgtUsrDscEdtBx.value;
					}
					delete window.shuttle;
				};
				f.reqHeaders= jsonCType;
				window.shuttle=
					new core.shuttle(url,f.content,f.postExpdtn,f);
			}
		}
	}
	if (!window.tgtThing || !Things.children.length) {
		updateThings(res);
	} else {
		let thn= Things.children[0];
		let imgsHldr= getElementInsideContainer(thn,"ImgsHldr");
		showThingDetails.call(imgsHldr,true);
	}
	markUserThings();
	owlMail= setInterval(sendOwl, 30000);
	RecoverL.classList.add("hidden");
	ferrylog("SignedIn!");
}
var signin= function(feed) {
	var res= JSON.parse(feed.responseText);
	if (res.email) {
		signInUI(res);
	} else {
		if (feed.cntnt.gid) {
			let passTry= "<br/>Try signing with password;<br/>"+
				 "if u don't have one, get it by resetting password";
			if (res.error) {
				if (res.error== 3)
					ferrylog("Couldn't reach google! try again..."+passTry);
				else
					ferrylog("Google authentication failed!" + passTry);
			} else {
				ferrylog("U'nt signed up yet! Sign up...");
				SignIn.checked=false;
				SignUp.checked=true;
				togglesignup();
				GglSnB.classList.add("hidden");
				Username.focus();
			}
		} else {
			ferrylog("No No...! Check username and password :)");
			RecoverL.classList.remove("hidden");
		}
	}
	delete Password.shuttle;
}
var deleteThings= function () {
	Things.innerHTML="";
	delete UserThings;
	UserThings= {};
}

var hideThings= function () {
	for (var thing of Things.children) {
		thing.classList.add("hidden");
	}
}

var openfileprompt= function () {
	this.nextElementSibling.click();
}
var hideThingDetails= function (event) {
	if (event.target==this) {
		showThingDetails(false);
	}
}
var showThingDetails= function (show) {
	if (show!==true && lstThn.classList.contains("active")) {
		let eImg= getElementInsideContainer(lstThn, "eImg");
		if (event.target!=eImg) {
			if (eImg.value=="><")
				incImg.call(eImg, 1);
			lstThn.classList.remove("active");
			Chin.classList.remove("big");
		}
		return;
	}
	if (show===false) {
		lstThn.classList.remove("active");
		Chin.classList.remove("big");
		let eImg= getElementInsideContainer(lstThn, "eImg");
		if (eImg.value=="><")
			incImg.call(eImg, 1);
		return;
	}
	lstThn.classList.remove("active");
	lstThn= this.parentElement;
	lstThn.classList.add("active");
	if (document.body.classList.contains("signed") &&
		 !lstThn.classList.contains("mine")) {
		popQueryBtn.call(lstThn);
	}
	Chin.classList.add("big");
	// let shUrB= getElementInsideContainer(lstThn,"showURLBtn");
	// showURL.call(shUrB);
	showURL.call(this, event)
	let scrl= {behavior: "smooth", top: lstThn.offsetTop-70};
	scrollTo(scrl);
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

var replyQuery= function () {
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
var popQueryBtn= function () {
	MsgBtn.onclick=null;
	var p= QSendDiv.parentElement;
	if (p) {
		QSendDiv.remove();
	}
	var md= getElementInsideContainer(this, "msgdiv");
	md.insertAdjacentElement("beforeEnd", QSendDiv);
	MsgBtn.onclick=sendMsg;
}
var popReplyBtn= function () {
	this.onclick=null;
	ReplyBox.value="";
	var p= ReplyDiv.parentElement;
	if (p) {
		p.onclick=popReplyBtn;
		ReplyDiv.remove();
	}
	this.insertAdjacentElement("beforeEnd", ReplyDiv);
	ReplyBtn.onclick=replyQuery;
}
var markAsRead= function () {
	this.classList.remove("new");
	this.classList.add("inQ");
	this.imd.classList.remove("new");
	this.imd.classList.add("inQ");
	if (this.id!="reply") {
		this.onclick=popReplyBtn;
	}
	Inbox.rmds.push(this.imd);
}
var showThing= function () {
	Mbox.classList.add("hidden");
	var thing;
	if (this.md) {
		thing= this.md.parentElement.parentElement.parentElement.parentElement;
	} else {
		thing= this.rmd.parentElement.parentElement.parentElement.parentElement.
			parentElement;
	}
	if (thing.parentElement.id==="MThings" &&
		 !Things.classList.contains("mThns")) {
		ferrylog("Switching to Mailbox view, for proximity view press Logo");
		Things.classList.remove("uThns");
		Things.classList.add("mThns");
	} else if (thing.parentElement.id==="UThings" &&
				  !Things.classList.contains("uThns")) {
		ferrylog("Switching to Ur things, for proximity view press Logo");
		Things.classList.remove("mThns");
		Things.classList.add("uThns");
	} else if (Things.classList.contains("uThns") ||
				  Things.classList.contains("mThns")) {
		Things.classList.remove("mThns");
		Things.classList.add("uThns");
	}
	showThingDetails.call(getElementInsideContainer(thing, "ThingName"), true);
	md= this.md?this.md:this.rmd;
	md.classList.add("highlight");
	setTimeout(function(){md.classList.remove("highlight")}, 3000);
	if (this.classList.contains("new")) {
		markAsRead.call(md);
		if (this.md) {
			popReplyBtn.call(md)
		}
	}
	thing.scrollIntoView({behavior: "smooth", block: "start"});
}
const resizeObserver= new ResizeObserver(entries=> {
	for (let entry of entries) {
		// Access the new size of the element using entry.contentRect
		//console.log('Element size changed:', entry.contentRect.width, entry.contentRect.height);
		var thing= entry.target.parentElement.parentElement;
		thing.style.width=entry.target.offsetWidth+"px";
	}
});
var thingDist= function (thingN) {
	if (thingN.loc) {
		var xd= window.bidLoc[0]-thingN.loc[0];
		var yd= window.bidLoc[1]-thingN.loc[1];
		return Math.pow(Math.pow(xd,2)+Math.pow(yd,2),0.5);
	}
	return 1000000.000;
}
var insertThingByDist= function (thingN) {
	thingN.d= thingDist(thingN);
	
	if (!lThings.children.length) {
		Things.appendChild(thingN);
		return;
	}
	
	let start= 0;
	let end= Things.children.length - 1;
	let insertIndex= Things.children.length; // Default to append at end
	
	while (start <= end) {
		let mid= Math.floor((start + end) / 2);
		let midThing= Things.children[mid];
		
		if (midThing.d > thingN.d) {
			insertIndex= mid;
			end= mid - 1;
		} else {
			start= mid + 1;
		}
	}
	
	if (insertIndex >= Things.children.length) {
		Things.appendChild(thingN);
	} else {
		Things.insertBefore(thingN, Things.children[insertIndex]);
	}
}
var updateThings= function (res) {
	if (res.name) {
		userData= res;
	}
	Things.onclick= hideThingDetails;
	let thingCount= 0;
	let lThings, resthings, tClass;
	if (res.things) {
		resthings= res.things;
		lThings= SThings;
		tClass= "proximity";
	} else if (res.mthings) {
		resthings= res.mthings;
		lThings= MThings;
		tClass= "mThn";
	} else if (res.uthings) {
		resthings= res.uthings;
		lThings= UThings;
		tClass= "mine";
	}
	thingCount= resthings.length;
	for (var i= res.addNewThing? thingCount-1 : 0; i<thingCount; ++i) {
		var thing= resthings[i];
		var newThing= true;
		if (!thing.user && !userData["name"])
			return;
		var un;
		if (!thing.user) {
			un= userData["name"].toLowerCase();
		} else {
			un= thing.user;
		}
		if (!UserThings[un]) {
			UserThings[un]= {};
		}
		if (UserThings[un][thing.id]) {
			newThing= false;
		} else if (UserThings[un][-1]) {
			UserThings[un][thing.id]= UserThings[un][-1];
			UserThings[un][-1]= undefined;
			newThing= false;
		}
		var thisThingUser= User.innerHTML.toLowerCase()==thing.user;
		var thingN=
			 newThing? Thing.cloneNode(true) : UserThings[un][thing.id];
		thingN.classList.remove("hidden");
		thingN.classList.add(tClass);
		if (Object.keys(thing).length==2) {
			if (i+1==thingCount && !res.addNewThing) {
				i= -1;
				if (lThings===SThings) {
					resthings= res.mthings;
					lThings= MThings;
					tClass= "mThn";
				} else if (lThings===MThings) {
					resthings= res.uthings;
					lThings= UThings;
					tClass= "mine";
				} else {
					break;
				}
				thingCount= resthings.length;
			}
			continue;
		}
		thingN.thingId=thing.id;
		if (thing.id==-1) {
			thingN.classList.add("mine");
		}
		var imgsHldr= thingN.children[0];
		var imgs= imgsHldr.children[0];
		imgs.cid= 0;
		resizeObserver.observe(imgs);
		var msgDiv= getElementInsideContainer(thingN, "msgdiv");
		var msgd= getElementInsideContainer(msgDiv, "msgs");
		var UserThingEditBtn=
			 getElementInsideContainer(thingN, "ThingEditBtn");
		var pics= resthings[i].pics;
		if (pics && pics.length>1) {
			thingN.classList.add("mltImg");
		}
		if (newThing) {
			imgsHldr.onclick=showThingDetails;
			var imgHldr= imgs.children[0];
			var img= imgHldr.children[0];
			if (pics && pics.length) {
				img.src="/upload/"+resthings[i].user+"/"+
					resthings[i].id+"."+0+".jpg?t="+pics[0].ts;
				for (var j=1; j<pics.length; ++j) {
					imgHldr= imgs.children[0].cloneNode(true);
					imgHldr.classList.add("hidden");
					img= imgHldr.children[0];
					img.src= "/upload/"+resthings[i].user+"/"+
						resthings[i].id+"."+j+".jpg?"+pics[j].ts;
					imgs.children[j-1].insertAdjacentElement(
						'afterEnd', imgHldr);
				}
			} else {
				var SVG= SVGS.children[0].cloneNode(true);
				imgHldr.replaceChild(SVG, img);
				imgHldr.classList.add("dummy");
			}
			UserThingEditBtn.onclick= editThing;
			var tid= getElementInsideContainer(thingN, "ThingId");
			tid.innerText= thing.id;
			var tusr= getElementInsideContainer(thingN, "ThingUsr");
			tusr.innerText= un;
		}
		if (window.tgtUsr) {
			if (tgtUsr!=un)
				thingN.classList.add("hidden");
		}
		if (thing.name && thing.name.length) {
			let name= getElementInsideContainer(thingN, "ThingName");
			name.innerText= thing.name;
			name.onclick= showThingDetails;
			name.classList.remove("hidden");
		}
		var locPin= getElementInsideContainer(thingN, "ThingLocationPin");
		if (thing.location && thing.location.length) {
			var location=getElementInsideContainer(thingN, "ThingLocation");
			thingN.loc=thing.location;
			var locStr=thing.location.length?thing.location.join(","):
				 thing.location;
			location.innerText=locStr;
			if (locStr.length) {
				locPin.title= locStr;
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
		var dtls= getElementInsideContainer(thingN, "ThingDetails");
		var dtlsDiv;
		if (thing.details) {
			dtls.innerHTML=thing.details;
		}
		var dtlsDiv;
		if (thing.details) {
			dtls.innerHTML=thing.details;
		}
		let lm= getElementInsideContainer(thingN, "lastModed");
		if (thing.lastModed) {
			const time= new Date(thing.lastModed*1000);
			lm.innerHTML= time.toLocaleString(undefined, {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			});
		} else {
			lm.innerHTML= "-";
		}
		var rmsgs= thing.rmsgs;
		var itms;
		if (!Inbox.things[thing.id]) {
			itms= Inbox.things[thing.id]=new Set();
		} else {
			itms= Inbox.things[thing.id];
		}
		if (rmsgs && newThing) {
			for (var l= 0,m= 0; l<rmsgs.length; ++l,++m) {
				var rmsg= rmsgs[l];
				var md;
				if (l<msgd.children.length) {
					md= msgd.children[m];
					var ld= md.children[0];
					var id= parseInt(ld.innerHTML);
					if (id<rmsg["id"]) {
						--l;
					} else {
						md.children[0].innerHTML=rmsg["id"];
						md.children[1].innerHTML=rmsg["user"]+": ";
						md.children[2].innerHTML=rmsg["msg"];
					}
				} else {
					md= msgd.children[0].cloneNode(true);
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
					var imd= md.cloneNode(true);
					Inbox.insertAdjacentElement(
						"beforeEnd", imd);
					if (rmsg["new"]) {
						imd.classList.add("new");
						md.onclick=markAsRead;
						md.classList.add("new");
						++Inbox.news;
					}
					imd.md= md;
					md.imd= imd;
					imd.onclick= showThing;
					itms.add(rmsg["id"]);  
				}
				if (rmsg["rep"]) {
					var reply= ReplyDiv.firstElementChild.cloneNode(true);
					reply.lastElementChild.innerHTML= rmsg["rep"];
					md.insertAdjacentElement("beforeEnd", reply);
					reply.classList.remove("inQ");
					reply.classList.remove("hidden");
				} else {
					if (!md.onclick && thisThingUser) {
						md.onclick= popReplyBtn;
					}
				}
			}
		}
		UserThings[un][thing.id]= thingN;
		thingN.user= un;
		if (newThing) {
			if (thing.id!="-1") {
				lThings.appendChild(thingN);
			} else {
				lThings.insertAdjacentElement('afterBegin', thingN);
			}
		}
		if (i+1==thingCount && !res.addNewThing) {
			i= -1;
			if (lThings===SThings) {
				resthings= res.mthings;
				lThings= MThings;
				tClass= "mThn";
			} else if (lThings===MThings) {
				resthings= res.uthings;
				lThings= UThings;
				tClass= "mine";
			} else {
				break;
			}
			if (!resthings)
				break;
			thingCount= resthings.length;
		}
	}
	Things.classList.remove("hidden");
	if (res.addNewThing) {
		res.addNewThing= undefined;
		return;
	}
	if (res.smsgs) {
		for (var j= 0; j<res.smsgs.length; ++j) {
			var smsg= res.smsgs[j];
			var to= smsg[0];
			var isR= 0;
			if (!to.length) {
				to= User.innerHTML;
				isR=1;
			}
			let toUser= UserThings[to];
			if (!toUser)
				continue;
			var thn= toUser[smsg[1]];
			if (!thn)
				continue;
			var msgDiv= getElementInsideContainer(thn, "msgdiv");
			var msgd= getElementInsideContainer(msgDiv, "msgs");
			for (var i= 0; i<msgd.children.length; ++i) {
				var md= msgd.children[i];
				var mid= parseInt(md.children[0].innerHTML);
				if (mid!=smsg[2]) {
					continue;
				}
				if (isR) {
					md= md.lastElementChild;
				}
				var smd= md.cloneNode(true);
				if (!isR) {
					var toelm= smd.removeChild(smd.children[1]);
					toelm.innerHTML=" :"+to;
					smd.insertAdjacentElement("beforeEnd",toelm);
					md.imd= smd;
					smd.md= md;
				} else {
					md.imd= smd;
					smd.rmd= md;
				}
				Outbox.insertAdjacentElement("beforeEnd",smd);
				smd.onclick=showThing;
				if (!isR && md.children.length==4) {
					var reply= smd.removeChild(smd.children[2]);
					reply.rmd= md.lastElementChild;
					md.lastElementChild.imd= reply;
					for (var m= 0; m<res.reps.length; m+=2) {
						var k= res.reps[m];
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
	if (window.tgtUsr && urlQuery.get("thing")) {
		let thn= Things.children[0];
		let inf= getElementInsideContainer(thn,"thingInfo");
		let usr= getElementInsideContainer(thn,"ThingUsr");
		let usrnm= thn.user;
		usr.innerHTML="<a href=\""+window.location.origin+"/"+usrnm+
			"\">"+usrnm+"</a>";
		inf.classList.remove("hidden");
		let imgsHldr= getElementInsideContainer(thn,"ImgsHldr");
		imgsHldr.onclick= null;
		Things.onclick= null;
		showThingDetails.call(imgsHldr,true);
		let thnBtm= getElementInsideContainer(thn,"thnBtm");
		let thnDtls= getElementInsideContainer(thn,"ThingDetails");
		thnBtm.style.position= "relative";
		thnDtls.classList.remove("hidden");
		loadBottom.classList.add("hidden");
	}

}

var unlock= function(){
	if (location.protocol!="https:") {
		ferrylog("U r not using HTTPS; can't unlock!");
		return;
	}
	LockBlock.classList.add("hidden");
	Credentials.classList.remove("hidden");
	SignUp.checked=false;
	Username.focus();
	BackToLock.classList.remove("hidden");
};

var showLock= function () {
	BackToLock.classList.add("hidden");
	Credentials.classList.add("hidden");
	LockBlock.classList.remove("hidden");
}

var onKeyDown= function () {
	
}

var usrnmEvent= function () {
	if (event.keyCode==13 && this.value !== this.plcHldr) { //13==enter
		Password.focus();
	}
}

var authenticateUser= function (ggl) {
	if ((event.keyCode==13 && this.value !== this.plcHldr) ||
		 this=== SubmitBtn || ggl!==event) { //13==enter
		hideKeyboard();
		let url= window.location.search;
		url+=url.length?"&":"?";
		url+="req=signIn";
		var f={};
		var pstr= Location.value;
		ferrylog("Location: " + pstr);
		let username;
		let md5Pass= core.MD5(Password.value);
		let cntnt={};
		if (ggl!==event) {
			cntnt.gid= Username.token;
		} else {
			cntnt.username= Username.value;
			cntnt.password= md5Pass;
		}
		//cntnt.gp=pstr.split(",");
		f.cntnt= cntnt;
		f.content=JSON.stringify(cntnt);
		f.postExpdtn=signin;
		f.reqHeaders=jsonCType;
		Password.shuttle= new core.shuttle(url,f.content,f.postExpdtn,f);
	}
}

var updateSearchedThings= function (feed) {
	var res= JSON.parse(feed.responseText);
	if (res.things)
		ferrylog(
			res.things.length+" thing"+(res.things.length==1?"":"s")+" found");
	res.search= true;
	if (cnt.locked)
		cnt.locked= undefined;
	if (window.tgtUsr && res.tname) {
		TgtUsrLgHldr.innerHTML= res.tname;
		TgtUsrLgHldr.onclick= function () {
			window.location.href= '/'+tgtUsr;
		}
		TgtUsrLgHldr.classList.remove("hidden");
	}
	//deleteThings();
	if (Log.classList.contains('if')) {
		LogoDiv.classList.remove("if");
		Log.classList.remove("if");
		LogoTd.insertAdjacentElement("afterBegin", LogoDiv);
		LocationDDiv.classList.remove("if");
		LocationDDiv.remove();
		document.body.insertAdjacentElement("afterBegin", LocationDDiv);
		LogoDiv.parentElement.style.display="table-cell";
		MastHead.classList.remove("if");
		Logo.classList.add("small");
		LogoDiv.onclick= function () {
			if (Things.classList.contains("mThns")||
				 Things.classList.contains("uThns")) {
				history.pushState({}, '', '');
				Things.classList.remove("uThns");
				Things.classList.remove("mThns");
			} else {
				location.href= window.location.origin;
			}
		}
		LocationPin.classList.remove("hidden");
		LocTHide= function () {
			LocTxt.classList.add("hidden");
		};
		LocTTimeout= setTimeout(LocTHide,7000);
		LocationDiv.onmouseenter= LocDShow;
		LocationDiv.onmouseleave= LocDHide;
		addEvent(OwlOnPerch, 'mouseenter', function () {
			LocTxt.classList.add("hidden");
		});
		if (res.name && res.email) {
			Username.value=res.name;
			Email.value=res.email;
			signInUI(res);
		}
		if (Logo.onclick== gotoHome && window.tgtUsr) {
			ferrylog("click logo to go home", 50000);
		}
		Location.classList.add("hidden");
		Location.onblur= function () {
			Location.classList.add("hidden");
			LocTxt.classList.remove("hidden");
		}
		LocTxt.innerHTML=Location.value;
		LocTxt.classList.remove("hidden");
		LocationPin.onclick= showBoxUpdtLoc;
		LocationDDiv.classList.remove("hidden");
	} else if (!res.email) {
		hideThings();
		Things.classList.add("search");
	}
	if (res.things)
		searchCount+= res.things.length;
	if (!res.email) {
		updateThings(res);
	}
	if (res.things.length< 20) {
		LoadBottom.innerHTML= "no more!";
		LoadBottom.onclick= null;
	}
	document.body.scrollIntoView({behavior: "smooth", block: "start"});
	delete SearchTool.shuttle;
}
var search= function () {
	window.searchCount= 0;
	if (Mouth.value==Mouth.plcHldr) {
		showAllThings();
		event.preventDefault();
		return;
	}
	var pstr= Location.value;
	let url= window.location.search;
	url+= url.length?"&":"?";
	url+= "req=search";
	window.bidLoc= pstr.split(',');
	var f= {};
	url+= "&gp="+encodeURIComponent(pstr);
	url+= "&search="+encodeURIComponent(mouth.value);
	f.content= JSON.stringify(cnt);
	f.postExpdtn= updateSearchedThings;
	f.reqHeaders= jsonCType;
	SearchTool.shuttle= new core.shuttle(url, f.content, f.postExpdtn,f);
	if (event)
		event.preventDefault();
}
var lock= function () {
	let url= window.location.search;
	url+=url.length?"&":"?";
	url+="req=signOut";
	var f={};
	let cnt={};
	f.content=JSON.stringify(cnt);
	f.postExpdtn=signOut;
	f.reqHeaders=jsonCType;
	Unlock.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
}
var signOutUi= function () {
	clearInterval(owlMail);
	if (UserThings[User.innerHTML.toLowerCase()] && UserThings[User.innerHTML.toLowerCase()][-1]) {
		UserThings[User.innerHTML.toLowerCase()][-1].remove();
		delete UserThings[User.innerHTML.toLowerCase()][-1];
	}
	Username.value="";
	Password.value="";
	User.innerHTML="";
	Inbox.innerHTML="";
	Outbox.innerHTML="";
	Mbox.classList.add("hidden");
	document.body.classList.remove("signed");
	var mine= document.getElementsByClassName("mine");
	while (mine.length) {
		mine[0].classList.remove("mine");
	}
	Things.classList.remove("uThns");
	UThings.innerHTML= "";
	TgtUsrDscEdtBtn.classList.add("hidden");
	if (TgtUsrDsc.innerHTML===dscUrSlf)
		TgtUsrDsc.classList.add("hidden");
	PasswordL.classList.add("hidden");
	gglSnD.classList.remove("hidden");
	gglSn.checked=false;
	hideUserSignIn.call(gglSn);
	BackToLock.classList.remove("hidden");
	ferrylog("Bye!");
}

var signOut= function (feed) {
	var res= JSON.parse(feed.responseText);
	if (res.signOut===true) {
		owlMail= clearInterval(owlMail);
		signOutUi();
	} else {
		setCookie("bid","",0);
		ferrylog("Huh! Something went wrong! Try again:) or close window.");
	}
	delete Unlock.shuttle;
}

var signOk= function (res) {
	if (res.signOut==true) {
		signOutUi();
		ferrylog("Ur account is signed in from another device. Signing out!");
		return false;
	}
	return true;
}

var togglesignup= function () {
	if (SignUp.checked || Recover.checked) {
		Username.onkeydown=null;
		Username.oninput=null;
		google.accounts.id.renderButton(
			GglSnB, { theme: "outline", size: "medium", text: "signup_with" });
		if (GglSn.checked) {
			EmailL.classList.add("hidden");
		} else
			EmailL.classList.remove("hidden");
		if (!Email.value.length) {
			gglSnD.classList.remove("hidden");
		}
		if (Recover.checked) {
			gglSnD.classList.add("hidden");
		}
		Username.onkeydown=null;
		InUp.innerHTML="up";
		let url= window.location.search;
		url+=url.length?"&":"?";
		url+="req=captcha";
		var f={};
		let cnt={};
		f.content=JSON.stringify(cnt);
		f.postExpdtn=onCaptcha;
		f.reqHeaders=jsonCType;
		shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
		Signupdiv.classList.remove("hidden");
		PasswordL.classList.add("hidden");
		SubmitBtn.classList.remove("hidden");
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
		Username.onkeydown=userKeyDown;
		Username.oninput=userKeyDown;
		if (!Gmail.classList.contains("hidden")) {
			Gmail.classList.add("hidden");
			gglSnB.classList.remove("hidden");
		}
		if (GglSn.checked) {
			SubmitBtn.classList.add("hidden");
			PasswordL.classList.add("hidden");
			UsernameL.classList.add("hidden");
			Username.value="";
		} else {
			SubmitBtn.classList.remove("hidden");
			if (Username.value.length)
				PasswordL.classList.remove("hidden");
			UsernameL.classList.remove("hidden");
			Password.focus();
		}
		if (Username.value.length==0) {
			gglSnD.classList.remove("hidden");
		} else {
			gglSnD.classList.add("hidden");
		}
		Username.onkeydown=userKeyDown;
		InUp.innerHTML="in";
		Signupdiv.classList.add("hidden");
		removeEvent(SubmitBtn, "click", signup);
		addEvent(SubmitBtn, "click", authenticateUser);
		google.accounts.id.renderButton(
			GglSnB, { theme: "outline", size: "medium", text: "signin_with" });
	}
}

var signup= function (resPld) {
	if (event.keyCode==13 && this.value !== this.plcHldr ||
		 this=== SubmitBtn || resPld!==event) { //13==enter
		hideKeyboard();
		let url= window.location.search;
		url+=url.length?"&":"?";
		url+="req=signUp";
		var f={};
		Username.value=Username.value.trim();
		if (resPld!==event) {
			if (!Username.value) {
				Username.focus();
				return;
			}
		}
		let token= Username.token;
		if (SignUp.checked && !validUsername(Username.value)) {
			return;
		} else if (!token) {
			if (Passwords1.value!=Passwords2.value) {
				ferrylog("passwords didn't match");
				return;
			} else if (!validPassword(Passwords2.value)) {
				ferrylog(
					"Password not made of [a-zA-Z0-9.@#$%] or its length >24");
				return;
			} else if (!validEmail(Email.value)) {
				return;
			} else if (!Consent.checked) {
				ferrylog("U didn't consent to this tool usage :/");
				return;
			}
		}
		let cntnt= {};
		if (!token) {
			cntnt.email= Email.value;
			cntnt.captcha= Captcha.value;
			cntnt.password= core.MD5(Passwords2.value);
		} else {
			cntnt.gid=token;
		}
		if (!Recover.checked) {
			cntnt.username= Username.value;
		}
		cntnt.consent=Consent.checked;
		f.cntnt=cntnt
		f.content=JSON.stringify(cntnt);
		f.postExpdtn=actMail;
		f.reqHeaders=jsonCType;
		SubmitBtn.disabled=true;
		Passwords2.shuttle=new core.shuttle(url,f.content,f.postExpdtn,f);
	}
}

var actMail= function (feed) {
	var res= JSON.parse(feed.responseText);
	ferrylog(res.msg);
	if (res.actEmailSent== 2) {
		SignIn.checked=true;
		togglesignup();
		if (feed.cntnt.gid) {
			signin(feed);
		}
	} else {
		togglesignup();
	}
	SubmitBtn.disabled=false;
	delete Passwords2.shuttle;
}
var getCookie= function (cname) {
	let name= cname + "=";
	let decodedCookie= decodeURIComponent(document.cookie);
	let ca= decodedCookie.split(';');
	for(let i= 0; i <ca.length; i++) {
		let c= ca[i];
		while (c.charAt(0)== ' ') {
			c= c.substring(1);
		}
		if (c.indexOf(name)== 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
var setCookie= function(cname, cvalue, exdays) {
	const d= new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires= "expires="+ d.toUTCString();
	document.cookie= cname + "=" + cvalue + ";" + expires +
		";path=/;SameSite=Strict";
};
var makeid= function (length) {
	var result	  = '';
	var characters=
		 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength= characters.length;
	for ( var i= 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

var addThing= function () {
	MastHead.scrollIntoView({behavior: "smooth", block: "start"});
	if (!userData["things"]) {
		userData["things"]=[];
	} else if (userData["things"][userData["things"].length-1].id==-1) {
		UserActions.classList.add("hidden");
		UserThings[User.innerHTML.toLowerCase()][-1].classList.remove("hidden");
		return;
	}
	userData["things"][userData["things"].length]= {
		"id":-1,
		"location":"",
		"pics":[]
	};
	userData["things"]["user"]= User.innerHTML.toLowerCase();
	userData["addNewThing"]= 1;
	updateThings(userData);
	let thing= Things.children[0];
	editThing.call(getElementInsideContainer(
		thing, "ThingEditBtn"));
}
var addRemovables= function (thing) {
	for (let i=0; i<ThingRemovables.length; ++i) {
		let r= ThingRemovables[i];
		let p= getElementInsideContainer(thing, r.pid);
		p.insertAdjacentElement('afterEnd', r);
	}
}
var removeRemovables= function (thing) {
	for (let i=0; i<ThingRemovables.length; ++i) {
		ThingRemovables[i].remove();
	}
}
var removeDummyImgs= function (thing) {
	var imgs=getElementInsideContainer(thing, "Imgs");
	var dummies=imgs.getElementsByClassName("dummy");
	if (imgs.children.length>1 && dummies.length) {
		dummies[0].remove();
	}
}
var addDummyImgs= function (thing) {
	var imgs=getElementInsideContainer(thing, "Imgs");
	var i=imgs.children.length;
	if (i<MaxImgsPerThing && !imgs.children[0].classList.contains("dummy")) {
		var imgHldr= imgs.children[0].cloneNode(true);
		var img= imgHldr.children[0];
		var thisSVG= SVGS.children[i].cloneNode(true);
		imgHldr.replaceChild(thisSVG,img);
		imgHldr.classList.add("dummy");
		imgHldr.classList.add("hidden")
		imgs.children[i-1].insertAdjacentElement('afterEnd', imgHldr);
	}
}
var showURL= function () {
	var thing= this.parentElement;
	let ln= window.origin+"/"+thing.user.toLowerCase()+"?thing="+thing.thingId;
	let url= "<a href=\""+ln+"\" onclick=\"return false;\"\">"+ln+"</a>";
	if (ThnUrlLog) {
		updateFL(ThnUrlLog, url);
	} else {
		ThnUrlLog= ferrylog(url);
	}
	ThnUrlLog.firstElementChild.onclick= function () {
		event.preventDefault();
		event.cancelBubble= true;
		event.stopPropagation();
		window.location.href= ln+"&gp="+Location.value;
		return false;
	}
}
var lastCnclEdtBtn;
var editThing= function (newThing) {
	if (lastCnclEdtBtn) {
		updateThing.call(lastCnclEdtBtn);
	}
	UserActions.classList.add("hidden");
	this.classList.remove("thngEdBtn");
	var thisUserThing= this.parentElement;
	thisUserThing.classList.add("editMode");
	var ThingLocation= getElementInsideContainer(
		thisUserThing, "ThingLocation");
	var ThingDetails= getElementInsideContainer(
		thisUserThing, "ThingDetails");
	//ThingDetails.classList.add("hidden");
	//ThingName.classList.add("hidden");
	addRemovables(thisUserThing);
	//ThingNameB.classList.remove("hidden");
	//ThingNameL.classList.remove("hidden");
	//CnclEdtBtn.classList.remove("hidden");
	var ThingName= getElementInsideContainer(thisUserThing, "ThingName");
	var ThingLocPin= getElementInsideContainer(
		thisUserThing, "ThingLocationPin");
	var imgs= getElementInsideContainer(thisUserThing, "Imgs");
	var ImgsHldr=imgs.parentElement;
	ImgsHldr.onclick=null;
	ThingLocationBox.value=ThingLocation.innerText;
	if (ThingLocationBox.value == "") {
		ThingLocationBox.value= Location.value;
	}
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
	Header.classList.add("hidden");
}

var updateThing= function() {
	Header.classList.remove("hidden");
	lastCnclEdtBtn=null;
	UserActions.classList.remove("hidden");
	var cncl= this.value=="Cancel";
	var edtBtn= this;
	if (cncl) {
		edtBtn= this.nextElementSibling;
	}
	let url= window.location.search;
	url+= url.length?"&":"?";
	url+= "req=updateThing";
	var f= {};
	var content= {};
	content.things= [];
	var UserThing= this.parentElement;
	var imgs= getElementInsideContainer(UserThing, "Imgs");
	var ThingLocPin= getElementInsideContainer(UserThing, "ThingLocationPin");
	var ImgsHldr= imgs.parentElement;
	ImgsHldr.onclick= showThingDetails;
	if (!(cncl && UserThing.thingId==-1)) {
		removeDummyImgs(UserThing);
		if (imgs.cid>=imgs.children.length) {
			imgs.cid= 0;
			imgs.children[0].classList.remove("hidden");
		}
		removeRemovables(UserThing);
		UserThing.classList.remove("editMode");
		ThingLocPin.classList.remove('empty');
	} else {
		UserThing.classList.add("hidden");
		return;
	}
	edtBtn.onclick= editThing;
	edtBtn.value= "Edit";
	if (cncl) {
		return false;
	}
	if (!validThingName(ThingNameBox.value)) {
		return false;
	}
	var thing= {}; thing.id=UserThing.thingId;
	thing.name= ThingNameBox.value;
	var location= ThingLocationBox.value.split(',');
	thing.location= [parseFloat(location[0]), parseFloat(location[1])];
	var ThingDetailsTA= ThingDetailsDiv.children[1];
	if (!validThingDetails(ThingDetailsTA.value)) {
		ferrylog("Invalid thing details.");
	}
	thing.details= ThingDetailsTA.value;
	content.things.push(thing);
	f.user= content;
	f.content= JSON.stringify(content);
	f.reqHeaders= jsonCType;
	f.postExpdtn= function (feed) {
		var res= JSON.parse(feed.responseText);
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
	f.shuttle= new core.shuttle(url,f.content,f.postExpdtn,f);
}

// Send a large blob of data chunk by chunk
var sendFileData= function(data, chunkSize, l) {
	var totalKB=Math.ceil(data.length/1000);
	var opts= {method: 'POST'};
	let curl= window.location.search;
	curl += curl.length?"&":"?";
	curl += 'req=upload&chunkSize=' + chunkSize;
	curl += '&totalSize=' + data.length;
	curl += "&picId=" + l.picId + '&thingId=';
	let fl= ferrylog("Uploading");
	var sendChunk= function(offset) {
		var chunk= data.subarray(offset, offset + chunkSize) || '';
		let url= curl + l.thingId+'&offset=' + offset;
		var ok;
		var sentKB=Math.ceil((offset+chunk.length)/1000);
		var percent=Math.floor(sentKB*100/totalKB);
		updateFL(fl,'Uploading '+sentKB+'/'+totalKB+'KB'+'|'+percent+'%');
		opts.body=chunk;
		fetch(url, opts)
			.then(function(res) {
				ok= res.ok;
				return res.text();
			})
			.then(function(text) {
				if (!ok) {
					try {
						var res=JSON.parse(text);
						if (!signOk(res)) {
							return;
						}
						ferrylog('Error: ' + text);
						l.teb.disabled=false;
					} catch (e) {
						ferrylog(e+"|"+text);
					}
				} else if(offset+chunk.length >= data.length){
					ferrylog('Uploaded!');
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

function getElementInsideContainer (container, childID) {
	var elms= container.children;
	for (var i= 0; i < elms.length; i++) {
		var elm=elms[i];
		if (elm.id=== childID) {
			return elm;
		}
		var child= getElementInsideContainer(elm, childID);
		if (child) {
			return child;
		}
	}
	return false;
}

function validUsername (name) {
	for (var i=0; i<name.length;++i) {
		if (!((name.charAt(i)>='a' && name.charAt(i)<='z') ||
				(name.charAt(i)>='A' && name.charAt(i)<='Z') ||
				(name.charAt(i)>='0' && name.charAt(i)<='9'))) {
			ferrylog(
				"Invalid Username, should be small/capital letters or numbers");
			return false;
		}
	}
	if (!(name.length && name.length <= MAX_UN_LENGTH)) {
		ferrylog("Username length should be >0 && <="+MAX_UN_LENGTH);
		return false;
	}
	if (name=="upload" || name=="tmp" || name=="files") {
		ferrylog("this username is not allowed");
		return false;
	} else if (name=="index.html"||name=="robots.txt"||name=="sitemap.xml") {
		ferrylog("this username is not allowed")
	} else if (name=="img" || name=="js" || name=="css" || name=="fnt") {
		ferrylog("this username is not allowed");
	} else if (name=="config.txo") {
		ferrylog("this username is not allowed");
	}
	return true;
}

function validFileName (name) {
	let ext=name.split('.').pop();
	if (ext!="jpg" && ext!="jpeg") {
		ferrylog("Invalid file name, should be .jpg or .jpeg");
		return false;
	}
	if (!(name.length && name.length <= 32)) {
		ferrylog("File name length should be >0 && <=32");
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

var validThingName= function (name) {
	var numstart= false;
	for (var i=0; i<name.length; ++i) {
		if (name.charAt(i)==' ') {
			if (i+1<name.length) {
				if (name.charAt(i+1)==' ') {
					ferrylog("ThingNameDoubleSpace at "+i);
					return false;
				}
			}
		} else if (!((name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90) ||
						 (name.charCodeAt(i)>=97 && name.charCodeAt(i)<=122) ||
						 (name.charAt(i)==' ') || (name.charAt(i)=='.') ||
						 (name.charAt(i)>='0' && name.charAt(i)<='9'))) {
			ferrylog("InvalidThingName, only letters n numbers r allowed");
			return false;
		}
	}
	if (!(name.length && name.length <= 64)) {
		ferrylog("InvalidThingNameLength, should be >0 && <=64!");
		return false;
	}
	return true;
}

var validThingDetails= function (name) {
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
var onThnDtlsTaFocus= function (event) {
	Header.classList.add("hidden");
}
var onThnDtlsTaBlur= function (event) {
	Header.classList.remove("hidden");
}
var onMsgInptFocus= function (event) {
	if (hasSoftKbd)
		Header.classList.add("hidden");
}
var onMsgInptBlur= function (event) {
	if (hasSoftKbd)
		Header.classList.remove("hidden");
}

async function subscribe () {
	if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
		ferrylog('Push messaging is not supported');
		return;
	}

	try {
		const registration= await navigator.serviceWorker.register(
			'serviceWorker.js', { scope: '/' });
		ferrylog('Service Worker registered');

		if (!registration.active) {
			registration.active= registration;
		}
		ferrylog('Service Worker ready');

		const response= await fetch('/?req=vapidpublickey');
		const vapidPublicKey= await response.text();
		const rawKey= urlBase64ToUint8Array(vapidPublicKey);
		// DER-encoded EC public key: raw P-256 key is last 65 bytes
		const rawP256= rawKey.slice(rawKey.length - 65);

		const prevSubscription= await registration.pushManager
			.getSubscription();
		const srvSub= User.obj? User.obj.wpSub : null;
		if (prevSubscription && srvSub &&
				prevSubscription.endpoint=== srvSub.endpoint) {
			ferrylog('Push already subscribed');
			return;
		}
		if (prevSubscription) {
			ferrylog('Push subscription stale, replacing');
			await prevSubscription.unsubscribe();
		}
		const subscription= await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: rawP256
		});
		ferrylog('Push subscription successful:'+JSON.stringify(subscription));

		await fetch('/?req=notify', {
			method: 'POST',
			body: JSON.stringify(subscription),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		ferrylog('Subscription sent to server');
	} catch (error) {
		ferrylog('Failed to subscribe to push notifications: ' + error);
	}
}
