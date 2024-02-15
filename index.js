const input = document.getElementById('input');
const box = document.querySelector('.box-info');
const form = document.getElementById('form');
const btnSubmit = document.getElementById('submit');
const error = document.querySelector('.err')

form.addEventListener('submit', (e) => infoShow(e))

async function infoShow(e){
        e.preventDefault()
        const { value } = input
        if(!value) return

        btnSubmit.setAttribute('disabled', '')
        const ipInfo = await fetchData(value)
        btnSubmit.removeAttribute('disabled');

        if(ipInfo){
            box.innerHTML = JSON.stringify(ipInfo, null, 2)
        }
}

//Api
async function fetchData(value) {
    const token = "7f9e78bd990115";
    const url =  `https://ipinfo.io/${value}?token=${token}`
    const res = await fetch(url);
    const json = await res.json();

    if(!res.ok){
        box.style.display = "none"
        error.style.display = "block"
        setTimeout(() => {
            error.style.display = "none"
        },2000)
    }else{
        box.style.display = "block"
        return { json }
    }
}
  