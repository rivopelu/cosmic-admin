/**
 * Format a number as currency in Indonesian Rupiah (IDR)
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "Rp 150.000")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a number with thousand separators
 * @param amount - The amount to format
 * @returns Formatted number string (e.g., "150.000")
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount)
}
