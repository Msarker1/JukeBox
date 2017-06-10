function jukebox() {
	var counter=0;
	var results="";
	var songs=[
	"http://dopefile.pk/mp3embed-7gw2lgxgohw5.mp3",
	"http://www.chaddghiron.com/wp-content/uploads/2011/11/03-Headlines1.mp3",
	"http://dopefile.pk/mp3embed-yp482nad0lkg.mp3"
	];
	
	document.getElementsByClassName("b1")[0].addEventListener('click',function (){
     	document.getElementById("player").play();
   	}  ); 
	

	document.getElementsByClassName("b2")[0].addEventListener('click',function (){
     	document.getElementById("player").pause();
   	}  ); 
	
	document.getElementsByClassName("b3")[0].addEventListener('click',function (){
     	var sound=document.getElementById("player");
     	sound.pause();
     	sound.currentTime=0;
   	}  ); 
	
	document.getElementsByClassName("b4")[0].addEventListener('click',function (){
     		counter++;
     		if(counter>=songs.length){
     			counter=0;
     		}
     		document.getElementById("player").src=songs[counter];
     		document.getElementById("player").play();

   	}  ); 

	this.addsong=function(song){
		song=("https://files.freemusicarchive.org/").concat(song);
		songs.push(song);
		
	};

	this.print=function(){
		console.log(songs);
	};


	this.search=function(stuff){
		var that = this;
		var results = new Array();
		$.ajax({
    	type: "GET",
    	url: "https://freemusicarchive.org/api/trackSearch",
    	data: {
        	q: stuff, // <<< Search term goes in quotes here.
        	limit: 10
    	},
    	dataType: 'json',
    	success: function(response) {
        	results = response.aRows;
        	that.display(results);
        
        },
    	error: function(err) {
        	console.error( err );
    	}
		});
	}

	this.display=function(array){
		var that = this;
		var ol = document.getElementById("matches");
 		for (var i = 0;i<array.length;i++){
   			var li = document.createElement("li");
   			var button = document.createElement("button");
   			button.className="bb"+i;
   			button.innerHTML="Add";
  			li.appendChild(document.createTextNode(array[i]));
  			ol.appendChild(li);
  			ol.appendChild(button);
  			that.setbuttonClicks(array[i],i);
		}
	}

	this.setbuttonClicks=function(x,i){
  		var that = this;
  		document.getElementsByClassName("bb"+i)[0].addEventListener('click',function (){
     	var y = x.match(/\d+/)[0];
	  	that.addtrack(y);
   		}  ); 
	}

	this.addtrack=function(x){
		var that = this;
		$.ajax({
    	type: "GET",
    	url: "https://freemusicarchive.org/api/get/tracks.json",
    	data: {
      	  api_key: "MP1QWI8JOBHCO0HU",
        	track_id: x // the id of your targeted track
    	},
    	dataType: "json",
    	success: function(response) {
			alert("Added " + response.dataset[0].track_title);
    		results=response.dataset[0].track_file;
    		that.addsong(results);
    	},
    	error: function(err) {
     	   console.error(err);
   		}
		});
	}

	this.removeList=function(){
	var ol = document.getElementById("matches");
	ol.innerHTML="";
  }

}	
var s = new jukebox();
document.getElementsByClassName("bsearch")[0].addEventListener('click',function (){
		s.removeList();
     	s.search(document.getElementsByClassName("search")[0].value);
}  ); 