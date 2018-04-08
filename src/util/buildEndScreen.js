export default function(wrapper,player){
    
    //clean screen
    while(wrapper.firstChild)
        wrapper.removeChild(wrapper.firstChild);
    
    let game_over_text = document.createElement("h1");
    
    game_over_text.innerText=`GAME OVER!\n Score of ${player.username} is: ${player.score} points`;

    game_over_text.className="game_over_txt_style";
    wrapper.appendChild(game_over_text);
    
    let buttons_group_end = document.createElement("div");
    buttons_group_end.className ="buttons_group";

    let btn_save = document.createElement("button");
    btn_save.className = "btn_config btn_easy";
    btn_save.innerHTML = "Save Score";
    buttons_group_end.appendChild(btn_save);

    let btn_new = document.createElement("button");
    btn_new.className = "btn_config btn_medium";
    btn_new.innerHTML = "Start New Game";
    buttons_group_end.appendChild(btn_new);

    wrapper.appendChild(buttons_group_end);
    

    // let table_scores = document.createElement("table");
    // table_scores.className = "table_scores";

    // let thead = document.createElement("thead");

    // let tr = document.createElement("tr");
    // thead.appendChild(tr);

    // let th3 = document.createElement("th");
    // th3.innerHTML = "Rank";
    // tr.appendChild(th3);

    // let th1 = document.createElement("th");
    // th1.innerHTML = "User";
    // tr.appendChild(th1);


    // let th2 = document.createElement("th");
    // th2.innerHTML = "Scores";
    // tr.appendChild(th2);


    // table_scores.appendChild(thead);
    
    // let tbody = document.createElement("tbody");
    // tbody.className = "scores_body";

    // table_scores.appendChild(tbody);

    // wrapper.appendChild(table_scores);

    return {
        // table_scores:table_scores,
        save:btn_save,
        new:btn_new,
    }
}



