var registration = 'REJECT_ABI';

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
          text: 'Pay [USD] sats in BSV to [TARGET]',
          disableMonitor: true,
          arguments:
          {
            USD:
            {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '1'
            },
            TARGET:
            {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '@twetch.me'
            }
          }
        },
        {
          opcode: 'clearresponse',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Clear Previous Response',
          disableMonitor: true
        },
        {
          opcode: 'status',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Transaction Status',
          disableMonitor: true
        },
        {
          opcode: 'approve',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Approve Response',
          disableMonitor: true
        },
        {
          opcode: 'reject',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Reject Response',
          disableMonitor: true
        },
      ]
    };
  }
  
  appcheck() {
    const isTwetchInstalled = window.bitcoin && window.bitcoin.isTwetch;
    return isTwetchInstalled;
  }
  
  twetch() {
    sendtwetch();
  }
  
  pay(args) {
    // calculateSatsValue(args)
    payexternal(args);
  }
  
  status() {
    return registration;
  }
  
  post(args) {
    postexternal(args);
  }
  
  clearresponse() {
    registration = '';
  }
  
  reject() {
    return 'REJECT_ABI';
  }
  
  approve() {
    return 'APPROVE_ABI';
  }
}

async function sendtwetch() {
  try {
  const resp = await window.bitcoin.connect();
  resp.publicKey.toString();
  // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
  resp.paymail.toString();
  // 1@twetch.me
} catch (err) {
  // { code: 4001, message: 'User rejected the request.' }
}

}

async function payexternal(args) {
  try {
    const response = await window.twetch.abi({
      contract: 'payment',
      outputs: [{
        to: args.TARGET,
        sats: args.USD 
      }]
    });
    // Handle the response
  } catch (error) {
    // Handle the error
  }
}

Scratch.extensions.register(new twetchAPI());
