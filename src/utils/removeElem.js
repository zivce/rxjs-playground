export default function(dom_elem)
{
    const parent = dom_elem.parentNode;
    if(parent !== null)
        parent.removeChild(dom_elem);
}