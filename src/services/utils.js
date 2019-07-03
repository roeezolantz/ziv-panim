export const subscriptionKey = "ee4fb5ee189d401482b19eca6613ea5b";
export const domain = "https://westeurope.api.cognitive.microsoft.com";
export const headers = {
    'Content-Type': 'application/json',
    "Ocp-Apim-Subscription-Key": subscriptionKey
}
export const personGroupId = "shalishoot"

export const b64toBlob = (b64Data) => {
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