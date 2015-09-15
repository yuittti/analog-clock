/**
 * Created by Yuiti (Sergey Kozachenko) on 27.08.2015.
 */
//
// Display current time on analog watch clock-face and in digital view
//
//The hands of watch are moving by css keyframe animation starting from 12 till 12 o'clock position.
//After page is opened we need to get current time and change watch hands' positions on a clock-face to set current time.
//Then later watch hands' will be moving by css rules
//=======================================================================================================================

//Displays current time in digital view
displayTime();

//Receive current time once to set watch hands position for analog view
var currentTime = new Date();
var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();
var currentSeconds = currentTime.getSeconds();

//convert hours to conventional units for calculating watch hand's position later
currentHours = convertHours(currentHours, currentMinutes);
//call animation change function once to initialise start positions of watch hands
//after this it will be changing by css animation rules
changeAnimation("hours-run", timeToDegree(currentHours));
changeAnimation("minutes-run", timeToDegree(currentMinutes));
changeAnimation("seconds-run", timeToDegree(currentSeconds));


//Displays current time in digital view
//Updates every second by getting current time
//--------------------------------------------
function displayTime (){
    var cTime = new Date();
    var cHour = cTime.getHours();
    var cMin = cTime.getMinutes();
    var cSec = cTime.getSeconds();

    var strTime = "";

    //convert time to string with zero before digits if less than 10
    strTime += (cHour < 10) ? '0' + cHour : cHour;
    strTime += (cMin < 10) ? ':0' + cMin : ':' + cMin;
    strTime += (cSec < 10) ? ':0' + cSec : ':' + cSec;

    //display time in html
    document.getElementById("current-time").innerHTML = strTime;
    //renew time every second
    Timer = setTimeout("displayTime()", 1000);
}

//Adding new animation rule with specific ruleName and set for it rotateDegree
//----------------------------------------------------------------------------
function changeAnimation (ruleName, rotateDegree){
    // remove old animation for our element
    //document.getElementById("seconds").style.webkitAnimationName = "none";

    //change keyframes animation
    setTimeout(function(){
        changeKeyframesRule(ruleName, rotateDegree);
    }, 0);
}

//Remove old rules and add new ones for specific Keyframes (passed in ruleName)
//and set for the rule new rotateDegree
//----------------------------------------------------------------------------
function changeKeyframesRule (ruleName, rotateDegree){

    //find Keyframe rule
    var keyframes = findKeyframesRule(ruleName);

    //remove existing 0% and 100% rules
    keyframes.deleteRule("0%");
    keyframes.deleteRule("100%");

    //create new 0% and 100% rules with new numbers
    //0% - new start position, 100% - new end position
    keyframes.appendRule("0%{ -webkit-transform: rotate("+(rotateDegree)+"deg); }");
    keyframes.appendRule("100%{ -webkit-transform: rotate("+(rotateDegree + 360)+"deg); }");

    //assign animation to our element
    //document.getElementById("seconds").style.webkitAnimationName = ruleName;
}

//Find specific Keyframes rule (with name passed in ruleName)
//----------------------------------------------------------
function findKeyframesRule (ruleName){
    //put all style stylesheets into array
    var allStyleSheets = document.styleSheets;
    //loop through all style sheets
    for (var i=0; i<allStyleSheets.length; i++){
        //loop through all rules in each style sheet
        for (var j=0; j<allStyleSheets[i].cssRules.length; j++){
            //find the rule passed in ruleName and return it
            if (allStyleSheets[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && allStyleSheets[i].cssRules[j].name == ruleName){
                return allStyleSheets[i].cssRules[j];
            }
        }
    }
    //rule not found
    return null;
}


//Convert time item (seconds or minutes or hours) from numbers to degree on a circle clock face
//Starting position on clock face is 12 o'clock - it's (-90)degree
//To make watch hands move clockwise, function calculates and returns start position in degrees
//---------------------------------------------
function timeToDegree (timeUnit){
    // one second it's 6 degree on a circle clock-face (360 degree / 60 seconds)
    var degree = timeUnit * 6;

    if (timeUnit >= 0 && timeUnit < 15){
        degree = degree - 90;
    } else {
        degree = (degree - 90) - 360;
    }
    return degree;
}

//Converts hours to 12-hour mode
//And converts hours in conventional units,
// to prepare for calculating hours' watch hand position in degrees
//--------------------------------------------
function convertHours (hours, minutes){
    hours = (hours > 12) ? hours - 12 : hours;
    if (hours === 12) hours = 0;
    //position of hours' watch hand on clock face
    //consists of minutes quantity in current hours + percentage of passed minutes
    return hours*5 + ~~(minutes/12);
}







