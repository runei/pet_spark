function csvToArray(str, delimiter = ",") {

    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        return values;
    });

    // return the array
    return arr;
}

const TIME = 0;
// const OPEN = 1;
// const HIGH = 2;
// const LOW = 3;
const CLOSE = 1;
const VOLUME = 2;
const POC_1 = 3;
const POC_2 = 4;
const POC_3 = 5;
const POC_4 = 6;
const POC_5 = 7;
const CHANGE = 8;
const OBV = 9;
const FIB_382 = 10;
const FIB_5 = 11;
const FIB_618 = 12;
const FIB_786 = 13;

var config = $.ajax({
    type: "GET",
    url: "../config.txt",
    async: false
});

var path = "";
// console.log(config.responseText.trim().localeCompare("BTCUSDT.csv"));
if (config.responseText.trim().localeCompare("BTCUSDT.csv") == 0) {
    path = "../output/part-00000-31490ed3-6fa5-4385-b929-a164606dcfad-c000.csv"
} else if (config.responseText.trim().localeCompare("BTCUSDT_huge.csv") == 0) {
    path = "../output_huge/part-00000-21a8edbf-da18-4dd0-be53-d8b87269f107-c000.csv"
} else {
    path = "../output_small/part-00000-afced7c2-0763-44b5-bba7-e048487cda6a-c000.csv"
}

// $.get("../jquery-csv/examples/data/sine.csv", function (csv) {
var csv = $.ajax({
    type: "GET",
    url: path,
    async: false
});

// var result = $.get("../output/part-00000-cff3b1a3-64d9-4e98-b3d9-5f8a6806356c-c000.csv", function (csv) {
//     // console.log(csv);
//     var data = csvToArray(csv);
//     output = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
//     return output;
// }, async = false);

var data = csvToArray(csv.responseText);
output = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
var _labels = output[TIME];
var _close = output[CLOSE];
var _volume = output[VOLUME];
var _poc_1 = output[POC_1];
var _poc_2 = output[POC_2];
var _poc_3 = output[POC_3];
var _poc_4 = output[POC_4];
var _poc_5 = output[POC_5];
var _change = output[CHANGE];
var _obv = output[OBV];
var _fib_382 = output[FIB_382];
var _fib_5 = output[FIB_5];
var _fib_618 = output[FIB_618];
var _fib_786 = output[FIB_786];
// console.log(output);
