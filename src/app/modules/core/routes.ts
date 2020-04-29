import { environment } from 'src/environments/environment';

const api = environment.api;
const agent = environment.agent;

export const API_ROUTES = {
    GET_LIST: `${api}/vlist`,
    DEL_FROM_LIST: `${api}/vlist`,
    ADD_TO_LIST: `${api}/vlist`,
    GET_IN_LIST: `${api}/vlist`,
    GET_BROWSE: `${api}/browse`,
    GET_RECENT: `${api}/recent`,
    GET_RECENTLY_CHANGED: `${api}/recent`,
    GET_FILE_DETAILS: `${api}/details`,
    IMG_THUMBNAIL: `${api}/img/thumbs`,
    IMG_SERIES: `${api}/img/series`,
    IMG_PRUNE_THUMBNAIL: `${api}/img/prune`,
    GET_PENDING_RESOURCE_STATUS: `${api}/resource`,
    GET_SERIES_OPTIONS: `${api}/series/options`,
    UPDATE_SERIES_OPTION: `${api}/series`,
    GET_SERVER_LOAD: `${api}/load`,
};

export const UI_ROUTES = {
    BROWSE: '/v/browse',
    SERIES: '/v/series',
};

export const AGENT_ROUTES = {
    PLAY: `${agent}/play`,
    HELLO: `${agent}/play`,
};