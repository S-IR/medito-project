export function timeSinceNow(date: Date): string {

    
    // Get the current date and time
    const now = new Date();

    // Calculate the difference in milliseconds
    const diff = now.getTime() - date.getTime();

    // Convert the difference to minutes
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {
        return `less than an hour`;
    }

    // Convert the difference to hours
    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hours ago`;
    }

    // Convert the difference to days
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
}