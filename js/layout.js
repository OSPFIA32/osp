(function( $, window, undefined )
{
    /** @namespace */
    window.Layout = {};

    /**
     * @namespace
     * @member
     */
    window.Layout.elements = [
        '.switch',
        '.dropdown',
        '.range-slider',
        '.filepicker'
    ];

    /**
     * Initialisiert die Layout Funktionalität
     */
    window.Layout.init = function()
    {
        window.Layout.switches();
        window.Layout.dropDown();
        window.Layout.rangeSlider();
        window.Layout.filePicker();

        $('.datetimepicker').datetimepicker({
            dayOfWeekStart : 1,
            lang           : 'de'
        });
    };

    /**
     * Enternt alle Funktionalitäten
     */
    window.Layout.removeAll = function()
    {
        for( var i = 0; i < window.Layout.elements.length; i++ )
        {
            var sClass = window.Layout.elements[ i ];

            $(sClass).remove();
        }
    };

    /**
     * Re-Initialisiert die Funktionalitöten
     */
    window.Layout.refresh = function()
    {
        window.Layout.removeAll();
        window.Layout.init();
    };

    /**
     * Erzeugt die Dropdowns
     */
    window.Layout.dropDown = function()
    {
        var aSelects = $('select');
        
        for( var i = 0; i < aSelects.length; i++ )
        {
            var $Element = $(aSelects[ i ]);
            var $Options = $Element.find("option");

            var $Select    = $('<div class="dropdown collapsed"><span class="selected-item">' + $Element.find(":selected").text() + '</span><div class="dropdown-container"></div><span class="toggle"></span></div>');
            var $Container = $Select.find("div");

            for( var j = 0; j < $Options.length; j++ )
            {
                var $Item = $('<a href="#">' + $Options.eq(j).text() + '</a>');

                $Container.append($Item);

                $Container.find('a').on('click', function(event)
                {
                    event.preventDefault();

                    $(this).closest('.dropdown').find('.selected-item').text($(this).text());
                    $(this).closest('.dropdown').prev().val($(this).text());
                    $(this).closest('.dropdown').prev().change();
                });
            }

            $Select.insertAfter($Element);

            $Select.on('click', function()
            {
                if( $(this).hasClass('expanded') )
                {
                    $(this).find('.dropdown-container').hide();
                }
                else if( $(this).hasClass('collapsed') )
                {
                    $(this).find('.dropdown-container').show();
                }

                $(this).toggleClass('collapsed');
                $(this).toggleClass('expanded');
            })
        }
    };

    /**
     * Erzeugt den Filepicker
     */
    window.Layout.filePicker = function()
    {
        var afilePicker = $('input[type="file"]');

        for( var i = 0; i < afilePicker.length; i++ )
        {
            var $Element    = $(afilePicker[ i ]);
            var $FilePicker = $('<div class="filepicker"><span class="path"></span><a href="#" class="pick">Datei Auswählen</a></div>');

            $FilePicker.insertAfter($Element);
        }

        $('.filepicker').find('.pick').on('click', function()
        {
            $(this).parent().prev().click();
        });

        $('input[type="file"]').on('change', function()
        {
            $(this).next().find('.path').html($(this).val());
        });
    };

    window.Layout.init();

})(jQuery, window, undefined);