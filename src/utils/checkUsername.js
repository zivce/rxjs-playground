export default function(username)
{
    return fetch('http://localhost:3001/scores')
        .then((data)=>{
            return data.json();
        })
        .then((json)=>{

            let filtered = json.filter((player)=>{
                return player.username === username
            })

            return filtered.length != 0;
        });
}