import nyaapi from 'nyaapi';
import utils from '../utils';

/**
 *
 * @param {feeds} feed the feed to retrieve from
 * @param {qualities} quality the quality to retrieve
 * @param {string} term the search terms
 * @param {string} fansub the fansub to get the episodes from
 */
async function getLatestEpisodes(feed, quality, term, fansub = '') {
    fansub = fansub.replace('None', '') ?
        `[${fansub}]` :
        '';
    const query = [fansub, quality, term].join(' ');
    switch (feed) {
    case utils.feeds.SI:
        return await nyaapi.si.search(query, 150, { filter: '0', category: '1_0', sort: 'id', direction: 'desc' });
    case utils.feeds.PANTSU:
        return await nyaapi.pantsu.search(query, 150, { filter: '0', category: '1_0', sort: 'id', direction: 'desc' });
    }
}

/**
 * Parses the input and returns the corresponding enum.
 * @param {string} feed The string to parse
 * @return {utils.feeds} the correponding feed.
 */
function parseFeed(feed) {
    switch (feed) {
    case 'SI':
        return utils.feeds.SI;
    case 'PANTSU':
        return utils.feeds.PANTSU;
    }
}

/**
 * Parses the given quality and returns the corresponding object.
 * @param {string} quality the input quality
 * @return {utils.qualities} the corresponding quality
 */
function parseQuality(quality) {
    switch (quality) {
    case 'FHD':
        return utils.qualities.FHD;
    case 'HD':
        return utils.qualities.HD;
    case 'SD':
        return utils.qualities.SD;
    }
}

/**
 * GetLatestEpisodes feature handler, and responds with a stream containing the results.
 * @param {Writable} call Call object for the handler to process
 */
function getLatestEpisodesHandler(call) {
    console.log('get lastest episodes called');
    const feed = parseFeed(call.request.feed);
    const quality = parseQuality(call.request.quality);
    getLatestEpisodes(feed, quality, call.request.searchTerms, call.request.fansub)
        .then((episodes) => {
            episodes.forEach((episode) => call.write(episode));
            call.end();
        })
        .catch((error) => console.log(error));
}

export default getLatestEpisodesHandler;
