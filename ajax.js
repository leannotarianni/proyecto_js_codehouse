/* $.ajax({
  url: 'https://randomapi.com/api/2ro7ok09?key=CMSS-8PNV-ZT4U-090G',
  dataType: 'json',
  type: 'get',
  Cache: false,
  success: function (data) {
      $(data.results).each(function(index, value) {
        console.log(value.name);
        $("#SeccionComentarios").html(`
                          <div class="imagen_usuario">
                             <img src="${value.picture}">
                          </div>
                          <div class="datos_usuario">
                            <p class="nombre_usuario">nombre: ${value.name}</p>
                            <p class="username_usuario"> usuario: ${value.username}</p>
                          </div>
                          <p class="opinion_usuario">${value.opinion}</p>`
      );
      })
      

  }
}); */

$(() => {
          const URLUSUARIO = "https://randomapi.com/api/2ro7ok09?key=CMSS-8PNV-ZT4U-090G"

$("body").append('<button id="refresh">refresh</button>');

$("#refresh").click(() => {
                      $.get(URLUSUARIO, function (respuesta, estado) {
                              if (estado === "success") {
                                $(respuesta.results).each(function(index, value) {
                                  console.log(value.name);
                                  let datos = value
$("#SeccionComentarios").append(`<div class="imagen_usuario">
                                    <img src="${datos.picture}">
                                 </div>
                                 <div class="datos_usuario">
                                    <p class="nombre_usuario">nombre: ${datos.name}</p>
                                    <p class="username_usuario"> usuario: ${datos.username}</p>
                                  </div>
                                  <p class="opinion_usuario">${datos.opinion}</p>`
                                    );
                                })
                              }
                      })

})
})
