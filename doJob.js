chrome.storage.sync.get(function (data) {

    // let boardTable = document.getElementsByClassName("board_list_table")[0];
    //
    // let boardTbody = boardTable.getElementsByTagName("tbody")[0];
    //
    // let boardList = boardTbody.getElementsByTagName("tr");

    let titleList = document.getElementsByClassName("deco");

    let keywords = data.keywords.split(" ");

    if(keywords[0] === "")
        return;

    for(let i = 0; i < titleList.length; i++) {
        let target = titleList[i];
        let title = target.textContent;

        for(let j = 0; j <keywords.length; j++) {
            let keyword = keywords[j];

            if(title.includes(keyword)) {
                let parent = target.parentElement;

                while(true) {
                    if(parent.classList.contains("blocktarget")) {
                        break;
                    }
                    else
                        parent = parent.parentElement;
                }
                parent.classList.add("screen_out");
            }
        }
    }
});
