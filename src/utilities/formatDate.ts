export const formatDate = (date: string) => {
    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString("pl-PL", {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    return formattedDate
}