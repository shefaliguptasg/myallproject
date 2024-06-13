function convertCeltof() {
  console.log("call");
  let tempInput = document.getElementById("c").value;
  let faherOutpur = parseInt(tempInput) * (9 / 5) + 32;
  document.getElementById("f").value = faherOutpur;
}

function convertKgtoPound() {
  let tempInput = document.getElementById("kg").value;
  let convertValue = parseInt(tempInput) * 2.205;
  document.getElementById("pound").value = convertValue;
}
function convertKmtoMile() {
  let tempInput = document.getElementById("km").value;
  let convertValue = parseInt(tempInput) /1.609;
  document.getElementById("miles").value = convertValue;
}
