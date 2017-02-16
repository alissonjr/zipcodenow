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

            resolve(json);

          } else {

            reject(http);

          }
        };

        http.send(null);

      });

    }

  };

})();
