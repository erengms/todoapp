const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list'); //Ul
const gununTarihi = document.querySelector('.card-header');
let items;

//Tarih

let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
tarih = day + '/' + month + '/' + year;
gununTarihi.textContent = tarih;

//Load items
loadItems();

//çağırdık
eventListeners();

function eventListeners() {
    //submit , eleman ekledik
    form.addEventListener('submit', addNewItem);

    //delete, eleman silme
    taskList.addEventListener('click', deleteItem);

    taskList.addEventListener('click', ok);

    //delete,bütün listeyi silme
    btnDeleteAll.addEventListener('click', deleteAllItems);
}


function loadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    })
}



//get items from Local Storage
function getItemsFromLS() {

    if (localStorage.getItem('items') === null) {
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}



//set items to Local Storage
function setItemToLS(text) {

    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}




// delete item from LS
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);   
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}


//yeni eleman oluştur
function createItem(text) {
    //create li
    const li = document.createElement('li');

    li.className = "list-group-item list-group-item-warning";
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '&nbsp&nbsp&nbsp<i class="fas fa-times-circle" style="color:#dc3545; font-size:30px;" ></i>';
    
    const ok = document.createElement('a');
    ok.classList = 'delete-item float-right';
    ok.setAttribute('href', '#');
    ok.innerHTML = '<i class="fas fa-check-circle" style="color:gray; font-size:30px;" ></i>';

    // li ile a ilişkilendirme ---Li etiketi içine a etiketi yerleştir gibi...
    li.appendChild(a);
    li.appendChild(ok);

    //Ul (taskList demiştik) ile Li
    taskList.appendChild(li);
}


//eleman ekledik
function addNewItem(e) {
    e.preventDefault();

    if (input.value === '') {
        alert("Boş kayıt eklenemez");
    }
    else {

        //create item
        createItem(input.value);


        //save to Local Storage
        setItemToLS(input.value);

        //clear input
        input.value = '';

    }
}

//eleman siliyoruz
function deleteItem(e) {


    if (e.target.className === 'fas fa-times-circle') {  //silme butonuna mı tıkladık?evet ise devam.

        if (confirm('Görev silinecek. Emin misiniz?')) {

            e.target.parentElement.parentElement.remove();
            

            //Delete from Local Storage
           deleteItemFromLS(e.target.parentElement.parentElement.textContent);

        }

    }
    
    e.preventDefault();
}

//eleman OKEY
function ok(e) {

    if (e.target.className === 'fas fa-check-circle') {  //okey butonuna mı tıkladık?evet ise devam.
             
        
             e.target.parentElement.parentElement.className="list-group-item list-group-item-success";
            
             e.target.parentElement.innerHTML = '<i class="fas fa-check-circle" style="color:green; font-size:30px;"></i>';
            
           
    }
    
    e.preventDefault();
}

//bütün listeyi siliyoruz
function deleteAllItems(e) {


    if (confirm('Liste silinecek. Emin misiniz?')) {

        //taskList.innerHTML = ''; Alternatif
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        //delete LS
        localStorage.clear();
    }

    e.preventDefault();
}