/*
  A special type of modification for text:
    We can change the text that appears in HTML using the .text() function
*/

// duration is how long the transition should run
// delay is the time after the transition should start
d3.select("h1")
  .transition()
  .delay(2000) // we can't use duration here, otherwise the change would be done when you launch the program
  .text("you are changed!!")
