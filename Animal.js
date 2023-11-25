var obj;
var todayDate;

function showAnimals(length){
    var url = "https://zoo-animal-api.herokuapp.com/animals/rand/"+length;
    $.ajax(
        url,
        {
            success: function(data) {
                
              if(data.length >0)
              {
                obj = data;
                var index=1;
                var output ="<tr>";
                for (var animal of data) 
                {
                    output += "<td style='width:25%; border:1px solid black;' onclick=\"getAnimalDetail(\'"+animal.name+"\')\"><div style='font-size:20px;font-weight:bold;padding:10px'>"+animal.name+"</div><div style='margin:10px'><img class=\"animalImage\" src=\""+animal.image_link+"\"</img></div></td>";
                    if(index == 4){
                        output += "</tr><tr>";
                    }
                    else if(index == 8){
                        output += "</tr><tr>";
                    }
                    
                    index++;
                }
                output += "</tr>";

                $("#animalsEntries").html(output);

                updateActive(length);
              }
              else{

              }
            },
            error: function() {
              alert('There was some error performing the AJAX call!');
            }
         }
      );
}

function updateActive(length){
    if(length == 5){
        $("#four").addClass("active");
        $("#eight").removeClass("active");
        $("#ten").removeClass("active");
    }
    else if(length == 8){
        $("#four").removeClass("active");
        $("#eight").addClass("active");
        $("#ten").removeClass("active");
    }
    else if(length == 10){
        $("#four").removeClass("active");
        $("#eight").removeClass("active");
        $("#ten").addClass("active");
    }
}

function getDate(){
    $.ajax(
        'Sources/get_current_date.php',
        {
            success: function(data) {
                todayDate = data;
              $(".topRegion h3").html(data);
            },
            error: function() {
              alert('There was some error performing the AJAX call!');
            }
         }
      );

}

$( document ).ready(function() {
    getDate();
    //showAnimals(4);
});

function togglePopup() {
    $(".details").toggle();
}

function getAnimalDetail(name){
   
    var mainDate = new Date(); 
    var today = mainDate;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+""+mm+""+dd;
    var todate = today;
    today = mainDate;
    today.setDate(today.getDate() - 7); 
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = today.getFullYear();

    today = yyyy+""+mm+""+dd;
    var fromdate = today;
    
    var url = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/"+name+"/daily/"+fromdate+"/"+todate;
    $.ajax(
        url,
        {
            success: function(data) {
                console.log(data);
                var views=0;
                for (var view of data.items) 
                {
                    views +=view.views;
                }

                for (var animal of obj) 
                {
                    if(animal.name == name)
                    {
                        output ="<h4>Family : "+ animal.animal_type+"</h4>";
                        output +="<h4>Food : "+ animal.diet+"</h4>";
                        output +="<h4>Life Expectancy : "+ animal.lifespan+"</h4>";
                        output +="<h4>Minimum Length  : "+ (animal.length_min * 0.3048).toFixed(3)+" meters</h4>";
                        output +="<h4>Maximum Length   : "+ ( animal.length_max  * 0.3048).toFixed(3)+" meters</h4>";
                        output +="<h4>Minimum Weight  : "+ (animal.weight_min * 0.453592).toFixed(3)+" kg</h4>";
                        output +="<h4>Maximum Weight   : "+ (animal.weight_max * 0.453592).toFixed(3)+" kg</h4>";
                        output +="<h4>Weekly expectations (Total Views)  : "+views +"</h4>";
                        
                        $(".animal_detail").html(output);
                        togglePopup();
                        break;
                    }
                }


            },
            error: function() {
                for (var animal of obj) 
                {
                    if(animal.name == name)
                    {
                        output ="<h4>Family : "+ animal.animal_type+"</h4>";
                        output +="<h4>Food : "+ animal.diet+"</h4>";
                        output +="<h4>Life Expectancy : "+ animal.lifespan+"</h4>";
                        output +="<h4>Minimum Length  : "+ (animal.length_min * 0.3048).toFixed(3)+" meters</h4>";
                        output +="<h4>Maximum Length   : "+ ( animal.length_max  * 0.3048).toFixed(3)+" meters</h4>";
                        output +="<h4>Minimum Weight  : "+ (animal.weight_min * 0.453592).toFixed(3)+" kg</h4>";
                        output +="<h4>Maximum Weight   : "+ (animal.weight_max * 0.453592).toFixed(3)+" kg</h4>";
                        output +="<h4>Weekly expectations (Total Views)  : Not Found</h4>";
                        
                        $(".animal_detail").html(output);
                        togglePopup();
                        break;
                    }
                }
            }
         }
      );



    

}