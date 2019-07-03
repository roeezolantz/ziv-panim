async function getPersonIdByUPN(currPhoto) {
    const subscriptionKey = "ee4fb5ee189d401482b19eca6613ea5b";

    var uriBase =
        "https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/shalishoot/persons"

    return fetch(uriBase, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream',
            "Ocp-Apim-Subscription-Key": subscriptionKey
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(response => response.json())
        .then(persons => {
            const soldier = persons.find(p => p.userData === currPhoto.upn);
            const personId = soldier.personId;
            return personId;
        })
        .catch(err => console.log(err)); // parses JSON response into native JavaScript objects
};

