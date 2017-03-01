"use strict";

/**
  @author Alisson Costa de Oliveira Júnior <alisson.coj@hotmail.com>
  @desc Buscador de dados de uma localidade a partir do zipcode
*/
var zipCodeNow = function () {

  /**
  * @desc faz a pesquisa sobre a cidade junto ao wikipedia
  * @param {String} city_name - nome da cidade a ser pesquisada
  */
  function wikipediaData(city) {
    return new Promise(function (resolve, reject) {
      var city_name = city.localidade;
      fetch("https://pt.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + city_name + "&namespace=0&limit=1").then(function (response) {
        if (response.status === 200) {
          console.log(response);
          response.json().then(function (data) {
            city.wikipedia = {
              about: data[2][0],
              link: data[3][0]
            };
            resolve(city);
          });
        } else {
          resolve(city);
        }
      }).catch(function () {
        resolve(city);
      });
    });
  }

  /**
  * @desc faz a pesquisa sobre a cidade junto ao wikipedia
  * @param {String} city_name - nome da cidade a ser pesquisada
  */
  function cepData(cep) {
    return new Promise(function (resolve, reject) {
      fetch("//viacep.com.br/ws/" + cep + "/json/").then(function (response) {
        if (response.status === 200) {
          response.json().then(function (data) {
            resolve(data);
          });
        } else {
          reject({ error: true });
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  return {

    find: function find(cep) {
      return cepData(cep).then(wikipediaData).then(function (response) {
        return response;
      });
    }

  };
}();
//# sourceMappingURL=zipcodenow.js.map
