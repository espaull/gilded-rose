# Just a couple of things...

I've written pretty much the same thing in the guilded_rose2.js file as a comment, but basically I wrote two solutions because I had some time and thought why not...

The first solution I broke everything down into it's own function and tried to do away with as many hard coded values as possible to improve readability etc.

The second solution I just smashed everything into one function. It works just as well, and is even slightly more efficient because it's just one loop, as opposed to looping through both the items array **and** the item types in the first solution, but it's not quite as readable and is more difficult to unit test.
