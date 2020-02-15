const baseUrl = "https://api.github.com/users/";
const nameIdRoot = "mainroot";

document.getElementById("button-submit").addEventListener("click", function(e) {
	let myUrl = baseUrl + document.getElementById("text-value").value;
	const myPromise = Get(myUrl);
})

function Get(yourUrl){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", yourUrl);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  }).then(
		function(response) {
			const json_obj = JSON.parse(response);
			replaceImage(json_obj["avatar_url"]);
			writeInfo(nameIdRoot, json_obj);
		},
		function(error) {
			console.log("Si è verificato l'errore " + error.message);
		}	
	);
};

const replaceImage = function (image_url) {
	document.getElementById("user-image").src = image_url;
}

const writeInfo = function (divName, objJsonFormat) {
	const myDiv = document.getElementById(divName);
	myDiv.innerHTML = "";
	for (key in objJsonFormat) {
		if(objJsonFormat[key]){
		var node = document.createElement("li");
			node.innerHTML = ("<strong>" + key + ": " + "</strong>" + "<span class=\"mylist\">" + objJsonFormat[key] + "</span>");
		}
		myDiv.appendChild(node);
	};
};
