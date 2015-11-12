(function($, window, undefined)
{
	/** @namespace */
	var LoginManager 	= {};

	/** @namespace */
	var GuiManager 		= {};
		/** 
		 * @namespace
		 * @member
		 */
		GuiManager.Admin 	= {};
		/** 
		 * @namespace
		 * @member
		 */
		GuiManager.Group1 	= {};
		/** 
		 * @namespace
		 * @member
		 */
		GuiManager.Group2 	= {};

	/**
	 * Initialisiert dem {LoginManager}
	 */
	LoginManager.init = function()
	{
		$('#login').on('submit', function(event)
		{
			event.preventDefault();
			LoginManager.login();
		});
	}

	/**
	 * Gleich die erforderlichen Daten ab und speichert diese falls der Login stimmt
	 */
	LoginManager.login = function()
	{
		var oData = LoginManager.verificateLogin();

		if(oData === null)
		{
			console.error("Fehler bei der Anmeldung");
			return;
		}

		LoginManager.createUser(oData);
		GuiManager.clear();

		if(oData.group == 0)
		{
			GuiManager.Admin.createGui();
		}
		else if(oData.group == 1)
		{
			GuiManager.Group1.createGui();
		}
		else
		{
			GuiManager.Group2.createGui();
		}
	}

	/**
	 * Überprüft die Login Daten
	 * @return {JSON} oPackege Das empfangene Datenpaket
	 */
	LoginManager.verificateLogin = function()
	{
		// $.ajax(
		// {
	 //        type: "POST",
	 //        data: $('#login').serialize(),
	 //        url: "",
	 //        success: function(data)
	 //        {

	 //        }
  //   	});

		var oPackege = 
		{
			name 		: "aerotschkin",
			id 			: 69,
			token 		: "Hd74hCw29",
			group 		: 0
		}

		return oPackege;
	}

	/**
	 * Instantiiert den User
	 * @param {JSON} oData Das Datenpacket, das zur Initialisierung der {User}s notwendig ist
	 */
	LoginManager.createUser = function(oData)
	{
		LoginManager.user = new User(oData);
	}

	/**
	 * @class [<User> <User>]
	 * @param {JSON} settings Einstellungen
	 */
	var User = function(settings)
	{
		this.sName 			= settings.name 		|| "empty username";
		this.nId 			= settings.id 			|| null;
		this.sAccessToken 	= settings.token 		|| null;
		this.nRightGroup 	= settings.group 		|| null;
	}

	GuiManager.clear = function()
	{

	}

	GuiManager.Admin.createGui = function()
	{

	}

	LoginManager.init();

})(jQuery, window, undefined)