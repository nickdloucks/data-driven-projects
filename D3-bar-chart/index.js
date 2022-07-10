// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
import * as d3 from "https://cdn.skypack.dev/d3@7.6.1";

// let dataset = fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
//   .then(response => response.json())
//   .then(data => JSON.parse(data));

d3.select('main')
  .append('svg')
  .attr('text','hello world')

// Global scope vars for saving data pulled from the API
let dataStr = '';
let dataObj = {};
let list = [];

// Send a GET Http request to the API, then save the pertinent data
let dataset = new XMLHttpRequest();
dataset.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
dataset.send();
dataset.onload = function(){
  dataObj = JSON.parse(dataset.responseText);
  list = dataObj.data;
  dataStr = JSON.stringify(dataObj.data);

  const w = 500;
  const h = 500;
  const padding = 60;
  
  let max = d3.max(list, (d) => d[1]); // save min and max of dataset for scaling the visualization 
  let min = d3.min(list, (d) => d[1]);

  const xScale = d3.scaleLinear()
      .domain([0, max])
      .range([padding, w - padding])
  
  const yScale = d3.scaleLinear()
    .domain([0, max])
    .range([h - padding, padding])
  
  document.getElementById('log').innerText = min + " through " + max;
  
  // d3 operations need to happen after async API request has loaded:
  const scale = d3.scaleLinear();
  scale.domain([min, max]);
  scale.range([10, 500]);
  
  d3.select('#chart')
  .attr('width', 700)
  .selectAll('rect') 
  .data(list)
  .enter()
  .append('rect')
  .attr('width', '10px')
  .attr('height', '20px')
  .attr('x', (d, i) => i * 25)
  .style('background-color', 'red')
  .text((item)=> item[1])
  
} // data pulls thru from API

  

