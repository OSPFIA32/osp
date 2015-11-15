(function( $, window, undefined )
{
    /** @namespace */
    var GuiManager     = {};
    GuiManager.topbar  = $( '.top-bar' );
    GuiManager.sidebar = $( '.side-bar' );
    GuiManager.content = $( '.details-pane' );
    GuiManager.overlay = $( '.overlay' );

    GuiManager.Templates       = {};
    GuiManager.Templates.event = $( '.inner.new-event' );

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
        GuiManager.Events.setClickListeners();
    }

    GuiManager.clearContent = function()
    {
        GuiManager.content.html( "" );
    }

    GuiManager.showDialog = function( sMessage, fFunction )
    {
        GuiManager.overlay.show();

        GuiManager.overlay.html( '<div class="dialog"><p>' + sMessage + '</p><a href="#" class="ok button">Ok</a><a href="#" class="cancel button">Abbrechen</a><div class="clearer"></div></div>' );
    }

    GuiManager.Events.setClickListeners = function()
    {
        GuiManager.overlay.on( 'click', function()
        {
            $( this ).hide();
        } )

        $( '.top-bar .add' ).on( 'click', GuiManager.Events.add )
    }

    GuiManager.Events.add = function()
    {
        console.log( "test" );

        if( GuiManager.content.html() == false )
        {
            GuiManager.content.html( '<div class="inner new-event">' + GuiManager.Templates.event.html() + '</div>' );
        }
        else
        {
            GuiManager.showDialog( "Ungespeicherte Änderungen gehen verloren. Neue Vorlage öffnen?", function()
            {
                GuiManager.content.html( '<div class="inner new-event">' + GuiManager.Templates.event.html() + '</div>' );
            } );
        }
    }

    GuiManager.init();

})( jQuery, window, undefined )