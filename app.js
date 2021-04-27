const addItem = document.querySelector('.add');
const input = document.querySelector('.inputValue')
const items = document.querySelector('.s-list')

const generateTemplate = list => {


const html = `<li class="item d-flex list-group-item justify-content-between">
<span>${list}</span>
<i class="fas fa-trash-alt delete"></i>
</li>`
;

items.innerHTML += html;

};



addItem.addEventListener('submit', e => {

    e.preventDefault();
    const list = addItem.search.value.trim();
    
    if(list.length) {
        generateTemplate(list);
        addItem.reset();
    }

    
});

items.addEventListener('click', e => {
   if(e.target.classList.contains('delete')) {
     e.target.parentElement.remove();
   }
})