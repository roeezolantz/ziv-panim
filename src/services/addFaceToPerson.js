import { domain, headers, personGroupId, b64toBlob } from './utils';

export default async function addFaceToPerson(personId, base64Pic) {

    var uri = `${domain}/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces`

    const body = b64toBlob(base64Pic);

    return fetch(uri, {
        method: 'POST',
        headers,
        body
    })
        .then(response => response.json())
        .then(res => {
            return res.personId;
        })
        .catch(err => {
            console.log(err.stack)
            throw err;
        }); // parses JSON response into native JavaScript objects
};

