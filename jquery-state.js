(function ($, undefined) {

  // Some private stuff.
  var _specialMatch = new RegExp([
    '^checked$',
    '^disabled$',
    '^expanded$',
    '^grabbed$',
    '^hidden$',
    '^invalid$',
    '^loading$',
    '^pressed$',
    '^read-only$',
    '^required$',
    '^selected$'
  ].join('|'));

  // States that take boolean HTML attributes.
  var _booleanMatch = new RegExp([
    '^checked$',
    '^disabled$',
    '^hidden$',
    '^invalid$',
    '^read-only$',
    '^required$',
    '^selected$'
  ].join('|'));

  // Aliases, to be forgiving.
  var _aliasMatch = new RegExp([
    '^readonly$',
    '^read-write$',
    '^valid$',
    '^visible$',
    '^optional$',
    '^enabled$'
  ].join('|'));

  // What do the aliases map to?
  var _aliasMap = {
    'readonly'   : 'read-only',
    'read-write' : 'read-only',
    'valid'      : 'invalid',
    'visible'    : 'hidden',
    'optional'   : 'required',
    'enabled'    : 'disabled'
  };

  // Inverted aliases, yes its complicated.
  var _invertedAliasMatch = new RegExp([
    '^read-write$',
    '^valid$',
    '^visible$',
    '^optional$',
    '^enabled$',
  ].join('|'));

  // ARIA-specific aliases... I know...
  var _ariaAliasMatch = new RegExp([
    '^loading$',
    '^read-only$',
    '^read-write$'
  ].join('|'));

  var _ariaAliasMap = {
    'loading'    : 'busy',
    'read-only'  : 'readonly',
    'read-write' : 'readonly'
  };

  // A method that changes boolean HTML attributes
  var _setBooleanAttribute = function ($element, key, value) {
    if (value === 'true' || value === true)
      $element.attr(key, key);
    else
      $element.removeAttr(key);
  };


  // jQuery.state()
  //
  // A function that makes setting state using HTML attributes,
  // ARIA attributes and HTML classes very easy, giving you the
  // best of all three worlds:
  //
  // * HTML attributes when available
  // * ARIA attributes for semantics when not
  // * Helper classes for selecting always
  //
  // Examples:
  // $('input').state('disabled', 'true');
  // $('.dropdown').state('expanded', 'true');
  // $('li').state('selected', 'true');

  $.fn.state = function (state, value) {

    // Many states? One at a time, yo.
    if (typeof state === 'object') {
      for (var i in state) {
        this.state(i, state[i]);
      }
      return this;
    }

    var isAlias         = state.match(_aliasMatch),
        isInvertedAlias = state.match(_invertedAliasMatch);

    if (isAlias) state = _aliasMap[state];

    var isSpecial   = state.match(_specialMatch),
        isBoolean   = state.match(_booleanMatch),
        isAriaAlias = state.match(_ariaAliasMatch);

    // Get, use the class.
    if (value === undefined)
      return isInvertedAlias ? !this.hasClass(state) : this.hasClass(state);

    // Normalize values.
    if (value === 'false') value = false;
    value = value ? true : false;

    if (isInvertedAlias) value = !value;

    // Set, remove?
    if (!value) return this.removeState(state);

    if (isSpecial) {
      if (isBoolean) _setBooleanAttribute(this, state, value);
      var ariaKey = (isAriaAlias) ? _ariaAliasMap[state] : state;
      this.attr('aria-' + ariaKey, value);
    }

    if (value) this.addClass(state);

    // Yeh yeh my chain heavy.
    return this;
  };


  // jQuery.toggleState()
  //
  // A helper included with jQuery.state() to make toggling values much more
  // DRY. Second argument is an optional switch of the value to toggle to.

  $.fn.toggleState = function (state, switcher) {

    if (state === undefined) return;

    var value = (switcher !== undefined ? switcher : !this.hasClass(state));

    this.state(state, value);

    // Mah chain too heavy.
    return this;
  };


  // jQuery.removeState()
  //
  // A helper included with jQuery.state() to make removing states easier.
  // Multiple states can be removed at the same time by passing in a
  // space-separated list of states.

  $.fn.removeState = function (states) {

    if (states === undefined) return undefined;

    states = states.split(' ');

    var self = this;
    $.each(states, function (i, state) {

      var isAlias         = state.match(_aliasMatch),
          isAriaAlias     = state.match(_ariaAliasMatch),
          isInvertedAlias = state.match(_invertedAliasMatch);

      if (isAlias) state = _aliasMap[state];

      var isSpecial = state.match(_specialMatch),
          isBoolean = state.match(_booleanMatch);

      if (isSpecial) {
        if (isBoolean) self.removeAttr(state);
        var ariaKey = (isAriaAlias) ? _ariaAliasMap[state] : state;
        self.removeAttr('aria-' + ariaKey);
      }

      self.removeClass(state);
    });

    // Mah chain broke the levee.
    return this;
  };

})(jQuery);
