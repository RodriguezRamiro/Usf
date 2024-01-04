let billAmtInput = documet.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

let paymentTbody = documetn.querySelctor('#paymentTable tbody');
let summaryTds = document.querySelectorAll('summaryTAble tbody tr td');

let allPayments = {};
let paymentId = 0;

paymentForm.affEventListener('submit', submitPaymentInfo);

//add a curpayment object to allPayments, updates html and reset input values.

function submitPaymentInfo(evt) {
    if (evt) evt.preventDefualt(); //when running tests there is no event

    let curPayment = createCurPayment();

    if (curPayment){
        paymentId += 1;

        allPayments['payment' + paymentId] = curPayment;

        appendPaymentTable(curPayment);
        updateServerTable();
        updateSummary();

        billAmtInput.value = '';
        tipAmtInput.value= '';

    }
}

//createCurPayment() will return undefined with neggative or empty inputs

//positive billAmt is required but tip can be 0

function createCurPayment(){
let billAmt= billAmtInput.value;
let tipAmt = tipAmtInput.value;

if (Number(billAmt === '' || tipAmt === '' ) return;

if (Number(billAmt) > 0 && Number(tipAmt) >= 0){
    return{
        billAmt: billAmt,
        tipAmt: tipAmt,
        tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
}
}

//create table row element and pass to appendTD with input vallue

function appendPaymentTable(curPayment){
    let newTr = document.createElement('tr');
    newTr.id = 'payment' + paymentId;

    appendTD(newTR, '$' + curPayment.billAmt);
    appendTD(newTR, '$' + curPayment.tipAmt);
    appendTD(newTR, '%' + curPayment.tipPercent);

    appendDeleteBtn(newTr, 'payment');

    paymentTbody.append(newTr);
}

// create table row element and pass to appendTD with calculated sum of all payment

function updateSummary(){
    let tipPercentAvg = sumpaymentTotal('tipPercent') / Object.keys
    (allPayments).length;

    summaryTds[0].innerHTml = '$' + sumPaymentTotal('billAmt');
    summaryTds[1].innerHTml = '$' + sumPaymentTotal('tipAmt');
    summaryTds[2].innerHTml = Math.round('tipPercentAvg')+ '%';
}

