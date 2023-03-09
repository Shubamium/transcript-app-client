// Form Reference
const formEl = document.getElementById('upload-form');
const resultEl = document.getElementById('result');
const statusEl = document.getElementById('file-status');



// Input reference
const uploadBtnEl = document.getElementById('uploader');

// Listen to the submit event
formEl.addEventListener('submit',handleSubmit);
uploadBtnEl.addEventListener('change',handleFileChange);


function openUpload(){
    uploadBtnEl.click();
}
function handleFileChange(e){
    const file =  e.target.files[0].name;
    statusEl.innerText = file;
}


async function handleSubmit(e){
    e.preventDefault();
    console.log('form submitted');

    const formData = new FormData(e.target);
    const file = formData.entries('toTranscribe');
    // console.log(formData,file[0]);
    
    // return;
    const header = {
        // header
        // "Application-type":"x"
    }
    const response = await fetch('apiroute:port/route',{
        method:'POST',
        body:file
    });
    let result = await response.json();

    // const res = {
    //     success: boolean,
    //     message: string,
    //     transcription: string 
    // }


    // const exampleRes = {
    //     success: true,
    //     message: "Internal server error!",
    //     transcription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // }

    // result = exampleRes;

    if(result && result.success){
        // Show the transcript
        resultEl.value = result.transcription;
    }else{
        // Show error message
        resultEl.value="Erorr: " + result.message;
        
    }
}