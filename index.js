const textarea = document.querySelector("#text");
const btnEncrypt = document.querySelector(".encrypt");
const btnDecrypt = document.querySelector(".decrypt");
const btnCopy = document.querySelector(".copy");
const encryptedTextarea = document.querySelector("#encrypted-textarea");
const cardContent = document.querySelector(".card__content");

function showTextEncrypted(textareaValue) {
    // Verifica si el texto no es una cadena vacía
    if (textareaValue !== "") {
        // Elimina la clase "hidden" del textarea
        encryptedTextarea.classList.remove("hidden");
        // Esconde el contenido de la card
        cardContent.style.display = "none";
    } else {
        // Añade la clase "hidden" al textarea
        encryptedTextarea.classList.add("hidden");
        // Muestra el contenido de la card
        cardContent.style.display = "flex";
    }
    // Asigna el valor del texto pasado por parametro al textarea que contendrá el texto ya encriptado
    encryptedTextarea.value = textareaValue;
}

function showTextarea(textareaValue) {
    //Verifica si el valor del campo de texto "encryptedTextarea" está vacío.
    if (encryptedTextarea.value == "") {
        //Si es así, se agrega la clase "hidden" al campo de texto "encryptedTextarea" y se establece la propiedad "display" del elemento "cardContent" en "flex".
        encryptedTextarea.classList.add("hidden");
        cardContent.style.display = "flex";
    }
    //Finalmente, se establece el valor del campo de texto "textarea" con el valor del argumento "textareaValue".
    textarea.value = textareaValue;
}

//Función que verifica si el texto posee acentos y en caso de que sí, las reemplaza por caracteres sin acento. 
function checkText(textareaValue) {
    let newText = textareaValue.replace(/á/g, "a")
                            .replace(/é/g, "e")
                            .replace(/í/g, "i")
                            .replace(/ó/g, "o")
                            .replace(/ú/g, "u")
    return newText;
}

//Código de encriptación
function encryptText(textareaValue) {
    let cleanText = checkText(textareaValue);
    // Utilizamos el método replace() para buscar y reemplazar las letras "a", "e", "i", "o", y "u" con las cadenas especificadas en el código
    let newText = cleanText.replace(/a/g, "ai")
                        .replace(/e/g, "enter")
                        .replace(/i/g, "imes")
                        .replace(/o/g, "ober")
                        .replace(/u/g, "ufat");
    // Asignamos el texto encriptado en el elemento encryptedTextarea
    textareaValue = newText;
    showTextEncrypted(textareaValue);
}

//Código de desencriptación
function decryptText(textareaValue) {
    let cleanText = checkText(textareaValue);
    // Utilizamos el método replace() para hacer lo opuesto en la función encryptText
    // Es importante hacerlo en orden inverso para evitar que algunas de las cadenas de encriptación sean reemplazadas por otras cadenas de encriptación
    let newText = cleanText.replace(/ufat/g, "u")
                        .replace(/ober/g, "o")
                        .replace(/imes/g, "i")
                        .replace(/enter/g, "e")
                        .replace(/ai/g, "a");
    // Asignamos el texto desencriptado en el elemento encryptedTextarea
    textareaValue = newText;
    showTextEncrypted(textareaValue);
}

function copyText(value) {
    //Se declara una variable "originalText" y almacena el contenido actual del botón "btnCopy" 
    let originalText = btnCopy.innerHTML;
    //Verifica si el campo de texto no está vacío
    if (value !== "") {
        //Selecciona el campo de texto "encryptedTextarea" y establece su rango de selección desde el caracter 0 hasta el 999.
        encryptedTextarea.select();
        encryptedTextarea.setSelectionRange(0, 999);
        //Utiliza el método "writeText" del objeto "navigator.clipboard" para escribir el valor del campo de texto "encryptedTextarea" en el portapapeles del sistema.
        navigator.clipboard.writeText(value);
        //Cambia el contenido del botón "btnCopy" a "¡Texto copiado!"
        btnCopy.innerHTML = "¡Texto copiado!";
        //Establece una función que cambiará el texto de "bntCopy" a su valor original.
        setTimeout(function() {
            btnCopy.innerHTML = originalText;
        }, 1000);
    }
}

//Se agregan Event Listeners a los botones para llamar a las funciones que necesitemos

btnEncrypt.addEventListener("click", () => {
    encryptText(textarea.value);
});

btnDecrypt.addEventListener("click", () => {
    decryptText(textarea.value);
});

btnCopy.addEventListener("click", function() {
    copyText(encryptedTextarea.value);
});