import nyaapi from 'nyaapi';
import { feeds } from '../utils';

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
    console.log(query);
    switch (feed) {
    case feeds.SI:
        return await nyaapi.si.search(query, 150, { filter: '0', category: '1_0', sort: 'id', direction: 'desc' });
    case feeds.PANTSU:
        return await nyaapi.pantsu.search(query, 150, { filter: '0', category: '1_0', sort: 'id', direction: 'desc' });
    }
}

export default getLatestEpisodes;
