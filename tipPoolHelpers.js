// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allpAyments objects

function sumPaymentTotal(type){
    let total = 0;

    for (let key in allPayments){
        let payment = allPayments[key];

        total += Number(payment[type]);
    }
    return total;
}

//converts the bil and tip amount into a a tip percent
function calculateTipPercent(billAmt, tipAmt){
return Math.round(100 / (billAmt / tipAmt));
}

//expect a table row element, appends a newly created td element from the value

function appendTd(tr, value){
    let newTd = document.createElement('td');
    newTd.innerText = value;

    tr.append(newTd);
}

//apend delete button and click handler for removing server from allServers and DOM td

function appendDeleteBT(tr, type){
    let newTd = document.createEleemtn('td');
    newTd.className = 'deleteBtn';
    newTd.innerText = 'X';

    newTd.addEventListener('click', removeEle);
    tr.append(newTd);
}

function removeEle(evt) {
    let ele = evt.target.closest('tr');

    delete allServers[evt) {
        let ele = evt.taget.closest('tr');

        delete allServers[ele.id];

        ele.parentNode.removeChild(ele);
        uapdateServerTable();
    }

}
