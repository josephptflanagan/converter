const binaryToDecimalButton = document.getElementById('bToDButton');
const decimalToBinaryButton = document.getElementById('dToBButton');

const hexButton = document.getElementById('hexButton');
const RGBButton = document.getElementById('RGBButton');
const HSLButton = document.getElementById('HSLButton');
const HSVButton = document.getElementById('HSVButton');

let binaryToDecimalInput = document.getElementById('bToDInput');
let decimalToBinaryInput = document.getElementById('dToBInput');

let binaryToDecimalAnswer = document.getElementById('bToDAnswer');
let decimalToBinaryAnswer = document.getElementById('dToBAnswer');

let hexInput = document.getElementById('hexInput')
let RInput = document.getElementById('RInput');
let GInput = document.getElementById('GInput');
let BInput = document.getElementById('BInput');
let HSLHInput = document.getElementById('HSLHInput');
let HSLSInput = document.getElementById('HSLSInput');
let HSLLInput = document.getElementById('HSLLInput');
let HSVHInput = document.getElementById('HSVHInput');
let HSVSInput = document.getElementById('HSVSInput');
let HSVVInput = document.getElementById('HSVVInput');

let hexToRGBAnswer = document.getElementById('hexToRGBAnswer');
let hexToHSLAnswer = document.getElementById('hexToHSLAnswer');
let hexToHSVAnswer = document.getElementById('hexToHSVAnswer');
let RGBToHSLAnswer = document.getElementById('RGBToHSLAnswer');
let RGBToHexAnswer = document.getElementById('RGBToHexAnswer');
let RGBToHSVAnswer = document.getElementById('RGBToHSVAnswer');
let HSLToHexAnswer = document.getElementById('HSLToHexAnswer');
let HSLToRGBAnswer = document.getElementById('HSLToRGBAnswer');
let HSLToHSVAnswer = document.getElementById('HSLToHSVAnswer');


//BINARY TO DECIMAL START
function binaryToDecimal(event) {

    //prevents the page from refreshing when clicking the submit button
    event.preventDefault();

    //grabs the user input value
    let binaryNum = binaryToDecimalInput.value;

    let decimalNum = 0;

    //regex to check and ensure the number is a binary number
    let binaryRegex = /^[0-1]+$/;

    //checks that there is user input before proceeding
    if (binaryNum) {

        //checks that this input is a binary number
        if (binaryNum.match(binaryRegex)) {

            //reverses the binary number to make it easier to use
            binaryNum = binaryNum.split("").reverse().join("");

            for (let i = 0; i < binaryNum.length; i++) {

                //populates the decimal number by adding each binary digit's value to it
                decimalNum += binaryNum[i] * Math.pow(2, i);

            }

            //populates the answer on the page
            binaryToDecimalAnswer.innerHTML = "Your Binary Number as a Decimal Number: " + decimalNum;
        }
        //if the input is not a binary number
        else {
            binaryToDecimalAnswer.innerHTML = "Input must be a binary number (1s and 0s)";
        }

    }

};
//BINARY TO DECIMAL END

