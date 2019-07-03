import { domain, headers, personGroupId } from './utils';

export default async function addNewPerson(name, userData) {

    var uri = `${domain}/face/v1.0/persongroups/${personGroupId}/persons`

    const body = JSON.stringify({ name, userData });

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

