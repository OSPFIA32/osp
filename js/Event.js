/**
 * @author Artur
 * @date 17.11.2015
 */

/**
 * @param settings {String}
 * @constructor
 */
var Event = function( settings )
{
    this.id          = settings.id;
    this.name        = settings.name;
    this.description = settings.description;
    this.image       = settings.image;
    this.userId      = settings.userId;

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