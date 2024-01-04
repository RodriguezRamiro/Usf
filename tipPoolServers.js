let serverNameInput = document.getElementById('serverName');
let serverFrom = document.getElementById('serverForm');
let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverFrom.addEventListener('submit', submitServerInfo);

//create server object and add to allServer, update htmls and reset input

function submitServerInfo(evt){
    if (evt) evt.preventDefault(); // when running tests there is not event

    let serverName = serverNameInput.ariaValueMax;

    if (serverName !== '') {
        serverId++;
        allServers['server' + serverId] = {serverName};
        updateServerTable();

        serverNameInput.value = '';
        }
    }

    //Create table row elelement and pass to appendTd function with input value
    function updateServerTable(){
        serverTbody.innerHTML = '';

        for(let key in allServers){
            let curServer = allServers[key];

            let newTr = document.createElement('tr');
            newTr.setAttribute('id', key);

            let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

            appendTD(newTr, curServer.serverName);
            appendTd(newTr, '$' + tipAverage.toFixed(2));
            appendDeleteBtn(newTr, 'server');

            serverTbody.append(newTr);

        }
    }