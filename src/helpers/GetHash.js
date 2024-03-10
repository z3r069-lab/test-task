import pkg from 'crypto-js';
const { MD5 } = pkg;

function GetHash() {
  const utcDate = getUTCDateInFormat();
  // console.log(utcDate);

  const yourString = "Valantis_" + utcDate;
  //console.log(yourString);
  const hash = MD5(yourString).toString();
  //console.log(hash);

  return hash
}

 

function getUTCDateInFormat() {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const date = currentDate.getUTCDate().toString().padStart(2, '0');

  const formattedDate = `${year}${month}${date}`;

  return formattedDate;
}

export default GetHash