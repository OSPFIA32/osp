(function( $, window, undefined )
{
    console.log("tset");

    /** @namespace */
    var GuiManager     = {};
    GuiManager.topbar  = $('.top-bar');
    GuiManager.sidebar = $('.side-bar');
    GuiManager.content = $('.details-pane');
    GuiManager.overlay = $('.overlay');

    GuiManager.Templates               = {};
    GuiManager.Templates.event         = $('.inner.new-event');
    GuiManager.Templates.eventListItem = $('<div class="overview-item"><span class="title"></span><span class="date"></span></div>');

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

    GuiManager.clearContent = function()
    {
        GuiManager.content.html("");
    };

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
            url     : "http://markus.qwede.de/api/events/1",
            type    : "GET",
            data    : {
                token    : "vsdsdvs",
                filterBy : {
                    categorys : [ "Physik" ]
                }
            },
            success : function( result, status, xhr )
            {
                for( var i = 0; i < result.events.length; i++ )
                {
                    var oEvent = result.events[ i ];

                    GuiManager.SideBar.aList.push(new Event(oEvent));
                }

                GuiManager.SideBar.refreshEvents(result.events);
            },
            error   : function( xhr, status, error )
            {

            }
        })
    };

    GuiManager.SideBar.clear = function()
    {
        GuiManager.sidebar.empty();
    };

    GuiManager.SideBar.refreshEvents = function( aEventsList )
    {
        GuiManager.SideBar.clear();

        for( var i = 0; i < aEventsList.length; i++ )
        {
            var oEvent     = aEventsList[ i ];
            var $EventItem = $(GuiManager.Templates.eventListItem.html());

            $EventItem.find('.title').text(oEvent.name);
            $EventItem.find('.date').text(oEvent.startDate);

            GuiManager.sidebar.append($EventItem);
        }
    };

    GuiManager.Events.setClickListeners = function()
    {
        GuiManager.overlay.on('click', function()
        {
            $(this).hide();
        });

        $('.top-bar .add').on('click', GuiManager.Events.add)
    };

    GuiManager.Events.add = function()
    {
        if( GuiManager.content.children().length == 0 )
        {
            GuiManager.content.html('<div class="inner new-event">' + GuiManager.Templates.event.html() + '</div>');
            window.Layout.refresh();
        }
        else
        {
            GuiManager.showDialog("Ungespeicherte Änderungen gehen verloren. Neue Vorlage öffnen?", function()
            {
                GuiManager.content.html('<div class="inner new-event">' + GuiManager.Templates.event.html() + '</div>');
                window.Layout.refresh();
            });
        }
    };

    GuiManager.init();

})(jQuery, window, undefined);