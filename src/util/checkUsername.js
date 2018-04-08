export default function(username,diff)
{
    return fetch(`http://localhost:3001/${diff}`)
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