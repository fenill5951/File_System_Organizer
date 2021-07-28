let fs=require("fs");

function treeFn(src) {
    //console.log("tree command executed with path : " + src);
    let path=src;
    let checkfolder=fs.lstatSync(src);
    if(checkfolder.isDirectory() == true)
    {
        let content=fs.readdirSync(path);
        for(let i=0;i<content.length;i++)
        {
                console.log(content[i]);
        }

    }
    else{
        console.log("Kindly give correct path");
    }
}

module.exports = {
    treefxn: treeFn
} 