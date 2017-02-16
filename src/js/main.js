(function () {

  'use strict';

  var fonts = [
    "Bahiana",
    "Droid Serif",
    "Rokkitt",
    "Shadows Into Light",
    "Amatic SC"
  ];

  var colors = [
    // vermelho
    "#ff3700",
    // verde cana
    "#7cd600",
    // roxo
    "#9700d3",
    // azul lago
    "#00ed82"
  ];

  /**
  * @desc change the font of a element
  * @param {String} element
  * @param {String} font
  */
  function changeElementFont(element, font){

    document.getElementById(element).style.fontFamily = font;

  }

  /**
  * @desc change the color of a element
  * @param {String} element
  * @param {String} color
  */
  function changeElementColor(element, color){

    document.getElementById(element).style.color = color;

  }


  function innit() {

    // innit color setings
    var step_color_index = Math.floor(Math.random() * colors.length);

    var default_color = colors[step_color_index];

    changeElementColor('title_logo', default_color);

    // /////////////////////

    // innit font setings
    var step_font_index = Math.floor(Math.random() * fonts.length);

    changeElementFont('title_logo', fonts[step_font_index]);


  }

  innit();


  setInterval(function(){

    var step_font_index = Math.floor(Math.random() * colors.length);


  },1000);

})();
