// global variable to store the list of student Objects
All_students = []

// Q1 fetch
fetch("https://cs571.org/api/s24/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
.then(response => response.json())
.then(data => {
	// Q2 show # of students
	document.getElementById("num-results").innerText = data.length
	buildStudents(data)
	All_students = data
})
.catch(error => console.error(error))

function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	
	const students = document.getElementById("students")
	students.innerHTML = ''

	for(let person of studs){
		// Q4 Responsive design(bootstrap)
		const StudentDetails = document.createElement("div")
		StudentDetails.className = "col-12 col-mid-6 col-lg-4 col-xl-3"
		students.appendChild(StudentDetails)

		// Q3 display students
		const Name = document.createElement("h2")
		Name.innerText = person.name.first + " " + person.name.last
		StudentDetails.appendChild(Name)

		
		const Major = document.createElement("p")
		const MajorBold = document.createElement("strong")
		MajorBold.innerText = person.major
		StudentDetails.appendChild(Major)
		Major.appendChild(MajorBold)

		
		const Credits = document.createElement("p")
		let origin = ""
		if(person.fromWisconsin){
			origin = "is from Wisconsin"
		}else{
			origin = "is not from Wisconsin"
		}
		Credits.innerText = person.name.first + " is taking " + person.numCredits + " credits and " + origin
		StudentDetails.appendChild(Credits)

		const Interests = document.createElement("p")
		Interests.innerText = "They have " + person.interests.length + " interests including..."
		StudentDetails.appendChild(Interests)

		const InterestsDetails = document.createElement("ul")
		StudentDetails.appendChild(InterestsDetails)
		for(let interest of person.interests){
			const Interest = document.createElement("li")
			Interest.innerText = interest

			// Q6 similar interests
            Interest.addEventListener("click", (e) => {
                const selectedInterest = e.target.innerText.trim().toLowerCase();
                document.getElementById("search-interest").value = selectedInterest;
                handleSearch();
            });

			InterestsDetails.appendChild(Interest)
		}
	}

}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	// Q5 Search Functionality
	const searchName = document.getElementById("search-name").value.trim().toLowerCase()
	const searchMajor = document.getElementById("search-major").value.trim().toLowerCase()
	const searchInterest = document.getElementById("search-interest").value.trim().toLowerCase()
	const filteredResult = All_students.filter(student => {
		fullName = student.name.first + " " + student.name.last
		nameMatch = (searchName === "" || fullName.toLowerCase().includes(searchName))
		majorMatch = (searchMajor === "" || student.major.toLowerCase().includes(searchMajor))
		interestMatch = (searchInterest === "" || student.interests.some(interest => interest.toLowerCase().includes(searchInterest)))
		return nameMatch && majorMatch && interestMatch
	})

	buildStudents(filteredResult)
	document.getElementById("num-results").innerText = filteredResult.length
}

document.getElementById("search-btn").addEventListener("click", handleSearch);