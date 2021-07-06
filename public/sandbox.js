const openModal = document.querySelector('#create-item-modal')
const closeModal = document.querySelector('#close-circle')
const form = document.querySelector('#form-search');
const itemInput = document.querySelector('#item-input');
const resultsList = document.querySelector('#results-list');
const singleItem = document.querySelector('h5.item-auto-style');
const ul = document.querySelectorAll('ul');
const dropDown = document.querySelector('#shopping-section');

const clearList = document.querySelector('#clear-btn')



//--------------CREATE ITEM MODALS----------------------------

const modalOpen = () => {

  let overlay = document.querySelector('.create-overlay')
  let modal = document.querySelector('#modal-wrapper')

  overlay.classList.add('active')
  modal.classList.add('active')

};

const modalClose = () => {

  let overlay = document.querySelector('.create-overlay')
  let modal = document.querySelector('#modal-wrapper')


  overlay.classList.remove('active')
  modal.classList.remove('active')

};

openModal.addEventListener('click', () => {modalOpen() });
closeModal.addEventListener('click', () => {modalClose() });

// ------------FETCH API-----------------------------

const api_Url = "http://localhost:3000/getItem";


// ---------------GENERATE HTML FUNCTIONS------------------

const getItem = async searchText => {

 const query = await fetch(api_Url)
 const data = await query.json()

 let matches = data.filter(item => {
   const regex = new RegExp(`^${searchText}`, 'gi');
   return item.item.match(regex) || item.category.match(regex);
 });

 if(searchText.length === 0) { 
   matches = [];
   resultsList.innerHTML = '';
    }

    generateTemplate(matches);
   
  
};

const generateTemplate = (matches) => {
  
  if(matches.length > 0) {
    const html = matches.map(match => 
      ` <div class="results-items"><h5 class="item-auto-style">${match.item}</h5></div>`
     ).join('');

    resultsList.innerHTML = html;
  } else {
    if(matches.length <= 0)
    resultsList.innerHTML = '<p style="color: red;">Please enter a valid item or click on the "Menu" button to create a new item</p>';
  }
}


const outPut = async () => {

  const formValue = form.item.value;

  const query = await fetch(api_Url)
  const data = await query.json()
 
   let matches = data.filter(item => {
  
    if(item.item.match(formValue)) {
      return item.item.match(formValue)
     
    } else {
      return
    }

})

 if(matches.length > 0) {
 resultsList.innerHTML =  `<p style="color: green;">Item has been added</p>`;
 }
 setTimeout(() => {
   
  resultsList.innerHTML = '';
 }, 2000)
 generateNewHtml(matches)

};

  
const generateNewHtml = (matches) => {

  
 
  if(matches.length > 0) {
       const html = matches.map(match => 
      `
      <li class="uncheck ${matches[0].category}">${matches[0].item}</li>
      ` 
      ).join();

      
      const ul = document.querySelectorAll('ul');
      
      ul.forEach(list => {
       if(list.classList.contains(`${matches[0].category}`) ) {
          list.innerHTML += html;
          } 
        })
      }
  }




// ---------------------TYPING DB LOOK UP EVENT--------------------

form.addEventListener('input', () => getItem(form.item.value))



//  ---------------------------CHECK UNCHECK LIST BOX CLICK EVENTS---------------


 ul.forEach(list => {

  list.addEventListener('click', e => {

    
  

   if(e.target.classList.contains('uncheck')) {
    e.target.setAttribute('class', 'check')
    list.parentElement.previousElementSibling.innerHTML = i--;
  } else if (e.target.classList.contains('check')) {
    e.target.setAttribute('class', 'uncheck')
   
  }
 })

});

  

 

  



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

clearList.addEventListener('click', () => {

  let listWrapper = document.querySelectorAll('ul')

  localStorage.removeItem('elements');
listWrapper.forEach(list => {
  list.innerHTML = '';
})
})
  

 
 

// -----------------------------HOME PAGE INPUT FORM SUBMIT EVENT----------------

form.addEventListener('submit', (e) => {
    e.preventDefault()
     outPut()

    

     setTimeout(() => {

      const store = document.getElementById('shopping-section')
      localStorage.setItem('elements', store.innerHTML)
    
    },1000);
    
   
    
    form.reset();
    
  });

   if(localStorage.getItem('elements')) {
    dropDown.innerHTML = localStorage.getItem('elements')
   } else {
     console.log('data not available')
   }
  


  
 
 

     
         
    




// ------------------------CATEGORIES DROPDOWN EVENT LISTENERS---------------------------
      
const meat = document.getElementById('meat');


meat.addEventListener('click', (e) => {
  
    const child = document.querySelector('.meat-drop');

    child.classList.toggle('active')
})


const bake = document.getElementById('bake');


bake.addEventListener('click', (e) => {
  
    const child = document.querySelector('.bake-drop');

    child.classList.toggle('active')
})


const clean = document.getElementById('clean');


clean.addEventListener('click', (e) => {
  
    const child = document.querySelector('.clean-drop');

    child.classList.toggle('active')
})

const kitch = document.getElementById('kitch');


kitch.addEventListener('click', (e) => {
  
    const child = document.querySelector('.kitch-drop');

    child.classList.toggle('active')
})

const toilet = document.getElementById('toilet');


toilet.addEventListener('click', (e) => {
  
    const child = document.querySelector('.toilet-drop');

    child.classList.toggle('active')
})


const dry = document.getElementById('dry');


dry.addEventListener('click', (e) => {
  
    const child = document.querySelector('.dry-drop');

    child.classList.toggle('active')
})

const fruit = document.getElementById('fruit');


fruit.addEventListener('click', (e) => {
  
    const child = document.querySelector('.fruit-drop');

    child.classList.toggle('active')
})

const dairy = document.getElementById('dairy');


dairy.addEventListener('click', (e) => {
  
    const child = document.querySelector('.dairy-drop');

    child.classList.toggle('active')
})

const sea = document.getElementById('sea');


sea.addEventListener('click', (e) => {
  
    const child = document.querySelector('.sea-drop');

    child.classList.toggle('active')
})

const froz = document.getElementById('froz');


froz.addEventListener('click', (e) => {
  
    const child = document.querySelector('.froz-drop');

    child.classList.toggle('active')
})

const bev = document.getElementById('bev');


bev.addEventListener('click', (e) => {
  
    const child = document.querySelector('.bev-drop');

    child.classList.toggle('active')
})


