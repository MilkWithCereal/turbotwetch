class twetchAPI {
  getInfo() {
    return {
      id: 'Twetch',
      name: 'TurboTwetch',
      color1: '#252630', // pure red
      color2: '#323340', // pure green
      color3: '#323340', // pure blue

      blocks: [
        {
          opcode: 'twetch',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Connect Twetch',
        },
        {
          opcode: 'appcheck',
          blockType: Scratch.BlockType.REPORTER,
          text: 'has twetch wallet?',
          disableMonitor: true
        },
        {
          opcode: 'pay',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Pay [SATS] SATS to [TARGET]',
          disableMonitor: true,
          arguments:
          {
            SATS:
            {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '2100'
            },
            TARGET:
            {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '@twetch.me'
            }
          }
        },
        {
          opcode: 'post',
          blockType: Scratch.BlockType.COMMAND,
          text: 'post [MESSAGE] to twetch',
          disableMonitor: true,
          arguments:
          {
            MESSAGE:
            {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello Twetch!'
            }
          }
        },
      ]
    };
  }
  appcheck()
  {
    const isTwetchInstalled = window.bitcoin && window.bitcoin.isTwetch
    return isTwetchInstalled;
  }
  twetch()
  {
    sendtwetch()
  }
  pay(args)
  {
    payexternal(args)
  }
  post(args)
  {
    postexternal(args)
  }
}

async function sendtwetch() {
  const resp = await window.bitcoin.connect();
  resp.publicKey.toString();
  resp.paymail.toString();
}

async function payexternal(args) {
  try {
    const response = await window.twetch.abi({
      contract: 'payment',
      outputs: [{
        to: args.TARGET,
        sats: args.SATS
      }]
    });

    // Use the response here
    console.log(response);
  } catch (error) {
    // Handle any errors that occurred during the await operation
    console.error(error);
  }
}
async function postexternal(args) {
  twetch.publish('twetch/post@0.0.1', {
    bContent: args.MESSAGE
});
}



Scratch.extensions.register(new twetchAPI());