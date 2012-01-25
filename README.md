# jQuery State

A jQuery plugin that makes getting/setting states on HTML elements **easy** and **accessible** without you having to do extra work. Developed by [Ian Storm Taylor](http://twitter.com/ianstormtaylor).


## The Problem

* Ideally you'd set state via HTML attributes only and select off of pseudo-classes like `:disabled`, but HTML doesn't have built-in attributes for all situations (like "expanded", "pressed", etc.)…

* So… to stay accessibile, you need to use ARIA attributes for the cases that aren't covered in HTML, but defining styles based off ARIA attributes isn't an option because it's not performant and doesn't get redrawn when changed in all browsers…

* So… to be able to style off these states you have to add helper classes to the elements to be able to keep your styles performant and redrawn…

* But… that's a lot to keep track of and write all the time.


## The Solution

**jQuery State** lets you focus on the state and ignore all of the extra details because it handles them for you. It uses **ARIA attributes** for baseline accessibility, adds in **HTML attributes** where possible, and adds **helper classes** that you can style/select off of performantly.



## Features

* **Memorable syntax:** `state('disabled', 'true');`

* **Get and set:** `state('disabled');` vs. `state('disabled', 'true');`

* **Helper functions:** `toggleState()` and `removeState()` are also included to make your code DRYer.



## Supported States and Values

		busy:			true, false
		checked:		true, false, mixed
		disabled:	true, false
		expanded:	true, false
		grabbed:		true, false
		hidden:		true, false
		invalid:		true, false, grammar, spelling
		pressed:		true, false, mixed
		readonly:	true, false
		required:	true, false
		selected:	true, false



## Methods

*   **state(key, value)**

    Get or set an aria attribtue on an element. Works just like jQuery's `attr()`

    _Examples:_

        $('#el').state('hidden', true);

        $('#el').state({ 'readonly' : false,
                        'invalid' : false });

        $('#el').state('expanded');

    _Parameters:_

    *   **key *or* dictionary** _string or object_ State to change or a dictionary of states and their values. A dictionary can be passed in here to set more than one state at once.
    *   **value** (optional) _string or boolean_ A value to set the state to. If none is passed in, the function will return the current state of the element instead (by checking its ARIA attribute).


*   **toggleState(key, ..., ...)**

    Toggle the value of one or more states. 

    _Examples:_

        $('#el').toggleState('hidden');

        $('#el').toggleState('readonly', 'invalid');

    _Parameters:_

    *   **keys** _strings_ States to toggle. To toggle more than one at a time, pass in each as an argument.

*   **removeState(key, ..., ...)**

    Removes one or more states from an element.

    _Examples:_

        $('#el').removeState('readonly');

        $('#el').removeState('selected', 'expanded');

    _Parameters:_

    *   **keys** _strings_ States to remove. To remove more than one at a time, pass in each as an argument.


## Feedback

I'm down for all feedback. Open an issue or I'm also on Twitter as [@ianstormtaylor](http://twitter.com/ianstormtaylor).
