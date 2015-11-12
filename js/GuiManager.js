(function($, window, undefined)
{
	/** @namespace */
	var GuiManager 		= {};
		GuiManager.topbar 	= $('.top-bar');
		GuiManager.sidebar 	= $('.side-bar');
		GuiManager.content 	= $('.details-pane');

		GuiManager.Templates = {};
			GuiManager.Templates.event = $('.inner.new-event');

		/** 
		 * @namespace
		 * @member
		 */
		GuiManager.Inventory 	= {};
		/** 
		 * @namespace
		 * @member
		 */
		GuiManager.Events 		= {};
		/** 
		 * @namespace
		 * @member
		 */
		GuiManager.Equipment 	= {};

	GuiManager.init = function()
	{
		GuiManager.Events.setClickListeners();
	}

	GuiManager.clearContent = function()
	{
		GuiManager.content.html("");
	}

	GuiManager.Events.setClickListeners = function()
	{
		$('.top-bar .add').on('click', GuiManager.Events.add)
	}

	GuiManager.Events.add = function()
	{
		GuiManager.content.html('<div class="inner new-event">' + GuiManager.Templates.event.html() + '</div>');
	}

	GuiManager.init();

})(jQuery, window, undefined)