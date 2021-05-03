const SchoolEndPoint = 'Schools';

const readSchoolTopics = (schoolId) => {
    //Faculties/3/schools
    const endPoint = `${SchoolEndPoint}/${schoolId}/topics`;
    return sendGetRequest(endPoint);
}

