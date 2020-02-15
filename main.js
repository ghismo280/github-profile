var myUrl = "https://api.github.com/users/ghismo280"


function Get(yourUrl){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", yourUrl);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

let myPromise = Get(myUrl);

const replaceImage = function (image_url) {
	document.getElementById("user-image").src = image_url;
}
const writeInfo = function (divName, objJsonFormat) {
	const myDiv = document.getElementById(divName);
	Object.keys(objJsonFormat).forEach(function(element,index, value) {
		var node = document.createElement("li");
		if(objJsonFormat[element]){
			node.innerHTML = ("<strong>"+element+"</strong>" + ": " + "<span class=\"mylist\">" + objJsonFormat[element] + "</span>");
		}
		myDiv.appendChild(node);
	});

	};

myPromise.then(
	function(response) {
		let json_obj = JSON.parse(response);
		replaceImage(json_obj["avatar_url"]);
		writeInfo("mainroot", json_obj);
	},
	function(error) {
		console.log("Si è verificato l'errore " + error.message);
	}
);