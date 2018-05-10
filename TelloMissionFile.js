/*
    Based On
    
	Rzye Tello
	
	Scratch Ext 1.0.0.0

	http://www.ryzerobotics.com

	1/1/2018
*/

const readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout),
  prefix = 'Tello Mission> ';


//const readline = require('readline');
const trimNewlines = require('trim-newlines');
const fs = require('fs')
const commandErr = new Error('Tello Command Error');

const PORT = 8889;
const HOST = '192.168.10.1';

var dgram = require('dgram');
//const client = dgram.createSocket('udp4');

//client.bind(8001);

function telloMessage (message) {
    return new Promise(resolve => {
    let rx;
    var client = dgram.createSocket({type: 'udp4', reuseAddr: true}).bind(8001);
    
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
	  if (err) throw err;  
	});
	
    client.on('error', function(e) {
      throw e;
    });

	client.on('message', (msg,info) => {
		rx = trimNewlines (msg.toString());
		console.log('Data received from server: ' + rx);
		resolve(rx);
		client.close()
	});	
	});							
}

async function doTelloCommand (commandStr) {

  try {
     var result = await telloMessage(commandStr);
     console.log('Resolved to ' + result + ' for command ' + commandStr);
     if (result === 'error') { throw commandErr; }
     return result;
  } catch (err) {
      throw err;
  }

}

function wait (timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

async function doTelloCommandWithRetry (command) {
  const MAX_RETRIES = 3;
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      if (i === 0) {
        console.log('Trying', command); } else {
        console.log('Re-Trying', command, i);
        }
      var message = await doTelloCommand(new Buffer(command));
//      console.log(message);
      break;
    } catch (err) {
      console.log(err.message);
      const timeout = 500 * Math.pow(2, i);
      console.log('Waiting', timeout, 'ms');
      await wait(timeout);
    }
  }  
}

async function promptAfterDelay (delay) {
 await wait(delay);
 rl.prompt();
}

console.log('---------------------------------------');
console.log('Tello Command File Processor');
console.log('Enter a File name to Run a Mission');
console.log('Enter quit or ctrl-c to quit');
console.log('---------------------------------------');

function doMission (filename) {
	var commands = require('fs').readFileSync(filename, 'utf-8')
		.split('\n')
		.filter(Boolean);

	console.log(commands);

	var delay;
	delay = 0;
	doTelloCommandWithRetry (commands[0]);
	for (let i = 1, len = commands.length; i < len; i++) {
	   delay = delay + 5000;
	   setTimeout(doTelloCommandWithRetry,delay,commands[i]);
	}
    promptAfterDelay(delay + 5000); //give time for last command to finish
}

//doMission ('./telloNoFly.txt');

rl.on('line', (input) => {
  fileName = input.trim();
  switch(fileName) {
    case 'quit':
    case 'Quit'':
	  rl.close();
      break;
    default:
      console.log(`File Name: ${fileName}`);
      doMission (fileName);
      break;
  }
//  rl.prompt();
}).on('close', function() {
  console.log('Exiting Mission Processor');
  process.exit(0);
}).on('resume', function () {
  rl.prompt();
});
console.log(prefix + 'Enter a name of a mission file.');
rl.setPrompt(prefix, prefix.length);
rl.prompt();


