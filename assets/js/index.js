
global.$ = global.jQuery = require('jquery')

var bootstrap = require('bootstrap')
var slick = require('slick-carousel')
var magnificPopup = require('magnific-popup')
var easing = require('jquery.easing')

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
    focusOnSelect: true
  })

  /**
   * Slideshow images will open in a magnific popup layer
   */
  $('.Slideshow').magnificPopup({
    delegate: '.slick-slide:not(.slick-cloned) .Slideshow__Slide a',
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
    },

    callbacks: {
      beforeOpen: function () {
        this.lastIndex = this.index
        $('.Slideshow').slick('slickSetOption', {
          speed: 100
        })
      },
      beforeClose: function () {
        $('.Slideshow').slick('slickSetOption', {
          speed: 300
        })
      },
      change: function () {
        if (this.lastIndex != this.index) {
          if (this.index > this.lastIndex) {
            if (this.index == (this.items.length - 1) && this.lastIndex == 0) {
              $('.Slideshow').slick('prev')
            } else {
              $('.Slideshow').slick('next')
            }
          } else {
            if (this.index == 0 && this.lastIndex == (this.items.length - 1)) {
              $('.Slideshow').slick('next')
            } else {
              $('.Slideshow').slick('prev')
            }
          }

          this.lastIndex = this.index
        }
      }
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
