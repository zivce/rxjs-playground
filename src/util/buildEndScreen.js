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


    return {
        save:btn_save,
        new:btn_new,
    }
}




// var url = 'https://example.com/profile';
// var data = {username: 'example'};

// fetch(url, {
//   method: 'POST', // or 'PUT'
//   body: JSON.stringify(data), // data can be `string` or {object}!
//   headers: new Headers({
//     'Content-Type': 'application/json'
//   })
// }).then(res => res.json())
// .catch(error => console.error('Error:', error))
// .then(response => console.log('Success:', response));