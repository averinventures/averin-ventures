const APPS_SCRIPT_URL="PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
const GOOGLE_FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLScf5ZAYPk2E4f8A8KJsEfj49w0QgO4C3xDHB5R4myZFgRv-BA/viewform?usp=headerye";
const form=document.getElementById("enquiryForm");
const statusBox=document.getElementById("formStatus");

if(form){
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    if(APPS_SCRIPT_URL.includes("PASTE_YOUR")){
      window.location.href=GOOGLE_FORM_URL;
      return;
    }
    const btn=form.querySelector("button");
    btn.disabled=true; btn.textContent="Submitting...";
    try{
      const data=Object.fromEntries(new FormData(form).entries());
      data.page=location.href;
      data.submittedAt=new Date().toISOString();
      await fetch(APPS_SCRIPT_URL,{
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(data)
      });
      form.reset();
      statusBox.textContent="Thank you. Your enquiry has been submitted successfully.";
    }catch(err){
      statusBox.textContent="Unable to submit right now. Please use the Google Enquiry Form or WhatsApp.";
    }finally{
      btn.disabled=false; btn.textContent="Submit Business Enquiry";
    }
  });
}
