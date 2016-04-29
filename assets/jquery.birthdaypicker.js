(function () {
    function BirthdayPicker(element, options) {
        var base = this;

        this.element = $(element);
        this.options = $.extend({}, BirthdayPicker.Defaults, options);

        this.element.hide();

        this.wrap = $('<div />');
        this.wrap.insertAfter(this.element)
            .addClass('birthdaypicker');

        this.daySelect = $('<select />')
            .addClass(this.options.inputClass + ' birthdaypicker-select birthdaypicker-day')
            .attr('id', this.element.attr('id')+'-day');

        this.element.parent().find('label').attr('for', this.daySelect.attr('id'));

        this.monthSelect = $('<select />')
            .addClass(this.options.inputClass + ' birthdaypicker-select birthdaypicker-month');

        this.yearSelect = $('<select />')
            .addClass(this.options.inputClass + ' birthdaypicker-select birthdaypicker-year');

        var templateParts = this.options.template.split(',', 3);

        var orderClass = {
            0: 'birthdaypicker-select-first',
            1: 'birthdaypicker-select-second',
            2: 'birthdaypicker-select-third'
        };

        for (i = 0; i < 3 ; i++) {
            if (templateParts[i] == 'day') {
                this.wrap.append(this.daySelect);
                this.daySelect.addClass(orderClass[i]);
            } else if(templateParts[i] == 'month') {
                this.wrap.append(this.monthSelect);
                this.monthSelect.addClass(orderClass[i]);
            } else {
                this.wrap.append(this.yearSelect);
                this.yearSelect.addClass(orderClass[i]);
            }
        }

        $('.birthdaypicker-select', this.wrap).bind('change.birthdaypicker', function() {
            if(base.daySelect.val() != '' && base.monthSelect.val() != '' && base.yearSelect.val() != '') {
                base.element.val(base.yearSelect.val() + '-' + base.monthSelect.val() + '-' + base.daySelect.val());
            } else {
                base.element.val('');
            }
        });

        $('.birthdaypicker-select', this.wrap).bind('focusout.birthdaypicker', function() {
            setTimeout(function() {
                var focused = $(document.activeElement)[0];

                if(focused != base.daySelect[0] && focused != base.monthSelect[0] && focused != base.yearSelect[0]) {
                    base.element.trigger('blur');
                }
            }, 100);
        });

        var currentYear = new Date().getFullYear();

        this.daySelect.append($('<option />').val('').html(''));
        for (i = 1; i <= 31 ; i++) {
            var dayVal = i > 9 ? i : '0'+i;
            this.daySelect.append($('<option />').val(dayVal).html(i));
        }

        this.monthSelect.append($('<option />').val('').html(''));
        for (i = 1; i < 13; i++) {
            var monthVal = i > 9 ? i : '0'+i;
            this.monthSelect.append($('<option />').val(monthVal).html(this.options.monthNames[i-1]));
        }

        this.yearSelect.append($('<option />').val('').html(''));
        for (i = currentYear; i >= currentYear - 100; i--) {
            this.yearSelect.append($('<option />').val(i).html(i));
        }

        var val = this.element.val();
        if(val != '') {
            var dateParts = val.split('-', 3);

            this.yearSelect.val(dateParts[0]);
            this.monthSelect.val(dateParts[1]);
            this.daySelect.val(dateParts[2]);
        }

        this.updateNumberOfDays();

        this.yearSelect.change(function () {
            base.updateNumberOfDays();
        });

        this.monthSelect.change(function () {
            base.updateNumberOfDays();
        });
    }

    BirthdayPicker.prototype.updateNumberOfDays = function() {
        var options = this.daySelect.find('option');

        options.prop( "disabled", true);

        month = this.monthSelect.val();
        year = this.yearSelect.val();
        days = this.daysInMonth(month, year);

        for (i = 0; i < days + 1 ; i++) {
            options.eq(i).prop("disabled", false);
        }

        if(this.daySelect.find(":selected").attr('disabled')) {
            this.daySelect.val('');
            this.daySelect.trigger('change');
        }
    };

    BirthdayPicker.prototype.daysInMonth = function(month, year) {
        return new Date(year, month, 0).getDate();
    };

    BirthdayPicker.Defaults = {
        'inputClass': 'form-control',
        'template': 'month,day,year',
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    $.fn.birthdayPicker = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('birthdayPicker');

            if (!data) {
                data = new BirthdayPicker(this, typeof option == 'object' && option);
                $this.data('birthdayPicker', data);
            }
        });
    };
})(window.jQuery);
