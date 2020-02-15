const baseUrl = "https://api.github.com/users/";
const nameIdRoot = "mainroot";
let keyword = '';

document.getElementById("button-submit").addEventListener("click", function(e) {
	keyword = document.getElementById("text-value").value;
	let myUrl = baseUrl + keyword;
	const myPromise = Get(myUrl);
	document.getElementById("text-value").value = '';
})

document.getElementById("text-value").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button-submit").click();
  }
});

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
	console.log(image_url);
	if (image_url === undefined) {
		image_url = "errorGitHub.png";
	}
	document.getElementById("user-image").src = image_url;
}

const writeInfo = function (divName, objJsonFormat) {
	const myDiv = document.getElementById(divName);
	myDiv.innerHTML = "";
	var nodeSearch = document.createElement("h3");
	nodeSearch.innerHTML = "<span class=\"my-keyword\">" + keyword + "</span><br>";
	myDiv.appendChild(nodeSearch);
	for (key in objJsonFormat) {
		if(objJsonFormat[key]){
		var node = document.createElement("li");
			node.innerHTML = ("<strong>" + key + ": " + "</strong>" + "<span class=\"mylist\">" + objJsonFormat[key] + "</span>");
		}
		myDiv.appendChild(node);
	};
};

