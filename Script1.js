var content = document.getElementById("content");
var start = 0;
var limit = 5;

const createPost = ({url,thumbnailUrl,title}) => {
    return `<div class="post">
                <div class="top">
                    <div class="title">
                        <img class="img" src="${url}" />
                    </div>
                    <div class="side">
                        <span class="span">${title}</span>
                    </div>
                    </div>
                    <img class="post-image" src="${thumbnailUrl}" />
                  <div class="bottom">
                        <div class="title1"> <i class="fa fa-heart-o" aria-hidden="true"></i></div>
                        <input type="text" placeholder="add a comment...." />
                        <div class="option"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
                    </div>
                </div>`
}

function getData(start,limit){
    const url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
    fetch(url).then(res => res.json()).then(res => {
       
        var htmlString = res.map(item => {
            return createPost(item);
         }).join('');
        console.log('htmlString');
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        content.appendChild(div);
    });
}
const debounce = (fn, delay) => {
    let timer = null;
    return (...arg) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...arg), delay);
    }
}

const newFunction= debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            start = start + 5;
        getData(start, limit);
    }
     
},1000)

window.addEventListener("scroll", newFunction);
   

getData(start, limit);
