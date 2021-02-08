// can be edited via slider
let BALEADAS_PRICE = 20;

function hideNodes(nodeClass) {
    // remove all nodes exept first one
    const previousNodes = document.querySelectorAll(nodeClass);
    for (i = 0; i < previousNodes.length; ++i) {
        if (i > 0) {
            // not delete first node but all others
            previousNodes[i].remove();
        }
    };
    let firstNode = document.querySelector(nodeClass)
    firstNode.style.display = 'none';
}

function multiplyNodesMakeVisible(nodeClass, count, deep) {
    // remove all nodes exept first one
    const previousNodes = document.querySelectorAll(nodeClass);
    for (i = 0; i < previousNodes.length; ++i) {
        if (i > 0) {
            // not delete first node but all others
            previousNodes[i].remove();
        }
    };

    let firstNode = document.querySelector(nodeClass)
    firstNode.style.display = 'flex';

    // change flex-basis depending on amount of baleadas to fit better
    // TODO review this scaling way if it works for most cases
    if (count > 400) {
        firstNode.style.flexBasis = '1.5vw';
    } else if (count > 100) {
        firstNode.style.flexBasis = '2vw';
    } else if (count > 50) {
        firstNode.style.flexBasis = '3vw';
    } else {
        // normal fallback
        firstNode.style.flexBasis = '5vw';
    }

    for (var i = 0, copy; i < count - 1; i++) {
        copy = firstNode.cloneNode(deep);
        firstNode.parentNode.insertBefore(copy, firstNode);
    }
}

function toggleBaleadaMan(show) {
    if (show) {
        document.getElementById('baleadaManImg').style.display = 'flex';
    } else {
        document.getElementById('baleadaManImg').style.display = 'none';
    }
}

function setResultText(resultText) {
    const element = document.getElementById('resultText');
    element.innerHTML = resultText;
    element.style.display = 'block';
}

async function convertHNLToEuro(euroAmount, localFallbackConversion) {
    if (!localFallbackConversion) {
        const baseUrl = 'https://api.exchangerate.host/convert?from=EUR&to=HNL&amount=';
        try {
            // try converting via api
            const r = await fetch(baseUrl + euroAmount);
            const json = await r.json();
            if (json.success && json.result) {
                return json.result;
            }
        } catch (e) {
        }
    }

    // fallback hardcoded conversion
    return euroAmount * 29.28;
}

async function calculateInternal(euro, localFallbackConversion) {
    const honduras_money = await convertHNLToEuro(euro, localFallbackConversion);
    console.log('Euro is ' + honduras_money + ' lempiras');
    let baleadasq = honduras_money / BALEADAS_PRICE;
    baleadasq = Math.floor(baleadasq);
    const left_lempiras = Math.round(honduras_money % BALEADAS_PRICE);

    // TODO maybe extra mode guess how little you need for one
    // but kinda easy like 60 cent or something
    if (baleadasq < 1) {
        setResultText('You would <b>not</b> have <b>enough money</b> for a Baleada');
        hideNodes('.baleadaImg');
        toggleBaleadaMan(true);
    } else {
        toggleBaleadaMan(false);
        document.getElementById('baleadaManImg').style.visibility = 'hidden';
        setResultText('You would get <b>' + baleadasq + ' Baleadas</b> and you would have <b>' + left_lempiras + ' lempiras left</b>')
        multiplyNodesMakeVisible('.baleadaImg', baleadasq, true);
    }
}

let calculate = async function() {
    const euro = parseFloat(document.getElementById('euro_amount').value);
    if (isNaN(euro)) {
        console.warn('Input value was not a number');
        return;
    }
    await calculateInternal(euro, false);
};

function enterCalcStart(event) {
    if (event.key === 'Enter') {
        // enter key was pressed so start calc
        calculate();
    }
}