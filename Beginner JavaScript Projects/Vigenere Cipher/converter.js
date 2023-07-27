export const encryptOrDecrypt = (message, key, mode) => {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  const encryptedMessage = [];
  let keyIndex = 0;

  for (const messageChar of message) {
    const messageCharAlphabetIndex = alphabet.indexOf(messageChar);

    if (messageCharAlphabetIndex === -1) {
      encryptedMessage.push(messageChar);
      continue;
    }

    const keyChar = key[keyIndex % key.length];
    const keyCharAlphabetIndex = alphabet.indexOf(keyChar);

    let sum;
    if (mode === 'encrypt') { 
      sum = (messageCharAlphabetIndex + keyCharAlphabetIndex) % 26;
    }
    if (mode === 'decrypt') {
      sum = (messageCharAlphabetIndex - keyCharAlphabetIndex + 26) % 26;
    }
    
    const encryptedChar = alphabet[sum];
    encryptedMessage.push(encryptedChar);

    keyIndex++;
  }

  return encryptedMessage.join("");

}