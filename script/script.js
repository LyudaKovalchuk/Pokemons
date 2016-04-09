var pokemonBatch = 12;
var URL = "http://pokeapi.co/api/v1/pokemon";
var offsetStep = 0;

var str =$("#pokemonity").html().trim();
var str1 = $("#for_poky_table").html().trim();
var templ= _.template(str);
var templ2 =_.template(str1);



var workingUrl = generateUrl();


function generateUrl() {
    return URL + '?limit=' + pokemonBatch + '&offset=' + pokemonBatch * offsetStep;
}

function loadPokemonBatch(){
	$.ajax({
	    url: workingUrl,
	    type: "GET"
	})
	.done(function(response){
	    console.log(response);
	    Resp(response.objects);
	});
}

function showPokemonDetails(){
	$("#poky-table").html(templ2({
		pokemon: this
	}));
}

$(".btn").on("click",function(){
	offsetStep++;
	workingUrl = generateUrl();
	loadPokemonBatch();
});

function Resp(pokemons){
	for(var i = 0; i< pokemons.length;i++){
		$("#poky-template").append(templ({
			pokemon:pokemons[i]
		}));
		$('.divs:last-child').on("click", showPokemonDetails.bind(pokemons[i]));
	}
}

loadPokemonBatch();