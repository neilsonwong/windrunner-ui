export default interface AniListData {
  id: number;
  season: string;
  seasonYear: number;
  episodes: number;
  source: string;
  title: string; // romaji
  englishTitle: string;
  nativeTitle: string;
  genres: Array<string>;
  coverImage: string;
  color: string|null;
  bannerImage: string;
  studio: string;
  nextAiringEpisode: any;
  description: string;
  localCoverImage: string|null;
  localBannerImage: string|null;
}
