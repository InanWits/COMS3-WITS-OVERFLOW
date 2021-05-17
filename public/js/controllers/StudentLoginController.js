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
            (studentObj) => { //promise kept
                location.href = "html/HomePage.html";
                //save student Id in local storage

                localStorage.setItem(KEY_STUDENT_ID, studentObj.student_id);
                localStorage.setItem(KEY_STUDENT_F_NAME, studentObj.first_name);
                localStorage.setItem(KEY_STUDENT_L_NAME, studentObj.last_name);

            },
            (err) => { //promise broken
                alert(err.responseText);
                console.log(err);
            }
        );
    });

});
