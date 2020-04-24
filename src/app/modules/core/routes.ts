import { environment } from 'src/environments/environment';

const api = environment.api;

export const API_ROUTES = {
    GET_FAVOURITES: `${api}/favs`,
    DEL_FAVOURITE: `${api}/fav`,
    ADD_FAVOURITE: `${api}/fav`,
    GET_FAVOURITE: `${api}/fav`,
    GET_BROWSE: `${api}/browse`,
    GET_RECENT: `${api}/recent`,
    GET_FILE_DETAILS: `${api}/details`,
    IMG_THUMBNAIL: `${api}/img/thumbs`,
    IMG_SERIES: `${api}/img/series`,
    GET_PENDING_RESOURCE_STATUS: `${api}/resource`,
    GET_SERIES_OPTIONS: `${api}/series/options`,
    UPDATE_SERIES_OPTION: `${api}/series`,
};

export const UI_ROUTES = {
    BROWSE: '/v/browse',
    SERIES: '/v/series',
};
