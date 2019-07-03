import { domain, headers, personGroupId } from './utils';

export default async function getAllPersons(upn) {

    var uri = `${domain}/persongroups/${personGroupId}/persons`

    return fetch(uri, {
        method: 'GET',
        headers,
    })
        .then(response => response.json())
        .catch(err => console.log(err)); // parses JSON response into native JavaScript objects
};

