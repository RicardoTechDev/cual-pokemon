$(document).ready(function(){  
    //Dibujamos la imagenes en el navegador agregando html a nuestra pagina actual 
        

        for(let i=1 ; i<=151; i++){
            let html_img_pokemon = "";
            html_img_pokemon +="<div class='col mx-auto ocultos' style='display: none;'>";
            /*Se agrega el atributo idpokemon a nuestra card para guardar el id del pokemon por cada tarjeta, lo que nos permitira más 
            más adelante obtener la información del pokemon desde la api al momento que el usuario haga click sobre el pokemon*/
            html_img_pokemon += `<div idpokemon='${i}' class='pokemon card bg-danger text-white' data-bs-toggle='modal' data-bs-target='#exampleModal' type='button' style='width: 13rem;'>`;
            html_img_pokemon +=`  <img class="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${i}.png" width="160"> `;                                
            html_img_pokemon +="  <div class='card-img-overlay'>";
            html_img_pokemon +=`      <h5 class='card-title'>N° ${i}</h5>`;
            //html_img_pokemon +="      <p class='card-text'>This is a wider card with .</p>";
           //html_img_pokemon +="      <p class='card-text'>Last updated 3 mins ago</p>";
            html_img_pokemon +="  </div>";
            html_img_pokemon +="</div>";
            html_img_pokemon +="</div>";
            $("#mostrando").append(html_img_pokemon);//agregamos la card a nuestro html
    };

    $("#loadmorepokemon").on("click", function(){  
        $("#loadmorepokemon").hide();
        $(".ocultos").fadeIn();
    });
 
    let html_modal ="";
            html_modal +="<div class='modal fade' id='exampleModal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
            html_modal +="    <div class='modal-dialog'>";
            html_modal +="        <div class='modal-content'>";
            html_modal +="        <div class='modal-header bg-danger text-white'>";
            html_modal +=`            <h5 class='modal-title' id='exampleModalLabel'></h5>`;
            html_modal +="            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>";
            html_modal +="        </div>";
            html_modal +="        <div class='modal-body' id='modalPokemon'>";
            html_modal +="        </div>";
            //html_modal +="        <div class='modal-footer'>";
            //html_modal +="            <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>";
            //html_modal +="        </div>";
            html_modal +="        </div>";
            html_modal +="    </div>";
            html_modal +="</div>";

            $("#info").html(html_modal);

        
            
    $(".pokemon").on("click",function(){
       // console.log($(this).attr("idpokemon"));
       //obtenemos el id del pokemon de acuerdo a la imagen en la cual se realizó el click
        let idpokemon = $(this).attr("idpokemon"); 

        //obtenemos la información de con get usando el id antes capturado
        $.get(`https://pokeapi.co/api/v2/pokemon/${idpokemon}`, function(pokemon) {
           
            $("#modalPokemon").append(`<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png' width='260'></img>`);
            $(".modal-title").append(`<h3>${pokemon.name}</3>`);
            $("#modalPokemon").append("<h4>Types</h4>");
           
            let html_str = "";
            html_str += "<ul>"; 

            for(let i=0; i<pokemon.types.length; i++) {
                html_str += "<li>" +pokemon.types[i].type.name + "</li>";
                $("#modalPokemon").append("<p>" +pokemon.types[i].type.name + "<p>");
            }
            html_str += "</ul>";
            $("#modalPokemon").append(`<p>Height: ${pokemon.height}</p>`);
            $("#modalPokemon").append(`<p>Weight: ${pokemon.weight}</p>`);
            //$("#info").html(html_str);          
        }, "json");

        $(".btn-close").on("click", function(){
           
        });

        console.log(`ID: ${pokemon.id}`);
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        
    });

    //$("#tipo").remove();
});

