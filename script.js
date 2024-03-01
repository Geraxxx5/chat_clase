DOM = document;

let divContenedor = DOM.createElement("div");

DOM.body.appendChild(divContenedor);

DOM.body.style.margin = 0; 

divContenedor.id = "divPadre";
divContenedor.style.width = "100vw";
divContenedor.style.height = "100vh";
divContenedor.style.background = "#2f2c79";
divContenedor.style.border = "1px solid black";
divContenedor.style.display = "grid";
divContenedor.style.gridTemplateColumns = "20% 80%";
divContenedor.style.gridTemplateRows = "85% 15%";

let div = DOM.createElement("div");
div.id = "listado-chats";
div.style.background = "#2f2c79";
div.style.border = "1px solid black";
div.style.padding = "8px";
div.style.display = "flex";
div.style.flexDirection = "column";
div.style.overflow = "scroll";

let div2 = DOM.createElement("div");
div2.id = "mensaje";
div2.style.background = "#171a4a";
div2.style.border = "1px solid black";
div2.style.display = "flex";
div2.style.flexDirection = "column";
div2.style.alignItems = "flex-end";
div2.style.padding = "20px";
div2.style.overflow = "scroll";


let div3 = DOM.createElement("div");
div3.id = "contenido-perfil";
div3.style.background = "#1c4c96";
div3.style.display = "flex";
div3.style.justifyContent = "space-around";
div3.style.alignItems = "center";

let div4 = DOM.createElement("div");
div4.id = "contenido-chat";
div4.style.background = "#2f2c79";
div4.style.border = "1px solid black";
div4.style.display = "flex";
div4.style.justifyContent = "space-evenly";

let textoArea = DOM.createElement("textarea");
textoArea.id = "mensajeUsuario";
textoArea.style.width = "90%";
textoArea.style.height = "90%";
textoArea.setAttribute('maxLength', '140');

let imgPerfil = DOM.createElement("img");
imgPerfil.style.width = "65px";
imgPerfil.style.height = "65px";
imgPerfil.src = "https://i.pinimg.com/736x/42/6e/f1/426ef1322c4685acdb1134f2ee9ce288.jpg";
imgPerfil.style.borderRadius = "50%";

let nom = DOM.createElement("h3");
nom.innerText = "Gerax";

let but = DOM.createElement("button");
but.id = "butEnv"
but.innerText = "Enviar";
but.onclick

let divp = document.getElementById("divPadre");
if(divp){
    divp.appendChild(div);
    divp.appendChild(div2);
    divp.appendChild(div3);
    divp.appendChild(div4);
}

let divChat = document.getElementById("contenido-chat");
if(divChat){
    divChat.appendChild(textoArea);
    divChat.appendChild(but);
}

let contImagen = document.getElementById("contenido-perfil")
if(contImagen){
    contImagen.appendChild(imgPerfil)
    contImagen.appendChild(nom);
}

async function obtenerMensajes(){
    let data = await fetch('http://uwu-guate.site:3000/messages',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let posts = await  data.json();
    console.log(posts);
    return posts;
}

function validarURLImagen(url) {
    const extensionesImagen = /\.(png|jpg|jpeg|gif)$/i;
    return extensionesImagen.test(url);
}

async function crearChatsMensajes(){
    let mensajes = await obtenerMensajes();
    let divMensajes = document.getElementById("mensaje");
    let personasExistentes = [];
    if(divMensajes){
        mensajes.map(post=>{
            if(!personasExistentes.includes(post.username)){
                personasExistentes.push(post.username);
            } 
            if(validarURL(post.content)){
                console.log("Es un url: "+post.content)
                if(validarURLImagen(post.content)){
                    console.log("Esto es una imagen")
                }
            }
            let nuevoMensjae = userMessage(post.content);
            if(post.username != "Gerax"){
                nuevoMensjae.style.alignSelf = "flex-start";
            }
            return nuevoMensjae;
        }
        )
        .forEach(element =>{
            //divMensajes.style.
            divMensajes.appendChild(element);
        })
    }
    let divPersonas = document.getElementById("listado-chats");
    if(divPersonas){        
        // recorremos los nuevos chats y los agremos al div de listados
        
        personasExistentes.forEach(element => {
            let nuevoChat = crearChat(element);
            divPersonas.appendChild(nuevoChat);
        });
    }
    let ultimoMensaje = divMensajes.lastChild;
    ultimoMensaje.scrollIntoView();
}
//"Nix is a tool that takes a unique approach to package management and system configuration. Learn how to make reproducible, declarative and reliable systems.",
//"https://nixos.org/logo/nixos-lores.png"
//"Nix & NixOS | Reproducible builds and deployments"
//"https://nixos.org/"


function crearChat(texto){ //id
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "chat";
    nuevoChat.style.width = "100%";
    nuevoChat.style.minHeight = "60px";
    nuevoChat.style.borderRadius = "8px";
    nuevoChat.style.background = "cyan";
    nuevoChat.style.border = "1px solid black";
    nuevoChat.style.marginBottom = "8px";
    nuevoChat.innerText = texto;
    return nuevoChat;
}

function validarURL(str) {
    const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    return patron.test(str);
}

async function fetchUrlData(Url){
    const requestURL = `https://api.linkpreview.net/?fields=image_x,icon_type,locale&q=${Url}`
    const webPage = await fetch(requestURL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', 
        'X-Linkpreview-Api-Key': "2e98754ab38dbdc755565f14dce36137"}
    }) 
    const urlInfo = await webPage.json()
    console.log(urlInfo)
    return urlInfo
    //const dummy = '{"title":"Title","description":"Esto es una descripcion","image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGxjNzl6a2E4ZWxrczRqazlwOXU3b2JhMWp3emhiajNmN3dqcW1qeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XD16Yi4PaP6s67JSaQ/giphy.gif","url":"youtube.com"}'
    //return JSON.parse(dummy)
}

