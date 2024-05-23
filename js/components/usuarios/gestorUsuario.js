import Servicios from './servicios.js';
class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        //todas las variables que deben inicializarse
        this.token = '';
        this.usuarios = []; 
        //LOS USUARIOS DE LA FUNCION GESTORUSUARIOS
        this.init();
    }
    login() {
        const usuario = $('#user').val();
        const contrasena = $('#pass').val();
        /*  
            call(error, succss) {
                if (error) { .. }
                else { .. }
            }
            this.servicios.autenticar(usuario, contrasena, call){

            }
        */
        this.servicios.autenticar(usuario, contrasena, (error, response) => {
            if (error) {
                alert('Usuario o contraseña incorrectos');
            } else {
                //this.usuarios.push(response.usuario);
                //agrega un campo al array
                console.log(response);
                if (response.status == 200) {
                    alert('¡Login exitoso!');
                    this.token = response.token;
                    this.cleanMain();
                    this.mostrarUsuarios(this.token);
                }
            }
        });
    }
    mostrarUsuarios(token) {
        this.servicios.obtenerUsuarios(token, (error, response) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
            } else {
                console.log(response);
                this.renderizarUsuarios(response);
            }
        });
    }
    cleanMain() {
        $("#mainlogin").html("");
    }
    renderizarUsuarios(usuarios) {
        usuarios.forEach(usuario => {
            const edad = parseInt(usuario.edad);
            const claseEdad = edad < 18 ? 'menor-edad' : '';
    
            $('#mainlogin').append(
                
            );
        });
    }
    
    renderizarUsuarios(usuarios) {
        usuarios.forEach(usuario => {
            $('#mainlogin').append(
                `<div class="usuario">
                    <div class="usuario-info">
                        <div>Entrenador: ${usuario.entrenador}</div>
                    </div>
                    <div class="pokemons">
                        ${usuario.pokemons.map(pokemon => `
                            <div class="pokemon">
                                <div class="pokemon-imagen">
                                    <img src="${pokemon.foto}" alt="${pokemon.nombre}">
                                </div>
                                <div class="pokemon-info">
                                    <div>Nombre: ${pokemon.nombre}</div>
                                    <div>Tipo: ${pokemon.tipo}</div>
                                </div>
                            </div>`).join('')}
                    </div>
                </div>`
            );
        });
    }    
    
    // funciones para IMPRIMIR vistas
    render() {
        this.renderLogin();
    }
    init() {
        this.render();
        //otras funcionalidades
        $('#btLogin').on('click', () => {
            this.login();
        });
    }
}

export default GestorUsuarios;