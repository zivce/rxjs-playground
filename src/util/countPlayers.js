export default function (wrapper) {
    
    const easy_lvl_counter = new Promise((resolve,reject)=>{

        fetch("http://localhost:3001/easy")
        .then(data => {
            data.json().then((json)=> { 
                
                let acc_easy =  json.reduce((acc,elem)=> {
                    return acc + 1;
                },0)

                resolve(acc_easy);  
           });

        })

    });


    const medium_lvl_counter = new Promise((resolve,reject)=>{

        easy_lvl_counter.then((acc_easy)=>{
            
            fetch("http://localhost:3001/medium")
            .then(data=>{
                data.json().then(json=>{
                    let acc_med_easy = json.reduce((acc,elem)=>{
                        return acc + 1;
                    },acc_easy);

                    resolve(acc_med_easy);
                })
            })

        })

    })

    const hard_lvl_counter = new Promise((resolve,reject)=>{

        medium_lvl_counter.then((acc_medium)=>{

            fetch("http://localhost:3001/hard")
            .then(data=>{
                data.json().then(json=>{

                    let acc_all = json.reduce((acc,elem)=>{
                        return acc + 1;
                    },acc_medium);

                    resolve(acc_all);
                })

            })

        })

    })

    hard_lvl_counter.then((acc_all)=>{

        let players_count = document.createElement("p");
        players_count.className="players_count";
        players_count.innerHTML = `<span> ${acc_all} </span> players have played this game so far.`;
        wrapper.appendChild(players_count);


    })

}