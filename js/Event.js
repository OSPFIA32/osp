/**
 * @author Artur
 * @date 17.11.2015
 */


/* TODO: Das ERD muss hier noch entsprechend angepasst werden */

/**
 * @param settings {String}
 * @constructor
 */
var Event = function( settings )
{
    this.id           = settings.id;
    this.name         = settings.name;
    this.description  = settings.description;
    this.image        = settings.image;
    this.userId       = settings.userId;
    this.document     = settings.document;
    this.categories   = settings.categories;
    this.reservations = settings.reservations;

    this.Date = {
        start : settings.startDate,
        end   : settings.endDate
    };
};

/**
 * Generiert das HTML
 */
Event.prototype.createHtml = function()
{

};