(function ($, undefined) {

    // Some private stuff.
    var // Supported states.
        _states = ['busy',
                   'checked',
                   'disabled',
                   'expanded',
                   'grabbed',
                   'hidden',
                   'invalid',
                   'pressed',
                   'readonly',
                   'required',
                   'selected'],

        // A regex to verify keys against.
        _stateMatch = new RegExp(_states.join('|')),

        // A method that changes boolean HTML attributes
        _setBooleanAttribute = function ($element, key, value) {
            if (value === 'true' || value === true)
                $element.attr(key, key);
            else
                $element.removeAttr(key);
        };


    //
    // jQuery.state()
    //
    // A function that makes setting state using HTML attributes,
    // ARIA attributes and HTML classes very easy, giving you the
    // best of all three worlds:
    //
    // * HTML attributes when available
    // * ARIA attributes for semantics when not
    // * Helper classes for selecting when not
    //
    // --------
    // Example:
    //
    // $('input').state('disabled', 'true');
    //
    // $('.dropdown').state('expanded', 'true');
    //
    // $('li').state('selected', 'true');

    $.fn.state = function (key, value) {

        // Many states? One at a time, yo.
        if (typeof key === 'object') {
            for (var i in key) {
                $.state(i, key[i]);
            }
            // Back on the chain gaaang!
            return this;
        }

        // Setting the state.
        if (value !== undefined) {

            // Normalize booleans to strings.
            if (value === true) value = 'true';
            if (value === false) value = 'false';

            // Does it match one of our states?
            if (key.match(_stateMatch)) {


                // =============
                // SPECIAL CASES
                //
                // Note: this is an 'if' shit-fest. I'm not sure
                // there's another way to do it; all of these
                // HTML attributes have special instances where
                // they need to be applied.

                // HTML Attributes
                // ---------------

                // checked, only for checkboxes and radios
                if (key === 'checked') {

                    if (this.is('input[type="checkbox"], input[type="radio"]')) {
                        _setBooleanAttribute(this, key, value);
                    }
                }

                // selected, only for option elements
                else if (key === 'selected') {

                    if (this.is('option')) {
                        _setBooleanAttribute(this, key, value);
                    }
                }
                // disabled, only for inputs of all types
                else if (key === 'disabled') {

                    if (this.is('input, textarea, button, select, option, optgroup')) {
                        _setBooleanAttribute(this, key, value);
                    }
                }
                // readonly,
                // required, only for inputs and textareas
                else if (key === 'readonly' || key === 'required') {

                    if (this.is('input, textarea')) {
                        _setBooleanAttribute(this, key, value);
                    }
                }
                // hidden
                else if (key === 'hidden') {

                    _setBooleanAttribute(this, key, value);
                }

                // HTML Classes
                // ------------

                // checked,
                // pressed
                if (key === 'checked' || key === 'pressed') {

                    if (value === 'mixed') {
                        this.addClass(value);
                    }
                    else if (value === 'false') {
                        this.removeClass('mixed');
                    }

                    // Add a class of mixed in addition to the checked/pressed class.

                }
                // invalid
                else if (key === 'invalid') {

                    if (value === 'grammar' || value === 'spelling') {
                        this.addClass(key + ' ' + value);
                    }
                    else if (key === 'invalid') {
                        this.removeClass('grammar spelling');
                    }
                }


                // =========
                // ALL CASES
                //

                // true values
                if (value === 'true') {
                    this.addClass(key);
                }
                // false values
                else if (value === 'false' ||
                         value === 'undefined') {
                    this.removeClass(key);
                }
            }

            // Set the aria attribute and chain.
            return this.attr('aria-' + key, value);
        }

        // Getting the state. (via ARIA)
        else {

            // Get the value and chain.
            return this.attr('aria-' + key);
        }
    };


    //
    // jQuery.toggleState()
    //
    // A helper included with jQuery.state() to make toggling values
    // much more DRY.
    //
    // To toggle multiple state at once, just pass in
    // multiple comma-separated values, eg:
    //
    // toggleState('selected', 'busy');

    $.fn.toggleState = function () {

        // Pass in something at least...
        if (arguments.length === 0)
            return undefined;

        // De-pseudo-ify.
        var args = [];
        if (arguments.length === 1) {
            args = new Array(arguments[0]);
        }
        else {
            args = $.makeArray(arguments);
        }

        // Iterate 'em.
        var _self = this;
        $.each(args, function (i, key) {

            // Does it match our states?
            if (key.match(_stateMatch)) {

                var value = _self.attr('aria-' + key);

                // Important
                if (value !== 'false' &&
                    value !== undefined) {

                    _self.state(key, false);
                }
                else {
                    _self.state(key, true);
                }
            }

            // If not, just toggle off.
            else {
                _self.removeState('aria-' + key);
            }

        });

        // Mah chain too heavy.
        return this;
    };


    //
    // jQuery.removeState()
    //
    // A helper included with jQuery.state() to make removing states
    // easier. You can pass in multiple arguments to remove multiple
    // states at once.

    $.fn.removeState = function () {

        // Pass in something at least...
        if (arguments.length === 0)
            return undefined;

        // De-pseudo-ify.
        var args = [];
        if (arguments.length === 1) {
            args = new Array(arguments[0]);
        }
        else {
            args = $.makeArray(arguments);
        }

        // Iterate 'em.
        var _self = this;
        $.each(args, function (i, key) {

            // Remove HTML attributes.
            if (key === 'checked'  ||
                key === 'selected' ||
                key === 'disabled' ||
                key === 'readonly' ||
                key === 'required' ||
                key === 'hidden') {

                _self.removeAttr(key);
            }

            // Remember to remove the non-key classes that
            // are added to certain states above.
            if (key === 'checked' ||
                key === 'pressed') {

                _self.removeClass('mixed');
            }
            else if (key === 'invalid') {

                _self.removeClass('grammar spelling');
            }

            // And remove the default ones finally.
            _self.removeClass(key).removeAttr('aria-' + key);
        });

        return this;
    };

})(jQuery);
