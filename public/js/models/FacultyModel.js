const FacultyEndPoint = 'Faculties';

const readAllFaculties = () => {
    return sendGetRequest(FacultyEndPoint);
}

const readFacultySchools = (facultyId) => {
    //Faculties/3/schools
    const endPoint = `${FacultyEndPoint}/${facultyId}/schools`;
    return sendGetRequest(endPoint);
}
