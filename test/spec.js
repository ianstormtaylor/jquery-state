module('core', {
  setup : function () {
    $el = $('#div');
  }
});

test('set state', function () {

  ok(!$el.hasClass('hidden'), 'element doesnt have class to start');

  $el.state('hidden', true);
  ok($el.hasClass('hidden'), 'can set a state');

  $el.state('hidden', false);
  ok(!$el.hasClass('hidden'), 'can set a state');

  $el.state('hidden', null);
  ok(!$el.hasClass('hidden'), 'can unset a state');

  $el.state({
    hidden   : true,
    disabled : true
  });
  ok($el.hasClass('hidden disabled'), 'can set multiple states');
});

test('get state', function () {

  ok(!$el.state('hidden'), 'can get from an initial no-state');

  $el.addClass('hidden');
  ok($el.state('hidden'), 'can get from an initial state');

  $el.state('hidden', true);
  ok($el.state('hidden'), 'can get after set state');

  $el.state('hidden', false);
  ok(!$el.state('hidden'), 'can get after set state');
});

test('toggle state', function () {

  $el.addClass('hidden');
  ok($el.state('hidden'), 'element starts with hidden state');

  $el.toggleState('hidden');
  ok(!$el.state('hidden'), 'can toggle an initial state');

  $el.toggleState('hidden');
  ok($el.state('hidden'), 'can toggle a state');

  $el.toggleState('hidden', true);
  ok($el.state('hidden'), 'can toggle a state with a switch');
});

test('remove state', function () {

  $el.addClass('hidden');
  ok($el.state('hidden'), 'element starts with hidden state');

  $el.removeState('hidden');
  ok(!$el.state('hidden'), 'can remove an initial state');

  $el.state('hidden', true);
  ok($el.state('hidden'), 'element has hidden state');

  $el.removeState('hidden');
  ok(!$el.state('hidden'), 'can remove a state');

  $el.state({
    hidden   : true,
    disabled : true
  });
  ok($el.state('hidden') && $el.state('disabled'), 'element has multi states');

  $el.removeState('hidden', 'disabled');
  ok(!$el.state('hidden') && !$el.state('disabled'), 'can remove multi states');
});







module('states', {
  setup : function () {
    $el = $('#div');
  }
});

test('hidden', function () {

  ok(!$el.state('hidden'), 'element doesnt have hidden state');

  $el.state('hidden', true);
  ok($el.attr('hidden'), 'has hidden attribute');
  ok($el.hasClass('hidden'), 'has hidden class');
  ok($el.attr('aria-hidden'), 'has hidden aria attribute');
  ok($el.state('hidden'), 'has hidden state');
});

test('checked', function () {

  ok(!$el.state('checked'), 'element doesnt have checked state');

  $el.state('checked', true);
  ok($el.attr('checked'), 'has checked attribute');
  ok($el.hasClass('checked'), 'has checked class');
  ok($el.attr('aria-checked'), 'has checked aria attribute');
  ok($el.state('checked'), 'has checked state');
});

test('disabled', function () {

  ok(!$el.state('disabled'), 'element doesnt have disabled state');

  $el.state('disabled', true);
  ok($el.attr('disabled'), 'has disabled attribute');
  ok($el.hasClass('disabled'), 'has disabled class');
  ok($el.attr('aria-disabled'), 'has disabled aria attribute');
  ok($el.state('disabled'), 'has disabled state');
});

test('expanded', function () {

  ok(!$el.state('expanded'), 'element doesnt have expanded state');

  $el.state('expanded', true);
  ok($el.hasClass('expanded'), 'has expanded class');
  ok($el.attr('aria-expanded'), 'has expanded aria attribute');
  ok($el.state('expanded'), 'has expanded state');
});

test('grabbed', function () {

  ok(!$el.state('grabbed'), 'element doesnt have grabbed state');

  $el.state('grabbed', true);
  ok($el.hasClass('grabbed'), 'has grabbed class');
  ok($el.attr('aria-grabbed'), 'has grabbed aria attribute');
  ok($el.state('grabbed'), 'has grabbed state');
});

test('invalid', function () {

  ok(!$el.state('invalid'), 'element doesnt have invalid state');

  $el.state('invalid', true);
  ok($el.attr('invalid'), 'has invalid attribute');
  ok($el.hasClass('invalid'), 'has invalid class');
  ok($el.attr('aria-invalid'), 'has invalid aria attribute');
  ok($el.state('invalid'), 'has invalid state');
});

