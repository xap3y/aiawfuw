let currentUprgade = 0;
let currentUprgadeTool = 0;
let currentUprgadeArmor = 0;
let balance = 0;

const ranks = [
    {
        name: "default",
        path: "/icons/norank.png",
        cost: 0
    },
    {
        name: "vip",
        path: "/icons/vip.png",
        cost: 1000
    },
    {
        name: "vip+",
        path: "/icons/VIPPLUS.png",
        cost: 9999
    },
    {
        name: "mvp",
        path: "/icons/mvp.png",
        cost: 15000
    },
    {
        name: "mvp+",
        path: "/icons/mvpplus.png",
        cost: 19999
    },
    {
        name: "radian",
        path: "/icons/radian.png",
        cost: 24999
    },
    {
        name: "global Csgo",
        path: "/icons/global.png",
        cost: 50000
    }
]

const tools = [
    {
        name: "drill",
        path: "/icons/drill.png",
        cost: 0
    },
    {
        name: "gauntlet",
        path: "/icons/guantlet.png",
        cost: 200
    },
    {
        name: "esence",
        path: "/icons/esence.png",
        cost: 1420
    },
    {
        name: "goldgauntlet",
        path: "/icons/goldgauntlet.png",
        cost: 9696
    },
    {
        name: "Wooden Pickaxe",
        path: "/icons/woodenPik.png",
        cost: 18000
    },
    {
        name: "Diamond Hoe",
        path: "/icons/homdia.png",
        cost: 26000
    }
]

const armors = [
    {
        name: "lapisHelm",
        path: "/icons/lapis_helmet.gif",
        cost: 0
    },
    {
        name: "glacite",
        path: "/icons/packetice.png",
        cost: 2000
    },
    {
        name: "Diamond Sadan head",
        path: "/icons/sadandia.png",
        cost: 8000
    },
    {
        name: "Necron's head",
        path: "/icons/necronhead.png",
        cost: 70000
    }
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

    updateShop();
    $("#toolFirst").show()
    $("#rankFirst").show()
    $("#armorFirst").show()

    $("#toolSec").show()
    $("#rankSec").show()
    $("#armorSec").show()

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

    $("#rankCost").html(ranks[currentUprgade+1].cost)
    $("#toolCost").html(tools[currentUprgadeTool+1].cost)
    $("#armorCost").html(armors[currentUprgadeArmor+1].cost)

    if (balance < ranks[currentUprgade+1].cost) {
        $("#rankCost").css('color', 'red');
    } else {
        $("#rankCost").css('color', 'green');
    }

    $("#rankSec").attr('src', ranks[currentUprgade+1].path)
    $("#toolSec").attr('src', tools[currentUprgadeTool+1].path)
    $("#armorSec").attr('src', armors[currentUprgadeArmor+1].path)


    if (balance < tools[currentUprgadeTool+1].cost) {
        $("#toolCost").css('color', 'red');
    } else {
        $("#toolCost").css('color', 'green');
    }

    if (balance < armors[currentUprgadeArmor+1].cost) {
        $("#armorCost").css('color', 'red');
    } else {
        $("#armorCost").css('color', 'green');
    }

    $("#balanceNum").html(balance)
}

const updateShop2 = () => {

    if (balance < ranks[currentUprgade+1].cost) {
        $("#rankCost").css('color', 'red');
    } else {
        $("#rankCost").css('color', 'green');
    }


    if (balance < tools[currentUprgadeTool+1].cost) {
        $("#toolCost").css('color', 'red');
    } else {
        $("#toolCost").css('color', 'green');
    }

    if (balance < armors[currentUprgadeArmor+1].cost) {
        $("#armorCost").css('color', 'red');
    } else {
        $("#armorCost").css('color', 'green');
    }

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
    if (currentUprgadeArmor == 1) {
        balance+=50
    } else if (currentUprgadeArmor == 2) {
        balance+=230
    } else if (currentUprgadeArmor == 3) {
        balance+=600
    }

    if (currentUprgade == 1) {
        balance+=30
    } else if (currentUprgade == 2) {
        balance+=90
    } else if (currentUprgade == 3) {
        balance+=180
    } else if (currentUprgade == 4) {
        balance+=300
    } else if (currentUprgade == 5) {
        balance+=400
    } else if (currentUprgade == 6) {
        balance+=700
    }

    if (currentUprgadeTool == 1) {
        balance+=30
    } else if (currentUprgade == 2) {
        balance+=90
    } else if (currentUprgade == 3) {
        balance+=180
    } else if (currentUprgade == 4) {
        balance+=300
    } else if (currentUprgade == 5) {
        balance+=400
    }
    localStorage.setItem("balance", balance);
    updateShop2()
}

function reset(){
    localStorage.setItem("currentUprgadeArmor", 0);
    localStorage.setItem("currentUprgade", 0);
    localStorage.setItem("currentUprgadeTool", 0);
    localStorage.setItem("balance", 0);
}