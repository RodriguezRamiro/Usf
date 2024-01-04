describe("Server test (with setup and tear-down)", function(){
    beforeEach(function(){
        serverNameInput.value = 'Alice';
    });
    item('should add a new server to allServers on submitServerInfo()', function()
    {
        submitServerInfor();
        expect(object.keys(allServers).length).toEqual(1);
        expect(allServers['sever' + serverId].serverName).toEqual('Alice');

    });

    it('should not add a new server on submitServerInfor() with empty input',function(){
        serverNameInput.value = '';
        submitServerInfo();
        expect(object.keys(allServers).length).toEqual(0);
    });
     it('should update #servertable on updateServerTable()', function(){
        submitServerInfo();
        updateServerTable();

        let curTdList = document.querySelectorAll('#serverTable tbody tr td');

        expect(curTdList.length).toEqual(3);
        expect(curTdList[0].innerText).toEqual('Alice');
        expect(curTdList[1].innerText).toEqual('$0.00');
        expect(curTdList[2].innerText).toEqual('X');
     });

    afterEach(function(){
        serverId = 0;
        serverTbody.innerHTML = '';
        allServers = {};
    });
});