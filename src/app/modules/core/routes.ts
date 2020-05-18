import { environment } from 'src/environments/environment';

const agent = environment.agent;

export enum API_ROUTE_OPTIONS {
    GET_LIST = 'GET_LIST',
    DEL_FROM_LIST = 'DEL_FROM_LIST',
    ADD_TO_LIST = 'ADD_TO_LIST',
    GET_IN_LIST = 'GET_IN_LIST',
    GET_BROWSE = 'GET_BROWSE',
    GET_RECENT = 'GET_RECENT',
    GET_RECENTLY_CHANGED = 'GET_RECENTLY_CHANGED',
    GET_FILE_DETAILS = 'GET_FILE_DETAILS',
    IMG_THUMBNAIL = 'IMG_THUMBNAIL',
    IMG_SERIES = 'IMG_SERIES',
    IMG_PRUNE_THUMBNAIL = 'IMG_PRUNE_THUMBNAIL',
    GET_PENDING_RESOURCE_STATUS = 'GET_PENDING_RESOURCE_STATUS',
    GET_SERIES_OPTIONS = 'GET_SERIES_OPTIONS',
    UPDATE_SERIES_OPTION = 'UPDATE_SERIES_OPTION',
    GET_SERVER_LOAD = 'GET_SERVER_LOAD'
};

export const UI_ROUTES = {
    BROWSE: '/v/browse',
    SERIES: '/v/series',
};

export const AGENT_ROUTES = {
    PLAY: `${agent}/api/play`,
    DOKI: `${agent}/api/doki`,
};