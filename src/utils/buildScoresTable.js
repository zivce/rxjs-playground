export default function(scores){

    let table_body = scores.getElementsByTagName("tbody");
    table_body = table_body[0];
    
    while(table_body.firstChild)
        table_body.removeChild(table_body.firstChild);
    
    
    fetch("http://localhost:3001/scores")
        .then((resp) => {return resp.json()})
        .then((scores_arr)=>{

            let desc = (score1,score2)=>{
                return score2.score - score1.score;
            };

            scores_arr.sort(desc);
            
            let rank = 0;

            const mapped_arr = scores_arr.map((score)=>{
                rank++;
                return {
                    rank: rank, 
                    user: score.username,
                    score : `${score.score}pts` 
                }
            })
            

            mapped_arr.forEach((user_info)=>{
                let tr = document.createElement("tr");
                
                let td_rank = document.createElement("td");
                td_rank.innerHTML = user_info.rank;
                tr.appendChild(td_rank);

                let td_user = document.createElement("td");
                td_user.innerHTML = user_info.user;
                tr.appendChild(td_user);
            
                let td_score = document.createElement("td");
                td_score.innerHTML = user_info.score;
                tr.appendChild(td_score);

                table_body.appendChild(tr);
            })

        })
}