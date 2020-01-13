$(function(){
	var tbTitulos;
	try{
		tbTitulos = localStorage.getItem("tbTitulos");
	}catch(err){
		alert("Não foi possível acessar o localStorage. Por favor desabilite a opção 'Bloquear cookies de terceiros e site data' para que a aplicação funcione corretamente.");
	}

	tbTitulos = JSON.parse(tbTitulos);
	if (tbTitulos == null) {
		tbTitulos = [];
	}
	listar();
	function listar(){
		$("#list_colecao").html("<li class='collection-header'><h4>Títulos cadastrados</h4></li>");

		var i, j;
		for(i=0; i<tbTitulos.length;i++){
			var titulo = JSON.parse(tbTitulos[i]);
			var strAppend = "<li value = '"+i+"'>" +
			"<div class='collapsible-header'>"+
					"<i class='material-icons'>chevron_right</i>" + titulo.Titulo +
					"<a href='#!' class='secondary-content'><i class='material-icons'>delete</i></a>" +
					"<div class='collapsible-body'>";
			for (j = 0; j < titulo.Volumes; j++) {
				strAppend = strAppend + "<a class='waves-effect waves-light btn' value = '" 
				+ j +"'>"+ (j+1) +"</a>";
			}
			strAppend = strAppend + "</div></li>";
			$("#list_colecao").append(strAppend);
		}
	}

	function salvar(){
		var titulo = $("#titulo").val().trim();
		if (titulo == "") {
			alert("O campo está vazio!");
			return;
		}
		var manga = getManga("Titulo", titulo);
		if(manga != null){
			alert("Título já cadastrada.");
			return;
		}
		var volumes = parseInt($("#num_volumes").val());
		if (volumes<1) {
			alert("Quantidade de volumes não permitida.");
			return;
		}

		manga = JSON.stringify({
			Titulo     : titulo,
			Volumes : $("#num_volumes").val()
		});

		tbTitulos.push(manga);

		localStorage.setItem("tbTitulos", JSON.stringify(tbTitulos));

		listar();
	}
	function getManga(propriedade, valor){
		var manga = null;
		for (var item in tbTitulos) {
			var i = JSON.parse(tbTitulos[item]);
			if (i[propriedade] == valor)
				manga = i;
		}
		return manga;
	}

	$("#fab_salvar").on('click', function(event) {
		salvar();
	});
	
	M.AutoInit();
});