window.onload = () => {
    let iter = 1;
    let summary = 0;

    const nameField = document.getElementById("employee-name");
    const positionField = document.getElementById("employee-position");
    const emailField = document.getElementById("email-field");
    const userImage = document.getElementById("employee-photo-image");

    const backup = {
        name: nameField.innerText,
        vacancy: positionField.innerText,
        email: emailField.innerText,
        imageSrc: userImage.src
    };

    function updateFields(obj) {
        nameField.innerText = obj.name;
        positionField.innerText = obj.vacancy;
        emailField.innerText = obj.email;
        userImage.src = obj.imageSrc;
    }

    nameField.onclick = () => {
        iter = iter >= 12 ? 1 : iter + 1;  // task 2

        if (summary++ % 5 === 0) updateFields(backup);  // task 3
        else $ajaxUtils.sendGetRequest("https://reqres.in/api/users/" + iter,
            (res) => {
                console.log(res);
                const json = JSON.parse(res.responseText);
                console.log(json);

                updateFields({
                    name: json.data.first_name + " " + json.data.last_name,
                    vacancy: "Just a cool person",
                    email: json.data.email,
                    imageSrc: json.data.avatar
                });
            });

    }
}
