/**
  @author Alisson Costa de Oliveira Júnior <alisson.coj@hotmail.com>
  @desc Buscador de dados de uma localidade a partir do zipcode
*/
let zipCodeNow = (() => {

  /**
  * @desc faz a pesquisa sobre a cidade junto ao wikipedia
  * @param {String} city_name - nome da cidade a ser pesquisada
  */
  function wikipediaData(city) {
    let city_name = city.localidade;
    return new Promise((resolve, reject) => {
      fetch(`https://pt.wikipedia.org/w/api.php?action=opensearch&format=json&search=${city_name}&namespace=0&limit=1`).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            city.wikipedia = {
              about: data[2][0],
              link: data[3][0]
            };
            resolve(city);
          });
        }
      }).catch((error) => {
        reject(error);
      });
    });

  }

  function cepData(cep) {

  }

  return {

    find: (cep) => {
      return new Promise((resolve, reject) => {

        fetch(`//viacep.com.br/ws/${cep}/json/`).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              wikipediaData(data).then((res) => {
                resolve(res);
              });
            });
          } else {
            reject({error: true});
          }
        }).catch((error) => {
          reject(error);
        });

      });
    }

  };

})();
