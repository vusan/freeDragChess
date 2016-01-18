javascript:(function(){
	var startX=100;
	var startY=100;
	
function gen(img,index) {
var newImg=document.createElement('img');
if(img=="chess") {
	newImg.src="http://localhost/chess/svg/"+img+".png";
	newImg.style.opacity="0.3";
	newImg.style.top=startY+"px";
	newImg.style.left=startX+"px";
}else {
	newImg.src="http://localhost/chess/svg/"+img+".svg";
	var y = calculateY(img);;
	var x = calculateX(img,index);
	
	var yy = startY+11+y;
	var xx = startX+11+x;
	newImg.style.top=yy+"px";
	newImg.style.left=xx+"px";
}


if(img!="chess") {newImg.setAttribute("class","dragme");}
newImg.style.position="absolute";
newImg.style.zIndex=999;

document.body.appendChild(newImg);
}
function calculateY(img) {
		if(img.indexOf('peon')>-1) {
				if(img.indexOf('_b')>-1) {
						return 64;					
					}	else {
						return 64*6;						
						}		
			} else {
					if(img.indexOf('_b')>-1) {
						return 0;					
					}	else {
						return 64*7;						
						}				
				}	
	}
function calculateX(img,index) {
	if(img.indexOf("rook")>-1) {
			if(index==2) {
					return 64*7;				
				} else {
					return 	0;				
					}
		} else if(img.indexOf("knight")>-1) {
			if(index==2) {
					return 64*6;				
				} else {
					return 	64;				
					}
		} else if(img.indexOf("bishop")>-1) {
			if(index==2) {
					return 64*5;				
				} else {
					return 	64*2;				
					}
		} else if(img.indexOf("king")>-1) {
			
					return 	64*4;				
					
		} else if(img.indexOf("queen")>-1) {
					return 	64*3;	
		} else if(img.indexOf("peon")>-1) {
				return 64*(index-1);			
			}
}
gen('chess');
generate("bishop");
generate("knight");
generate("king");
generate("queen");
generate("rook");
generate("peon");

function generate(piece) {
//gen(piece+"_b_u");
if(piece!="peon") {
	gen(piece+"_w_u",1);
	gen(piece+"_b_u",1);
	if(piece=="bishop" || piece=="rook" || piece=="knight") {
		gen(piece+"_w_u",2);
		gen(piece+"_b_u",2);	
	}
} else {
	for(var i=1;i<=8;i++) {
			gen(piece+"_w_u",i);
			gen(piece+"_b_u",i);	
		}
	
	}

//gen(piece+"_w_i");
}
var ie=document.all;
var nn6=document.getElementById&&!document.all;

var isdrag=false;
var x,y;
var dobj;

function movemouse(e)
{
  if (isdrag)
  {
    dobj.style.left = nn6 ? tx + e.clientX - x+"px" : tx + event.clientX - x+"px";
    dobj.style.top  = nn6 ? ty + e.clientY - y+"px" : ty + event.clientY - y+"px";
    return false;
  }
}

function selectmouse(e) 
{
  var fobj       = nn6 ? e.target : event.srcElement;
  var topelement = nn6 ? "HTML" : "BODY";

  while (fobj.tagName != topelement && fobj.className != "dragme")
  {
    fobj = nn6 ? fobj.parentNode : fobj.parentElement;
  }

  if (fobj.className=="dragme")
  {
    isdrag = true;
    dobj = fobj;
    tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    x = nn6 ? e.clientX : event.clientX;
    y = nn6 ? e.clientY : event.clientY;
    document.onmousemove=movemouse;
    return false;
  }
}

document.onmousedown=selectmouse;
    document.onmouseup=function(){isdrag=false};
}
)();
