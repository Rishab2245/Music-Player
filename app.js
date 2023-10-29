const music = new Audio('music/1.mp3');

const songs=[
    {
        id:'1',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/1.jpg"
    },
    {
        id:'2',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/2.jpg"
    }    ,{
        id:'3',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/3.jpg"
    },    {
        id:'4',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/4.jpg"
    }    ,  {
        id:'5',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/5.jpg"
    },    {
        id:'6',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/6.jpg"
    }    ,  {
        id:'7',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/7.jpg"
    },    {
        id:'8',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/8.jpg"
    }    ,  {
        id:'9',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/9.jpg"
    },   {
        id:'10',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/10.jpg"
    }    ,   {
        id:'11',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/11.jpg"
    },    {
        id:'12',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/12.jpg"
    }    ,  {
        id:'13',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/13.jpg"
    },    {
        id:'14',
        songName:'sukoon mila <br><div class="subtitle">Arijit Singh</div>',
        poster:"img/14.jpg"
    }    ,  {
        id:'15',
        songName:'Kesariya <br><div class="subtitle">Arijit Singh  </div>',
        poster:"img/15.jpg"
    },

] 
Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML=songs[i].songName;
})
let masterPlay = document.querySelector("#masterPlay");
let wave = document.getElementsByClassName('wave')[0];
const playpause = ()=>{
    if(music.paused || music.currentTime <= 0){

        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');

    }
    else{
        music.pause();
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
        wave.classList.remove('active2');

    }

}
masterPlay.addEventListener('click',playpause);

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
        })
    }
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        element.style.background = "rgb(105,105,170,0)"
        })
    }

let index = 1;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        index = element.id;
        makeAllPlays();
        element.classList.remove('bi-play-circle-fill');
        element.classList.add('bi-pause-circle-fill');
        music.src = `music/${index}.mp3`;
        // console.log(poster_master_play)
        poster_master_play.src = `img/${index}.jpg`;
        // console.log(poster_master_play.src);
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songName}=ele;
            console.log(songName);
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.remove('bi-pause-fill');
            masterPlay.classList.add('bi-play-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170,.1)"
        // console.log(document.getElementsByClassName('songItem')[`${index}`]);
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementById('dot');


music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1<10){
        sec1= `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;


    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

})

seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration/100 ;
})
music.addEventListener('ended',()=>{
    masterPlay.classList.remove('bi-pause-fill');
    masterPlay.classList.add('bi-play-fill');
    wave.classList.remove('active2');

})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementById('vol_bar');
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change',()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.add('bi-volume-up-fill')
    }

    let vol_a = vol.value;
    vol_bar.style.width=`${vol_a}%`;
    vol_dot.style.left=`${vol_a}%`;
    music.volume = vol_a/100;
    console.log(music.volume);
})

let back = document.getElementById('back');
let next = document.getElementById('next');

const backsong = ()=>{
    index-=1;
    console.log(index);
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
        
    }
    
    music.src = `music/${index}.mp3`;
    // console.log(poster_master_play)
    poster_master_play.src = `img/${index}.jpg`;
    // console.log(poster_master_play.src);
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {songName}=ele;
        console.log(songName);
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170,.1)"
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    heart.classList.remove('bi-heart-fill');
    heart.classList.add('bi-heart');

}

back.addEventListener('click',backsong);


const nextsong = ()=>{
    index+=1;
    console.log(index);
    if(index >  Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }
    
    music.src = `music/${index}.mp3`;
    // console.log(poster_master_play)
    poster_master_play.src = `img/${index}.jpg`;
    // console.log(poster_master_play.src);
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {songName}=ele;
        console.log(songName);
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170,.1)"
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    heart.classList.remove('bi-heart-fill');
    heart.classList.add('bi-heart');
}
next.addEventListener('click',nextsong);


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click',()=>{
    pop_song.scrollLeft -=330;
})

right_scroll.addEventListener('click',()=>{
    pop_song.scrollLeft +=330;
})



let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click',()=>{
    item.scrollLeft -=330;
})

right_scrolls.addEventListener('click',()=>{
    item.scrollLeft +=330;
})

// console.dir(document);
document.addEventListener('keydown',(e)=>{
   if(e.which == 39){
    nextsong();
   }
  else if(e.which == 37){
    backsong();
   }
   else if(e.which == 32){
    playpause();
   }
})
let heart = document.getElementById('heart');
let menu_song = document.querySelector(".menu_song");
let no = 7;
let prev = 0;
heart.addEventListener('click',()=>{
  
    heart.classList.add('bi-heart-fill');
    heart.classList.remove('bi-heart');
    let name;
    for(let i=0 ; i<songs.length ; i++){
        if(songs[i].id == index){
            name = songs[i].songName;
            break;
        }
    }
    console.log(index,name);
    let li = document.createElement("li");
    li.classList.add("songItem");
    let string;
    if(no<10){
    string =  `<span>0${no}</span><img src="img/${index}.jpg"></div><h5>${name}</div></h5> <i class="fa-sharp playlistPlay fa-solid fa-circle-play" id="6"></i>`;}
    else{
         string =  `<span>${no}</span><img src="img/${index}.jpg"></div><h5>${name}</div></h5> <i class="fa-sharp playlistPlay fa-solid fa-circle-play" id="6"></i>`;}
    
    li.innerHTML=string;
    if (prev<index){
        menu_song.append(li);
        no++;

    }
    prev = index;
    document.querySelector(".icon p").style.display="block";


    setTimeout(()=>{

        document.querySelector(".icon p").style.display="none";
    },1000);


    
    
});
let song_side=document.querySelector(".song_side");
let menu_side=document.querySelector(".menu_side");
let mylist=document.querySelector("#mylist");
mylist.addEventListener('click',()=>{
    song_side.classList.toggle("playlistclass");
    menu_side.classList.toggle("playlistclass");
})

let cross = document.querySelector("#cross i");
cross.addEventListener('click',()=>{
    song_side.classList.toggle("playlistclass");
    menu_side.classList.toggle("playlistclass");
});



