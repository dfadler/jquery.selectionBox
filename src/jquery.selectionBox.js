/*
 * jquery.selectionBox
 * https://github.com/dfadler/jquery.selectionBox
 *
 * Copyright (c) 2012 Dustin Fadler
 * Licensed under the MIT license.
 */

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
            optionContainerClass: 'option',
            selectedOptionClass: 'selected',
            currentContainerClass: 'current',
            defaultText: 'Select an option'
        };

    // The actual plugin constructor
    function SelectionBox(element, options) {

        this.element = element;
        this.$el = $(element);

        this.state = false;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = selectionBox;

        this.init();
    }

    SelectionBox.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and the options via the instance,
            // e.g., this.element and this.options
            this
                .wrapElement()
                .hideSelectElement()
                .attachCurrentContainer()
                .setDefaultText()
                .attachList()
                .populateList()
                .hideList()
                .bind();
        },

        setCurrentContainerText: function(text) {
            this.$current.text(text);
        },

        toggleSelectedOption: function(i) {

            if(this.$options.children('.selected').length > 0) {
                this.$options.children('.selected').removeClass('selected');
            }

            if(this.$options.children(':selected').length > 0) {
                this.$options.children(':selected').attr('selected', false);
            }

            this.$options.children().eq(i).addClass(this.options.selectedOptionClass);
        },

        selectOption: function(i) {
            this.$el.children().eq(i).attr('selected', true);
            this.$el.trigger('change');
        },

        showList: function() {
            this.state = true;
            this.$options.css('display', 'block');
        },

        wrapElement: function() {
            this.$el.wrap('<div class=' + this.options.selectContainerClass + ' />');
            this.$selectionBox = this.$el.parents('.' + this.options.selectContainerClass);

            return this;
        },

        hideSelectElement: function() {
            this.$el.css('display', 'none');

            return this;
        },

        attachCurrentContainer: function() {
            this.$selectionBox.append('<div class="' + this.options.currentContainerClass + '" />');
            this.$current = this.$selectionBox.find('.' + this.options.currentContainerClass);

            return this;
        },

        setDefaultText: function() {
            this.$current.text(this.options.defaultText);

            return this;
        },

        attachList: function() {
            this.$selectionBox.append('<ul class="' + this.options.optionsContainerClass + '" />');
            this.$options = this.$selectionBox.find('.' + this.options.optionsContainerClass);

            return this;
        },

        populateList: function() {
            var selectionBox = this.$selectionBox,
                options = this.options,
                text, listItem;

            this.$el.find('option').each(function(i, el) {
                text = $(el).text();
                listItem = '<li class="' + options.optionContainerClass + '">' + text + '</li>';

                selectionBox.find('.' + options.optionsContainerClass).append(listItem);
            });

            return this;
        },

        hideList: function() {
            this.state = false;
            this.$options.css('display', 'none');

            return this;
        },

        bind: function() {

            var self = this;

            this.$selectionBox.on('click.toggleOptions', function(e) {
                if(!self.state) {
                    self.showList();
                } else {
                    self.hideList();

                }

            });

            this.$options.children().on('click.selectOption', function(e) {

                e.stopPropagation();

                var i = $(this).index(),
                    text = $(this).text();

                self.selectOption(i);
                self.toggleSelectedOption(i);
                self.setCurrentContainerText(text);
                self.hideList();
            });
        }
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