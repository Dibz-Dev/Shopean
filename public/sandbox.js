const openModal = document.querySelector('#create-item-modal')
const closeModal = document.querySelector('#close-circle')
const form = document.querySelector('#form-search');
const itemInput = document.querySelector('#item-input');
const resultsList = document.querySelector('#results-list');
const singleItem = document.querySelector('h5.item-auto-style');
const ul = document.querySelectorAll('ul');
const dropDown = document.querySelector('#shopping-section');
const menuBar = document.querySelector('#menu-wrapper');
const menuOptions = document.querySelector('.menu-options')
const clearList = document.querySelector('#clear-btn')
const topClear = document.querySelector('#top-menu-clear')
const body = document.querySelector('body')



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

  } else if (matches.length <= 0) {
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
 resultsList.innerHTML =  `<p style="color: green;">Item has been added</p>`
 resultsList.classList.add('class', 'open')
 }
 setTimeout(() => {
   
  resultsList.innerHTML = '';
  resultsList.classList.remove('open')
  resultsList.classList.add('class', 'collapse')
 }, 1000)
 generateNewHtml(matches)

};

  
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
  }


// ---------------------TYPING DB LOOK UP EVENT--------------------

form.addEventListener('input', () => {
  getItem(form.item.value) 
  resultsList.classList.remove('collapse')

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

  const getStorage = () => {

    if(localStorage.getItem('elements')) {
      dropDown.innerHTML = localStorage.getItem('elements')
     } 
  }

 getStorage()


 //  ---------------------------CHECK UNCHECK LIST BOX CLICK EVENTS---------------

body.addEventListener('click', e => {

  const store = document.getElementById('shopping-section')

  if(e.target.classList.contains('uncheck')) {
    e.target.setAttribute('class', 'check')
    localStorage.setItem('elements', store.innerHTML)

  } else if (e.target.classList.contains('check')) {
    e.target.setAttribute('class', 'uncheck')
    localStorage.setItem('elements', store.innerHTML)
  }

  if(e.target.classList.contains('close')) {
    e.target.parentElement.remove()
    localStorage.setItem('elements', store.innerHTML)
  }



 
})
 


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







// ------------------------CATEGORIES DROPDOWN EVENT LISTENERS---------------------------
      
const meat = document.querySelector('#meat-count');


meat.addEventListener('click', (e) => {

    const arrow = meat.querySelectorAll('.arrow')
    const child = document.querySelector('.meat-drop');

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
    })
    
    
})





const bake = document.querySelector('#bake-count')

bake.addEventListener('click', (e) => {
  
  const arrow = bake.querySelectorAll('.arrow')
  const drop = document.querySelector('.bake-drop')

  drop.classList.toggle('active')
  arrow.forEach(arr => {
  arr.classList.toggle('active')
  })
})
  
    
const clean = document.querySelector('#cleaning-count');


clean.addEventListener('click', (e) => {
  
    const child = document.querySelector('.clean-drop')
    const arrow = clean.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })
   
})

const kitch = document.querySelector('#kitchen-count');


kitch.addEventListener('click', (e) => {
  
    const child = document.querySelector('.kitch-drop');
    const arrow = kitch.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

   
})

const toilet = document.querySelector('#toilet-count');


toilet.addEventListener('click', (e) => {
  
    const child = document.querySelector('.toilet-drop');
    const arrow = toilet.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

  
})


const dry = document.querySelector('#dry-count');


dry.addEventListener('click', (e) => {
  
    const child = document.querySelector('.dry-drop');
    const arrow = dry.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

    
})

const fruit = document.querySelector('#fruit-count');


fruit.addEventListener('click', (e) => {
  
    const child = document.querySelector('.fruit-drop');
    const arrow = fruit.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

    
})

const dairy = document.querySelector('#dairy-count');


dairy.addEventListener('click', (e) => {
  
    const child = document.querySelector('.dairy-drop');
    const arrow = dairy.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

    
})

const sea = document.querySelector('#sea-count');


sea.addEventListener('click', (e) => {
  
    const child = document.querySelector('.sea-drop');
    const arrow = sea.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

   
})

const froz = document.querySelector('#frozen-count');


froz.addEventListener('click', (e) => {
  
    const child = document.querySelector('.froz-drop');
    const arrow = froz.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

   
})

const bev = document.querySelector('#bev-count');


bev.addEventListener('click', (e) => {
  
    const child = document.querySelector('.bev-drop');
    const arrow = bev.querySelectorAll('.arrow')

    child.classList.toggle('active')
    arrow.forEach(arr => {
      arr.classList.toggle('active')
      })

})


