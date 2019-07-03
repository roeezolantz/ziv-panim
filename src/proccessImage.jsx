const b64toBlob = (b64Data) => {
    var imageData = b64Data;
    var byteCharacters = atob(imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([ byteArray ], {
        type : undefined
    });
    return blob;
}

export default function processImage(currPhoto, setCurrPhoto) {
    // Replace <Subscription Key> with your valid subscription key.
    // TODO - change subscriptionKey
    var subscriptionKey = "ee4fb5ee189d401482b19eca6613ea5b";

    // NOTE: You must use the same region in your REST call as you used to
    // obtain your subscription keys. For example, if you obtained your
    // subscription keys from westus, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the "westus" region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    var uriBase =
        "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
        "age,gender,headPose,smile,facialHair,glasses,emotion," +
        "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // const base64image = document.getElementById("imageprev").src;
    const base64image = currPhoto.base64;
    const blob = b64toBlob(base64image);

    // Display the image.
    // document.querySelector("#sourceImage").src = base64image;

    return fetch(uriBase + "?" + $.param(params), {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, cors, *same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/octet-stream',
            "Ocp-Apim-Subscription-Key": subscriptionKey
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
        body: blob, // body data type must match "Content-Type" header
    })
        .then(response => response.json())
        .then(recognizedFaces => {
            if (recognizedFaces && recognizedFaces.length > 0){
                setCurrPhoto({
                    ...currPhoto,
                    faceId : recognizedFaces[0].faceId
                });

                return currPhoto.faceId;
            }
            // $("#responseTextArea").val(JSON.stringify(x , null, 2));
        })
        .catch(err => console.log(err)); // parses JSON response into native JavaScript objects
};

