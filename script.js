
function start(data) {
    parse(data[0], "availability-date", "January ", "", next_1)
}

function parse(data, div_id, label_front, label_back, onClickFunction) {
    document.getElementById(div_id).style.display = "block"
    keys = Object.keys(data)
    for (var i = 0; i < keys.length; i++) {
    let el = document.createElement("div");
    let cb = document.createElement("input");
    cb.type= "checkbox";
    cb.id = div_id + i.toString();
    let label = document.createElement("label")
    if (data[keys[i]] != "") {
        label.htmlFor= div_id + i.toString();
        label.innerText = label_front + data[keys[i]] + label_back

        cb.addEventListener("change", function () {
            if (this.checked) {
                label.classList.add("checked");
            } else {
                label.classList.remove("checked");
            }
        });


        el.appendChild(cb)
        el.appendChild(label)
        document.getElementById(div_id).appendChild(el);
    }
    
    
    }

    let button = document.createElement("button")
    button.textContent = "NEXT";
    button.onclick = onClickFunction;
    document.getElementById(div_id).appendChild(button);
    

}

function next_1() {
    parse(data[1], "availability-time", "", "", next_2)
    document.getElementById("availability-date").style.display = "none"
}
function next_2() {
    parse(data[2], "budget", "", "", next_3)
    document.getElementById("availability-time").style.display = "none"
}
function next_3() {
    parse(data[3], "time-commitment", "", "", next_4)
    document.getElementById("budget").style.display = "none"
}
function next_4() {
    parse(data[5], "location", "", "", submit)
    document.getElementById("time-commitment").style.display = "none"
}
function submit() {
    document.getElementById("location").style.display = "none"
    document.getElementById("answers").style.display = "block"
}


let order = "https://sheetdb.io/api/v1/3n0u9hhrlo1bp"
let data
async function fetch_data() {
    let response = await fetch(order);  
    data = await response.json();
    console.log(data)
    start(data)
}

fetch_data()

let answers = {
    date: [],
    time: [],
    commitment: [],
    budget: [],
    neighborhood: [],
}

weekends = [6, 7, 13, 14, 20, 21]

places  = [
    {name: "Intelligensia", type: "coffee", price : "$", location : "SL/EP"},
    {name: "Motoring Coffee", type: "coffee", price : "$", location : "WS"},
    {name: "Blueys", type: "coffee", price : "$", location : "SM/VN"},
    {name: "Lady Byrd Cafe", type: "brunch", price : "$$", location : "SL/EP"},
    {name: "Elephante", type: "brunch", price : "$$$", location : "SM/VN"},
    {name: "Elephante", type: "dinner", price : "$$$", location : "SM/VN"},
    {name: "Pop's Bagels", type: "brunch", price : "$$", location : "WS"},
    {name: "Wake and Late", type: "brunch", price : "$$", location : "DTLA"},
    {name: "Jon and Vinnys", type: "dinner", price : "$$$", location : "WS"},
    {name: "Frogtown Brewery", type: "drinks", price : "$", location : "SL/EP"},
    {name: "Salazar", type: "dinner", price : "$$", location : "SL/EP"},
    {name: "Loreto", type: "dinner", price : "$$$", location : "SL/EP"},
    {name: "Justine's Wine Bar", type: "drinks", price : "$$", location : "SL/EP"},
    {name: "Wax Paper", type: "brunch", price : "$$", location : "SL/EP"},
    {name: "Forage", type: "dinner", price : "$$", location : "SL/EP"},
    {name: "Barra Santos", type: "dinner", price : "$$", location : "SL/EP"},
    {name: "Donna's", type: "dinner", price : "$$$", location : "SL/EP"},
    {name: "Tacos Tu Madre", type: "dinner", price : "$", location : "LF"},
    {name: "All Time", type: "brunch", price : "$$", location : "LF"},
    {name: "Little Doms", type: "dinner", price : "$$", location : "LF"},
    {name: "Lonely Oyster", type: "dinner", price : "$$$", location : "SL/EP"},
    {name: "Found Oyster", type: "dinner", price : "$$$", location : "LF"},
    {name: "Woon", type: "dinner", price : "$$", location : "SL/EP"},
    {name: "Capri Club", type: "drinks", price : "$$", location : "HL/ER"},
    {name: "Lo Lo Wine Bar & Restaurants", type: "drinks", price : "$$$", location : "LF"},
    {name: "Manuela", type: "dinner", price : "$$$", location : "DTLA"},
    {name: "Holy Basil", type: "dinner", price : "$$", location : "DTLA"},
    {name: "Mona Pasta Bar", type: "dinner", price : "$$", location : "DTLA"},
    {name: "Girl and the Goat", type: "dinner", price : "$$", location : "DTLA"},
    {name: "Girl and the Goat", type: "brunch", price : "$$", location : "DTLA"},
    {name: "Mother Wolf", type: "dinner", price : "$$$", location : "DTLA"},
    {name: "Pizzeria Bianco", type: "dinner", price : "$$", location : "DTLA"},
    {name: "Bestia", type: "dinner", price : "$$$", location : "DTLA"},
    {name: "Horses", type: "dinner", price : "$$$", location : "WS"},
    {name: "Laurel Hardware", type: "dinner", price : "$$$", location : "WS"},
    {name: "Girl and the Goat", type: "dinner", price : "$$", location : "DTLA"},
    {name: "Little Door", type: "dinner", price : "$$$", location : "WS"},
    {name: "Easy Street Burger", type: "dinner", price : "$", location : "WS"},
    {name: "Eveleigh", type: "drinks", price : "$$$", location : "WS"},
    {name: "Gjelina", type: "dinner", price : "$$$", location : "SM/VN"},
    {name: "Felix Trattoria", type: "dinner", price : "$$$", location : "SM/VN"},
]

answers = {
    date : [2, 4, 5, 7],
    type: ["brunch", "drinks"],
    price: ["$", "$$"],
    location: ["SL/EP", "LF", "DTLA", "WS"]
}

function find_match(answers, places){

    match = false
    plan = {
        date: answers.date[0],
        first_choice : "",
        alternative : ""
    }
/***
  if (answers.type.includes("coffee")) {
    if (!answers.date.includes(6) || !answers.date.includes(7) || !answers.date.includes(13) || !answers.date.includes(14) || !answers.date.includes(20) || !answers.date.includes(21)) {
    
    answers.type.remove("brunch")
    }
    
  }
  
  if (answers.type.includes("brunch")) {
    if (!answers.date.includes(6) || !answers.date.includes(7) || !answers.date.includes(13) || !answers.date.includes(14) || !answers.date.includes(20) || !answers.date.includes(21)) {
    
      answers.type.remove("brunch")
    
    }
    
  }***/
  
  
  
    for (var i = 0; i < places.length; i++) {

        if (answers.type.includes(places[i].type) && answers.price.includes(places[i].price) && answers.location.includes(places[i].location)) {
            match = true
            if (plan.first_choice.length == "") {
                plan.first_choice = places[i]
            }
            else {
                plan.alternative = places[i]
            }
        }
    }

    if (match == false) {
        for (var i = 0; i < places.length; i++) {
            if (answers.type.includes(places[i].type) && answers.location.includes(places[i].location)) {
                match = true
                if (plan.first_choice.length == "") {
                    plan.first_choice = places[i]
                }
                else {
                    plan.alternative = places[i]
                }
            }
        }
    }

    console.log(plan)
}

find_match(answers, places)


    