function userMessage(message){
    let nuevoMensaje = document.createElement("div");
    nuevoMensaje.style.width = "fit-content";
    nuevoMensaje.style.maxWidth = "200px";
    nuevoMensaje.style.minWidth = "20px";
    nuevoMensaje.style.padding = "5px"
    nuevoMensaje.style.overflowWrap = "break-word";
    if(validarURL(message)){
        if(validarURLImagen(message)){
            nuevoMensaje.style.maxWidth = "500px";
            let img = document.createElement("img");
            img.style.maxWidth = "100%";
            img.src = message;
            nuevoMensaje.appendChild(img);
        }else{
            fetchUrlData(message).then(data =>{
                let url = createCointerUrl(data.description,data.image,data.title,data.url);
                nuevoMensaje.appendChild(url);
            })
            
            //let url = document.createElement("iframe");
            //url.src = message;
            //url.target = "_blank";
            //url.innerText = message;
            nuevoMensaje.style.maxWidth = "600px";
            //url.style.maxWidth = "100%";
            //nuevoMensaje.appendChild(url);
        }
    }else{
        if(message.includes("http://") || message.includes("https://")){
            p = message.split("https://");
            console.log("INCLUYE HTTP");
            for (let i = 0; i < p.length; i++) {
                console.log(i,p[i]);
                let element = null
                if(validarURL(p[i])){
                    if(validarURLImagen(p[i])){
                        console.log("ESTO ENTRO COMO IMAGEN: "+p[i])
                        nuevoMensaje.style.maxWidth = "500px";
                        element = document.createElement("img");
                        element.style.maxWidth = "100%";
                        element.src = p[i];
                        nuevoMensaje.appendChild(element);
                    }else{
                        //element = document.createElement("iframe");
                        //console.log("PAGINA WEB: "+p[i]);
                        //element.src = "https://"+p[i];
                        fetchUrlData("https://"+p[i]).then(data =>{
                            let url = createCointerUrl(data.description,data.image,data.title,data.url);
                            nuevoMensaje.appendChild(url);
                        })
                        //element.target = "_blank";
                        //element.innerText = message;
                        nuevoMensaje.style.maxWidth = "600px";
                        //element.style.maxWidth = "100%";
                        //nuevoMensaje.appendChild(element);
                    }
                }else{
                    let element = document.createElement('p');
                    let miTexto = document.createTextNode(p[i]);
                    element.appendChild(miTexto)
                    nuevoMensaje.appendChild(element)
                }
            }
        }else{
            nuevoMensaje.innerText = message
        } 
    }
    nuevoMensaje.style.borderRadius = "8px";
    nuevoMensaje.style.background = "cyan";
    nuevoMensaje.style.border = "1px solid black";
    nuevoMensaje.style.marginBottom = "8px";
    nuevoMensaje.animate([
        { opacity: '0' }, 
        { opacity: '1' }
    ], { 
        duration: 1000
    });
    return nuevoMensaje;
}

async function pushMessage(message, user){
    let item = {
        "username":user,
        "message":message
    }
    let data = await fetch('http://uwu-guate.site:3000/messages',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
}

function sendMessage(){
    let message = document.getElementById("mensajeUsuario").value;
    if(message != ""){
        let divMensaje = document.getElementById("mensaje");
        pushMessage(message, "Gerax");
        divMensaje.appendChild(userMessage(message));
        let ultimoMensaje = divMensaje.lastChild;
        ultimoMensaje.scrollIntoView();
    }
    textoArea.value = "";
}

function createCointerUrl(description, image,title, url){
    let containar = document.createElement("div");
    containar.style.display = 'flex';;
    containar.style.flexDirection = 'column';
    // containar.style.maxWidth = '500px';
    // containar.style.borderRadius = "8px";
    // containar.style.background = "cyan";
    // containar.style.border = "1px solid black";
    // containar.style.marginBottom = "8px";
    let header = document.createElement('a');
    header.style.fontFamily = 'sans-serif';
    header.innerText = title;
    header.src = url;
    header.target = "_blank";
    containar.appendChild(header);
    let containerImage = document.createElement("div");
    containerImage.style.display = 'flex';
    containerImage.style.flexDirection = 'row';
    let img = document.createElement('img');
    img.style.width = '20%';
    img.style.margin = "20px";
    img.src = image;
    let descrip = document.createElement('p');
    descrip.style.justifyContent = 'flex-end';
    descrip.innerText = description;
    containerImage.appendChild(img);
    containerImage.appendChild(descrip);
    containar.appendChild(containerImage);
    return containar;
}
//"Nix is a tool that takes a unique approach to package management and system configuration. Learn how to make reproducible, declarative and reliable systems.",
//"https://nixos.org/logo/nixos-lores.png"
//"Nix & NixOS | Reproducible builds and deployments"
//"https://nixos.org/"

let buttonEnviar = DOM.getElementById("butEnv");

buttonEnviar.addEventListener('click',sendMessage);

textoArea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        buttonEnviar.click();
    }
});
crearChatsMensajes();
function refreshMessage(){
    let divMensajes = document.getElementById("mensaje");
    let divPersonas = document.getElementById("listado-chats");
    if(divMensajes){
        divMensajes.innerHTML = "";
    }
    if(divPersonas){
        divPersonas.innerHTML = "";
    }
    crearChatsMensajes();
    setTimeout(refreshMessage, 5000);
}
setTimeout(refreshMessage, 5000);


