const pcsButton = document.getElementById('pcs-button');
const wPcsButton = document.getElementById('working-pcs');
const lapsButton = document.getElementById('laps-button');
const probsButton = document.getElementById('probs-button');
const valueDisplay = document.querySelector('.value-display');
const paragraph = document.querySelector('.paragraph');

let timeoutId;

// Set default active button and start automatic switch
activateButton(lapsButton);
setParagraphValue("Total available labs on the system");
resetTimeout();

wPcsButton.addEventListener('click', () => {
  setValueAndActivateButton(wPcsButton.value, wPcsButton);
  setParagraphValue("Total working PCs available on the system");
});

pcsButton.addEventListener('click', () => {
  setValueAndActivateButton(pcsButton.value, pcsButton);
  setParagraphValue("Total PCs in all the laboratories on the system");
});

lapsButton.addEventListener('click', () => {
  setValueAndActivateButton(lapsButton.value, lapsButton);
  setParagraphValue("Total available labs on the system");
});

probsButton.addEventListener('click', () => {
  setValueAndActivateButton(probsButton.value, probsButton);
  setParagraphValue("Total problems reported on the system");
});

function setParagraphValue(value) {
  paragraph.textContent = value;
}

function setValueAndActivateButton(value, button) {
  animateValue(valueDisplay, parseInt(valueDisplay.textContent), value, 2000);
  activateButton(button);
  resetTimeout();
}

function activateButton(button) {
  pcsButton.classList.remove('active');
  wPcsButton.classList.remove('active');
  lapsButton.classList.remove('active');
  probsButton.classList.remove('active');
  button.classList.add('active');
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function resetTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    switchButton();
  }, 7000);
}


// function switchButton() {
//   if (pcsButton.classList.contains('active')) {
//     setValueAndActivateButton(wPcsButton.value, wPcsButton);
//     // setParagraphValue("Total labs on the system");
    
//   } else if (wPcsButton.classList.contains('active')) {
//     setValueAndActivateButton(lapsButton.value, lapsButton);
//     // setParagraphValue("Total working pcs");

//   } else if (lapsButton.classList.contains('active')) {
//     setValueAndActivateButton(probsButton.value, probsButton);
//     // setParagraphValue("Total Problems on the system");

//   } else {
//     setValueAndActivateButton(pcsButton.value, pcsButton);
//     // setParagraphValue("Total PCs on the system");
//   }
//   resetTimeout();
// }


function switchButton() {
  if (lapsButton.classList.contains('active')) {
    setValueAndActivateButton(pcsButton.value, pcsButton);
    setParagraphValue("Total PCs in all the laboratories on the system");

  } else if (pcsButton.classList.contains('active')) {
    setValueAndActivateButton(wPcsButton.value, wPcsButton);
    setParagraphValue("Total working PCs available on the system");

  } else if (wPcsButton.classList.contains('active')) {
    setValueAndActivateButton(probsButton.value, probsButton);
    setParagraphValue("Total problems reported on the system");

  } else {
    setValueAndActivateButton(lapsButton.value, lapsButton);
    setParagraphValue("Total available labs on the system");
  }
  resetTimeout();
}