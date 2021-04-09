$(window).on('load', () => {

   const regForm = $('#reg-form');

   regForm.on('submit', (event) => {
       event.preventDefault();

       //get all form data
       const data = new FormData(event.target);
       //get all data in json object
       const studentData = Object.fromEntries(data.entries());

       //we get a promise after the request
       registerStudent(studentData).then(
           () => { //promise kept
               alert("Sign up successful");
               location.href = "../index.html";
           },
           (err) => { //promise broken
               console.log(err);
           }
       );
   });

});