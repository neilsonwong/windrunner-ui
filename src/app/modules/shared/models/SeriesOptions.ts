export interface titles {
    romaji: string;
    english: string;
    native: string;
};

export interface SeriesOption {
    id: number;
    format: string;
    seasonYear: number;
    title: titles;
    synonyms: Array<string>;
};

export interface SeriesOptions {
    results: Array<SeriesOption>;
};

export interface SeriesOptionUpdate {
    folder: string;
    aniListId: number;
};