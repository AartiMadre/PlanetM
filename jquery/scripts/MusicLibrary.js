let language;
let songs=[];
let albums=[];
let languageSongs=[];
let jazz=[];
let rock=[];
let classical=[];

$(document).ready(function(){
   
    language=sessionStorage.getItem("language");
    console.log(language);

    $.getJSON("http://localhost:3000/songs",function(data){
    songs=data;

    getAllSongs(songs);
    getartists(songs);
    });

});

function getAllSongs(songs){
    let selectedSongs=[];
    let languages=language.split(" ");
   
    for(m=0;m<languages.length;m++)
    {
    
        if(languages[m]=="hindi"){
        languageSongs[m]=songs[0].hindi;
        if(m==0)
            selectedSongs=songs[0].hindi;
            else{
                for(p=0;p<songs[0].hindi.length;p++){
                    selectedSongs.push(songs[0].hindi[p]);
                }
            }
        getalbums(languageSongs[m],"Hindi");
        }

        else if(languages[m]=="marathi"){
            languageSongs[m]=songs[0].marathi;
            if(m==0)
            selectedSongs=songs[0].marathi;
            else{
                for(p=0;p<songs[0].marathi.length;p++){
                    selectedSongs.push(songs[0].marathi[p]);
                }
            }
            getalbums(languageSongs[m],"Marathi");
        }

        else if(languages[m]=="punjabi"){
            languageSongs[m]=songs[0].punjabi;
            if(m==0)
            selectedSongs=songs[0].punjabi;
            else{
                for(p=0;p<songs[0].punjabi.length;p++){
                    selectedSongs.push(songs[0].punjabi[p]);
                }
            }
            getalbums(languageSongs[m],"Punjabi");
        }

        else if(languages[m]=="english"){
            languageSongs[m]=songs[0].english;
            if(m==0)
            selectedSongs=songs[0].english;
            else{
                for(p=0;p<songs[0].english.length;p++){
                    selectedSongs.push(songs[0].english[p]);
                }
            }
            getalbums(languageSongs[m],"English");
        }
        
    }
    getartists(selectedSongs);
    getAlbumCategories(selectedSongs);
}

function getalbums(songs,languagetype){
    albums=[];
    let counter=0;
     albums[0]=songs[0].album;
     for(i=1;i<songs.length;i++)
     {
         counter=0;
        for(y=0;y<albums.length;y++){
             if(songs[i].album!=albums[y])
             {
                 counter++;
             }
        }
        if(counter==albums.length)
        albums.push(songs[i].album);
     }
   
    for(j=0;j<albums.length;j++)
    {
        
        sessionStorage.setItem("playlist",JSON.stringify(songs));
        
         imagename=albums[j].split(" ");
         
         let image=imagename.join("");
         image=image+".jfif";
         var ul=$('div.myalbum');
         ul.append(`<div class="col py-4">
         <div class="card">
            <img src="../images/${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${albums[j]}</h5>
            <div class="text-center">
            <button type="button" class="btn btn-outline-danger" onclick="addplay('${albums[j]}')" >Explore</button> </div>
         </div></div></div>`);
      }
  
 }

function addplay(album){
    playlist=[];
   
    for(k=0;k<languageSongs.length;k++){
       for(l=0;l<languageSongs[k].length;l++){
           if(album==languageSongs[k][l].album)
           {
               playlist.push(languageSongs[k][l]);
               console.log(languageSongs[k][l].album);
           }
       }
    }
    sessionStorage.setItem("playlist",JSON.stringify(playlist));
    window.open("../html/audio.html","_self");
}

function getartists(allsongs){
    artists=[];
    let count=0;
    
    for(q=0;q<allsongs.length;q++)
    {  
        
       if(Array.isArray(allsongs[q].artist)){
        for (z=0;z<allsongs[q].artist.length;z++)
        {   
            counter=0;                    
             for(s=0;s<artists.length;s++){
                   
                    if(allsongs[q].artist[z]!=artists[s])
                    {
                        counter++;
                    }
                }
               
                if(counter==artists.length)
                artists.push(allsongs[q].artist[z]);
         }
         
    }
    else{
        for(r=0;r<artists.length;r++){
        
            if(allsongs[q].artist!=artists[r])
            {      
                artists.push(allsongs[q].artist[r]);        
            }
        }
    }
        
    }

    // for(f=0;f<artists.length;f++)
    // {
    //     if(Array.isArray(artists[f]))
    //     {
    //         delete artists[f];
    //     }
    // }
    
    displayalbums=document.getElementById("artists");
   for(i=0;i<artists.length;i++)
   {

       if(artists[i]==undefined)
       continue;
    imagename=artists[i].split(" ");
   
    let image=imagename.join("");
    image.trim();
    image=image+".jfif";
    
    displayalbums.innerHTML += `<button type='button' class='recent-img'  onclick="playArtists('${artists[i]}')"><img src='../images/${image}' alt='img' ></img></button>&emsp;`;
   
   }
   
}

function playArtists(artistName){
    alert(artistName);
   let playlist=[];

   for(i=0;i<languageSongs.length;i++)
   {
       for(j=0;j<languageSongs[i].length;j++)
       {
           if(artistName==languageSongs[i][j].artist)
           {
              playlist.push(languageSongs[i][j].artist);
            }
            else  if(Array.isArray(languageSongs[i][j].artist))
            {
                
                for(m=0;m<languageSongs[i][j].artist.length;m++)
                {
                    if(artistName==languageSongs[i][j].artist[m])
                    {
                        if(playlist.length==0)
                        playlist.push(languageSongs[i][j]);
                        else{
                            for(n=0;n<playlist.length;n++){
                                counter=0;
                                if(playlist[n].name!=languageSongs[i][j])
                                {
                                    
                                    counter++;
                                }
                                if(counter==playlist.length)
                                playlist.push(languageSongs[i][j]);
                            }
                        }
                    }
                }
            }
          
        }
   }
   console.log(playlist);
}

function  getAlbumCategories(allsongs){
    for(i=0;i<allsongs.length;i++)
    {
        if(allsongs[i].categories=="Rock")
        {
            rock.push(allsongs[i]);
        }
        else if(allsongs[i].categories=="Jazz")
        {
            jazz.push(allsongs[i]);
        }
        else if(allsongs[i].categories=="Classical")
        {
            classical.push(allsongs[i]);
        }
    }
    console.log("Rock:"+rock)
}

function playCategory(str){
   
    playlist=[];
    if(str=="Rock"){
        playlist=rock;
    }
    else if(str=="Jazz"){
        playlist=jazz;  
    }
    else if(str=="Classical"){
        playlist=classical;  
    }
   
    sessionStorage.setItem("playlist",JSON.stringify(playlist));
    window.open("../html/audio.html","_self");
   
}
