
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

    // Enable zoom effect
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img')
      }
    },

    // Enable gallery mode
    gallery: {
      enabled: true
    },

    // These callbacks control the slick slider jumping forward or backward
    // when the user jumps through the images in the gallery.
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
   * Images with js-image-popup class will open in magnific popup layer
   */
  $('.js-image-popup').magnificPopup({
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

  /**
   * Scroll-To Animation for elements with js-scroll class.
   *
   * Attributes:
   * href / data-target: Id of the target element to scroll to
   * data-scroll-speed: Anmiation duration
   * data-easing: Easing function to use
   */
  $('.js-scroll').on('click', function () {
    $element = $(this)
    scrollTarget = ''
    defaultScrollSpeed = 800
    defaultEasing = 'easeOutQuart'

    // Get target
    if (typeof $element.attr('href') !== 'undefined') {
      scrollTarget = $($element.attr('href'))
    } else {
      scrollTarget = $element.data('target')
    }

    // Set scroll speed and easing
    scrollSpeed = (typeof $element.data('scroll-speed') !== 'undefined') ? $element.data('scroll-speed') : defaultScrollSpeed
    easing = (typeof $element.data('easing') !== 'undefined') ? $element.data('easing') : defaultEasing

    // If target is found, scroll to it
    if (scrollTarget.length && $(scrollTarget).length) {
      $scrollTarget = $(scrollTarget)
      $('html, body').animate({
        scrollTop: $scrollTarget.offset().top
      }, scrollSpeed, easing)
    }
  })

  /**
   * Fire generic scroll event when window is scrolled
   */
  $(window).on('scroll', function () {
    initializeCounter()
    initializeProgress()
  })
})

initializeCounter = function () {
  scrollPosition = $(window).scrollTop() + $(window).height()

  $('.js-counter:not(.initialized)').each(function () {
    $item = $(this)
    itemPosition = $item.offset().top

    if (scrollPosition > itemPosition) {
      init = true
      start = $item.data('start')
      stop = $item.data('stop')
      ed = $item.data('ed')
      speed = $item.data('speed')
      step = start != parseInt(start) || stop != parseInt(stop) ? parseFloat($item.data('step')) : parseInt($item.data('step'));
      animateCounter(start, stop, speed, step, ed, $item)

      if (init === true) {
        $item.addClass('initialized')
      }
    }
  })
}

animateCounter = function (start, stop, speed, step, ed, el) {
  start = Math.min(stop, start + step)
  el.text(start + ed)

  if (start < stop) {
    setTimeout(function () {
      animateCounter(start, stop, speed, step, ed, el)
    }, speed)
  }
}

initializeProgress = function () {
  scrollPosition = $(window).scrollTop() + $(window).height()

  $('[role="progressbar"]:not(.initialized)').each(function () {
    $item = $(this)
    itemPosition = $item.offset().top

    if (scrollPosition > itemPosition) {
      init = true
      now = $item.data('valuenow')
      min = $item.data('valuemin')
      max = $item.data('valuemax')
      speed = $item.data('speed')
      animateProgress(now, min, max, speed, $item)

      if (init === true) {
        $item.addClass('initialized')
      }
    }
  })
}

animateProgress = function (now, min, max, speed, el) {
  startWidth = Math.round(min / max * 100)
  endWidth = Math.round(now / max * 100)

  el.animate(
    {width: endWidth + '%'},
    speed,
    'swing'
  )
}
