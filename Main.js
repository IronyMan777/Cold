/* COLD */
// (Working title)
// A simple project by Irony Man

background(0,0,0);

//Globals

var keys = [];

//Constants
var mainfont = createFont("Times New Roman");
var mssgfont = createFont("monospace");
var txtcolor = color(90,90,90);
var scene = 0;
var Width = 800;
var Height = 600
var Framerate = 30;
var W = 87;
var A = 65;
var S = 83;
var D = 68;

var menuAlpha = 0;
var houseSize = 1;
var mssgs = [];
int coldtimer;
var temp = 40;
string tempstatus;
string status;
string message;
var hunger = 0;
var health = 100;
var time = 0;
var f = false;
var f2 = 200;
var r;
var m;
var waiting = false;
var waitcheck = 0;
var location = "House - Ground floor";
var day = 0;
var hours = 0;
var minutes = 0;
var bodytemp = 98;
var objects = [];
var inventory = [];
var storage = 2;
var searched = false;

//Functions
void playmssgs() {
	fill(txtcolor);
	textFont(mssgfont, 17);
	textAlign(CENTER,CENTER);
	for (var ms = mssgs.length; ms > -1; ms --) {
		text(mssgs[ms],width/2,(-ms*20)+20*mssgs.length+70);
	}
};
void covermssgs() {
	for (var c = 0; c < height; c ++) {
		strokeWeight(1);
		stroke(0,0,0,c/1.7);
		line(0,c,width,c);
	}
};

void keyPressed() {
	keys[keyCode] = true;
};
void keyReleased() {
	keys[keyCode] = false;
};

void mousePressed() {
	if (scene===0) {scene = 1;}
	m = true;
};


void mouseReleased() {m = false;
};
void moose() {
	fill(110,110,110);
	noStroke();
	triangle(mouseX,mouseY,mouseX+10,mouseY+15,mouseX,mouseY+18);	
};
void eyes(x,y,fade) {
	fill(255,255,255,fade);
	noStroke();
	ellipse(x-10,y,10,10);
	ellipse(x+10,y,10,10);
};
void mainroom() {
	if (searched === false) {
		objects = ["crowbar","lighter"];
	}
	location = "House - Ground floor";
};
void outfront() {
	if (searched === false) {
		objects = [sticks,jacket];
	}
}
void button(x,y,w,h,t,s,object,value,btnlength) {
	noFill();
	stroke(txtcolor);
	strokeWeight(4);
	rectMode(CENTER);
	rect(x,y,w,h,6);
	textAlign(CENTER,CENTER);
	if (waiting === false) {
		fill(20,110,20);
	} else {
		fill(110,20,20);
	}
	textFont(mainfont,s);
	text(t,x,y);
	if (mouseX>x-(w/2)&&mouseX<x+(w/2) && mouseY>y-(h/2)&&mouseY<y+(h/2)) {
		stroke(0,0,0);
		strokeWeight(5);
		noFill();
		rect(x,y,w,h,6);
		if (m === true) {
			if (waiting === false) {
				f = true;
				f2 = 200;
				time += value;
				if (location === "House - Ground floor") {
					temp -= 1;
				}
				if (object === "time") {
					mssgs.push("You wait.");
					if (temp < 40) {
						mssgs.push("It is "+tempstatus);
					} else if (temp > 70) {
						mssgs.push("It is "+tempstatus);
					}
					if (temp < 20) {
						mssgs.push("Your hands are starting to tingle from the cold.");
						health -= 1;
					}
					if (temp < 0) {
						health -= 5;
						mssgs.push("You should try to warm up.");
						mssgs.push("Your limbs have gone numb.");
						if (health < 0) {
							health = 0;
							scene = 2;
						}
					}
				}
				if (object === "itemcheck") {
					mssgs.push("You search the room.");
					for (var o = 0; o < objects.length; o ++) {
						if (inventory.length < storage) {
							inventory.push(objects[o]);
							mssgs.push("You pick up the "+objects[o]+".");
						} else {
							mssgs.push("There is an object here,");
							mssgs.push("but you have no more space.");
						}
					}
					objects = [];
					if (searched === true) {
						mssgs.push("You found nothing.")
					}
					searched = true;
				}
				waiting = true;
			}
			
		}
	}
	if (waiting === true) {
		waitcheck += 1;
		if (waitcheck > btnlength) {
			waiting = false;
			waitcheck = 0;
		}
	}
};
void temptostring(temp) {
	if (temp < 0) {
		tempstatus = "freezing!";
	} else if (temp > 0 && temp < 20) {
		tempstatus = "extremely cold!";
	} else if (temp > 20 && temp < 35) {
		tempstatus = "very cold.";
	} else if (temp > 35 && temp < 50) {
		tempstatus = "cold.";
	} else if (temp > 50 && temp < 60) {
		tempstatus = "comfortable.";
	} else if (temp > 60 && temp < 70) {
		tempstatus = "warm.";
	} else if (temp > 70 && temp < 80) {
		tempstatus = "hot.";
	} else if (temp > 80 && temp < 90) {
		tempstatus = "very hot!";
	} else if (temp > 90) {
		tempstatus = "burning hot!";
	}
};
void times() {
	minutes = time-(hours*60);
	hours = floor(time/60);
	day = floor(hours*24);
};
void inventorydisplay() {
	for (var o2 = 0; o2 < inventory.length; o2 ++) {
		textAlign(LEFT,TOP);
		fill(txtcolor);
		textFont(mainfont,15);
		text(inventory[o2],width-100,(o2*20)+height/2)
	}
}


// Setup!
void setup() {
	size(Width, Height);

	frameRate(Framerate);
};
void fade() {
	if (f === true) {
	fill(r,0,0,f2);
	rect(-1,-1,width*2+1,height*2+1);
	f2 -= 3;
		if (f2 < 0) {
			f = false;
			f2 = 200;
		}
		if (health < 20) {
			r = 200;
		}
	}
	r -= 3;
};

// Scenes
void scene0() {
	background(0,0,0);
	fill(40,40,90,menuAlpha);
	textFont(mainfont,60);
	textAlign(CENTER,CENTER);
	text("They are waiting...",width/2,height/2);	
	eyes(width/2,2*height/3,menuAlpha/3);
	cursor("NONE");
	moose();
	menuAlpha += 4;
};
void scene1() {
	fill(0,0,0,100);
	rect(-1,-1,width+2,height+2);
	playmssgs();
	covermssgs();

	// Buttons!
	button(100,100,100,30,"Wait",15,"time",5,20);
	button(100,145,100,30,"Search the area",12,"itemcheck",20,200);

	textAlign(CENTER,CENTER);
	fill(txtcolor);
	textSize(30);
	text(location,width/2,40);
	
	inventorydisplay();

	cursor("NONE");
	moose();
	fade();
	temptostring(temp);
	times();
	mainroom();
};
void scene2() {
	background(0,0,0,60);
	textFont(mainfont,60);
	fill(txtcolor);
	textAlign(CENTER,CENTER);
	text("You are dead.",width/2,height/2);
};

void draw()
{

noStroke();
if (scene === 0) {	
	scene0();
}
if (scene === 1) {
	scene1();
}
if (scene === 2) {
	scene2();
}
};
