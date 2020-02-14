/*["login"]
["id"]
["node_id"]
["avatar_url"]
["gravatar_id"]
["url"]
["html_url"]
["followers_url"]
["following_url"]
["gists_url"]
["starred_url"]
["subscriptions_url"]
["organizations_url"]
["repos_url"]
["events_url"]
["received_events_url"]
["type"]
["site_admin"]
["name"]
["company"]
["blog"]
["location"]
["email"]
["hireable"]
["bio"]
["public_repos"]
["public_gists"]
["followers"]
["following"]
["created_at"]
["updated_at"]*/

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
let json_obj = '';

myPromise.then(
	function(response) {
		json_obj = JSON.parse(response);
		console.log(json_obj);
    	console.log(json_obj["avatar_url"]);
    	console.log('DOM completamente caricato e analizzato');
		document.getElementById("user-image").src = json_obj["avatar_url"];
	},
	function(error) {
		console.log("Si è verificato l'errore " + error.message);
	}
);


console.log('hi,man');

console.log('goodbye,man');


/*
function httpGet(url) {
	return new Promise(function(resolve, reject) {
		var httpReq = new XMLHttpRequest();
		httpReq.onreadystatechange = function() {
			var data;
			if (httpReq.readyState == 4) {
				if (httpReq.status == 200) {
					data = JSON.parse(httpReq.responseText);
					resolve(data);
				} else {
					reject(new Error(httpReq.statusText));
				}
			}
		};
		httpReq.open("GET", url, true);
		httpReq.send();
	});
}

*/