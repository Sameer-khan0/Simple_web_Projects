const make_lst=()=>{
    if(text.value == ''){
        return
    }
    let lst=document.getElementsByClassName('lsts')[0]
    const new_lst=document.createElement('li')
    new_lst.innerHTML=text.value+`<button onclick="del_lst(this)">Delete</button>`
    lst.appendChild(new_lst)
    text.value=''
}

const del_lst=(data)=>{
    data.parentNode.remove()
    a=sessionStorage.getItem('txt')
}
