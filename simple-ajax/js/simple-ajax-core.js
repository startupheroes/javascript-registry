(function ($) {
    'use strict';

    var Ajax = function () {};

    Ajax.prototype._ajax = function ($el, url, method, data, dataType) {
        $el.trigger('simple-ajax:begin', [$el]);
        // do not bubble up
        var newData = $el.triggerHandler('simple-ajax:modify-data', [$el, data]);
        data = newData || data;

        $.ajax({
            url: url,
            type: method,
            dataType: dataType,
            data: data,
            headers: {'X-Simple-Ajax': true},
            statusCode: {
                200: function (responseData) {
                    if (!responseData) {
                        responseData = {};
                    }
                    $el.trigger('simple-ajax:success', [$el, responseData]);
                },
                204: function (responseData) {
                    if (!responseData) {
                        responseData = {};
                    }
                    $el.trigger('simple-ajax:success', [$el, responseData]);
                },
                500: function (responseData) {
                    if (!responseData) {
                        responseData = {};
                    }
                    $el.trigger('simple-ajax:error', [$el, responseData]);
                },
                400: function (responseData) {
                    if (!responseData) {
                        responseData = {};
                    }
                    $el.trigger('simple-ajax:error', [$el, responseData]);
                },
                404: function (responseData) {
                    if (!responseData) {
                        responseData = {};
                    }
                    $el.trigger('simple-ajax:error', [$el, responseData]);
                }
            },
            complete: function (jqXHR, textStatus) {
                $(document).trigger('simple-ajax:complete', [$el, jqXHR, textStatus]);
            }
        });
    };

    Ajax.prototype.click = function (e) {
        var $this = $(this),
            url = $this.attr('data-href') || $this.attr('href'),
            method = $this.data('method'),
            dataType = $this.data('dataType'),
            data_str = $this.data('data'),
            formData = $($this.data('formData')).serialize() ,
            data = null,
            keyval = null;

        if (!method) {
            method = 'get';
        }

        if (data_str) {
            data = {};
            data_str.split(',').map(
                function(pair) {
                    keyval = pair.split(':');
                    if (keyval[1].indexOf('#') === 0) {
                        data[keyval[0]] = $(keyval[1]).val();
                    } else {
                        data[keyval[0]] = keyval[1];
                    }
                }
            );
        }

        if(formData){
           data = data ? ($.param(data) + '&' + formData) : formData;
        }

        e.preventDefault();

        Ajax.prototype._ajax($this, url, method, data, dataType);
    };

    Ajax.prototype.submit = function (e) {
        var $this = $(this),
            url = $this.attr('action'),
            method = $this.attr('method'),
            data = $this.serialize();
        e.preventDefault();

        Ajax.prototype._ajax($this, url, method, data);
    };

   Ajax.prototype.submitForm = function (e) {
      var $this = $(this),
         selector = $this.attr('data-ajax-submitter');
      e.preventDefault();
      $(selector).submit();
   };

    $(function () {
       $('body')
          .on('click', 'a[data-ajax-click]', Ajax.prototype.click)
          .on('click', 'a[data-ajax-submitter]', Ajax.prototype.submitForm)
          .on('click', 'input[data-ajax-submitter][type="checkbox"]', Ajax.prototype.submitForm)
          .on('submit', 'form[data-ajax-submit]', Ajax.prototype.submit);
    });
}(window.jQuery));
