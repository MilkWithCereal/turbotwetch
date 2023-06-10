var registration = 'REJECT_ABI';
const twetchdebug = true;

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
          text: 'Pay [USD]$ in BSV to [TARGET]',
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
          opcode: 'Approve',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Approve Response',
          disableMonitor: true
        },
        {
          opcode: 'Reject',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Reject Response',
          disableMonitor: true
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
    // calculateSatsValue(args)
    payexternal(args)
  }
  status()
  {
    return registration;
  }
  post(args)
  {
    postexternal(args)
  }
  clearresponse()
  {
    registration = '';
  }
  Reject()
  {
    return 'REJECT_ABI';
  }
  Approve()
  {
    return 'APPROVE_ABI';
  }
  USDFormula()
  {
    ;
  }
}

async function sendtwetch() {
  const resp = await window.bitcoin.connect();
  resp.publicKey.toString();
  resp.paymail.toString();
}

function calculateSatsValue(args) {
  const sessionFetch = fetch('https://api.whatsonchain.com/v1/bsv/main/exchangerate')
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rate;
      const satsValue = (args.USD * exchangeRate) / 100000000;
      return Math.floor(satsValue);
    })
    .catch((error) => {
      console.error(error);
      return 0; // or any other appropriate value in case of an error
    });

    payexternal(args);
}

async function payexternal(args) {
  /*  
  // Fetch the exchange rate from the API
    const sessionFetch = await fetch('https://api.whatsonchain.com/v1/bsv/main/exchangerate');
    const data = await sessionFetch.json();

    // Extract the exchange rate from the response
    const exchangeRate = data.rate;

    // Calculate the USD value in sats
    let satsValue = (args.USD * exchangeRate) / 100000000;  // 10 cents equivalent in USD
    satsValue = Math.floor(satsValue);
    console.log(satsValue)
    */

  try {
    const response = await window.twetch.abi({
      contract: 'payment',
      outputs: [{
        to: args.TARGET,
        sats: satsValue 
      }]
    });


    console.log(response);
    registration = JSON.stringify({response});
  } catch (error) {
    // Handle any errors that occurred during the await operation
    console.error(error);
    return ''; // or any other appropriate value in case of an error
  }
}



Scratch.extensions.register(new twetchAPI());