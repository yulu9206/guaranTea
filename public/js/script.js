function validateForm() {
    var x = document.forms["register"]["name"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}
