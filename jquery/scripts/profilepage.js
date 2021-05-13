$(document).ready(function () {
    var name="";
    var email="";
    var contact="";
    var id="";
    var password="";
    var oldPass="";
    var newPass="";
    var confirmPass="";
    var user_data;
    let favSongList,user,playlist=[];
    $.getJSON('http://localhost:3000/users/3',UserData);
   
    function UserData(data)
    {
          $('#myName').text(data.name);
          $('#myEmail').text(data.email); 
          user_data=data;
     ///hange Password Functionality
     
              $('#submitdata').click(function(){
                 
                  oldPass=$('#oldPass').val();
                  newPass=$('#newPass').val();
                  confirmPass=$('#confirmPass').val();
   
                 // console.log(oldPass+'  '+newPass+'  '+confirmPass);
   
                  if(oldPass == '' || newPass == ''  || confirmPass == '')
                  {
                   alert('!!Please Fill All Details!!');
                  }
                  else if(oldPass==user_data.password)
                  {
                    if(newPass==confirmPass){
                     var chnagepass={"id":data.id,"name":data.name,"contact":data.contact,"email":data.email,"password":confirmPass}
                     var url="http://localhost:3000/Users/"+data.id;
                      $.ajax
                     ({
                      type: "PUT",
                      dataType : 'json',
                      async: false,
                      url: url,
                      data:  chnagepass ,
                      success: function () {alert("PassWord Change Successfully!"); },
                      failure: function() {alert("Please Try Again!");}
               
                       });  
                      }
                    else{
                           alert(" please Confrim password")
                        }
                   }
                  
                   
               
              });
     
   
     
     ///////////////////playlist Part Code//////////////////////////////////////////
   
     $.getJSON('http://localhost:3000/playlist/1',userPlaylist);
     //userPlaylist(data);
     function userPlaylist(data)
     {
        //  console.log(data);
        //  console.log(data.playlistArray);
          
   
          user=data
          playlist=data.playlistArray;
        
          // console.log(user);
         // console.log(playlist);
     // console.log("playlist:::"+playlist);
           
           var ul = $('div.mycart');
   
   
   for(var i=0;i<playlist.length;i++)
   {
   ul.append('<div class="col py-4">'+
   '<div class="card" style="width: 17rem;">'+
   '<img src="'+playlist[i].image+'" class="card-img-top" id="img" alt="...">'+
   '<div class="card-body">'+
     '<h5 class="card-title">'+playlist[i].name+'</h5>'+
     '<div>'+playlist[i].artist+'</div>'+
     '<audio controls id="audioPanel">'+
     '<source src="'+playlist[i].path+'"type="audio/mpeg">'+
     '</audio>'+
   '</div>'+
   '</div>'+
   '</div>'
   );
   }
   
          
     }
      
    }
   
     
   
     
   
   
   
   
   });