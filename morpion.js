const Player= ["O","X"];
let i=0;
const l_case = document.querySelectorAll("th");
const textPlayer= document.getElementById("p");
console.log(l_case[0]);
let result=null;

l_case.forEach((cellule) => {
    cellule.addEventListener("click", () => {
        if (cellule.querySelector("p").textContent == "" && result==null) {
            i++;
            textPlayer.innerHTML=`C'est au tour de <span style="color:  #FFC300 ">${Player[(i+1)%2]}</span>`;
            console.log(cellule.querySelector("p").textContent);
            cellule.querySelector("p").textContent = Player[i%2];
            result=get_winner(l_case);

            if (result) {
                if (result != "match null") {
                    textPlayer.innerHTML=`Le Joueur <span style="color:  #FFC300 ">${result}</span> a gagné`;
                } else {
                    textPlayer.innerHTML=`Match Null`;
                }
                const button = document.createElement("button");
                button.classList.add("rejouer");
                button.innerText="Rejouez ?";

                button.addEventListener("click", () => {
                    location.reload();
                });
                const rejouer= document.getElementById("rejouer");
                
                rejouer.appendChild(button);
                setTimeout(() => {
                    button.classList.add('visible'); // Add the visible class after a delay
                }, 50);
            }
        }

    })
})



function get_winner(l) {
    const t= Array(9).fill(null);

    for (let i=0;i<=8;i++) {
        if (l[i].innerHTML=="<p>O</p>") {
            t[i]='O'
        } else if (l[i].innerHTML=="<p>X</p>") {
            t[i]='X'
        }
    }
    const winCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Les lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Les colones
        [0, 4, 8], [2, 4, 6]            // Les diagonales
    ];
    console.log(winCondition);

    for (const [a,b,c] of winCondition) {
        if (t[a] && t[a]==t[b] && t[b]==t[c]) {
            return t[a];
        } else if(t.every(cell => cell !== null)) {
            return "match null";
        }
    }
    return null;
}
