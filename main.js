const mainWrapper = document.querySelector('#main-wrapper')
const loading = document.querySelector('.loader')

let limit = 5
let page = 1
async function getPhots(){
    const response = await fetch(`http://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
    const data =  await response.json()
    return data
}

async function showPhotos(){
    const photos = await getPhots()
    photos.forEach(photos =>{
        const photoElemnt = document.createElement('div')
        photoElemnt.classList.add('albums')
        photoElemnt.innerHTML = `
        <div class="img-albums">
                <img src="${photos.thumbnailUrl}" alt="" srcset="">
            </div>
            <div class="album-info">
                <p class="album-body">${photos.title}</p>
            </div>
        `
        mainWrapper.appendChild(photoElemnt)
    })
}

function showloading(){
    loading.classList.add('show')
    setTimeout(() => {
        loading.classList.remove('show') 
       setTimeout(() => {
          page++ 
          showPhotos()
       },3000 );
    }, 1000);
}

showPhotos()

window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 10){
        showloading()
    }
})