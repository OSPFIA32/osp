/**
 * @param {JSON} settings
 * @constructor
 */
var Event = function( settings )
{
    this.id           = settings.id;
    this.name         = settings.name;
    this.description  = settings.description;
    this.userId       = settings.userId;
    this.document     = settings.document;
    this.reservations = settings.reservations;

    this.Date = {
        start : settings.startDate,
        end   : settings.endDate
    };
};