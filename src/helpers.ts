/**
 * Converts HSL to a HEX color string.
 * 
 * @param h - Hue (0 to 360 degrees)
 * @param s - Saturation (0 to 100%)
 * @param l - Lightness (0 to 100%)
 * @returns A hex color string in the format `#RRGGBB`
 */
export function hslToHex(h: number, s: number, l: number): string {
    s /= 100; // Convert saturation to [0,1]
    l /= 100; // Convert lightness to [0,1]

    const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
    const x = c * (1 - Math.abs((h / 60) % 2 - 1)); // Secondary component
    const m = l - c / 2; // Adjustment for lightness

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
    else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

    // Convert RGB components to 0-255 and format as hex
    const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
