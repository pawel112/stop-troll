document.addEventListener('DOMContentLoaded', documentEvents, false);

function documentEvents() {    
  document.getElementById('add_btn').addEventListener('click', 
    () => { populateBlockList(document.getElementById('list_input'));
  });
  document.getElementById('download_btn').addEventListener('click', 
    () => { downloadBlockList();
  });
}


function populateBlockList(input) {
    let newUsersToAdd = []
    newUsersToAdd = input.value.replace(/[\[\]']+/g,'').split(",");
    console.log('elo', newUsersToAdd)
    chrome.storage.local.get('blockList', (res) => {
        newBlockList = newUsersToAdd.concat(res.blockList)
        chrome.storage.local.set({blockList: newBlockList}, () => {
            console.log(newBlockList)
            console.log(`Added ${newUsersToAdd.length}`);
        });
    });
    input.value = ''
}

function downloadBlockList(){
    chrome.storage.local.get('blockList', (res) => {
        console.log('start')
        var result = res.blockList.join(',')
        console.log('end')
        var url = 'data:application/json;base64,' + btoa(result);
        chrome.downloads.download({
            url: url,
            filename: 'lista_trolli.json'
        });
    });
}