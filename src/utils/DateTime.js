class DateTime {
    constructor() {
        console.log("constructor");
    }

    /**
     * @description <p>This JavaScript function, getOffset(), returns the offset of the local time zone from UTC in the specified format. The function takes an optional argument format, which is an object that defines the format for the returned offset value.</p>
     * <p><b>The possible format options are:</b></p>
     <ul>
         <li><b>minutes:</b> returns the offset in minutes.</li>
         <li><b>seconds:</b> returns the offset in seconds.</li>
         <li><b>hours:</b> returns the offset in hours.</li>
         <li><b>days:</b> returns the offset in days.</li>
         <li><b>miliseconds:</b> returns the offset in miliseconds.</li>
     </ul>
     <h2>Note:</h2><p>If format is not specified, it defaults to returning the offset in minutes. The value is returned as an object with two properties: value and format.</p>
     * @param formate
     * @returns {{formate: string, value: number}}
     */
    getOffset(formate = null) {
        if (!formate)
            return {
                value: new Date().getTimezoneOffset(),
                formate: "minutes",
            };

        if (formate.minutes)
            return { value: new Date().getTimezoneOffset(), formate: "hours" };
        else if (formate.seconds)
            return {
                value: new Date().getTimezoneOffset() * 60,
                formate: "seconds",
            };
        else if (formate.hours)
            return {
                value: new Date().getTimezoneOffset() / 60,
                formate: "hours",
            };
        else if (formate.days)
            return {
                value: new Date().getTimezoneOffset() / 1440,
                formate: "days",
            };
        else if (formate.miliseconds)
            return {
                value: new Date().getTimezoneOffset() * 60000,
                formate: "miliseconds",
            };
    }

    /**
     * @private
     * @param formate JSON OBJECT example: <code>{ local:true }</code>)
     * @returns {number|string|Date}
     * @description <p>This JavaScript function, <b>getDate()</b>, returns the current date and time based on the passed format in <b>JSON OBJECT</b>.</p>
     * <p>The possible formats are:</p>
        <ul>
            <li><b>local:</b> returns the current date and time in the local timezone.</li>
            <li><b>utc:</b> returns the current date and time in UTC (Coordinated Universal Time) format.</li>
            <li><b>utcMiliseconds:</b> returns the current time in UTC format in miliseconds.</li>
            <li><b>utcSeconds:</b> returns the current time in UTC format in seconds.</li>
            <li><b>localMiliseconds:</b> returns the current time in the local timezone in miliseconds.</li>
            <li><b>localSeconds:</b> returns the current time in the local timezone in seconds.</li>
        </ul>
     */
    getDate(formate = null) {
        if (!formate || formate.local)
            return Date(
                new Date().getTime() +
                this.getOffset({ miliseconds: true }).value
            );
        if (formate.utc) return new Date();
        if (formate.utcMiliseconds) return new Date().getTime();
        if (formate.utcSeconds) return Math.floor(new Date().getTime() / 1000);
        if (formate.localMiliseconds)
            return (
                new Date().getTime() +
                this.getOffset({ miliseconds: true }).value
            );
        if (formate.localSeconds)
            return Math.floor(
                (new Date().getTime() +
                    this.getOffset({ miliseconds: true }).value) /
                1000
            );
    }
}

module.exports = DateTime;
