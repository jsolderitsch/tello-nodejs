# tello-nodejs
Interacting with the DJI/Ryze Tello using only node.js.

The code in this repo is based on the Tello.js source file distributed along with the Tello SDK.
The keyboard processing logic was adapted from sample code available at:
http://thisdavej.com/making-interactive-node-js-console-apps-that-listen-for-keypress-events/

Use at your own risk, especially in low ambiant light conditions.

Developed and tested using v8.11.1 of node.js

You may need to import the got package with npm

Usage: node TelloConsole.js

You should first connect the computer where you are running node.js to the Tello wireless network for your Tello.

List of available keyboard commands is printed.

The first command to execute is c for command mode.

The land command will be executed when the space bar is pressed.

To quit the program, enter ctrl-c

See the Tello SDK documentation for explanation of the commands.

The commands that need a numeric parameter have a fixed value that is used when the command is sent to the Tello. This behavior may be improved in future versions of the TelloConsole.js file. Only the Flip forward version of the Flip command is currently supported.

This is just a getting started version of the program.

Extensions and improvements encouraged.

A new full command line script is also available. Any SDK command can be entered just like for the Tello3.py file distributed by DJI/Ryze for the Tello SDK.

Usage: node TelloCommandLine.js

As an added bonus, the readline feature used here has command history so that the up and down arrow keys can be used to find and then re-execute commands in the current session.

A nice next step would be to add game controller support. node.js seems to support PS3 and PS4 controller types.
