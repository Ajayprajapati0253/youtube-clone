export const parseVideoDuration = (duration) => {

    if (!duration) return "0:00"; // Fix for undefined errors

    // Extract hours, minutes, seconds by REGEX
    const hours = duration.match(/(\d+)H/) ? parseInt(duration.match(/(\d+)H/)[1]) : 0;
    const minutes = duration.match(/(\d+)M/) ? parseInt(duration.match(/(\d+)M/)[1]) : 0;
    const seconds = duration.match(/(\d+)S/) ? parseInt(duration.match(/(\d+)S/)[1]) : 0;

    // Format output correctly
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
