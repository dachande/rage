
global.$ = global.jQuery = require('jquery')
var bootstrap = require('bootstrap')
var slick = require('slick-carousel')
var magnificPopup = require('magnific-popup')

$(document).ready(function () {
  /**
   * Initialize slideshow(s) with slick carousel
   */
  $('.Slideshow').slick({
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    swipeToSlide: true,
    focusOnSelect: true,
    lazyLoad: 'ondemand'
  })

  /**
   * Slideshow images will open in a magnific popup layer
   */
  $('.Slideshow').magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-with-zoom',

    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img')
      }
    },

    gallery: {
      enabled: true
    }
  })

  /**
   * Images with Image__Link--Popup class will open in magnific popup layer
   */
  $('.Image__Link--Popup').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom',

    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img')
      }
    }
  })

  /**
   * Videos will open in a magnific popup layer
   */
  $('.Video__Link').magnificPopup({
    type: 'iframe'
  })
})
