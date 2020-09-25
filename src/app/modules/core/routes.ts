import { environment } from 'src/environments/environment';

const { api, apiPrefix, agent } = environment;

export const API_ROUTE_OPTIONS = {
    GET_LIST: `/vlist`,
    DEL_FROM_LIST: `/vlist`,
    ADD_TO_LIST: `/vlist`,
    GET_IN_LIST: `/vlist`,
    GET_BROWSE: `/browse`,
    GET_RECENT: `/recent`,
    GET_RECENTLY_CHANGED: `/recent`,
    GET_FILE_DETAILS: `/details`,
    GET_FILE_DETAILS_BY_ID: `/detailz`,
    IMG_THUMBNAIL: `/img/thumbs`,
    IMG_SERIES: `/img/series`,
    IMG_PRUNE_THUMBNAIL: `/img/prune`,
    GET_PENDING_RESOURCE_STATUS: `/resource`,
    GET_SERIES_OPTIONS: `/series/options`,
    UPDATE_SERIES_OPTION: `/series`,
    GET_SERVER_LOAD: `/load`,
    GET_SERVER_INFO: `/info`,
    GET_SERVER_CONSOLE: `/console`,
};

export const UI_ROUTES = {
    BROWSE: '/v/browse',
    SERIES: '/v/series',
    PLAY: '/v/play',
};

export const AGENT_ROUTES = {
    PLAY: `${agent}/api/play`,
    DOKI: `${agent}/api/doki`,
};

export const STREAM_ROUTES = {
    GET_STREAM: `${api}${apiPrefix}/stream`,
    GET_SUBTITLE: `${api}${apiPrefix}/subtitle`,
};
