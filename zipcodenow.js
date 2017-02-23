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
    var city_name = city.localidade;
    return new Promise(function (resolve, reject) {
      fetch("https://pt.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + city_name + "&namespace=0&limit=1").then(function (response) {
        if (response.status === 200) {
          response.json().then(function (data) {
            city.wikipedia = {
              about: data[2][0],
              link: data[3][0]
            };
            resolve(city);
          });
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  function cepData(cep) {}

  return {

    find: function find(cep) {
      return new Promise(function (resolve, reject) {

        fetch("//viacep.com.br/ws/" + cep + "/json/").then(function (response) {
          if (response.status === 200) {
            response.json().then(function (data) {
              wikipediaData(data).then(function (res) {
                resolve(res);
              });
            });
          } else {
            reject({ error: true });
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    }

  };
}();
//# sourceMappingURL=zipcodenow.js.map
