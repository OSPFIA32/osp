(function( $, window, undefined )
{
    var A_DUMMY_JSON_EVENTS = {
        events : [
            {
                id          : 12,
                name        : "Projektwoche",
                description : "Nächste Woche findet bei uns die Projektwoche statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "20.06.2016",
                endDate     : "27.06.2016"
            },
            {
                id          : 13,
                name        : "Weihnachtsfeier",
                description : "Nächste Woche findet bei uns die Weihnachtsfeier statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "23.12.2015",
                endDate     : "24.12.2015"
            },
            {
                id          : 12,
                name        : "Projektwoche",
                description : "Nächste Woche findet bei uns die Projektwoche statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "20.06.2016",
                endDate     : "27.06.2016"
            },
            {
                id          : 13,
                name        : "Weihnachtsfeier",
                description : "Nächste Woche findet bei uns die Weihnachtsfeier statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "23.12.2015",
                endDate     : "24.12.2015"
            },
            {
                id          : 15,
                name        : "Karneval",
                description : "Nächste Woche findet bei uns Karneval statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "16.02.2016",
                endDate     : "20.02.2016"
            },
            {
                id          : 12,
                name        : "Projektwoche",
                description : "Nächste Woche findet bei uns die Projektwoche statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "20.06.2016",
                endDate     : "27.06.2016"
            },
            {
                id          : 13,
                name        : "Weihnachtsfeier",
                description : "Nächste Woche findet bei uns die Weihnachtsfeier statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "23.12.2015",
                endDate     : "24.12.2015"
            },
            {
                id          : 15,
                name        : "Karneval",
                description : "Nächste Woche findet bei uns Karneval statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "16.02.2016",
                endDate     : "20.02.2016"
            },
            {
                id          : 12,
                name        : "Projektwoche",
                description : "Nächste Woche findet bei uns die Projektwoche statt",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "20.06.2016",
                endDate     : "27.06.2016"
            },
            {
                id          : 16,
                name        : "Sommerferien",
                description : "Nächste Woche sind die Sommerferien",
                image       : "../img/test.jpg",
                userId      : 82404,
                startDate   : "30.06.2016",
                endDate     : "15.08.2016"
            }
        ]
    };

    /** @namespace */
    var GuiManager     = {};
    GuiManager.topbar  = $('.top-bar');
    GuiManager.sidebar = $('.side-bar');
    GuiManager.content = $('.details-pane');
    GuiManager.overlay = $('.overlay');

    GuiManager.Templates       = {};
    GuiManager.Templates.event = $('.inner.new-event');

    /**
     * @namespace
     * member
     */
    GuiManager.Database = {};
    /**
     * @namespace
     * @member
     */
    GuiManager.SideBar = {};
    GuiManager.SideBar.aList = [];
    /**
     * @namespace
     * @member
     */
    GuiManager.Inventory = {};
    /**
     * @namespace
     * @member
     */
    GuiManager.Events = {};
    /**
     * @namespace
     * @member
     */
    GuiManager.Equipment = {};

    GuiManager.init = function()
    {
        GuiManager.Database.searchEvents();
        GuiManager.Events.setClickListeners();
    };

    /**
     * Entfernt alle Kinder aus dem Content Bereich
     */
    GuiManager.clearContent = function()
    {
        GuiManager.content.html("");
    };

    /**
     * Zeigt einen Dialog an
     * @param sMessage {String}
     * @param fFunction {Function}
     */
    GuiManager.showDialog = function( sMessage, fFunction )
    {
        var $Dialog    = $('<div class="dialog"><p>' + sMessage + '</p>');
        var $BtnAdd    = $('<a href="#" class="ok button">Ok</a>');
        var $BtnCancel = $('<a href="#" class="cancel button">Abbrechen</a>');
        var $clearer   = $('<div class="clearer"></div></div>');

        $Dialog.append($BtnAdd);
        $Dialog.append($BtnCancel);
        $Dialog.append($clearer);

        $BtnCancel.on('click', function( event )
        {
            event.preventDefault();

            GuiManager.overlay.hide();
            GuiManager.overlay.empty();

            $(this).off();
        });

        $BtnAdd.on('click', function( event )
        {
            event.preventDefault();

            GuiManager.overlay.hide();
            GuiManager.overlay.empty();

            fFunction();

            $(this).off();
        });

        GuiManager.overlay.html($Dialog);
        GuiManager.overlay.show();
    };

    /**
     * Fragt beim Backend ein Set aus Events an, die Filterung hängt von [filterParams] ab
     * @param filterParams {JSON}
     */
    GuiManager.Database.searchEvents = function( filterParams )
    {
        $.ajax({
            url     : "http://artur.qwede.de/api/events/1",
            type    : "GET",
            data    : {
                token    : "vsdsdvs",
                filterBy : {
                    categorys : [ "Physik" ]
                }
            },
            success : function( result, status, xhr )
            {
                //var oResult = JSON.parse(A_DUMMY_JSON_EVENTS);
                var oResult = A_DUMMY_JSON_EVENTS;

                for( var i = 0; i < oResult.events.length; i++ )
                {
                    var oEvent = oResult.events[ i ];

                    GuiManager.SideBar.aList.push(new Event(oEvent));
                }

                GuiManager.SideBar.refreshEvents(oResult.events);
            },
            error   : function( xhr, status, error )
            {

            }
        })
    };

    GuiManager.SideBar.clear = function()
    {
        GuiManager.sidebar.find('.overview-item').each(function()
        {
            $(this).remove();
        });
    };

    GuiManager.SideBar.refreshEvents = function( aEventsList )
    {
        for( var i = 0; i < aEventsList.length; i++ )
        {
            var oEvent     = aEventsList[ i ];
            var $EventItem = $(Templates.eventListItem);

            $EventItem.find('.title').text(oEvent.name);
            $EventItem.find('.date').text(oEvent.startDate);

            GuiManager.sidebar.append($EventItem);
            GuiManager.SideBar.addClickListener($EventItem, oEvent);
        }
    };

    GuiManager.SideBar.addClickListener = function( $Element, oEvent )
    {
        $Element.on('click', function()
        {
            GuiManager.Events.add(oEvent)
        });
    };

    GuiManager.Events.setClickListeners = function()
    {
        GuiManager.overlay.on('click', function()
        {
            $(this).hide();
        });

        $('.top-bar .add').on('click', GuiManager.Events.add)
    };

    GuiManager.Events.add = function( oEvent )
    {
        if( GuiManager.content.children().length > 0 && $('.inner').hasClass('changed'))
        {
            GuiManager.showDialog("Ungespeicherte Änderungen gehen verloren. Neue Vorlage öffnen?", function()
            {
                GuiManager.content.html(Templates.eventContent);

                if( oEvent !== undefined )
                    GuiManager.Events.fill(oEvent);
                else
                    GuiManager.Events.addChangedListener();

                window.Layout.refresh();
            });
        }
        else
        {
            GuiManager.content.html(Templates.eventContent);

            if( oEvent !== undefined )
                GuiManager.Events.fill(oEvent);

            window.Layout.refresh();
        }
    };

    GuiManager.Events.fill = function( oEvent )
    {
        var $Container = GuiManager.content;

        var $Headlne     = $Container.find('h1');
        var $Name        = $Container.find('[name="name"]');
        var $Description = $Container.find('[name="description"]');
        var $StartDate   = $Container.find('[name="startDate"]');
        var $EndDate     = $Container.find('[name="endDate"]');

        $Headlne.html(oEvent.name)
        $Name.val(oEvent.name);
        $Description.val(oEvent.description);
        $StartDate.val(oEvent.startDate);
        $EndDate.val(oEvent.endDate);

        GuiManager.Events.addChangedListener();
    };

    GuiManager.Events.addChangedListener = function()
    {
        var aInputElements = $('.inner input, textarea');

        aInputElements.on("change", function()
        {
            $(this).closest('.inner').addClass('changed');
        });
    };

    GuiManager.init();

})(jQuery, window, undefined);