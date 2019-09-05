const isVideoRegExp = new RegExp(/(\.(avi|mkv|ogm|mp4|flv|ogg|wmv|rm|mpeg|mpg)$)/);

export function isVideo(fileName: string) {
    return isVideoRegExp.test(fileName);
}