let currentUprgade = 0;
let currentUprgadeTool = 0;
let currentUprgadeArmor = 0;
let balance = 0;

const ranks = [
    {
        name: "default",
        path: "/icons/norank.png",
        cost: 0,
        add: 0
    },
    {
        name: "vip",
        path: "/icons/vip.png",
        cost: 1000,
        add: 30
    },
    {
        name: "vip+",
        path: "/icons/VIPPLUS.png",
        cost: 9999,
        add: 90
    },
    {
        name: "mvp",
        path: "/icons/mvp.png",
        cost: 15000,
        add: 180
    },
    {
        name: "mvp+",
        path: "/icons/mvpplus.png",
        cost: 19999,
        add: 300
    },
    {
        name: "radian",
        path: "/icons/radian.png",
        cost: 24999,
        add: 400
    },
    {
        name: "global Csgo",
        path: "/icons/global.png",
        cost: 50000,
        add: 600
    },
    {
        name: "radiant valorant",
        path: "/icons/radiant.png",
        cost: 100000,
        add: 800
    },
    {
        name: "CR grand champion",
        path: "/icons/grandchampion.png",
        cost: 200000,
        add: 1200
    },
    {
        name: "Brawl stars",
        path: "/icons/brawlstars.png",
        cost: 320000,
        add: 1600
    },
    {
        name: "Clash of clans trophy league",
        path: "/icons/trophy.png",
        cost: 446226,
        add: 2200
    },
    {
        name: "LoL challenger",
        path: "/icons/lolko.png",
        cost: 5000000,
        add: 3600
    }
]

const tools = [
    {
        name: "drill",
        path: "/icons/drill.png",
        cost: 0,
        add: 0
    },
    {
        name: "gauntlet",
        path: "/icons/guantlet.png",
        cost: 200,
        add: 30
    },
    {
        name: "esence",
        path: "/icons/esence.png",
        cost: 1420,
        add: 90
    },
    {
        name: "goldgauntlet",
        path: "/icons/goldgauntlet.png",
        cost: 9696,
        add: 180
    },
    {
        name: "Wooden Pickaxe",
        path: "/icons/woodenPik.png",
        cost: 18000,
        add: 300
    },
    {
        name: "Diamond Hoe",
        path: "/icons/homdia.png",
        cost: 26000,
        add: 400
    }
]

const armors = [
    {
        name: "lapisHelm",
        path: "/icons/lapis_helmet.gif",
        cost: 0,
        add: 0
    },
    {
        name: "glacite",
        path: "/icons/packetice.png",
        cost: 2000,
        add: 50
    },
    {
        name: "Wise Dragon Armor Set",
        path: "/icons/wiseset.png",
        cost: 8000,
        add: 230
    },
    {
        name: "Necron set",
        path: "/icons/necronset.png",
        cost: 17000,
        add: 600
    },
    {
        name: "Diamond Sadan head",
        path: "/icons/sadandia.png",
        cost: 28969,
        add: 800
    },
    {
        name: "Diamond Necron's head",
        path: "/icons/necronhead.png",
        cost: 250000,
        add: 2000
    },
]

$(document).ready(() => {
    console.log("main.js loaded")
    if (localStorage.getItem("balance") > 0) {
        balance = parseInt(localStorage.getItem("balance"))
    }


    if (localStorage.getItem("currentUprgade") > 0) {
        currentUprgade = parseInt(localStorage.getItem("currentUprgade"))
    }

    if (localStorage.getItem("currentUprgadeTool") > 0) {
        currentUprgadeTool= parseInt(localStorage.getItem("currentUprgadeTool"))
    }
    if (localStorage.getItem("currentUprgadeArmor") > 0) {
        currentUprgadeArmor = parseInt(localStorage.getItem("currentUprgadeArmor"))
    }

    $("#rankSec").show()
    $("#toolSec").show()
    $("#armorSec").show()
    updateShop();
    $("#toolFirst").show()
    $("#rankFirst").show()
    $("#armorFirst").show()

    if (currentUprgade == 1 || currentUprgade == 1) {
        $("#mainText").css('color', "green")
    } else if (currentUprgade == 3 || currentUprgade == 4) {
        $("#mainText").css('color', "aqua")
    } else if (currentUprgade == 5) {
        $("#mainText").css('color', "magenta")
    }
})

