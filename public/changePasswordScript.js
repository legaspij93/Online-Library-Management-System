document.getElementsById("password").addEventListener("click", function(){
    document.querySelector(".bg-modal").style.display="flex";
});


document.getElementById("close").addEventListener("click", function(){
    document.querySelector(".bg-modal").style.display = "none";
});

document.getElementsById("review-btn").addEventListener("click", function(){
    document.querySelector(".review-modal").style.display="flex";
});


document.getElementById("close").addEventListener("click", function(){
    document.querySelector(".review-modal").style.display = "none";
});

// get change pass button
var changePassBtn = document.getElementById("password");

//get modal element
var modal = document.getElementsByClassName(".bg-modal");

//get close button
var closeBtn = document.getElementById('close');

//Listen for open click
changePassBtn.addEventListener('click', openModal);

//Listen for close click
closeBtn.addEventListener('click', closeModal);

// Open Modal Function

function openModal(){
    modal.style.display="flex";
}

// Close Modal
function closeModal(){
    modal.style.display="none";
}