//DECIMAL TO BINARY START
function decimalToBinary(event) {

    //prevents the page from refreshing when clicking the submit button
    event.preventDefault();

    //This algorithm works by checking increasingly large exponents of 2 against the number. 
    //When the exponent of 2 exceeds the user number, the previous exponent of 2 is subtracted from the decimal number.
    //The algorithm whittles down the decimal number to 0. At 0 the binary number is ready and the while loop ends

    //grabs the user input value
    let decimalNum = decimalToBinaryInput.value;

    //empty array that will store the digits of the binary number
    let binaryNum = [];

    //number that will determine how many digits there are in the binaryNum
    let position = 0;

    //currentNum is the current exponent of 2 being checked against the user number
    let currentNum = 0;

    //bool that details if this is the first exponent of 2 being subtracted from the user number or not
    let first = true;

    //regex to check and ensure the number is a decimal number
    let decimalRegex = /^[0-9]+$/;

    //for use in testing results
    let checker = decimalNum;

    //checks that there is user input before proceeding
    if (decimalNum) {

        //checks that this input is a decimal number
        if (decimalNum.match(decimalRegex)) {

            //immediately ejects 0
            if (decimalNum == 0) {
                binaryNum.push(decimalNum);
            }
            else {

                //Main Loop
                while (decimalNum > 0) {

                    //As the loop starts the previous exponent of 2 is set to the current exponent of 2
                    let lastNum = currentNum;
                    //The current exponent of 2 is updated to the next highest
                    currentNum = Math.pow(2, position);

                    //if the user number is greater than the current exponent of 2, position increases
                    if (decimalNum > currentNum) {
                        position += 1;
                    }
                    else {

                        //if this is the first time the binaryNum array is being interacted with
                        if (binaryNum.length == 0) {

                            //this for loop fills every spot with 0's except the last, which gets a 1
                            for (let i = 0; i < position + 1; i++) {

                                if (i == position) {
                                    binaryNum[binaryNum.length - 1] = "1";
                                }
                                else {
                                    binaryNum.push("0");
                                }
                            }

                        }
                        //as the decimal number decreases, the position will decrease, and lower positions in the array will be replaced with 1's as is warranted. 
                        else {
                            if (decimalNum == currentNum) {
                                binaryNum[position] = "1"
                            }
                            else {
                                binaryNum[position - 1] = "1"
                            }
                        }

                        //if the decimal number and exponent of 2 are equal, the exponent of 2 is subtracted from the decimalnumber to make 0
                        if (decimalNum == currentNum) {
                            decimalNum = 0;
                        }
                        //otherwise the last exponent of 2 is subtracted from 2
                        else {
                            decimalNum -= lastNum;
                        }

                        //a catch for exponents of 2 that cause a mistake in the algorithm otherwise. I will endeavor to figure out why, but without this 2,4,8,16, etc... come out one digit short
                        if (first && decimalNum == 0) {
                            binaryNum[binaryNum.length - 1] = "0";
                            binaryNum.push("1");
                        }

                        //sets first to false, resets counting and comparing variables
                        first = false;
                        position = 0;
                        currentNum = 0;

                    }

                }
            }

            //reverses the binaryNum array and turns it into a string
            let binaryNumStr = binaryNum.reverse().join("");

            //updates the answer on the page
            decimalToBinaryAnswer.innerHTML = "Your Decimal Number as a Binary Number: " + binaryNumStr;

            //Testing my algorithm against the built in convertor
            console.log(Number(checker).toString(2));
            console.log(binaryNumStr);
            console.log('--------------------');

        }
        //catch for if user input is not a decimal number
        else {
            decimalToBinaryAnswer.innerHTML = "Input must be a decimal number";
        }
    }

};
//DECIMAL TO BINARY END

const hexToDecimalDictionary = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15 };
const decimalToHexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]

//HEX TO RGB START
function hexToRGBConversion(hexValue) {

    if (hexValue.length == 3) {
        let tempHex = "";
        tempHex = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
        hexValue = tempHex;
    }

    let subA = hexValue.slice(0, 2);
    let subB = hexValue.slice(2, 4);
    let subC = hexValue.slice(4);
    let subSections = [subA, subB, subC];

    for (let i = 0; i < subSections.length; i++) {
        subSections[i] = (16 * hexToDecimalDictionary[subSections[i][0]]) + hexToDecimalDictionary[subSections[i][1]];
    }

    return subSections;

}
//HEX TO RGB END

//RGB TO HEX START
function RGBToHexConversion(RGB) {

    let hexValue = "";

    for (let i = 0; i < RGB.length; i++) {
        hexValue += decimalToHexArray[(RGB[i] - (RGB[i] % 16)) / 16]
        hexValue += decimalToHexArray[(RGB[i] % 16)]
    }

    return hexValue;

}
//RGB TO HEX END

//HSL TO RGB START
function HSLToRGBConversion(HSL) {

    let hue = Number(HSL[0]);
    let saturation = Number(HSL[1]);
    let lightness = Number(HSL[2]);

    if (hue == 360) {
        hue = 0;
    }

    let RGB = [0, 0, 0];

    let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    let x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
    let lightnessMatch = lightness - chroma / 2

    switch (true) {
        case /* hue >= 0 && */ hue < 60:
            RGB = [chroma, x, 0];
            break;
        case /* hue >= 60 && */ hue < 120:
            RGB = [x, chroma, 0];
            break;
        case /* hue >= 120 && */ hue < 180:
            RGB = [0, chroma, x];
            break;
        case /* hue >= 180 && */ hue < 240:
            RGB = [0, x, chroma];
            break;
        case /* hue >= 240 && */ hue < 300:
            RGB = [x, 0, chroma];
            break;
        case /* hue >= 300 && */ hue < 360:
            RGB = [chroma, 0, x];
            break;
        default:
            console.log("something went wrong at the hsl to rgb hue switch");
    }

    for (let i = 0; i < RGB.length; i++) {
        RGB[i] = Math.round((RGB[i] + lightnessMatch) * 255);
    }

    return RGB;

}
//HSL TO RGB END

