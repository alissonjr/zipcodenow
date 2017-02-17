var zipCodeNow = (function () {

  return {

    find: function (cep) {

      return new Promise(function (resolve, reject) {

        var http = new XMLHttpRequest();

        var url = "//viacep.com.br/ws/" + cep + "/json/";

        http.open("GET", url, true);

        http.onreadystatechange = function() { //Call a function when the state changes.

          if (http.status === 200) {

            var json = JSON.parse(http.response);


            // var wikipedia = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=" + json.localidade;
            var wikipedia = "https://pt.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + json.localidade + "&namespace=0&limit=1";


            var http_wiki = new XMLHttpRequest();

            http_wiki.open("GET", wikipedia, true);

            http_wiki.onreadystatechange = function() {
              if (http_wiki.status === 200) {

                json.wikipedia = {
                  about: JSON.parse(http_wiki.response)[2][0] || "",
                  link: JSON.parse(http_wiki.response)[3][0] || ""
                }

                resolve(json);

              }
            }

            http_wiki.send(null);



          } else {

            reject(http);

          }
        };

        http.send(null);

      });

    }

  };

})();
