import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref, push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const shopList = document.getElementById("shopping-list")
const appSettings = {
    databaseURL : "https://realtime-database-4b6d7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList")

let addBtn= document.getElementById("add-button")
let inputField = document.getElementById("input-field")

addBtn.addEventListener("click",function(){
    
    let newItem = inputField.value
    console.log(newItem)
    push(shoppingListInDB,newItem)
    
    clearInput()  
})

onValue(shoppingListInDB,function(snapshot) {
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShopList()
        for(let i=0 ; i < itemsArray.length ; i++){
            let currItem=itemsArray[i]
            //let currentItemID=currItem[0]
            //let currentItemValue=currItem[1]
            
            addtoList(currItem)
        }

    }
    else{
        shopList.innerHTML = "Yay! No more tasks left!"
    }
    
})

function clearShopList(){
    shopList.innerHTML=""
}

function clearInput(){
    inputField.value = ""  
}

function addtoList(Item){
    //shopList.innerHTML += `<li>${Item}</li>`
    let itemID = Item[0]
    let itemValue = Item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shopList.append(newEl)

    newEl.addEventListener("click", function(){
        let itemLoc = ref(database, `shoppingList/${itemID}`)
        remove(itemLoc)
    })
}