const updateShop = () => {
    $("#rankFirst").attr('src', ranks[currentUprgade].path)

    $("#toolFirst").attr('src', tools[currentUprgadeTool].path)

    $("#armorFirst").attr('src', armors[currentUprgadeArmor].path)
    
    reloadShop()
    

    $("#balanceNum").html(balance)
}

function buyItem(type){
    if (type == "rank") {
        if (balance >= ranks[currentUprgade+1].cost) {
            balance -= ranks[currentUprgade+1].cost
            currentUprgade++
            localStorage.setItem("currentUprgade", currentUprgade);
            updateShop()
            if (currentUprgade == 1) {
                $("#mainText").css('color', "green")
            } else if (currentUprgade == 3) {
                $("#mainText").css('color', "aqua")
            } else if (currentUprgade == 5) {
                $("#mainText").css('color', "magenta")
            }
        }
    } else if (type == "tool") {
        if (balance >= tools[currentUprgadeTool+1].cost) {
            balance -= tools[currentUprgadeTool+1].cost
            $('main').removeClass(`cursor${currentUprgadeTool}`)
            $("#mainClick").removeClass(`cursor${currentUprgadeTool}`)
            currentUprgadeTool++
            localStorage.setItem("currentUprgadeTool", currentUprgadeTool);
            $("#mainClick").addClass(`cursor${currentUprgadeTool}`)
            $('main').addClass(`cursor${currentUprgadeTool}`)
            updateShop()
        }
    } else if (type == "armor") {
        if (balance >= armors[currentUprgadeArmor+1].cost) {
            balance -= armors[currentUprgadeArmor+1].cost
            currentUprgadeArmor++
            localStorage.setItem("currentUprgadeArmor", currentUprgadeArmor);
            updateShop()
        }
    }
}

function mainButton() {
    balance+=5
    balance+=armors[currentUprgadeArmor].add

    balance+=tools[currentUprgadeTool].add

    balance+=ranks[currentUprgade].add

    localStorage.setItem("balance", balance);
    reloadShop()
    $("#balanceNum").html(balance)
}

function reset(){
    localStorage.setItem("currentUprgadeArmor", 0);
    localStorage.setItem("currentUprgade", 0);
    localStorage.setItem("currentUprgadeTool", 0);
    localStorage.setItem("balance", 0);
}

function reloadShop(){

    if (currentUprgade != 11) {
        $("#rankCost").html(ranks[currentUprgade+1].cost)
        $("#rankSec").attr('src', ranks[currentUprgade+1].path)
        if (balance < ranks[currentUprgade+1].cost) {
            $("#rankCost").css('color', 'red');
        } else {
            $("#rankCost").css('color', 'green');
        }
    } else {
        $("#rankFirst").css("margin-left", "120px")
        $("#rankFirst").css("margin-top", "20px")
        $("#rankSec").hide()
        $("#rankArrow").hide()
        $("#rankCost").hide()
        $("#rankC").hide()
        $("#rankBuyBut").hide()
        $("#rankCostText").hide()
    }

    if (currentUprgadeTool != 5) {
        $("#toolCost").html(tools[currentUprgadeTool+1].cost)
        $("#toolSec").attr('src', tools[currentUprgadeTool+1].path)
        if (balance < tools[currentUprgadeTool+1].cost) {
            $("#toolCost").css('color', 'red');
        } else {
            $("#toolCost").css('color', 'green');
        }
    } else {
        $("#toolFirst").css("margin-left", "120px")
        $("#toolFirst").css("margin-top", "20px")
        $("#toolSec").hide()
        $("#toolArrow").hide()
        $("#toolCost").hide()
        $("#toolC").hide()
        $("#toolBuyBut").hide()
        $("#toolCostText").hide()
    }

    if (currentUprgadeArmor != 5) {
        $("#armorCost").html(armors[currentUprgadeArmor+1].cost)
        $("#armorSec").attr('src', armors[currentUprgadeArmor+1].path)
        if (balance < armors[currentUprgadeArmor+1].cost) {
            $("#armorCost").css('color', 'red');
        } else {
            $("#armorCost").css('color', 'green');
        }
    } else {
        $("#armorFirst").css("margin-left", "120px")
        $("#armorFirst").css("margin-top", "20px")
        $("#armorSec").hide()
        $("#armorArrow").hide()
        $("#armorCost").hide()
        $("#armorC").hide()
        $("#armorBuyBut").hide()
        $("#armorCostText").hide()
    }
}