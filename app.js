import menuArray from "./data";

const userOrder = [];
const modal = document.querySelector('.modal')
let isModalDisplayed = false;



document.addEventListener("click", e => {
    if (e.target.dataset.add && !isModalDisplayed) {
        getUserOrder(Number(e.target.dataset.add))

    }
    else if (e.target.dataset.remove && !isModalDisplayed) {
        removeFromOrder(Number(e.target.dataset.remove))
    }
    else if (e.target.id === "complete-btn") {
        modal.style.display = "flex"
        isModalDisplayed = !isModalDisplayed

    } else if (e.target.id === "pay-btn") {
        e.preventDefault()
        const name = document.getElementById('name')
        document.querySelector('#order-section').innerHTML = `
            <div class = "form-message">
                <h3>Thanks, ${name.value}! Your orders is on its way!</h3>
            </div>
        `
        modal.style.display = "none";
        e.target.value = ''
    }
})


const displayPirce = () => {
    let price = ''
    if (calculatePrice() == 0) {
        price = ''
    } else {
        price = `<p>Total price: <span class = "price-value">$${calculatePrice()}</span></p>`
    }
    return price
}


const getUserOrder = (orderId) => {
    const userItem = menuArray.find(item => item.id === orderId)
    userOrder.push({ ...userItem, placeInOrder: userOrder.length + 1, isInOrder: true })
    renderOrders(userOrder)
    document.getElementById('total-price').innerHTML = displayPirce()
}

const removeFromOrder = (orderId) => {
    const selectedItem = userOrder.find(item => item.placeInOrder === orderId)
    selectedItem.isInOrder = !selectedItem.isInOrder;
    document.querySelector(`.order-item-${selectedItem.placeInOrder} `).classList.add('hidden')
    document.getElementById('total-price').innerHTML = displayPirce()
}

const calculatePrice = () => {
    const totalPrice = userOrder.reduce((acc, item) => {
        if (item.isInOrder) {
            return item.price + acc;
        } else {
            return acc;
        }
    }, 0)
    if (totalPrice == 0) {
        document.querySelector('.user-order-title').classList.add('hidden-order')
        document.getElementById('complete-btn').classList.add('hidden-order')
        document.querySelector('.order-line').classList.add('hidden-order')
        return '';
    } else {
        return totalPrice
    }
}

const renderMenu = () => {
    let tempMenu = "";
    menuArray.forEach(item => {
        const ingridients = item.ingredients.map(ingrident => {
            return `<span class = "ingrident" > ${ingrident}</span > `
        }).join(" ")
        tempMenu += `
            <div class="menu-item" >
                <div class = "item-info">
                    <div class="item-image">
                        <span class = "item-emoji">${item.emoji}</span>
                    </div>
                    <div class="item-desccription">
                        <h3 class = "item-name">${item.name}</h3>
                        <div>${ingridients}</div>
                        <p class = "item-price">$${item.price}</p>
                    </div>
                </div>
                <div class = "add-btn">
                    <button class="add-item-btn" data-add="${item.id}">+</button>
                </div>
            </div>
            <hr></hr>`
    })
    return tempMenu;
}

const renderOrders = (data) => {
    let tempOrder = '';
    data.map(item => {
        if (item.isInOrder) {
            return tempOrder = `
                <div class = "order-item-${item.placeInOrder}" >
                    <div class="single-order-item">
                        <div class="order-item-info">
                            <h3 class="order-item-title">${item.name}</h3>
                            <button class="remove-item" id = "remove-item" data-remove="${item.placeInOrder}">remove</button>
                        </div>
                        <div class="order-item-price">
                            <p>$${item.price}</p>
                        </div>
                    </div>
                </div> `
        }
    })
    document.querySelector('#single-order').innerHTML += tempOrder
    document.querySelector('.user-order-title').classList.remove('hidden-order')
    document.getElementById('complete-btn').classList.remove('hidden-order')
    document.querySelector('.order-line').classList.remove('hidden-order')

}

const render = () => {
    document.querySelector("#menu-section").innerHTML = renderMenu();
}

render()


