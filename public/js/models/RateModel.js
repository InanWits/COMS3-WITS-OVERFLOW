const rateEndPoint = 'Rates';

const rateAnswer = (answerId, voteData) => {
    const endPoint = `${rateEndPoint}/${answerId}/vote`;
    return sendPostRequest(endPoint, voteData);
}
