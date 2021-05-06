var li_elements = document.querySelectorAll(".wrapper-left ul li");
var item_elements = document.querySelectorAll(".item");

for(var i = 0; i < li_elements.length; i++)
{
    li_elements[i].addEventListener("click", function(){
        li_elements.forEach(function(li){
            li.classList.remove("active");
        })
        this.classList.add("active");

        var li_value = this.getAttribute("data-li");
        item_elements.forEach(function(item){
            item.style.display = "none";
        })

        if(li_value == "addmanager")
        {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if(li_value == "viewmanagers")
        {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if(li_value == "viewlogs")
        {
            document.querySelector("." + li_value).style.display = "block";
        }
        // else if(li_value == "editbookinst")
        // {
        //     document.querySelector("." + li_value).style.display = "block";
        // }
        // else if(li_value == "delete")
        // {
        //     document.querySelector("." + li_value).style.display = "block";
        // }
        // else if(li_value == "deleteinst")
        // {
        //     document.querySelector("." + li_value).style.display = "block";
        // }
        else
        {
            console.log("");
        }
    })
}