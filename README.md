# tello-nodejs
Interacting with the DJI/Ryze Tello using only node.js
The code in this repo is based on the Tello.js source file distributed along with the Tello SDK.
The keyboard processing logic was adapted from sample code available at:
http://thisdavej.com/making-interactive-node-js-console-apps-that-listen-for-keypress-events/

Use at your own risk, especially in low ambiant light conditions.

Developed and tested using v8.11.1 of node.js

You may need to import the got package with npm

Usage: node TelloConsole.js

List of available keyboard commands is printed.

The first command to execute is c for command mode.

See the Tello SDK documentation for explanation of the commands.

The commands that need a numeric parameter have a fixed value the is used when the command is sent to the Tello. This behavior may be improved in future versions of the file.
