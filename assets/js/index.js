
global.$ = global.jQuery = require('jquery')
var bootstrap = require('bootstrap')
var slick = require('slick-carousel')

$(document).ready(function () {
  var $videoModal = $('.Video__Modal')

  $videoModal
    .each(function (e) {
      var $modal = $(this)
      var $iframe = $modal.find('iframe')
      var iframeSrc = $iframe.attr('src')

      $modal.data('src', iframeSrc)
      $iframe.attr('src', '')
    })

    .on('show.bs.modal', function (e) {
      $modal = $(this)
      $modal.find('iframe').attr('src', $modal.data('src'))
    })

    .on('hidden.bs.modal', function (e) {
      $modal = $(this)
      $modal.find('iframe').attr('src', '')
    })

  $('.Slideshow').slick({
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    swipeToSlide: true,
    focusOnSelect: true
  })
})
