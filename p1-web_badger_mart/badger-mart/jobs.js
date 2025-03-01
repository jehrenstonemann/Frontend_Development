function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    let radios = document.getElementsByName("job")
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            alert("Thank you for applying to be a " + radios[i].value + "!");
            break;
        }
    }
}