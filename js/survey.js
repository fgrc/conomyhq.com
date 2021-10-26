$(document).ready(function(){
    var _originalSize = $(window).width() + $(window).height()
    $(window).resize(function(){
      if($(window).width() + $(window).height() != _originalSize){
        console.log("keyboard show up");
        // $(".intro-animation-line").css("display","none"); 
      }else{
        console.log("keyboard closed");
        $(".intro-animation-line").css("display","flex");  
      }
    });
  });

$(document).ready(function () {

    // fix focus on input


    $('.form__submit_1').click(function(){ 
        // $('.form_1').click();
        let promiseForm = new Promise(function(){
            $('.form_1').click();
        });
        promiseForm.then(
             setTimeout(function(){
                $(".form__row-border-inline").css("top", $(".form__input-line").outerHeight() + $("#mce-responses").outerHeight()+4)
             },2000)
        );

    })
    
    $('.form__submit_2').click(function(){  
        $('.form_2').click();
    })



    const formInputHeight = $(".form__input").outerHeight();
    const formInputLineHeight = $(".form__input-line").outerHeight();
    const labelHeight = $(".form__label").outerHeight();
    const heightFormRow = formInputHeight + labelHeight;
    const responseEmail = $("#mce-responses").outerHeight();

    $(".form__row-border").css("top", heightFormRow);
    console.log(responseEmail);

    $(".form__row-border-inline").css("top", formInputLineHeight+responseEmail);
    (function ($) {
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = 'EMAIL';
        ftypes[0] = 'email';
        fnames[1] = 'FNAME';
        ftypes[1] = 'text';
        fnames[2] = 'LNAME';
        ftypes[2] = 'text';
    }(jQuery));

    var $mcj = jQuery.noConflict(true);
    $mcj.extend($mcj.validator.messages, {
        required: "Este campo es obligatorio.",
        remote: "Por favor, rellena este campo.",
        email: "Por favor, escribe una dirección de correo válida.",
        url: "Por favor, escribe una URL válida.",
        date: "Por favor, escribe una fecha válida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "Por favor, escribe un número válido.",
        digits: "Por favor, escribe sólo dígitos.",
        creditcard: "Por favor, escribe un número de tarjeta válido.",
        equalTo: "Por favor, escribe el mismo valor de nuevo.",
        extension: "Por favor, escribe un valor con una extensión aceptada.",
        maxlength: $mcj.validator.format("Por favor, no escribas más de {0} caracteres."),
        minlength: $mcj.validator.format("Por favor, no escribas menos de {0} caracteres."),
        rangelength: $mcj.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: $mcj.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: $mcj.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: $mcj.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
        nifES: "Por favor, escribe un NIF válido.",
        nieES: "Por favor, escribe un NIE válido.",
        cifES: "Por favor, escribe un CIF válido."
    });
    $('form#mc-embedded-subscribe-form').submit(function (e) {
        const responseForm = dataLayer.push({
            'event': 'formSubmission'
        });
        
        const modalOpened = $('.modal--signuplogin').hasClass('modal--visible');

        setTimeout(function(){
            // Only close the popup if there are no errors
            if($('#mce-error-response').is(':hidden') &&  modalOpened){
                var modalopen = 'signuplogin';
                var modaltype = 'signup';
                toggleModal(modalopen, modaltype);
            }
        }, 2000);

        return true;
    });
});

function toggleModal(modalOpen, modalType){
    $('.modal--' + modalOpen).toggleClass('modal--visible');
    $('.modal__content--' + modalType).toggleClass('modal__content--visible');
    $('.modal__switch').on('click', function () {
        $('.modal__content').removeClass('modal__content--visible');
        $('.modal__content--' + modalType).toggleClass('modal__content--visible');
    });
};

var firstTimeOpen = true;
$(window).scroll(function () {

    var wintop = $(window).scrollTop(),
        docheight = $(document).height(),
        winheight = $(window).height();
    var scrolltrigger = 0.25;
    if (((wintop / (docheight - winheight)) > scrolltrigger) && firstTimeOpen) {
        firstTimeOpen = false;
        var modalopen = 'signuplogin';
        var modaltype = 'signup';
        toggleModal(modalopen, modaltype);
    }
});