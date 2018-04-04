export default function(wrapper){
    //container div
    wrapper = document.createElement("div");
    wrapper.className="container start_screen";
    document.body.appendChild(wrapper);


    //select difficulty

    let buttons_group_cfg = document.createElement("div");
    buttons_group_cfg.className ="buttons_group";

    let difficulty = document.createElement("h2");
    difficulty.className="game_over_txt_style";
    difficulty.innerHTML = "Insert username & select difficulty.";
    wrapper.appendChild(difficulty);


    let player_name = document.createElement("div");
    player_name.className ="player_container";
    
    let label_player = document.createElement("p");
    label_player.innerHTML = "Insert username: ";
    player_name.appendChild(label_player);

    let input_player = document.createElement("input");
    player_name.appendChild(input_player);
    wrapper.appendChild(player_name);





    let btn_easy = document.createElement("button");
    btn_easy.className = "btn_config";
    btn_easy.innerHTML = "Easy";
    buttons_group_cfg.appendChild(btn_easy);


    let btn_med = document.createElement("button");
    btn_med.className = "btn_config";
    btn_med.innerHTML = "Medium";

    buttons_group_cfg.appendChild(btn_med);


    let btn_hard = document.createElement("button");
    btn_hard.className = "btn_config";
    btn_hard.innerHTML = "Hard";

    buttons_group_cfg.appendChild(btn_hard);

    wrapper.appendChild(buttons_group_cfg);


    let explanation = document.createElement("p");
    explanation.className="game_over_txt_style";
    explanation.innerHTML = "Press spacebar to shoot. Move mouse left-right to move the player.";
    wrapper.appendChild(explanation);
    
    //all elements returned
    return {
        easy : btn_easy,
        med : btn_med,
        hard : btn_hard,
        btns: buttons_group_cfg,
        expl : explanation,
        diff : difficulty,
        input_player:input_player,
        text_player : label_player,
    }
}   

