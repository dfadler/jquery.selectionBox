/*! jQuery Selectionbox - v0.1.0 - 2012-11-08
* https://github.com/dfadler/jquery.selectionBox
* Copyright (c) 2012 Dustin Fadler; Licensed MIT */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.
    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).
    // Create the defaults once
    var selectionBox = 'selectionBox',
        document = window.document,
        defaults = {
            selectContainerClass: 'selection-box',
            optionsContainerClass: 'options',
            selectedOptionClass: 'selected',
            currentContainerClass: 'current',
            defaultText: 'Select an option'
        };

    // The actual plugin constructor


    function SelectionBox(element, options) {

        this.element = element;
        this.$el = $(element);

        this.$selectionBox = undefined;
        this.$options = undefined;
        this.$current = undefined;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = selectionBox;

        this.init();
    }

    SelectionBox.prototype.init = function() {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance,
        // e.g., this.element and this.options
        this.wrapElement();

        this.hideSelectElement();

        this.attachCurrentContainer();
        this.setDefaultText();

        this.attachList();
        this.populateList();
        this.hideList();

        this.bind();
    };

    SelectionBox.prototype.bind = function() {

        var context = { context: this };

        this.$selectionBox.on('click.showOptions', context, function(e) {
            e.data.context.showList();
        });

        this.$options.children().on('click.selectOption', context, function(e) {

            e.stopPropagation();

            var i = $(this).index(),
                text = $(this).text();

            e.data.context.selectOption(i);
            e.data.context.toggleSelectedOption(i);
            e.data.context.setCurrentContainerText(text);
            e.data.context.hideList();
        });
    };

    SelectionBox.prototype.setDefaultText = function() {
        this.$current.text(this.options.defaultText);
    };

    SelectionBox.prototype.attachCurrentContainer = function() {
        this.$selectionBox.append('<div class="'+this.options.currentContainerClass+'" />');
        this.$current = this.$selectionBox.find('.'+this.options.currentContainerClass);
    };

    SelectionBox.prototype.setCurrentContainerText = function(text) {
        this.$current.text(text);
    };

    SelectionBox.prototype.toggleSelectedOption = function(i) {
        
        if(this.$options.children('.selected').length > 0) {
            this.$options.children('.selected').removeClass(this.options.selected);
        }

        if(this.$options.children(':selected').length > 0) {
            this.$options.children(':selected').attr('selected', false);
        }

        this.$options.children().eq(i).addClass(this.options.selectedOptionClass);
    };

    SelectionBox.prototype.selectOption = function(i) {
        this.$el.children().eq(i).attr('selected', true);
    };

    SelectionBox.prototype.showList = function() {
        this.$options.css('display', 'block');
    };

    SelectionBox.prototype.hideList = function() {
        this.$options.css('display', 'none');
    };

    SelectionBox.prototype.populateList = function() {
        var selectionBox = this.$selectionBox,
            options = this.options,
            text,
            listItem;

        this.$el.find('option').each(function(i, el) {
            text = $(el).text();
            listItem = '<li class="option">'+ text +'</li>';

            selectionBox.find('.'+ options.optionsContainerClass)
                .append(listItem);
        });
    };

    SelectionBox.prototype.attachList = function() {
        this.$selectionBox.append('<ul class="' + this.options.optionsContainerClass + '" />');
        this.$options = this.$selectionBox.find('.' + this.options.optionsContainerClass);
    };

    SelectionBox.prototype.wrapElement = function() {
        this.$el.wrap('<div class=' + this.options.selectContainerClass + ' />');
        this.$selectionBox = this.$el.parents('.' + this.options.selectContainerClass);
    };

    SelectionBox.prototype.hideSelectElement = function() {
        this.$el.css('display', 'none');
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[selectionBox] = function(options) {
        return this.each(function() {
            if(!$.data(this, 'plugin_' + selectionBox)) {
                $.data(this, 'plugin_' + selectionBox, new SelectionBox(this, options));
            }
        });
    };

}(jQuery, window));