test('pressed', function () {

  ok(!$el.state('pressed'), 'element doesnt have pressed state');

  $el.state('pressed', true);
  ok($el.hasClass('pressed'), 'has pressed class');
  ok($el.attr('aria-pressed'), 'has pressed aria attribute');
  ok($el.state('pressed'), 'has pressed state');
});

test('read-only', function () {

  ok(!$el.state('read-only'), 'element doesnt have read-only state');

  $el.state('read-only', true);
  ok($el.attr('read-only'), 'has read-only attribute');
  ok($el.hasClass('read-only'), 'has read-only class');
  ok($el.attr('aria-readonly'), 'has readonly aria attribute');
  ok($el.state('read-only'), 'has read-only state');
});

test('required', function () {

  ok(!$el.state('required'), 'element doesnt have required state');

  $el.state('required', true);
  ok($el.attr('required'), 'has required attribute');
  ok($el.hasClass('required'), 'has required class');
  ok($el.attr('aria-required'), 'has required aria attribute');
  ok($el.state('required'), 'has required state');
});

test('selected', function () {

  ok(!$el.state('selected'), 'element doesnt have selected state');

  $el.state('selected', true);
  ok($el.attr('selected'), 'has selected attribute');
  ok($el.hasClass('selected'), 'has selected class');
  ok($el.attr('aria-selected'), 'has selected aria attribute');
  ok($el.state('selected'), 'has selected state');
});

test('loading', function () {

  ok(!$el.state('loading'), 'element doesnt have loading state');

  $el.state('loading', true);
  ok($el.hasClass('loading'), 'has loading class');
  ok($el.attr('aria-busy'), 'has busy aria attribute');
  ok($el.state('loading'), 'has loading state');
});







module('aliases', {
  setup : function () {
    $el = $('#div');
  }
});

test('readonly', function () {

  ok(!$el.state('readonly'), 'element doesnt have readonly state');

  $el.state('readonly', true);
  ok($el.attr('read-only'), 'has read-only attribute');
  ok($el.hasClass('read-only'), 'has read-only class');
  ok($el.attr('aria-readonly'), 'has readonly aria attribute');
  ok($el.state('readonly'), 'has readonly state');
});






module('inverted aliases', {
  setup : function () {
    $el = $('#div');
  }
});

test('read-write', function () {

  ok($el.state('read-write'), 'element has read-write state');

  $el.state('read-write', false);
  ok($el.attr('read-only'), 'has read-only attribute');
  ok($el.hasClass('read-only'), 'has read-only class');
  ok($el.attr('aria-readonly'), 'has readonly aria attribute');
  ok($el.state('read-only'), 'has read-only state');
  ok(!$el.state('read-write'), 'doesnt have read-write state');
});

test('valid', function () {

  ok($el.state('valid'), 'element has valid state');

  $el.state('valid', false);
  ok($el.attr('invalid'), 'has invalid attribute');
  ok($el.hasClass('invalid'), 'has invalid class');
  ok($el.attr('aria-invalid'), 'has invalid aria attribute');
  ok($el.state('invalid'), 'has invalid state');
  ok(!$el.state('valid'), 'doesnt have valid state');
});

test('visible', function () {

  ok($el.state('visible'), 'element has visible state');

  $el.state('visible', false);
  ok($el.attr('hidden'), 'has hidden attribute');
  ok($el.hasClass('hidden'), 'has hidden class');
  ok($el.attr('aria-hidden'), 'has hidden aria attribute');
  ok($el.state('hidden'), 'has hidden state');
  ok(!$el.state('visible'), 'doesnt have visible state');
});

test('optional', function () {

  ok($el.state('optional'), 'element has optional state');

  $el.state('optional', false);
  ok($el.attr('required'), 'has required attribute');
  ok($el.hasClass('required'), 'has required class');
  ok($el.attr('aria-required'), 'has required aria attribute');
  ok($el.state('required'), 'has required state');
  ok(!$el.state('optional'), 'doesnt have optional state');
});

test('enabled', function () {

  ok($el.state('enabled'), 'element has enabled state');

  $el.state('enabled', false);
  ok($el.attr('disabled'), 'has disabled attribute');
  ok($el.hasClass('disabled'), 'has disabled class');
  ok($el.attr('aria-disabled'), 'has disabled aria attribute');
  ok($el.state('disabled'), 'has disabled state');
  ok(!$el.state('enabled'), 'doesnt have enabled state');
});