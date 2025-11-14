export const formatDate = (iso: string) => {
    const d = new Date(iso)

    return d.toLocaleDateString('en-US', {
        weekday: 'short',       // Wed
        day: '2-digit',         // 31
        month: 'long',          // July
        year: 'numeric'         // 2024
    })
}
