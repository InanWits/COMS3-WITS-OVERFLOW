const answerEndPoint = 'Answers';

const createAnswer = (AnswerData) => {
    return sendPostRequest(answerEndPoint, AnswerData);
}

const voteAnswer = (voteData) => {
    const endPoint = `${answerEndPoint}/vote`;
    return sendPostRequest(endPoint, voteData);
}
