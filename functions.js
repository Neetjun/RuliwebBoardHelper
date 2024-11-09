// 초기 기동 시 이전에 저장한 키워드 목록 불러오기

chrome.storage.sync.get(function (data) {

    let keywordArr = data.keywords.split(" ");

    let deleteBtnArr = document.getElementsByClassName("deleteKeyword");
    let deleteBtnCtn = keywordArr.length - deleteBtnArr.length;

    if(deleteBtnCtn >= 1) {
        for(let i = 0; i < deleteBtnCtn; i++)
            document.getElementById("add").click();
    }

    let inputArr = document.getElementsByClassName("keyword");

    for(let i = 0; i < keywordArr.length; i++) {
        let keyword = keywordArr[i];
        inputArr[i].value = keyword;
    }
});


// 삭제버튼 클릭
const delBtnArr = document.getElementsByClassName("deleteKeyword");

for(let i = 0; i < delBtnArr.length; i++) {
    delBtnArr[i].addEventListener('click',deleteInput);
}

function deleteInput(event) {
    document.getElementById("warning").style.display = "none";

    let deleteBtnArr = document.getElementsByClassName("deleteKeyword");

    if(deleteBtnArr.length == 1) {
        document.getElementById("warning").style.display = "block";
        return;
    }

    // 버튼의 부모 요소를 찾음
    const parentDiv = event.target.parentElement;

    // 삭제
    parentDiv.remove();
}

// 추가 버튼 클릭
const addBtn = document.getElementById("add");

addBtn.addEventListener('click',function addInput() {
    document.getElementById("warning").style.display = "none";
    let div = document.getElementsByClassName("keywords")[0];
    let copyDiv = div.cloneNode(true);
    copyDiv.getElementsByClassName("keyword")[0].value = "";
    let delBtn = copyDiv.getElementsByClassName('deleteKeyword')[0];
    delBtn.addEventListener('click',deleteInput);

    document.getElementById("inputList").appendChild(copyDiv);

});

// 저장 버튼 클릭
const saveBtn = document.getElementById("save");
saveBtn.addEventListener('click',function save() {

    let inputArr = document.getElementsByClassName("keyword");
    let keywordList = "";

    for(let i = 0; i < inputArr.length; i++) {
        if(inputArr[i].value === "" || inputArr[i] === null)
            continue;

        keywordList += inputArr[i].value+" ";
    }

    keywordList = keywordList.trim();

    chrome.storage.sync.set({keywords:keywordList});

    window.close();

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id); // 현재 탭 새로고침
        }
    });
})