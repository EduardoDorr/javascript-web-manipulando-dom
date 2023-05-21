console.log('Bem-Vindo ao Robotron 2000');

const control = document.querySelectorAll('[data-control]');
const statistics = document.querySelectorAll('[data-statistic]');
const robotron = document.querySelector('[data-robotron]');
const parts = {
  "bracos": {
    "forca": 29,
    "poder": 35,
    "energia": -21,
    "velocidade": -5
  },
  "blindagem": {
    "forca": 41,
    "poder": 20,
    "energia": 0,
    "velocidade": -20
  },
  "nucleos": {
    "forca": 0,
    "poder": 7,
    "energia": 48,
    "velocidade": -24
  },
  "pernas": {
    "forca": 27,
    "poder": 21,
    "energia": -32,
    "velocidade": 42
  },
  "foguetes": {
    "forca": 0,
    "poder": 28,
    "energia": 0,
    "velocidade": -2
  }
};
const robotronColors = [
  {
    "name": "Amarelo",
    "url": "assets/img/robotron/amarelo/robotron.png"
  },
  {
    "name": "Azul",
    "url": "assets/img/robotron/azul/robotron.png"
  },
  {
    "name": "Branco",
    "url": "assets/img/robotron/branco/robotron.png"
  },
  {
    "name": "Preto",
    "url": "assets/img/robotron/preto/robotron.png"
  },
  {
    "name": "Rosa",
    "url": "assets/img/robotron/rosa/robotron.png"
  },
  {
    "name": "Vermelho",
    "url": "assets/img/robotron/vermelho/robotron.png"
  },
];
let robotronColorIndex = 0;

control.forEach((element) => {
  element.addEventListener('click', (event) => {
    manipulateData(event.target.dataset.control, event.target.parentNode);

    if (validateCounter(event.target.parentNode))
      updateStatistics(event.target.dataset.part, event.target.dataset.control);

    robotronColorIndex = validateIndex(robotronColorIndex, robotronColors);
    updateColor(event.target.parentNode, robotronColorIndex);
  });
});

function manipulateData(operation, parentNode) {
  const partCounter = getPartCounter(parentNode);
  const robotronColor = getRobotronColor(parentNode);

  if (partCounter)
    manipulatePart(operation, partCounter);
  if (robotronColor)
    manipulateColor(operation, robotronColor);
};

function manipulatePart(operation, partCounter) {
  if (partCounter === null)
    return;

  partCounter.value = AddSubtractByElement(operation, partCounter.value, 1);
};

function manipulateColor(operation, robotronColor) {
  if (robotronColor === null)
    return;

  robotronColorIndex = AddSubtractByElement(operation, robotronColorIndex, 1);
};

function updateStatistics(part, operation) {
  const partAttributes = parts[part];

  statistics.forEach((statistic) => {
    statistic.textContent = AddSubtractByElement(operation, statistic.textContent, partAttributes[statistic.dataset.statistic]);
  });
};

function updateColor(parentNode, index) {
  const robotronColor = getRobotronColor(parentNode);

  if (robotronColor === null)
    return;

  robotronColor.value = robotronColors[index].name;
  robotron.attributes.src.value = robotronColors[index].url;
};

function validateCounter(parentNode) {
  const partCounter = getPartCounter(parentNode);

  if (partCounter === null)
    return false;

  if (parseInt(partCounter.value) < 0) {
    partCounter.value = 0;
    return false;
  }

  return true;
};

function getPartCounter(parentNode) {
  return parentNode.querySelector('[data-counter]');
};

function getRobotronColor(parentNode) {
  return parentNode.querySelector('[data-color]');
};

function AddSubtractByElement(operation, base, value) {
  if (operation === '+')
    base = parseInt(base) + value;
  else
    base = parseInt(base) - value;

  return base;
};

function validateIndex(index, array) {
  if (index > array.length - 1)
    index = 0;
  if (index < 0)
    index = array.length - 1;

  return index;
};