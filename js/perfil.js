"use strict";
var text = window.location.search.split("=");
var id = text[1];
const contentImage = document.getElementById("imgPoke");
var validImages = [];
fetch("https://pokeapi.co/api/v2/pokemon/" + id + "/")
    .then((data) => data.json())
    .then((data) => {
        console.info(data);
        document.getElementById("name").innerText = data.name.toUpperCase();
        buildSpritesPokemon(data.sprites);
        buildAbilities(data.abilities);
        buildTypes(data.types);
    });

function buildSpritesPokemon(images) {
    for (const property in images) {
        var url = property.toString();
        if (property == "versions" || property == "other") {
            break;
        } else {
            if (images[property] !== null && typeof images[property] !== "undefined") {
                validImages.push(images[url]);
            }
        }
    }
    viewSpritesPokemon();
}

function viewSpritesPokemon() {
    var flag = 0;
    setInterval(function() {
        contentImage.setAttribute('src', validImages[flag]);
        if (flag == validImages.length - 1) {
            flag = 0;
        } else {
            flag += 1;
        }
    }, 500)
}

function buildAbilities(abilities) {
    let text = "<ul>";
    abilities.forEach((ability, i) => {
        text += "<li>" + ability.ability.name.toUpperCase() + ": <a href='" + ability.ability.url + "' target='_BLANK'> Ver mas...</a></li>";
        console.info(ability.ability.name);
    })
    text += "</ul>";
    console.info(text);
    document.getElementById("abilities").innerHTML = text;
}

function buildTypes(Types) {
    let text = "<ul>";
    Types.forEach((type, i) => {
        text += "<li>" + type.type.name.toUpperCase() + ": <a href='" + type.type.url + "' target='_BLANK'> Ver mas...</a></li>";
    })
    text += "</ul>"
    console.info(text);
    document.getElementById("types").innerHTML = text;
}