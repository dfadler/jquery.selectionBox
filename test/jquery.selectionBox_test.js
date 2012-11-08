/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    /*
        ======== A Handy Little QUnit Reference ========
        http://docs.jquery.com/QUnit

        Test methods:
            expect(numAssertions)
            stop(increment)
            start(decrement)
        Test assertions:
            ok(value, [message])
            equal(actual, expected, [message])
            notEqual(actual, expected, [message])
            deepEqual(actual, expected, [message])
            notDeepEqual(actual, expected, [message])
            strictEqual(actual, expected, [message])
            notStrictEqual(actual, expected, [message])
            raises(block, [expected], [message])
    */

    module('Configurable Properties and Chaining', {
        setup: function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('is chainable', 1, function() {
        strictEqual(this.elems.selectionBox(), this.elems, 'should be chainable');
    });

    test('default properties should exist', function() {
        this.elems.selectionBox();

        var defaults = {
            selectContainerClass: 'selection-box',
            optionsContainerClass: 'options',
            selectedOptionClass: 'selected',
            currentContainerClass: 'current',
            defaultText: 'Select an option'
        },
            data = $.data(this.elems[0], 'plugin_selectionBox');

        deepEqual(data.options, defaults);
    });

    test('should be able to override defaults', function() {
        var options = {
            selectContainerClass: 'deselection-box',
            optionsContainerClass: 'no-soup-for-you',
            selectedOptionClass: 'inselected',
            currentContainerClass: 'notCurrent',
            defaultText: 'Select five options'
        },
            data;

        this.elems.selectionBox(options);
        data = $.data(this.elems[0], 'plugin_selectionBox');

        deepEqual(data.options, options);

    });

    module('Confirms the widget is built correctly', {
        setup: function() {
            this.elems = $('#qunit-fixture').children();
            this.elems.selectionBox();
        }
    });

    test('should wrap the element', function() {
        ok(this.elems.parent().hasClass('selection-box'), 'Element should be wrapped with the selection-box class');
    });

    test('selection html element should be set to display none', function() {
        equal(this.elems.css('display'), 'none', 'The html selection element should be hidden with display:none');
    });

    test('should attach an unordered list for the selection box options', function() {
        var selectionBox = this.elems.parent(),
            unorderedList = selectionBox.find('.options');

        equal(unorderedList.length, 1, 'should have attached the options unordered list');

    });

    test('should populate the options list with the same options available in the section element', function() {
        var selectionBox = this.elems.parent(),
            options = [],
            attachedOptions = [];

        this.elems.find('option').each(function(i, el) {
            options.push($(el).text());
        });

        selectionBox.find('.options').children().each(function(i, el) {
            attachedOptions.push($(el).text());
        });

        deepEqual(attachedOptions, options, 'should attach options equal to the selection options text');

    });

    test('should attach the current selection container', function() {
        var selectionBox = this.elems.parent(),
            currentContainer = selectionBox.find('.current');

        equal(currentContainer.length, 1, 'should attach the current container');

    });

    test('should set the default current container test', function() {
        var selectionBox = this.elems.parent(),
            currentContainerText = selectionBox.find('.current').text();

        equal(currentContainerText, 'Select an option', 'should set the correct current container text');

    });

    test('options container should be hidden by default', function() {
        var selectionBox = this.elems.parent(),
            options = selectionBox.find('.options');

        equal(options.css('display'), 'none', 'options container should be hidden');
    });

    test('selection box container should have a click event namespaced to showOptions', function() {
        var selectionBox = this.elems.parent(),
            events = selectionBox.data('events'),
            clicks = events.click,
            namespace = false;

        for(var i = 0, len = clicks.length; i < len; i += 1) {
            if(clicks[i].namespace === 'showOptions') {
                namespace = true;
                break;
            }
        }

        equal(namespace, true, 'the selection box container should have a click event with the namespace showOptions');

    });

    test('clicking the container should set the options container to display block', function() {
        var selectionBox = this.elems.parent(),
            options = selectionBox.find('.options');

        selectionBox.trigger('click.showOptions');

        equal(options.css('display'), 'block', 'clicking the selection box container should display the options');
    });

    test('the option containers should have a click event with the namespace selectOption', function() {
        var selectionBox = this.elems.parent(),
            option = selectionBox.find('.options').children().first(),
            events = option.data('events'),
            clicks = events.click,
            namespace = false;

        for(var i = 0, len = clicks.length; i < len; i += 1) {
            if(clicks[i].namespace === 'selectOption') {
                namespace = true;
                break;
            }
        }

        equal(namespace, true);
    });


    // Please note that this test will pass if the option being tested is the first even if the selected attribute is false
    // I suspect it has to do with a default state. This test might be a false positive
    test('clicking an option should select the corresponding html selection option', function() {
        var selectionBox = this.elems.parent(),
            option = selectionBox.find('.options').children().last(),
            selectOption = selectionBox.find('select').children().last();

        option.trigger('click.selectOption');

        equal(selectOption.attr('selected'), 'selected', 'the selectOption click event should assign the selected attribute to the corresponding select option');

    });


    test('clicking an .option should add the correct selected class', function() {
        var selectionBox = this.elems.parent(),
            option = selectionBox.find('.options').children().last();

        option.trigger('click.selectOption');

        equal(option.hasClass('selected'), true, 'option should have the selected class');

    });

    test('should remove the selected class from the previously click list items', function() {
        var selectionBox = this.elems.parent(),
            options = selectionBox.find('.options').children(),
            option1 = options.eq(0),
            option2 = options.eq(1),
            option3 = options.eq(2),
            selectedLength;

        option1.trigger('click.selectOption');
        option2.trigger('click.selectOption');
        option3.trigger('click.selectOption');

        selectedLength = selectionBox.find('.selected').length;

        equal(selectedLength, 1, 'should only be possible to select on option at a time');

    });

    test('clicking an option should update the current container text', function() {
        var selectionBox = this.elems.parent(),
            option = selectionBox.find('.options').children().last(),
            text = option.text(),
            current = selectionBox.find('.current'),
            currentText;

        option.trigger('click.selectOption');

        currentText = current.text();

        equal(currentText, text, 'current text should match the clicked option text');
    });

    test('clicking an option should hide the options list', function() {
        var selectionBox = this.elems.parent(),
            options = selectionBox.find('.options'),
            option = options.children().last();

        selectionBox.trigger('click.showOptions');
        option.trigger('click.selectOption');


        equal(options.css('display'), 'none', 'options should be hidden after one of its children has been clicked');
    });

}(jQuery));