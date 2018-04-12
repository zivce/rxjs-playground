export default function(wrapper){
    //container div
    wrapper = document.createElement("div");
    wrapper.className="container start_screen";
    document.body.appendChild(wrapper);

    //logo
    let figures = document.createElement("div");
    figures.className = "figures_wrapper";

    let logo1 = document.createElement("div");
    logo1.className = "player_fill";
    logo1.style.position = "relative";
    logo1.style.bottom = "0";
    logo1.style.left = "0";

    figures.appendChild(logo1);


    let p1 = document.createElement("p");
    p1.style.position = "relative";
    p1.style.fontSize = "1.4em";
    p1.innerText ="vs.";

    figures.appendChild(p1);


    let logo2 = document.createElement("div");
    logo2.className = "enemy_cone_fill";
    logo2.style.position = "relative";

    figures.appendChild(logo2);

    let logo3 = document.createElement("div");
    logo3.className = "enemy_diamond_fill";
    logo3.style.marginTop =  "0";
    logo3.style.position = "relative";

    figures.appendChild(logo3);

    let logo4 = document.createElement("div");
    logo4.className = "enemy_fill";
    logo4.style.position = "relative";

    figures.appendChild(logo4);


    wrapper.appendChild(figures);


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



    let explanation = document.createElement("p");
    explanation.className="game_over_txt_style";
    explanation.style.fontWeight = "bold";
    explanation.innerHTML = "Press spacebar to shoot. Move mouse left-right to move the player.";
    wrapper.appendChild(explanation);
    


    let btn_easy = document.createElement("button");
    btn_easy.className = "btn_config btn_easy";
    btn_easy.innerHTML = "Easy";
    buttons_group_cfg.appendChild(btn_easy);


    let btn_med = document.createElement("button");
    btn_med.className = "btn_config btn_medium";
    btn_med.innerHTML = "Medium";

    buttons_group_cfg.appendChild(btn_med);


    let btn_hard = document.createElement("button");
    btn_hard.className = "btn_config btn_hard";
    btn_hard.innerHTML = "Hard";

    buttons_group_cfg.appendChild(btn_hard);

    wrapper.appendChild(buttons_group_cfg);


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
        player_name:player_name,
        wrapper: wrapper
    }
}   

