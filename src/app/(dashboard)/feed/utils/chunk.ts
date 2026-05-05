export function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

export function filterByPlatform(games: { origin_platform: string }[], keyword: string) {
    return games.filter((g) => g.origin_platform.toLowerCase().includes(keyword.toLowerCase()));
}
