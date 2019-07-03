export default async function verifyFaces(faceId, personId) {
    const subscriptionKey = "ee4fb5ee189d401482b19eca6613ea5b";

    var uriBase =
        "https://westeurope.api.cognitive.microsoft.com/face/v1.0/verify"

    const body = {
        faceId : faceId,
        personId : personId,
        personGroupId : "shalishoot"
    };

    console.log(JSON.stringify(body));

    return fetch(uriBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Ocp-Apim-Subscription-Key": subscriptionKey
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify(body)
    })
        .then(response => response.json())
        .then(res => {

            return res.isIdentical;
        })
        .catch(err => {
            debugger;
            console.log(err)
        }); // parses JSON response into native JavaScript objects
};

