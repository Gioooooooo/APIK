/*
Treehouse Project 5 - Public API Requests - by Giorgi Kuprashvili
*/

/*
    Global Variables
*/

// api call - 12 results
const RandomUsersCall =
  "https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=us";

/* 
    Helper Functions
 */

// requesting data

const requestData = (url) => {
  return (
    fetch(url)
      .then((response) => response.json())
      //.then(response => console.log(response))
      .catch((error) => console.log("There was a problem.", error))
  );
};

const grabNappend = (grabElement, appendElement, html) => {
  const selectedElement = document.querySelector(grabElement);
  const newElement = document.createElement(appendElement);
  selectedElement.append(newElement);
  newElement.innerHTML = html;
  return newElement;
};

//grabbing a node list / converting  to  array.
const grabNodeConvertToArray = (node) => {
  const nodeList = document.querySelectorAll(node);
  const array = Array.from(nodeList);
  return array;
};

/* 
    Regular Functions
*/

//Create Searchbox
const createSearch = () => {
  const searchHTML = `<form action="#" method="get">
    <input type="search" id="searchInput" class="searchInput" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="searchSubmit" class="searchSubmit">
    </form>`;
  grabNappend(".searchContainer", "form", searchHTML);
  const searchForm = document.querySelector(".searchContainer form");
  searchForm.action = "#";
  searchForm.method = "get";
};

//Create gallery
const createGallery = (data) => {
  data.forEach((person) => {
    const galleryHTML = `
            <div class="cardImgContainer">
                <img class="cardImg" src="${person.picture.large}" alt="profile picture">
                </div>
                <div class="cardInfoContainer">
                <h3 id="name" class="cardNAme cap">${person.name.first} ${person.name.last}</h3>
                <p class="cardText">${person.email}</p>
                <p class="cardText cap">${person.location.city}, ${person.location.state}</p>
                </div>
            </div>`;
    grabNappend("#gallery", "div", galleryHTML).className = "card";
  });
};

//Create modals
const createModals = (data) => {
  data.forEach((person) => {
    const modalHTML = `
            <div class="modal">
                <button type="button" id="modalCloseBtn" class="modalCloseBtn"><strong>X</strong></button>
            <div class="modalInfoContainer">
                <img class="modalImg" src="${
                  person.picture.large
                }" alt="profile picture">
                <h3 id="name" class="modalName cap">${person.name.first} ${
      person.name.last
    }</h3>
                <p class="modalText">${person.email}</p>
                <p class="modalText cap">${person.location.city}</p>
                <hr>
                <p class="modalText">${person.cell}</p>
                <p class="modalText">${person.location.street.number} ${
      person.location.street.name
    }, ${person.location.city}, ${person.location.state} ${
      person.location.postcode
    }</p>
                <p class="modalText">Birthday: ${person.dob.date.slice(
                  5,
                  10
                )}</p>
                </div>
            </div>
            <div class="modalBtnContainer">
            <button type="button" id="modaPrev" class="modaPrev btn">Prev</button>
            <button type="button" id="modalNext" class="modalNext btn">Next</button>
                </div>
            </div>`;
    grabNappend("body", "div", modalHTML).className = "modalContainer";
  });
};

//Hiding Modals
const hidingModals = () => {
  grabNodeConvertToArray("div.modalContainer").forEach(
    (modal) => (modal.style.display = "none")
  );
};

//Event Listeners
const eventListeners = () => {
  const cardsArray = grabNodeConvertToArray("div.card");
  const modalsArray = grabNodeConvertToArray("div.modalContainer");
  const modalCloseBtnArray = grabNodeConvertToArray("#modalCloseBtn");
  const nameArray = grabNodeConvertToArray("#name");
  const modalBtnSection = grabNodeConvertToArray("div.modalBtnContainer");
  const modalPrevBtnArray = grabNodeConvertToArray("#modaPrev");
  const modalNextBtnArray = grabNodeConvertToArray("#modalNext");

  const searchInput = document.querySelector("#searchInput");
  const noResultsHTML = "No results found.";
  const noResultsDiv = grabNappend("#gallery", "div", noResultsHTML);
  noResultsDiv.className = "noResults";
  noResultsDiv.style.display = "none";

  const modalArrayLengthMinusOne = modalsArray.length - 1;

  modalPrevBtnArray[0].disabled = "true";
  modalPrevBtnArray[0].className = "disabledBtn";
  modalNextBtnArray[modalArrayLengthMinusOne].disabled = "true";
  modalNextBtnArray[modalArrayLengthMinusOne].className = "disabledBtn";

  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener("click", () => {
      modalsArray[i].style.display = "block";
    });
  }

  for (let k = 0; k < modalCloseBtnArray.length; k++) {
    modalCloseBtnArray[k].addEventListener("click", () => {
      modalsArray[k].style.display = "none";
    });
  }

  searchInput.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const cardsDisplayTrueOrFalse = cardsArray.every(
      (card) => card.getAttribute("style") === "display: none;"
    );

    for (let j = 0; j < cardsArray.length; j++) {
      const nameText = nameArray[j].textContent.toLowerCase();
      if (nameText.indexOf(searchTerm) != -1) {
        cardsArray[j].style.display = "block";
      } else {
        cardsArray[j].style.display = "none";
      }
    }

    if (cardsDisplayTrueOrFalse) {
      noResultsDiv.style.display = "block";
    } else if (!cardsDisplayTrueOrFalse) {
      noResultsDiv.style.display = "none";
    } else if (searchTerm === "") {
      noResultsDiv.style.display = "none";
    } else {
      noResultsDiv.style.display = "none";
    }
  });

  for (let q = 0; q < modalBtnSection.length; q++) {
    modalBtnSection[q].addEventListener("click", (event) => {
      const clicked = event.target.textContent.toLowerCase();
      const clickedModal = event.target.parentNode.parentNode;
      let modalIndexNum = modalsArray.indexOf(clickedModal);

      if (clicked === "next") {
        modalIndexNum++;
        modalsArray[modalIndexNum].style.display = "block";
        clickedModal.style.display = "none";
      } else if (clicked === "prev") {
        modalIndexNum--;
        modalsArray[modalIndexNum].style.display = "block";
        clickedModal.style.display = "none";
      }
    });
  }

  modalsArray.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      const clicked = event.target;
      if (clicked.getAttribute("class") === "modalContainer") {
        modal.style.display = "none";
      }
    });
  });
};

const createPage = (data) => {
  createSearch();
  createGallery(data);
  createModals(data);
  hidingModals();
  eventListeners();
};

/* 
    Call functions.
 */

requestData(RandomUsersCall).then((data) => createPage(data.results));
