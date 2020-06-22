
(function ($) {
    "use strict";
    $.ajaxChimp = {
        responses: {
            "We have sent you a confirmation email": 0,
            "Please enter a value": 1,
            "An email address must contain a single @": 2,
            "The domain portion of the email address is invalid (the portion after the @: )": 3,
            "The username portion of the email address is invalid (the portion before the @: )": 4,
            "This email address looks fake or invalid. Please enter a real email address": 5
        },
        translations: {
            en: null
        },
        init: function (selector, options) {
            $(selector).ajaxChimp(options)
        }
    };
    $.fn.ajaxChimp = function (options) {
        $(this).each(function (i, elem) {
            var form = $(elem);
            var settings = $.extend({
                url: form.attr("action"),
                language: "en"
            }, options);
            var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
            
            form.submit(function () {
                function successCallback(resp) {
                    form.find('#mce-success-response').hide();
                    form.find('#mce-error-response').hide();

                    // On successful form submission, display a success message and reset the form
                    if (resp.result == "success") {
                        form.find('#mce-' + resp.result + '-response').show();
                        form.find('#mce-' + resp.result + '-response').html(resp.msg);
                        form.find('#mc-embedded-subscribe-form').each(function () {
                            this.reset();
                        });

                        // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                    } else {
                        if (resp.msg === "captcha") {
                            var url = form.attr("action");
                            var parameters = $.param(resp.params);
                            url = url.split("?")[0];
                            url += "?";
                            url += parameters;
                            window.open(url);
                        };
                        // Example errors - Note: You only get one back at a time even if you submit several that are bad. 
                        // Error structure - number indicates the index of the merge field that was invalid, then details
                        // Object {result: "error", msg: "6 - Please enter the date"} 
                        // Object {result: "error", msg: "4 - Please enter a value"} 
                        // Object {result: "error", msg: "9 - Please enter a complete address"} 

                        // Try to parse the error into a field index and a message.
                        // On failure, just put the dump thing into in the msg variable.
                        var index = -1;
                        var msg;
                        try {
                            var parts = resp.msg.split(' - ', 2);
                            if (parts[1] == undefined) {
                                msg = resp.msg;
                            } else {
                                i = parseInt(parts[0]);
                                if (i.toString() == parts[0]) {
                                    index = parts[0];
                                    msg = parts[1];
                                } else {
                                    index = -1;
                                    msg = resp.msg;
                                }
                            }
                        } catch (e) {
                            index = -1;
                            msg = resp.msg;
                        }

                        try {
                            // If index is -1 if means we don't have data on specifically which field was invalid.
                            // Just lump the error message into the generic response div.
                            if (index == -1) {
                                form.find('#mce-' + resp.result + '-response').show();
                                form.find('#mce-' + resp.result + '-response').html(msg);

                            } else {
                                var fieldName = form.find("input[name*='" + fnames[index] + "']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
                                var data = {};
                                data[fieldName] = msg;
                                form.validate({

                                    // Set error HTML: <div class="mce_inline_error"></div>
                                    errorClass: "mce_inline_error", 
                                      errorElement: "div", 
                                    
                                      // Validate fields on keyup, focusout and blur. 
                                    onkeyup: false,
                                    onfocusout: function(element) { 
                                        if (!mc.isTooEarly(element)) {
                                            $(element).valid();
                                        }
                                    },
                                    onblur: function(element) { 
                                        if (!mc.isTooEarly(element)) {
                                            $(element).valid();
                                        }
                                    },
                                    // Grouping fields makes jQuery Validation display one error for all the fields in the group
                                    // It doesn't have anything to do with how the fields are validated (together or separately), 
                                    // it's strictly for visual display of errors
                                    groups: mc.getGroups(),
                                    // Place a field's inline error HTML just before the div.mc-field-group closing tag 
                                    errorPlacement: function(error, element) {
                                        element.closest('.mc-field-group').append(error);
                                      },
                                      // Submit the form via ajax (see: jQuery Form plugin)
                                    submitHandler: function(form2) {
                                        $(form2).ajaxSubmit(mc.ajaxOptions);
                                    }
                                 }).showErrors(data);
                            }
                        } catch (e) {
                            form.find('#mce-' + resp.result + '-response').show();
                            form.find('#mce-' + resp.result + '-response').html(msg);
                        }
                    }
                }

                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value
                });
                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: "jsonp",
                    error: function (resp, text) {
                        console.log("mailchimp ajax submit error: " + text)
                    }
                });

                return false
            })
        });
        return this
    }
})(jQuery);




(function ($) {
    /*document.forms[0].addEventListener("submit", function(e) {
    	e.preventDefault();

    	$.post(this.action, $(this).serialize() )
    	 .done(function(res) {
    		console.log(res);
    	 });
    	
    	
    });*/


    $(document.forms[0]).ajaxChimp();

    $(document.forms[1]).ajaxChimp();




})(jQuery);