//RGB TO HSL START
function RGBToHSLConversion(RGB) {

    let red = RGB[0] / 255;
    let green = RGB[1] / 255;
    let blue = RGB[2] / 255;

    RGB = [red, green, blue];

    let max = 0;
    let min = 1;

    let hue = 0;
    let saturation = 0;
    let lightness = 0;

    for (let i = 0; i < RGB.length; i++) {

        if (max < RGB[i]) {
            max = RGB[i];
        }

        if (min > RGB[i]) {
            min = RGB[i];
        }

    }

    let chroma = max - min;

    //Hue
    switch (true) {
        case chroma == 0:
            hue = 0;
            break;
        case max == red:
            hue = (((green - blue) / chroma) % 6) * 60;
            break;
        case max == green:
            hue = (((blue - red) / chroma) + 2) * 60;
            break;
        case max == blue:
            hue = (((red - green) / chroma) + 4) * 60;
            break;
        default:
            console.log("something went wrong at RGB to HSL hue switch");
    }

    //Lightness
    lightness = (max + min) / 2;

    //Saturation
    if (lightness == 0 || lightness == 1) {
        saturation = 0;
    } else {
        saturation = chroma / (1 - Math.abs(2 * lightness - 1))
    }

    let HSL = [hue, saturation, lightness]

    for (let i = 0; i < HSL.length; i++) {

        if (i > 0) {
            HSL[i] = HSL[i] * 100;
        }
        HSL[i] = Math.round(HSL[i])
    }

    return HSL

}
//RGB TO HSL END


//HSV TO HSL START
function HSVToHSLConversion(HSV){

    let hue = HSV[0];
    let saturation = HSV[1];
    let value = HSV[2];

    let HSLhue = hue;
    let HSLsaturation = 0;
    let lightness = 0;

}
//HSV TO HSL END

//HSL TO HSV START
function HSLToHSVConversion(HSL){

    let hue = HSL[0];
    let saturation = HSL[1];
    let lightness = HSL[2];

    let HSVhue = hue;
    let HSVsaturation = 0;
    let value = 0;

    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    //I WAS HERE
    value = lightness + saturat

}
//HSL TO HSV END

//HEX INPUT START
function hexController(event) {

    //prevents the page from refreshing when clicking the submit button
    event.preventDefault();

    //grabs the user input value
    let hexValue = hexInput.value;
    let RGB = ["", "", ""];
    let HSL = ["", "", ""];
    let HSV = ["", "", ""];

    //regex to check and ensure the value is a hex value
    let hexRegex = /^([a-f0-9]{6}|[a-f0-9]{3})$/;

    if (hexValue) {

        if (hexValue.match(hexRegex)) {

            RGB = hexToRGBConversion(hexValue);
            HSL = RGBToHSLConversion(RGB);

            hexToRGBAnswer.innerHTML = "Your hex value as a RGB code - R:" + RGB[0] + " G:" + RGB[1] + " B:" + RGB[2];
            hexToHSLAnswer.innerHTML = "Your hex value as a HSL code - H:" + HSL[0] + " S:" + HSL[1] + "% L:" + HSL[2] + "%";

        }
        else {
            hexToRGBAnswer.innerHTML = "Input must be a hex value (3 or 6 hexadecimal values)";
            hexToHSLAnswer.innerHTML = "Input must be a hex value (3 or 6 hexadecimal values)";
        }

    }
}
//HEX INPUT END

