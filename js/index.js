$(function(){
	var indice_selecionado = -1;
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

		for(var i in tbTitulos){
			var manga = JSON.parse(tbTitulos[i]);

			$("#list_colecao").append('<li class="collection-item" value="'+i+
				'"><div><a class = "modal-trigger" href="#modal1" value = "'+i+'">' 
				+ manga.Titulo + 
				'</a><a href="#!" class="secondary-content"><i class="material-icons" >delete</i></a></div></li>');
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

	function excluir(){
		tbTitulos.splice(indice_selecionado, 1);
		localStorage.setItem("tbTitulos", JSON.stringify(tbTitulos));
		alert("Título excluído.");
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

	$("#list_colecao").on("click", ".secondary-content", function(){
		indice_selecionado = parseInt($(this).attr("value"));
		excluir();
	});


	$("#list_colecao").on("click", ".modal-trigger", function(){
		indice_selecionado = parseInt($(this).attr("value"));
		console.log(indice_selecionado);
		console.log(tbTitulos);
		console.log(tbTitulos[0]);

		popularModal();
	});

	function popularModal(){
		var manga = JSON.parse(tbTitulos[indice_selecionado]);
		$("#modal_header").html(manga.Titulo);
		$("#modal_content").html('');
		var i;
		for(i=0;i<manga.Volumes; i++){
			$("#modal_content").append('<a class="waves-effect waves-light btn">#'+ (i+1) +'</a>');
		}
	}

	M.AutoInit();
});

