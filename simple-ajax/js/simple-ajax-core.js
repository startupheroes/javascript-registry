(function ($) {
    'use strict';

    var Ajax = function () {};

    Ajax.prototype._ajax = function ($el, url, method, data, dataType) {
        $el.trigger('simple-ajax:begin', [$el]);
        var newData = $el.triggerHandler('simple-ajax:modify-data', data);
        if (newData) {
            data = newData;
        }
        $.ajax({
            url: url,
            type: method,
            dataType: dataType,
            data: data,
            statusCode: {
                200: function (responseData) {
                    if (!responseData) {
                        responseData = {};
                    }
                    $el.trigger('simple-ajax:success', [$el, responseData]);
                },
                204: function () {
                    $el.trigger('simple-ajax:success', [$el, {}]);
                },
                500: function () {
                    $el.trigger('simple-ajax:error', [$el, 500]);
                },
                400: function () {
                    $el.trigger('simple-ajax:error', [$el, 400]);
                },
                404: function () {
                    $el.trigger('simple-ajax:error', [$el, 404]);
                }
            },
            complete: function (jqXHR, textStatus) {
                $(document).trigger('simple-ajax:complete', [$el, jqXHR, textStatus]);
            }
        });
    };

    Ajax.prototype.click = function (e) {
        var $this = $(this),
            url = $this.attr('href'),
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
           data = (data || '') + formData;
        }

        e.preventDefault();

        Ajax.prototype._ajax($this, url, method, data, dataType);
    };

    Ajax.prototype.submit = function (e) {
        var $this = $(this),
            url = $this.attr('action'),
            method = $this.attr('method'),
            data = $this.serialize();
        $this.removeAttr('data-one-time-action');
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
          .on('submit', 'form[data-ajax-submit]', Ajax.prototype.submit);
    });
}(window.jQuery));
