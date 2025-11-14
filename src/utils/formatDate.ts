export const formatDate = (iso: string) => {
    const d = new Date(iso)

    return d.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}
