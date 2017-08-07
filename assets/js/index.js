
global.$ = global.jQuery = require('jquery')
var bootstrap = require('bootstrap')

$(document).ready(function () {
  $videoModal = $('.video-modal')

  $videoModal
    .each(function (e) {
      console.log('each')

      var $modal = $(this)
      var $iframe = $modal.find('iframe')
      var iframeSrc = $iframe.attr('src')

      $modal.data('src', iframeSrc)
      $iframe.attr('src', '')
    })

    .on('show.bs.modal', function (e) {
      $modal = $(this)

      console.log('show')
      console.log($modal.data('src'))

      $modal.find('iframe').attr('src', $modal.data('src'))
    })

    .on('hidden.bs.modal', function (e) {
      $modal = $(this)

      console.log('hide')

      $modal.find('iframe').attr('src', '')
    })
})
