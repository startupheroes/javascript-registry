(function ($) {
    'use strict';

    var Handlers = function () {};

    Handlers.prototype.redirect = function(e, $el, data) {
        if (data.location) {
            window.location.href = data.location;
            return false;
        }
    };
    Handlers.prototype.replace = function(e, $el, data) {
        $($el.data('replace')).replaceWith(data);
    };
    Handlers.prototype.replaceClosest = function(e, $el, data) {
        $el.closest($el.data('replace-closest')).replaceWith(data);
    };
    Handlers.prototype.replaceInner = function(e, $el, data) {
        $($el.data('replace-inner')).html(data);
    };
    Handlers.prototype.replaceClosestInner = function(e, $el, data) {
        $el.closest($el.data('replace-closest-inner')).html(data);
    };
    Handlers.prototype.append = function(e, $el, data) {
        $($el.data('append')).append(data);
    };
    Handlers.prototype.prepend = function(e, $el, data) {
        $($el.data('prepend')).prepend(data);
    };
    Handlers.prototype.refresh = function(e, $el) {
        $.each($($el.data('refresh')), function(index, value) {
            $.getJSON($(value).data('refresh-url'), function(data) {
                $(value).replaceWith(data);
            });
        });
    };
    Handlers.prototype.clear = function(e, $el) {
        $($el.data('clear')).html('');
    };
    Handlers.prototype.remove = function(e, $el) {
        $($el.data('remove')).remove();
    };
    Handlers.prototype.clearClosest = function(e, $el) {
       $el.closest($el.data('clear-closest')).html('');
    };
    Handlers.prototype.removeClosest = function(e, $el) {
       $el.closest($el.data('remove-closest')).remove();
    };
    Handlers.prototype.fragments = function(e, $el, data) {
        if (data.fragments) {
            $.each(data.fragments, function (i, s) {
                $(i).replaceWith(s);
            });
        }
        if (data['inner-fragments']) {
            $.each(data['inner-fragments'], function(i, s) {
                $(i).html(s);
            });
        }
        if (data['append-fragments']) {
            $.each(data['append-fragments'], function(i, s) {
                $(i).append(s);
            });
        }
        if (data['prepend-fragments']) {
            $.each(data['prepend-fragments'], function(i, s) {
                $(i).prepend(s);
            });
        }
    };

    $(function () {
       var $document = $(document);
       $document.on('simple-ajax:success', Handlers.prototype.redirect)
                .on('simple-ajax:success', Handlers.prototype.fragments)
                .on('simple-ajax:success', '[data-replace]', Handlers.prototype.replace)
                .on('simple-ajax:success', '[data-delete]', Handlers.prototype.replace)
                .on('simple-ajax:success', '[data-replace-closest]', Handlers.prototype.replaceClosest)
                .on('simple-ajax:success', '[data-replace-inner]', Handlers.prototype.replaceInner)
                .on('simple-ajax:success', '[data-replace-closest-inner]', Handlers.prototype.replaceClosestInner)
                .on('simple-ajax:success', '[data-append]', Handlers.prototype.append)
                .on('simple-ajax:success', '[data-clear]', Handlers.prototype.clear)
                .on('simple-ajax:success', '[data-remove]', Handlers.prototype.remove)
                .on('simple-ajax:success', '[data-clear-closest]', Handlers.prototype.clearClosest)
                .on('simple-ajax:success', '[data-remove-closest]', Handlers.prototype.removeClosest);
    });
}(window.jQuery));