//RGB INPUT START
function RGBController(event) {

    //prevents the page from refreshing when clicking the submit button
    event.preventDefault();

    //grabs the user input value
    let rValue = RInput.value;
    let gValue = GInput.value;
    let bValue = BInput.value;

    let RGB = [rValue, gValue, bValue];

    let HSL = ["", "", ""];
    let HSV = ["", "", ""];
    let hexValue = "";

    if (rValue && gValue && bValue) {

        //check against decimal input
        for(let i = 0; i < RGB.length; i++){
            RGB[i] = Math.round(RGB[i]);
        }

        if ((RGB[0] >= 0 && RGB[0] <= 255) && (RGB[1] >= 0 && RGB[1] <= 255) && (RGB[2] >= 0 && RGB[2] <= 255)){

            HSL = RGBToHSLConversion(RGB);
            hexValue = RGBToHexConversion(RGB);

            RGBToHexAnswer.innerHTML = "Your RGB code as a Hex value: " + hexValue;
            RGBToHSLAnswer.innerHTML = "Your RGB code as a HSL code - H:" + HSL[0] + " S:" + HSL[1] + "% L:" + HSL[2] + "%";

        }
        else {
            RGBToHSLAnswer.innerHTML = "All inputs must be an RGB value (0-255)";
            RGBToHexAnswer.innerHTML = "All inputs must be an RGB value (0-255)";
        }

    }

}
//RGB INPUT END

//HSL INPUT START
function HSLController(event) {

    //prevents the page from refreshing when clicking the submit button
    event.preventDefault();

    //grabs the user input value
    let hValue = HSLHInput.value;
    let sValue = HSLSInput.value;
    let lValue = HSLLInput.value;

    let HSL = [hValue, sValue, lValue];
    let RGB = ["", "", ""];
    let hexValue = "";

    if (hValue && sValue && lValue) {

        for (let i = 1; i < HSL.length; i++) {

            if(HSL[i] > 1 && HSL[i] <=100){
                HSL[i] = HSL[i] / 100;
            }

        }

        if ((HSL[0] >= 0 && HSL[0] <= 360) && (HSL[1] >= 0 && HSL[1] <= 1) && (HSL[2] >= 0 && HSL[2] <= 1)) {

            RGB = HSLToRGBConversion(HSL);
            hexValue = RGBToHexConversion(RGB);

            HSLToRGBAnswer.innerHTML = "Your HSL code as a RGB code - R:" + RGB[0] + " G:" + RGB[1] + " B:" + RGB[2];
            HSLToHexAnswer.innerHTML = "Your HSL code as a Hex value: " + hexValue;

        }

    }

}
//HSL INPUT END

//HSV INPUT START
function HSVController(event) {

    //prevents the page from refreshing when clicking the submit button
    event.preventDefault();

    //grabs the user input value
    let hValue = HSVHInput.value;
    let sValue = HSVSInput.value;
    let vValue = HSVVInput.value;

    let HSV = [hValue, sValue, vValue];
    let HSL = ["", "", ""];
    let RGB = ["", "", ""];
    let hexValue = "";

    if (hValue && sValue && vValue) {

        for (let i = 1; i < HSV.length; i++) {

            if(HSV[i] > 1 && HSV[i] <=100){
                HSV[i] = HSV[i] / 100;
            }

        }

        if ((HSV[0] >= 0 && HSV[0] <= 360) && (HSV[1] >= 0 && HSV[1] <= 1) && (HSV[2] >= 0 && HSV[2] <= 1)) {

            HSL = HSVToHSLConversion(HSV);
            RGB = HSLToRGBConversion(HSL);
            hexValue = RGBToHexConversion(RGB);

            HSVToRGBAnswer.innerHTML = "Your HSV code as a RGB code - R:" + RGB[0] + " G:" + RGB[1] + " B:" + RGB[2];
            HSVToHexAnswer.innerHTML = "Your HSV code as a Hex value: " + hexValue;
            HSVToHSLAnswer.innerHTML = "Your HSV code as a HSL code - H:" + HSL[0] + " S:" + HSL[1] + " L:" + HSL[2];

        }

    }

}
//HSV INPUT END

binaryToDecimalButton.addEventListener("click", binaryToDecimal);
decimalToBinaryButton.addEventListener("click", decimalToBinary);
hexButton.addEventListener("click", hexController);
RGBButton.addEventListener("click", RGBController);
HSLButton.addEventListener("click", HSLController);
HSVButton.addEventListener("click", HSVController);