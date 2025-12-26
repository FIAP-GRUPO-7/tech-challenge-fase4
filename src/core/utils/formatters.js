export function parseTimestamp(ts) {
	if (!ts) return null;
	if (typeof ts?.toMillis === 'function') return ts.toMillis();
	if (ts?.seconds !== undefined) {
		const seconds = Number(ts.seconds) || 0;
		const nanos = Number(ts.nanoseconds) || 0;
		return seconds * 1000 + Math.floor(nanos / 1e6);
	}
	if (typeof ts === 'number') return ts;
	const parsed = Date.parse(ts);
	return isNaN(parsed) ? null : parsed;
}

export function formatCurrencyBR(value = 0) {
	const num = Number(value) || 0;
	return `R$ ${num.toFixed(2).replace('.', ',')}`;
}
