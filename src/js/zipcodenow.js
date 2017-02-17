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
            var wikipedia = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + json.localidade + "&namespace=0&limit=1";

            var http2 = new XMLHttpRequest();

            http2.open("GET", wikipedia, true);

            http2.onreadystatechange = function() {
              if (http2.status === 200) {
                json.wikipedia = JSON.parse(http2.response) || "";
                resolve(json);
              }
            }

            http2.send(null);



          } else {

            reject(http);

          }
        };

        http.send(null);

      });

    }

  };

})();
