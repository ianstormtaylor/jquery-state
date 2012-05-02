# jQuery State

A jQuery plugin that makes getting/setting states on HTML elements **easy** and **accessible** without you having to do extra work. Developed by [Ian Storm Taylor](http://twitter.com/ianstormtaylor).


## The Problem

* Ideally you'd set state via HTML attributes only and select off of pseudo-classes like `:disabled`. But HTML doesn't have built-in attributes for all situations (like "expanded", "pressed", etc.)…

* So… to stay accessibile, you need to use ARIA attributes for the cases that aren't covered in HTML. But defining styles based off ARIA attributes isn't an option because it's not performant and styles don't get redrawn when attributes change in all browsers…

* So… to be able to style off these states, you have to add helper classes to the elements to keep your styles performant and redrawn…

* But… that's a lot to keep track of and write all the time.


## The Solution

**jQuery State** lets you focus on the state itself and ignore all of the extra details because it handles them for you. It uses **ARIA attributes** for baseline accessibility, adds **HTML attributes** where possible, and always adds **helper classes** that you can style/select off of performantly.


## Features

* **Memorable syntax:** `state('disabled', true);`

* **Get and set:** `state('disabled');` vs. `state('disabled', true);`

* **Helper functions:** `toggleState()` and `removeState()` are also included to make your code DRYer.


## Supported States and Values

Any state you can make up is supported. On top of that, these states also add the extra accesible attributes:

* **loading**
* **checked**
* **disabled**
* **expanded**
* **grabbed**
* **hidden**
* **invalid**
* **pressed**
* **read-only**
* **required**
* **selected**


## Helpful Aliases

In case you forget what you're doing, or even just to make certain parts of your code more readable, several aliases are allowed:

* **readonly** -> read-only
* **busy** -> loading (inverse)
* **enabled** -> disabled (inverse)
* **collapsed** -> expanded (inverse)
* **visible** -> hidden (inverse)
* **valid** -> invalid (inverse)
* **optional** -> required (inverse)

Some of the aliases are inverted ones, in other words if you call `.state('enabled', false)`, it will be equivalent to calling `.state('disabled', true)`.


## Methods

*   **state(key, value)**

    Get or set an aria attribtue on an element. Works just like jQuery's `attr()`

    _Examples:_

        $('#el').state('expanded');

        $('#el').state('hidden', true);

        $('#el').state('aggregated', false);

        $('#el').state({'readonly' : false,
                        'invalid'  : false});

    _Parameters:_

    *   **key *or* dictionary** _string or object_ State to change or a dictionary of states and their values.
    *   **value** (optional) _string or boolean_ A value to set the state to. If none is passed in, the function will return the current state of the element instead (by checking its class).


*   **toggleState(key, switch)**

    Toggle the value of one or more states.

    _Examples:_

        $('#el').toggleState('hidden');

        $('#el').toggleState('read-only', true);

    _Parameters:_

    *   **key** _string_ States to toggle. To toggle more than one at a time, pass in each as an argument.
    *   **switch** _boolean_ An optional switch to set the value to.

*   **removeState(key)**

    Removes one or more states from an element.

    _Examples:_

        $('#el').removeState('read-only');

        $('#el').removeState('selected expanded');

    _Parameters:_

    *   **keys** _string_ States to remove. To remove more than one at a time, pass in a space-separated list of attributes.


## Feedback

I'm down for all feedback. Open an issue or I'm also on Twitter as [@ianstormtaylor](http://twitter.com/ianstormtaylor).
