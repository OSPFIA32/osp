(function( $, window, undefined )
{
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
        GuiManager.content.html("");
    }

    GuiManager.showDialog = function( sMessage, fFunction )
    {
        var $Dialog    = $('<div class="dialog"><p>' + sMessage + '</p>');
        var $BtnAdd    = $('<a href="#" class="ok button">Ok</a>');
        var $BtnCancel = $('<a href="#" class="cancel button">Abbrechen</a>');
        var $clearer   = $('<div class="clearer"></div></div>');

        $Dialog.append($BtnAdd);
        $Dialog.append($BtnCancel);
        $Dialog.append($clearer);

        $BtnCancel.on('click', function(event){
            event.preventDefault();

            GuiManager.overlay.hide();
            GuiManager.overlay.empty();

            $(this).off();
        })

        $BtnAdd.on('click', function(event){
            event.preventDefault();

            GuiManager.overlay.hide();
            GuiManager.overlay.empty();

            fFunction();

            $(this).off();
        })

        GuiManager.overlay.html($Dialog);

        GuiManager.overlay.show();
    }

    GuiManager.Events.setClickListeners = function()
    {
        GuiManager.overlay.on('click', function()
        {
            $(this).hide();
        })

        $('.top-bar .add').on('click', GuiManager.Events.add)
    }

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
    }

    GuiManager.init();

})(jQuery, window, undefined)