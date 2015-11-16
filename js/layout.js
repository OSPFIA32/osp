(function( $, window, undefined )
{
    window.Layout = {};

    window.Layout.elements = [
        '.switch',
        '.dropdown',
        '.range-slider',
        '.filepicker'
    ]

    window.Layout.init = function()
    {
        window.Layout.switches();
        window.Layout.dropDown();
        window.Layout.rangeSlider();
        window.Layout.filePicker();

        $('.datetimepicker').datetimepicker({
            dayOfWeekStart : 1,
            lang           : 'de',
            startDate      : '2015/11/15'
        });
    }

    window.Layout.removeAll = function()
    {
        for( var i = 0; i < window.Layout.elements.length; i++ )
        {
            var sClass = window.Layout.elements[ i ];

            $(sClass).remove();
        }
    }

    window.Layout.refresh = function()
    {
        window.Layout.removeAll();
        window.Layout.init();
    }

    window.Layout.switches = function()
    {
        var aSwitches = $('input[type=checkbox]');

        for( var i = 0; i < aSwitches.length; i++ )
        {
            var $Element    = $(aSwitches[ i ]);
            var $Switch     = $('<div class="switch input-component"><span class="label"></span><span class="ball"></span></div>');
            var $Labal      = $Switch.find('span.label');
            var sState      = $Element.prop('checked') ? "on" : "off";
            var sStateLabel = $Element.prop('checked') ? "AN" : "AUS";

            $Switch.insertAfter($Element);
            $Switch.addClass(sState);
            $Labal.text(sStateLabel);

            $Switch.on('click', function()
            {
                if( $(this).hasClass('off') )
                {
                    $(this).prev().prop('checked', true);
                    // $(this).find('span.ball').css({left: "50px"});
                    $Labal.text('AN');
                }
                else if( $(this).hasClass('on') )
                {
                    $(this).prev().prop('checked', false);
                    // $(this).find('span.ball').css({left: "0px"});
                    $Labal.text('AUS');
                }

                $(this).toggleClass('off');
                $(this).toggleClass('on');
            })
        }
    }

    window.Layout.dropDown = function()
    {
        var aSelects = $('select');

        for( var i = 0; i < aSelects.length; i++ )
        {
            var $Element = $(aSelects[ i ]);
            var $Options = $Element.find("option");

            var $Select    = $('<div class="dropdown collapsed"><span class="selected-item">' + $Element.find(":selected").text() + '</span><div class="dropdown-container"></div><span class="toggle"></span></div>');
            var $Container = $Select.find("div");

            for( var i = 0; i < $Options.length; i++ )
            {
                var $Item = $('<a href="#">' + $Options.eq(i).text() + '</a>');

                $Item.on('click', function()
                {
                    $Select.find('.selected-item').text($(this).text());
                    $Element.val($(this).text());
                })

                $Container.append($Item);
            }

            $Select.insertAfter($Element);

            $Select.on('click', function()
            {
                if( $(this).hasClass('expanded') )
                {
                    $Container.hide();
                }
                else if( $(this).hasClass('collapsed') )
                {
                    $Container.show();
                }

                $(this).toggleClass('collapsed');
                $(this).toggleClass('expanded');
            })
        }
    }

    window.Layout.rangeSlider = function()
    {
        var aSlider = $('input[type=range]');

        for( var i = 0; i < aSlider.length; i++ )
        {
            var $Element     = $(aSlider[ i ]);
            var nMin         = parseInt($Element.attr('min'));
            var nMax         = parseInt($Element.attr('max'));
            var nValue       = parseInt($Element.val());
            var nPointsCount = ( nMax - nMin ) + 1;

            var $RangeSlider = $('<div class="range-slider input-component"><span class="output-area"></span><div class="sliding-area"><span class="slider"></span></div></div>');
            var $SlidingArea = $RangeSlider.find('.sliding-area');
            var $Slider      = $RangeSlider.find('.slider');
            var $OutputArea  = $RangeSlider.find('.output-area');

            $RangeSlider.insertAfter($Element);

            var nSliderCenter = $Slider.width();
            var nPercentStep  = 100 / ( nPointsCount - 1 );
            var nMarkerCenter = 5;

            $Slider.css({ left : "calc(" + ( $Element.val() * nPercentStep ) + "% - " + nSliderCenter + "px)" });

            $OutputArea.text(nValue + nMin);

            for( var i = 0; i < nPointsCount; i++ )
            {
                var $Marker = $('<span class="marker"></span>');
                $Marker.css({ left : "calc(" + ( i * nPercentStep ) + "% - " + nMarkerCenter + "px)" });

                $SlidingArea.append($Marker);
            }

            $Slider.on('mousedown', function( event )
            {
                $(this).addClass('dragged');
                $(this).css({ transition : "none" });

                $(document).on('mouseup', function( event )
                {
                    $Slider.css({ transition : "all 0.3s linear" });

                    var aPositions = [];

                    for( var i = 0; i < nPointsCount; i++ )
                    {
                        var nPosition     = parseInt($Slider.css('left')) + nSliderCenter;
                        var nStepPosition = ( ( nPercentStep / 100 ) * i ) * $SlidingArea.width();
                        var nDistance     = Math.abs(nPosition - nStepPosition);

                        aPositions.push(nDistance);
                    }

                    var nSmallestValue = $SlidingArea.width();
                    var nSmallestIndex = 0;

                    for( var i = 0; i < aPositions.length; i++ )
                    {
                        if( aPositions[ i ] < nSmallestValue )
                        {
                            nSmallestValue = aPositions[ i ];
                            nSmallestIndex = i;
                        }
                    }

                    // var nLeft 	= ( ( ( nSmallestIndex * ( nPercentStep / 100 ) ) * $SlidingArea.width() ) - nSliderCenter );
                    var nLeft  = "calc(" + ( nSmallestIndex * nPercentStep ) + "% - " + nSliderCenter + "px)";
                    var nValue = nSmallestIndex + nMin;

                    $Slider.css({ left : nLeft });

                    $Slider.removeClass('dragged');

                    $Element.val(nValue);

                    $OutputArea.text(nValue);

                    $(document).off('mouseup');
                })
            })

            $SlidingArea.on('mousemove', function( event )
            {
                if( $Slider.hasClass('dragged') )
                {
                    var oRect = this.getBoundingClientRect();
                    var nLeft = ( event.pageX - oRect.left ) - nSliderCenter;

                    if( ( nLeft + nSliderCenter ) < $(this).width() && nLeft + nSliderCenter > 0 )
                    {
                        if( ( nLeft + nSliderCenter ) > $(this).width() )
                        {
                            nLeft = $(this).width() - nSliderCenter;
                        }
                        else if( ( nLeft + nSliderCenter ) < 0 )
                        {
                            nLeft = nSliderCenter;
                        }

                        $Slider.css({ left : nLeft + "px" });
                    }
                }
            })
        }
    }

    window.Layout.filePicker = function()
    {
        var afilePicker = $('input[type="file"]');

        for( var i = 0; i < afilePicker.length; i++ )
        {
            var $Element    = $(afilePicker[ i ]);
            var $FilePicker = $('<div class="filepicker"><span class="path"></span><a href="#" class="pick">Auswählen</a></div>');

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
    }

    window.Layout.init();

})(jQuery, window, undefined)