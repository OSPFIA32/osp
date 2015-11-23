    /** @namespace */
    var GuiManager                = {};
    GuiManager.topbar             = $('.top-bar');
    GuiManager.sidebar            = $('.side-bar');
    GuiManager.content            = $('.details-pane');
    GuiManager.overlay            = $('.overlay');
    GuiManager.reservationOverlay = $('.reservation-overlay');

    GuiManager.Templates       = {};
    GuiManager.Templates.event = $('.inner.new-event');

    /**
     * @namespace
     * @memberof GuiManager
     */
    GuiManager.Database = {};
    /**
     * @namespace
     * @memberof GuiManager
     */
    GuiManager.SideBar = {};
    GuiManager.SideBar.aList = [];
    /**
     * @namespace
     * @memberof GuiManager
     */
    GuiManager.Inventory = {};
    /**
     * @namespace
     * @memberof GuiManager
     */
    GuiManager.Events = {};
    /**
     * @namespace
     * @memberof GuiManager
     */
    GuiManager.Equipment = {};

    /**
     * Initialisierung des GuiManagers
     */
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
            url     : "/api/events/",
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

    /**
     * Entfernt alle "overview-item" Elemente aus der Sidebar
     */
    GuiManager.SideBar.clear = function()
    {
        GuiManager.sidebar.find('.overview-item').each(function()
        {
            $(this).remove();
        });
    };

    /**
     * Läd die Veranstaltungen in der Sidebar neu
     * @param {Array} aEventsList
     */
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

    /**
     * Setzt den Clicklistener für die Elemente in der Sidebar
     * @param {jQuery-Objekt} $Element
     * @param {Object} oEvent
     */
    GuiManager.SideBar.addClickListener = function( $Element, oEvent )
    {
        $Element.on('click', function()
        {
            GuiManager.Events.add(oEvent)
        });
    };

    /**
     * Setzt die Clicklistener für den "Veransstaltunge hinzufügen Button"
     */
    GuiManager.Events.setClickListeners = function()
    {
        GuiManager.overlay.on('click', function()
        {
            $(this).hide();
        });

        $('.top-bar .add').on('click', GuiManager.Events.add)
    };

    /**
     * Fügt einen neues Veranstaltungefenster zum Contentbereich hinzu
     * @param {Object} oEvent
     */
    GuiManager.Events.add = function( oEvent )
    {
        if( GuiManager.content.children().length > 0 && $('.inner').hasClass('changed') )
        {
            GuiManager.showDialog("Ungespeicherte Änderungen gehen verloren. Neue Vorlage öffnen?", function()
            {
                GuiManager.Events.addAdditional();

                if( oEvent !== undefined )
                    GuiManager.Events.fill(oEvent);
                else
                    GuiManager.Events.addChangedListener();

                window.Layout.refresh();
            });
        }
        else
        {
            GuiManager.Events.addAdditional();

            if( oEvent !== undefined )
                GuiManager.Events.fill(oEvent);

            window.Layout.refresh();
        }
    };

    /**
     * Führt noch zusätzliche Funktionalitäten aus, die beim Neuerstellen einer Veranstaltung notwendig sind
     */
    GuiManager.Events.addAdditional = function()
    {
        GuiManager.content.html(Templates.eventContent);
        GuiManager.Events.createCategory();
        GuiManager.Events.setReservationClickListeners();
        GuiManager.Events.onSubmit();
    };

    /**
     * Holt sich die Kategorien und stellt sie dar
     */
    GuiManager.Events.createCategory = function()
    {
        var aCategories = A_DUMMY_JSON_EVENTS.categories;
        var aSelects    = $('select[name="category"]');

        aSelects.each(function()
        {
            for( var i = 0; i < aCategories.length; i++ )
            {
                var sCategory = aCategories[ i ];
                $(this).append('<option>' + sCategory + '</option>')
            }
        });
    };

    /**
     * Befüllt ein neues Veranstaltungsfenster
     * @param {Object} oEvent
     */
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

    /**
     * Setzt den Listener der auf eine Änderung im Formular hört
     */
    GuiManager.Events.addChangedListener = function()
    {
        var aInputElements = $('.inner input, textarea, select');

        aInputElements.on("change", function()
        {
            $(this).closest('.inner').addClass('changed');
        });
    };

    /**
     * Setzt den Listener für die Reservirungen im Veranststaltungs-Formular
     */
    GuiManager.Events.setReservationClickListeners = function()
    {
        var $Container    = $('.reservations')
        var $Add          = $Container.find('.add');
        var $Edit         = $Container.find('.edit');
        var $Remove       = $Container.find('.remove');
        var aReservations = $Container.find('.reservation-item');

        $Add.on('click', function()
        {
            GuiManager.Events.addReservation();
        });

        $Edit.on('click', function()
        {
            // RESERVIERUNG BEARBEITEN
        });

        $Remove.on('click', function()
        {
            // RESERVIERUNG LÖSCHEN
        });

        aReservations.each(function()
        {
            $(this).on('click', function()
            {
                aReservations.each(function()
                {
                    $(this).removeClass('selected');
                });

                $(this).addClass('selected');
            });
        });
    };

    /**
     * Fügt eine Reservierung hinzu
     */
    GuiManager.Events.addReservation = function()
    {
        GuiManager.reservationOverlay.show();
    };

    /**
     * Formatiert einen Datumsstring
     * @param {String} sDate
     * @returns {String} sNewDateTime
     */
    GuiManager.Events.formatDate = function( sDate )
    {
        var aDateTime = sDate.split(' ');
        var aDate     = aDateTime[ 0 ].split('.');
        var sNewDateTime;

        if( aDateTime[ 1 ] !== undefined )
        {
            var aTime    = aDateTime[ 1 ].split(':');
            sNewDateTime = aDate[ 2 ] + "." + aDate[ 1 ] + "." + aDate[ 0 ] + " " + aTime[ 0 ] + ":" + aTime[ 1 ] + ":00";
        }
        else
        {
            sNewDateTime = aDate[ 2 ] + "." + aDate[ 1 ] + "." + aDate[ 0 ] + " 00:00:00";
        }

        return sNewDateTime;
    };

    /**
     * Führt die Funktionalität beim Submit des Veranstaltungs-Formulars aus
     */
    GuiManager.Events.onSubmit = function()
    {
        $("form.event-form").off();
        $("form.event-form").on('submit', function( event )
        {
            event.preventDefault();

            if( $(this).closest('.inner').hasClass('changed') )
            {
                $(this).closest('.inner').removeClass('changed');

                var sName        = $(this).find('[name="name"]').val();
                var sDescription = $(this).find('[name="description"]').val();
                var sStartDate   = GuiManager.Events.formatDate($(this).find('[name="startDate"]').val());
                var sEndDate     = GuiManager.Events.formatDate($(this).find('[name="endDate"]').val());

                var oData = {
                    name        : sName,
                    description : sDescription,
                    startDate   : sStartDate,
                    endDate     : sEndDate
                };

                $.ajax({
                    url     : "/api/events/",
                    type    : "POST",
                    data    : oData,
                    success : function( result, status, xhr )
                    {
                        console.log(result);
                    },
                    error   : function( xhr, status, error )
                    {
                        console.log(error);
                    }
                });
            }
        });
    };

    GuiManager.init();