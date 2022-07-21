export function isValidYoutubeUrl(url: string) {
    const regEx = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    let match = url.match(regEx);
    if (match) {

        console.log('Match: ', match[1]);
        return match[1]
    }

    return false;
}