const topicEndPoint = 'Topics';

const createTopic = (TopicData) => {
    return sendPostRequest(topicEndPoint, TopicData);
};

