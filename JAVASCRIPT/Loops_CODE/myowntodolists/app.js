const tdLists = [];
 let input;


do {
    console.log(tdLists);

    input = prompt("Enter Command:");
    
    

    if (input = "new"){
    const newtask = prompt("What do you want to do today?");
    tdLists.push(newtask);
    
    } else if (input = "list"){
        tdLists.forEach((element) => console.log(element));

        
    } else if (input = "delete"){
        const deltask = prompt("Which to delete?");
        const indexNum = tdLists.findIndex(deltask);
        tdLists.splice(indexNum, indexNum);

        
    } else if (input = "edit"){
        const selecttask = prompt("Which to edit?");
        const edittotask = prompt("enter new input");
        const indexNum = tdLists.findIndex(selecttask);
        tdLists[indexNum] = edittotask;

    } else 
        console.log("wrong input");

} while(input !== "quit")