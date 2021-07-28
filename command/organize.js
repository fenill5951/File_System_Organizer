let fs=require("fs")
let path=require("path")
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function category(name)
{
    let extname=path.extname(name);
                extname=extname.slice(1);
                for(let key in types)
                {
                    let currentArray=types[key];
                    for(let i=0;i<currentArray.length;i++)
                    {
                        if(extname == currentArray[i])
                        {
                            return key;
                        }

                    }
                }
                return "others";
}

function movefile(src,dest,category)
{
    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false)
    {
        fs.mkdirSync(categorypath);
    }
    let filename=path.basename(src);
    let destpath=path.join(categorypath,filename);
    fs.copyFileSync(src,destpath);
}

function organizeFn(src) {
    //console.log("organize  command executed with path: " + src);
    let MainfolderPath=src;

    if(src ==undefined)
    {
        console.log("Enter the path");
        return;
    }
    else{

        let isexist=fs.existsSync(src);

        if(isexist == true)
        {
                let organized_files=path.join(MainfolderPath,"organized_files");
                if(fs.existsSync(organized_files) == false)
                {
                    fs.mkdirSync(organized_files);
                } 
                // let mediapath=path.join(organized_files,"media");
                // let archivespath=path.join(organized_files,"archives");
                // let documentspath=path.join(organized_files,"documents");
                // let apppath=path.join(organized_files,"app");
                // let otherspath=path.join(organized_files,"others");
                // fs.mkdirSync(mediapath);
                // fs.mkdirSync(archivespath);
                // fs.mkdirSync(documentspath);
                // fs.mkdirSync(apppath);
                // fs.mkdirSync(otherspath);
    
    
                let content=fs.readdirSync(MainfolderPath);
    
                for(let i=0;i<content.length;i++)
                {   
                    let filepath=path.join(MainfolderPath,content[i]);
                    let check=fs.lstatSync(filepath).isFile();
                    if(check == true)
                    {
                        let getcategory=category(content[i]);
                        movefile(filepath,organized_files,getcategory);
    
                    }  
    
                }
        }
    }

}
module.exports = {
    organizefxn: organizeFn
} 