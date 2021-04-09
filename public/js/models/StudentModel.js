const registerStudent = (studentData) => {
    const endPoint = `Students`;
    return sendPostRequest(endPoint, studentData);
};

const loginStudent = (userName, studentData) => {
    const endPoint = `Students/${userName}`;
    return sendPostRequest(endPoint, studentData);
};

const retrieveAllStudents = () => {
  const endPoint = `Students`;
  return sendGetRequest(endPoint);
};