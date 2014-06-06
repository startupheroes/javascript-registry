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
        $($el.data('replace')).replaceWith(data.html);
    };
    Handlers.prototype.replaceClosest = function(e, $el, data) {
        $el.closest($el.data('replace-closest')).replaceWith(data.html);
    };
    Handlers.prototype.replaceInner = function(e, $el, data) {
        $($el.data('replace-inner')).html(data.html);
    };
    Handlers.prototype.replaceClosestInner = function(e, $el, data) {
        $el.closest($el.data('replace-closest-inner')).html(data.html);
    };
    Handlers.prototype.append = function(e, $el, data) {
        $($el.data('append')).append(data);
    };
    Handlers.prototype.prepend = function(e, $el, data) {
        $($el.data('prepend')).prepend(data.html);
    };
    Handlers.prototype.refresh = function(e, $el) {
        $.each($($el.data('refresh')), function(index, value) {
            $.getJSON($(value).data('refresh-url'), function(data) {
                $(value).replaceWith(data.html);
            });
        });
    };
    Handlers.prototype.refreshClosest = function(e, $el) {
        $.each($($el.data('refresh-closest')), function(index, value) {
            $.getJSON($(value).data('refresh-url'), function(data) {
                $el.closest($(value)).replaceWith(data.html);
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
        $(document).on('simple-ajax:success', Handlers.prototype.redirect);
        $(document).on('simple-ajax:success', Handlers.prototype.fragments);
        $(document).on('simple-ajax:success', '[data-replace]', Handlers.prototype.replace);
        $(document).on('simple-ajax:success', '[data-replace-closest]', Handlers.prototype.replaceClosest);
        $(document).on('simple-ajax:success', '[data-replace-inner]', Handlers.prototype.replaceInner);
        $(document).on('simple-ajax:success', '[data-replace-closest-inner]', Handlers.prototype.replaceClosestInner);
        $(document).on('simple-ajax:success', '[data-append]', Handlers.prototype.append);
        $(document).on('simple-ajax:success', '[data-prepend]', Handlers.prototype.prepend);
    });
}(window.jQuery));
