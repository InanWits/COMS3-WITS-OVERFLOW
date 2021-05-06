$(window).on('load', () => {

    const loginForm = $('#login-form');

    loginForm.on('submit', (event) => {
        event.preventDefault();

        //get all form data
        const data = new FormData(event.target);
        //get all data in json object
        const studentData = Object.fromEntries(data.entries());

        //we get a promise after the request
        loginStudent(studentData.user_name, studentData).then(
            (studentId) => { //promise kept
                location.href = "html/Homepage.html";
                //save student Id in local storage
                localStorage.setItem(KEY_STUDENT_ID, studentId.toString());
            },
            (err) => { //promise broken
                alert(err.responseText);
                console.log(err);
            }
        );
    });

});
