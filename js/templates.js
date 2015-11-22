/**
 * @author Artur
 * @date 18.11.2015
 */

/**
 * Hier werden die Kleinen HTML Snippets hinterlegt
 * @namespace
 */
var Templates = {
    eventListItem : '<div class="overview-item"><span class="title"></span><span class="date"></span></div>',
    eventContent : '<div class="inner new-event">\n    <h1>Neue Veranstaltung</h1>\n\n    <form class="event-form">\n        <fieldset>\n            <label for="name">Name der Veranstaltung</label>\n            <input type="text" name="name" placeholder="Name der Veranstaltung" class="width-50 mr20">\n        </fieldset>\n        <fieldset>\n            <label for="startDate">Startzeit und Endzeit</label>\n            <input type="text" name="startDate" class="datetimepcker width-20">\n            <input type="text" name="endDate" class="datetimepcker width-20">\n        </fieldset>\n        <!-- select hidden="hidden" name="category"></select-->\n        <textarea name="description" placeholder="Beschreibung der Veranstaltung"></textarea>\n        <br>\n        <input type="file" name="document" hidden="hidden">\n\n        <div class="reservations">\n            <div class="tool-bar">\n                <span class="add">Hinzufügen</span>\n                <span class="edit">Bearbeiten</span>\n                <span class="remove">Entfernen</span>\n            </div>     \n            <span class="reservation-item">OHP | A103 | fia32erotschkin<span class="release-state"></span></span>\n            <span class="reservation-item">OHP | A103 | fia32erotschkin<span class="release-state">Erwartet Freigabe</span></span>\n            <span class="reservation-item">OHP | A103 | fia32erotschkin<span class="release-state"></span></span>\n            <span class="reservation-item">OHP | A103 | fia32erotschkin<span class="release-state">Erwartet Freigabe</span></span>\n            <span class="reservation-item">OHP | A103 | fia32erotschkin<span class="release-state">Erwartet Freigabe</span></span>\n            <span class="reservation-item">OHP | A103 | fia32erotschkin<span class="release-state"></span></span>\n            \n        </div>\n        <div class="clearer"></div>\n        <input type="submit" value="Speichern" class="event-submit">\n    </form>\n</div>'
};