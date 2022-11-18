/**
 * Run your own server:
 *  - Open terminal, go to the directory where the HTML file is located
 *  - python3 -m http.server
 *  - go to "http://localhost:8000" 
 */


// JS is designed with reactive programming concepts. The code doesn't necessarily run sequentially. So we need to explicitly tell it to run visualize after all the data has been read in by .then() function
d3.csv("gapminder.csv")
  .then(data => console.log(data));
