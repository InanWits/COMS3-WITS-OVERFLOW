const topicEndPoint = 'Topics';

const readTopicQuestions = (TopicId) => {
    const endPoint = `${topicEndPoint}/${TopicId}/questions`;
    return sendGetRequest(endPoint);
};

const insertTopic = (TopicData) => {
  return sendPostRequest(topicEndPoint, TopicData);
};
