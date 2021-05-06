var li_elements = document.querySelectorAll(".sidebar-container ul li");
var item_elements = document.querySelectorAll(".itemcontainer");
console.log("hello");
console.log(li_elements.length);
console.log(item_elements.length);

for(var i = 0; i < li_elements.length; i++)
{
    
    li_elements[i].addEventListener("click", function(){
        li_elements.forEach(function(li){
            li.classList.remove("active");
        })
        this.classList.add("active");

        var li_value = this.getAttribute("data-li");
        item_elements.forEach(function(itemcontainer){
            itemcontainer.style.display = "none";
        })

        if(li_value == "reviews")
        {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if(li_value == "borrowing")
        {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if(li_value == "history")
        {
            document.querySelector("." + li_value).style.display = "block";
        }
        else
        {
            console.log("");
        }
    });
}

document.getElementById("review-btn").addEventListener("click", function(){
    document.querySelector(".review-modal").style.display="flex";
});


document.getElementsByClassName("close").item(1).addEventListener("click", function(){
    document.querySelector(".review-modal").style.display = "none";
});

// get change pass button
var changePassBtn = document.getElementById("password");

//get modal element
var modal = document.getElementsByClassName("bg-modal").item(0);

//get close button
var closeBtn = document.getElementsByClassName('close').item(0);

//Listen for open click
changePassBtn.addEventListener('click', openModal);

//Listen for close click
closeBtn.addEventListener('click', closeModal);

// Open Modal Function

function openModal(){
    modal.style.display="flex";
    console.log("OPEN MODAL!!!")
}

// Close Modal
function closeModal(){
    modal.style.display="none";
}