
export default function(wrapper){
    let table = document.getElementsByTagName('table');
    table = table[0];

    if(typeof table !== 'undefined')
        while(table.firstChild)
            table.removeChild(table.firstChild);

    
    fetch("http://localhost:3001/scores")
        .then((resp) => {return resp.json()})
        .then((scores_arr)=>{
           
           if(scores_arr.length === 0)
           {
               //nema scores sacuvanih
               return;
           }
            //build table
           
            let table_scores = document.createElement("table");
            table_scores.className = "table_scores";

            let thead = document.createElement("thead");

            let tr = document.createElement("tr");
            thead.appendChild(tr);

            let th3 = document.createElement("th");
            th3.innerHTML = "Rank";
            tr.appendChild(th3);

            let th1 = document.createElement("th");
            th1.innerHTML = "User";
            tr.appendChild(th1);


            let th2 = document.createElement("th");
            th2.innerHTML = "Scores";
            tr.appendChild(th2);


            table_scores.appendChild(thead);
            
            let tbody = document.createElement("tbody");
            tbody.className = "scores_body";

            table_scores.appendChild(tbody);
           
            wrapper.appendChild(table_scores);
            
    

            let table_body = table_scores.getElementsByTagName("tbody");
            table_body = table_body[0];
            
            while(table_body.firstChild)
                table_body.removeChild(table_body.firstChild);
    

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