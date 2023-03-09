// Form Reference
const formEl = document.getElementById('upload-form');
const resultEl = document.getElementById('result');

// Status reference
const statusEl = document.getElementById('file-status');
const submitStatusEl = document.getElementById('submit-status');



// Input reference
const uploadBtnEl = document.getElementById('uploader');
const submitBtnEl = document.getElementById('submiter');

// Listen to the submit event
formEl.addEventListener('submit',handleSubmit);
uploadBtnEl.addEventListener('change',handleFileChange);

disableButton("  ");
function openUpload(){
    uploadBtnEl.click();
}
function handleFileChange(e){
    const file =  e.target.files[0].name;
    statusEl.innerText = file;
    if(e.target.files[0]){
        enableButton();
    }
}


async function handleSubmit(e){
    e.preventDefault();


    disableButton();

    const formData = new FormData(e.target);
    const file = formData.entries('toTranscribe');
    if(!file){
        return;
    }
    // console.log(formData,file[0]);
    // const header = {
    //     // header
    //     // "Application-type":"x"
    // }
  
    const response = await fetch('/upload',{
        method:'POST',
        body: formData
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

    // Simulate delay
    setTimeout(()=>{
        enableButton();
    },4000)
}

function disableButton(status){
    submitBtnEl.setAttribute('disabled','true');
    submitBtnEl.classList.add('disabled');

    // Status Message
    submitStatusEl.style.display = 'block';
    submitStatusEl.innerHTML = status || `<i class="fa-solid fa-spinner fa-beat fa-spin"></i> Transcribing . . . `;
}
function enableButton(){
    submitBtnEl.removeAttribute('disabled');
    submitBtnEl.classList.remove('disabled');

    // Status Message
    submitStatusEl.style.display = 'none';

}