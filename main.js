const baseUrl = "https://api.github.com/users/";
const fakeUrl = "ghismo.json"
const nameIdRoot = "mainroot";

const isDEVELOP = false;
let keyword = '';

document.getElementById("button-submit").addEventListener("click", function(e) {
	doSearch();
})

document.getElementById("text-value").addEventListener("keyup", function(event) { //search clicking enter key
  if (event.keyCode === 13) {
    event.preventDefault();
    doSearch();
  }
});

function doSearch() {
	keyword = document.getElementById("text-value").value;
	if (keyword == "") {
		return;
	}
	let myUrl = baseUrl + keyword;

	if (isDEVELOP === true) {
		getFakeJson(fakeUrl);
	} else {
		callApi(myUrl);
	}

	document.getElementById("text-value").value = '';
}

function callApi(yourUrl){
	fetch(yourUrl)
	.then(response => response.json())
  	.then(function(data) {
		let json_obj = data;
		replaceImage(json_obj["avatar_url"]);
		writeInfo(json_obj);
	  	})
	.catch(err => {
		console.log("Error fetch: " + err)
	});
};

const replaceImage = function (image_url) {
	if (image_url === undefined || image_url === null) {
		image_url = "errorGitHub.png";
	}
	document.getElementById("user-image").src = image_url;
}

const writeInfo = function (objJsonFormat) {
	const myDivRoot = document.getElementById(nameIdRoot);
	const myList = document.getElementById("mainlist");
	myList.innerHTML = "";
	myDivRoot.innerHTML = "<h3 class=\"my-keyword\">" + keyword + "<br></h3>";
	for (key in objJsonFormat) {
		if(objJsonFormat[key]){
		var node = document.createElement("li");
			node.innerHTML = ("<strong>" + key + ": " + "</strong>" + "<p class=\"mylist\">" + objJsonFormat[key] + "</p>");
		}
		myList.appendChild(node);
	};
};

//----- only for development purpose -----
function getFakeJson(fakeUrl) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", fakeUrl);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	  }).then(
			function(response) {
				const json_obj = JSON.parse(response);
				replaceImage(json_obj["avatar_url"]);
				writeInfo(json_obj);
			},
			function(error) {
				console.log("Si è verificato l'errore " + error.message);
			}
		);
}
//--------------------------------------------