const openModal = document.querySelector('#create-item-modal')
const closeModal = document.querySelector('#close-circle')

const form = document.querySelector('#form-search');
const createForm = document.querySelector('#add-item');

const resultsList = document.querySelector('#results-list');
const singleItem = document.querySelector('h5.item-auto-style');
const ul = document.querySelectorAll('ul');
const dropDown = document.querySelector('#shopping-section');
const menuBar = document.querySelector('#menu-wrapper');
const menuOptions = document.querySelector('.menu-options')
const clearList = document.querySelector('#clear-btn')
const topClear = document.querySelector('#top-menu-clear')
const body = document.querySelector('body')


// ------------FETCH API-----------------------------

const api_Url = "https://shopean.herokuapp.com/getItem";
// const api_Url = "http://localhost:5000/getItem";

const getStorage = () => {

  if(localStorage.getItem('elements')) {
    dropDown.innerHTML = localStorage.getItem('elements')
   } 
}

// getStorage()


// ---------------------TYPING DB LOOK UP EVENT--------------------

const generateNewHtml = (matches) => {

 
  if(matches.length > 0) {
       const html = matches.map(match => 
      `
      <li class="uncheck ${matches[0].category}">${matches[0].item}<span class="close">&times;</span></li>
      ` 
      ).join();

      const clearBtn = document.querySelector('.clear-btn')
      const ul = document.querySelectorAll('ul');
      
      ul.forEach(list => {
       if(list.classList.contains(`${matches[0].category}`) ) {
          list.innerHTML += html;
          list.parentElement.parentElement.classList.add('active')
          clearBtn.classList.add('active')
          }
        })
      }
};

const generateTemplate = (matches) => {
  
  if(matches.length > 0) {
    let html = matches.map(match => 
      ` <div class="results-items"><h5 class="item-auto-style">${match.item}</h5></div>`
     ).join('');
    resultsList.innerHTML = html;

  } else if (matches.length <= 0) {
    resultsList.innerHTML = '<p style="color: red;">Please enter a valid item or click on the "Menu" button to create a new item</p>';
  }
};

const outPut = async () => {

  let formValue = form.item.value;
  let query = await fetch(api_Url)
  let data = await query.json()
  
  let matches = data.filter(item => {
  
    if(item.item.match(formValue)) {
      return item.item.match(formValue)
      } else {
     return
    }

})
  if(matches.length > 0) {
  resultsList.innerHTML =  `<p style="color: green;">Item has been added</p>`

 }
 setTimeout(() => {
   
  resultsList.innerHTML = '';
  resultsList.classList.add('class', 'collapse')
 }, 1000)
 generateNewHtml(matches)

};

const getItem = async searchText => {
  

  let query = await fetch(api_Url)
  let data = await query.json()

let matches = data.filter(item => {
  let regex = new RegExp(`^${searchText}`, 'gi');
  return item.item.match(regex) || item.category.match(regex);
});

if(searchText.length === 0) { 
    matches = [];
    resultsList.innerHTML = '';
}

generateTemplate(matches);


};



form.addEventListener('input', () => {

  getItem(form.item.value) 

  // resultsList.classList.remove('collapse')

})

//--------------CREATE ITEM MODALS----------------------------

const modalOpen = () => {

  let overlay = document.querySelector('.create-overlay')
  let modal = document.querySelector('#modal-wrapper')

  overlay.classList.add('active')
  modal.classList.add('active')
  body.setAttribute('style', 'overflow:hidden')

};

const modalClose = () => {

  let overlay = document.querySelector('.create-overlay')
  let modal = document.querySelector('#modal-wrapper')


  overlay.classList.remove('active')
  modal.classList.remove('active')
  body.setAttribute('style', '')

};

// ---------------GENERATE HTML FUNCTIONS------------------

openModal.addEventListener('click', () => {modalOpen() });
closeModal.addEventListener('click', () => {modalClose() });


// -----------------------------HOME PAGE INPUT FORM SUBMIT EVENT----------------

form.addEventListener('submit', (e) => {
  e.preventDefault()
 
outPut()
// let itemPattern = /[a-z]/;
// if(itemPattern.test(form.item.value))
//   {
//     outPut()
//   }
   
  //  setTimeout(() => {

  //  let store = document.getElementById('shopping-section')
  //   localStorage.setItem('elements', store.innerHTML)
  
  // },300);
  
  // form.reset();
  
});


//  --------------------------------MENU DROPDOWN--------------------------------------


menuBar.addEventListener('click', () => { 

  const menuChildren = Array.from(menuBar.children);

  menuChildren.forEach(bar => {
  bar.classList.toggle('active')
 
})
menuOptions.classList.toggle('active')
})

menuOptions.addEventListener('click', () => {

menuOptions.classList.remove('active')

const menuChildren = Array.from(menuBar.children)

menuChildren.forEach(bar => {
bar.classList.remove('active')
})

})

// --------------DB ITEM AS FORM VALUE--------------------


resultsList.addEventListener('click', e => {
        if(e.target.classList.contains('results-items')) {
          
          const text = e.target.innerHTML;
          const textTwo = e.target.innerText;
         

          form.item.value = textTwo;
          resultsList.innerHTML = '';
          

        }
      
  })



  //---------------REMOVE LOCAL STORAGE ----------------------------- 

const clearContents = () => {

  let listWrapper = document.querySelectorAll('ul')

  localStorage.removeItem('elements');
  listWrapper.forEach(list => {
  list.innerHTML = '';
  list.parentElement.parentElement.classList.remove('active')
  clearList.classList.remove('active')
  
})

}

clearList.addEventListener('click', () => {

  clearContents()

})

topClear.addEventListener('click', () => {

  clearContents()

})

 //  ---------------------------CHECK UNCHECK LIST BOX CLICK EVENTS---------------

body.addEventListener('click', e => {

  const store = document.getElementById('shopping-section')
 
  // const collapse = e.target.parentElement.parentElement.parentElement.parentElement;



  if(e.target.classList.contains('uncheck')) {
    e.target.setAttribute('class', 'check')
   

  } else if (e.target.classList.contains('check')) {
    e.target.setAttribute('class', 'uncheck')
  
  }


  if(e.target.parentElement.parentElement.children.length <= 1 && e.target.classList.contains('close')) {
      collapse.classList.remove('active');
  }

  
 

  if(e.target.classList.contains('close')) {
    e.target.parentElement.remove()
  } 

 
    
  localStorage.setItem('elements', store.innerHTML)


 
})
 










