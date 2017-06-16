(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    $(document).ready(function () {

      // Form Validation Start
      $('input[name=name]').keyup(function() {

        var input_value = this.value;
        var parent_name = $(this).closest(".form-group");
        var ck_name = /^[A-Za-z0-9]{3,20}$/;

        if (!ck_name.test(input_value)) {

          parent_name.addClass("has-error complete");
          parent_name.removeClass("complete");

        }  else {

          parent_name.removeClass("has-error");
          parent_name.addClass("complete");

        }

      });

      var phone_parent = $("#phone").closest(".form-group");

      $("#phone").inputmask(
          "+3 8(099)999-99-99", {
            "placeholder": "_",
            "oncomplete": function(){
              phone_parent.removeClass('has-error');
              phone_parent.addClass('complete');
            },
            "onincomplete": function(){
              phone_parent.addClass('has-error');
              phone_parent.removeClass("complete");
            },
            "onKeyValidation": function (key, result) {
              if(!result && !phone_parent.hasClass('complete') ) {
                phone_parent.addClass('has-error');

              } else {
                phone_parent.removeClass('has-error');
              }
            }
      });

      // If input has no error, button 'disabled' attribute will be removed
      $("form").keyup(function(){
        if(phone_parent.hasClass('complete') && $('input[name=name]').closest(".form-group").hasClass('complete')) {
          $('.nextBtn').removeAttr("disabled");
        } else {
          $('.nextBtn')[0].setAttribute('disabled', 'disabled');
        }
      });
      // Form Validation End


      var allWells = $('.setup-content'),
          allTitles = $('.stepwizard-step p'),
          allNextBtn = $('.nextBtn'),
          allPrevBtn = $('.prevBtn');

      allWells.hide();

      $(allTitles[0]).addClass('title-active');
      $(allWells[0]).show();

      var i = 0;

      function nextItem() {
        i = i + 1;
        i = i % $(allWells).length;
        $(allWells[i]).show();

        var active = document.querySelector(".title-active");
        active.classList.remove("title-active");

        $(allTitles[i]).addClass('title-active');
      }

      function prevItem() {
        if (i === 0) {
          i = $(allWells[0]).length;
        }
        i = i - 1;
        $(allWells[i]).show();

        var active = document.querySelector(".title-active");
        active.classList.remove("title-active");

        $(allTitles[i]).addClass('title-active');
      }

      allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content");
        curStep.hide();
        nextItem();
      });
      allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content");
        curStep.hide();
        prevItem();
      });

      $('.nextBtn, .prevBtn').click(function() {
        initMap();
      });

      //Hack - prevent jump on an anchor link click
      var hash = window.location.hash;
      var link = $('a');
      //pass event here
      $('a').click(function(e) {
        e.preventDefault();
        hash = "#"+link.attr("href");
      });

    });
  });

})(jQuery, window, document);
