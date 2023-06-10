fadeInCall()

const switchPageButton =document.querySelectorAll('.switch-btn');

function removeActiveMark() {
  for (let i = 0 ; i < switchPageButton.length; i++) {
    switchPageButton[i].classList.remove('active');
  }
}

switchPageButton.forEach((value, index) => {
    
  value.addEventListener('click', () => {
    removeActiveMark();
    value.classList.add('active');
    showPage(value.innerText);
    window.scrollTo(0, 0);
  });

});

const mainContainer = document.querySelector('.main-container');
const topSection = document.querySelector('.top-section');

const spacing = document.querySelector('.spacing');

function showPage(page) {
  mainContainer.innerHTML = '';
  spacing.classList.toggle('spacingInit')

  if (page === 'Home') {
    mainContainer.innerHTML += `
    <section class="top-section fade-in">
    <h1>
      A brand and product designer working with clients globally
    </h1>
    <div class="expertise-container">
      <p>Expertise</p>
      <p class="highlighted">Branding</p>
      <p class="highlighted">Product</p>
      <p class="highlighted">Design Systems</p>
    </div>
  </section>
  <section class="images-container">
    <div class="image-element fade-in">
      <div class="image-overlay">
        <p>Aira</p>
        <span class="material-symbols-sharp">
          expand_more
        </span>
      </div>
      <img src="images/img.jpg" alt="" loading="lazy">
    </div>
    <div class="image-element fade-in">
      <div class="image-overlay">
        <p>Aira</p>
        <span class="material-symbols-sharp">
          expand_more
        </span>
      </div>
      <img src="images/img2.jpg" alt="">
    </div>
    <div class="image-element fade-in">
      <div class="image-overlay">
        <p>Aira</p>
        <span class="material-symbols-sharp">
          expand_more
        </span>
      </div>
      <img src="images/img.jpg" alt="" loading="lazy">
    </div>
    <div class="image-element fade-in">
      <div class="image-overlay">
        <p>Aira</p>
        <span class="material-symbols-sharp">
          expand_more
        </span>
      </div>
      <img src="images/img2.jpg" alt="">
    </div>
    <div class="image-element fade-in">
      <div class="image-overlay">
        <p>Aira</p>
        <span class="material-symbols-sharp">
          expand_more
        </span>
      </div>
      <img src="images/img.jpg" alt="" loading="lazy">
    </div>
    <div class="image-element fade-in">
      <div class="image-overlay">
        <p>Aira</p>
        <span class="material-symbols-sharp">
          expand_more
        </span>
      </div>
      <img src="images/img2.jpg" alt="">
    </div>
  </section>
  <section class="offer-container fade-in">
    <p>Let's work together.</p>
    <a href="#">Get in touch</a>
  </section>
    `;
    document.querySelector('.animated').classList.remove('logo');

  }
  if (page === 'Profile') {
    mainContainer.innerHTML = `
      <section class="top-section fade-in">
      <h1>
        Hi I'm LoremIpsum!
      </h1>
      </section>
      <section class="images-container">
      <div class="image-element fade-in">
        <div class="image-overlay">
          <p>Aira</p>
          <span class="material-symbols-sharp">
            expand_more
          </span>
        </div>
        <img src="images/img2.jpg" alt="">
      </div>
      <div class="image-element fade-in">
        <div class="image-overlay">
          <p>Aira</p>
          <span class="material-symbols-sharp">
            expand_more
          </span>
        </div>
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>     
    </section>

    <section class="top-section fade-in">
    <div class="expertise-container">
        <p class="highlighted">About</p>
      </div>
      <h3>
        A brand and product designer working with clients globally
      </h3>
    </section>

    <section class="top-section fade-in">
    <div class="expertise-container">
        <p class="highlighted">Experience</p>
      </div>
      <h3>
        Where I've worked
      </h3>
    </section>

    <section class="experience-container">
      <div class="experience-element">
        <p>2017 - Present</p>
        <h3>Learning</h3>
        <p>Freelance Programmer</p>
        <p class="highlighted">Director</p>
      </div>
      <div class="experience-element">
        <p>2017 - Present</p>
        <h3>Learning</h3>
        <p>Freelance Programmer</p>
        <p class="highlighted">Director</p>
      </div>
      <div class="experience-element">
        <p>2017 - Present</p>
        <h3>Learning</h3>
        <p>Freelance Programmer</p>
        <p class="highlighted">Director</p>
      </div>
      <div class="experience-element">
        <p>2017 - Present</p>
        <h3>Learning</h3>
        <p>Freelance Programmer</p>
        <p class="highlighted">Director</p>
      </div>
      <div class="experience-element">
        <p>2017 - Present</p>
        <h3>Learning</h3>
        <p>Freelance Programmer</p>
        <p class="highlighted">Director</p>
      </div>
      <div class="experience-element">
        <p>2017 - Present</p>
        <h3>Learning</h3>
        <p>Freelance Programmer</p>
        <p class="highlighted">Director</p>
      </div>
    </section>

    <section class="top-section fade-in">
    <div class="expertise-container">
        <p class="highlighted">Clients</p>
      </div>
      <h3>
        Who I've worked with
      </h3>
    </section>

    <section class="experience-container-img">
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
      <div class="experience-element-img">
        <img src="images/img.jpg" alt="" loading="lazy">
      </div>
    </section>

    `;
    document.querySelector('.animated').classList.toggle('logo');
  }

  if (page === 'Contact') {
    mainContainer.innerHTML = `
    <section class="offer-container" style="margin-top: 14%;">
      <p>Let's work together.</p>
      <a href="#">Get in touch</a>  
    </section>
    `;
  }

  fadeInCall();
}

function fadeInCall () {
const fadeInElements = document.querySelectorAll('.fade-in');

function fadeIn() {
  fadeInElements.forEach((value, index) => {
    let position = fadeInElements[index].getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (position < windowHeight) {
      fadeInElements[index].classList.add("visible");
    }
  });
}

window.addEventListener("load", () => {
  fadeIn();
});

window.addEventListener("scroll", () => {
  fadeIn();
});

}