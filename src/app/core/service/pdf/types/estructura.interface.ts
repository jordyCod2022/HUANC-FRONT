interface AutoTableColumnStyles {
    fontStyle?: string;
    cellWidth?: number | 'auto';
}

interface AutoTableStyles {
    fontSize?: number;
    cellPadding?: number;
}

interface AutoTableOptions {
    startY: number;
    body: string[][];
    theme?: string;
    styles?: AutoTableStyles;
    columnStyles?: { [key: number]: AutoTableColumnStyles };
    margin?: { left?: number; right?: number };
    tableLineWidth?: number;
}
