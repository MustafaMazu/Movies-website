document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'eba8b9a7199efdcb0ca1f96879b83c44';
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const imagesUrl = 'https://image.tmdb.org/t/p/w500';
    const endpoints = {
        'top-rated': 'top_rated',
        'now-playing': 'now_playing',
        'popular': 'popular',
        'upcoming': 'upcoming'
    };

    document.getElementById('top-rated').addEventListener('click', () => fetchMovies(endpoints['top-rated']));
    document.getElementById('now-playing').addEventListener('click', () => fetchMovies(endpoints['now-playing']));
    document.getElementById('popular').addEventListener('click', () => fetchMovies(endpoints['popular']));
    document.getElementById('upcoming').addEventListener('click', () => fetchMovies(endpoints['upcoming']));

    function fetchMovies(endpoint) {
        const url = ` ${baseUrl}${endpoint}?api_key=${apiKey}`

        const xhr = new XMLHttpRequest();
        

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                const movies = JSON.parse(this.responseText).results;
                console.log(movies);
                displayMovies(movies);
            }
        });

        xhr.open('GET', url);
        xhr.setRequestHeader('accept', 'application/json');
        xhr.send();
    }

    function displayMovies(movies) {
        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie';
            movieDiv.innerHTML = `
            <div class=" w-[400] flex bg-black m-2" >
              <div class="  relative  content-between justify-between  group hover:overflow-hidden "> 
              
                 <img class="w-full group-hover:rotate-12  group-hover:scale-110 transition-all duration-[1000ms]"  src="${imagesUrl + movie.poster_path}" alt="${movie.title}">
                  <div class="description hidden text-white absolute bottom-40 left-5 text-center group-hover:block   transition-all duration-[1000ms]">
                     <h4>${movie.title}</h4>
                   <p>${movie.overview}</p>
                 </div>
                 <div class=" layer absolute  bg-black opacity-50 top-0 bottom-0 left-0 right-0 hidden group-hover:block transition-all duration-[100ms]" >
                  
                 </div>

                </div>
                
                



            </div>
                    

                
            `;
            moviesContainer.appendChild(movieDiv);
        });
    }
});




document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Clear previous errors
  document.querySelectorAll('.error').forEach(e => e.textContent = '');

  // Form elements
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = parseInt(document.getElementById('age').value.trim(), 10);
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const rePassword = document.getElementById('rePassword').value;

  let valid = true;

  // Validation
  if (!name) {
      document.getElementById('nameError').textContent = 'Name is required.';
      valid = false;
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email address.';
      valid = false;
  }

  if (isNaN(age) || age < 16) {
      document.getElementById('ageError').textContent = 'Age must be 16+';
      valid = false;
  }

  if (!phone || !/^\d{11}$/.test(phone)) {
      document.getElementById('phoneError').textContent = 'Phone number must be exactly 11 digits.';
      valid = false;
  }

  if (!password || !/(?=.*\d).{8,}/.test(password)) {
      document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and include at least one number.';
      valid = false;
  }

  if (password !== rePassword) {
      document.getElementById('rePasswordError').textContent = 'Passwords do not match.';
      valid = false;
  }

  if (valid) {
      alert('Form submitted successfully!');
      // Here you can handle the form submission, e.g., send data to server
  }
});
  // <h3>${movie.title}</h3>
  // <p>Rating: ${movie.vote_average}</p>
  // <p>Release Date: ${movie.release_date}</p>
  // <p>${movie.overview}</p>