<!doctype html>
<html lang="de">
	<head>
		<meta charset="utf-8">
		<title>Lehrmittelverwaltung</title>
		<meta name="description" content="Lerhmittelverwaltung">
		<link rel="stylesheet" href="../css/normalize.css">
		<link rel="stylesheet" href="../css/main.css">
		<script src="../js/jquery.js"></script>
	</head>
	<body>
		<div class="webapp">
			<div class="top-bar">
				<div class="top-dropdown-container transition-300 double-width">
					<select hidden="hidden">
			  			<option>Eigene Veranstalt.</option>
			  			<option>Veranstalt. Suchen</option>
					</select>
				</div>
				<a href="#" class="add button bright left top-bar-item" data-tooltip="Veranstaltung hinzufügen">+</a>
				<a href="#" class="button bright logout right top-bar-item">Ausloggen</a>
				<!--span class="username">aerotschkin</span-->
			</div>


			<div class="side-bar left">
				<hr class="broad" />
				<div class="overview-item transition-300">
					<span class="title">Oberstufenprojekt</span>
					<span class="date">09.11.2015</span>
					<hr />
				</div>
				<div class="overview-item transition-300">
					<span class="title">Oberstufenprojekt</span>
					<span class="date">09.11.2015</span>
					<hr />
				</div>
				<div class="overview-item transition-300">
					<span class="title">Oberstufenprojekt</span>
					<span class="date">09.11.2015</span>
					<hr />
				</div>
				<div class="overview-item transition-300">
					<span class="title">Oberstufenprojekt</span>
					<span class="date">09.11.2015</span>
					<hr />
				</div>
			</div>

			<div class="details-pane left">

			</div>
		</div>

		<div class="templates">

			<div class="inner new-event">
				<h1>Neue Veranstaltung</h1>

				<form>
					<input name="name" type="text" placeholder="Name der Veranstaltung" class="width-50" />
					<textarea name="description" placeholder="Beschreibung der Veranstaltung"></textarea>
					<input type="submit" value="Speichern" />
					<input type="button" value="Verwerfen" />
				</form>
			</div>

		</div>

		<script src="../js/layout.js"></script>
		<script src="../js/GuiManager.js"></script>
	</body>
</html>
